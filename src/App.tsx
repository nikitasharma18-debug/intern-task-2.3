/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Clock, 
  CheckCircle2, 
  Zap, 
  Search, 
  Filter, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  Database, 
  Plus, 
  ArrowUpRight, 
  TrendingUp, 
  Sliders, 
  ChevronDown,
  Info,
  HelpCircle,
  FileText
} from 'lucide-react';

// Data and Types
import { MOCK_PROPOSALS } from './data';
import { EIPProposal, EIPStatus, EIPCategory, MetricCardValue } from './types';

// Custom Subcomponents
import { MetricCard } from './components/MetricCard';
import { StatusVelocityChart } from './components/StatusVelocityChart';
import { StagnancyPredictor } from './components/StagnancyPredictor';
import { VelocityComparison } from './components/VelocityComparison';
import { BottleneckAnalysis } from './components/BottleneckAnalysis';
import { LifecycleTimeline } from './components/LifecycleTimeline';
import { AIInsights } from './components/AIInsights';

export default function App() {
  // Live mutable EIP list state to allow dynamic simulations and dynamic adding
  const [proposals, setProposals] = useState<EIPProposal[]>(MOCK_PROPOSALS);
  const [categoryFilter, setCategoryFilter] = useState<'all' | EIPCategory>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | EIPStatus>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Custom proposal simulation drawer
  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);
  const [simName, setSimName] = useState<string>('');
  const [simTitle, setSimTitle] = useState<string>('');
  const [simCat, setSimCat] = useState<EIPCategory>('Core');
  const [simStatus, setSimStatus] = useState<EIPStatus>('Draft');
  const [simDaysDraft, setSimDaysDraft] = useState<number>(45);

  // Dynamic calculations for dynamic KPIs
  const filteredProposals = useMemo(() => {
    return proposals.filter((p) => {
      const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchSearch = p.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchStatus && matchSearch;
    });
  }, [proposals, categoryFilter, statusFilter, searchQuery]);

  const kpiMetrics = useMemo((): Record<string, MetricCardValue> => {
    const totalCount = filteredProposals.length;
    
    // Avg finalization calculation
    const finalProposals = filteredProposals.filter(p => p.status === 'Final');
    const avgFinalTime = finalProposals.length > 0
      ? Math.round(finalProposals.reduce((sum, p) => sum + p.totalDays, 0) / finalProposals.length)
      : 215;

    // Success Rate: percentage of finalized or last call vs total
    const highStageCount = filteredProposals.filter(p => p.status === 'Final' || p.status === 'Last Call').length;
    const successRate = totalCount > 0 
      ? Math.round((highStageCount / totalCount) * 100) 
      : 65;

    // Velocity Score: calculated based on the reciprocal density of Draft durations
    const averageDraftDays = filteredProposals.reduce((sum, p) => sum + p.daysSpent.Draft, 0) / totalCount;
    const velocityScore = Math.min(98, Math.max(35, Math.round(100 - (averageDraftDays * 0.08))));

    return {
      activeEips: {
        title: 'Active Evaluated EIPs',
        value: totalCount,
        trend: 8.2,
        trendDirection: 'up',
        footnote: 'vs previous quarter',
        colorTheme: 'cyan'
      },
      avgFinalization: {
        title: 'Avg Finalization Time',
        value: `${avgFinalTime} Days`,
        trend: -14.5,
        trendDirection: 'up', // down is good for duration!
        footnote: '18% rate reduction',
        colorTheme: 'blue'
      },
      successRate: {
        title: 'Governance Success Rate',
        value: `${successRate}%`,
        trend: 4.1,
        trendDirection: 'up',
        footnote: 'Draft-to-Final conversion',
        colorTheme: 'emerald'
      },
      velocityScore: {
        title: 'Governance Velocity Score',
        value: `${velocityScore}/100`,
        trend: 12.3,
        trendDirection: 'up',
        footnote: 'Average consensus pace',
        colorTheme: 'purple'
      }
    };
  }, [filteredProposals]);

  // Insert a custom proposal into our state machine
  const handleCreateSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simName || !simTitle) return;

    const formattedId = simName.toUpperCase().startsWith('EIP-') || simName.toUpperCase().startsWith('ERC-')
      ? simName.toUpperCase()
      : `${simCat === 'ERC' ? 'ERC' : 'EIP'}-${simName}`;

    // Compute synthetic probability decay based on status and simulation value chosen
    let prob = 100;
    if (simStatus === 'Draft') {
      prob = Math.max(8, Math.round(98 * Math.exp(-1.1 * (simDaysDraft / 240))));
    } else if (simStatus === 'Review') {
      prob = 68;
    } else if (simStatus === 'Last Call') {
      prob = 91;
    }

    const newProposal: EIPProposal = {
      id: formattedId,
      title: simTitle,
      author: 'Simulated User Agent',
      category: simCat,
      status: simStatus,
      daysSpent: {
        Draft: simDaysDraft,
        Review: simStatus !== 'Draft' ? 45 : 0,
        'Last Call': simStatus === 'Last Call' || simStatus === 'Final' ? 14 : 0,
        Final: 0
      },
      totalDays: simDaysDraft + (simStatus !== 'Draft' ? 59 : 0),
      createdDate: new Date().toISOString().slice(0, 10),
      probabilityToFinal: prob,
      communityActivityScore: 75,
      reviewPrCount: 12,
      discussionThreads: 24,
      stagnantRisk: simDaysDraft > 300 ? 'High' : simDaysDraft > 120 ? 'Medium' : 'Low'
    };

    setProposals((prev) => [newProposal, ...prev]);
    setIsSimulatorOpen(false);

    // Reset fields
    setSimName('');
    setSimTitle('');
    setSimDaysDraft(45);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-zinc-100 cyber-grid relative pb-16">
      
      {/* Immersive background decoration blur blobs */}
      <div className="absolute top-24 left-[10%] w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-[10%] w-[500px] h-[500px] bg-cyber-purple/5 rounded-full blur-[180px] pointer-events-none z-0" />

      {/* Embedded Route Simulation header */}
      <div className="w-full bg-zinc-950/80 border-b border-white/5 py-2 px-4 flex items-center justify-between text-xs font-mono relative z-10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span className="text-gray-400">Environment: <strong className="text-gray-200">Ethereum Mainnet</strong></span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-400">Gas: <strong className="text-cyber-cyan">22 Gwei</strong></span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-400">Block Height: <strong className="text-gray-200">19,657,329</strong></span>
        </div>

        <div className="hidden sm:flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1 rounded-md text-gray-400">
          <span>Active Route:</span>
          <span className="text-cyber-cyan font-bold select-all">/analytics/velocity</span>
        </div>
      </div>

      {/* Main SaaS Platform header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyber-cyan to-cyber-purple flex items-center justify-center font-black text-white text-md tracking-widest leading-none shadow-lg">
                EI
              </div>
              <span className="text-sm font-extrabold tracking-widest text-zinc-400">EIPs<strong className="text-white">Insight</strong></span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Governance Velocity Dashboard
            </h1>
            <p className="text-sm text-gray-400">
              Track proposal progression, governance efficiency, and prediction insights across Ethereum standards.
            </p>
          </div>

          {/* Quick simulator trigger CTA button */}
          <button
            onClick={() => setIsSimulatorOpen(true)}
            className="self-start md:self-center bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-emerald hover:brightness-110 text-zinc-950 font-bold text-xs py-3 px-5 rounded-xl shadow-lg shadow-cyber-cyan/15 flex items-center gap-2 border border-white/15 transition-all"
          >
            <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
            Simulate Custom EIP
          </button>
        </div>

        {/* Multi-grid KPIs displays */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <MetricCard metric={kpiMetrics.activeEips} icon={Activity} />
          <MetricCard metric={kpiMetrics.avgFinalization} icon={Clock} />
          <MetricCard metric={kpiMetrics.successRate} icon={CheckCircle2} />
          <MetricCard metric={kpiMetrics.velocityScore} icon={Zap} />
        </div>
      </header>

      {/* Major Analytics modules sections container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 gap-8 relative z-10">
        
        {/* Row 1: Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Velocity Charts block - Main Feature 1 */}
          <div className="lg:col-span-12">
            <StatusVelocityChart />
          </div>

        </div>

        {/* Row 2: Stagnancy & Comparisons */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Feature 2: Stagnancy Predictor */}
          <div className="lg:col-span-6">
            <StagnancyPredictor />
          </div>

          {/* Main Feature 3: Side Comparison */}
          <div className="lg:col-span-7 lg:hidden">
            <VelocityComparison />
          </div>

          {/* Custom span optimization */}
          <div className="lg:col-span-6">
            <VelocityComparison />
          </div>

        </div>

        {/* Row 3: Timeline Flow State */}
        <div className="grid grid-cols-1">
          <LifecycleTimeline />
        </div>

        {/* Row 4: Bottleneck grid heatmap */}
        <div className="grid grid-cols-1">
          <BottleneckAnalysis />
        </div>

        {/* Row 5: AI Insights Conversational Area */}
        <div className="grid grid-cols-1">
          <AIInsights />
        </div>

        {/* Raw Proposals database explorer sheet - Elite Custom Feature */}
        <section className="rounded-2xl glass-card border border-white/5 p-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-cyber-cyan" />
                Evaluated EIP Standards Registry
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Deep dive and verify active telemetry metrics across all historically tracked proposals.
              </p>
            </div>

            {/* In-database filtering widgets */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Category selector */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-300">
                <Filter className="w-3.5 h-3.5 text-gray-500" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as any)}
                  className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="Core">Core Protocol</option>
                  <option value="ERC">ERCs</option>
                  <option value="Networking">Networking</option>
                  <option value="Interface">Interface</option>
                </select>
              </div>

              {/* Status selector */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-300">
                <Sliders className="w-3.5 h-3.5 text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="all">All States</option>
                  <option value="Draft">Draft</option>
                  <option value="Review">Review</option>
                  <option value="Last Call">Last Call</option>
                  <option value="Final">Final</option>
                </select>
              </div>

              {/* Text Search Box */}
              <div className="relative flex-1 md:flex-initial">
                <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search EIP ID or Title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-52 pl-9 pr-3 py-1.5 rounded-lg bg-zinc-950 border border-white/5 focus:border-cyber-cyan text-xs text-white placeholder-gray-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-zinc-950">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.01] text-[10px] text-gray-500 font-mono uppercase">
                  <th className="py-3 px-4">Standard ID</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Title Specification</th>
                  <th className="py-3 px-4 text-center">Lifecycle Status</th>
                  <th className="py-3 px-4 text-center font-mono">Forum Engagement</th>
                  <th className="py-3 px-4 text-right">Finalization Prob.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {filteredProposals.length > 0 ? (
                  filteredProposals.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.01] transition-all group">
                      <td className="py-3.5 px-4 font-mono font-extrabold text-white">
                        {item.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold ${
                          item.category === 'Core' ? 'bg-cyber-purple/10 text-cyber-purple' :
                          item.category === 'ERC' ? 'bg-cyber-cyan/10 text-cyber-cyan' :
                          'bg-zinc-800 text-gray-400'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-300 group-hover:text-white max-w-xs truncate" title={item.title}>
                        {item.title}
                        <span className="block text-[10px] text-gray-500 truncate mt-0.5">{item.author}</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold ${
                          item.status === 'Final' ? 'bg-cyber-emerald/15 text-cyber-emerald border border-cyber-emerald/20' :
                          item.status === 'Last Call' ? 'bg-cyber-purple/15 text-cyber-purple border border-cyber-purple/20' :
                          item.status === 'Review' ? 'bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/20' :
                          'bg-zinc-800/50 text-gray-400 border border-zinc-700/20'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            item.status === 'Final' ? 'bg-cyber-emerald' :
                            item.status === 'Last Call' ? 'bg-cyber-purple' :
                            item.status === 'Review' ? 'bg-cyber-blue' : 'bg-gray-400 animate-pulse'
                          }`} />
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-mono text-zinc-200 mt-0.5">{item.communityActivityScore}/100</span>
                          <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                            <div className="h-full bg-cyber-cyan" style={{ width: `${item.communityActivityScore}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className={`font-mono font-bold ${
                          item.probabilityToFinal === 100 ? 'text-cyber-emerald' :
                          item.probabilityToFinal >= 75 ? 'text-cyber-cyan' :
                          item.probabilityToFinal >= 40 ? 'text-cyber-purple' : 'text-rose-400'
                        }`}>
                          {item.probabilityToFinal === 100 ? 'SUCCESS' : `${item.probabilityToFinal}%`}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500 font-medium">
                      No EIP proposals found matching active directory filter parameters. Try expanding filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* Simulator Modal overlay drawer view */}
      <AnimatePresence>
        {isSimulatorOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl glass-card border border-white/15 overflow-hidden"
            >
              {/* Modal header */}
              <div className="p-5 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 px-1.5 bg-cyber-cyan/15 rounded border border-cyber-cyan/20 text-cyber-cyan">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white">Simulate Custom EIP Standard</h3>
                    <p className="text-[10px] text-gray-500 font-mono">Input parameters to compute live finalization probability scores</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsSimulatorOpen(false)}
                  className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  &times;
                </button>
              </div>

              {/* Form entries */}
              <form onSubmit={handleCreateSimulation} className="p-5 space-y-4">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-gray-400 font-bold mb-1">EIP Name / ID</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 7540 or ERC-1234"
                      value={simName}
                      onChange={(e) => setSimName(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-950 border border-white/5 rounded-xl font-mono text-xs text-white focus:border-cyber-cyan focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-gray-400 font-bold mb-1">Standard Track</label>
                    <select
                      value={simCat}
                      onChange={(e) => setSimCat(e.target.value as EIPCategory)}
                      className="w-full px-3 py-2 bg-zinc-950 border border-white/5 rounded-xl text-xs text-white focus:border-cyber-cyan focus:outline-none cursor-pointer"
                    >
                      <option value="Core">Core Consensus</option>
                      <option value="ERC">ERC Spec</option>
                      <option value="Networking">Networking</option>
                      <option value="Interface">Interface</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-gray-400 font-bold mb-1">Specification Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dynamic fee adjustments on Layer-2 rails"
                    value={simTitle}
                    onChange={(e) => setSimTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-white/5 rounded-xl text-xs text-white focus:border-cyber-[#06b6d4] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-gray-400 font-bold mb-1">Status Phase</label>
                    <select
                      value={simStatus}
                      onChange={(e) => setSimStatus(e.target.value as EIPStatus)}
                      className="w-full px-3 py-2 bg-zinc-950 border border-white/5 rounded-xl text-xs text-white focus:border-cyber-cyan focus:outline-none cursor-pointer"
                    >
                      <option value="Draft">Draft Only</option>
                      <option value="Review">In Review</option>
                      <option value="Last Call">Last Call Pending</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-gray-400 font-bold mb-1 flex justify-between">
                      <span>Draft Lifetime</span>
                      <span className="font-mono text-cyan-400">{simDaysDraft} days</span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="600"
                      value={simDaysDraft}
                      onChange={(e) => setDraftDaysInForm(e)}
                      className="w-full h-2 mt-4 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyber-cyan"
                    />
                  </div>
                </div>

                {/* Simulated forecast analysis overview */}
                <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyber-cyan/10 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-gray-500 font-bold block">Preview Calculation Insight</span>
                  <p className="text-xs text-gray-300">
                    Calculated finalization chance will automatically decay mathematically according to the duration curves.
                  </p>
                </div>

                {/* Submissions */}
                <div className="flex gap-3 pt-3 border-t border-white/5 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsSimulatorOpen(false)}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cyber-cyan hover:brightness-110 text-zinc-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Inject Simulated Proposal
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );

  // Helper setter inside modal
  function setDraftDaysInForm(e: React.ChangeEvent<HTMLInputElement>) {
    setSimDaysDraft(parseInt(e.target.value, 10));
  }
}
