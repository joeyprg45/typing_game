'use client';

import React from 'react';

interface Props {
  pressedKey: string;
}

export const KeyboardUI: React.FC<Props> = ({ pressedKey }) => {
  const keyboardLayout = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '^', '¥'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '@', '['],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', ':', ']'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '\\'],
  ];

  // 日本語文字とアルファベットのマッピング
  const japaneseToEnglish: { [key: string]: string } = {
    'あ': 'A', 'い': 'I', 'う': 'U', 'え': 'E', 'お': 'O',
    'か': 'K', 'き': 'K', 'く': 'K', 'け': 'K', 'こ': 'K',
    'さ': 'S', 'し': 'S', 'す': 'S', 'せ': 'S', 'そ': 'S',
    'た': 'T', 'ち': 'T', 'つ': 'T', 'て': 'T', 'と': 'T',
    'な': 'N', 'に': 'N', 'ぬ': 'N', 'ね': 'N', 'の': 'N',
    'は': 'H', 'ひ': 'H', 'ふ': 'F', 'へ': 'H', 'ほ': 'H',
    'ま': 'M', 'み': 'M', 'む': 'M', 'め': 'M', 'も': 'M',
    'や': 'Y', 'ゆ': 'Y', 'よ': 'Y',
    'ら': 'R', 'り': 'R', 'る': 'R', 'れ': 'R', 'ろ': 'R',
    'わ': 'W', 'を': 'W', 'ん': 'N',
    'が': 'G', 'ぎ': 'G', 'ぐ': 'G', 'げ': 'G', 'ご': 'G',
    'ざ': 'Z', 'じ': 'Z', 'ず': 'Z', 'ぜ': 'Z', 'ぞ': 'Z',
    'だ': 'D', 'ぢ': 'D', 'づ': 'D', 'で': 'D', 'ど': 'D',
    'ば': 'B', 'び': 'B', 'ぶ': 'B', 'べ': 'B', 'ぼ': 'B',
    'ぱ': 'P', 'ぴ': 'P', 'ぷ': 'P', 'ぺ': 'P', 'ぽ': 'P',
  };

  const getHighlightKey = (pressedKey: string) => {
    const upperKey = pressedKey.toUpperCase();
    return japaneseToEnglish[pressedKey] || upperKey;
  };

  return (
    <div className="mt-8 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-xl">
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 mb-1">
          {row.map((key) => (
            <div
              key={key}
              className={`
                w-10 h-10 flex items-center justify-center rounded
                font-mono text-sm border border-gray-700
                ${getHighlightKey(pressedKey) === key
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50 transform scale-95' 
                  : 'bg-gray-800 text-gray-400'}
                transition-all duration-150
              `}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
      <div className="flex justify-center mt-1">
        <div 
          className={`
            w-64 h-10 rounded flex items-center justify-center
            font-mono text-sm border border-gray-700
            ${pressedKey === ' ' 
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50 transform scale-95' 
              : 'bg-gray-800 text-gray-400'}
            transition-all duration-150
          `}
        >
          Space
        </div>
      </div>
    </div>
  );
}; 