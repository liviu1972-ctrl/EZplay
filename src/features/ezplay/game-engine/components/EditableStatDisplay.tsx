import React from 'react';

interface EditableStatDisplayProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  imageUrl: string;
  textColor?: string;
  size?: 'default' | 'mobile';
}

const EditableStatDisplay: React.FC<EditableStatDisplayProps> = ({ label, value, onChange, imageUrl, textColor = 'text-white', size = 'default' }) => {
  const containerClasses = size === 'mobile' ? 'w-14 h-16' : 'w-20 h-20';
  const imageClasses = size === 'mobile' ? 'w-12 h-12' : 'w-12 h-12';
  const textClasses = size === 'mobile' ? 'text-xl' : 'text-xl';
  const labelClasses = size === 'mobile' ? 'h-4' : 'h-5';

  return (
    <div className={`flex flex-col items-center justify-start space-y-1 p-1 rounded-lg ${containerClasses}`}>
      <span className={`text-sm text-slate-400 uppercase tracking-wider text-center ${labelClasses}`}>{label}</span>
      <div 
        className={`relative flex items-center justify-center bg-cover bg-center rounded-md shadow-lg ${imageClasses}`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full h-full text-center bg-transparent border-2 border-slate-500/50 focus:border-yellow-400 rounded-md outline-none font-bold ${textClasses} ${textColor}`}
          style={{ textShadow: '1px 1px 2px black' }}
        />
      </div>
    </div>
  );
};

export default EditableStatDisplay;