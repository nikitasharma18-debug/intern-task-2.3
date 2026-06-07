/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type EIPStatus = 'Draft' | 'Review' | 'Last Call' | 'Final';
export type EIPCategory = 'Core' | 'ERC' | 'Networking' | 'Interface';

export interface EIPProposal {
  id: string;
  title: string;
  author: string;
  category: EIPCategory;
  status: EIPStatus;
  daysSpent: Record<EIPStatus, number>;
  totalDays: number;
  createdDate: string;
  probabilityToFinal: number;
  communityActivityScore: number; // 0 to 100 scale
  reviewPrCount: number;
  discussionThreads: number;
  stagnantRisk: 'High' | 'Medium' | 'Low';
}

export interface MetricCardValue {
  title: string;
  value: string | number;
  trend: number; // e.g. +4.2% -> 4.2
  trendDirection: 'up' | 'down' | 'stable';
  footnote: string;
  colorTheme: 'cyan' | 'purple' | 'emerald' | 'blue';
}

export interface VelocityStageData {
  stage: EIPStatus;
  averageDays: number;
  description: string;
  delayPercentage: number;
  gradientFrom: string;
  gradientTo: string;
}

export interface BottleneckInsight {
  id: string;
  indicator: string;
  metric: string;
  status: 'critical' | 'warning' | 'optimal';
  description: string;
  remedy: string;
}

export interface AIInsightItem {
  id: string;
  category: 'efficiency' | 'stagnation' | 'governance' | 'acceleration';
  title: string;
  content: string;
  impactScore: number; // 1-100
  urgency: 'high' | 'medium' | 'low';
}
