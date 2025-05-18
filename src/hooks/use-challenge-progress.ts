
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { challenges } from '@/config/challenges';

const CHALLENGE_PROGRESS_KEY = 'codequest_challenge_progress_v1';
const totalChallenges = challenges.length; 

export function useChallengeProgress() {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(CHALLENGE_PROGRESS_KEY);
      if (savedProgress !== null) {
        const parsedIndex = parseInt(savedProgress, 10);
        if (!isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex <= totalChallenges) {
          setCurrentChallengeIndex(parsedIndex);
        } else {
          localStorage.setItem(CHALLENGE_PROGRESS_KEY, '0');
          setCurrentChallengeIndex(0);
        }
      }
    } catch (error) {
      console.error("Failed to access localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  const completeChallenge = useCallback(() => {
    setCurrentChallengeIndex((prevIndex) => {
      const nextIndex = Math.min(prevIndex + 1, totalChallenges);
      try {
        localStorage.setItem(CHALLENGE_PROGRESS_KEY, nextIndex.toString());
      } catch (error) {
        console.error("Failed to write to localStorage:", error);
      }
      // Navigation is now handled by useEffects in page components
      // reacting to currentChallengeIndex change.
      return nextIndex;
    });
  }, []);

  const resetProgress = useCallback(() => {
    setCurrentChallengeIndex(0);
    try {
      localStorage.setItem(CHALLENGE_PROGRESS_KEY, '0');
    } catch (error) {
      console.error("Failed to write to localStorage:", error);
    }
    router.push('/challenge0'); 
  }, [router]);

  return { currentChallengeIndex, completeChallenge, resetProgress, isLoaded, totalChallenges };
}
