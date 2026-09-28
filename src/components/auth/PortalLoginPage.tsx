import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Sparkles, Lock, User, Eye, EyeOff, ShieldCheck, ArrowLeft, Settings, Check, AlertCircle, RefreshCw, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { getApiBaseUrl, setCustomApiUrl } from '../../config/api';

interface PortalLoginPageProps {
  portalType: 'therapist' | 'parent' | 'admin';
}

export const PortalLoginPage: React.FC<PortalLoginPageProps> = ({ portalType }) => {
  const { login, isLoading, error, clearError, setActivePortal } = useAuthStore();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Server connection configuration state
  const [isServerModalOpen, setIsServerModalOpen] = useState(false);
  const [serverUrlInput, setServerUrlInput] = useState('');
  const [activeServerUrl, setActiveServerUrl] = useState('');
  const [pingStatus, setPingStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [pingMessage, setPingMessage] = useState('');

  useEffect(() => {
    const current = getApiBaseUrl();
    setActiveServerUrl(current);
    setServerUrlInput(current);
    clearError();
  }, [portalType]);

  const handleTestConnection = async (testUrl?: string) => {
    const targetUrl = (testUrl !== undefined ? testUrl : serverUrlInput).trim().replace(/\/+$/, '');
    setPingStatus('testing');
    setPingMessage('Qoşulma yoxlanılır...');
    try {
      const endpoint = targetUrl ? `${targetUrl}/api/health` : '/api/health';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(endpoint, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        setPingStatus('success');
        setPingMessage('Əlaqə uğurludur! Server aktivdir.');
      } else {
        setPingStatus('error');
        setPingMessage(`Server xəta qaytardı: HTTP ${res.status}`);
      }
    } catch {
      setPingStatus('error');
      setPingMessage('Serverə qoşulmaq mümkün olmadı. Ünvanı və ya interneti yoxlayın.');
    }
  };

  const handleSaveServerUrl = () => {
    setCustomApiUrl(serverUrlInput);
    const updated = getApiBaseUrl();
    setActiveServerUrl(updated);
    setIsServerModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) return;
    await login(username.trim(), password, portalType);
  };

  const fillCredentials = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    clearError();
  };

  // Portal-specific theme configurations
  const config = {
    therapist: {
      title: 'Loqoped Portalı',
      subtitle: 'Nitq terapiyası və artikulyasiya seansları üçün giriş',
      badge: 'Loqoped Girişi',
      emoji: '🩺',
      bgGradient: 'radial-gradient(ellipse at top, #0284c7 0%, #0369a1 40%, #0c4a6e 100%)',
      btnGradient: 'from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600',
      demoUser: 'logoped',
      demoPass: 'logoped123',
    },
    parent: {
      title: 'Valideyn Portalı',
      subtitle: 'Övladınızın evdə inkişafı və əyləncəli dərsləri üçün giriş',
      badge: 'Valideyn Girişi',
      emoji: '👨‍👩‍👧‍👦',
      bgGradient: 'radial-gradient(ellipse at top, #f59e0b 0%, #d97706 40%, #7c2d12 100%)',
      btnGradient: 'from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
      demoUser: 'valideyn',
      demoPass: 'valideyn123',
    },
    admin: {
      title: 'İdarəetmə Paneli',
      subtitle: 'Sistem parametrləri, istifadəçilər və məzmun idarəetməsi',
      badge: 'Admin Girişi',
      emoji: '🛡️',
      bgGradient: 'radial-gradient(ellipse at top, #6366f1 0%, #4338ca 40%, #1e1b4b 100%)',
      btnGradient: 'from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700',
      demoUser: 'admin',
      demoPass: 'admin123',
    },
  }[portalType];

  return (
    <div
      className="min-h-screen w-full flex flex-col justify-between p-4 sm:p-6 md:p-8 relative overflow-hidden select-none"
      style={{
        background: config.bgGradient,
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-black/15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header bar */}
      <header className="relative z-10 flex items-center justify-between max-w-5xl w-full mx-auto pb-4">
        <button
          onClick={() => setActivePortal('select')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-md transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Portallara Qayıt</span>
        </button>

        <button
          onClick={() => setIsServerModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-semibold backdrop-blur-md transition-all cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Server</span>
        </button>
      </header>

      {/* Center Login Box */}
      <main className="relative z-10 max-w-md w-full mx-auto my-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/40"
        >
          {/* Logo & Portal Identity */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-3xl shadow-lg shadow-indigo-500/30">
              {config.emoji}
            </div>
            <span className="inline-block px-3 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2 border border-slate-200">
              {config.badge}
            </span>
            <h2 className="text-2xl font-black text-slate-800">{config.title}</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">{config.subtitle}</p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-semibold flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                İstifadəçi adı
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="İstifadəçi adınızı daxil edin"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm font-medium transition-all bg-slate-50/50 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Şifrə
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifrənizi daxil edin"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm font-medium transition-all bg-slate-50/50 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl bg-gradient-to-r ${config.btnGradient} text-white font-extrabold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Yoxlanılır...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Daxil ol</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials shortcut */}
          <div className="mt-5 pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400 font-semibold mb-2">Sürətli Demo Girişi:</p>
            <button
              type="button"
              onClick={() => fillCredentials(config.demoUser, config.demoPass)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{config.demoUser} / {config.demoPass}</span>
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-md w-full mx-auto pt-4 text-center text-white/70 text-xs flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-emerald-300" />
        <span>Uşaqlar üçün təhlükəsiz və qorunan mühit</span>
      </footer>

      {/* Server Config Modal */}
      <AnimatePresence>
        {isServerModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-slate-800 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-sky-500" />
                  Server Əlaqəsi
                </h3>
                <button
                  onClick={() => setIsServerModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="text-xs font-bold text-slate-600">Server URL:</label>
                  <input
                    type="text"
                    value={serverUrlInput}
                    onChange={(e) => setServerUrlInput(e.target.value)}
                    placeholder="http://192.168.1.100:3000 və ya https://domain.com"
                    className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Cari: {activeServerUrl || '(Yerli / nisbi)'}</p>
                </div>

                {pingMessage && (
                  <div
                    className={`p-2 rounded-lg text-xs font-semibold ${
                      pingStatus === 'success'
                        ? 'bg-emerald-50 text-emerald-700'
                        : pingStatus === 'error'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-sky-50 text-sky-700'
                    }`}
                  >
                    {pingMessage}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleTestConnection()}
                  className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Test et
                </button>
                <button
                  onClick={handleSaveServerUrl}
                  className="flex-1 py-2 px-3 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl cursor-pointer flex items-center justify-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  Yadda saxla
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortalLoginPage;
