import React, { useState } from 'react';

const App = () => {
  const [selectedError, setSelectedError] = useState(null);

  const errorLogs = [
    {
      id: 'e1',
      symptom: 'Back / Muscle Pain',
      errorName: 'Physical Alignment Issue',
      treatment: 'Mobility & Posture Correction',
      time: '20 MINS',
      cost: '₹450',
      station: 'City Wellness Center',
    },
    {
      id: 'e2',
      symptom: 'Headache / Constant Stress',
      errorName: 'High Mental Fatigue',
      treatment: 'Stress Reset Protocol',
      time: '15 MINS',
      cost: '₹300',
      station: 'Mind Wellness Clinic',
    },
    {
      id: 'e3',
      symptom: 'Low Energy / Exhaustion',
      errorName: 'Vitality Levels Critically Low',
      treatment: 'Energy Restoration Plan',
      time: '10 MINS',
      cost: '₹200',
      station: 'General Health Hub',
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8 font-['Poppins'] antialiased">
      <header className="max-w-6xl mx-auto mb-10 pb-6 border-b border-slate-200 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight flex items-baseline gap-2">
            Performance Optimizer
            <span className="text-slate-400 text-sm font-normal">v1.0</span>
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Run diagnostics and schedule routine maintenance securely.
          </p>
        </div>
        <div className="md:text-right">
          <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">System Status</div>
          <div className="text-emerald-600 font-medium flex items-center md:justify-end gap-2 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Secure Connection Online
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-slate-800 flex items-center gap-2 mb-6">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Select Error Log
          </h2>
          
          <div className="space-y-3">
            {errorLogs.map((error) => (
              <button
                key={error.id}
                onClick={() => setSelectedError(error)}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-200 ${
                  selectedError?.id === error.id
                    ? 'border-blue-500 bg-blue-50 shadow-sm ring-1 ring-blue-500'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <div className="text-xs text-slate-500 mb-1.5 font-medium">Detected Input: {error.symptom}</div>
                <div className={`font-semibold text-base ${selectedError?.id === error.id ? 'text-blue-700' : 'text-slate-800'}`}>
                  {error.errorName}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="h-full bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col justify-center min-h-[400px]">
            {!selectedError ? (
              <div className="text-center text-slate-400">
                <svg className="w-12 h-12 mx-auto mb-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="font-medium text-sm">Awaiting Error Log Selection...</p>
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h3 className="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-2">
                    Recommended Action
                  </h3>
                  <div className="text-2xl font-bold text-slate-900">
                    {selectedError.treatment}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 border-y border-slate-100 py-6">
                  <div>
                    <div className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-2">Estimated Time</div>
                    <div className="text-3xl font-bold text-blue-600">{selectedError.time}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-2">Resource Cost</div>
                    <div className="text-3xl font-bold text-slate-900">{selectedError.cost}</div>
                  </div>
                </div>

                <div>
                  <div className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-2">Location</div>
                  <div className="text-base font-medium text-slate-800 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {selectedError.station}
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-lg transition-colors duration-200 mt-4 shadow-sm flex justify-center items-center gap-2">
                  Initiate Tune-Up Sequence
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;