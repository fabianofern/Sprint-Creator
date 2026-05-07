import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-bold text-slate-700">{label}</label>}
      <input 
        className={`input ${error ? 'border-red-500' : ''} ${className} px-4 py-3 bg-slate-50 border-slate-200 focus:bg-white rounded-xl focus:ring-4 focus:ring-primary/10`}
        {...props} 
      />
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};
