import React, { useState } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import DesktopEntrepreneurSelection from './Desktop';
import MobileEntrepreneurSelection from './Mobile';
import type { Card } from '../../../types';

interface EntrepreneurSelectionProps {
  entrepreneurs: Card[];
  initialSelectedId: string;
  onConfirm: (selectedId: string) => void;
  onBack: () => void;
  playerContextText?: string;
}

const EntrepreneurSelection: React.FC<EntrepreneurSelectionProps> = (props) => {
    const isMobile = useIsMobile();
    
    if (isMobile) {
        // The mobile component is now self-contained for its UI logic.
        // It only needs the main callbacks and data.
        return <MobileEntrepreneurSelection 
            entrepreneurs={props.entrepreneurs}
            onConfirm={props.onConfirm}
            onBack={props.onBack}
            playerContextText={props.playerContextText}
        />;
    }

    // Desktop view continues to use state managed by this container.
    const [selectedId, setSelectedId] = useState<string>(props.initialSelectedId);
    return <DesktopEntrepreneurSelection {...props} selectedId={selectedId} onSetSelectedId={setSelectedId} />;
};

export default EntrepreneurSelection;
