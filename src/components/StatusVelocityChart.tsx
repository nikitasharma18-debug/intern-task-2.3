/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AVERAGE_STAGE_VELOCITY } from '../data';
import { VelocityStageData } from '../types';
import { Info, HelpCircle, Activity, Award } from 'lucide-react';

export const StatusVelocityChart: React.FC = () => {
  const [activeStage, setActiveStage] = useState<VelocityStageData | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxDays = Math.max(...AVERAGE_STAGE_VELOCITY.map(item => item.averageDays));

  return (
    <div className="relative rounded-2xl glass-card p-6 border border-white/5 overflow-hidden">
      {/* Decorative neon background light */}
      <div className="absolute -left-20 -bottom-20 w-44 h-44 rounded-full bg-cyber-cyan/5 blur-3xl" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-white/5 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyber-cyan" />
            Status Velocity Analysis
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Average days spent in each governance stage from draft publication to consensus freezing.
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
          <span className="w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-pulse" />
          <span className="text-xs font-mono font-medium text-gray-300">Live Mainnet Sample</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Custom Interactive Chart Area */}
        <div className="lg:col-span-2 flex flex-col justify-end space-y-4">
          <div className="relative h-64 w-full flex items-end gap-3 sm:gap-6 pt-6">
            
            {/* Visual Grid Lines */}
            <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between pointer-events-none">
              {[1, 2, 3, 4].map((grid, index) => {
                const heightVal = 100 - (index * 25);
                const dayVal = Math.round((maxDays * heightVal) / 100);
                return (
                  <div key={index} className="w-full flex items-center gap-2 text-gray-600">
                    <span className="text-[10px] font-mono text-gray-500 w-12 text-right">{dayVal} days</span>
                    <div className="flex-1 h-px border-b border-dashed border-white/5" />
                  </div>
                );
              })}
            </div>

            {/* Bars Column representing each state */}
            {AVERAGE_STAGE_VELOCITY.map((item, index) => {
              const heightPercent = `${(item.averageDays / maxDays) * 80 + 10}%`;
              const isHovered = hoveredIndex === index;
              const isActive = activeStage?.stage === item.stage;

              return (
                <div
                  key={item.stage}
                  className="relative flex-1 flex flex-col items-center justify-end h-full group cursor-pointer z-10"
                  onClick={() => setActiveStage(isActive ? null : item)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Tooltip Overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ 
                      opacity: isHovered || isActive ? 1 : 0, 
                      y: isHovered || isActive ? -8 : 0,
                      scale: isHovered || isActive ? 1 : 0.95
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-[85%] z-20 pointer-events-none bg-zinc-950 border border-white/10 rounded-lg p-2 shadow-2xl min-w-[120px] text-center"
                  >
                    <p className="text-[10px] uppercase font-mono text-gray-400 font-semibold">{item.stage}</p>
                    <p className="text-sm font-bold text-white mt-0.5">{item.averageDays} Days</p>
                    <p className="text-[9px] text-cyber-cyan font-mono mt-0.5">{item.delayPercentage}% of total delay</p>
                  </motion.div>

                  {/* Animated Bar Column */}
                  <motion.div
                    className={`relative w-full max-w-[64px] rounded-t-xl overflow-hidden transition-all duration-300 ${
                      isActive 
                        ? 'brightness-125 border-t border-x border-white/30 shadow-lg shadow-cyber-cyan/25' 
                        : isHovered 
                        ? 'brightness-110 shadow-md' 
                        : 'opacity-85'
                    }`}
                    style={{ height: heightPercent }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                  >
                    {/* Gradients */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${item.gradientFrom} ${item.gradientTo} opacity-30`} />
                    <div className={`absolute bottom-0 inset-x-0 bg-gradient-to-t ${item.gradientFrom} ${item.gradientTo} h-[92%] rounded-t-lg shadow-inner`} />
                    
                    {/* Pulsing neon top glow caps */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-white/40" />
                  </motion.div>

                  {/* Label Indicator */}
                  <span className={`text-[11px] font-semibold mt-3 transition-colors ${
                    isActive ? 'text-cyber-cyan' : isHovered ? 'text-white' : 'text-gray-400'
                  }`}>
                    {item.stage}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Insight Column */}
        <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4 flex flex-col justify-between">
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-cyber-cyan font-bold mb-3 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Stage Breakdowns
            </h4>

            {activeStage ? (
              <motion.div
                key={activeStage.stage}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-bold text-white">{activeStage.stage}</span>
                  <span className="text-xs font-mono px-2 py-0.5 bg-cyber-cyan/10 border border-cyber-cyan/20 rounded-full text-cyber-cyan">
                    {activeStage.averageDays} days avg
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {activeStage.description}
                </p>
                
                <div className="pt-2 border-t border-white/5 space-y-2">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400">Total Lifecycle Weight</span>
                    <span className="font-mono text-white font-semibold">{activeStage.delayPercentage}%</span>
                  </div>
                  {/* Progress filler graph weight representation */}
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-blue rounded-full"
                      style={{ width: `${activeStage.delayPercentage}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center text-center px-4 space-y-2 text-gray-500">
                <HelpCircle className="w-8 h-8 text-white/10 stroke-1" />
                <p className="text-xs">Click a stage bar in the diagram to inspect its bottlenecks, lifecycle weights, and structural optimization metrics.</p>
              </div>
            )}
          </div>

          <div className="bg-white/[0.01] border border-white/[0.03] rounded-lg p-2.5 mt-4">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-cyber-cyan mt-0.5 shrink-0" />
              <p className="text-[10px] text-gray-400 leading-relaxed">
                <strong className="text-gray-300">Observation:</strong> The <strong className="text-cyber-cyan">Draft State</strong> is Ethereum’s largest velocity valve. Over half of an average EIP's lifecycle resides in simple client review loops prior to receiving official validation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
