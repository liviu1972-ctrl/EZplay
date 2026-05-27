import React, { useContext } from 'react';
import { useIsMobile } from '../../../hooks/useIsMobile';
import DesktopGameViewClassic from './Desktop';
import MobileGameViewClassic from './Mobile';
import type { GameViewProps } from '../types';

const GameViewClassic: React.FC<GameViewProps> = (props) => {
    const isMobile = useIsMobile();
    
    if (isMobile) {
        return <MobileGameViewClassic {...props} />;
    }

    return <DesktopGameViewClassic {...props} />;
};

export default GameViewClassic;
