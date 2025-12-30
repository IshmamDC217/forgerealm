import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';

const envBase =
  typeof import.meta !== 'undefined' && typeof import.meta.env.PUBLIC_API_URL === 'string'
    ? import.meta.env.PUBLIC_API_URL.trim().replace(/\/$/, '')
    : '';

const envLocal =
  typeof import.meta !== 'undefined' && typeof import.meta.env.PUBLIC_API_URL_LOCAL === 'string'
    ? import.meta.env.PUBLIC_API_URL_LOCAL.trim().replace(/\/$/, '')
    : '';

// Prefer local API when running from localhost; fallback to prod base; final fallback matches backend default (8080)
const API_BASE =
  (typeof window !== 'undefined' && window.location.origin.startsWith('http://localhost')
    ? envLocal || 'http://localhost:8080'
    : envBase || envLocal || 'http://localhost:8080');

// Debug helper to log a consistent payload
const logDebug = (...args: unknown[]) => {
  console.log('[AdminLogin]', ...args);
};

type Status =
  | { type: 'idle' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }
  | { type: 'info'; message: string };

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ type: 'idle' });
  const [loading, setLoading] = useState(false);

  const hasToken = useMemo(() => Boolean(token), [token]);

  useEffect(() => {
    logDebug('mount', { API_BASE, envBase, envLocal, origin: typeof window !== 'undefined' ? window.location.origin : 'ssr' });
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('forgerealm_admin_token');
      if (stored) setToken(stored);
    }
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: 'idle' });
    setToken(null);
    logDebug('login:start', { API_BASE, origin: window?.location?.origin });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('forgerealm_admin_token');
    }
    const controller = new AbortController();
    const timeout = window.setTimeout(() => {
      controller.abort();
      logDebug('login:abort-timeout');
    }, 12000);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        signal: controller.signal,
      });

      logDebug('login:response', {
        status: res.status,
        ok: res.ok,
        url: res.url,
        type: res.type
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        logDebug('login:error-body', body);
        throw new Error(body.error || 'Login failed');
      }

      const data = await res.json();
      logDebug('login:success-body', data);
      setToken(data.token);
      if (typeof window !== 'undefined') {
        localStorage.setItem('forgerealm_admin_token', data.token);
        window.dispatchEvent(new Event('forgerealm-admin-token-changed'));
      }
      setStatus({ type: 'success', message: 'Logged in as admin' });
    } catch (err: any) {
      logDebug('login:exception', err?.message || err);
      setToken(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('forgerealm_admin_token');
        window.dispatchEvent(new Event('forgerealm-admin-token-changed'));
      }
      setStatus({ type: 'error', message: err.message || 'Login failed' });
    } finally {
      window.clearTimeout(timeout);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!token) return;
    setLoading(true);
    setStatus({ type: 'idle' });
    logDebug('logout:start', { API_BASE });
    try {
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => logDebug('logout:response', { status: res.status, ok: res.ok, url: res.url }))
        .catch((err) => logDebug('logout:error', err?.message || err));
    } finally {
      setToken(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('forgerealm_admin_token');
        window.dispatchEvent(new Event('forgerealm-admin-token-changed'));
      }
      setStatus({ type: 'info', message: 'Logged out' });
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-blue-500/10 backdrop-blur">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-400/10" />
      <div className="relative flex flex-col gap-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-200">Account Login</p>
          <h3 className="text-2xl font-semibold text-white">Sign in to ForgeRealm</h3>
          <p className="text-sm text-slate-200/80">
            Step through the gate to enter the realm and unlock the shop.
          </p>
        </div>

        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleLogin}>
          <label className="flex flex-col gap-2 text-sm text-slate-200">
            <span className="text-xs uppercase tracking-wide text-slate-300">Username</span>
            <input
              className={`w-full rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 shadow-inner focus:border-blue-400 focus:outline-none placeholder-slate-500 ${
                username ? 'text-white' : 'text-slate-400'
              }`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              autoComplete="username"
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-200">
            <span className="text-xs uppercase tracking-wide text-slate-300">Password</span>
            <input
              type="password"
              className={`w-full rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 shadow-inner focus:border-blue-400 focus:outline-none placeholder-slate-500 ${
                password ? 'text-white' : 'text-slate-400'
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              required
            />
          </label>
          <div className="md:col-span-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Working...' : hasToken ? 'Re-login' : 'Login'}
            </button>
            {hasToken && (
              <>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-slate-100 transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </form>

        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-200/90">
          <p className="flex items-center gap-2 font-semibold">
            <span
              className={`inline-flex h-2 w-2 rounded-full ${
                hasToken ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
              }`}
            />
            {hasToken ? 'Access Granted' : 'Access Closed: Awaiting Entry'}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            {hasToken
              ? 'Welcome to the Realm. Loot your favorites and browse the forge.'
              : 'Sign in to enter the ForgeRealm lobby.'}
          </p>
        </div>

        {status.type !== 'idle' && (
          <div
            className={`rounded-lg border px-4 py-3 text-sm ${
              status.type === 'success'
                ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-100'
                : status.type === 'error'
                ? 'border-red-400/40 bg-red-500/10 text-red-100'
                : 'border-blue-400/30 bg-blue-500/10 text-blue-100'
            }`}
          >
            {status.message}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminLogin;
