'use client';

import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export const TypingInput: React.FC<Props> = ({ value, onChange, disabled }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        disabled:opacity-50 disabled:cursor-not-allowed
        font-mono text-lg"
      placeholder="ここにタイプしてください"
    />
  );
}; 