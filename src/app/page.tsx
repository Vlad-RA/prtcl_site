
"use client";

import { challenges } from '@/config/challenges';
import { useChallengeProgress } from '@/hooks/use-challenge-progress';
import { ChallengeDetails } from '@/components/challenge-details';
import { VictoryScreen } from '@/components/victory-screen';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import React from 'react';

export default function CodeQuestPage() {
  const { currentChallengeIndex, completeChallenge, resetProgress, isLoaded, totalChallenges } = useChallengeProgress();

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <Skeleton className="h-12 w-1/2 mb-4" />
        <Skeleton className="h-8 w-3/4 mb-6" />
        <Skeleton className="h-40 w-full max-w-md" />
      </div>
    );
  }

  const currentChallenge = challenges[currentChallengeIndex];
  const isVictory = currentChallengeIndex >= totalChallenges;

  return (
    <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 flex flex-col items-center">
      {/* Подсказка для Задания 1: Скрытый пароль в HTML-комментарии */}
      {currentChallenge && currentChallenge.id === 'web_pentest_01' && (
        <div style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', left: '-9999px', top: '-9999px' }} dangerouslySetInnerHTML={{ __html: "<!-- Пароль: Sup3rS3cr3tP@$$ -->" }} />
      )}

      {/* Подсказка для Задания 2: Раскрытый секрет в Data-атрибуте */}
      {currentChallenge && currentChallenge.id === 'web_pentest_02' && (
        <div data-secret-answer="OpenSesame123" style={{ display: 'none' }}>
          Этот div содержит секретный ответ для задания 2 в data-атрибуте.
        </div>
      )}

      {isVictory ? (
        <VictoryScreen onRestart={resetProgress} />
      ) : currentChallenge ? (
        <div className="w-full flex flex-col items-center space-y-6">
          <ChallengeDetails
            challenge={currentChallenge}
            onCorrectAnswer={completeChallenge}
          />
          <div className="mt-auto pt-4">
             <p className="text-xs text-muted-foreground">
              Задание {currentChallengeIndex + 1} из {totalChallenges}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4 p-8">
          <h2 className="text-2xl font-semibold text-destructive">Ошибка: Задание не найдено</h2>
          <p>Возникла проблема при загрузке текущего задания. Вы можете попробовать сбросить свой прогресс.</p>
          <Button onClick={resetProgress} variant="destructive">
            <RefreshCw className="mr-2 h-4 w-4" /> Сбросить прогресс
          </Button>
        </div>
      )}
    </div>
  );
}
