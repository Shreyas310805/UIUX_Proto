from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from ai_service import get_wellness_translation
from maps_service import get_nearest_centers

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SymptomData(BaseModel):
    symptoms: str

class LocationData(BaseModel):
    location: str


@app.post("/api/analyze")
def analyze_symptoms(data: SymptomData):
    result = get_wellness_translation(data.symptoms)
    return {"wellness_evaluation": result}


@app.post("/api/clinics")
def find_clinics(data: LocationData):
    centers = get_nearest_centers(data.location)
    return {"centers": centers}