// Text-to-Speech utility functions

export interface SpeechOptions {
  voice: string;
  text: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export const createSpeechBlob = (text: string, voice: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    // Check if Web Speech API is supported
    if (!('speechSynthesis' in window)) {
      reject(new Error('Speech synthesis not supported in this browser'));
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice
    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices.find(v => 
      v.name.toLowerCase().includes(voice.split('-')[2]) && 
      v.lang.includes(voice.split('-')[0] + '-' + voice.split('-')[1])
    );
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Set speech parameters
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Create audio context for recording
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const destination = audioContext.createMediaStreamDestination();
    const mediaRecorder = new MediaRecorder(destination.stream);
    const chunks: BlobPart[] = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      resolve(blob);
    };

    utterance.onstart = () => {
      mediaRecorder.start();
    };

    utterance.onend = () => {
      setTimeout(() => {
        mediaRecorder.stop();
      }, 100);
    };

    utterance.onerror = (event) => {
      reject(new Error(`Speech synthesis error: ${event.error}`));
    };

    // Start speech synthesis
    speechSynthesis.speak(utterance);
  });
};

export const playText = (text: string, voice: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Speech synthesis not supported in this browser'));
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice
    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices.find(v => {
      const voiceParts = voice.split('-');
      return v.lang.includes(voiceParts[0] + '-' + voiceParts[1]) &&
             (voiceParts[2] === 'female' ? v.name.toLowerCase().includes('female') || 
              ['alice', 'emma', 'sarah', 'sofia', 'camille', 'giulia'].some(name => 
                v.name.toLowerCase().includes(name)) : 
              v.name.toLowerCase().includes('male') || 
              ['david', 'oliver', 'hans'].some(name => 
                v.name.toLowerCase().includes(name)));
    });
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => resolve();
    utterance.onerror = (event) => reject(new Error(`Speech synthesis error: ${event.error}`));

    speechSynthesis.speak(utterance);
  });
};

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
  }
};

export const getAvailableVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
    } else {
      speechSynthesis.onvoiceschanged = () => {
        resolve(speechSynthesis.getVoices());
      };
    }
  });
};