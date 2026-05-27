
import type { Card, AnnualReportData } from '../../../types';
import type { UserProfile } from '../../../../platform/user/types';

export interface GameViewProps {
    isViewingAnnualReport: boolean;
    latestAnnualReports: Record<number, AnnualReportData> | null;
    isTurnTransitioning: boolean;
    onEndTurn: (manualValues?: Record<string, string>) => void;
    onStartNextYear: () => void;
    onViewCompanyHistory: () => void;
    onReEnterGame: (playerIndex: number) => void;
    onAdvanceToNextPlayer: () => void;
    onSetRevealedMarketPile: (pile: { title: string; cards: Card[] } | null) => void;
    userProfile: UserProfile | null; // Added prop
}

export type GameViewChildProps = GameViewProps;
