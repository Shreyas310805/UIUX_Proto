# maps_service.py (Hackathon Mock Version)
import random

def get_nearest_centers(symptom_category="General"):
    """
    Mock function to simulate Google Maps API for the Hackathon.
    Returns realistic local data without needing an API key or billing setup.
    """
    
    # Realistic dummy data for Kanpur locations
    mock_clinics = [
        {
            "name": "Swaroop Nagar Performance Clinic",
            "distance": "1.2 km",
            "time": "8 MINS",
            "rating": 4.8,
            "phone": "+91 98765 43210"
        },
        {
            "name": "Kakadeo Wellness Hub",
            "distance": "3.5 km",
            "time": "15 MINS",
            "rating": 4.5,
            "phone": "+91 98765 43211"
        },
        {
            "name": "Civil Lines Structural Tune-Up",
            "distance": "5.0 km",
            "time": "22 MINS",
            "rating": 4.9,
            "phone": "+91 98765 43212"
        }
    ]
    
    # Randomly shuffle so it looks different each time
    random.shuffle(mock_clinics)
    
    # Return the top 2 closest ones
    return mock_clinics[:2]