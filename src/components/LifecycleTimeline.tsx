/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, CheckCircle2, Play, Pause, RotateCcw, FileText, GitPullRequest, Radio, Award } from 'lucide-react';
import { EIPStatus } from '../types';

interface StageNode {
  status: EIPStatus;
  title: string;
  icon: any;
  colorClass: string;
  desc: string;
  rules: string[];
  durationEstimate: string;
}

const LIFE_STEPS: StageNode[] = [
  {
    status: 'Draft',
    title: 'Draft',
    icon: FileText,
    colorClass: 'text-cyber-cyan border-cyber-cyan/30 bg-cyber-cyan/10 bg-radial-cyan',
    desc: 'The initial state. The EIP is entered as an open pull request on GitHub under active construction by standard authors.',
    rules: [
      'Must follow formatting template defined in EIP-1',
      'Requires standard discussion-to link (Ethereum Magicians)',
      'Undergoes quick syntax check by auto-linter rules'
    ],
    durationEstimate: '120 days average'
  },
  {
    status: 'Review',
    title: 'Review',
    icon: GitPullRequest,
    colorClass: 'text-cyber-blue border-cyber-blue/30 bg-cyber-blue/10 bg-radial-blue',
    desc: 'Marked ready by authors. Core EIP editors and specialized client engineers review core consensus or API parameters.',
    rules: [
      'Active peer assessment reviews on GitHub Pull Requests',
      'Discussion threads queued up for consensus feedback',
      'L-2/client implementation benchmarks started'
    ],
    durationEstimate: '65 days average'
  },
  {
    status: 'Last Call',
    title: 'Last Call',
    icon: Radio,
    colorClass: 'text-cyber-purple border-cyber-purple/30 bg-cyber-purple/10 bg-radial-purple',
    desc: 'A formal final warning period of minimum 14 days. Opens the gates for wide-range community pushbacks.',
    rules: [
      '14-day public countdown clock activated',
      'All security and technical reviews must be completely resolved',
      'Major objections freeze the process and revert to Review'
    ],
    durationEstimate: '30 days average'
  },
  {
    status: 'Final',
    title: 'Final',
    icon: Award,
    colorClass: 'text-cyber-emerald border-cyber-emerald/30 bg-cyber-emerald/10 bg-radial-emerald',
    desc: 'The final state. The proposal is finalized, contract frozen, and marked ready for integration in upcoming execution hard forks.',
    rules: [
      'Proposal is frozen; no further modifications permitted',
      'Client developers implement code inside Geth, Nethermind, Besu',
      'Assigned hard fork block trigger defined'
    ],
    durationEstimate: 'Instant on freeze declaration'
  }
];

export const LifecycleTimeline: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Automatic simulation playback
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStepIndex((prev) => (prev + 1) % LIFE_STEPS.length);
      }, 3500); // Progress to next stage every 3.5s
    } else {
      if (interval) clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeStage = LIFE_STEPS[activeStepIndex];
  const IconComponent = activeStage.icon;

  return (
    <div className="relative rounded-2xl glass-card p-6 border border-white/5 overflow-hidden">
      
      {/* Decorative backdrop glow */}
      <div className="absolute right-0 top-0 w-36 h-36 rounded-full bg-cyber-cyan/5 blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-white/5 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyber-cyan" />
            Proposal Lifecycle Timeline
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Simulate and interact with the standard sequential lifecycle pipeline of an Ethereum Improvement Proposal (EIP).
          </p>
        </div>

        {/* Playback simulation tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-all ${
              isPlaying 
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                : 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/20'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause Simulator' : 'Auto-Play Simulation'}
          </button>

          <button
            onClick={() => {
              setActiveStepIndex(0);
              setIsPlaying(false);
            }}
            className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl border border-white/5 transition-all text-xs"
            title="Reset to Draft"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Visual Line Connectors */}
        <div className="relative flex flex-col md:flex-row justify-between items-center w-full gap-4 md:gap-0 px-2 lg:px-8">
          
          {/* Main Background Pipeline Line */}
          <div className="absolute left-[8%] right-[8%] top-[24%] h-0.5 bg-zinc-800 hidden md:block pointer-events-none z-0" />
          
          {/* Interactive Colored Active Flow Line */}
          <div 
            className="absolute left-[8%] top-[24%] h-0.5 bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple hidden md:block transition-all duration-700 pointer-events-none z-0" 
            style={{ width: `${(activeStepIndex / (LIFE_STEPS.length - 1)) * 84}%` }}
          />

          {LIFE_STEPS.map((step, idx) => {
            const isCompleted = idx < activeStepIndex;
            const isActive = idx === activeStepIndex;
            const StepIcon = step.icon;

            return (
              <div 
                key={step.status} 
                onClick={() => {
                  setActiveStepIndex(idx);
                  setIsPlaying(false); // Stop simulation if user clicks manually
                }}
                className="flex md:flex-col items-center gap-4 md:gap-2 z-10 w-full md:w-auto relative cursor-pointer group"
              >
                {/* Node circle */}
                <motion.div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                    isActive 
                      ? 'bg-zinc-900 border-white text-white shadow-2xl scale-110 shadow-cyan-400/25 ring-2 ring-white/10'
                      : isCompleted
                      ? 'bg-cyber-cyan/15 border-cyber-cyan/50 text-cyber-cyan'
                      : 'bg-zinc-950 border-white/5 text-gray-500 group-hover:text-gray-300 group-hover:border-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <StepIcon className="w-5 h-5" />
                </motion.div>

                {/* Vertical detail text for desktop, horizontal for mobile */}
                <div className="text-left md:text-center">
                  <p className={`text-xs font-mono font-bold tracking-wider uppercase ${
                    isActive ? 'text-white' : isCompleted ? 'text-cyber-cyan' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <span className="text-[10px] text-gray-500 font-mono block">
                    {step.durationEstimate}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Sheet matching active Selection */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.status}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl border border-white/5 bg-white/[0.015] p-5 space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/[0.03] pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${activeStage.colorClass}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 font-bold block">Active Step Sheet</span>
                  <h4 className="text-sm font-bold text-white uppercase">{activeStage.title} Stage Specifications</h4>
                </div>
              </div>

              <div className="px-3.5 py-1.5 rounded-lg bg-zinc-950 border border-white/5 font-mono text-xs">
                <span className="text-gray-400">Governance Weight:</span> <strong className="text-cyber-cyan">{activeStage.durationEstimate}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              <div className="md:col-span-7 space-y-3">
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  {activeStage.desc}
                </p>

                {/* Graphic layout indicator */}
                <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10 text-yellow-300 text-[11px] leading-relaxed">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white font-semibold">Core Checklist:</strong> Objections raised in any of the checklist criteria on the right can stall progression indices, adding roughly 45+ days to draft review loops.
                  </span>
                </div>
              </div>

              {/* Step criteria guidelines */}
              <div className="md:col-span-5 bg-zinc-950 p-4 rounded-xl border border-white/5 space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 font-bold block">
                  Mandatory Verification Checklist
                </span>

                <ul className="space-y-2">
                  {activeStage.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-gray-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-cyber-cyan mt-0.5 shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};
