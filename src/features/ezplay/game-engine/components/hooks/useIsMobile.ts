import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 820; // Common tablet portrait width, good threshold for landscape phones

/**
 * A custom React hook that detects if the current device is a mobile device based on screen width.
 * @returns {boolean} - True if the screen width is less than the mobile breakpoint, false otherwise.
 */
export const useIsMobile = (): boolean => {
  // Initialize state based on the window width if available, otherwise default to false.
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return isMobile;
};
