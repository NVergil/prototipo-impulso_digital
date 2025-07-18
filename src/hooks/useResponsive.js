import { useState, useEffect } from 'react';

export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    // Breakpoints
    isExtraSmall: windowSize.width <= 360,
    isVerySmall: windowSize.width <= 480,
    isSmall: windowSize.width <= 768,
    isMedium: windowSize.width <= 1024,
    isLarge: windowSize.width <= 1200,
    
    // Valores dinámicos
    width: windowSize.width,
    height: windowSize.height,
    
    // Helpers para componentes
    getPadding: () => {
      if (windowSize.width <= 360) return 8;
      if (windowSize.width <= 480) return 12;
      if (windowSize.width <= 768) return 16;
      return 24;
    },
    
    getCardPadding: () => {
      if (windowSize.width <= 360) return '12px 16px';
      if (windowSize.width <= 480) return '16px 20px';
      return '24px';
    },
    
    getFontSize: (base = 16) => {
      if (windowSize.width <= 360) return base - 2;
      if (windowSize.width <= 480) return base - 1;
      return base;
    },
    
    getButtonSize: () => {
      if (windowSize.width <= 360) return 'small';
      if (windowSize.width <= 480) return 'middle';
      return 'large';
    }
  };
};

export default useResponsive;
