"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  fetchDashboardStats, fetchInvitations, publishInvitation, unpublishInvitation, 
  duplicateInvitation, deleteInvitation, logout, isAuthenticated 
} from "@/lib/api";
import { InvitationData, DashboardStats } from "@/types/invitation";
import { formatDate, getCanonicalShareUrl } from "@/lib/utils";
import { 
  Plus, Edit, Copy, ExternalLink, Trash2, Eye, EyeOff, Sparkles, 
  CheckCircle2, Clock, FileText, LogOut, Loader2, RefreshCw, Check, Share2
} from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [invitations, setInvitations] = useState<InvitationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [origin, setOrigin] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [s, list] = await Promise.all([
        fetchDashboardStats(),
        fetchInvitations()
      ]);
      setStats(s);
      setInvitations(list);
    } catch (err: any) {
      if (typeof window !== "undefined" && !isAuthenticated()) {
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePublishToggle = async (inv: InvitationData) => {
    setActionId(inv.id!);
    try {
      if (inv.status === "PUBLISHED") {
        await unpublishInvitation(inv.id!);
      } else {
        await publishInvitation(inv.id!);
      }
      await loadData();
    } catch (err: any) {
      alert(err.message || "Failed to update status");
    } finally {
      setActionId(null);
    }
  };

  const handleDuplicate = async (id: string) => {
    setActionId(id);
    try {
      const newInv = await duplicateInvitation(id);
      alert(`Invitation duplicated successfully! New draft link created.`);
      await loadData();
    } catch (err: any) {
      alert(err.message || "Failed to duplicate invitation");
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id: string, coupleName: string) => {
    if (!confirm(`Are you sure you want to delete the invitation for "${coupleName}"? This action cannot be undone.`)) {
      return;
    }
    setActionId(id);
    try {
      await deleteInvitation(id);
      await loadData();
    } catch (err: any) {
      alert(err.message || "Failed to delete invitation");
    } finally {
      setActionId(null);
    }
  };

  const copyShareLink = (slug: string) => {
    const fullUrl = getCanonicalShareUrl(slug);
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  const shareViaWhatsApp = (inv: InvitationData) => {
    const fullUrl = getCanonicalShareUrl(inv.slug!);
    const formattedDate = formatDate(inv.wedding_date);
    const message = `🌸 *వివాహ ఆహ్వాన పత్రిక (Wedding Invitation)* 🌸\n\n*${inv.groom_name}* 💍 *${inv.bride_name}*\n\n📅 *తేదీ (Date):* ${formattedDate}\n📍 *స్థలం (Venue):* ${inv.venue_name}\n\nమా వివాహ మహోత్సవానికి మీ కుటుంబ సమేతంగా విచ్చేసి మమ్మల్ని ఆశీర్వదించగలరు!\n\n👇 క్రింది లింక్ ద్వారా పూర్తి డిజిటల్ ఆహ్వాన పత్రికను వీక్షించండి:\n${fullUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-100 font-telugu">పెళ్లిపత్రిక (PelliPatrika)</h1>
              <p className="text-xs text-amber-400 font-medium">Admin Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <Link
              href="/invitations/new"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create Invitation</span>
            </Link>

            <button
              onClick={logout}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-4 shadow-md">
            <div className="p-3.5 rounded-xl bg-indigo-500/20 text-indigo-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Invitations</p>
              <h3 className="text-2xl font-bold text-slate-100">{stats?.total_invitations || 0}</h3>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-4 shadow-md">
            <div className="p-3.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Published Active</p>
              <h3 className="text-2xl font-bold text-emerald-400">{stats?.published_invitations || 0}</h3>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-4 shadow-md">
            <div className="p-3.5 rounded-xl bg-amber-500/20 text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Draft Invitations</p>
              <h3 className="text-2xl font-bold text-amber-400">{stats?.draft_invitations || 0}</h3>
            </div>
          </div>
        </div>

        {/* Invitations Table Container */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h2 className="font-bold text-slate-100 text-base font-telugu">
              వివాహ ఆహ్వాన పత్రికల జాబితా (Invitations List)
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Total {invitations.length} Records
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-amber-400" />
              <span>Loading invitations...</span>
            </div>
          ) : invitations.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <p className="text-base font-telugu text-slate-300 mb-2">ఇంకా ఎటువంటి ఆహ్వాన పత్రికలు లేవు</p>
              <p className="text-xs text-slate-500 mb-6">Create your first client wedding invitation to get started.</p>
              <Link
                href="/invitations/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Invitation</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Couple Names</th>
                    <th className="px-6 py-4">Wedding Date</th>
                    <th className="px-6 py-4">Template</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Shareable Public URL</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {invitations.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-900/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-telugu font-bold text-sm text-slate-100">
                          {inv.groom_name} 💍 {inv.bride_name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          Slug: /invite/{inv.slug}
                        </div>
                      </td>

                      <td className="px-6 py-4 font-telugu text-slate-200">
                        <div>{formatDate(inv.wedding_date)}</div>
                        <div className="text-[11px] text-amber-400/80">{inv.wedding_time}</div>
                      </td>

                      <td className="px-6 py-4 capitalize font-semibold text-slate-300">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[11px]">
                          {inv.template_id}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider ${
                            inv.status === "PUBLISHED"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-mono text-slate-400">
                        {inv.status === "PUBLISHED" ? (
                          <div className="flex items-center gap-2">
                            <a
                              href={`/invite/${inv.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-amber-400 hover:underline flex items-center gap-1 font-mono text-xs max-w-[200px] truncate"
                              title={`${origin}/invite/${inv.slug}`}
                            >
                              <span>/invite/{inv.slug}</span>
                              <ExternalLink className="w-3 h-3 flex-shrink-0" />
                            </a>

                            <button
                              onClick={() => copyShareLink(inv.slug!)}
                              className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-sans flex items-center gap-1 transition-colors"
                              title="Copy Full Shareable Link"
                            >
                              {copiedSlug === inv.slug ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy Link</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => shareViaWhatsApp(inv)}
                              className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 transition-colors"
                              title="Share via WhatsApp"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-600">/invite/{inv.slug} (Draft)</span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Edit */}
                          <Link
                            href={`/invitations/${inv.id}/edit`}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 transition-colors"
                            title="Edit Invitation"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>

                          {/* Preview / View Public */}
                          <a
                            href={`/invite/${inv.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 transition-colors"
                            title="Preview Public Invitation"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </a>

                          {/* Duplicate */}
                          <button
                            onClick={() => handleDuplicate(inv.id!)}
                            disabled={actionId === inv.id}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 transition-colors disabled:opacity-50"
                            title="Duplicate Invitation"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          {/* Publish/Unpublish Toggle */}
                          <button
                            onClick={() => handlePublishToggle(inv)}
                            disabled={actionId === inv.id}
                            className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                              inv.status === "PUBLISHED"
                                ? "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                                : "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                            }`}
                            title={inv.status === "PUBLISHED" ? "Unpublish to Draft" : "Publish Publicly"}
                          >
                            {inv.status === "PUBLISHED" ? <EyeOff className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(inv.id!, `${inv.groom_name} & ${inv.bride_name}`)}
                            disabled={actionId === inv.id}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-rose-400 transition-colors disabled:opacity-50"
                            title="Delete Invitation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
