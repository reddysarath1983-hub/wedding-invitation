"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CountdownProps {
  weddingDate: string; // YYYY-MM-DD
  weddingTime: string; // e.g. "10:30 AM"
  accentColor?: string;
}

export function Countdown({ weddingDate, weddingTime, accentColor = "text-[#c59b27]" }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    function calculate() {
      if (!weddingDate) return;
      try {
        const targetStr = `${weddingDate}T${convert12to24(weddingTime)}:00+05:30`;
        const target = new Date(targetStr).getTime();
        const now = new Date().getTime();
        const difference = target - now;

        if (difference <= 0) {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        } else {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          setTimeLeft({ days, hours, minutes, seconds, isPast: false });
        }
      } catch {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
      }
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [weddingDate, weddingTime]);

  function convert12to24(timeStr: string): string {
    if (!timeStr) return "10:30";
    const clean = timeStr.trim().toUpperCase();
    const isPM = clean.includes("PM");
    const isAM = clean.includes("AM");
    const numbersOnly = clean.replace(/[^0-9:]/g, "");
    const parts = numbersOnly.split(":");
    let hours = parseInt(parts[0] || "10", 10);
    const minutes = parts[1] || "00";

    if (isPM && hours < 12) hours += 12;
    if (isAM && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  }

  if (timeLeft.isPast) {
    return (
      <div className="py-4 px-6 text-center">
        <p className="text-base sm:text-lg font-telugu font-semibold text-[#8b6508]">
          🎉 మా వివాహ మహోత్సవం దిగ్విజయంగా పూర్తయినది!
        </p>
        <p className="text-xs text-[#8b6508]/80 font-telugu mt-1 italic">
          వధూవరులను ఆశీర్వదించిన లక్ష్మీ నారాయణుల కృప అందరికీ ఉండుగాక!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-[11px] tracking-[0.25em] uppercase mb-4 text-[#8b6508] font-semibold font-luxury flex items-center gap-2">
        <span className="w-6 h-[1px] bg-[#c59b27]/40"></span>
        <span>THE COUNTDOWN</span>
        <span className="w-6 h-[1px] bg-[#c59b27]/40"></span>
      </div>

      <div className="flex items-center justify-center gap-4 sm:gap-8 text-center">
        <div>
          <div className={`text-3xl sm:text-4xl font-luxury font-bold ${accentColor}`}>
            {timeLeft.days}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-[#8b6508]/80 font-telugu mt-1">
            రోజులు
          </div>
        </div>

        <span className="text-xl text-[#c59b27]/40 font-light">•</span>

        <div>
          <div className={`text-3xl sm:text-4xl font-luxury font-bold ${accentColor}`}>
            {timeLeft.hours}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-[#8b6508]/80 font-telugu mt-1">
            గంటలు
          </div>
        </div>

        <span className="text-xl text-[#c59b27]/40 font-light">•</span>

        <div>
          <div className={`text-3xl sm:text-4xl font-luxury font-bold ${accentColor}`}>
            {timeLeft.minutes}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-[#8b6508]/80 font-telugu mt-1">
            నిమిషాలు
          </div>
        </div>

        <span className="text-xl text-[#c59b27]/40 font-light">•</span>

        <div>
          <div className={`text-3xl sm:text-4xl font-luxury font-bold ${accentColor}`}>
            {timeLeft.seconds}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-[#8b6508]/80 font-telugu mt-1">
            సెకన్లు
          </div>
        </div>
      </div>
    </div>
  );
}
