'use client';

import React from 'react';

interface Props {
  text: string;
  userInput: string;
}

export const TypingDisplay: React.FC<Props> = ({ text, userInput }) => {
  return (
    <div className="mb-8 text-2xl font-mono bg-gray-900 p-6 rounded-lg border border-gray-700 shadow-inner">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={
            index < userInput.length
              ? userInput[index] === char
                ? 'text-green-400'
                : 'text-red-400'
              : 'text-gray-500'
          }
        >
          {char}
        </span>
      ))}
    </div>
  );
}; 