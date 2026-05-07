import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 ${className} ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
    >
      {title && <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>}
      {children}
    </div>
  );
};
