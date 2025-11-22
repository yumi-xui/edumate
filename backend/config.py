from dotenv import load_dotenv
import os
from supabase import create_client, Client
from openai import OpenAI

load_dotenv()

# --- Environment variables ---
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
BUCKET_NAME = os.getenv("SUPABASE_BUCKET")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

if not all([SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, BUCKET_NAME, OPENROUTER_API_KEY]):
    raise Exception("Erreur : certaines variables d'environnement sont manquantes.")

# --- Supabase client ---
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

# --- OpenRouter client ---
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY
)
