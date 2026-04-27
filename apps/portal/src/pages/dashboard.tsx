import React from 'react';

// Devopstrio Audit Trail Immutability (ATI)
// Executive Cryptographic Posture Dashboard

const StatusBadge = ({ verified }: { verified: boolean }) => (
    verified ?
        <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            Provable
        </span> :
        <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-rose-600 bg-rose-50 px-2 py-1 rounded border border-rose-200">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            Tampered
        </span>
);

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/50">
            {/* Header / Forensic Topbar */}
            <header className="border-b border-slate-800 bg-slate-900 sticky top-0 z-50">
                <div className="max-w-screen-2xl mx-auto px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <h1 className="text-lg font-bold text-white tracking-tight">Audit Immutability Console</h1>
                    </div>
                    <nav className="flex gap-6 text-sm font-semibold">
                        <a href="#" className="text-indigo-400 border-b-2 border-indigo-400 pb-5 pt-5">Ledger Posture</a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors pt-5 pb-5">Forensic Search</a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors pt-5 pb-5">Legal Holds</a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors pt-5 pb-5">Connector Sync</a>
                    </nav>
                </div>
            </header>

            <main className="max-w-screen-2xl mx-auto px-8 py-8">

                {/* Global Ledger Key Performance Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { title: 'Total Events Sealed', value: '1.42B', sub: 'Across 14 Sources', color: 'indigo' },
                        { title: 'Cryptographic Blocks', value: '42,019', sub: 'Running Ledger', color: 'purple' },
                        { title: 'Verification Pass Rate', value: '100%', sub: 'Last 90 Days', color: 'emerald' },
                        { title: 'WORM Storage Delta', value: '+4.2 TB', sub: 'Trailing 30 Days', color: 'blue' }
                    ].map((kpi, idx) => (
                        <div key={idx} className={`bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden group`}>
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-${kpi.color}-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2`}></div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{kpi.title}</h4>
                            <div className="text-3xl font-black text-white mt-2 font-mono">{kpi.value}</div>
                            <p className="text-xs text-slate-500 mt-2">{kpi.sub}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                    {/* Live Cryptographic Block Stream */}
                    <div className="xl:col-span-2 bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-white">Live Ledger Feed</h2>
                            <span className="flex items-center gap-2 text-xs text-indigo-400 font-bold bg-indigo-900/40 px-3 py-1 rounded-full border border-indigo-500/30">
                                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                                Awaiting New Blocks
                            </span>
                        </div>

                        <div className="space-y-4">
                            {[
                                { id: 'Block 42,019', hash: '0x94f...2a1b', events: '4,204', sources: ['AWS CloudTrail', 'Azure AD'], time: '2 mins ago', verified: true },
                                { id: 'Block 42,018', hash: '0x41c...8ff0', events: '14,992', sources: ['GitHub', 'Kubernetes'], time: '7 mins ago', verified: true },
                                { id: 'Block 42,017', hash: '0x1bb...7c82', events: '1,002', sources: ['Splunk Forwarder'], time: '13 mins ago', verified: true },
                            ].map((block, idx) => (
                                <div key={idx} className="border border-slate-700 bg-slate-900/50 p-4 rounded-lg flex items-center justify-between hover:border-indigo-500/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-slate-800 flex flex-col items-center justify-center border border-slate-700">
                                            <span className="text-[10px] text-slate-500 uppercase font-bold">Root</span>
                                            <svg className="w-5 h-5 text-indigo-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                        </div>
                                        <div>
                                            <div className="font-bold text-white flex items-center gap-3">
                                                {block.id}
                                                <span className="font-mono text-[11px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">{block.hash}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2 text-xs font-medium text-slate-500">
                                                <span>Contains {block.events} Events</span>
                                                <span>•</span>
                                                <span>Sources: {block.sources.join(', ')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <StatusBadge verified={block.verified} />
                                        <span className="text-[10px] font-bold text-slate-600 uppercase">{block.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Operational Integrity Checks */}
                    <div className="flex flex-col gap-6">

                        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-lg">
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Integrity Validation</h2>

                            <div className="p-4 rounded-lg bg-emerald-900/20 border border-emerald-500/30 mb-4">
                                <div className="flex items-center gap-3 text-emerald-400 mb-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span className="font-bold">Continuous Audit Passed</span>
                                </div>
                                <p className="text-xs text-emerald-600">The Verification Engine has recalculated 42,019 blocks against WORM storage hashes. 0 discrepancies found.</p>
                            </div>

                            <button className="w-full bg-slate-700 hover:bg-indigo-600 text-white font-bold py-3 rounded-lg shadow-md transition-colors text-sm border border-slate-600 hover:border-indigo-500">
                                Trigger Manual Deep Scan
                            </button>
                        </div>

                        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-lg flex-1">
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Forensic Exporter</h2>
                            <p className="text-xs text-slate-500 mb-4">Generate digitally signed PDFs containing complete mathematical proofs linking specific events to immutable Blockchain hashes for legal discovery.</p>

                            <div className="space-y-3">
                                <input type="text" placeholder="Search actor e.g. bob@corp.com" className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
                                <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded shadow-md transition-colors text-sm">
                                    Generate Evidence Pack
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
