export interface FaqKnowledgeItem {
  id: string;
  category: '검사/측정' | '운동/재활' | '만성질환' | '영양/조리' | '일반/운영';
  question: string;
  answer: string;
  keywords: string[];
  department: string;
  phone: string;
  actionType?: 'reserve' | 'call' | 'navigate' | 'document' | 'program';
  actionLabel?: string;
  actionPayload?: string;
  updatedAt: string;
}

export interface ProgramItem {
  id: string;
  title: string;
  category: '운동/재활' | '만성질환' | '영양/조리' | '주민동아리';
  target: string;
  schedule: string;
  location: string;
  capacity: number;
  enrolled: number;
  fee: string;
  status: '모집중' | '마감임박' | '대기접수' | '마감';
  instructor: string;
  description: string;
  requirements: string[];
}

export interface RecommendationItem {
  id: string;
  programId?: string;
  programTitle: string;
  category: string;
  reason: string;
  complementaryTip: string;
  matchScore: number; // e.g. 95%
  badge: string;
  schedule?: string;
  fee?: string;
}

export interface UserProfileInterest {
  detectedInterests: { topic: string; count: number }[];
  primaryHealthGoal: string;
  recommendations: RecommendationItem[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
  isVoice?: boolean;
  maskedPrivacy?: boolean;
  matchedCategory?: string;
  confidence?: 'high' | 'medium' | 'low';
  recommendations?: RecommendationItem[];
  actionButtons?: {
    label: string;
    action: 'reserve' | 'call' | 'program' | 'link' | 'feedback_satisfaction' | 'admin_escalate' | 'recommendation' | 'info';
    payload?: string;
  }[];
  helpful?: boolean;
}

export interface CivilComplaintLog {
  id: string;
  timestamp: string;
  question: string;
  answer: string;
  category: string;
  isVoice: boolean;
  status: 'resolved' | 'needs_admin' | 'reviewed';
  adminNotes?: string;
  feedback?: 'helpful' | 'not_helpful';
}

export interface CenterStats {
  totalInquiries: number;
  resolvedInquiries: number;
  resolutionRate: number; // e.g. 84.5%
  voiceUsageRate: number; // e.g. 34.2%
  phoneCivilReductionRate: number; // e.g. 28.5%
  categoryBreakdown: {
    category: string;
    count: number;
    percentage: number;
  }[];
  dailyTrends: {
    date: string;
    total: number;
    voice: number;
    resolved: number;
  }[];
}
