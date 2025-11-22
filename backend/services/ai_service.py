import json
import re
from config import client

# ---------------------------
# Génération Quiz / Flashcards
# ---------------------------
def generate_quiz_from_text(text: str, num_questions: int = 10):
    prompt = f"""Tu es un expert pédagogique.

Crée exactement {num_questions} QCM en JSON.

IMPORTANT: Retourne UNIQUEMENT ceci (pas d'autre texte):
{{
  "title": "Titre du quiz",
  "questions": [
    {{
      "question": "Question ?",
      "options": ["A", "B", "C", "D"],
      "correct_answer": "A"
    }}
  ]
}}

Chaque question sur UNE SEULE LIGNE.
Les options doivent être COURTES.
correct_answer doit être EXACTEMENT une des options.

COURS À ÉTUDIER:
{text[:3000]}
"""
    resp = client.chat.completions.create(
        model="mistralai/mixtral-8x7b-instruct",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
        max_tokens=2000
    )

    content = resp.choices[0].message.content.strip()
    print(f"[DEBUG] Quiz réponse brute: {content[:300]}")
    
    try:
        result = json.loads(content)
        print(f"[DEBUG] Quiz JSON parsé OK")
        return result
    except Exception as e:
        print(f"[DEBUG] Erreur parse quiz: {e}")
        import re
        m = re.search(r'\{[\s\S]*?"questions"[\s\S]*?\][\s\S]*?\}', content)
        if m:
            try:
                result = json.loads(m.group(0))
                print(f"[DEBUG] Quiz JSON parsé (regex): OK")
                return result
            except Exception as e2:
                print(f"[DEBUG] Quiz regex échouée: {e2}")
        raise ValueError(f"JSON quiz invalide: {e}\nRéponse: {content[:300]}")

def generate_flashcards_from_text(text: str, num_cards: int ):
    prompt = f"""Tu es un expert pédagogique.

Crée exactement {num_cards} flashcards COURTES en JSON.

IMPORTANT: Retourne UNIQUEMENT ceci (pas d'autre texte):
{{
  "title": "Titre court",
  "flashcards": [
    {{"content": "Une information clé du cours"}},
    {{"content": "Une autre information importante"}}
  ]
}}
u es un générateur de JSON strict. 
Tu réponds UNIQUEMENT en JSON valide, 
sans aucun texte supplémentaire
IMPORTANT: Génère EXACTEMENT {num_cards} flashcards, pas moins, pas plus.
Chaque flashcard contient UNE SEULE information clé.
Chaque content doit être COURT (max 150 caractères).
Une seule information par flashcard, pas de Q/R.

COURS À ÉTUDIER:
{text[:3000]}
"""
    resp = client.chat.completions.create(
        model="mistralai/mixtral-8x7b-instruct",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.2,
        max_tokens=2000,
    )
    content = resp.choices[0].message.content.strip()
    print(f"[DEBUG] Réponse brute: {content[:300]}")
    
    try:
        result = json.loads(content)
        print(f"[DEBUG] JSON parsé OK")
        return result
    except Exception as e:
        print(f"[DEBUG] Erreur parse: {e}")
        import re
        # Chercher un objet JSON valide
        m = re.search(r'\{[\s\S]*?"flashcards"[\s\S]*?\][\s\S]*?\}', content)
        if m:
            try:
                result = json.loads(m.group(0))
                print(f"[DEBUG] JSON parsé (regex): OK")
                return result
            except Exception as e2:
                print(f"[DEBUG] Regex aussi échouée: {e2}")
        raise ValueError(f"JSON invalide: {e}\nRéponse: {content[:300]}")