import { useEffect, useRef, useCallback } from 'react';

export function useImmersiveGameMode() {
  const isGameModeActive = useRef(false);

  useEffect(() => {
    // Height recalculation for accurate 100dvh
    const updateAppHeight = () => {
      const height = window.visualViewport?.height ?? window.innerHeight;
      document.documentElement.style.setProperty('--app-height', `${height}px`);
    };

    window.addEventListener('resize', updateAppHeight);
    window.addEventListener('orientationchange', updateAppHeight);
    window.visualViewport?.addEventListener('resize', updateAppHeight);

    updateAppHeight();

    // Prevent default behaviors
    const handleTouchMove = (e: TouchEvent) => {
      if (isGameModeActive.current) {
        e.preventDefault();
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (isGameModeActive.current) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('resize', updateAppHeight);
      window.removeEventListener('orientationchange', updateAppHeight);
      window.visualViewport?.removeEventListener('resize', updateAppHeight);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const enterGameMode = useCallback(async (container?: HTMLElement) => {
    isGameModeActive.current = true;
    // We intentionally removed the requestFullscreen API call here because 
    // Samsung Internet and some other browsers handle it poorly and break the layout.
    // The PWA "display: fullscreen" from manifest is sufficient.
  }, []);

  const exitGameMode = useCallback(async () => {
    isGameModeActive.current = false;
  }, []);

  return { enterGameMode, exitGameMode };
}
