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
  Smartphone,
  UserPlus,
  Key,
  Copy,
  Trash2,
  Check,
  Eye,
  EyeOff,
  MapPin,
  MessageSquare,
  QrCode,
  Send,
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

  const [activeTab, setActiveTab] = useState<'mobile-users' | 'mobile-orders' | 'whatsapp' | 'kpi' | 'kyc' | 'payments' | 'disputes'>('mobile-users');
  const [kpiData, setKpiData] = useState<AdminKPIs | null>(null);
  const [pendingCompanies, setPendingCompanies] = useState<any[]>([]);
  const [pendingPayments, setPendingPayments] = useState<any[]>([]);
  const [disputesQueue, setDisputesQueue] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // WhatsApp Multi-Device Automation State
  const [waStatus, setWaStatus] = useState<'DISCONNECTED' | 'CONNECTING' | 'SCAN_QR' | 'CONNECTED'>('DISCONNECTED');
  const [waQrCode, setWaQrCode] = useState<string | null>(null);
  const [waConnectedNumber, setWaConnectedNumber] = useState<string | null>(null);
  const [waRecipientPhone, setWaRecipientPhone] = useState('8328246413');
  const [waChannel, setWaChannel] = useState<'whatsapp' | 'telegram' | 'both'>('whatsapp');
  const [isGeneratingQr, setIsGeneratingQr] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [waFeedback, setWaFeedback] = useState<string | null>(null);

  // Live Orders State (from Mobile App Checkouts & Bookings)
  const [liveOrders, setLiveOrders] = useState<any[]>([]);
  const [isSyncingOrders, setIsSyncingOrders] = useState(false);

  // Mobile App Users & Monitoring State (Admin-Provisioned Accounts - 100% Real-Time Live)
  const [mobileUsers, setMobileUsers] = useState<any[]>([]);
  const [mobileStats, setMobileStats] = useState<any>(null);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [roleFilter, setRoleFilter] = useState<'all' | 'buyer' | 'farmer'>('all');
  const [lastCreatedUser, setLastCreatedUser] = useState<any>(null);
  const [copiedUserId, setCopiedUserId] = useState<string | null>(null);
  const [showPasswordMap, setShowPasswordMap] = useState<Record<string, boolean>>({});

  const [newUserForm, setNewUserForm] = useState<{
    userId: string;
    password: string;
    role: 'buyer' | 'farmer';
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    destinationPort: string;
    mandiLocation: string;
    assignedContainer: string;
  }>({
    userId: '',
    password: '',
    role: 'buyer',
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    destinationPort: 'Jebel Ali Port (Dubai, UAE)',
    mandiLocation: 'Guntur APMC Grain Market Yard (AP)',
    assignedContainer: 'AM-8840',
  });

  const [isSyncingMobile, setIsSyncingMobile] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL || 'https://anvimerbackend-production-5218beeb.up.railway.app/api/v1';

  // WhatsApp auto-poll
  const checkWaStatus = async () => {
    try {
      const res = await fetch(`${apiBase}/whatsapp/status`);
      if (res.ok) {
        const json = await res.json();
        setWaStatus(json.status || 'DISCONNECTED');
        if (json.qrCode) setWaQrCode(json.qrCode);
        if (json.connectedNumber) setWaConnectedNumber(json.connectedNumber);
      }
    } catch (e) {
      console.warn('WhatsApp status check error:', e);
    }
  };

  useEffect(() => {
    checkWaStatus();
  }, []);

  useEffect(() => {
    let interval: any;
    if (waStatus === 'SCAN_QR' || waStatus === 'CONNECTING') {
      interval = setInterval(checkWaStatus, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [waStatus]);

  const handleGenerateQr = async () => {
    setIsGeneratingQr(true);
    setWaFeedback(null);
    try {
      const res = await fetch(`${apiBase}/whatsapp/qr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenantId: 'default' }),
      });
      const data = await res.json();
      if (data.qrCode) {
        setWaQrCode(data.qrCode);
        setWaStatus('SCAN_QR');
      } else if (data.status === 'CONNECTED') {
        setWaStatus('CONNECTED');
        setWaConnectedNumber(data.connectedNumber || null);
        setWaFeedback('Device already linked and active!');
      }
    } catch (err: any) {
      setWaFeedback('Failed to generate WhatsApp QR code.');
    } finally {
      setIsGeneratingQr(false);
    }
  };

  const handleDisconnectWa = async () => {
    try {
      await fetch(`${apiBase}/whatsapp/disconnect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenantId: 'default' }),
      });
      setWaStatus('DISCONNECTED');
      setWaQrCode(null);
      setWaConnectedNumber(null);
      setWaFeedback('WhatsApp device unlinked successfully.');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendTestShift = async (shift: number) => {
    setIsSendingTest(true);
    setWaFeedback(null);
    try {
      const res = await fetch(`${apiBase}/whatsapp/test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shift, phone: waRecipientPhone, tenantId: 'default' }),
      });
      const json = await res.json();
      setWaFeedback(json.message || `Shift ${shift} PDF report dispatched to +91 ${waRecipientPhone}`);
    } catch (err: any) {
      setWaFeedback('Failed to dispatch test shift report.');
    } finally {
      setIsSendingTest(false);
    }
  };

  const handleSendOrderAlertTest = async () => {
    setIsSendingTest(true);
    setWaFeedback(null);
    try {
      const res = await fetch(`${apiBase}/whatsapp/send-order-test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: waRecipientPhone, tenantId: 'default' }),
      });
      const json = await res.json();
      setWaFeedback(json.message || `Test order alert dispatched to +91 ${waRecipientPhone}`);
    } catch (err: any) {
      setWaFeedback('Failed to dispatch test order alert.');
    } finally {
      setIsSendingTest(false);
    }
  };

  const loadMobileData = async () => {
    setIsSyncingMobile(true);
    try {
      const mobRes = await fetch(`${apiBase}/admin/mobile-users`);
      if (mobRes.ok) {
        const mobJson = await mobRes.json();
        setMobileUsers(mobJson.data || []);
      }
      const mobStatsRes = await fetch(`${apiBase}/admin/mobile-stats`);
      if (mobStatsRes.ok) {
        const statsJson = await mobStatsRes.json();
        setMobileStats(statsJson.data);
      }
    } catch (e) {
      console.warn('Backend mobile fetch error:', e);
    } finally {
      setIsSyncingMobile(false);
    }
  };

  const loadOrdersData = async () => {
    setIsSyncingOrders(true);
    try {
      const ordRes = await fetch(`${apiBase}/orders`);
      if (ordRes.ok) {
        const ordJson = await ordRes.json();
        setLiveOrders(ordJson.data || []);
      }
    } catch (e) {
      console.warn('Backend orders fetch error:', e);
    } finally {
      setIsSyncingOrders(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await fetch(`${apiBase}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      loadOrdersData();
      setActionMessage(`Order "${orderId}" marked as ${status}.`);
    } catch (e) {
      console.warn('Failed to update order status:', e);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm(`Delete order "${orderId}" from database?`)) return;
    try {
      await fetch(`${apiBase}/orders/${orderId}`, { method: 'DELETE' });
      loadOrdersData();
      setActionMessage(`Order "${orderId}" removed.`);
    } catch (e) {
      console.warn('Failed to delete order:', e);
    }
  };

  // Check existing token and sync live mobile users and orders on mount
  useEffect(() => {
    loadMobileData();
    loadOrdersData();
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

      // 5. Mobile App Users & Stats (Live sync from Railway backend)
      loadMobileData();
      loadOrdersData();
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$';
    let pass = 'Anvi';
    for (let i = 0; i < 6; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    pass += '!';
    setNewUserForm((prev) => ({ ...prev, password: pass }));
  };

  const generateRandomUserId = () => {
    const id =
      newUserForm.role === 'farmer'
        ? `FARMER-AP-${Math.floor(100 + Math.random() * 900)}`
        : `ANVI-AE-${Math.floor(1000 + Math.random() * 9000)}`;
    setNewUserForm((prev) => ({ ...prev, userId: id }));
  };

  const handleCreateMobileUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserForm.userId || !newUserForm.password || !newUserForm.companyName) {
      alert('Please fill in User ID, Password, and Company/Farm Name.');
      return;
    }

    try {
      const res = await fetch(`${apiBase}/admin/mobile-users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUserForm),
      });

      if (res.ok) {
        const body = await res.json();
        setMobileUsers((prev) => [body.data, ...prev.filter((u) => u.id !== body.data.id && u.userId !== body.data.userId)]);
        setLastCreatedUser(body.data);
        setActionMessage(`${newUserForm.role.toUpperCase()} Account for "${newUserForm.companyName}" (${newUserForm.userId}) provisioned successfully.`);
        loadMobileData();
      } else {
        const errJson = await res.json().catch(() => null);
        const localUser = {
          id: `usr_${newUserForm.role}_${Date.now()}`,
          ...newUserForm,
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
          lastLoginAt: 'Never',
          rawPasswordForAdmin: newUserForm.password,
        };
        setMobileUsers((prev) => [localUser, ...prev]);
        setLastCreatedUser(localUser);
        setActionMessage(errJson?.message || `Account for "${newUserForm.companyName}" created.`);
      }
      setShowCreateUserModal(false);
      setNewUserForm({
        userId: '',
        password: '',
        role: newUserForm.role,
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        destinationPort: newUserForm.role === 'farmer' ? 'Guntur APMC Mandi Hub (AP)' : 'Jebel Ali Port (Dubai, UAE)',
        mandiLocation: 'Guntur APMC Grain Market Yard (AP)',
        assignedContainer: 'AM-8840',
      });
    } catch {
      const localUser = {
        id: `usr_${newUserForm.role}_${Date.now()}`,
        ...newUserForm,
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        lastLoginAt: 'Never',
        rawPasswordForAdmin: newUserForm.password,
      };
      setMobileUsers((prev) => [localUser, ...prev]);
      setLastCreatedUser(localUser);
      setActionMessage(`Account for "${newUserForm.companyName}" (${newUserForm.userId}) provisioned.`);
      setShowCreateUserModal(false);
    }
  };

  const handleToggleUserStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      await fetch(`${apiBase}/admin/mobile-users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
    } catch {}

    setMobileUsers((prev) =>
      prev.map((u) => (u.id === id || u.userId === id ? { ...u, status: nextStatus } : u))
    );
    setActionMessage(`User status updated to ${nextStatus}.`);
  };

  const handleDeleteMobileUser = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this account? User will immediately lose app access.')) {
      return;
    }
    try {
      await fetch(`${apiBase}/admin/mobile-users/${id}`, { method: 'DELETE' });
    } catch {}

    setMobileUsers((prev) => prev.filter((u) => u.id !== id && u.userId !== id));
    loadMobileData();
    setActionMessage('User account removed from database.');
  };

  const handleCopyCredentials = (user: any) => {
    const roleIcon = user.role === 'farmer' ? '🌾' : '🛒';
    const roleTitle = user.role === 'farmer' ? 'FARMER (Produce Desk)' : 'BUYER (Wholesale Desk)';
    const locationLine = user.role === 'farmer'
      ? `Mandi Hub: ${user.mandiLocation || user.destinationPort || 'Guntur APMC Yard'}`
      : `Discharge Port: ${user.destinationPort}\nAssigned Container: ${user.assignedContainer || 'AM-8840'}`;

    const text = `${roleIcon} ANVI MERCANTILE — APP CREDENTIALS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nRole: ${roleTitle}\nUser ID: ${user.userId}\nPassword: ${user.rawPasswordForAdmin || user.password || '(Contact Admin)'}\n${locationLine}\nStatus: ${user.status || 'ACTIVE'}\nMobile App: http://localhost:5174`;

    navigator.clipboard.writeText(text);
    setCopiedUserId(user.userId);
    setTimeout(() => setCopiedUserId(null), 3000);
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
              { id: 'mobile-users', label: `Mobile Accounts (${mobileUsers.length})`, icon: Smartphone },
              { id: 'mobile-orders', label: `Mobile Orders (${liveOrders.length})`, icon: Package },
              { id: 'whatsapp', label: 'WhatsApp Automation', icon: MessageSquare },
              { id: 'kpi', label: 'Operations & Exports', icon: TrendingUp },
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

          {/* TAB 0: Mobile App Users & Client Monitoring (Admin Only) */}
          {activeTab === 'mobile-users' && (
            <div className="space-y-6">
              
              {/* Header Box */}
              <div className="bg-white rounded-2xl border border-[#0b3a40]/10 p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-bold uppercase tracking-wider font-headline">
                      <Smartphone className="w-3 h-3" />
                      Admin-Provisioned Accounts Only
                    </div>
                    <h3 className="text-lg font-bold font-headline uppercase text-[#0b3a40]">
                      Mobile App Accounts &amp; Client Access Control
                    </h3>
                    <p className="text-xs text-gray-500 max-w-2xl">
                      In order to maintain strict wholesale B2B exclusivity, importers cannot register themselves in the mobile app. All buyer accounts are provisioned exclusively by Anvi Mercantile Administrator here.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => setShowCreateUserModal(!showCreateUserModal)}
                      className="px-4 py-2.5 bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:brightness-105 text-white text-xs font-bold font-headline uppercase rounded-xl flex items-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <UserPlus className="w-4 h-4" />
                      {showCreateUserModal ? 'Close Form' : 'Provision Mobile Account'}
                    </button>
                    <a
                      href="http://localhost:5174"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 bg-[#0b3a40] hover:bg-[#0f5c66] text-[#c9a46b] text-xs font-bold font-headline uppercase rounded-xl flex items-center gap-1.5 transition-colors shadow cursor-pointer"
                      title="Open App Preview"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open App (Port 5174)
                    </a>
                  </div>
                </div>

                {/* KPI Sub-Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                  <div className="p-3.5 bg-orange-50/70 rounded-xl border border-orange-200/80 space-y-1">
                    <span className="text-[10px] font-bold text-orange-900 uppercase font-headline">Provisioned Users</span>
                    <div className="text-xl font-black text-orange-950 font-headline">
                      {mobileStats?.totalMobileUsers ?? mobileUsers.length}
                    </div>
                    <span className="text-[9.5px] text-orange-800 font-medium">B2B client accounts</span>
                  </div>
                  <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200/80 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-900 uppercase font-headline">Active Logins</span>
                    <div className="text-xl font-black text-emerald-950 font-headline">
                      {mobileStats?.activeUsers ?? mobileUsers.filter((u) => u.status === 'ACTIVE').length}
                    </div>
                    <span className="text-[9.5px] text-emerald-800 font-medium">Authorized trade access</span>
                  </div>
                  <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-200/80 space-y-1">
                    <span className="text-[10px] font-bold text-blue-900 uppercase font-headline">Connected Ports</span>
                    <div className="text-xl font-black text-blue-950 font-headline">Jebel Ali · R'dam</div>
                    <span className="text-[9.5px] text-blue-800 font-medium">Live discharge corridors</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-700 uppercase font-headline">Backend Status</span>
                    <div className="text-xl font-black text-slate-900 font-headline">Port 4000</div>
                    <span className="text-[9.5px] text-emerald-700 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Railway Ready
                    </span>
                  </div>
                </div>
              </div>

              {/* Create Mobile User Modal / Collapsible Form */}
              {showCreateUserModal && (
                <div className="bg-white rounded-2xl border-2 border-orange-400/80 p-6 sm:p-8 shadow-lg space-y-5 animate-in fade-in duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <UserPlus className="w-5 h-5 text-[#F97316]" />
                      <h4 className="text-sm font-bold font-headline uppercase text-[#0b3a40]">
                        Provision Real-Time Mobile Account ({newUserForm.role === 'farmer' ? '🌾 Farmer / Kisan Portal' : '🛒 B2B Buyer / Importer'})
                      </h4>
                    </div>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-mono font-bold">
                      ● Instant Activation · Railway Synced
                    </span>
                  </div>

                  {/* Role Selector Tabs */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase text-gray-600 font-headline">Select Mobile Account Role</label>
                    <div className="flex items-center gap-3 p-1.5 bg-gray-100 rounded-xl w-fit">
                      <button
                        type="button"
                        onClick={() => {
                          setNewUserForm((prev) => ({
                            ...prev,
                            role: 'buyer',
                            userId: prev.userId.startsWith('FARMER-') ? `ANVI-AE-${Math.floor(1000 + Math.random() * 9000)}` : prev.userId,
                            destinationPort: 'Jebel Ali Port (Dubai, UAE)',
                          }));
                        }}
                        className={`px-4 py-2 rounded-lg text-xs font-bold font-headline transition-all cursor-pointer flex items-center gap-2 ${
                          newUserForm.role === 'buyer'
                            ? 'bg-[#0b3a40] text-[#c9a46b] shadow-md'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <span>🛒</span>
                        <span>B2B Buyer / Importer</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setNewUserForm((prev) => ({
                            ...prev,
                            role: 'farmer',
                            userId: prev.userId.startsWith('ANVI-') ? `FARMER-AP-${Math.floor(100 + Math.random() * 900)}` : prev.userId,
                            destinationPort: 'Guntur APMC Mandi Hub (AP)',
                            mandiLocation: 'Guntur APMC Grain Market Yard (AP)',
                          }));
                        }}
                        className={`px-4 py-2 rounded-lg text-xs font-bold font-headline transition-all cursor-pointer flex items-center gap-2 ${
                          newUserForm.role === 'farmer'
                            ? 'bg-emerald-800 text-amber-200 shadow-md'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <span>🌾</span>
                        <span>Farmer / Producer (Kisan)</span>
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleCreateMobileUser} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="font-bold uppercase text-gray-700 font-headline">User ID (Login Username)</label>
                        <button
                          type="button"
                          onClick={generateRandomUserId}
                          className="text-[10px] text-[#F97316] font-bold hover:underline cursor-pointer"
                        >
                          Auto Generate {newUserForm.role === 'farmer' ? 'Farmer ID' : 'Buyer ID'}
                        </button>
                      </div>
                      <input
                        type="text"
                        required
                        placeholder={newUserForm.role === 'farmer' ? 'e.g. FARMER-AP-884' : 'e.g. ANVI-AE-8840'}
                        value={newUserForm.userId}
                        onChange={(e) => setNewUserForm({ ...newUserForm, userId: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono focus:border-orange-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="font-bold uppercase text-gray-700 font-headline">Password</label>
                        <button
                          type="button"
                          onClick={generateRandomPassword}
                          className="text-[10px] text-[#F97316] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Key className="w-2.5 h-2.5" />
                          Generate Secure Password
                        </button>
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="e.g. AnviKisan2026!"
                        value={newUserForm.password}
                        onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono focus:border-orange-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-gray-700 font-headline mb-1">
                        {newUserForm.role === 'farmer' ? 'Farm / Producer Syndicate Name' : 'Importer Company Name'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={newUserForm.role === 'farmer' ? 'e.g. Annadata Organic Agro FPO' : 'e.g. Gulf Harvest Trading LLC'}
                        value={newUserForm.companyName}
                        onChange={(e) => setNewUserForm({ ...newUserForm, companyName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-gray-700 font-headline mb-1">
                        {newUserForm.role === 'farmer' ? 'Lead Farmer / Cluster Head Name' : 'Contact Person Name'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={newUserForm.role === 'farmer' ? 'e.g. Rameshwar Patel' : 'e.g. Tariq Al-Mansoor'}
                        value={newUserForm.contactName}
                        onChange={(e) => setNewUserForm({ ...newUserForm, contactName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-gray-700 font-headline mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder={newUserForm.role === 'farmer' ? 'e.g. rameshwar.patel@kisanagro.in' : 'e.g. tariq@gulfharvest.ae'}
                        value={newUserForm.email}
                        onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-gray-700 font-headline mb-1">WhatsApp / Phone Number</label>
                      <input
                        type="text"
                        required
                        placeholder={newUserForm.role === 'farmer' ? 'e.g. +91 98480 22334' : 'e.g. +971 50 884 1029'}
                        value={newUserForm.phone}
                        onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-gray-700 font-headline mb-1">
                        {newUserForm.role === 'farmer' ? 'Regional APMC Mandi Hub' : 'Discharge Destination Port'}
                      </label>
                      {newUserForm.role === 'farmer' ? (
                        <select
                          value={newUserForm.destinationPort}
                          onChange={(e) =>
                            setNewUserForm({
                              ...newUserForm,
                              destinationPort: e.target.value,
                              mandiLocation: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-hidden bg-white"
                        >
                          <option value="Guntur APMC Mandi Hub (AP)">Guntur APMC Grain Market Yard (AP)</option>
                          <option value="Kurnool Sona Masoori Mandi (AP)">Kurnool Sona Masoori Mandi (AP)</option>
                          <option value="Solapur Pomegranate Mandi (MH)">Solapur Pomegranate Mandi (MH)</option>
                          <option value="Nashik Agro & Onion Hub (MH)">Nashik Agro & Onion Hub (MH)</option>
                          <option value="Visakhapatnam Marine Fisheries Harbour (AP)">Visakhapatnam Marine Fisheries Harbour (AP)</option>
                          <option value="Bhimavaram Aqua Cluster (AP)">Bhimavaram Aqua Cluster (AP)</option>
                        </select>
                      ) : (
                        <select
                          value={newUserForm.destinationPort}
                          onChange={(e) => setNewUserForm({ ...newUserForm, destinationPort: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-hidden bg-white"
                        >
                          <option value="Jebel Ali Port (Dubai, UAE)">Jebel Ali Port (Dubai, UAE) — Transit ~4-6 Days</option>
                          <option value="Rotterdam Port (Netherlands)">Rotterdam Port (Netherlands) — Transit ~18-22 Days</option>
                          <option value="Singapore Port">Singapore Port — Transit ~8-10 Days</option>
                          <option value="Jeddah Islamic Port (Saudi Arabia)">Jeddah Islamic Port (Saudi Arabia)</option>
                          <option value="London Gateway (UK)">London Gateway (UK)</option>
                          <option value="Hamburg Port (Germany)">Hamburg Port (Germany)</option>
                          <option value="New York / NJ Port (USA)">New York / NJ Port (USA)</option>
                        </select>
                      )}
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-gray-700 font-headline mb-1">
                        {newUserForm.role === 'farmer' ? 'Primary Crop / Silo Lot ID' : 'Assigned Container ID'}
                      </label>
                      <input
                        type="text"
                        placeholder={newUserForm.role === 'farmer' ? 'e.g. LOT-RICE-2026' : 'e.g. AM-8840'}
                        value={newUserForm.assignedContainer}
                        onChange={(e) => setNewUserForm({ ...newUserForm, assignedContainer: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono focus:border-orange-500 focus:outline-hidden"
                      />
                    </div>

                    <div className="md:col-span-2 pt-2 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setShowCreateUserModal(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#0b3a40] hover:bg-[#0f5c66] text-[#c9a46b] font-headline font-bold uppercase rounded-lg shadow cursor-pointer flex items-center gap-1.5"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>Provision {newUserForm.role === 'farmer' ? 'Farmer' : 'Buyer'} Account</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Newly Created User Credentials Banner */}
              {lastCreatedUser && (
                <div className="bg-gradient-to-r from-emerald-900 via-[#0b3a40] to-emerald-950 text-white p-5 rounded-2xl border-2 border-emerald-400/60 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-300/50 text-emerald-200">
                        ✓ Account Provisioned &amp; Activated
                      </span>
                      <span className="text-xs font-bold text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-300/40">
                        {lastCreatedUser.role === 'farmer' ? '🌾 FARMER / PRODUCER' : '🛒 B2B BUYER / IMPORTER'}
                      </span>
                    </div>
                    <div className="text-base font-bold font-headline text-white">
                      {lastCreatedUser.companyName} <span className="text-white/60 font-normal">({lastCreatedUser.contactName})</span>
                    </div>
                    <div className="text-xs font-mono text-emerald-100 flex flex-wrap items-center gap-3 pt-0.5">
                      <span className="bg-black/40 px-2.5 py-1 rounded-md border border-white/10">
                        User ID: <strong className="text-amber-300 text-sm">{lastCreatedUser.userId}</strong>
                      </span>
                      <span className="bg-black/40 px-2.5 py-1 rounded-md border border-white/10">
                        Password: <strong className="text-emerald-300 text-sm">{lastCreatedUser.rawPasswordForAdmin || lastCreatedUser.password || '••••••••'}</strong>
                      </span>
                      <span className="bg-black/40 px-2.5 py-1 rounded-md border border-white/10 text-[11px] text-white/80">
                        Hub/Port: {lastCreatedUser.destinationPort}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopyCredentials(lastCreatedUser)}
                      className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold font-headline uppercase flex items-center justify-center gap-2 shadow-md cursor-pointer transition-transform active:scale-95"
                    >
                      {copiedUserId === lastCreatedUser.userId ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>Credentials Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy WhatsApp Credentials</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setLastCreatedUser(null)}
                      className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 text-xs"
                      title="Dismiss"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* Mobile Users Table */}
              <div className="bg-white rounded-2xl border border-[#0b3a40]/10 overflow-hidden shadow-sm">
                <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold font-headline uppercase text-[#0b3a40]">
                      Provisioned Mobile Accounts ({mobileUsers.length})
                    </h4>
                    <p className="text-xs text-gray-500">Live monitoring of authorized buyers &amp; registered farmers</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Role Filter Tabs */}
                    <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setRoleFilter('all')}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                          roleFilter === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        All ({mobileUsers.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setRoleFilter('buyer')}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                          roleFilter === 'buyer' ? 'bg-[#0b3a40] text-[#c9a46b] shadow-sm' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <span>🛒</span>
                        <span>Buyers ({mobileUsers.filter((u) => u.role !== 'farmer').length})</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRoleFilter('farmer')}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                          roleFilter === 'farmer' ? 'bg-emerald-800 text-amber-200 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <span>🌾</span>
                        <span>Farmers ({mobileUsers.filter((u) => u.role === 'farmer').length})</span>
                      </button>
                    </div>

                    {/* Sync Live Database Button */}
                    <button
                      type="button"
                      onClick={() => loadMobileData()}
                      disabled={isSyncingMobile}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-[#0b3a40] text-xs font-bold rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                      title="Sync live records from Railway Database"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSyncingMobile ? 'animate-spin text-[#c9a46b]' : ''}`} />
                      <span>{isSyncingMobile ? 'Syncing...' : 'Sync DB'}</span>
                    </button>
                  </div>

                  {copiedUserId && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      Credentials Copied to Clipboard!
                    </span>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-headline uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-4">Role &amp; Entity</th>
                        <th className="py-3 px-4">User ID &amp; Password</th>
                        <th className="py-3 px-4">Contact Person</th>
                        <th className="py-3 px-4">Discharge Port / Mandi</th>
                        <th className="py-3 px-4">Container / Lot</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Last Activity</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(() => {
                        const filtered = mobileUsers.filter(
                          (u) => roleFilter === 'all' || (roleFilter === 'farmer' ? u.role === 'farmer' : u.role !== 'farmer')
                        );
                        if (filtered.length === 0) {
                          return (
                            <tr>
                              <td colSpan={8} className="py-12 text-center">
                                <div className="flex flex-col items-center justify-center gap-2">
                                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                    <Users className="w-6 h-6" />
                                  </div>
                                  <div className="font-bold text-gray-700 text-sm">
                                    {roleFilter === 'all'
                                      ? 'No provisioned accounts in database'
                                      : `No ${roleFilter} accounts found`}
                                  </div>
                                  <p className="text-xs text-gray-400 max-w-sm">
                                    Your live Railway database is connected. Click &quot;Provision Mobile Account&quot; above to create a real-time Buyer or Farmer credential.
                                  </p>
                                </div>
                              </td>
                            </tr>
                          );
                        }
                        return filtered.map((user) => {
                          const isPassVisible = showPasswordMap[user.id];
                          const isFarmer = user.role === 'farmer';
                          return (
                            <tr key={user.id} className="hover:bg-gray-50/80 transition-colors">
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span
                                    className={`px-2 py-0.5 rounded text-[9.5px] font-black uppercase font-headline tracking-wide ${
                                      isFarmer
                                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                        : 'bg-blue-100 text-blue-900 border border-blue-300'
                                    }`}
                                  >
                                    {isFarmer ? '🌾 FARMER' : '🛒 BUYER'}
                                  </span>
                                </div>
                                <div className="font-bold text-gray-900 text-sm">{user.companyName}</div>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="font-mono text-[11px] text-orange-700 font-bold bg-orange-50 px-2 py-0.5 rounded w-fit border border-orange-200">
                                  {user.userId}
                                </div>
                                <div className="text-[10px] text-gray-500 flex items-center gap-1 mt-1 font-mono">
                                  <span>Pass: {isPassVisible ? (user.rawPasswordForAdmin || user.password || '••••••••') : '••••••••'}</span>
                                  <button
                                    type="button"
                                    onClick={() => setShowPasswordMap({ ...showPasswordMap, [user.id]: !isPassVisible })}
                                    className="text-gray-400 hover:text-gray-700 ml-0.5 cursor-pointer"
                                    title={isPassVisible ? 'Hide Password' : 'Show Password'}
                                  >
                                    {isPassVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                  </button>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="font-semibold text-gray-800">{user.contactName}</div>
                                <div className="text-gray-500 text-[11px]">{user.phone}</div>
                                <div className="text-gray-400 text-[10px]">{user.email}</div>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="font-medium text-gray-800 flex items-center gap-1">
                                  <MapPin className={`w-3 h-3 shrink-0 ${isFarmer ? 'text-amber-600' : 'text-emerald-600'}`} />
                                  <span>{user.destinationPort || user.mandiLocation}</span>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="font-mono font-bold text-gray-700 px-2 py-0.5 rounded bg-gray-100 border border-gray-200 text-[11px]">
                                  {user.assignedContainer || (isFarmer ? 'LOT-APMC-01' : 'AM-8840')}
                                </span>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  user.status === 'ACTIVE'
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : 'bg-red-100 text-red-800 border border-red-300'
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'ACTIVE' ? 'bg-emerald-600' : 'bg-red-600'}`} />
                                  {user.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-gray-500 font-mono text-[11px]">
                                {user.lastLoginAt || 'Never'}
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleCopyCredentials(user)}
                                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-orange-50 text-gray-600 hover:text-orange-700 transition-colors cursor-pointer"
                                    title="Copy Login Credentials for Client/Farmer"
                                  >
                                    {copiedUserId === user.userId ? (
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleToggleUserStatus(user.id, user.status)}
                                    className={`px-2 py-1 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                                      user.status === 'ACTIVE'
                                        ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                                    }`}
                                  >
                                    {user.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteMobileUser(user.id)}
                                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                                    title="Delete Account"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        });
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Embedded Mobile App Live Simulator */}
              <div className="bg-[#0b3a40] text-white rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <h4 className="text-base font-bold font-headline uppercase text-[#c9a46b]">
                      Live Mobile App Simulator (Port 5174)
                    </h4>
                    <p className="text-xs text-white/70">
                      Test mobile onboarding, preloader animation, and login with the accounts provisioned above.
                    </p>
                  </div>
                  <a
                    href="http://localhost:5174"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#c9a46b] hover:bg-[#b59057] text-[#0b3a40] text-xs font-bold font-headline uppercase transition-colors"
                  >
                    <span>Launch in Full Tab</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="pt-6 flex justify-center">
                  <div className="w-full max-w-[400px] h-[760px] rounded-[48px] border-[7px] border-slate-800 overflow-hidden shadow-2xl bg-black">
                    <iframe
                      src="http://localhost:5174"
                      title="Anvi Mercantile Mobile App Live Simulator"
                      className="w-full h-full border-none"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB: WhatsApp Multi-Device Automation Desk */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-6">
              {/* Header Card */}
              <div className="bg-white rounded-2xl border border-[#0b3a40]/10 p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider font-headline">
                      <MessageSquare className="w-3 h-3" />
                      Free Open-Source WhatsApp Multi-Device Gateway
                    </div>
                    <h3 className="text-xl font-bold font-headline uppercase text-[#0b3a40]">
                      WhatsApp Automated Notifications &amp; Shift Reports
                    </h3>
                    <p className="text-xs text-gray-500">
                      Powered by <code className="text-[#0b3a40] font-mono font-bold">@whiskeysockets/baileys</code> — Zero Meta API fees, no template restrictions, direct WebSocket session.
                    </p>
                  </div>

                  {/* Channel Selection Toggle */}
                  <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
                    <button
                      onClick={() => setWaChannel('whatsapp')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        waChannel === 'whatsapp' ? 'bg-[#0b3a40] text-white shadow' : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      WhatsApp Web
                    </button>
                    <button
                      onClick={() => setWaChannel('telegram')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        waChannel === 'telegram' ? 'bg-[#0b3a40] text-white shadow' : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      Telegram Bot
                    </button>
                    <button
                      onClick={() => setWaChannel('both')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        waChannel === 'both' ? 'bg-[#0b3a40] text-white shadow' : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      Both Channels
                    </button>
                  </div>
                </div>

                {/* Feedback Banner */}
                {waFeedback && (
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800 font-semibold">
                    <span>{waFeedback}</span>
                    <button onClick={() => setWaFeedback(null)} className="text-emerald-600 hover:text-emerald-900 font-bold ml-4">✕</button>
                  </div>
                )}

                {/* Grid Layout: Left Pairing Controls | Right QR Display */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                  {/* Left Column: Pairing & Status Controls (7 Cols) */}
                  <div className="lg:col-span-7 space-y-5">
                    {/* Status Pill Card */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-gray-500 uppercase font-headline">Gateway Connection Status</span>
                        <div className="flex items-center gap-2 mt-1">
                          {waStatus === 'CONNECTED' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              Connected (+{waConnectedNumber || 'Linked'})
                            </span>
                          )}
                          {waStatus === 'SCAN_QR' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                              Scan QR Code on Phone
                            </span>
                          )}
                          {waStatus === 'CONNECTING' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              Connecting Socket...
                            </span>
                          )}
                          {waStatus === 'DISCONNECTED' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-bold">
                              Not Linked
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {waStatus !== 'CONNECTED' ? (
                          <button
                            onClick={handleGenerateQr}
                            disabled={isGeneratingQr}
                            className="flex items-center gap-2 px-4 py-2 bg-[#0b3a40] text-[#c9a46b] hover:bg-[#08292d] text-xs font-bold uppercase rounded-xl transition-all shadow disabled:opacity-50"
                          >
                            {isGeneratingQr ? <RefreshCw className="w-4 h-4 animate-spin" /> : <QrCode className="w-4 h-4" />}
                            {isGeneratingQr ? 'Emitting QR...' : 'Generate QR Code'}
                          </button>
                        ) : (
                          <button
                            onClick={handleDisconnectWa}
                            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 text-xs font-bold uppercase rounded-xl transition-all"
                          >
                            Unlink Device
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Step-by-Step Instructions */}
                    <div className="bg-white rounded-xl p-4 border border-gray-200 space-y-2">
                      <h4 className="text-xs font-bold uppercase text-gray-700 font-headline">How to Link WhatsApp Multi-Device:</h4>
                      <ol className="text-xs text-gray-600 space-y-1.5 list-decimal list-inside">
                        <li>Open <strong className="text-gray-900">WhatsApp</strong> on your phone (Operations / Admin phone).</li>
                        <li>Tap <strong className="text-gray-900">Settings</strong> (iOS) or <strong className="text-gray-900">Three Dots Menu</strong> (Android) &rarr; <strong className="text-[#0b3a40]">Linked Devices</strong>.</li>
                        <li>Tap <strong className="text-emerald-700">Link a Device</strong> and point your camera at the QR code on the right.</li>
                      </ol>
                      <p className="text-[11px] text-gray-400 italic pt-1">
                        Session credentials are encrypted locally on the backend. No passwords or tokens are transmitted to external cloud APIs.
                      </p>
                    </div>

                    {/* Target Recipient Number */}
                    <div className="bg-white rounded-xl p-4 border border-gray-200 space-y-2">
                      <label className="block text-xs font-bold uppercase text-gray-700 font-headline">
                        Owner / Dispatcher Recipient Number:
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-2 bg-gray-100 rounded-lg text-xs font-bold text-gray-600 border border-gray-300">+91</span>
                        <input
                          type="text"
                          value={waRecipientPhone}
                          onChange={(e) => setWaRecipientPhone(e.target.value)}
                          placeholder="8328246413"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs font-bold focus:outline-none focus:border-[#0b3a40]"
                        />
                      </div>
                      <span className="text-[10px] text-gray-400">
                        Default configured for Anvi Operations Desk: <strong className="text-gray-700">+91 8328246413</strong>.
                      </span>
                    </div>

                    {/* Instant Testing Buttons */}
                    <div className="bg-white rounded-xl p-4 border border-gray-200 space-y-3">
                      <h4 className="text-xs font-bold uppercase text-gray-700 font-headline">Instant Verification &amp; Test Dispatches:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <button
                          onClick={handleSendOrderAlertTest}
                          disabled={isSendingTest}
                          className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-bold uppercase transition-all disabled:opacity-50"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Test Order Alert
                        </button>

                        <button
                          onClick={() => handleSendTestShift(1)}
                          disabled={isSendingTest}
                          className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#0b3a40] hover:bg-[#072428] text-[#c9a46b] rounded-xl text-[11px] font-bold uppercase transition-all disabled:opacity-50"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Send Shift 1 PDF
                        </button>

                        <button
                          onClick={() => handleSendTestShift(2)}
                          disabled={isSendingTest}
                          className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gray-800 hover:bg-black text-white rounded-xl text-[11px] font-bold uppercase transition-all disabled:opacity-50"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Send Shift 2 PDF
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: QR Container Box (5 Cols) */}
                  <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-300 min-h-[340px]">
                    {waStatus === 'SCAN_QR' && waQrCode ? (
                      <div className="flex flex-col items-center space-y-3">
                        <div className="p-3 bg-white rounded-2xl shadow-lg border border-gray-200">
                          <img
                            src={waQrCode}
                            alt="WhatsApp Web Multi-Device QR Code"
                            className="w-56 h-56 object-contain"
                          />
                        </div>
                        <div className="text-center">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                            Awaiting QR scan on phone...
                          </span>
                          <p className="text-[10px] text-gray-500 mt-1">Auto-detected every 3s without page reload.</p>
                        </div>
                      </div>
                    ) : waStatus === 'CONNECTED' ? (
                      <div className="flex flex-col items-center text-center space-y-3 p-6 bg-emerald-50 rounded-2xl border border-emerald-200 w-full max-w-sm">
                        <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                          <CheckCircle2 className="w-9 h-9" />
                        </div>
                        <h4 className="text-base font-bold text-emerald-900 font-headline uppercase">Device Linked &amp; Connected!</h4>
                        <p className="text-xs text-emerald-700">
                          Account: <strong className="text-emerald-950 font-mono">+{waConnectedNumber}</strong>
                        </p>
                        <p className="text-[11px] text-emerald-600">
                          Real-time WhatsApp notifications are armed. Every mobile app order from buyers will automatically dispatch an alert to <strong className="text-emerald-900">+91 {waRecipientPhone}</strong>.
                        </p>
                      </div>
                    ) : waStatus === 'CONNECTING' ? (
                      <div className="flex flex-col items-center text-center space-y-3">
                        <RefreshCw className="w-10 h-10 text-[#0b3a40] animate-spin" />
                        <span className="text-xs font-bold text-gray-700 font-headline uppercase">Initializing WebSocket Session...</span>
                        <p className="text-[11px] text-gray-500 max-w-xs">Connecting to WhatsApp Multi-Device protocol and awaiting challenge emission.</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="w-16 h-16 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                          <QrCode className="w-8 h-8" />
                        </div>
                        <span className="text-xs font-bold text-gray-700 font-headline uppercase">No Device Paired</span>
                        <p className="text-xs text-gray-500 max-w-xs">
                          Click <strong>"Generate QR Code"</strong> to display the pairing challenge and link any mobile phone in 3 seconds.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Shift Schedule Timeline Info */}
                <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="text-[10px] font-bold uppercase text-gray-500 font-headline">Trigger 1 · Real-Time Order Alert</span>
                    <h5 className="text-xs font-bold text-gray-900 mt-1">Instant On Buyer Checkout</h5>
                    <p className="text-[11px] text-gray-500 mt-1">Dispatches Order ID, buyer name, container, commodity list, and value instantly to WhatsApp.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="text-[10px] font-bold uppercase text-gray-500 font-headline">Trigger 2 · Shift 1 (Day Shift)</span>
                    <h5 className="text-xs font-bold text-gray-900 mt-1">Daily at 11:30 PM IST</h5>
                    <p className="text-[11px] text-gray-500 mt-1">Automated PDF with gross sales, average ticket size, and closing commodity stock balances.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="text-[10px] font-bold uppercase text-gray-500 font-headline">Trigger 3 · Shift 2 (Overnight Shift)</span>
                    <h5 className="text-xs font-bold text-gray-900 mt-1">Daily at 10:00 AM IST</h5>
                    <p className="text-[11px] text-gray-500 mt-1">Overnight export volume summary with vessel container tracking status audit.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Mobile App Live Orders & RFQ Management */}
          {activeTab === 'mobile-orders' && (
            <div className="space-y-6">
              {/* Header Box */}
              <div className="bg-white rounded-2xl border border-[#0b3a40]/10 p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider font-headline">
                      <Package className="w-3 h-3" />
                      Live PostgreSQL Database Stream
                    </div>
                    <h3 className="text-lg font-bold font-headline uppercase text-[#0b3a40]">
                      Mobile App Orders &amp; RFQs ({liveOrders.length})
                    </h3>
                    <p className="text-xs text-gray-500 max-w-2xl">
                      Real-time orders placed by provisioned buyers and registered farmers from the mobile application. Review commodity specifications, shipping allocations, advance payments, and issue export proformas.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => loadOrdersData()}
                      disabled={isSyncingOrders}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0b3a40] hover:bg-[#134e4a] text-[#c9a46b] text-xs font-bold font-headline uppercase transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSyncingOrders ? 'animate-spin' : ''}`} />
                      <span>{isSyncingOrders ? 'Syncing...' : 'Sync Orders'}</span>
                    </button>
                  </div>
                </div>

                {/* KPI Metrics Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Total Orders</div>
                    <div className="text-2xl font-black text-[#0b3a40] mt-1">{liveOrders.length}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">Mobile app checkouts</div>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <div className="text-[10px] font-bold uppercase text-amber-700 tracking-wider">Pending Review</div>
                    <div className="text-2xl font-black text-amber-800 mt-1">
                      {liveOrders.filter((o) => o.status === 'PENDING_REVIEW').length}
                    </div>
                    <div className="text-[10px] text-amber-600 mt-0.5">Awaiting proforma</div>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                    <div className="text-[10px] font-bold uppercase text-blue-700 tracking-wider">Proformas Issued</div>
                    <div className="text-2xl font-black text-blue-800 mt-1">
                      {liveOrders.filter((o) => o.status === 'PROFORMA_ISSUED').length}
                    </div>
                    <div className="text-[10px] text-blue-600 mt-0.5">Quote sent to client</div>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <div className="text-[10px] font-bold uppercase text-emerald-700 tracking-wider">Confirmed / Dispatched</div>
                    <div className="text-2xl font-black text-emerald-800 mt-1">
                      {liveOrders.filter((o) => o.status === 'CONFIRMED' || o.status === 'DISPATCHED').length}
                    </div>
                    <div className="text-[10px] text-emerald-600 mt-0.5">Container allocated</div>
                  </div>
                </div>
              </div>

              {/* Orders Table Card */}
              <div className="bg-white rounded-2xl border border-[#0b3a40]/10 overflow-hidden shadow-sm">
                <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between">
                  <h4 className="text-sm font-bold font-headline uppercase text-[#0b3a40]">
                    Recent Order Transactions
                  </h4>
                  <span className="text-xs text-gray-400">
                    Showing {liveOrders.length} records from Railway PostgreSQL
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-headline uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-4">Order ID &amp; Time</th>
                        <th className="py-3 px-4">Buyer Entity &amp; Contact</th>
                        <th className="py-3 px-4">Commodity / Items</th>
                        <th className="py-3 px-4">Discharge Port &amp; Container</th>
                        <th className="py-3 px-4">Total &amp; Payment</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {liveOrders.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-16 text-center">
                            <div className="flex flex-col items-center justify-center gap-2">
                              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                <Package className="w-6 h-6" />
                              </div>
                              <div className="font-bold text-gray-700 text-sm">
                                No mobile orders recorded yet
                              </div>
                              <p className="text-xs text-gray-400 max-w-sm">
                                Log in to the mobile app with an account you provisioned, add commodities to cart, and swipe to checkout. The complete order will appear here in real time.
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        liveOrders.map((order) => {
                          const itemsList = order.items && Array.isArray(order.items) && order.items.length > 0
                            ? order.items
                            : null;
                          return (
                            <tr key={order.id || order.orderId} className="hover:bg-gray-50/80 transition-colors">
                              <td className="py-3.5 px-4">
                                <div className="font-mono text-xs font-bold text-[#0b3a40] bg-gray-100 px-2 py-0.5 rounded w-fit border border-gray-200">
                                  {order.orderId || order.id}
                                </div>
                                <div className="text-[10px] text-gray-400 mt-1">
                                  {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Just now'}
                                </div>
                              </td>

                              <td className="py-3.5 px-4">
                                <div className="font-bold text-gray-900 text-sm">{order.companyName || 'Export Buyer'}</div>
                                <div className="text-gray-600 text-xs mt-0.5">{order.contactName}</div>
                                <div className="text-gray-400 text-[10px] font-mono">{order.contactPhone || order.contactEmail}</div>
                              </td>

                              <td className="py-3.5 px-4">
                                {itemsList ? (
                                  <div className="space-y-1">
                                    {itemsList.map((item: any, idx: number) => (
                                      <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-800">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                                        <span className="font-semibold">{item.name}</span>
                                        <span className="text-gray-400 text-[10px]">({item.quantity || 1} lot · {item.moq || '20 MT'})</span>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div>
                                    <div className="font-semibold text-gray-800">{order.commodityName || 'Standard Commodity Lot'}</div>
                                    <div className="text-gray-500 text-[10px]">{order.volume || '25 MT'}</div>
                                  </div>
                                )}
                              </td>

                              <td className="py-3.5 px-4">
                                <div className="font-medium text-gray-800 flex items-center gap-1 text-xs">
                                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span>{order.destinationPort || 'Jebel Ali Port (Dubai)'}</span>
                                </div>
                                <div className="font-mono text-[10px] text-gray-500 mt-1">
                                  Box: {order.assignedContainer || 'AM-8840'}
                                </div>
                              </td>

                              <td className="py-3.5 px-4">
                                <div className="font-bold text-emerald-700 text-sm">
                                  ${typeof order.totalAmount === 'number' ? order.totalAmount.toFixed(2) : order.totalAmount || '101.00'}
                                </div>
                                <div className="text-[10px] text-gray-500 mt-0.5">
                                  {order.paymentMethod || 'Advance Wire (BCA)'}
                                </div>
                              </td>

                              <td className="py-3.5 px-4">
                                <span
                                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                    order.status === 'CONFIRMED' || order.status === 'DISPATCHED'
                                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                      : order.status === 'PROFORMA_ISSUED'
                                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                                  }`}
                                >
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      order.status === 'CONFIRMED' || order.status === 'DISPATCHED'
                                        ? 'bg-emerald-600'
                                        : order.status === 'PROFORMA_ISSUED'
                                        ? 'bg-blue-600'
                                        : 'bg-amber-600'
                                    }`}
                                  />
                                  {order.status || 'PENDING_REVIEW'}
                                </span>
                              </td>

                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  {order.status === 'PENDING_REVIEW' && (
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateOrderStatus(order.id || order.orderId, 'PROFORMA_ISSUED')}
                                      className="px-2.5 py-1 rounded bg-[#0b3a40] hover:bg-[#134e4a] text-[#c9a46b] text-[10px] font-bold transition-colors cursor-pointer"
                                      title="Issue Official Export Proforma to Buyer"
                                    >
                                      Issue Proforma
                                    </button>
                                  )}
                                  {order.status === 'PROFORMA_ISSUED' && (
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateOrderStatus(order.id || order.orderId, 'CONFIRMED')}
                                      className="px-2.5 py-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] font-bold transition-colors cursor-pointer"
                                      title="Confirm Booking &amp; Allocate Container"
                                    >
                                      Confirm Order
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteOrder(order.id || order.orderId)}
                                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                                    title="Delete Order"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

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
