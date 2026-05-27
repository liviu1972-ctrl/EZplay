import React from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import DesktopAccountantSelection from './Desktop';
import MobileAccountantSelection from './Mobile';
import type { Card } from '../../../types';

interface AccountantSelectionProps {
  accountants: Card[];
  onConfirm: (selectedId: string) => void;
  onBack: () => void;
  playerContextText?: string;
}

const AccountantSelection: React.FC<AccountantSelectionProps> = (props) => {
    const isMobile = useIsMobile();
    
    if (isMobile) {
        return <MobileAccountantSelection {...props} />;
    }

    return <DesktopAccountantSelection {...props} />;
};

export default AccountantSelection;
