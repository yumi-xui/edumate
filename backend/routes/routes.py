from fastapi import APIRouter, UploadFile, File, HTTPException ,Query
from services.pdf_service import extract_pdf_text
from services.ai_service import generate_quiz_from_text, generate_flashcards_from_text
from services.storage_service import (get_quiz_by_id,get_all_cours,get_flashcards_by_user,
    create_cour, upload_pdf, update_cour_filepath, get_cour, download_pdf,
    insert_quiz, insert_quiz_question, insert_flashcard,
)
from config import supabase
router = APIRouter(prefix="/api", tags=["PDF"])

# ---------------------------
# ROUTE 1 : Upload PDF / créer cour
# ---------------------------
@router.post("/upload-pdf")
async def upload_pdf_route(user_id: int, cour_title: str, file: UploadFile = File(...)):
    try:
        print("=== Début upload PDF ===")
        
        # Lire le fichier
        file_bytes = await file.read()
        print(f"Taille du fichier: {len(file_bytes)} octets")

        # Extraire le texte
        text = extract_pdf_text(file_bytes)
        print(f"Longueur texte extraite: {len(text)}")
        if len(text) < 50:
            raise HTTPException(400, "PDF vide ou non lisible.")

        # Créer le cour
        cour = create_cour(user_id, cour_title)
        cour_id = cour["id"]
        print(f"cour enregistré avec ID: {cour_id}")

        # Upload le PDF
        file_path = upload_pdf(user_id, cour_id, file.filename, file_bytes)
        print(f"PDF uploadé vers: {file_path}")

        # Mettre à jour le file_path
        update_cour_filepath(cour_id, file_path)

        return {
            "success": True,
            "cour_id": cour_id,
            "text_preview": text[:200]
        }

    except HTTPException:
        raise
    except Exception as e:
        print("ERREUR inattendue:", e)
        raise HTTPException(500, f"ERREUR inattendue: {e}")

# ---------------------------
# ROUTE 2 : Générer quiz
# ---------------------------
@router.post("/generate-quiz")
async def generate_quiz(cour_id: int, user_id: int, num_questions: int = 10):
    try:
        # Récupérer le cour
        cour = get_cour(cour_id)

        # Télécharger le PDF
        file_bytes = download_pdf(cour["file_path"])
        text = extract_pdf_text(file_bytes)

        # Générer le quiz
        quiz = generate_quiz_from_text(text, num_questions=num_questions)

        # Insérer le quiz
        quiz_id = insert_quiz(user_id, cour_id, quiz["title"], len(quiz["questions"]))

        # Insérer les questions
        for q in quiz["questions"]:
            insert_quiz_question(
                quiz_id,
                q["question"],
                q["options"],
                q["correct_answer"]
            )

        return {"success": True, "quiz_id": quiz_id, "total_questions": len(quiz["questions"])}

    except HTTPException:
        raise
    except Exception as e:
        print(f"ERREUR generate_quiz: {e}")
        raise HTTPException(500, str(e))

# ---------------------------
# ROUTE 3 : Générer flashcards
# ---------------------------
@router.post("/generate-flashcards")
async def generate_flashcards(cour_id: int, user_id: int, num_cards: int ):
    try:
        # Récupérer le cour
        cour = get_cour(cour_id)

        # Télécharger le PDF
        file_bytes = download_pdf(cour["file_path"])
        text = extract_pdf_text(file_bytes)

        # Générer les flashcards
        flashcards = generate_flashcards_from_text(text, num_cards=num_cards)

        # Insérer les flashcards
        title = flashcards.get("title", "Flashcards")
        for f in flashcards["flashcards"]:
            insert_flashcard(user_id, cour_id, title, f["content"])

        return {"success": True, "total_flashcards": len(flashcards["flashcards"])}

    except HTTPException:
        raise
    except Exception as e:
        print(f"ERREUR generate_flashcards: {e}")
        raise HTTPException(500, str(e))
    

 
 

# ---------------------------
# ROUTE 2 : Récupérer tous les quiz d'un cours
# ---------------------------
@router.get("/cours/{user_id}")
async def get_user_cours(user_id: int):
    try:
        resp = supabase.table("Cours").select("*").eq("user_id", user_id).execute()
        return {"success": True, "cours": resp.data}
    except Exception as e:
        raise HTTPException(500, str(e))

# --- GET tous les quiz d'un cour ---
@router.get("/quiz/cour/{cour_id}")
async def get_cour_quizzes(cour_id: int):
    try:
        resp = supabase.table("quiz").select("*").eq("cour_id", cour_id).execute()
        return {"success": True, "quizzes": resp.data}
    except Exception as e:
        raise HTTPException(500, str(e))

# --- GET toutes les questions d'un quiz ---
@router.get("/quiz/{quiz_id}/questions")
async def get_quiz_questions(quiz_id: int):
    try:
        resp = supabase.table("quiz_questions").select("*").eq("quiz_id", quiz_id).execute()
        return {"success": True, "questions": resp.data}
    except Exception as e:
        raise HTTPException(500, str(e))

# --- GET toutes les flashcards d'un cour ---
@router.get("/flashcards/cour/{cour_id}")
async def get_cour_flashcards(cour_id: int):
    try:
        resp = supabase.table("flashcard").select("*").eq("cour_id", cour_id).execute()
        return {"success": True, "flashcards": resp.data}
    except Exception as e:
        raise HTTPException(500, str(e))

# --- GET toutes les flashcards d'un user ---
@router.get("/flashcards/user/{user_id}")
async def get_user_flashcards(user_id: int):
    try:
        resp = supabase.table("flashcard").select("*").eq("user_id", user_id).execute()
        return {"success": True, "flashcards": resp.data}
    except Exception as e:
        raise HTTPException(500, str(e))

# --- GET un quiz spécifique ---
@router.get("/quiz/{quiz_id}")
async def get_quiz(quiz_id: int):
    try:
        resp = supabase.table("quiz").select("*").eq("id", quiz_id).execute()
        if not resp.data:
            raise HTTPException(404, "Quiz not found")
        return {"success": True, "quiz": resp.data[0]}
    except Exception as e:
        raise HTTPException(500, str(e))

# --- GET un cour spécifique ---
@router.get("/cour/{cour_id}")
async def get_cour(cour_id: int):
    try:
        resp = supabase.table("Cours").select("*").eq("id", cour_id).execute()
        if not resp.data:
            raise HTTPException(404, "cour not found")
        return {"success": True, "cour": resp.data[0]}
    except Exception as e:
        raise HTTPException(500, str(e))