/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, CheckCircle2, MessageSquare, Clock, ArrowRight, Compass, ShieldAlert } from 'lucide-react';

interface ComparisonMetric {
  key: string;
  label: string;
  eipValue: string | number;
  ercValue: string | number;
  eipNormalized: number; // 0-100 scale for radar drawing
  ercNormalized: number; // 0-100 scale for radar drawing
  unit: string;
  betterValue: 'eip' | 'erc' | 'neutral';
  explanation: string;
}

const COMPARISON_METRICS: ComparisonMetric[] = [
  {
    key: 'avg_completion',
    label: 'Avg Completion Time',
    eipValue: '315',
    ercValue: '155',
    eipNormalized: 40,
    ercNormalized: 90,
    unit: 'days',
    betterValue: 'erc',
    explanation: 'ERC application layers bypass Client Release Cycles and Core execution integration constraints.'
  },
  {
    key: 'success_rate',
    label: 'Success Completion Rate',
    eipValue: '48%',
    ercValue: '74%',
    eipNormalized: 48,
    ercNormalized: 74,
    unit: '%',
    betterValue: 'erc',
    explanation: 'Core EIPs require hard fork activation buy-in from 100% of node consensus operators.'
  },
  {
    key: 'review_duration',
    label: 'Review Cycle Duration',
    eipValue: '95',
    ercValue: '45',
    eipNormalized: 35,
    ercNormalized: 85,
    unit: 'days',
    betterValue: 'erc',
    explanation: 'ACD reviews queue up significantly due to limited core meeting hours and protocol impact risks.'
  },
  {
    key: 'community_score',
    label: 'Community Engagement',
    eipValue: '78',
    ercValue: '92',
    eipNormalized: 78,
    ercNormalized: 92,
    unit: '/100',
    betterValue: 'erc',
    explanation: 'ERCs (e.g. NFTs, ERC-20 vault extensions) receive widespread web3 application builder forum chatter.'
  }
];

export const VelocityComparison: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<ComparisonMetric>(COMPARISON_METRICS[0]);
  const [focusedStandard, setFocusedStandard] = useState<'all' | 'eip' | 'erc'>('all');

  // Calculates custom radar points dynamically for a beautiful responsive visual layout
  // Hexagon/Diamond layout with 4 vertices:
  // Center: (100, 100). Max radius: 80
  // Vertex 0: Top (100, 100 - radius * normalizedValue) -> Avg Completion Time
  // Vertex 1: Right (100 + radius * normalizedValue, 100) -> Success Completion Rate
  // Vertex 2: Bottom (100, 100 + radius * normalizedValue) -> Review Cycle Duration
  // Vertex 3: Left (100 - radius * normalizedValue, 100) -> Community Engagement
  const getRadarPolygonPath = (type: 'eip' | 'erc') => {
    const rx = 100;
    const ry = 100;
    const r = 70;

    const points = COMPARISON_METRICS.map((m, idx) => {
      const val = type === 'eip' ? m.eipNormalized : m.ercNormalized;
      const weight = val / 100;

      switch (idx) {
        case 0: // Top
          return `${rx},${ry - r * weight}`;
        case 1: // Right
          return `${rx + r * weight},${ry}`;
        case 2: // Bottom
          return `${rx},${ry + r * weight}`;
        case 3: // Left
        default:
          return `${rx - r * weight},${ry}`;
      }
    });

    return points.join(' ') + ` ${points[0]}`;
  };

  return (
    <div className="relative rounded-2xl glass-card p-6 border border-white/5 overflow-hidden">
      {/* Dynamic back-glow lighting */}
      <div className="absolute -right-20 -top-20 w-44 h-44 rounded-full bg-cyber-blue/5 blur-3xl" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-white/5 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyber-blue" />
            EIP vs ERC Velocity Comparison
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Compare core protocol enhancements with client application standard lifecycles side-by-side.
          </p>
        </div>

        {/* Dynamic focus trigger toggle buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl">
          {(['all', 'eip', 'erc'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFocusedStandard(t)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all ${
                focusedStandard === t 
                  ? 'bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t === 'all' ? 'All' : t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Dynamic Polar Radar representation */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-white/[0.01] border border-white/[0.03]">
          <div className="relative w-52 h-52 flex items-center justify-center">
            
            {/* Background concentric reference rings */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="70" className="stroke-zinc-800 fill-none" strokeWidth="1" />
              <circle cx="100" cy="100" r="52.5" className="stroke-zinc-800 fill-none border-dashed" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx="100" cy="100" r="35" className="stroke-zinc-800 fill-none" strokeWidth="1" />
              <circle cx="100" cy="100" r="17.5" className="stroke-zinc-800 fill-none border-dashed" strokeWidth="1" strokeDasharray="3,3" />

              {/* Diagonal crosshair axes lines */}
              <line x1="100" y1="30" x2="100" y2="170" className="stroke-zinc-800" strokeWidth="1" />
              <line x1="30" y1="100" x2="170" y2="100" className="stroke-zinc-800" strokeWidth="1" />

              {/* Radar labels positions */}
              <text x="100" y="24" className="text-[8px] fill-zinc-500 font-bold font-mono text-center" textAnchor="middle">Velocity</text>
              <text x="175" y="103" className="text-[8px] fill-zinc-500 font-bold font-mono text-left" textAnchor="start">Success</text>
              <text x="100" y="184" className="text-[8px] fill-zinc-500 font-bold font-mono text-center" textAnchor="middle">Review Speed</text>
              <text x="25" y="103" className="text-[8px] fill-zinc-500 font-bold font-mono text-right" textAnchor="end">Engagement</text>

              {/* Draw ERC standard polygons */}
              {(focusedStandard === 'all' || focusedStandard === 'erc') && (
                <polygon
                  points={getRadarPolygonPath('erc')}
                  className="fill-cyan-500/10 stroke-cyber-cyan"
                  strokeWidth="2.5"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(6, 182, 212, 0.4))' }}
                />
              )}

              {/* Draw EIP core standards polygons */}
              {(focusedStandard === 'all' || focusedStandard === 'eip') && (
                <polygon
                  points={getRadarPolygonPath('eip')}
                  className="fill-violet-500/10 stroke-cyber-purple"
                  strokeWidth="2.5"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(139, 92, 246, 0.4))' }}
                />
              )}

              {/* Overlap point intersections */}
              <circle cx="100" cy="100" r="2.5" className="fill-white" />
            </svg>

            {/* Custom overlay icons */}
            <div className="absolute top-1 left-2 flex items-center gap-1.5 bg-zinc-950/80 px-2 py-0.5 rounded border border-white/5">
              <span className="w-2 h-2 rounded-full bg-cyber-purple" />
              <span className="text-[9px] font-mono font-medium text-gray-300">Core EIP</span>
            </div>
            <div className="absolute top-1 right-2 flex items-center gap-1.5 bg-zinc-950/80 px-2 py-0.5 rounded border border-white/5">
              <span className="w-2 h-2 rounded-full bg-cyber-cyan" />
              <span className="text-[9px] font-mono font-medium text-gray-300">ERC Spec</span>
            </div>
          </div>

          <p className="text-[10px] text-gray-400 mt-2 text-center max-w-[220px]">
            Hexagonal vertices represent percentile performance indexes. Bigger boundary equals higher velocity.
          </p>
        </div>

        {/* Detailed Metrics Table + Focused Insight */}
        <div className="lg:col-span-7 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10.5px] text-gray-500 font-mono uppercase">
                  <th className="pb-3 pr-2">Metric Type</th>
                  <th className="pb-3 px-2 text-center font-bold text-cyber-purple">Core EIP</th>
                  <th className="pb-3 px-2 text-center font-bold text-cyber-cyan">ERC Spec</th>
                  <th className="pb-3 pl-2 text-right">Primary Delta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {COMPARISON_METRICS.map((metric) => {
                  const isSelected = selectedMetric.key === metric.key;
                  return (
                    <tr
                      key={metric.key}
                      onClick={() => setSelectedMetric(metric)}
                      className={`group cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-white/[0.04] font-medium' 
                          : 'hover:bg-white/[0.01]'
                      }`}
                    >
                      <td className="py-3.5 pr-2 text-gray-300 group-hover:text-white flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full transition-opacity ${
                          isSelected ? 'bg-cyber-blue opacity-100' : 'bg-transparent opacity-0'
                        }`} />
                        {metric.label}
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono text-gray-300">
                        {metric.eipValue} {metric.unit}
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono text-gray-300">
                        {metric.ercValue} {metric.unit}
                      </td>
                      <td className="py-3.5 pl-2 text-right font-mono text-gray-400 group-hover:text-cyber-cyan">
                        {metric.betterValue === 'erc' ? 'ERC -51%' : 'EIP -27%'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Dynamic explanation card for the selected metric */}
          <div className="rounded-xl border border-white/5 bg-zinc-950 p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-blue/5 rounded-full blur-2xl" />

            <div className="flex items-start gap-3">
              <Compass className="w-4.5 h-4.5 text-cyber-blue mt-0.5 shrink-0" />
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 font-bold block">
                  Why the delta exists on: {selectedMetric.label}
                </span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {selectedMetric.explanation}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
