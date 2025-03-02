'use client';

import React from 'react';

interface Props {
  time: number;
  characterCount: number;
  onReset: () => void;
  completedCount: number;
  totalCount: number;
}

export const TypingResult: React.FC<Props> = ({ 
  time, 
  characterCount, 
  onReset,
  completedCount,
  totalCount
}) => {
  const speed = Math.round((characterCount / time) * 60);

  return (
    <div className="mt-8 p-8 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        結果発表
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-900 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">完了問題数</p>
          <p className="text-2xl font-bold text-blue-400">{completedCount} / {totalCount}</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">経過時間</p>
          <p className="text-2xl font-bold text-purple-400">{time.toFixed(1)}秒</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">平均速度</p>
          <p className="text-2xl font-bold text-green-400">{speed}文字/分</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">総入力文字数</p>
          <p className="text-2xl font-bold text-yellow-400">{characterCount}文字</p>
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={onReset}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg 
            hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200
            shadow-lg shadow-blue-500/25"
        >
          もう一度プレイ
        </button>
      </div>
    </div>
  );
}; 