from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pytesseract
from .routes.routes import router as pdf_router

# Afficher version Tesseract
print(pytesseract.get_tesseract_version())

# --- Créer l'app FastAPI ---
app = FastAPI(
    title="EduMate API",
    description="API pour la génération de quiz et flashcards à partir de PDFs",
    version="1.0.0"
)

# --- CORS middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Inclure les routes ---
app.include_router(pdf_router)

# --- Route san_té ---
@app.get("/home_page")
async def health():
    return {"status": "hellllo chaimus"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)