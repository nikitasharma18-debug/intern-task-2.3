/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EIPProposal, VelocityStageData, BottleneckInsight, AIInsightItem } from './types';

export const MOCK_PROPOSALS: EIPProposal[] = [
  {
    id: 'EIP-1559',
    title: 'Fee market change for ETH 1.0 chain',
    author: 'Vitalik Buterin, Eric Conner, Rick Dudley',
    category: 'Core',
    status: 'Final',
    daysSpent: { Draft: 180, Review: 90, 'Last Call': 45, Final: 0 },
    totalDays: 315,
    createdDate: '2019-04-13',
    probabilityToFinal: 100,
    communityActivityScore: 98,
    reviewPrCount: 64,
    discussionThreads: 142,
    stagnantRisk: 'Low'
  },
  {
    id: 'EIP-4844',
    title: 'Shard Blob Transactions',
    author: 'Vitalik Buterin, Dankrad Feist, Protolambda',
    category: 'Core',
    status: 'Final',
    daysSpent: { Draft: 240, Review: 120, 'Last Call': 60, Final: 0 },
    totalDays: 420,
    createdDate: '2022-02-21',
    probabilityToFinal: 100,
    communityActivityScore: 99,
    reviewPrCount: 89,
    discussionThreads: 218,
    stagnantRisk: 'Low'
  },
  {
    id: 'ERC-721',
    title: 'Non-Fungible Token Standard',
    author: 'William Entriken, Dieter Shirley, Jacob Evans',
    category: 'ERC',
    status: 'Final',
    daysSpent: { Draft: 90, Review: 45, 'Last Call': 20, Final: 0 },
    totalDays: 155,
    createdDate: '2018-01-24',
    probabilityToFinal: 100,
    communityActivityScore: 95,
    reviewPrCount: 41,
    discussionThreads: 87,
    stagnantRisk: 'Low'
  },
  {
    id: 'ERC-4337',
    title: 'Account Abstraction Using Alt Mempool',
    author: 'Vitalik Buterin, Yoav Weiss, Kristof Gazso',
    category: 'ERC',
    status: 'Final',
    daysSpent: { Draft: 150, Review: 95, 'Last Call': 30, Final: 0 },
    totalDays: 275,
    createdDate: '2021-09-29',
    probabilityToFinal: 100,
    communityActivityScore: 94,
    reviewPrCount: 72,
    discussionThreads: 165,
    stagnantRisk: 'Low'
  },
  {
    id: 'EIP-3074',
    title: 'AUTH and AUTHCALL opcodes',
    author: 'Sam Wilson, Ansgar Dietrichs, Matt Garnett',
    category: 'Core',
    status: 'Review',
    daysSpent: { Draft: 410, Review: 180, 'Last Call': 0, Final: 0 },
    totalDays: 590,
    createdDate: '2020-10-15',
    probabilityToFinal: 72,
    communityActivityScore: 82,
    reviewPrCount: 38,
    discussionThreads: 94,
    stagnantRisk: 'Medium'
  },
  {
    id: 'EIP-7516',
    title: 'BLOBBASEFEE opcode',
    author: 'Carl Beekhuizen',
    category: 'Core',
    status: 'Last Call',
    daysSpent: { Draft: 80, Review: 45, 'Last Call': 15, Final: 0 },
    totalDays: 140,
    createdDate: '2023-09-08',
    probabilityToFinal: 94,
    communityActivityScore: 71,
    reviewPrCount: 16,
    discussionThreads: 32,
    stagnantRisk: 'Low'
  },
  {
    id: 'ERC-7540',
    title: 'Asynchronous ERC-4626 Tokenised Vaults',
    author: 'Jeroen Offerijns, Joey Santoro, Rusty Robin',
    category: 'ERC',
    status: 'Review',
    daysSpent: { Draft: 160, Review: 110, 'Last Call': 0, Final: 0 },
    totalDays: 270,
    createdDate: '2023-11-06',
    probabilityToFinal: 61,
    communityActivityScore: 78,
    reviewPrCount: 29,
    discussionThreads: 48,
    stagnantRisk: 'Medium'
  },
  {
    id: 'EIP-7623',
    title: 'Increase Calldata Cost',
    author: 'Toni Wahrstätter, Vitalik Buterin',
    category: 'Core',
    status: 'Draft',
    daysSpent: { Draft: 115, Review: 0, 'Last Call': 0, Final: 0 },
    totalDays: 115,
    createdDate: '2024-02-12',
    probabilityToFinal: 48,
    communityActivityScore: 89,
    reviewPrCount: 22,
    discussionThreads: 61,
    stagnantRisk: 'Medium'
  },
  {
    id: 'ERC-20',
    title: 'Token Standard',
    author: 'Fabian Vogelsteller, Vitalik Buterin',
    category: 'ERC',
    status: 'Final',
    daysSpent: { Draft: 60, Review: 30, 'Last Call': 15, Final: 0 },
    totalDays: 105,
    createdDate: '2015-11-19',
    probabilityToFinal: 100,
    communityActivityScore: 100,
    reviewPrCount: 55,
    discussionThreads: 320,
    stagnantRisk: 'Low'
  },
  {
    id: 'EIP-7251',
    title: 'Increase Max Effective Balance',
    author: 'Mike Neuder, Francesco DAmato',
    category: 'Interface',
    status: 'Review',
    daysSpent: { Draft: 210, Review: 85, 'Last Call': 0, Final: 0 },
    totalDays: 295,
    createdDate: '2023-06-25',
    probabilityToFinal: 69,
    communityActivityScore: 84,
    reviewPrCount: 34,
    discussionThreads: 75,
    stagnantRisk: 'Low'
  },
  {
    id: 'EIP-7002',
    title: 'Execution Layer Triggerable Exit',
    author: 'Danny Ryan, Mikhail Kalinin',
    category: 'Networking',
    status: 'Last Call',
    daysSpent: { Draft: 190, Review: 95, 'Last Call': 22, Final: 0 },
    totalDays: 307,
    createdDate: '2023-05-02',
    probabilityToFinal: 91,
    communityActivityScore: 76,
    reviewPrCount: 19,
    discussionThreads: 42,
    stagnantRisk: 'Low'
  },
  {
    id: 'EIP-3675',
    title: 'Upgrade consensus to Proof-of-Stake',
    author: 'Mikhail Kalinin, Danny Ryan, Vitalik Buterin',
    category: 'Core',
    status: 'Final',
    daysSpent: { Draft: 130, Review: 70, 'Last Call': 20, Final: 0 },
    totalDays: 220,
    createdDate: '2021-07-22',
    probabilityToFinal: 100,
    communityActivityScore: 97,
    reviewPrCount: 68,
    discussionThreads: 185,
    stagnantRisk: 'Low'
  },
  {
    id: 'ERC-5564',
    title: 'Stealth Address Standard',
    author: 'Toni Wahrstätter, Nerolation',
    category: 'ERC',
    status: 'Draft',
    daysSpent: { Draft: 380, Review: 0, 'Last Call': 0, Final: 0 },
    totalDays: 380,
    createdDate: '2022-08-13',
    probabilityToFinal: 19,
    communityActivityScore: 54,
    reviewPrCount: 12,
    discussionThreads: 39,
    stagnantRisk: 'High'
  },
  {
    id: 'EIP-5003',
    title: 'Insert Smart Contract Code into EOA',
    author: 'Sam Wilson, Ansgar Dietrichs',
    category: 'Core',
    status: 'Draft',
    daysSpent: { Draft: 590, Review: 0, 'Last Call': 0, Final: 0 },
    totalDays: 590,
    createdDate: '2022-03-22',
    probabilityToFinal: 8,
    communityActivityScore: 48,
    reviewPrCount: 8,
    discussionThreads: 56,
    stagnantRisk: 'High'
  }
];

export const AVERAGE_STAGE_VELOCITY: VelocityStageData[] = [
  {
    stage: 'Draft',
    averageDays: 120,
    description: 'Initial proposal authoring and peer specification matching',
    delayPercentage: 52.1,
    gradientFrom: 'from-cyber-cyan',
    gradientTo: 'to-cyber-blue'
  },
  {
    stage: 'Review',
    averageDays: 65,
    description: 'Active discussion and review iteration by All-Core-Devs/Cat Herders',
    delayPercentage: 28.3,
    gradientFrom: 'from-cyber-blue',
    gradientTo: 'to-cyber-indigo'
  },
  {
    stage: 'Last Call',
    averageDays: 30,
    description: 'Minimum 14-day formal final warning stage for public feedback',
    delayPercentage: 13.0,
    gradientFrom: 'from-cyber-indigo',
    gradientTo: 'to-cyber-purple'
  },
  {
    stage: 'Final',
    averageDays: 15,
    description: 'Successful consensus freezing and inclusion in hard fork upgrades',
    delayPercentage: 6.6,
    gradientFrom: 'from-cyber-purple',
    gradientTo: 'to-cyber-emerald'
  }
];

export const BOTTLENECK_INSIGHTS: BottleneckInsight[] = [
  {
    id: 'btnk-1',
    indicator: 'Draft Stage Contributes 52% of Delay',
    metric: '120 Days Avg',
    status: 'critical',
    description: 'Proposals average 4 months in Draft state due to rigid authoring dependencies and delayed feedback from Core EIP Editors.',
    remedy: 'Establish templates and automate syntax/EIP-1 validation rules inside GitHub action runners.'
  },
  {
    id: 'btnk-2',
    indicator: 'Review Response Time Lag',
    metric: '65 Days Avg',
    status: 'warning',
    description: 'Active Review rounds drag on due to difficulties in queuing proposals for AllCoreDevs (ACD) meeting slots.',
    remedy: 'Enable category-specific sub-governance review tracks for ERCs vs Peer-to-Peer network standards.'
  },
  {
    id: 'btnk-3',
    indicator: 'ERC Standard Proliferation Rate',
    metric: '1.8x vs Core',
    status: 'optimal',
    description: 'Application-level ERCs finalize 38% faster than Core consensus upgrades as they bypass hard fork execution client staging.',
    remedy: 'Continue separation of consensus-critical EIPs from user-space token standards to reduce cognitive load.'
  }
];

export const AI_RECOMMENDATIONS: AIInsightItem[] = [
  {
    id: 'ai-rec-1',
    category: 'efficiency',
    title: 'Core EIP Staging Acceleration Opportunity',
    content: 'By implementing automated linting pipelines and pre-author checks directly in the ethereum/EIPs repository, Draft-to-Review transition delays can be compressed by roughly 25-30 days (reducing total lifecycle duration by 10.5%).',
    impactScore: 84,
    urgency: 'high'
  },
  {
    id: 'ai-rec-2',
    category: 'stagnation',
    title: 'Stagnancy Signature Detected in 3 Active Proposals',
    content: 'Three high-priority Core opcodes (including auth configurations) are passing 380+ days in Draft, generating high probability of stagnation (>78% risk score). Immediate scheduling on next Execution Client coordinate call is recommended.',
    impactScore: 91,
    urgency: 'high'
  },
  {
    id: 'ai-rec-3',
    category: 'governance',
    title: 'ERC Consensus Track Specialization Success',
    content: 'The decision to delegate ERC review tracks to independent working groups has reduced review bottlenecks by 42% since early 2024. Expanding this model to Layer-2 coordination frameworks could yield similar outcomes page-wide.',
    impactScore: 76,
    urgency: 'medium'
  },
  {
    id: 'ai-rec-4',
    category: 'acceleration',
    title: 'Early Last Call Signal Trigger Optimization',
    content: 'Data suggests ERCs entering "Last Call" with more than 15 active GitHub discussion participants exhibit a 98.4% success rate. Consider programmatically triggering last call countdowns for highly engaged review items.',
    impactScore: 68,
    urgency: 'low'
  }
];
