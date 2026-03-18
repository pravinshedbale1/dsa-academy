import React from 'react';

interface CompanyTagProps {
  company: string;
  size?: 'sm' | 'md';
}

const companyColors: Record<string, string> = {
  Google: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Amazon: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Meta: 'bg-blue-600/20 text-blue-300 border-blue-600/30',
  Microsoft: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  Apple: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  Netflix: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const companyLogos: Record<string, string> = {
  Google: '🔵',
  Amazon: '📦',
  Meta: '🔷',
  Microsoft: '🟦',
  Apple: '🍎',
  Netflix: '🎬',
};

export const CompanyTag: React.FC<CompanyTagProps> = ({ company, size = 'sm' }) => {
  const color = companyColors[company] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  const logo = companyLogos[company] || '🏢';
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1.5';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${color} ${sizeClass}`}>
      <span>{logo}</span>
      {company}
    </span>
  );
};
