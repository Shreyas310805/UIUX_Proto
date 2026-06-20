import os
from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv()

# Naya GenAI client automatically tumhari GEMINI_API_KEY utha lega
client = genai.Client()

def get_wellness_translation(symptoms):
    prompt = f"""
    You are a professional AI health and wellness optimizer. 
    Analyze the following symptoms and provide a short, actionable, and calming 2-3 sentence diagnostic review.
    Symptoms: {symptoms}
    """
    
    try:
        # Using the latest supported model
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        return response.text
    except Exception as e:
        print(f"AI System Error: {e}")
        return "System Diagnostics currently unavailable. Please consult a human specialist."