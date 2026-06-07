/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, Flame, ShieldCheck, Zap, BarChart, ChevronRight } from 'lucide-react';
import { BOTTLENECK_INSIGHTS } from '../data';
import { BottleneckInsight } from '../types';

// Let's create a beautiful matrix data point structure mapping delay weight index:
// [Category, Stage] -> avg delay in days representation
interface HeatGridCell {
  category: string;
  stage: string;
  days: number;
  intensity: 'critical' | 'heavy' | 'moderate' | 'nominal';
}

const HEATMAP_CELLS: HeatGridCell[] = [
  { category: 'Core', stage: 'Draft', days: 220, intensity: 'critical' },
  { category: 'Core', stage: 'Review', days: 110, intensity: 'heavy' },
  { category: 'Core', stage: 'Last Call', days: 35, intensity: 'moderate' },
  
  { category: 'ERC', stage: 'Draft', days: 95, intensity: 'heavy' },
  { category: 'ERC', stage: 'Review', days: 48, intensity: 'moderate' },
  { category: 'ERC', stage: 'Last Call', days: 15, intensity: 'nominal' },
  
  { category: 'Networking', stage: 'Draft', days: 190, intensity: 'critical' },
  { category: 'Networking', stage: 'Review', days: 75, intensity: 'heavy' },
  { category: 'Networking', stage: 'Last Call', days: 25, intensity: 'moderate' },
  
  { category: 'Interface', stage: 'Draft', days: 115, intensity: 'heavy' },
  { category: 'Interface', stage: 'Review', days: 60, intensity: 'moderate' },
  { category: 'Interface', stage: 'Last Call', days: 20, intensity: 'nominal' },
];

export const BottleneckAnalysis: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<HeatGridCell | null>(HEATMAP_CELLS[0]);
  const [selectedInsightId, setSelectedInsightId] = useState<string>('btnk-1');

  const getIntensityStyles = (intensity: string) => {
    switch (intensity) {
      case 'critical':
        return 'bg-red-500/30 border-red-500/50 hover:bg-red-500/40 text-red-100 shadow-[inset_0_0_10px_rgba(239,68,68,0.2)]';
      case 'heavy':
        return 'bg-amber-500/25 border-amber-500/40 hover:bg-amber-500/35 text-amber-100 shadow-[inset_0_0_10px_rgba(245,158,11,0.15)]';
      case 'moderate':
        return 'bg-cyber-purple/20 border-cyber-purple/30 hover:bg-cyber-purple/30 text-purple-200';
      case 'nominal':
      default:
        return 'bg-cyber-cyan/15 border-cyber-cyan/25 hover:bg-cyber-cyan/25 text-cyan-200';
    }
  };

  return (
    <div className="relative rounded-2xl glass-card p-6 border border-white/5 overflow-hidden">
      {/* Decorative back spotlight drop */}
      <div className="absolute -left-20 -top-20 w-44 h-44 rounded-full bg-cyber-purple/5 blur-3xl" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-white/5 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-500" />
            Governance Bottleneck Analysis
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Pinpoint exact consensus pipeline delays using our interactive EIP Category Stating delay grid.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
            <span className="w-2.5 h-2.5 rounded bg-red-500/30 border border-red-500/50" />
            <span>Critical Delay (&gt;180d)</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
            <span className="w-2.5 h-2.5 rounded bg-amber-500/25 border border-amber-500/40" />
            <span>Heavy (90-180d)</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
            <span className="w-2.5 h-2.5 rounded bg-cyber-purple/20 border border-cyber-purple/30" />
            <span>Moderate (30-90d)</span>
          </div>
        </div>
      </div>

      {/* Grid of KPI summaries */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-3.5 bg-white/[0.01] border border-white/5 rounded-xl text-center">
          <span className="text-[10px] font-mono uppercase text-gray-400 block">Slowest Stage</span>
          <span className="text-sm font-bold text-rose-400 block mt-1">Draft Stage</span>
          <span className="text-[10px] text-gray-500 leading-none">120 Days Avg</span>
        </div>

        <div className="p-3.5 bg-white/[0.01] border border-white/5 rounded-xl text-center">
          <span className="text-[10px] font-mono uppercase text-gray-400 block">Fastest Stage</span>
          <span className="text-sm font-bold text-cyber-emerald block mt-1">Final Sync</span>
          <span className="text-[10px] text-gray-500 leading-none">15 Days Avg</span>
        </div>

        <div className="p-3.5 bg-white/[0.01] border border-white/5 rounded-xl text-center">
          <span className="text-[10px] font-mono uppercase text-gray-400 block">Highest Delay Type</span>
          <span className="text-sm font-bold text-yellow-400 block mt-1">Core Opcodes</span>
          <span className="text-[10px] text-gray-500 leading-none">220 Days Draft Avg</span>
        </div>

        <div className="p-3.5 bg-white/[0.01] border border-white/5 rounded-xl text-center">
          <span className="text-[10px] font-mono uppercase text-gray-400 block">Avg Waiting Time</span>
          <span className="text-sm font-bold text-cyber-cyan block mt-1">65 Days</span>
          <span className="text-[10px] text-gray-500 leading-none">In Review Queue</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Heatmap Layout Selection */}
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold text-gray-300 font-mono uppercase block mb-1">
            Category Status Wait-Map
          </span>

          <div className="grid grid-cols-4 gap-2">
            {/* Header row labels */}
            <div className="text-[10px] font-mono text-gray-500 font-bold self-center pb-1">Standards</div>
            {['Draft', 'Review', 'LastCall'].map((st) => (
              <div key={st} className="text-[10px] font-mono text-gray-400 font-bold text-center pb-1">
                {st}
              </div>
            ))}

            {/* Matrix building */}
            {['Core', 'ERC', 'Networking', 'Interface'].map((cat) => {
              const cellsForCat = HEATMAP_CELLS.filter((cell) => cell.category === cat);
              return (
                <React.Fragment key={cat}>
                  <div className="text-[11px] font-semibold text-gray-300 font-sans self-center">
                    {cat}
                  </div>
                  {['Draft', 'Review', 'Last Call'].map((stPhase) => {
                    const currentCell = cellsForCat.find((c) => c.stage === stPhase);
                    if (!currentCell) return <div key={stPhase} className="h-10 bg-transparent" />;
                    const isSelected = selectedCell?.category === cat && selectedCell?.stage === stPhase;
                    
                    return (
                      <div
                        key={stPhase}
                        onClick={() => setSelectedCell(currentCell)}
                        className={`h-10 flex flex-col justify-center items-center rounded-lg border cursor-pointer font-mono font-bold text-xs transition-all ${getIntensityStyles(
                          currentCell.intensity
                        )} ${isSelected ? 'ring-2 ring-white/60 scale-102 font-extrabold shadow-cyan' : ''}`}
                      >
                        <span>{currentCell.days}d</span>
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>

          {/* Quick selected details banner */}
          <AnimatePresence mode="wait">
            {selectedCell && (
              <motion.div
                key={`${selectedCell.category}-${selectedCell.stage}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-mono text-gray-500 font-bold block">Active Cell Selection</span>
                  <span className="text-xs text-white">
                    <strong className="text-cyber-cyan">{selectedCell.category}</strong> proposals average{' '}
                    <strong className="text-white">{selectedCell.days} days</strong> in{' '}
                    <strong className="text-cyber-purple">{selectedCell.stage}</strong> stage.
                  </span>
                </div>
                
                <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-md font-bold ${
                  selectedCell.intensity === 'critical' ? 'bg-red-500/20 text-red-400' :
                  selectedCell.intensity === 'heavy' ? 'bg-amber-500/25 text-amber-400' :
                  'bg-cyber-cyan/20 text-cyber-cyan'
                }`}>
                  {selectedCell.intensity} delay
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* List of high-fidelity EIP bottlenecks */}
        <div className="lg:col-span-6 space-y-3">
          <span className="text-xs font-bold text-gray-300 font-mono uppercase block mb-1">
            Core Bottleneck Insights & Recommended Remedies
          </span>

          <div className="space-y-2.5">
            {BOTTLENECK_INSIGHTS.map((insight) => {
              const isOpen = selectedInsightId === insight.id;
              return (
                <div
                  key={insight.id}
                  onClick={() => setSelectedInsightId(insight.id)}
                  className={`p-3.5 border rounded-xl cursor-pointer transition-all ${
                    isOpen 
                      ? 'bg-zinc-950 border-white/10 shadow-lg' 
                      : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        insight.status === 'critical' ? 'bg-rose-500' :
                        insight.status === 'warning' ? 'bg-amber-500' : 'bg-cyber-emerald'
                      }`} />
                      <h4 className="text-xs font-bold text-white group-hover:text-cyber-cyan">
                        {insight.indicator}
                      </h4>
                    </div>

                    <span className="text-[11px] font-mono font-semibold text-gray-400">
                      {insight.metric}
                    </span>
                  </div>

                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 pt-3 border-t border-white/5 space-y-2.5"
                    >
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {insight.description}
                      </p>
                      
                      <div className="bg-cyber-cyan/5 border border-cyber-cyan/15 rounded-lg p-2.5">
                        <p className="text-[11px] text-gray-300 leading-relaxed flex items-start gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-cyber-cyan shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-white font-semibold">Immediate Remedy:</strong> {insight.remedy}
                          </span>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
