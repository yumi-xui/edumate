from ..config import supabase, BUCKET_NAME
from datetime import datetime
from fastapi import Query

def create_cour(user_id: int, cour_title: str):
    """Crée un nouveau cour dans la base de données"""
    try:
        cour_insert = supabase.table("Cours").insert({
            "user_id": user_id,
            "title": cour_title,
            "created_at": datetime.now().isoformat()
        }).execute()
        
        if not cour_insert.data or len(cour_insert.data) == 0:
            raise Exception("Aucune donnée renvoyée après insertion")
        
        return cour_insert.data[0]
    except Exception as e:
        raise Exception(f"Erreur création cour: {e}")

def upload_pdf(user_id: int, cour_id: int, filename: str, file_bytes: bytes):
    """Upload un PDF dans Supabase Storage"""
    try:
        file_path = f"users/{user_id}/{cour_id}/{filename}"
        storage = supabase.storage.from_(BUCKET_NAME)
        storage.upload(file_path, file_bytes)
        return file_path
    except Exception as e:
        raise Exception(f"Erreur upload PDF: {e}")

def update_cour_filepath(cour_id: int, file_path: str):
    """Met à jour le chemin du fichier dans le cour"""
    try:
        supabase.table("Cours").update({
            "file_path": file_path
        }).eq("id", cour_id).execute()
    except Exception as e:
        raise Exception(f"Erreur update file_path: {e}")

def get_cour(cour_id: int):
    """Récupère les infos d'un cour"""
    try:
        cour_resp = supabase.table("Cours").select("*").eq("id", cour_id).execute()
        if not cour_resp.data or len(cour_resp.data) == 0:
            raise Exception("cour introuvable")
        return cour_resp.data[0]
    except Exception as e:
        raise Exception(f"Erreur récupération cour: {e}")

def download_pdf(file_path: str):
    """Télécharge un PDF depuis Supabase Storage"""
    try:
        storage = supabase.storage.from_(BUCKET_NAME)
        file_bytes = storage.download(file_path)
        return file_bytes
    except Exception as e:
        raise Exception(f"Erreur téléchargement PDF: {e}")

def insert_quiz(user_id: int, cour_id: int, title: str, n_questions: int):
    """Crée un quiz dans la base"""
    try:
        quiz_resp = supabase.table("quiz").insert({
            "user_id": user_id,
            "cour_id": cour_id,
            "title": title,
            "n_questions": n_questions
        }).execute()
        
        if not quiz_resp.data or len(quiz_resp.data) == 0:
            raise Exception("Erreur création quiz")
        
        return quiz_resp.data[0]["id"]
    except Exception as e:
        raise Exception(f"Erreur insertion quiz: {e}")

def insert_quiz_question(quiz_id: int, question_text: str, options: list, correct_answer: str):
    """Insère une question dans le quiz"""
    try:
        supabase.table("quiz_questions").insert({
            "quiz_id": quiz_id,
            "question_text": question_text,
            "options": options,
            "correct_answer": correct_answer
        }).execute()
    except Exception as e:
        raise Exception(f"Erreur insertion question: {e}")

def insert_flashcard(user_id: int, cour_id: int, title: str, content: str):
    """Insère une flashcard"""
    try:
        supabase.table("flashcard").insert({
            "user_id": user_id,
            "cour_id": cour_id,
            "title": title,
            "content": content
        }).execute()
    except Exception as e:
        raise Exception(f"Erreur insertion flashcard: {e}")
    

def get_flashcards_by_user(user_id: int, cour_title: str = None):
    """
    Retourne les flashcards d'un utilisateur avec le titre du cours.
    Si cour_title est fourni, filtre par le titre du cours.
    """
    try:
        query = supabase.table("Flashcards") \
            .select("id, content, Cours!inner.title") \
            .eq("user_id", user_id)

        if cour_title:
            query = query.ilike("Cours.title", f"%{cour_title}%")  # filtre titre cours (insensible à la casse)

        result = query.execute()
        return result.data  # liste de flashcards avec champ 'title' du cours

    except Exception as e:
        print(f"ERREUR get_flashcards_by_user: {e}")
        return []
    
# storage_service.py

def get_quiz_by_id(user_id: int, quiz_id: int):
    """
    Retourne un quiz spécifique d'un utilisateur connecté.
    """
    try:
        result = supabase.table("Quiz") \
            .select("id, title") \
            .eq("user_id", user_id) \
            .eq("id", quiz_id) \
       

        return result.data  # dictionnaire du quiz

    except Exception as e:
        print(f"ERREUR get_quiz_by_id: {e}")
        return None


def get_all_cours(user_id: int):
    """
    Retourne tous les cours d'un utilisateur avec le file_path du PDF.
    """
    try:
        result = supabase.table("Cours") \
            .select("id, title, file_path") \
            .eq("user_id", user_id) \
            .execute()
        return result.data  # liste de cours avec id, title et file_path
    except Exception as e:
        print(f"ERREUR get_all_cours: {e}")
        return []