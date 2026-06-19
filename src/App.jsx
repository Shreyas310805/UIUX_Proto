import React, { useState } from 'react';

const SystemDashboard = () => {
  const [selectedError, setSelectedError] = useState(null);

  // Mock data - in production, this comes from your backend
  const errorLogs = [
    {
      id: 'e1',
      symptom: 'Back pain',
      errorName: 'Chassis Realignment Required',
      treatment: 'Structural Component Patch',
      time: '20 MINS',
      cost: '₹450',
      station: 'City Center Maintenance Station',
    },
    {
      id: 'e2',
      symptom: 'Headache / Stress',
      errorName: 'CPU Overheating / Memory Leak',
      treatment: 'Cooling System Tune-up',
      time: '15 MINS',
      cost: '₹300',
      station: 'Mind Wellness Maintenance Station',
    },
    {
      id: 'e3',
      symptom: 'Fatigue',
      errorName: 'Severe Battery Depletion',
      treatment: 'Energy Core Diagnostic',
      time: '10 MINS',
      cost: '₹200',
      station: 'General Service Station',
    }
  ];

  const handleIssueSelect = (error) => {
    // This is where you will eventually make a POST request to your Python backend.
    // The Python server can route this input through the LLM fallback to dynamically 
    // generate the error log mapping, time, and cost, rather than using a static localized database.
    setSelectedError(error);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8 font-mono">
      {/* Header aligned with UI/UX Wireframing rules */}
      <header className="mb-12 border-b border-green-500/30 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-green-400 tracking-tighter uppercase">
            System Optimizer <span className="text-gray-500 text-xl">// V1.0</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest">
            Run diagnostics and schedule routine maintenance
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500 uppercase">System Status</div>
          <div className="text-green-400 font-bold animate-pulse">ONLINE</div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Issue Selector Control */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-ping"></div>
            <h2 className="text-xl font-bold uppercase tracking-wider text-gray-300">
              Select Error Log
            </h2>
          </div>
          
          <div className="space-y-4">
            {errorLogs.map((error) => (
              <button
                key={error.id}
                onClick={() => handleIssueSelect(error)}
                className={`w-full text-left p-5 rounded-md border-2 transition-all duration-200 group relative overflow-hidden ${
                  selectedError?.id === error.id
                    ? 'border-green-400 bg-green-900/20'
                    : 'border-gray-800 bg-gray-900 hover:border-gray-600'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs text-gray-500 mb-1 uppercase">Detected Input: {error.symptom}</div>
                    <div className={`font-bold text-lg ${selectedError?.id === error.id ? 'text-green-400' : 'text-gray-300 group-hover:text-white'}`}>
                      {'>'} {error.errorName}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Right Column: The "Tune-Up" Summary Widget */}
        <section>
          <div className="h-full border border-gray-800 bg-gray-900/50 rounded-lg p-8 relative overflow-hidden flex flex-col justify-center">
            {/* Background design elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-20"></div>
            
            {!selectedError ? (
              <div className="text-center text-gray-600 uppercase tracking-widest">
                <div className="text-4xl mb-4">⚙️</div>
                Awaiting Error Log Selection...
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h3 className="text-green-400 text-sm font-bold tracking-widest uppercase mb-1">
                    Recommended Action
                  </h3>
                  <div className="text-3xl font-black text-white uppercase tracking-tighter">
                    {selectedError.treatment}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 border-y border-gray-800 py-6">
                  {/* Time and Cost displayed boldly as requested */}
                  <div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">Estimated Time</div>
                    <div className="text-5xl font-black text-green-400">{selectedError.time}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">Resource Cost</div>
                    <div className="text-5xl font-black text-white">{selectedError.cost}</div>
                  </div>
                </div>

                <div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">Location</div>
                  <div className="text-lg font-bold text-gray-300 flex items-center space-x-2">
                    <span>📍</span>
                    <span>{selectedError.station}</span>
                  </div>
                </div>

                <button className="w-full bg-green-500 hover:bg-green-400 text-gray-950 font-black text-xl py-4 uppercase tracking-widest transition-colors duration-200 mt-8">
                  Initiate Tune-Up Sequence
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SystemDashboard;