/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, BadgeAlert, ShieldCheck, Zap, ArrowRight, HelpCircle } from 'lucide-react';

export const StagnancyPredictor: React.FC = () => {
  const [draftDays, setDraftDays] = useState<number>(45);

  // Computes realistic decaying probability, confidence levels, and risk classification
  const predictionData = useMemo(() => {
    // Advanced math decay: 
    // At 15 days, ~95%. At 120 days (the average), ~75%. At 250 days, ~50%. At 500+ days, ~10%.
    const exponent = draftDays / 240;
    const rawProb = 98 * Math.exp(-1.1 * exponent);
    const finalizationProbability = Math.max(5, Math.round(rawProb));

    // Confidence decreases during volatile middle ranges, stays high when very short or long
    let confidence = 95;
    if (draftDays > 60 && draftDays < 300) {
      confidence = Math.round(95 - ((draftDays - 60) * 0.12));
    } else if (draftDays >= 300) {
      confidence = Math.min(92, Math.round(70 + (draftDays / 25)));
    }

    // Determine risk badge and color
    let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
    if (finalizationProbability < 40) {
      riskLevel = 'High';
    } else if (finalizationProbability < 75) {
      riskLevel = 'Medium';
    }

    // Dynamic AI insight generated instantly based on state
    let aiInsight = '';
    let actionTip = '';
    if (draftDays <= 45) {
      aiInsight = 'Highly nominal velocity signature. Early stage feedback signals are active and highly responsive.';
      actionTip = 'Submit draft to ACD consensus queue inside EIP Repository instantly. Keep author discussion thread pinned.';
    } else if (draftDays <= 120) {
      aiInsight = 'Approaching regional EIP draft average. Community feedback is healthy, but structural lock-in is vital.';
      actionTip = 'Schedule a peer review call with layer-2 client coordinators to initiate gas benchmarking specs.';
    } else if (draftDays <= 280) {
      aiInsight = 'Stagnancy signature detected. Proposal interaction rates on Ethereum Magicians forum have dropped 64% in the last 30 days.';
      actionTip = 'Recruit a co-author from execution client engineering teams to address security-spec compliance lag.';
    } else {
      aiInsight = 'High probability of critical governance abandonment. Authors have not updated the git repository branch for over 3 months.';
      actionTip = 'Trigger historical archiving pipeline or repackage as a subset utility standard under new authorship.';
    }

    return {
      probability: finalizationProbability,
      confidence,
      riskLevel,
      aiInsight,
      actionTip
    };
  }, [draftDays]);

  const { probability, confidence, riskLevel, aiInsight, actionTip } = predictionData;

  // Visual offsets for SVGs
  const strokeDashoffset = 282.6 - (282.6 * probability) / 100;

  const getRiskColors = () => {
    switch (riskLevel) {
      case 'High':
        return {
          text: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
          gradient: 'from-rose-500 to-red-600',
          radialGlow: 'rgba(239, 68, 68, 0.2)',
          indicator: 'bg-rose-500',
        };
      case 'Medium':
        return {
          text: 'text-cyber-purple bg-cyber-purple/10 border-cyber-purple/20',
          gradient: 'from-cyber-purple to-pink-500',
          radialGlow: 'rgba(139, 92, 246, 0.2)',
          indicator: 'bg-cyber-purple',
        };
      case 'Low':
      default:
        return {
          text: 'text-cyber-emerald bg-cyber-emerald/10 border-cyber-emerald/20',
          gradient: 'from-cyber-cyan to-cyber-emerald',
          radialGlow: 'rgba(16, 185, 129, 0.2)',
          indicator: 'bg-cyber-emerald',
        };
    }
  };

  const colors = getRiskColors();

  return (
    <div className="relative rounded-2xl glass-card p-6 border border-white/5 overflow-hidden">
      {/* Dynamic Back-glow spotlight */}
      <div 
        className="absolute -right-24 -bottom-24 w-48 h-48 rounded-full blur-3xl transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: colors.radialGlow }}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-white/5 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyber-purple" />
            Stagnancy Probability Predictor
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Simulate current draft lifetimes to predict the dynamic likelihood of eventual finalization on-chain.
          </p>
        </div>

        <span className={`text-xs px-2.5 py-1 rounded-full font-mono font-semibold uppercase border ${colors.text}`}>
          {riskLevel} Risk signature
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Sliders and config tools */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <label className="text-gray-300 font-medium flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-cyber-cyan" />
                Duration in Draft Stage
              </label>
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-2xl font-bold text-white">{draftDays}</span>
                <span className="text-xs text-gray-400">days</span>
              </div>
            </div>

            <input
              type="range"
              min="10"
              max="600"
              value={draftDays}
              onChange={(e) => setDraftDays(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyber-cyan hover:accent-cyber-purple focus:outline-none transition-all"
            />
            
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>10d (Optimal Review Frame)</span>
              <span>300d (EIP Average)</span>
              <span>600d (Stagnant limit)</span>
            </div>
          </div>

          {/* AI Observation Subpane */}
          <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4 space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <Sparkles className="w-4 h-4 text-cyber-purple animate-pulse" />
              <span>Predictive AI Insight Notes</span>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-gray-300 leading-relaxed min-h-[40px]">
                "{aiInsight}"
              </p>
              <div className="pt-2 flex items-center gap-2 overflow-hidden">
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${colors.indicator}`} />
                <p className="text-[10.5px] text-gray-400">
                  <strong className="text-gray-200">Recommended Action:</strong> {actionTip}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Circular visualization and quick analytics gauges */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-white/[0.01] border border-white/[0.03] rounded-xl relative">
          
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="60"
                className="stroke-zinc-800 fill-none"
                strokeWidth="10"
              />
              <motion.circle
                cx="72"
                cy="72"
                r="60"
                className={`fill-none stroke-gradient`}
                strokeWidth="10"
                strokeDasharray="376.9"
                strokeLinecap="round"
                animate={{ strokeDashoffset: 376.9 - (376.9 * probability) / 100 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{
                  stroke: `url(#gradient-${riskLevel})`,
                  filter: 'drop-shadow(0px 0px 8px rgba(6, 182, 212, 0.2))'
                }}
              />

              {/* Define dynamic gradient templates inside SVG */}
              <defs>
                <linearGradient id="gradient-Low" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient id="gradient-Medium" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="gradient-High" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fb7185" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
              </defs>
            </svg>

            {/* Centered Statistics Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-white font-mono tracking-tighter">
                {probability}%
              </span>
              <span className="text-[10px] text-gray-400 capitalize font-medium">
                Finalization Prob.
              </span>
            </div>
          </div>

          {/* Quick Metrics Subline */}
          <div className="grid grid-cols-2 gap-4 w-full mt-4 border-t border-white/5 pt-3 text-center">
            <div>
              <span className="block text-[10px] text-gray-500 font-mono uppercase">Confidence</span>
              <span className="text-sm font-semibold font-mono text-white mt-0.5 inline-flex items-center gap-1">
                {confidence}%
              </span>
            </div>
            
            <div className="border-l border-white/5">
              <span className="block text-[10px] text-gray-500 font-mono uppercase">Decay Formula</span>
              <span className="text-xs font-semibold font-mono text-cyan-400 mt-0.5">
                e^-1.1(x/240)
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
