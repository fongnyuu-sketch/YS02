import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { ChatView } from './components/ChatView.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { ReservationModal } from './components/ReservationModal.tsx';
import { ProgramsModal } from './components/ProgramsModal.tsx';
import { CenterInfoModal } from './components/CenterInfoModal.tsx';
import { RecommendationModal } from './components/RecommendationModal.tsx';
import { RecommendationItem } from './types.ts';

export default function App() {
  const [largeText, setLargeText] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'admin'>('chat');
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isCenterInfoOpen, setIsCenterInfoOpen] = useState(false);
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);

  // Recommendations state
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [primaryHealthGoal, setPrimaryHealthGoal] = useState<string>('만성질환 예방 및 신체활동 증진');
  const [selectedProgramToEnrollId, setSelectedProgramToEnrollId] = useState<string | null>(null);

  // Fetch initial recommendations or when requested
  const loadRecommendations = async (currentQuery = '') => {
    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ queryHistory: [], currentQuery }),
      });
      const data = await res.json();
      if (data.recommendations && data.recommendations.length > 0) {
        setRecommendations(data.recommendations);
      }
      if (data.primaryHealthGoal) {
        setPrimaryHealthGoal(data.primaryHealthGoal);
      }
    } catch (e) {
      console.error('Failed to fetch recommendations:', e);
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, []);

  const handleOpenRecommendation = () => {
    loadRecommendations();
    setIsRecommendationOpen(true);
  };

  const handleSelectProgramToEnroll = (programId?: string) => {
    setSelectedProgramToEnrollId(programId || null);
    setIsProgramsOpen(true);
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-all ${
        largeText ? 'text-lg font-medium' : 'text-sm'
      }`}
    >
      {/* Top Header & Navigation */}
      <Header
        largeText={largeText}
        setLargeText={setLargeText}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenPrograms={() => {
          setSelectedProgramToEnrollId(null);
          setIsProgramsOpen(true);
        }}
        onOpenCenterInfo={() => setIsCenterInfoOpen(true)}
        onOpenRecommendation={handleOpenRecommendation}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0">
        {activeTab === 'chat' ? (
          <ChatView
            largeText={largeText}
            onOpenReservation={() => setIsReservationOpen(true)}
            onOpenPrograms={() => {
              setSelectedProgramToEnrollId(null);
              setIsProgramsOpen(true);
            }}
            onOpenCenterInfo={() => setIsCenterInfoOpen(true)}
            onOpenRecommendation={handleOpenRecommendation}
            onSelectProgramToEnroll={handleSelectProgramToEnroll}
          />
        ) : (
          <AdminDashboard />
        )}
      </main>

      {/* Interactive Action Modals */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        largeText={largeText}
      />

      <ProgramsModal
        isOpen={isProgramsOpen}
        onClose={() => {
          setIsProgramsOpen(false);
          setSelectedProgramToEnrollId(null);
        }}
        largeText={largeText}
        initialSelectedProgramId={selectedProgramToEnrollId}
      />

      <CenterInfoModal
        isOpen={isCenterInfoOpen}
        onClose={() => setIsCenterInfoOpen(false)}
        largeText={largeText}
      />

      <RecommendationModal
        isOpen={isRecommendationOpen}
        onClose={() => setIsRecommendationOpen(false)}
        recommendations={recommendations}
        primaryHealthGoal={primaryHealthGoal}
        largeText={largeText}
        onSelectProgramToEnroll={handleSelectProgramToEnroll}
      />
    </div>
  );
}
