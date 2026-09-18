// Web Speech API STT and TTS helper

export interface SpeechRecognitionResultLike {
  transcript: string;
}

export function isSpeechRecognitionSupported(): boolean {
  return typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function createSpeechRecognizer(
  onResult: (text: string) => void,
  onEnd: () => void,
  onError: (err: any) => void
) {
  if (!isSpeechRecognitionSupported()) {
    return null;
  }

  const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognizer = new SpeechRecognitionClass();
  recognizer.lang = 'ko-KR';
  recognizer.continuous = false;
  recognizer.interimResults = true;

  recognizer.onresult = (event: any) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    const currentText = finalTranscript || interimTranscript;
    if (currentText) {
      onResult(currentText);
    }
  };

  recognizer.onerror = (event: any) => {
    console.warn('Speech recognition error:', event.error);
    onError(event.error);
  };

  recognizer.onend = () => {
    onEnd();
  };

  return recognizer;
}

export function speakKoreanText(
  text: string,
  onStart?: () => void,
  onEnd?: () => void
) {
  if (!isSpeechSynthesisSupported()) {
    alert('현재 브라우저에서 음성 출력을 지원하지 않습니다.');
    return;
  }

  window.speechSynthesis.cancel(); // Cancel any ongoing speech

  // Strip markdown formatting symbols for natural audio playback
  const cleanText = text
    .replace(/[*#_~`\[\]]/g, '')
    .replace(/\(☎.*?\)/g, '')
    .replace(/http\S+/g, '')
    .trim();

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'ko-KR';
  utterance.rate = 0.92; // Slightly slower, calm and clear pace for seniors
  utterance.pitch = 1.0;

  // Find a Korean voice if available
  const voices = window.speechSynthesis.getVoices();
  const koreanVoice = voices.find((v) => v.lang.startsWith('ko'));
  if (koreanVoice) {
    utterance.voice = koreanVoice;
  }

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}
