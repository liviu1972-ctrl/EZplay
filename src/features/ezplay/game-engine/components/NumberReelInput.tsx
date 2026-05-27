import React, { useState } from 'react';
import NumberReelModal from './NumberReelModal';

interface NumberReelInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  imageUrl: string;
  textColor?: string;
  size?: 'default' | 'mobile';
}

const NumberReelInput: React.FC<NumberReelInputProps> = ({ label, value, onChange, imageUrl, textColor = 'text-white', size = 'default' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerClasses = size === 'mobile' ? 'w-14 h-16' : 'w-20 h-20';
  const labelClasses = size === 'mobile' ? 'h-4 text-xs' : 'h-5 text-sm';
  const imageClasses = 'w-12 h-12';
  
  const handleClick = () => {
    setIsModalOpen(true);
  };
  
  const handleConfirm = (newValue: string) => {
      onChange(newValue);
      setIsModalOpen(false);
  };
  
  const handleClose = () => {
      setIsModalOpen(false);
  };

  return (
    <>
      <div className={`flex flex-col items-center justify-start space-y-1 p-1 rounded-lg ${containerClasses}`}>
        <span className={`text-slate-400 uppercase tracking-wider text-center ${labelClasses}`}>{label}</span>
        <div 
          className={`relative flex items-center justify-center bg-cover bg-center rounded-md shadow-lg ${imageClasses}`}
          style={{ backgroundImage: `url(${imageUrl})` }}
          onClick={handleClick}
        >
          <div 
              className={`absolute inset-0 flex items-center justify-center font-bold text-xl cursor-pointer rounded-md transition-colors hover:bg-white/20 ${textColor}`}
              style={{ textShadow: '1px 1px 2px black' }}
          >
            {value || '---'}
          </div>
        </div>
      </div>
      
      {isModalOpen && (
        <NumberReelModal 
            initialValue={value}
            onClose={handleClose}
            onConfirm={handleConfirm}
            imageUrl={imageUrl}
        />
      )}
    </>
  );
};

export default NumberReelInput;