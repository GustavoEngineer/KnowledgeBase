import React from 'react';

const Input = ({ type = 'text', placeholder, value, onChange, className = '', style = {} }) => {
  return (
    <div className="relative group w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-3 
          bg-slate-900/80 
          border-b-2 border-slate-700
          text-cyan-400 placeholder-slate-600
          font-mono text-lg tracking-widest
          focus:outline-none focus:border-cyan-400
          transition-all duration-300
          ${className}
        `}
        style={{
          background: 'rgba(2, 6, 23, 0.8)',
          border: 'none',
          borderBottom: '2px solid rgba(148, 163, 184, 0.2)',
          color: 'var(--color-accent)',
          padding: '1rem',
          width: '100%',
          fontFamily: 'var(--font-mono)',
          fontSize: '1.2rem',
          textAlign: 'center',
          letterSpacing: '0.2em',
          ...style
        }}
      />
      {/* Decorative tech markers */}
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-cyan-500 opacity-50 group-focus-within:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-cyan-500 opacity-50 group-focus-within:opacity-100 transition-opacity" />
    </div>
  );
};

export default Input;
