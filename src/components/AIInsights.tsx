/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, Send, CheckCircle, Flame, ShieldAlert, ArrowUpRight, Cpu } from 'lucide-react';
import { AI_RECOMMENDATIONS } from '../data';
import { AIInsightItem } from '../types';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

const PRESET_PROMPTS = [
  {
    label: 'How to compress ERC review durations by 40%?',
    answer: 'Review models show ERC durations can be compressed by 42% by delegating review tracks to specific sub-guilds on GitHub. Integrating pre-submission linters directly into IDE templates saves an average of ~14 days in peer cycles.'
  },
  {
    label: 'Identify highly stagnant active proposals.',
    answer: 'Currently, three high-priority opcode configs (e.g. EIP-3074) are marked at "High Stagnancy" (>78% risk signature). They have sat in Draft state for 410+ days without Git branch updates. Action: Queue immediately on next AllCoreDevs agenda.'
  },
  {
    label: 'Predict draft approval index for 2026.',
    answer: 'Projections for 2026 suggest a general EIP velocity acceleration of 11.5% due to the new EIP-1 validation workflows. High-performing proposal category of the season: Account Abstraction (ERC-4337 style utilities).'
  }
];

export const AIInsights: React.FC = () => {
  const [selectedUrgency, setSelectedUrgency] = useState<'all' | 'high' | 'medium'>('all');
  const [chatLog, setChatLog] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Greetings. I am EIPsInsight AI Co-Pilot. I monitor real-time GitHub commits, AllCoreDevs scheduling calls, and discussion velocity metrics. Ask me anything or trigger a simulation prompt below.',
      time: '05:54'
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const filteredRecommendations = AI_RECOMMENDATIONS.filter((rec) => {
    if (selectedUrgency === 'all') return true;
    return rec.urgency === selectedUrgency;
  });

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add User Message
    const userMsg: ChatMessage = { sender: 'user', text, time: '05:55' };
    setChatLog((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI response calculation matching keywords
    setTimeout(() => {
      let aiText = '';
      const promptMatch = PRESET_PROMPTS.find(p => p.label.toLowerCase().includes(text.toLowerCase()) || text.toLowerCase().includes(p.label.toLowerCase()));

      if (promptMatch) {
        aiText = promptMatch.answer;
      } else if (text.toLowerCase().includes('bottleneck') || text.toLowerCase().includes('eip-3074')) {
        aiText = 'EIP-3074 currently shows high queue delay. Author engagement is low but forum impressions are high (+82%). Recommending coordinating with Nethermind coordinators to align specs.';
      } else if (text.toLowerCase().includes('hello') || text.toLowerCase().includes('hi')) {
        aiText = 'Hello. I can assist with analyzing draft delays, predicting stagnations, comparing standards, or preparing consensus Acceleration summaries. Choose a simulation or type an EIP ID.';
      } else {
        aiText = `Analyzing proposal factors... Data indicates proposals matching "${text}" typically face 50% less Draft friction if they include standard Solidity reference implementations within Week 2. Recommended urgency rating: Low.`;
      }

      const aiMsg: ChatMessage = { sender: 'ai', text: aiText, time: '05:55' };
      setChatLog((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);

    setInputText('');
  };

  return (
    <div className="relative rounded-2xl glass-card border border-white/5 overflow-hidden">
      
      {/* Visual cyber decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-cyber-purple/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-cyber-cyan/5 blur-3xl animate-pulse-slow" />

      {/* Title block */}
      <div className="flex justify-between items-center bg-white/[0.02] border-b border-white/5 p-4">
        <div className="flex items-center gap-2">
          <div className="p-1 text-cyber-purple bg-cyber-purple/10 rounded border border-cyber-purple/20 animate-pulse">
            <Cpu className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
              EIPsInsight AI Co-Pilot
            </h3>
            <p className="text-[10px] text-gray-500 font-mono">
              Empowered by deep-learning EIP data modeling
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-lg border border-white/10 text-xs text-gray-400">
          <Terminal className="w-3.5 h-3.5" />
          <span className="font-mono">Console Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Dynamic Interactive AI Advisor Recommendations Sheet */}
        <div className="lg:col-span-6 p-5 border-b lg:border-b-0 lg:border-r border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-300 font-mono uppercase">
              Advisories Feed
            </span>

            {/* Urgency Sorters */}
            <div className="flex gap-1.5 bg-white/5 p-0.5 rounded-lg border border-white/5">
              {(['all', 'high', 'medium'] as const).map((urg) => (
                <button
                  key={urg}
                  onClick={() => setSelectedUrgency(urg)}
                  className={`px-2.5 py-0.5 text-[10px] rounded font-semibold capitalize font-mono ${
                    selectedUrgency === urg 
                      ? 'bg-cyber-purple text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {urg}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
            {filteredRecommendations.map((rec) => (
              <div 
                key={rec.id}
                className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-2 hover:border-white/10 transition-all group"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyber-purple animate-pulse" />
                    <h4 className="text-xs font-bold text-white group-hover:text-cyber-purple">
                      {rec.title}
                    </h4>
                  </div>

                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase border ${
                    rec.urgency === 'high' 
                      ? 'text-rose-400 bg-rose-500/10 border-rose-500/20' 
                      : 'text-cyber-purple bg-cyber-purple/10 border-cyber-purple/20'
                  }`}>
                    {rec.urgency}
                  </span>
                </div>

                <p className="text-[11px] text-gray-300 leading-relaxed font-sans">
                  {rec.content}
                </p>

                <div className="flex justify-between items-center pt-2 border-t border-white/[0.03] text-[9.5px]">
                  <span className="text-gray-500">Acceleration Impact Matrix</span>
                  <span className="font-mono text-cyber-cyan font-bold">{rec.impactScore}% Compress Factor</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live LLM Chat Console Simulator */}
        <div className="lg:col-span-6 p-5 flex flex-col h-[400px] justify-between">
          <div className="space-y-3 overflow-y-auto max-h-[240px] pr-1 flex-1">
            
            {/* Chat output streams */}
            {chatLog.map((msg, index) => (
              <div 
                key={index} 
                className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                <span className="text-[9px] text-gray-500 font-mono mb-0.5">{msg.sender === 'user' ? 'YOU' : 'AI CO-PILOT'}</span>
                
                <div className={`p-3 rounded-2xl text-[11.5px] leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-cyber-blue/10 border border-cyber-blue/20 text-white rounded-tr-none' 
                    : 'bg-zinc-950 border border-white/5 text-gray-300 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start mr-auto max-w-[85%]">
                <span className="text-[9px] text-gray-500 font-mono mb-0.5">AI CO-PILOT is computing...</span>
                <div className="flex gap-1.5 p-2 bg-zinc-950 border border-white/5 rounded-xl rounded-tl-none">
                  <span className="w-1.5 h-1.5 bg-cyber-purple rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-cyber-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-cyber-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Prompt presets selection panels */}
          <div className="mt-4 space-y-2">
            <span className="text-[9.5px] font-mono text-zinc-500 font-bold uppercase block">
              Simulation Prompts
            </span>

            <div className="flex flex-col gap-1">
              {PRESET_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.label)}
                  className="p-2 text-left text-[11px] text-gray-400 hover:text-white bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 rounded-lg truncate transition-all flex items-center justify-between group"
                >
                  <span className="truncate">{p.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>

            {/* Manual user typing control inputs */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Ask about EIP-1559, compression formulas..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                className="flex-1 px-3.5 py-2 rounded-xl bg-zinc-950 border border-white/10 focus:border-cyber-purple text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyber-purple font-mono"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                className="p-2 rounded-xl bg-cyber-purple text-white hover:bg-cyber-purple/90 border border-white/5 transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
