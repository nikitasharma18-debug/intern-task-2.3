/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { MetricCardValue } from '../types';

interface MetricCardProps {
  metric: MetricCardValue;
  icon: LucideIcon;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric, icon: Icon }) => {
  const getThemeStyles = () => {
    switch (metric.colorTheme) {
      case 'cyan':
        return {
          border: 'rgba(6, 182, 212, 0.15)',
          text: 'text-cyber-cyan',
          bgGlow: 'rgba(6, 182, 212, 0.12)',
          buttonBg: 'bg-cyber-cyan/10 text-cyber-cyan',
        };
      case 'purple':
        return {
          border: 'rgba(139, 92, 246, 0.15)',
          text: 'text-cyber-purple',
          bgGlow: 'rgba(139, 92, 246, 0.08)',
          buttonBg: 'bg-cyber-purple/10 text-cyber-purple',
        };
      case 'emerald':
        return {
          border: 'rgba(16, 185, 129, 0.15)',
          text: 'text-cyber-emerald',
          bgGlow: 'rgba(16, 185, 129, 0.08)',
          buttonBg: 'bg-cyber-emerald/10 text-cyber-emerald',
        };
      case 'blue':
      default:
        return {
          border: 'rgba(14, 165, 233, 0.15)',
          text: 'text-cyber-blue',
          bgGlow: 'rgba(14, 165, 233, 0.08)',
          buttonBg: 'bg-cyber-blue/10 text-cyber-blue',
        };
    }
  };

  const theme = getThemeStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl glass-card glass-card-hover p-6 group"
      style={{ borderColor: theme.border }}
    >
      {/* Background radial gradient spotlight */}
      <div 
        className="absolute -right-16 -top-16 w-32 h-32 rounded-full blur-3xl transition-opacity duration-500 opacity-60 group-hover:opacity-100"
        style={{ backgroundColor: theme.bgGlow }}
      />

      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-1">
            {metric.title}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight font-sans text-white group-hover:text-shadow">
              {metric.value}
            </span>
          </div>
        </div>
        <div className={`p-3 rounded-xl ${theme.buttonBg} border border-white/5`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-mono font-semibold ${
          metric.trendDirection === 'up' 
            ? 'bg-cyber-emerald/10 text-cyber-emerald' 
            : metric.trendDirection === 'down'
            ? 'bg-red-500/10 text-red-400'
            : 'bg-gray-500/10 text-gray-400'
        }`}>
          {metric.trendDirection === 'up' && <TrendingUp className="w-3 h-3" />}
          {metric.trendDirection === 'down' && <TrendingDown className="w-3 h-3" />}
          {metric.trend > 0 ? `+${metric.trend}%` : `${metric.trend}%`}
        </span>
        <span className="text-[11px] text-gray-500 font-medium">
          {metric.footnote}
        </span>
      </div>

      {/* Futuristic bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50 group-hover:via-white/20 transition-all duration-300" />
    </motion.div>
  );
};
