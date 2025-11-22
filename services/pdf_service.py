import io
from pypdf import PdfReader
from pdf2image import convert_from_bytes
import pytesseract

def extract_text_standard(file_bytes):
    """Extraction standard du PDF avec pypdf"""
    try:
        reader = PdfReader(io.BytesIO(file_bytes))
        text = ""
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
        return text.strip()
    except Exception as e:
        print("Erreur extraction PDF standard:", e)
        return ""

def extract_text_ocr(file_bytes):
    """Extraction par OCR si PDF scannérisé"""
    try:
        images = convert_from_bytes(file_bytes)
        text = ""
        for img in images:
            text += pytesseract.image_to_string(img, lang='fra') + "\n"
        return text.strip()
    except Exception as e:
        print("Erreur OCR:", e)
        return ""

def extract_pdf_text(file_bytes):
    """Extraction smart : essaie standard puis OCR si texte insuffisant"""
    text = extract_text_standard(file_bytes)
    if len(text) < 50:
        print("Texte insuffisant, activation OCR...")
        text = extract_text_ocr(file_bytes)
    return text