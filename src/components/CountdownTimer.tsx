import { useState, useEffect } from "react";
import { Clock, ShieldCheck } from "lucide-react";

export default function CountdownTimer() {
  // Set target date for the promo to 4 days from now so the countdown is always active and exciting!
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Generate target: constant 3 days 14 hours 22 minutes ahead, or stored target
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(targetDate.getHours() + 14);
    
    // We can also save it under sessionStorage so it doesn't reset on rapid manual F5s
    const storedTarget = sessionStorage.getItem("titan_promo_deadline");
    let targetTimeMs = 0;
    
    if (storedTarget) {
      targetTimeMs = parseInt(storedTarget, 10);
      // If expired, recreate
      if (targetTimeMs < Date.now()) {
        const newTarget = Date.now() + (3 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000);
        sessionStorage.setItem("titan_promo_deadline", newTarget.toString());
        targetTimeMs = newTarget;
      }
    } else {
      const newTarget = Date.now() + (3 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000);
      sessionStorage.setItem("titan_promo_deadline", newTarget.toString());
      targetTimeMs = newTarget;
    }

    const intervalId = setInterval(() => {
      const now = Date.now();
      const difference = targetTimeMs - now;

      if (difference <= 0) {
        clearInterval(intervalId);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatNum = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="glass-card border border-titan-orange/20 rounded-2xl p-5 md:p-6 text-center relative overflow-hidden pulse-glow-orange">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-titan-orange to-titan-red"></div>
      
      <div className="flex items-center justify-center gap-2 mb-2">
        <Clock className="w-4 h-4 text-titan-orange animate-spin-slow" style={{ animationDuration: '6s' }} />
        <span className="text-xs font-bold tracking-widest text-titan-orange uppercase">LIFETIME INTAKE OFFER LIMIT</span>
      </div>

      <h5 className="font-display font-bold text-white text-base md:text-lg tracking-tight mb-4">
        Save <span className="text-titan-red underline decoration-wavy underline-offset-4">35% ON ACTIVE INITIATION</span> Tier
      </h5>

      {/* Grid count items */}
      <div className="grid grid-cols-4 gap-2.5 max-w-sm mx-auto mb-4">
        {/* Days */}
        <div className="bg-black/60 border border-white/5 rounded-xl p-2.5">
          <div className="font-display text-2xl md:text-3xl font-black text-white glow-orange-text">
            {formatNum(timeLeft.days)}
          </div>
          <div className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold mt-0.5">Days</div>
        </div>

        {/* Hours */}
        <div className="bg-black/60 border border-white/5 rounded-xl p-2.5">
          <div className="font-display text-2xl md:text-3xl font-black text-white glow-orange-text">
            {formatNum(timeLeft.hours)}
          </div>
          <div className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold mt-0.5">Hrs</div>
        </div>

        {/* Minutes */}
        <div className="bg-black/60 border border-white/5 rounded-xl p-2.5">
          <div className="font-display text-2xl md:text-3xl font-black text-white glow-orange-text">
            {formatNum(timeLeft.minutes)}
          </div>
          <div className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold mt-0.5">Min</div>
        </div>

        {/* Seconds */}
        <div className="bg-black/60 border border-white/5 rounded-xl p-2.5">
          <div className="font-display text-2xl md:text-3xl font-black text-white glow-orange-text text-titan-orange">
            {formatNum(timeLeft.seconds)}
          </div>
          <div className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold mt-0.5">Sec</div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400 font-mono">
        <ShieldCheck className="w-3.5 h-3.5 text-green-400" /> Use premium checkout coupon: <span className="text-white font-extrabold uppercase">TITAN35</span>
      </div>
    </div>
  );
}
