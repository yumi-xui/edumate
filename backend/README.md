
# EduMate — Backend

Ce dossier contient l'API backend d'EduMate, une API FastAPI qui permet :

- l'upload de fichiers PDF,
- l'extraction de texte depuis des PDFs (avec PyPDF / OCR via Tesseract),
- la génération automatique de QCM et flashcards via un service de génération d'IA (OpenRouter / Mistral),
- le stockage des fichiers et des données (cours, quiz, questions, flashcards) dans Supabase.

Ce README décrit la stack, l'installation, les variables d'environnement nécessaires, les routes principales et des conseils de déploiement.

## Stack technique

- Python 3.11+
- FastAPI
- Uvicorn
- Supabase Python client
- OpenRouter / OpenAI compatible client (utilisé par `services/ai_service.py`)
- PyPDF2, pdfminer.six, pytesseract (OCR)

Les dépendances sont listées dans `requirements.txt`.

## Prérequis

- Avoir Python 3.11+ installé
- Tesseract OCR installé sur le système (pour `pytesseract`). Sur Debian/Ubuntu :

```bash
sudo apt update
sudo apt install -y tesseract-ocr libtesseract-dev
```

- Un projet Supabase avec :
	- une table `Cours` (id, user_id, title, file_path, created_at...),
	- une table `quiz`, `quiz_questions`, `flashcard` (selon utilisation),
	- un bucket de stockage pour les PDFs.

## Installation locale

1. Créez un environnement virtuel et installez les dépendances :

```bash
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

2. Configurez les variables d'environnement (voir section suivante).

3. Lancer l'API en local :

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

La documentation interactive sera disponible sur `http://localhost:8000/docs`.

## Variables d'environnement

Le projet attend les variables suivantes (par exemple dans un fichier `.env` à la racine du dossier `backend`) :

- SUPABASE_URL - URL de votre instance Supabase
- SUPABASE_SERVICE_ROLE_KEY - clé service role (utilisée pour les opérations server-side)
- SUPABASE_BUCKET - nom du bucket de stockage pour les PDFs
- OPENROUTER_API_KEY - clé API OpenRouter (utilisée pour interroger le modèle d'IA)

Exemple `.env` minimal :

```env
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
SUPABASE_BUCKET=pdf-uploads
OPENROUTER_API_KEY=or-xxxx
```

Attention : conservez la `SERVICE_ROLE_KEY` secrète (ne la commitez pas).

## Endpoints principaux

L'API est préfixée par `/api` (routes définies dans `routes/routes.py`). Voici les routes les plus importantes :

- POST /api/upload-pdf
	- Paramètres form-data : `user_id` (int), `cour_title` (str), `file` (fichier PDF)
	- Fonction : extrait le texte du PDF, crée un enregistrement `Cours`, upload le PDF dans Supabase Storage et met à jour le `file_path`.
	- Réponse : `{ success: True, cour_id, text_preview }`.

- POST /api/generate-quiz
	- Paramètres JSON / query : `cour_id` (int), `user_id` (int), `num_questions` (int, optionnel, défaut 10)
	- Fonction : récupère le PDF associé au cours, extrait le texte, demande au service IA de générer un quiz, stocke le quiz et ses questions en base.
	- Réponse : `{ success: True, quiz_id, total_questions }`.

- POST /api/generate-flashcards
	- Paramètres : `cour_id` (int), `user_id` (int), `num_cards` (int)
	- Fonction : génère des flashcards via l'IA et les insère en base.

- GET /api/cours/{user_id} — récupère tous les cours d'un utilisateur
- GET /api/cour/{cour_id} — récupère un cours
- GET /api/quiz/{quiz_id} — récupère un quiz
- GET /api/quiz/{quiz_id}/questions — récupère les questions d'un quiz
- GET /api/quiz/cour/{cour_id} — récupère tous les quiz d'un cours
- GET /api/flashcards/cour/{cour_id} — flashcards d'un cours
- GET /api/flashcards/user/{user_id} — flashcards d'un utilisateur

Pour plus de détails, consultez `backend/routes/routes.py`.

## Structure des dossiers

- `main.py` — configuration FastAPI et inclusion des routes
- `routes/routes.py` — définition des endpoints
- `services/pdf_service.py` — extraction de texte des PDFs (PyPDF / OCR)
- `services/ai_service.py` — logique d'appel au modèle d'IA (formatage des prompts, parsing JSON)
- `services/storage_service.py` — interaction avec Supabase (upload/download, insert en base)
- `config.py` — chargement des variables d'environnement et création des clients Supabase / OpenRouter

## Notes et bonnes pratiques

- Les prompts envoyés aux modèles doivent idéalement renvoyer du JSON strict. `ai_service.py` contient des parsers robustes mais il est préférable d'indiquer au modèle de renvoyer du JSON propre.
- Pour l'OCR, vérifiez la version de Tesseract et installez les packages de langues si nécessaire.
- Veillez aux limites d'API (OpenRouter / Mistral) et gérez les erreurs et timeouts côté client si besoin.

## Déploiement

- Déployez l'API sur un serveur (Docker, VPS) et exposez le port 8000 via un reverse-proxy (NGINX) ou une plate-forme (Railway, Fly.io, Render, etc.).
- Assurez-vous que les variables d'environnement sont correctement définies en production et que la `SUPABASE_SERVICE_ROLE_KEY` est protégée.

## Dépannage rapide

- Erreur "certaines variables d'environnement sont manquantes" : vérifiez que `.env` est chargé et contient toutes les clés requises.
- Erreurs liées à Tesseract : assurez-vous que `tesseract-ocr` est installé et accessible dans le PATH.
- Problèmes d'upload/download Supabase : vérifiez le nom du bucket et les permissions de la clé utilisée.

## Contribution

Si vous souhaitez améliorer le backend :

1. Ouvrez une branche dédiée.
2. Ajoutez des tests unitaires pour `services/` (par exemple en isolant les appels Supabase via mocks).
3. Mettez à jour ce README si vous modifiez des endpoints ou des variables d'environnement.

---

Si vous voulez, je peux :

- ajouter un exemple `.env.example`,
- ajouter des scripts de démarrage (`Makefile` ou `scripts/`),
- écrire quelques tests unitaires pour `ai_service` et `storage_service`.

Marquez la tâche suivante dans la todo list pour que je l'implémente si nécessaire.
