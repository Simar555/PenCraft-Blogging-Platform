import React from 'react';
import Galaxy from './Galaxy';

const MagicBackground = () => {
  return (
    <div className="fixed inset-0" style={{ zIndex: -1 }}>
      {/* Black background like reactbits.dev */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Galaxy Background - exact same settings as photo */}
      <Galaxy 
        mouseRepulsion={true}
        mouseInteraction={true}
        density={1}
        glowIntensity={0.3}
        saturation={0}
        hueShift={140}
        twinkleIntensity={0.3}
        rotationSpeed={0.03}
        repulsionStrength={2}
        autoCenterRepulsion={0}
        starSpeed={0.5}
        speed={1}
        transparent={false}
        style={{ width: '100%', height: '100%', position: 'relative' }}
      />
    </div>
  );
};

export default MagicBackground; 