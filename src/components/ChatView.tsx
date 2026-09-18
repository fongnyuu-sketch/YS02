import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  ShieldAlert,
  Sparkles,
  Phone,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  Clock,
  MapPin,
  FileText,
  HeartPulse,
  BookOpen
} from 'lucide-react';
import { ChatMessage, RecommendationItem } from '../types.ts';
import {
  createSpeechRecognizer,
  isSpeechRecognitionSupported,
  speakKoreanText,
  stopSpeaking,
} from '../utils/speech.ts';

interface ChatViewProps {
  largeText: boolean;
  onOpenReservation: () => void;
  onOpenPrograms: () => void;
  onOpenCenterInfo: () => void;
  onOpenRecommendation: () => void;
  onSelectProgramToEnroll: (programId?: string) => void;
}

const DEFAULT_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-1',
  sender: 'ai',
  text: `### 🏛️ 아산시 동부건강생활지원센터에 오신 것을 환영합니다!
저희 센터는 **충청남도 아산시 보건소 산하** 공공 건강증진 전문기관으로, **배방읍(장재리, 북수리, 공수리 등) 및 탕정·아산 동부 생활권 주민**분들의 질병 예방과 활기찬 일상을 위한 밀착형 건강 거점입니다.

---

### 📋 센터 주요 무료 건강증진 서비스 안내
1. **체성분(InBody 770) 무료 정밀 검사 & 1:1 맞춤 운동상담 (1층 운동상담실)**
   - 골격근량, 체지방률, 부위별 근육 발달도, 복부비만율 정밀 분석 및 전담 운동처방사 1:1 상담 (수수료 전액 무료)
2. **‘건강 첫걸음’ 12주 순환운동 교실 (1층 순환운동실)**
   - 전문 운동처방사 지도 아래 10종의 유산소·근력 순환운동 장비를 활용한 기초체력 및 대사기능 증진 코칭
3. **만성질환 집중관리 교실 & 스마트 혈당계 무상 대여 (1층 만성질환상담실)**
   - 혈압·혈당·콜레스테롤 정밀 기초측정, 고혈압·당뇨 4주 집중케어 및 참여 주민 **스마트 혈당계·시험지·소모품 4주 무료 대여**
4. **어린이 건강체험관 운영 (2층 건강체험관)**
   - 관내 유치원 및 어린이집 유아 대상 영양, 올바른 잇솔질, 흡연·음주 예방, 손씻기 뷰박스 등 놀이형 오감만족 건강체험 교육 (사전 단체예약제)
5. **건강 운동프로그램 및 동아리 운영**
   - 주민 맞춤형 건강 운동교실, 소그룹 순환운동, 라인댄스·스트레칭 및 배방 용연마을 건강 걷기동아리 육성·지원

---

### ⚠️ 온천동 아산시 보건소 본청과의 업무 구분 안내 (방문 전 필독)
- **아산시 동부건강생활지원센터 (배방읍 장재리)**: 체성분 검사, 12주 순환운동, 만성질환 예방관리, 영양조리실습 등 **주민 건강증진·예방 특화 (비용 전액 무료)**
- **온천동 아산시 보건소 본청 (☎ 041-537-3400)**: 의사 일반 진료, 약 처방전 발행, **보건증(건강진단결과서)** 발급, 예방접종 업무 전담 (※ 동부센터에서는 보건증 발급 및 진료를 하지 않습니다.)

---

### 🕒 운영 시간, 위치 및 무료 주차 안내
- **운영시간**: 평일(월~금) 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00 / 접수 및 검사 마감 17:30)
- **휴무일**: 매주 토요일, 일요일 및 법정 공휴일 휴무
- **위치**: 충청남도 아산시 배방읍 용연동길 50 (KTX·SRT 천안아산역 및 전철 1호선 아산역 인근, 용연마을 1·2단지 앞)
- **주차**: 센터 지상 및 지하 민원인 주차장 완비 (**방문 주민 전액 무료 주차**)
- **민원실 직통**: ☎ 041-536-8723 (운동실: 041-536-8724, 만성질환실: 041-536-8725, 영양실: 041-536-8726)

아래 입력창에 궁금하신 점을 질문하시거나 **마이크(음성) 버튼**을 눌러 편하게 말씀해 주세요. 질문 분석에 맞춰 **주민 맞춤형 연계 강좌**도 함께 제안해 드립니다!`,
  timestamp: '상담 가능',
  matchedCategory: '일반/운영',
  confidence: 'high',
  actionButtons: [
    { label: '체성분(InBody) 무료 예약', action: 'reserve', payload: 'inbody' },
    { label: '💡 맞춤 건강 프로그램 추천', action: 'recommendation', payload: 'view_recs' },
    { label: '센터 개설 강좌 보기', action: 'program', payload: 'list' },
    { label: '센터 상세 이용안내 / 위치', action: 'info', payload: 'center_info' },
    { label: '민원실 직통 (041-536-8723)', action: 'call', payload: 'tel:041-536-8723' }
  ]
};

const QUICK_FAQS = [
  { label: '체성분(인바디) 무료 검사', query: '아산시 동부건강생활지원센터 체성분 검사 예약 어떻게 하나요? 비용도 알려주세요.' },
  { label: '혈압·혈당 무료 측정 & 상담', query: '혈압, 혈당, 콜레스테롤 무료 측정 가능한가요? 공복이어야 하나요?' },
  { label: '고혈압·당뇨 교실 & 혈당계 대여', query: '당뇨·고혈압 집중관리 프로그램과 스마트 혈당계 무료 대여가 되나요?' },
  { label: '‘건강 첫걸음’ 12주 순환운동', query: '건강 첫걸음 12주 순환운동 프로그램 신청 대상과 일정 알려주세요.' },
  { label: '중장년 갱년기 극복 힐링교실', query: '갱년기 극복 힐링 건강교실 내용과 약선차, 요가 수업 신청 방법은?' },
  { label: '저염·저당 건강밥상 조리실습', query: '2층 영양조리실습실에서 하는 저염·저당 건강밥상 요리교실 신청하고 싶어요.' },
  { label: '온천동 보건소와의 차이점', query: '온천동 아산시 보건소 본청과 배방 동부건강생활지원센터는 무엇이 다른가요?' },
  { label: '배방읍 센터 위치 및 주차', query: '아산시 동부건강생활지원센터 위치와 운영 시간, 주차 안내는?' },
];

const renderBoldText = (str: string) => {
  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-slate-950 bg-emerald-50/90 px-1 py-0.5 rounded text-emerald-950">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

const renderFormattedMessageText = (text: string, largeText: boolean) => {
  const lines = text.split('\n');
  return (
    <div className={`space-y-2 font-normal break-words ${largeText ? 'text-lg sm:text-xl leading-relaxed' : 'text-sm sm:text-base leading-relaxed'}`}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        if (trimmed === '---') {
          return <hr key={idx} className="my-3.5 border-t border-slate-200" />;
        }

        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-base sm:text-lg font-bold text-slate-900 mt-3 sm:mt-4 mb-1.5 flex items-center gap-2 pb-1 border-b border-emerald-100">
              <span className="w-1.5 h-4 bg-emerald-600 rounded-full inline-block shrink-0" />
              <span>{renderBoldText(trimmed.replace('### ', ''))}</span>
            </h3>
          );
        }

        if (trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
          return (
            <h2 key={idx} className="text-lg sm:text-xl font-extrabold text-emerald-950 mt-4 mb-2 pb-1 border-b border-emerald-200">
              {renderBoldText(trimmed.replace(/^#+\s*/, ''))}
            </h2>
          );
        }

        if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ')) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 my-1 text-slate-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
              <div className="flex-1 leading-relaxed">{renderBoldText(trimmed.replace(/^[-•*]\s*/, ''))}</div>
            </div>
          );
        }

        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-1 my-1.5 text-slate-800">
              <span className="font-extrabold text-emerald-800 shrink-0 min-w-5">{numMatch[1]}.</span>
              <div className="flex-1 leading-relaxed">{renderBoldText(numMatch[2])}</div>
            </div>
          );
        }

        return (
          <p key={idx} className="text-slate-800 my-1 leading-relaxed">
            {renderBoldText(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

export const ChatView: React.FC<ChatViewProps> = ({
  largeText,
  onOpenReservation,
  onOpenPrograms,
  onOpenCenterInfo,
  onOpenRecommendation,
  onSelectProgramToEnroll,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([DEFAULT_WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const [autoSpeech, setAutoSpeech] = useState(true);
  const [privacyNotice, setPrivacyNotice] = useState<string | null>(null);
  const [userQueryHistory, setUserQueryHistory] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognizerRef = useRef<any>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Handle Speech Recognition toggle
  const toggleListening = () => {
    if (!isSpeechRecognitionSupported()) {
      alert('현재 브라우저에서는 음성 인식(STT)을 지원하지 않습니다. 크롬 또는 사파리 최신 버전을 권장합니다.');
      return;
    }

    if (isListening) {
      if (recognizerRef.current) {
        recognizerRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const recognizer = createSpeechRecognizer(
        (transcript) => {
          setInput(transcript);
        },
        () => {
          setIsListening(false);
        },
        (error) => {
          console.warn('Speech error:', error);
          setIsListening(false);
        }
      );

      if (recognizer) {
        recognizerRef.current = recognizer;
        recognizer.start();
        setIsListening(true);
      }
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  // Send message to server
  const handleSend = async (customText?: string, isVoiceInput = false) => {
    const textToSend = (customText || input).trim();
    if (!textToSend || loading) return;

    if (isListening && recognizerRef.current) {
      recognizerRef.current.stop();
      setIsListening(false);
    }

    const updatedHistory = [...userQueryHistory, textToSend];
    setUserQueryHistory(updatedHistory);

    const userMessageId = `msg-user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      isVoice: isVoiceInput || isListening,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setPrivacyNotice(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          isVoice: isVoiceInput || isListening,
          queryHistory: updatedHistory,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || '답변 수신 실패');
      }

      if (data.wasMasked) {
        setPrivacyNotice('개인정보 보호를 위해 입력하신 주민등록번호 등 민감정보가 안전하게 마스킹 처리되었습니다.');
      }

      const aiMessageId = `msg-ai-${Date.now()}`;
      const aiMsg: ChatMessage = {
        id: aiMessageId,
        sender: 'ai',
        text: data.answer,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        matchedCategory: data.category,
        confidence: data.confidence,
        actionButtons: data.actionButtons,
        recommendations: data.recommendations,
        helpful: undefined,
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Auto-speak if enabled
      if (autoSpeech) {
        handleSpeak(aiMessageId, data.answer);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        sender: 'system',
        text: '일시적인 네트워크 지연이 발생했습니다. 아산시 동부건강생활지원센터 직통 전화(041-536-8723)로 문의하시거나 잠시 후 다시 시도해 주세요.',
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Text-to-Speech (TTS)
  const handleSpeak = (msgId: string, text: string) => {
    if (isSpeakingId === msgId) {
      stopSpeaking();
      setIsSpeakingId(null);
      return;
    }

    setIsSpeakingId(msgId);
    speakKoreanText(
      text,
      () => setIsSpeakingId(msgId),
      () => setIsSpeakingId(null)
    );
  };

  // Feedback handler
  const handleFeedback = async (msgId: string, helpful: boolean) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, helpful } : m))
    );

    try {
      await fetch('/api/logs/feedback-temp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback: helpful ? 'helpful' : 'needs_admin' }),
      });
    } catch (e) {
      // Non-blocking
    }
  };

  // Action button dispatcher
  const handleActionButtonClick = (action: string, payload?: string) => {
    if (action === 'reserve') {
      onOpenReservation();
    } else if (action === 'program') {
      onOpenPrograms();
    } else if (action === 'recommendation') {
      onOpenRecommendation();
    } else if (action === 'call') {
      if (payload && payload.startsWith('tel:')) {
        window.location.href = payload;
      } else {
        window.location.href = 'tel:041-536-8723';
      }
    } else if (action === 'info' || action === 'navigate' || action === 'document') {
      onOpenCenterInfo();
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 w-full max-w-6xl mx-auto px-2 sm:px-4 py-2 sm:py-3 h-[calc(100vh-6.75rem)]">
      {/* Upper Accessibility & Recommendation Banner */}
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2 bg-emerald-50/90 border border-emerald-200 rounded-xl px-3.5 py-2 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-950 font-medium text-xs sm:text-sm">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
          </span>
          <span className="font-semibold text-emerald-900">아산시 동부센터 AI</span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-xs text-slate-700 hidden sm:inline">배방읍·장재리 주민 전용 맞춤 답변 및 상호보완 프로그램 추천</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Recommendation Quick Trigger */}
          <button
            type="button"
            onClick={onOpenRecommendation}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>맞춤 건강 추천</span>
          </button>

          {/* Auto voice reading toggle */}
          <button
            type="button"
            onClick={() => {
              if (autoSpeech) stopSpeaking();
              setAutoSpeech(!autoSpeech);
            }}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
              autoSpeech
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
            title="답변이 도착하면 음성으로 자동 읽어줍니다"
          >
            {autoSpeech ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
            <span className="hidden sm:inline">답변 음성 {autoSpeech ? '켜짐' : '꺼짐'}</span>
          </button>
        </div>
      </div>

      {/* Privacy Notice Banner if triggered */}
      {privacyNotice && (
        <div className="mb-2.5 flex items-start gap-2.5 bg-amber-50 border border-amber-300 text-amber-900 rounded-xl p-2.5 text-xs sm:text-sm animate-fadeIn">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">{privacyNotice}</p>
            <p className="text-amber-800 text-xs mt-0.5">
              공공데이터 관리 지침에 따라 주민등록번호 등 민감정보는 수집·저장하지 않습니다.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPrivacyNotice(null)}
            className="text-amber-700 hover:text-amber-950 text-xs font-bold px-2 py-0.5"
          >
            닫기
          </button>
        </div>
      )}

      {/* Quick FAQ Question Pills */}
      <div className="mb-2.5">
        <p className="text-xs font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          아산시 동부센터 자주 묻는 질문 (클릭 시 자동 문의 및 맞춤 추천)
        </p>
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
          {QUICK_FAQS.map((faq, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(faq.query)}
              disabled={loading}
              className={`shrink-0 rounded-full border border-emerald-200 bg-white text-slate-700 hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-900 transition-all shadow-xs active:scale-95 disabled:opacity-50 ${
                largeText ? 'px-4 py-2 text-sm font-semibold' : 'px-3 py-1.5 text-xs font-medium'
              }`}
            >
              {faq.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Scroll Container */}
      <div className="flex-1 min-h-0 overflow-y-auto bg-slate-100/70 border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 shadow-inner">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Sender and meta */}
            <div className="flex items-center gap-2 mb-1 px-1 text-xs text-slate-500">
              {msg.sender === 'ai' && (
                <>
                  <span className="font-bold text-emerald-800 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    아산시 동부센터 AI 상담관
                  </span>
                  {msg.matchedCategory && (
                    <span className="bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.2 rounded-md text-[11px]">
                      {msg.matchedCategory}
                    </span>
                  )}
                </>
              )}
              {msg.sender === 'user' && (
                <span className="font-medium text-slate-600 flex items-center gap-1">
                  주민 민원인
                  {msg.isVoice && (
                    <span className="inline-flex items-center gap-0.5 bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded text-[10px] font-bold">
                      <Mic className="w-2.5 h-2.5" /> 음성 질문
                    </span>
                  )}
                </span>
              )}
              <span>{msg.timestamp}</span>
            </div>

            {/* Message Bubble */}
            <div
              className={`rounded-2xl shadow-xs transition-all relative ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-emerald-700 to-teal-700 text-white rounded-tr-xs p-4 max-w-[85%] sm:max-w-[75%]'
                  : msg.sender === 'system'
                  ? 'bg-red-50 text-red-900 border border-red-200 p-4 max-w-[90%]'
                  : 'bg-white text-slate-900 border border-slate-200 rounded-tl-xs p-5 sm:p-6 w-full max-w-[98%] sm:max-w-[94%]'
              }`}
            >
              {/* Message text with rich markdown styling */}
              {renderFormattedMessageText(msg.text, largeText)}

              {/* INLINE AI PERSONALIZED RECOMMENDATIONS WIDGET */}
              {msg.sender === 'ai' && msg.recommendations && msg.recommendations.length > 0 && (
                <div className="mt-4 pt-3 border-t border-emerald-100 bg-gradient-to-b from-emerald-50/70 to-teal-50/50 -mx-2 sm:-mx-3 p-3 sm:p-4 rounded-xl border">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-950">
                      <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
                      <span>주민 맞춤 건강 추천 (질문 분석 기반 연계 강좌)</span>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-semibold">
                      배방읍 용연동길 센터 개설
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {msg.recommendations.slice(0, 2).map((rec, rIdx) => (
                      <div
                        key={rec.id || rIdx}
                        className="bg-white border border-emerald-200 rounded-xl p-3 shadow-2xs hover:border-emerald-400 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                              {rec.badge}
                            </span>
                            <span className="text-[11px] text-slate-500 font-semibold">
                              적합도 {rec.matchScore}%
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm">
                            {rec.programTitle}
                          </h4>
                          <p className="text-xs text-slate-600">
                            <strong>추천 이유:</strong> {rec.reason}
                          </p>
                          <p className="text-xs text-emerald-800 font-medium">
                            <strong>시너지 팁:</strong> {rec.complementaryTip}
                          </p>
                        </div>

                        <div className="shrink-0 flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => onSelectProgramToEnroll(rec.programId)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-2xs transition-colors"
                          >
                            <span>수강 신청</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {msg.recommendations.length > 2 && (
                    <div className="mt-2.5 text-center">
                      <button
                        type="button"
                        onClick={onOpenRecommendation}
                        className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-2"
                      >
                        전체 맞춤 추천 목록({msg.recommendations.length}개) 자세히 보기 →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* AI TTS voice readout button & feedback */}
              {msg.sender === 'ai' && (
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  {/* Listen button */}
                  <button
                    type="button"
                    onClick={() => handleSpeak(msg.id, msg.text)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isSpeakingId === msg.id
                        ? 'bg-amber-100 text-amber-900 ring-2 ring-amber-400'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSpeakingId === msg.id ? (
                      <>
                        <VolumeX className="w-4 h-4 text-amber-700 animate-pulse" />
                        <span>읽어주기 멈춤</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-emerald-700" />
                        <span>답변 음성으로 듣기</span>
                      </>
                    )}
                  </button>

                  {/* Citizen satisfaction feedback for KPI tracking */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span className="mr-1">답변 만족도:</span>
                    <button
                      type="button"
                      onClick={() => handleFeedback(msg.id, true)}
                      className={`p-1.5 rounded-md hover:bg-emerald-50 transition-colors ${
                        msg.helpful === true ? 'text-emerald-700 bg-emerald-100 font-bold' : 'text-slate-400'
                      }`}
                      title="도움이 되었습니다"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFeedback(msg.id, false)}
                      className={`p-1.5 rounded-md hover:bg-rose-50 transition-colors ${
                        msg.helpful === false ? 'text-rose-700 bg-rose-100 font-bold' : 'text-slate-400'
                      }`}
                      title="추가 담당자 확인이 필요합니다"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons attached to AI answer */}
              {msg.actionButtons && msg.actionButtons.length > 0 && (
                <div className="mt-4 pt-3.5 border-t border-emerald-100 flex flex-wrap gap-2 sm:gap-2.5">
                  {msg.actionButtons.map((btn, bIdx) => (
                    <button
                      key={bIdx}
                      type="button"
                      onClick={() => handleActionButtonClick(btn.action, btn.payload)}
                      className={`inline-flex items-center gap-1.5 rounded-xl font-bold transition-all shadow-xs hover:shadow-md active:scale-95 ${
                        btn.action === 'reserve'
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : btn.action === 'call'
                          ? 'bg-teal-700 hover:bg-teal-800 text-white'
                          : btn.action === 'recommendation'
                          ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                          : btn.action === 'info'
                          ? 'bg-slate-800 hover:bg-slate-900 text-white'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300'
                      } ${largeText ? 'px-4 py-2.5 text-base' : 'px-3 py-2 text-xs sm:text-sm'}`}
                    >
                      {btn.action === 'reserve' && <Calendar className="w-4 h-4" />}
                      {btn.action === 'call' && <Phone className="w-4 h-4" />}
                      {btn.action === 'program' && <FileText className="w-4 h-4" />}
                      {btn.action === 'recommendation' && <Sparkles className="w-4 h-4" />}
                      {btn.action === 'info' && <MapPin className="w-4 h-4 text-emerald-400" />}
                      <span>{btn.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
              AI
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-4 shadow-xs flex items-center gap-3">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-bounce"></div>
                <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
              <span className={`text-slate-600 font-medium ${largeText ? 'text-lg' : 'text-sm'}`}>
                아산시 동부건강생활지원센터 지식베이스 및 맞춤 강좌를 조회하고 있습니다...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice Listening Wave Indicator */}
      {isListening && (
        <div className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl shadow-md flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-400 animate-ping"></span>
            <span className={`font-semibold ${largeText ? 'text-lg' : 'text-sm'}`}>
              주민님의 음성을 듣고 있습니다... 편하게 말씀해 주세요.
            </span>
          </div>
          <button
            type="button"
            onClick={toggleListening}
            className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
          >
            음성 입력 종료
          </button>
        </div>
      )}

      {/* Bottom Input Box Area */}
      <div className="mt-3 bg-white border border-slate-300 rounded-2xl p-2 sm:p-3 shadow-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          {/* Prominent Voice STT Mic Button */}
          <button
            type="button"
            onClick={toggleListening}
            className={`shrink-0 flex items-center justify-center rounded-xl transition-all shadow-xs ${
              isListening
                ? 'bg-rose-600 text-white ring-4 ring-rose-300 animate-bounce'
                : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200 border border-emerald-300'
            } ${largeText ? 'w-14 h-14' : 'w-12 h-12'}`}
            title={isListening ? '음성 녹음 중지' : '음성으로 질문하기 (어르신 권장)'}
          >
            {isListening ? (
              <MicOff className={largeText ? 'w-7 h-7' : 'w-6 h-6'} />
            ) : (
              <Mic className={largeText ? 'w-7 h-7' : 'w-6 h-6'} />
            )}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isListening
                ? '음성 인식 중...'
                : largeText
                ? '질문할 내용을 입력해 주세요 (예: 당뇨 관리, 순환운동)'
                : '민원 문의 내용을 입력하세요 (예: 당뇨 혈당계 대여, 순환운동 일정)'
            }
            disabled={loading}
            className={`flex-1 border-0 bg-transparent px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 ${
              largeText ? 'text-lg sm:text-xl font-medium' : 'text-base'
            }`}
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className={`shrink-0 flex items-center justify-center rounded-xl font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-all shadow-sm disabled:opacity-40 disabled:hover:bg-emerald-700 active:scale-95 ${
              largeText ? 'px-6 h-14 text-lg' : 'px-4 h-12 text-sm'
            }`}
          >
            <Send className="w-5 h-5 mr-1" />
            <span>질문</span>
          </button>
        </form>

        <div className="mt-2 px-2 flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
          <span>* 충남 아산시 배방읍 용연동길 50 (장재리 1202) · 민원실 ☎ 041-536-8723</span>
          <span className="hidden sm:inline">엔터(Enter) 키로 전송 가능</span>
        </div>
      </div>
    </div>
  );
};
