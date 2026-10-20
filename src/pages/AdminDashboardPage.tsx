import { useState, useEffect } from 'react';
import { SEO } from '@/components/global/SEO';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  CreditCard,
  Users,
  TrendingUp,
  Package,
  Lock,
  LogOut,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

interface AdminKPIs {
  overview: {
    platformGmvUsd: number;
    totalVolumeMt: number;
    totalOrders: number;
    activeProducts: number;
  };
  verificationQueue: {
    pendingVerifications: number;
    verifiedExporters: number;
    totalExporters: number;
    verifiedImporters: number;
    totalImporters: number;
  };
  operations: {
    openDisputes: number;
    pendingPayments: number;
    ordersByStatus: Record<string, number>;
  };
}

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [email, setEmail] = useState('admin@anvimercantile.com');
  const [password, setPassword] = useState('AdminPass123!');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<'kpi' | 'kyc' | 'payments' | 'disputes'>('kpi');
  const [kpiData, setKpiData] = useState<AdminKPIs | null>(null);
  const [pendingCompanies, setPendingCompanies] = useState<any[]>([]);
  const [pendingPayments, setPendingPayments] = useState<any[]>([]);
  const [disputesQueue, setDisputesQueue] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

  // Check existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchMe(token);
    }
  }, []);

  const fetchMe = async (token: string) => {
    try {
      const res = await fetch(`${apiBase}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      });
      if (res.ok) {
        const body = await res.json();
        if (body.data?.user?.role === 'ADMIN') {
          setIsAuthenticated(true);
          setCurrentUser(body.data.user);
          loadAdminData(token);
        } else {
          setIsAuthenticated(false);
        }
      } else {
        localStorage.removeItem('access_token');
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body?.error?.message || 'Login failed');
      }

      if (body.data?.user?.role !== 'ADMIN') {
        throw new Error('Access denied: Administrator privileges required.');
      }

      localStorage.setItem('access_token', body.data.accessToken);
      setIsAuthenticated(true);
      setCurrentUser(body.data.user);
      loadAdminData(body.data.accessToken);
    } catch (err: any) {
      setLoginError(err.message || 'Invalid credentials');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const loadAdminData = async (token: string) => {
    setIsLoadingData(true);
    setActionMessage(null);

    try {
      // 1. KPIs
      const kpiRes = await fetch(`${apiBase}/dashboards/admin`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      });
      if (kpiRes.ok) {
        const kpiJson = await kpiRes.json();
        setKpiData(kpiJson.data);
      }

      // 2. Pending Companies
      const compRes = await fetch(`${apiBase}/admin/companies/pending`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      });
      if (compRes.ok) {
        const compJson = await compRes.json();
        setPendingCompanies(compJson.data || []);
      }

      // 3. Pending Payments
      const payRes = await fetch(`${apiBase}/payments/pending`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      });
      if (payRes.ok) {
        const payJson = await payRes.json();
        setPendingPayments(payJson.data || []);
      }

      // 4. Disputes
      const dispRes = await fetch(`${apiBase}/disputes/admin/queue`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      });
      if (dispRes.ok) {
        const dispJson = await dispRes.json();
        setDisputesQueue(dispJson.data || []);
      }
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleVerifyCompany = async (companyId: string, status: 'VERIFIED' | 'REJECTED') => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    let rejectionReason: string | undefined;
    if (status === 'REJECTED') {
      rejectionReason = window.prompt('Please provide reason for rejection:') || 'Incomplete documentation';
    }

    try {
      const res = await fetch(`${apiBase}/admin/companies/${companyId}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, rejectionReason }),
        credentials: 'include',
      });

      if (res.ok) {
        setActionMessage(`Company verification updated to ${status}.`);
        loadAdminData(token);
      } else {
        const err = await res.json();
        alert(err?.error?.message || 'Action failed');
      }
    } catch {
      alert('Network error while processing verification');
    }
  };

  const handleConfirmPayment = async (paymentId: string) => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    if (!window.confirm('Confirm receipt of bank wire and advance order status to PAID?')) {
      return;
    }

    try {
      const res = await fetch(`${apiBase}/payments/${paymentId}/confirm`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      });

      if (res.ok) {
        setActionMessage('Payment confirmed. Order status advanced to PAID.');
        loadAdminData(token);
      } else {
        const err = await res.json();
        alert(err?.error?.message || 'Payment confirmation failed');
      }
    } catch {
      alert('Network error while confirming payment');
    }
  };

  const handleResolveDispute = async (disputeId: string, decision: 'REFUNDED' | 'COMPLETED') => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    const resolution = window.prompt(`Enter resolution notes for ${decision}:`) || 'Settled via mediation';

    try {
      const res = await fetch(`${apiBase}/disputes/${disputeId}/resolve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ decision, resolution }),
        credentials: 'include',
      });

      if (res.ok) {
        setActionMessage(`Dispute resolved with decision ${decision}.`);
        loadAdminData(token);
      } else {
        const err = await res.json();
        alert(err?.error?.message || 'Dispute resolution failed');
      }
    } catch {
      alert('Network error while resolving dispute');
    }
  };

  const handleDownloadCsv = async (endpoint: 'orders' | 'payments') => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
      const res = await fetch(`${apiBase}/dashboards/admin/export/${endpoint}.csv`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Download failed');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `anvi-${endpoint}-${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err: any) {
      alert(err.message || 'Could not download CSV');
    }
  };

  // If not authenticated as Admin, show login view
  if (!isAuthenticated) {
    return (
      <>
        <SEO
          title="Admin Access | ANVI MERCANTILE"
          description="Secure administrative access for Anvi Mercantile marketplace staff."
        />
        <div className="min-h-screen pt-36 pb-20 bg-[#f7f5f0] flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-2xl border border-[#0b3a40]/10 shadow-lg p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-[#0b3a40] text-[#c9a46b] rounded-xl flex items-center justify-center mx-auto shadow">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-headline uppercase text-[#0b3a40]">
                Admin Trade Console
              </h2>
              <p className="text-xs text-gray-500">
                Authorized staff sign-in for KYC, Treasury, and Dispute oversight.
              </p>
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#0b3a40] mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#0f5c66] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#0b3a40] mb-1">
                  Master Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#0f5c66] focus:outline-none"
                />
              </div>

              <div className="p-2.5 bg-[#fbfaf8] border border-gray-100 rounded-lg text-[11px] text-gray-500 space-y-1">
                <div className="font-semibold text-gray-700">Seed Admin Credentials:</div>
                <div className="font-mono text-[10px] text-[#0f5c66]">admin@anvimercantile.com</div>
                <div className="font-mono text-[10px] text-[#0f5c66]">AdminPass123!</div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 bg-[#0b3a40] hover:bg-[#0f5c66] text-[#c9a46b] font-headline font-bold uppercase text-xs rounded-xl transition-colors shadow flex items-center justify-center gap-2"
              >
                {isLoggingIn ? (
                  'Verifying Credentials...'
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Enter Admin Portal
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  // Authenticated Admin Console View
  return (
    <>
      <SEO
        title="Admin Control Center | ANVI MERCANTILE"
        description="Comprehensive trade administration, verification queues, and treasury clearance."
      />

      <section className="pt-32 pb-20 bg-[#f7f5f0] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Top Admin Header Bar */}
          <div className="bg-[#0b3a40] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#c9a46b] text-[#0b3a40] px-2 py-0.5 rounded font-headline">
                  ANVI GROUPS HEADQUARTERS
                </span>
                <span className="text-xs text-white/70 font-mono">
                  Role: ADMIN ({currentUser?.email})
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-headline uppercase text-white tracking-tight">
                B2B EXPORT OPERATIONS DESK
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const token = localStorage.getItem('access_token');
                  if (token) loadAdminData(token);
                }}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="Refresh Live Data"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingData ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="px-3.5 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </div>

          {actionMessage && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{actionMessage}</span>
              </div>
              <button onClick={() => setActionMessage(null)} className="text-emerald-600 hover:underline">
                Dismiss
              </button>
            </div>
          )}

          {/* Quick Metrics KPI Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-5 rounded-2xl border border-[#0b3a40]/10 shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-gray-500 uppercase font-headline">Platform GMV</span>
              <div className="text-2xl font-extrabold text-[#0b3a40] font-headline">
                ${kpiData?.overview.platformGmvUsd ? kpiData.overview.platformGmvUsd.toLocaleString() : '0'}
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Live Consignment Volume
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#0b3a40]/10 shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-gray-500 uppercase font-headline">Volume Shipped</span>
              <div className="text-2xl font-extrabold text-[#0f5c66] font-headline">
                {kpiData?.overview.totalVolumeMt || 0} <span className="text-xs font-normal text-gray-500">MT</span>
              </div>
              <span className="text-[10px] text-gray-500">Bulk agro commodities</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#0b3a40]/10 shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-gray-500 uppercase font-headline">Pending KYC</span>
              <div className="text-2xl font-extrabold text-[#c9a46b] font-headline">
                {pendingCompanies.length}
              </div>
              <span className="text-[10px] text-amber-700 font-semibold">Awaiting Compliance Review</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#0b3a40]/10 shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-gray-500 uppercase font-headline">Wire Clearances</span>
              <div className="text-2xl font-extrabold text-[#0b3a40] font-headline">
                {pendingPayments.length}
              </div>
              <span className="text-[10px] text-blue-600 font-semibold">SWIFT Verification Queue</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#0b3a40]/15 gap-4 overflow-x-auto pb-2">
            {[
              { id: 'kpi', label: 'Operations & Exports', icon: Package },
              { id: 'kyc', label: `KYC Verifications (${pendingCompanies.length})`, icon: Users },
              { id: 'payments', label: `Wire Approvals (${pendingPayments.length})`, icon: CreditCard },
              { id: 'disputes', label: `Disputes (${disputesQueue.length})`, icon: AlertCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold font-headline uppercase transition-colors shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-[#0b3a40] text-[#c9a46b] shadow'
                      : 'bg-white text-gray-600 hover:text-[#0b3a40] border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* TAB 1: Operations & Export Downloads */}
          {activeTab === 'kpi' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-[#0b3a40]/10 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-bold font-headline uppercase text-[#0b3a40]">
                      Export Ledger & Audit CSV Reports
                    </h3>
                    <p className="text-xs text-gray-500">
                      Generate streaming CSV dumps for internal accounting and APEDA customs compliance.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDownloadCsv('orders')}
                      className="px-4 py-2 bg-[#0f5c66] hover:bg-[#0b3a40] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Export Orders CSV
                    </button>
                    <button
                      onClick={() => handleDownloadCsv('payments')}
                      className="px-4 py-2 bg-[#c9a46b] hover:bg-[#b59057] text-[#0b3a40] text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Export Payments CSV
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                  <div className="p-4 bg-[#fbfaf8] rounded-xl border border-gray-100 space-y-2">
                    <span className="font-bold uppercase text-gray-500 font-headline">Exporter Ecosystem</span>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span>Verified Exporters:</span>
                      <span className="font-bold text-[#0b3a40]">{kpiData?.verificationQueue.verifiedExporters || 0}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Total Registered Exporters:</span>
                      <span className="font-semibold text-gray-700">{kpiData?.verificationQueue.totalExporters || 0}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#fbfaf8] rounded-xl border border-gray-100 space-y-2">
                    <span className="font-bold uppercase text-gray-500 font-headline">Overseas Importers</span>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span>Verified Importers:</span>
                      <span className="font-bold text-[#0b3a40]">{kpiData?.verificationQueue.verifiedImporters || 0}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Total Registered Importers:</span>
                      <span className="font-semibold text-gray-700">{kpiData?.verificationQueue.totalImporters || 0}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#fbfaf8] rounded-xl border border-gray-100 space-y-2">
                    <span className="font-bold uppercase text-gray-500 font-headline">Catalog Status</span>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span>Active Commodity SKUs:</span>
                      <span className="font-bold text-[#0b3a40]">{kpiData?.overview.activeProducts || 0}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Open Trade Disputes:</span>
                      <span className="font-semibold text-red-600">{kpiData?.operations.openDisputes || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: KYC Verifications Queue */}
          {activeTab === 'kyc' && (
            <div className="bg-white rounded-2xl border border-[#0b3a40]/10 p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-base font-bold font-headline uppercase text-[#0b3a40] pb-2 border-b border-gray-100">
                Pending Exporter & Importer Company Approvals
              </h3>

              {pendingCompanies.length === 0 ? (
                <div className="py-12 text-center text-xs text-gray-500">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  All company KYC verification submissions are up to date!
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingCompanies.map((c) => (
                    <div
                      key={c.id}
                      className="p-5 rounded-xl border border-gray-200 hover:border-[#0f5c66]/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                            c.type === 'EXPORTER' ? 'bg-[#0b3a40] text-white' : 'bg-[#c9a46b] text-[#0b3a40]'
                          }`}>
                            {c.type}
                          </span>
                          <h4 className="text-sm font-bold text-[#0b3a40] font-headline">{c.legalName}</h4>
                          <span className="text-xs text-gray-500">({c.country})</span>
                        </div>
                        <div className="text-xs text-gray-600 flex flex-wrap gap-4 font-mono">
                          {c.iecCode && <span>IEC: {c.iecCode}</span>}
                          {c.gstin && <span>GSTIN: {c.gstin}</span>}
                          {c.taxIdVat && <span>VAT: {c.taxIdVat}</span>}
                          <span>User: {c.ownerUser?.email}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleVerifyCompany(c.id, 'VERIFIED')}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Approve KYC
                        </button>
                        <button
                          onClick={() => handleVerifyCompany(c.id, 'REJECTED')}
                          className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Wire Approvals Queue */}
          {activeTab === 'payments' && (
            <div className="bg-white rounded-2xl border border-[#0b3a40]/10 p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-base font-bold font-headline uppercase text-[#0b3a40] pb-2 border-b border-gray-100">
                Pending SWIFT MT103 Wire Clearances
              </h3>

              {pendingPayments.length === 0 ? (
                <div className="py-12 text-center text-xs text-gray-500">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  All submitted wire payments have been settled and confirmed.
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingPayments.map((p) => (
                    <div
                      key={p.id}
                      className="p-5 rounded-xl border border-gray-200 hover:border-[#0f5c66]/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                            {p.status}
                          </span>
                          <h4 className="text-sm font-bold text-[#0b3a40] font-headline">
                            Order #{p.order?.orderNumber}
                          </h4>
                          <span className="font-extrabold text-[#0f5c66]">
                            ${Number(p.amount).toLocaleString()} {p.currency}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 flex flex-wrap gap-4 font-mono">
                          <span>Ref: {p.referenceNo}</span>
                          <span>Method: {p.method}</span>
                          <span>Buyer: {p.order?.importerCompany?.legalName}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {p.proofDownloadUrl && (
                          <a
                            href={p.proofDownloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            View SWIFT Slip
                          </a>
                        )}
                        <button
                          onClick={() => handleConfirmPayment(p.id)}
                          className="px-4 py-2 bg-[#0b3a40] hover:bg-[#0f5c66] text-[#c9a46b] text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Confirm Wire (Mark PAID)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Disputes Queue */}
          {activeTab === 'disputes' && (
            <div className="bg-white rounded-2xl border border-[#0b3a40]/10 p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-base font-bold font-headline uppercase text-[#0b3a40] pb-2 border-b border-gray-100">
                Active Trade Disputes & Arbitration
              </h3>

              {disputesQueue.length === 0 ? (
                <div className="py-12 text-center text-xs text-gray-500">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  Zero unresolved trade disputes. All consignments in good standing.
                </div>
              ) : (
                <div className="space-y-4">
                  {disputesQueue.map((d) => (
                    <div
                      key={d.id}
                      className="p-5 rounded-xl border border-red-200 bg-red-50/20 flex flex-col md:flex-row md:items-start justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase bg-red-600 text-white px-2 py-0.5 rounded">
                            {d.status}
                          </span>
                          <h4 className="text-sm font-bold text-[#0b3a40] font-headline">
                            Order #{d.order?.orderNumber}
                          </h4>
                          <span className="text-xs text-gray-500">
                            Raised by {d.raisedByCompany?.legalName}
                          </span>
                        </div>
                        <p className="text-xs text-gray-700 max-w-2xl bg-white p-3 rounded-lg border border-red-100">
                          {d.reason}
                        </p>
                      </div>

                      {d.status === 'OPEN' && (
                        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                          <button
                            onClick={() => handleResolveDispute(d.id, 'REFUNDED')}
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors"
                          >
                            Resolve: Full Refund
                          </button>
                          <button
                            onClick={() => handleResolveDispute(d.id, 'COMPLETED')}
                            className="px-3 py-2 bg-gray-800 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors"
                          >
                            Resolve: Mark Completed
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
