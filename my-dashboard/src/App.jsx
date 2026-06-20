import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Vite ke saath Leaflet icons ka classic fix
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 15, { animate: true, duration: 1.5 });
  }, [center, map]);
  return null;
};

const App = () => {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [clinicsData, setClinicsData] = useState([]);
  
  const [mapCenter, setMapCenter] = useState([26.4499, 80.3319]);
  const [selectedClinicInfo, setSelectedClinicInfo] = useState(null);
  const [activeClinicName, setActiveClinicName] = useState("");

  const waitTimes = ["Available in 15 mins", "Est. Wait: 30 mins", "Available Now", "Est. Wait: 45 mins", "Walk-in Only"];

  const handleAnalyze = async () => {
    if (!userInput.trim()) return; 
    
    setIsLoading(true);
    setAiAnalysis(null);
    setClinicsData([]);
    setSelectedClinicInfo(null);
    setActiveClinicName("");
    
    try {
      const aiResponse = await fetch("http://127.0.0.1:8000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: userInput })
      });
      const aiData = await aiResponse.json();
      
      const clinicResponse = await fetch("http://127.0.0.1:8000/api/clinics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: "Kanpur", symptoms: userInput }) 
      });
      const clinicData = await clinicResponse.json();

      setAiAnalysis(aiData.wellness_evaluation);
      setClinicsData(clinicData.centers);

    } catch (error) {
      console.error("Connection Error:", error);
      setAiAnalysis("System offline. Unable to reach the servers.");
    }
    
    setIsLoading(false);
  };

  const handleClinicClick = (clinic, index) => {
    if (clinic.lat && clinic.lng) {
      setMapCenter([clinic.lat, clinic.lng]);
    }
    setActiveClinicName(clinic.name);
    setSelectedClinicInfo({
      ...clinic,
      waitTime: waitTimes[index % waitTimes.length]
    });
  };

  const closeClinicModal = () => {
    setSelectedClinicInfo(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-8 font-sans antialiased relative z-0">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Blurs when modal open */}
        <header className={`mb-10 pb-6 border-b border-slate-200 transition-all duration-500 ${selectedClinicInfo ? 'blur-[5px] opacity-40' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
                <path fillRule="evenodd" d="M11.978 2.595a.75.75 0 0 1 .696 0l8.625 4.99c.406.235.65.65.65 1.113v9.55a.75.75 0 0 1-.365.644l-8.625 5.033a.75.75 0 0 1-.72 0l-8.625-5.033a.75.75 0 0 1-.365-.644V8.698c0-.462.244-.878.65-1.113l8.625-4.99ZM12 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm5 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-5 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm5 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" clipRule="evenodd" />
                <path d="M12 7.5a.75.75 0 0 1 .75.75v3h3a.75.75 0 0 1 0 1.5h-3v3a.75.75 0 0 1-1.5 0v-3h-3a.75.75 0 0 1 0-1.5h3v-3a.75.75 0 0 1 .75-.75Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">HealthConnect AI</h1>
              <p className="text-slate-500 mt-1 text-sm">Minimal, Smart, Fast Diagnostics</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          
          {/* COLUMN 1: Diagnostics Input - Blurs when modal open */}
          <div className={`space-y-6 transition-all duration-500 ${selectedClinicInfo ? 'blur-[5px] opacity-40' : ''}`}>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-3">How are you feeling today?</label>
              <textarea
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                rows="6"
                placeholder="E.g., I have severe chest pain and breathlessness..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              ></textarea>
              
              <button 
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-3.5 px-4 rounded-xl transition-colors shadow-sm flex justify-center items-center gap-2"
              >
                {isLoading ? "Processing Data..." : "Analyze Symptoms"}
              </button>
            </div>
          </div>

          {/* COLUMN 2: Clinic List - Blurs when modal open */}
          <div className={`space-y-6 transition-all duration-500 ${selectedClinicInfo ? 'blur-[5px] opacity-40' : ''}`}>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm min-h-[400px] flex flex-col justify-between">
              
              {!aiAnalysis && !isLoading ? (
                <div className="text-center text-slate-400 my-auto">Awaiting symptom input...</div>
              ) : isLoading ? (
                 <div className="text-center text-blue-500 animate-pulse my-auto font-medium">Consulting AI Engine...</div>
              ) : (
                <div className="space-y-6 flex-1">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">AI Diagnostic Review</h3>
                    <div className="text-sm leading-relaxed font-medium text-slate-800 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                      {aiAnalysis}
                    </div>
                  </div>

                  {clinicsData.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex justify-between">
                        <span>Nearest Match</span>
                        <span className="text-blue-500">{clinicsData.length} Results</span>
                      </h3>
                      <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                        {clinicsData.map((clinic, index) => (
                          <div 
                            key={index} 
                            onClick={() => handleClinicClick(clinic, index)}
                            className={`border rounded-xl p-3 flex justify-between items-center cursor-pointer transition-all ${
                              activeClinicName === clinic.name 
                                ? 'border-blue-500 bg-blue-50/30 shadow-md ring-2 ring-blue-200' 
                                : 'border-slate-100 bg-white hover:border-slate-300'
                            }`}
                          >
                            <div className="truncate mr-2">
                              <div className={`font-semibold text-sm truncate transition-colors ${activeClinicName === clinic.name ? 'text-blue-800' : 'text-slate-900'}`}>{clinic.name}</div>
                              <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                                <span>{clinic.distance}</span>
                                <span className={`font-medium ${activeClinicName === clinic.name ? 'text-blue-700' : 'text-blue-600'}`}>{waitTimes[index % waitTimes.length]}</span>
                              </div>
                            </div>
                            <div className="bg-emerald-50 text-emerald-700 font-bold text-xs px-2 py-0.5 rounded-md shrink-0">
                              ★ {clinic.rating}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 3: Live Map - ALWAYS CLEAR & HIGHLIGHTED */}
          <div className="lg:col-span-1">
            <div 
              className={`bg-white border border-slate-200 rounded-2xl p-4 h-full min-h-[400px] flex flex-col transition-all duration-500 ${
                selectedClinicInfo 
                ? 'relative z-[50] shadow-2xl ring-4 ring-blue-500/30 scale-[1.02]' 
                : 'relative z-10 shadow-sm' 
              }`}
            >
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Live Clinic Tracking</h3>
              
              <div className="w-full flex-1 bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200 z-0">
                <MapContainer center={mapCenter} zoom={14} style={{ height: "100%", width: "100%", minHeight: "350px" }} zoomControl={false}>
                  <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapUpdater center={mapCenter} />
                  {selectedClinicInfo && (
                    <Marker position={[selectedClinicInfo.lat, selectedClinicInfo.lng]}>
                      <Popup>
                        <div className="font-bold">{selectedClinicInfo.name}</div>
                        <div className="text-xs text-slate-500">{selectedClinicInfo.specialty}</div>
                      </Popup>
                    </Marker>
                  )}
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- OVERLAYS --- */}

      {/* 1. DARK BACKDROP (z-40) */}
      {selectedClinicInfo && (
        <div 
          className="fixed inset-0 bg-slate-900/30 z-[40] transition-opacity animate-fade-in" 
          onClick={closeClinicModal}
        ></div>
      )}

      {/* 2. MODAL CARD (z-60) - SHIFTED TO THE LEFT ON LARGE SCREENS */}
      {selectedClinicInfo && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center lg:pr-[33vw] p-4 sm:p-6 pointer-events-none animate-fade-in">
          
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 pointer-events-auto">
            
            <div className="bg-blue-600 p-6 text-white relative">
              <button 
                onClick={closeClinicModal}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-blue-700/50 hover:bg-blue-700 p-1.5 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-emerald-400 text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                  ★ {selectedClinicInfo.rating} Rating
                </span>
                <span className="bg-blue-500 text-white border border-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                  {selectedClinicInfo.distance} Away
                </span>
              </div>
              <h2 className="text-2xl font-bold pr-8 leading-tight">{selectedClinicInfo.name}</h2>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex flex-col gap-1 pb-4 border-b border-slate-100">
                <div className="text-sm font-semibold text-slate-800">Specialty</div>
                <div className="text-slate-600 text-sm">{selectedClinicInfo.specialty}</div>
              </div>

              <div className="flex gap-3 pb-4 border-b border-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <div className="text-sm font-semibold text-slate-800">Location</div>
                  <div className="text-slate-600 text-sm">{selectedClinicInfo.address}, Kanpur</div>
                </div>
              </div>

              <div className="flex gap-3 pb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <div className="text-sm font-semibold text-slate-800">Contact Desk</div>
                  <div className="text-slate-600 text-sm font-mono">{selectedClinicInfo.phone}</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between">
               <div className="text-xs font-semibold text-slate-500">
                 Status: <span className="text-emerald-600 font-bold">{selectedClinicInfo.waitTime}</span>
               </div>
               <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-5 rounded-lg transition-colors shadow-sm">
                 Book Appointment
               </button>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default App;