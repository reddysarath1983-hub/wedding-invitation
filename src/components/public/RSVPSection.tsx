"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Heart, User, Users, Send } from "lucide-react";

interface RSVPSectionProps {
  slug?: string;
  groomName: string;
  brideName: string;
}

export function RSVPSection({ slug, groomName, brideName }: RSVPSectionProps) {
  const [status, setStatus] = useState<"attending" | "maybe" | "declined" | null>(null);
  const [name, setName] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [submitted, setSubmitted] = useState(false);

  const storageKey = `pellipatrika_rsvp_${slug || "default"}`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          setStatus(parsed.status);
          setName(parsed.name || "");
          setGuestCount(parsed.guestCount || "1");
          setSubmitted(true);
        }
      } catch {}
    }
  }, [storageKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!status) return;

    const rsvpData = {
      status,
      name,
      guestCount,
      timestamp: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(storageKey, JSON.stringify(rsvpData));
      } catch {}
    }

    setSubmitted(true);
  };

  return (
    <section className="mx-6 my-8 p-6 rounded-3xl bg-gradient-to-b from-[#fdfbf7] via-[#fbf7ef] to-[#f5efe6] border border-[#c59b27]/40 shadow-md text-center font-telugu">
      <div className="w-12 h-12 rounded-full bg-[#58121a]/10 border border-[#c59b27]/40 flex items-center justify-center mx-auto mb-3 text-[#58121a]">
        <Heart className="w-6 h-6 fill-[#58121a]" />
      </div>

      <h3 className="text-xl font-bold text-[#58121a]">మీ రాకను తెలియజేయండి (RSVP)</h3>
      <p className="text-xs text-[#8b6508] mt-1 mb-6">
        మా వివాహ మహోత్సవానికి మీ ఆత్మీయ సమక్షం ఎంతో అమూల్యం.
      </p>

      {submitted ? (
        <div className="p-6 rounded-2xl bg-white border border-[#c59b27]/30 shadow-xs space-y-3 animate-reveal-up">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-300">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-[#58121a]">మీ స్పందనకు ధన్యవాదాలు! ❤️</h4>
          <p className="text-xs text-[#4a2e1b]">
            {status === "attending" && `మా శుభకార్యానికి మీ కుటుంబ సమేతంగా విచ్చేస్తున్నందుకు ఆనందిస్తున్నాము.`}
            {status === "maybe" && `మీరు విచ్చేయడానికి ప్రయత్నిస్తున్నందుకు సంతోషం.`}
            {status === "declined" && `మీ ఆశీస్సులు ఎల్లప్పుడూ వధూవరులకు తోడుగా ఉంటాయి.`}
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-[11px] text-[#8b6508] underline hover:text-[#58121a] transition-colors mt-2"
          >
            స్పందన మార్చండి (Edit RSVP)
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto text-left">
          {/* Status Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setStatus("attending")}
              className={`p-3 rounded-xl border text-xs font-semibold font-telugu transition-all flex items-center justify-center gap-1.5 ${
                status === "attending"
                  ? "bg-[#58121a] text-[#fdfbf7] border-[#c59b27] shadow-md scale-[1.02]"
                  : "bg-white text-[#58121a] border-[#c59b27]/30 hover:border-[#c59b27]"
              }`}
            >
              <span>నేను తప్పక వస్తాను ❤️</span>
            </button>

            <button
              type="button"
              onClick={() => setStatus("maybe")}
              className={`p-3 rounded-xl border text-xs font-semibold font-telugu transition-all flex items-center justify-center gap-1.5 ${
                status === "maybe"
                  ? "bg-[#8b6508] text-[#fdfbf7] border-[#c59b27] shadow-md scale-[1.02]"
                  : "bg-white text-[#58121a] border-[#c59b27]/30 hover:border-[#c59b27]"
              }`}
            >
              <span>రావడానికి ప్రయత్నిస్తాను</span>
            </button>

            <button
              type="button"
              onClick={() => setStatus("declined")}
              className={`p-3 rounded-xl border text-xs font-semibold font-telugu transition-all flex items-center justify-center gap-1.5 ${
                status === "declined"
                  ? "bg-slate-700 text-[#fdfbf7] border-slate-500 shadow-md scale-[1.02]"
                  : "bg-white text-[#58121a] border-[#c59b27]/30 hover:border-[#c59b27]"
              }`}
            >
              <span>ఈసారి రాలేను</span>
            </button>
          </div>

          {status && (
            <div className="space-y-3 pt-2 animate-reveal-up">
              <div>
                <label className="block text-xs font-semibold text-[#58121a] mb-1">
                  మీ పేరు (Your Name)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#c59b27] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ఉదా: వెంకట్ రావు"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#c59b27]/40 bg-white text-xs text-[#3c2415] focus:outline-none focus:border-[#58121a]"
                  />
                </div>
              </div>

              {status !== "declined" && (
                <div>
                  <label className="block text-xs font-semibold text-[#58121a] mb-1">
                    హాజరయ్యే వారి సంఖ్య (Number of Guests)
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-[#c59b27] absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#c59b27]/40 bg-white text-xs text-[#3c2415] focus:outline-none focus:border-[#58121a]"
                    >
                      <option value="1">1 వ్యక్తి (1 Person)</option>
                      <option value="2">2 వ్యక్తులు (2 Persons)</option>
                      <option value="3">3 వ్యక్తులు (3 Persons)</option>
                      <option value="4">4 వ్యక్తులు (4 Persons)</option>
                      <option value="5+">5+ కుటుంబ సమేతంగా (Family)</option>
                    </select>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#58121a] hover:bg-[#7c1a29] text-[#fdfbf7] font-semibold text-xs border border-[#c59b27]/40 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>సబ్మిట్ చేయండి (CONFIRM RSVP)</span>
              </button>
            </div>
          )}
        </form>
      )}
    </section>
  );
}
