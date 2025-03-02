'use client';

import React, { useState, useEffect } from 'react';
import { TypingDisplay } from './TypingDisplay';
import { TypingInput } from './TypingInput';
import { TypingResult } from './TypingResult';
import { KeyboardUI } from './KeyboardUI';

const TYPING_TEXTS = [
  'こんにちは世界',
  'タイピングの練習をしましょう',
  'プログラミングは楽しい',
  '日本の四季は美しい',
  '継続は力なり',
  '時は金なり',
  '千里の道も一歩から',
  '良薬は口に苦し',
  '温故知新',
  '一期一会'
];

export const TypingGame: React.FC = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [lastPressedKey, setLastPressedKey] = useState<string>('');
  const [isComposing, setIsComposing] = useState<boolean>(false);

  useEffect(() => {
    if (userInput === TYPING_TEXTS[currentTextIndex]) {
      if (currentTextIndex < TYPING_TEXTS.length - 1) {
        setCurrentTextIndex(prev => prev + 1);
        setUserInput('');
        setCompletedCount(prev => prev + 1);
      } else {
        setEndTime(Date.now());
        setCompletedCount(TYPING_TEXTS.length);
      }
    }
  }, [userInput, currentTextIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameStarted && !endTime && !isComposing) {
        setLastPressedKey(e.key);
        setTimeout(() => {
          setLastPressedKey('');
        }, 150);
      }
    };

    const handleCompositionStart = () => {
      setIsComposing(true);
    };

    const handleCompositionEnd = (e: CompositionEvent) => {
      setIsComposing(false);
      if (e.data) {
        const chars = e.data.split('');
        let currentIndex = 0;
        
        // 各文字を順番に表示
        const showNextChar = () => {
          if (currentIndex < chars.length) {
            setLastPressedKey(chars[currentIndex]);
            setTimeout(() => {
              setLastPressedKey('');
              currentIndex++;
              showNextChar();
            }, 150);
          }
        };
        
        showNextChar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('compositionstart', handleCompositionStart);
    document.addEventListener('compositionend', handleCompositionEnd);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('compositionstart', handleCompositionStart);
      document.removeEventListener('compositionend', handleCompositionEnd);
    };
  }, [isGameStarted, endTime, isComposing]);

  const startGame = () => {
    setIsGameStarted(true);
    setStartTime(Date.now());
    setCurrentTextIndex(0);
    setUserInput('');
    setCompletedCount(0);
    setEndTime(null);
  };

  const resetGame = () => {
    setIsGameStarted(false);
    setStartTime(null);
    setEndTime(null);
    setCurrentTextIndex(0);
    setUserInput('');
    setCompletedCount(0);
  };

  const handleInputChange = (value: string) => {
    setUserInput(value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          タイピングゲーム
        </h1>
        
        {!isGameStarted && !endTime && (
          <div className="text-center">
            <button
              onClick={startGame}
              className="mb-4 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg 
                hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 
                shadow-lg shadow-blue-500/25"
            >
              ゲームスタート
            </button>
            <p className="text-gray-400 mt-4">
              全10問のタイピング問題に挑戦しましょう！
            </p>
          </div>
        )}

        {isGameStarted && (
          <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <div className="text-lg font-semibold text-gray-300">
                問題 {completedCount + 1} / {TYPING_TEXTS.length}
              </div>
              {startTime && (
                <div className="text-gray-400">
                  経過時間: {((Date.now() - startTime) / 1000).toFixed(1)}秒
                </div>
              )}
            </div>
            <TypingDisplay 
              text={TYPING_TEXTS[currentTextIndex]} 
              userInput={userInput} 
            />
            <TypingInput 
              value={userInput}
              onChange={handleInputChange}
              disabled={!!endTime}
            />
            <KeyboardUI pressedKey={lastPressedKey} />
          </div>
        )}

        {endTime && startTime && (
          <TypingResult 
            time={(endTime - startTime) / 1000}
            characterCount={TYPING_TEXTS.join('').length}
            onReset={resetGame}
            completedCount={completedCount}
            totalCount={TYPING_TEXTS.length}
          />
        )}
      </div>
    </div>
  );
};
