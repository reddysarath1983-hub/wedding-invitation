"use client";

import { EventItem } from "@/types/invitation";
import { Plus, Trash2, Calendar, Clock, MapPin, AlignLeft, MoveUp, MoveDown } from "lucide-react";

interface EventsEditorProps {
  events: EventItem[];
  onChange: (events: EventItem[]) => void;
}

const QUICK_EVENTS = [
  { title: "పెళ్లికూతురు చేయడం (Pellikuthuru)", defaultTime: "09:00 AM" },
  { title: "మెహందీ & సంగీత్ (Mehendi & Sangeet)", defaultTime: "06:00 PM" },
  { title: "మాంగల్య ధారణ వివాహ మహోత్సవం (Wedding)", defaultTime: "10:30 AM" },
  { title: "వివాహ విందు (Grand Reception)", defaultTime: "07:00 PM" },
];

export function EventsEditor({ events, onChange }: EventsEditorProps) {
  const addEvent = (customTitle?: string, defaultTime?: string) => {
    const newEvent: EventItem = {
      title: customTitle || "నూతన శుభకార్యం (New Event)",
      date: new Date().toISOString().split("T")[0],
      time: defaultTime || "10:00 AM",
      venue: "కళ్యాణ మంటపం",
      description: "",
      display_order: events.length + 1
    };
    onChange([...events, newEvent]);
  };

  const updateEvent = (index: number, field: keyof EventItem, value: any) => {
    const updated = [...events];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeEvent = (index: number) => {
    const updated = events.filter((_, i) => i !== index);
    onChange(updated);
  };

  const moveEvent = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === events.length - 1)) return;
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const updated = [...events];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Quick Add Suggestions */}
      <div className="flex flex-wrap items-center gap-2 mb-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
        <span className="text-xs font-semibold text-amber-400 font-telugu">త్వరిత చేరిక (Quick Add):</span>
        {QUICK_EVENTS.map((q, i) => (
          <button
            key={i}
            type="button"
            onClick={() => addEvent(q.title, q.defaultTime)}
            className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-telugu border border-amber-500/30 transition-colors flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>{q.title.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {events.length === 0 ? (
        <div className="text-center p-6 rounded-xl border border-dashed border-slate-800 text-slate-400 text-sm">
          No events added yet. Click &quot;Add Event&quot; below to add wedding functions.
        </div>
      ) : (
        events.map((ev, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 relative group">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-semibold text-amber-400">Event #{idx + 1}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveEvent(idx, "up")}
                  disabled={idx === 0}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 disabled:opacity-30"
                  title="Move Up"
                >
                  <MoveUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveEvent(idx, "down")}
                  disabled={idx === events.length - 1}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 disabled:opacity-30"
                  title="Move Down"
                >
                  <MoveDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => removeEvent(idx)}
                  className="p-1 rounded hover:bg-rose-500/20 text-rose-400"
                  title="Delete Event"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-300 font-telugu mb-1">కార్యక్రమ నామం (Title)</label>
                <input
                  type="text"
                  value={ev.title}
                  onChange={(e) => updateEvent(idx, "title", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-100 font-telugu focus:outline-none focus:border-amber-500"
                  placeholder="e.g. మాంగల్య ధారణ"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={ev.date}
                    onChange={(e) => updateEvent(idx, "date", e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Time</label>
                  <input
                    type="text"
                    value={ev.time}
                    onChange={(e) => updateEvent(idx, "time", e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    placeholder="10:30 AM"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-300 font-telugu mb-1">స్థలం (Venue)</label>
              <input
                type="text"
                value={ev.venue}
                onChange={(e) => updateEvent(idx, "venue", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-100 font-telugu focus:outline-none focus:border-amber-500"
                placeholder="e.g. శ్రీ వెంకటేశ్వర కళ్యాణ మంటపం"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 font-telugu mb-1">వివరాలు (Description - Optional)</label>
              <input
                type="text"
                value={ev.description || ""}
                onChange={(e) => updateEvent(idx, "description", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 font-telugu focus:outline-none focus:border-amber-500"
                placeholder="e.g. శుభ సుముహూర్తమున లగ్న పత్రిక ప్రకారం"
              />
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        onClick={() => addEvent()}
        className="w-full py-2.5 rounded-xl border border-dashed border-amber-500/40 text-amber-300 hover:bg-amber-500/10 font-telugu text-sm font-medium transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        <span>మరొక శుభకార్యం జోడించండి (Add Event)</span>
      </button>
    </div>
  );
}
