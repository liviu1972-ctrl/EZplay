import React from 'react';

interface NumpadInputProps {
  label: string;
  value: string;
  onClick: () => void;
  imageUrl: string;
  textColor?: string;
  size?: 'default' | 'mobile';
}

const NumpadInput: React.FC<NumpadInputProps> = ({ label, value, onClick, imageUrl, textColor = 'text-white', size = 'default' }) => {
  const containerClasses = size === 'mobile' ? 'w-14 h-16' : 'w-20 h-20';
  const labelClasses = size === 'mobile' ? 'h-4 text-xs' : 'h-5 text-sm';
  const imageClasses = 'w-12 h-12';

  return (
    <div className={`flex flex-col items-center justify-start space-y-1 p-1 rounded-lg ${containerClasses}`}>
      <span className={`text-slate-400 uppercase tracking-wider text-center ${labelClasses}`}>{label}</span>
      <div
        onClick={onClick}
        className={`relative flex items-center justify-center bg-cover bg-center rounded-md shadow-lg cursor-pointer ${imageClasses}`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div
          className={`absolute inset-0 flex items-center justify-center font-bold text-xl rounded-md transition-colors hover:bg-white/20 border-2 border-slate-500/50 ${textColor}`}
          style={{ textShadow: '1px 1px 2px black' }}
        >
          {value || '---'}
        </div>
      </div>
    </div>
  );
};

export default NumpadInput;