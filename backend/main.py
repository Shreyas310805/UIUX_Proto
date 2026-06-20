from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import ai_service 

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Models
class SymptomInput(BaseModel):
    symptoms: str

class ClinicRequest(BaseModel):
    location: str
    symptoms: str = ""  # Frontend se symptoms yahan aayenge filter ke liye

# 1. AI Analysis Route
@app.post("/api/analyze")
def analyze_symptoms(data: SymptomInput):
    result = ai_service.get_wellness_translation(data.symptoms)
    return {"wellness_evaluation": result}

# 2. Smart Routing Clinics Route (50 Real Kanpur Clinics)
@app.post("/api/clinics")
def get_clinics(data: ClinicRequest):
    kanpur_50_clinics = [
        {"name": "Regency Hospital", "distance": "2.5 km", "time": "10 mins", "rating": "4.8", "lat": 26.4716, "lng": 80.3156, "address": "A-2, Sarvodaya Nagar", "specialty": "Multi-Speciality, Trauma", "phone": "+91-512-3081111"},
        {"name": "Hallet Hospital (LLR)", "distance": "3.8 km", "time": "15 mins", "rating": "4.2", "lat": 26.4839, "lng": 80.3175, "address": "Swaroop Nagar", "specialty": "Government, General Medicine", "phone": "+91-512-2537611"},
        {"name": "Madhuraj Hospital", "distance": "4.1 km", "time": "18 mins", "rating": "4.6", "lat": 26.4842, "lng": 80.3150, "address": "113/121, Swaroop Nagar", "specialty": "Gynecology, Orthopedics", "phone": "+91-512-2551500"},
        {"name": "Apollo Spectra Hospitals", "distance": "5.5 km", "time": "22 mins", "rating": "4.7", "lat": 26.4764, "lng": 80.3422, "address": "Chuniganj, Mall Road", "specialty": "Surgery, Orthopedics", "phone": "+91-512-3982828"},
        {"name": "Prakhar Hospital", "distance": "1.2 km", "time": "5 mins", "rating": "4.5", "lat": 26.4828, "lng": 80.2974, "address": "117/N/72, Kakadeo", "specialty": "Neurology, General", "phone": "+91-9936450000"},
        {"name": "SPM Hospital", "distance": "6.0 km", "time": "25 mins", "rating": "4.3", "lat": 26.5020, "lng": 80.2700, "address": "Kalyanpur", "specialty": "General Physician, Emergency", "phone": "+91-512-2571221"},
        {"name": "Kulwanti Hospital", "distance": "1.5 km", "time": "6 mins", "rating": "4.4", "lat": 26.4800, "lng": 80.2950, "address": "Kakadeo", "specialty": "Cardiology, ENT", "phone": "+91-512-2500000"},
        {"name": "Rama Hospital", "distance": "7.2 km", "time": "28 mins", "rating": "4.1", "lat": 26.5050, "lng": 80.2650, "address": "Lakhanpur, Kalyanpur", "specialty": "Multi-Speciality", "phone": "+91-512-2584223"},
        {"name": "Mariampur Hospital", "distance": "3.0 km", "time": "12 mins", "rating": "4.6", "lat": 26.4650, "lng": 80.3100, "address": "Shastri Nagar", "specialty": "Pediatrics, Maternity", "phone": "+91-512-2295600"},
        {"name": "Fortune Hospital", "distance": "8.5 km", "time": "32 mins", "rating": "4.4", "lat": 26.5120, "lng": 80.2500, "address": "Awas Vikas", "specialty": "Surgery, Diagnostics", "phone": "+91-512-2580111"},
        {"name": "Chandreshwar Hospital", "distance": "5.0 km", "time": "20 mins", "rating": "4.2", "lat": 26.4350, "lng": 80.3300, "address": "Kidwai Nagar", "specialty": "Orthopedics", "phone": "+91-512-2615555"},
        {"name": "South City Hospital", "distance": "4.8 km", "time": "19 mins", "rating": "4.3", "lat": 26.4400, "lng": 80.3250, "address": "O Block, Kidwai Nagar", "specialty": "General Medicine", "phone": "+91-512-2601234"},
        {"name": "Royal Hospital", "distance": "5.2 km", "time": "21 mins", "rating": "4.1", "lat": 26.4380, "lng": 80.3280, "address": "Kidwai Nagar", "specialty": "Emergency Care", "phone": "+91-512-2620000"},
        {"name": "Excel Hospital", "distance": "3.5 km", "time": "14 mins", "rating": "4.5", "lat": 26.4780, "lng": 80.3200, "address": "Arya Nagar", "specialty": "Multi-Speciality", "phone": "+91-512-2550000"},
        {"name": "Krishna Super Speciality", "distance": "6.8 km", "time": "26 mins", "rating": "4.6", "lat": 26.4550, "lng": 80.3550, "address": "Harrisganj, Cantt", "specialty": "Cardiology, Urology", "phone": "+91-512-2331111"},
        {"name": "Abha Super Speciality", "distance": "4.5 km", "time": "17 mins", "rating": "4.4", "lat": 26.4480, "lng": 80.3220, "address": "Nirala Nagar", "specialty": "Gynecology", "phone": "+91-512-2645555"},
        {"name": "Panacea Hospital", "distance": "7.5 km", "time": "28 mins", "rating": "4.3", "lat": 26.4250, "lng": 80.3050, "address": "Barra 2", "specialty": "General Medicine", "phone": "+91-512-2281111"},
        {"name": "New Leelamani Hospital", "distance": "4.0 km", "time": "15 mins", "rating": "4.5", "lat": 26.4700, "lng": 80.3400, "address": "Civil Lines", "specialty": "Orthopedics, Trauma", "phone": "+91-512-2305555"},
        {"name": "Brij Medical Centre", "distance": "4.2 km", "time": "16 mins", "rating": "4.2", "lat": 26.4680, "lng": 80.3450, "address": "PPN Market", "specialty": "Diagnostics, General", "phone": "+91-512-2311234"},
        {"name": "Florets Hospital", "distance": "1.8 km", "time": "7 mins", "rating": "4.4", "lat": 26.4850, "lng": 80.2920, "address": "Kakadeo", "specialty": "Multi-Speciality", "phone": "+91-512-2505050"},
        {"name": "JL Rohatgi Hospital", "distance": "2.7 km", "time": "11 mins", "rating": "4.6", "lat": 26.4750, "lng": 80.3120, "address": "Sarvodaya Nagar", "specialty": "Eye, General", "phone": "+91-512-2215000"},
        {"name": "Gouri Hospital", "distance": "5.8 km", "time": "24 mins", "rating": "4.1", "lat": 26.4620, "lng": 80.3500, "address": "Mall Road", "specialty": "Dermatology", "phone": "+91-512-2361111"},
        {"name": "Garg Hospital", "distance": "6.2 km", "time": "25 mins", "rating": "4.3", "lat": 26.4300, "lng": 80.3150, "address": "Saket Nagar", "specialty": "General Physician", "phone": "+91-512-2231234"},
        {"name": "Priya Hospital", "distance": "8.0 km", "time": "30 mins", "rating": "4.0", "lat": 26.4150, "lng": 80.3350, "address": "Yashoda Nagar", "specialty": "Emergency", "phone": "+91-512-2275555"},
        {"name": "Narayana Hospital", "distance": "8.2 km", "time": "31 mins", "rating": "4.5", "lat": 26.4450, "lng": 80.2850, "address": "Ratan Lal Nagar", "specialty": "Cardiology", "phone": "+91-512-2288888"},
        {"name": "Tulsi Hospital", "distance": "9.5 km", "time": "35 mins", "rating": "4.2", "lat": 26.3950, "lng": 80.3200, "address": "Naubasta", "specialty": "General Medicine", "phone": "+91-512-2260000"},
        {"name": "Sulabh Hospital", "distance": "12.0 km", "time": "45 mins", "rating": "4.1", "lat": 26.4000, "lng": 80.3800, "address": "Chakeri", "specialty": "Orthopedics", "phone": "+91-512-2451111"},
        {"name": "Shivani Hospital", "distance": "10.5 km", "time": "40 mins", "rating": "4.3", "lat": 26.4100, "lng": 80.3600, "address": "Shyam Nagar", "specialty": "Gynecology", "phone": "+91-512-2425555"},
        {"name": "Star Hospital", "distance": "14.0 km", "time": "50 mins", "rating": "4.0", "lat": 26.4200, "lng": 80.4000, "address": "Jajmau", "specialty": "General", "phone": "+91-512-2460000"},
        {"name": "Aastha Hospital", "distance": "5.5 km", "time": "22 mins", "rating": "4.4", "lat": 26.4350, "lng": 80.3320, "address": "Kidwai Nagar", "specialty": "Pediatrics", "phone": "+91-512-2618888"},
        {"name": "Life Care Hospital", "distance": "6.0 km", "time": "23 mins", "rating": "4.2", "lat": 26.4500, "lng": 80.3000, "address": "Govind Nagar", "specialty": "Multi-Speciality", "phone": "+91-512-2651111"},
        {"name": "City Hospital", "distance": "3.2 km", "time": "13 mins", "rating": "4.1", "lat": 26.4600, "lng": 80.3250, "address": "Fazalganj", "specialty": "Emergency Care", "phone": "+91-512-2225555"},
        {"name": "Care Hospital", "distance": "4.5 km", "time": "18 mins", "rating": "4.5", "lat": 26.4950, "lng": 80.3050, "address": "Vikas Nagar", "specialty": "Neurology", "phone": "+91-512-2585555"},
        {"name": "ESI Hospital", "distance": "2.8 km", "time": "11 mins", "rating": "3.9", "lat": 26.4680, "lng": 80.3050, "address": "Pandu Nagar", "specialty": "Government, General", "phone": "+91-512-2210000"},
        {"name": "Kanpur Medical Centre", "distance": "3.5 km", "time": "14 mins", "rating": "4.6", "lat": 26.4750, "lng": 80.3250, "address": "Ashok Nagar", "specialty": "Cardiology, Surgery", "phone": "+91-512-2555555"},
        {"name": "KPM Hospital", "distance": "5.5 km", "time": "22 mins", "rating": "4.0", "lat": 26.4600, "lng": 80.3450, "address": "Moolganj", "specialty": "General Medicine", "phone": "+91-512-2315555"},
        {"name": "Ursula Horsman (UHM)", "distance": "4.5 km", "time": "17 mins", "rating": "4.1", "lat": 26.4680, "lng": 80.3500, "address": "Civil Lines", "specialty": "Government, Emergency", "phone": "+91-512-2300000"},
        {"name": "Dufferin Hospital", "distance": "5.0 km", "time": "20 mins", "rating": "4.0", "lat": 26.4650, "lng": 80.3550, "address": "Birhana Road", "specialty": "Maternity", "phone": "+91-512-2311111"},
        {"name": "Murari Hospital", "distance": "3.4 km", "time": "14 mins", "rating": "4.2", "lat": 26.4580, "lng": 80.3200, "address": "Fazalganj", "specialty": "Orthopedics", "phone": "+91-512-2220000"},
        {"name": "Rajendra Hospital", "distance": "7.8 km", "time": "29 mins", "rating": "4.3", "lat": 26.4200, "lng": 80.3000, "address": "Barra 8", "specialty": "Multi-Speciality", "phone": "+91-512-2285555"},
        {"name": "Synergy Hospital", "distance": "6.5 km", "time": "25 mins", "rating": "4.5", "lat": 26.5000, "lng": 80.2750, "address": "Kalyanpur", "specialty": "Neurology, Surgery", "phone": "+91-512-2575555"},
        {"name": "Sanjeevani Hospital", "distance": "8.5 km", "time": "32 mins", "rating": "4.1", "lat": 26.4100, "lng": 80.3400, "address": "Yashoda Nagar", "specialty": "General Medicine", "phone": "+91-512-2270000"},
        {"name": "Hope Hospital", "distance": "10.0 km", "time": "38 mins", "rating": "4.4", "lat": 26.4150, "lng": 80.3650, "address": "Shyam Nagar", "specialty": "Pediatrics", "phone": "+91-512-2421111"},
        {"name": "Anand Hospital", "distance": "3.8 km", "time": "15 mins", "rating": "4.6", "lat": 26.4820, "lng": 80.3160, "address": "Swaroop Nagar", "specialty": "Gastroenterology", "phone": "+91-512-2558888"},
        {"name": "Aayushman Hospital", "distance": "1.5 km", "time": "6 mins", "rating": "4.3", "lat": 26.4840, "lng": 80.2940, "address": "Kakadeo", "specialty": "Trauma, Emergency", "phone": "+91-512-2501111"},
        {"name": "Prakash Hospital", "distance": "4.9 km", "time": "19 mins", "rating": "4.2", "lat": 26.4380, "lng": 80.3320, "address": "Kidwai Nagar", "specialty": "Orthopedics", "phone": "+91-512-2612222"},
        {"name": "Nidan Hospital", "distance": "7.0 km", "time": "27 mins", "rating": "4.1", "lat": 26.4280, "lng": 80.3080, "address": "Barra", "specialty": "Diagnostics, General", "phone": "+91-512-2282222"},
        {"name": "Sneh Hospital", "distance": "6.0 km", "time": "24 mins", "rating": "4.4", "lat": 26.4320, "lng": 80.3180, "address": "Saket Nagar", "specialty": "Maternity, IVF", "phone": "+91-512-2235555"},
        {"name": "V-Care Hospital", "distance": "8.0 km", "time": "30 mins", "rating": "4.5", "lat": 26.4420, "lng": 80.2820, "address": "Ratan Lal Nagar", "specialty": "Cardiology, ENT", "phone": "+91-512-2284444"}
    ]
    
    symptoms_text = data.symptoms.lower()
    
    # Keyword based Smart Routing
    target_specialty = "Multi-Speciality" # Default fallback
    
    if any(word in symptoms_text for word in ["heart", "chest", "bp", "blood pressure", "palpitation", "breath"]):
        target_specialty = "Cardiology"
    elif any(word in symptoms_text for word in ["bone", "joint", "fracture", "pain", "back", "knee", "muscle"]):
        target_specialty = "Orthopedics"
    elif any(word in symptoms_text for word in ["skin", "rash", "acne", "itch", "hair"]):
        target_specialty = "Dermatology"
    elif any(word in symptoms_text for word in ["pregnant", "period", "women", "stomach pain"]):
        target_specialty = "Gynecology"
    elif any(word in symptoms_text for word in ["brain", "nerve", "stroke", "dizzy", "headache"]):
        target_specialty = "Neurology"
    elif any(word in symptoms_text for word in ["child", "baby", "kid", "infant"]):
        target_specialty = "Pediatrics"
    elif any(word in symptoms_text for word in ["eye", "vision", "blur", "blind"]):
        target_specialty = "Eye"

    # Filter out the relevant clinics
    filtered_clinics = []
    for clinic in kanpur_50_clinics:
        # Check if target specialty matches, OR if the hospital is a general/multi-speciality one
        if target_specialty in clinic["specialty"] or "Multi-Speciality" in clinic["specialty"] or "General" in clinic["specialty"]:
            filtered_clinics.append(clinic)

    # Return top 10 relevant clinics instead of overwhelming the user
    return {"centers": filtered_clinics[:10]}