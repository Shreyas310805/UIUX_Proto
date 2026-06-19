import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def get_wellness_translation(symptoms: str):
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    prompt = f"""
    Act as a Performance & Wellness Optimizer. 
    Translate these symptoms into positive, stigma-free 'Performance & Wellness' terminology.
    Do NOT use medical jargon (like patient, disease, treatment). 
    Use terms like 'Physical Alignment Issue', 'Energy Dip', 'Tune-up Sequence'.
    
    User Input: {symptoms}
    
    Give a short, positive evaluation.
    """
    
    response = model.generate_content(prompt)
    return response.text