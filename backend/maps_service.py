import os
import googlemaps
from dotenv import load_dotenv

load_dotenv()
gmaps = googlemaps.Client(key=os.getenv("MAPS_API_KEY"))

def get_nearest_centers(location: str):
    try:
        places_result = gmaps.places(query=f"wellness center near {location}")
        
        return places_result.get('results', [])[:3]
    except Exception as e:
        return {"error": "Maps data fetch karne mein problem aayi."}