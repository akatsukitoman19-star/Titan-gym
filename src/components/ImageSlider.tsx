import React, { useState, useRef, useEffect } from "react";
import { ArrowLeftRight, Activity } from "lucide-react";

interface ImageSliderProps {
  key?: string | number;
  beforeImage: string;
  afterImage: string;
  name: string;
  achievement: string;
  duration: string;
}

export default function ImageSlider({ beforeImage, afterImage, name, achievement, duration }: ImageSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) { // Left button down
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  // Initially set loaded to true
  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-white/5 shadow-2xl p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="font-display text-white font-bold text-lg md:text-xl tracking-tight">{name}</h4>
          <p className="text-xs text-zinc-400 font-mono flex items-center gap-1.5 mt-0.5">
            <Activity className="w-3.5 h-3.5 text-titan-orange animate-pulse" /> {achievement}
          </p>
        </div>
        <div className="bg-titan-red/10 border border-titan-red/20 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold text-titan-red uppercase tracking-wider">
          {duration} Routine
        </div>
      </div>

      {/* Slider Container */}
      <div 
        ref={containerRef}
        className="relative h-[280px] md:h-[350px] w-full rounded-xl overflow-hidden select-none cursor-ew-resize bg-black"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={(e) => handleMove(e.clientX)}
      >
        {/* After Image (Background) */}
        <img 
          src={afterImage} 
          alt="After Transformation" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute right-4 bottom-4 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-green-400 uppercase tracking-widest border border-green-500/20">
          After (Titan)
        </div>

        {/* Before Image (Overlay clipped) */}
        <div 
          className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={beforeImage} 
            alt="Before Transformation" 
            className="absolute inset-y-0 left-0 h-full object-cover max-w-none"
            style={{ width: containerRef.current?.offsetWidth || 400 }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute left-4 bottom-4 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-white/10">
            Before
          </div>
        </div>

        {/* Vertical divider line */}
        <div 
          className="absolute inset-y-0 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute inset-y-0 -left-[1.5px] w-[3px] bg-gradient-to-b from-titan-red via-titan-orange to-titan-red opacity-80 shadow-[0_0_10px_rgba(255,42,42,0.8)]"></div>
          
          {/* Centered Drag Handle controller */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-black border-2 border-titan-red rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,42,42,0.6)]">
            <ArrowLeftRight className="w-4 h-4 text-titan-red" />
          </div>
        </div>
      </div>
      
      <p className="text-center text-[11px] text-zinc-500 mt-3 italic">
        Hover & drag or tap to slide between Before and After physique states
      </p>
    </div>
  );
}
