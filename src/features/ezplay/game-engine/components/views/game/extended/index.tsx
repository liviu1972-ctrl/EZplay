import React from 'react';
import { useIsMobile } from '../../../hooks/useIsMobile';
import DesktopGameViewExtended from './Desktop';
import MobileGameViewExtended from './Mobile';
import type { GameViewProps } from '../types';

const GameViewExtended: React.FC<GameViewProps> = (props) => {
    const isMobile = useIsMobile();
    
    if (isMobile) {
        return <MobileGameViewExtended {...props} />;
    }

    return <DesktopGameViewExtended {...props} />;
};

export default GameViewExtended;
