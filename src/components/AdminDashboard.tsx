import React, { useState, useEffect } from 'react';
import {
  Database,
  BarChart3,
  AlertOctagon,
  Plus,
  Trash2,
  Edit,
  Search,
  CheckCircle,
  TrendingUp,
  PhoneCall,
  Mic,
  FileSpreadsheet,
  Check,
  X,
  Sparkles,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { FaqKnowledgeItem, CivilComplaintLog, CenterStats } from '../types.ts';

export const AdminDashboard: React.FC = () => {
  const [activeAdminTab, setActiveAdminTab] = useState<'stats' | 'kb' | 'monitoring'>('stats');
  const [stats, setStats] = useState<CenterStats | null>(null);
  const [kbItems, setKbItems] = useState<FaqKnowledgeItem[]>([]);
  const [logs, setLogs] = useState<CivilComplaintLog[]>([]);
  const [loading, setLoading] = useState(false);

  // Search and Filter states
  const [kbSearch, setKbSearch] = useState('');
  const [kbCategoryFilter, setKbCategoryFilter] = useState('전체');
  const [logFilter, setLogFilter] = useState<'all' | 'needs_admin' | 'resolved'>('all');

  // New / Edit KB Modal
  const [editingKb, setEditingKb] = useState<FaqKnowledgeItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: '검사/측정' as any,
    question: '',
    answer: '',
    keywords: '',
    department: '동부지원센터팀',
    phone: '041-536-8723',
  });

  // Monitoring review modal
  const [reviewingLog, setReviewingLog] = useState<CivilComplaintLog | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [promoteToFaq, setPromoteToFaq] = useState(true);

  // Fetch initial data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, kbRes, logsRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/knowledge'),
        fetch('/api/logs'),
      ]);

      const statsData = await statsRes.json();
      const kbData = await kbRes.json();
      const logsData = await logsRes.json();

      if (statsData.stats) setStats(statsData.stats);
      if (kbData.items) setKbItems(kbData.items);
      if (logsData.logs) setLogs(logsData.logs);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Save KB (Create or Update)
  const handleSaveKb = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) return;

    try {
      if (editingKb) {
        // Update
        const res = await fetch(`/api/knowledge/${editingKb.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            keywords: formData.keywords.split(',').map((k) => k.trim()),
          }),
        });
        const data = await res.json();
        setKbItems((prev) => prev.map((k) => (k.id === editingKb.id ? data.item : k)));
      } else {
        // Create
        const res = await fetch('/api/knowledge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        setKbItems((prev) => [data.item, ...prev]);
      }

      setIsAddModalOpen(false);
      setEditingKb(null);
      setFormData({
        category: '검사/측정',
        question: '',
        answer: '',
        keywords: '',
        department: '운동처방실',
        phone: '02-2199-8011',
      });
    } catch (e) {
      alert('지식베이스 저장 실패');
    }
  };

  // Delete KB
  const handleDeleteKb = async (id: string) => {
    if (!confirm('이 지식베이스 항목을 삭제하시겠습니까?')) return;
    try {
      await fetch(`/api/knowledge/${id}`, { method: 'DELETE' });
      setKbItems((prev) => prev.filter((k) => k.id !== id));
    } catch (e) {
      alert('삭제 실패');
    }
  };

  // Submit log review & optional FAQ promotion
  const handleReviewSubmit = async () => {
    if (!reviewingLog) return;
    try {
      const res = await fetch(`/api/logs/${reviewingLog.id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminNotes: adminNoteInput,
          addToFaq: promoteToFaq,
          category: reviewingLog.category,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setLogs((prev) => prev.map((l) => (l.id === reviewingLog.id ? data.log : l)));
        setReviewingLog(null);
        setAdminNoteInput('');
        fetchData(); // refresh kb list
      }
    } catch (e) {
      alert('검토 처리 중 오류가 발생했습니다.');
    }
  };

  // Filtered lists
  const filteredKb = kbItems.filter((item) => {
    const matchCat = kbCategoryFilter === '전체' || item.category === kbCategoryFilter;
    const matchSearch =
      item.question.toLowerCase().includes(kbSearch.toLowerCase()) ||
      item.answer.toLowerCase().includes(kbSearch.toLowerCase()) ||
      item.keywords.some((k) => k.toLowerCase().includes(kbSearch.toLowerCase()));
    return matchCat && matchSearch;
  });

  const filteredLogs = logs.filter((l) => {
    if (logFilter === 'needs_admin') return l.status === 'needs_admin';
    if (logFilter === 'resolved') return l.status === 'resolved';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner and Navigation */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              담당자 행정 포털
            </span>
            <span className="text-xs text-slate-400">데이터 실시간 동기화</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            아산시 동부건강생활지원센터 민원 AI 행정 포털
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            배방읍·장재리 거점 지식베이스(RAG) 갱신 · 주민 맞춤 추천 연계 · KPI 리포트
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveAdminTab('stats')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeAdminTab === 'stats'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            통계 및 KPI 리포트
          </button>
          <button
            type="button"
            onClick={() => setActiveAdminTab('kb')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeAdminTab === 'kb'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-600" />
            지식베이스(FAQ) 관리
            <span className="ml-1 px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-full text-[10px]">
              {kbItems.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveAdminTab('monitoring')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeAdminTab === 'monitoring'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertOctagon className="w-4 h-4 text-amber-600" />
            미답변 / 모니터링
            {logs.filter((l) => l.status === 'needs_admin').length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-rose-500 text-white rounded-full text-[10px] animate-pulse">
                {logs.filter((l) => l.status === 'needs_admin').length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* TAB 1: KPI STATS REPORT */}
      {activeAdminTab === 'stats' && stats && (
        <div className="space-y-6 animate-fadeIn">
          {/* 3 Core KPI Cards from PRD Section 5 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* KPI 1: 민원 해결률 (목표 80% 이상) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">핵심 성공 지표 1</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                    목표치: 80% 이상
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-700 mt-1">AI 민원 자동 해결률</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-emerald-700">{stats.resolutionRate}%</span>
                  <span className="text-xs font-medium text-emerald-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-0.5" /> 기준 달성
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  총 {stats.totalInquiries}건 중 {stats.resolvedInquiries}건 상담원 연결 없이 해결
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, stats.resolutionRate)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>0%</span>
                  <span className="font-bold text-emerald-700">목표(80%)</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* KPI 2: 고령층 음성 입력 사용률 (목표 30% 이상) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">핵심 성공 지표 2</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
                    목표치: 30% 이상
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-700 mt-1">고령층 음성(STT) 사용률</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-blue-700">{stats.voiceUsageRate}%</span>
                  <span className="text-xs font-medium text-blue-600 flex items-center">
                    <Mic className="w-3 h-3 mr-0.5" /> 음성 지원 호평
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  어르신 친화 대형 마이크 & 한국어 음성 인식 활성화
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (stats.voiceUsageRate / 50) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>0%</span>
                  <span className="font-bold text-blue-700">목표(30%)</span>
                  <span>50%</span>
                </div>
              </div>
            </div>

            {/* KPI 3: 행정 효율성 / 전화 민원 감소율 (목표 25% 이상) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">핵심 성공 지표 3</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-teal-800">
                    목표치: 25% 이상
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-700 mt-1">단순 전화 민원 감소율</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-teal-700">-{stats.phoneCivilReductionRate}%</span>
                  <span className="text-xs font-medium text-teal-600 flex items-center">
                    <PhoneCall className="w-3 h-3 mr-0.5" /> 행정 효율 극대화
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  체성분 예약, 운영시간 등 반복 전화 문의 대폭 경감
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-teal-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (stats.phoneCivilReductionRate / 40) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>0%</span>
                  <span className="font-bold text-teal-700">목표(25%)</span>
                  <span>40%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts & Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Breakdown Bar */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-700" />
                민원 유형별 접수 빈도 분석
              </h3>
              <div className="space-y-3.5">
                {stats.categoryBreakdown.map((cat, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>{cat.category}</span>
                      <span className="text-slate-500 font-mono">
                        {cat.count}건 ({cat.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-full ${
                          idx === 0
                            ? 'bg-emerald-600'
                            : idx === 1
                            ? 'bg-teal-600'
                            : idx === 2
                            ? 'bg-blue-600'
                            : idx === 3
                            ? 'bg-amber-600'
                            : 'bg-indigo-600'
                        }`}
                        style={{ width: `${cat.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Trends Table / Stats */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                최근 주간 일별 민원 처리 추이
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="pb-2 font-semibold">일자</th>
                      <th className="pb-2 font-semibold">총 민원</th>
                      <th className="pb-2 font-semibold">음성 접수</th>
                      <th className="pb-2 font-semibold">자동 해결</th>
                      <th className="pb-2 font-semibold">해결률</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stats.dailyTrends.map((d, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-2.5 font-bold text-slate-800">{d.date}</td>
                        <td className="py-2.5 font-mono text-slate-600">{d.total}건</td>
                        <td className="py-2.5 font-mono text-blue-600">{d.voice}건</td>
                        <td className="py-2.5 font-mono text-emerald-600">{d.resolved}건</td>
                        <td className="py-2.5 font-mono font-bold text-emerald-700">
                          {Math.round((d.resolved / d.total) * 100)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KNOWLEDGE BASE (FAQ) MANAGER */}
      {activeAdminTab === 'kb' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={kbSearch}
                  onChange={(e) => setKbSearch(e.target.value)}
                  placeholder="질문, 답변, 키워드 검색..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={kbCategoryFilter}
                onChange={(e) => setKbCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none"
              >
                <option value="전체">모든 카테고리</option>
                <option value="검사/측정">검사/측정</option>
                <option value="운동/재활">운동/재활</option>
                <option value="만성질환">만성질환</option>
                <option value="영양/조리">영양/조리</option>
                <option value="일반/운영">일반/운영</option>
              </select>

              <button
                type="button"
                onClick={() => {
                  setEditingKb(null);
                  setFormData({
                    category: '검사/측정',
                    question: '',
                    answer: '',
                    keywords: '',
                    department: '운동처방실',
                    phone: '02-2199-8011',
                  });
                  setIsAddModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                신규 지식(FAQ) 등록
              </button>
            </div>
          </div>

          {/* List of Knowledge items */}
          <div className="grid grid-cols-1 gap-3">
            {filteredKb.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 hover:border-emerald-300 rounded-2xl p-5 shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-400">최종 수정: {item.updatedAt}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">Q. {item.question}</h4>
                  <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-wrap leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {item.answer}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">담당 부서:</span>
                    <span>{item.department} (☎ {item.phone})</span>
                    <span className="text-slate-300">|</span>
                    <span className="font-semibold text-slate-700">키워드:</span>
                    <span className="font-mono text-emerald-800">{item.keywords.join(', ')}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingKb(item);
                      setFormData({
                        category: item.category,
                        question: item.question,
                        answer: item.answer,
                        keywords: item.keywords.join(', '),
                        department: item.department,
                        phone: item.phone,
                      });
                      setIsAddModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    수정
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteKb(item.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add / Edit FAQ Modal */}
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-scaleUp">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 text-lg">
                    {editingKb ? '지식베이스 항목 수정' : '신규 지식베이스(FAQ) 등록'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveKb} className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">카테고리</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value="검사/측정">검사/측정</option>
                      <option value="운동/재활">운동/재활</option>
                      <option value="만성질환">만성질환</option>
                      <option value="영양/조리">영양/조리</option>
                      <option value="일반/운영">일반/운영</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">주민 민원 질문 (Q)</label>
                    <input
                      type="text"
                      value={formData.question}
                      onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                      placeholder="예: 체성분 검사는 주말에도 가능한가요?"
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">공식 행정 답변 (A)</label>
                    <textarea
                      rows={4}
                      value={formData.answer}
                      onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                      placeholder="센터 규정에 근거한 친절하고 정확한 안내 내용을 입력하세요..."
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      검색 키워드 (쉼표 구분)
                    </label>
                    <input
                      type="text"
                      value={formData.keywords}
                      onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                      placeholder="예: 체성분, 인바디, 주말, 휴무"
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">담당 부서</label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">직통 전화번호</label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="flex-1 py-2.5 border border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-50"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-xs"
                    >
                      {editingKb ? '수정 내용 저장' : '등록 완료'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: UNANSWERED / MONITORING LOGS */}
      {activeAdminTab === 'monitoring' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Filter Bar */}
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">상태 필터:</span>
              <button
                type="button"
                onClick={() => setLogFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  logFilter === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                전체 ({logs.length})
              </button>
              <button
                type="button"
                onClick={() => setLogFilter('needs_admin')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  logFilter === 'needs_admin'
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                담당자 확인 필요 ({logs.filter((l) => l.status === 'needs_admin').length})
              </button>
              <button
                type="button"
                onClick={() => setLogFilter('resolved')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  logFilter === 'resolved' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                해결 완료 ({logs.filter((l) => l.status === 'resolved').length})
              </button>
            </div>

            <button
              type="button"
              onClick={fetchData}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              새로고침
            </button>
          </div>

          {/* Logs List */}
          <div className="grid grid-cols-1 gap-3">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className={`bg-white border rounded-2xl p-5 shadow-xs transition-all ${
                  log.status === 'needs_admin' ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${
                        log.status === 'needs_admin'
                          ? 'bg-rose-100 text-rose-800'
                          : log.status === 'reviewed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {log.status === 'needs_admin' ? '담당자 검토 필요' : log.status === 'reviewed' ? '검토 완료' : 'AI 정상 응대'}
                    </span>
                    <span className="text-xs text-slate-500">{log.category}</span>
                    {log.isVoice && (
                      <span className="inline-flex items-center gap-0.5 bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded text-[10px] font-bold">
                        <Mic className="w-2.5 h-2.5" /> 음성 질문
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">{log.timestamp}</span>
                </div>

                <p className="font-bold text-slate-900 text-sm sm:text-base">
                  주민 질문: "{log.question}"
                </p>

                <div className="mt-2 text-xs sm:text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="font-semibold text-slate-700 block mb-1">AI 제공 답변:</span>
                  {log.answer}
                </div>

                {log.adminNotes && (
                  <div className="mt-2 text-xs text-blue-900 bg-blue-50 p-2.5 rounded-xl border border-blue-200">
                    <span className="font-bold">담당자 행정 피드백:</span> {log.adminNotes}
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setReviewingLog(log);
                      setAdminNoteInput(log.adminNotes || '');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    공식 검토 및 지식베이스 반영
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Review & Promote to FAQ modal */}
          {reviewingLog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-scaleUp">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 text-lg">민원 모니터링 검토</h3>
                  <button
                    type="button"
                    onClick={() => setReviewingLog(null)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-700 block">원문 질문:</span>
                    <p className="text-slate-900 mt-1">{reviewingLog.question}</p>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      담당자 공식 답변 / 보완 규정 작성
                    </label>
                    <textarea
                      rows={4}
                      value={adminNoteInput}
                      onChange={(e) => setAdminNoteInput(e.target.value)}
                      placeholder="주민에게 전달될 공식 답변 및 지식베이스에 영구 반영될 내용을 입력하세요..."
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    ></textarea>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-semibold">
                    <input
                      type="checkbox"
                      checked={promoteToFaq}
                      onChange={(e) => setPromoteToFaq(e.target.checked)}
                      className="accent-emerald-600 w-4 h-4"
                    />
                    <span>이 질문과 공식 답변을 센터 지식베이스(FAQ)에 즉시 등록</span>
                  </label>

                  <div className="pt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setReviewingLog(null)}
                      className="flex-1 py-2.5 border border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-50"
                    >
                      닫기
                    </button>
                    <button
                      type="button"
                      onClick={handleReviewSubmit}
                      className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-xs"
                    >
                      검토 완료 및 저장
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
