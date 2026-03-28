"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Mail, Lock, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { setError('Please fill in all fields.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    setError('');
    // TODO: replace with real API call: await api.post('/auth/register', { name, email, password })
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    localStorage.setItem("auth_token", "mock_token_demo");
    router.push('/dashboard');
  };

  const features = [
    "Deep analytics for all your platforms",
    "AI-powered content idea generator",
    "Smart scheduler with peak-time detection",
  ];

  return (
    <div className="flex h-screen bg-[#0c0e18] text-[#e1e1f2] overflow-hidden">
      {/* Left Column */}
      <div className="w-1/2 bg-[#151729] flex flex-col p-10 relative overflow-hidden hidden md:flex">
        <div className="absolute w-96 h-96 rounded-full bg-[#5B3FD4] opacity-10 blur-3xl top-[-50px] right-[-50px] pointer-events-none" />
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium text-white">influence.uz</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#5B3FD4]"></div>
        </div>
        {/* Headline */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-white leading-tight">Start growing.</h1>
          <p className="text-5xl font-bold text-white leading-tight">Smarter today.</p>
          {/* Features */}
          <div className="mt-10 space-y-5">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#5B3FD4]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c9bfff]" />
                </div>
                <p className="text-[#c9c4d7] text-sm leading-relaxed">{f}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Footer */}
        <p className="text-[#484554] text-xs">© 2024 influence.uz · All rights reserved</p>
      </div>

      {/* Right Column */}
      <div className="flex-1 md:w-1/2 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Create your account</h2>
            <p className="text-[#8B8FA8] text-sm">Join 2,400+ creators growing with intelligence.</p>
          </div>

          {/* Google OAuth */}
          <button
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-[#484554]/30 hover:bg-[#1d1f2b] text-sm font-semibold text-[#e1e1f2] transition-all mb-6"
            type="button"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#484554]/30" />
            <span className="text-[#484554] text-xs font-bold uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-[#484554]/30" />
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-[#ffb4ab]/10 border border-[#ffb4ab]/20 text-[#ffb4ab] text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#484554]" />
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-[#191b26] border border-[#484554]/30 rounded-xl py-3.5 pl-12 pr-4 text-sm text-[#e1e1f2] placeholder-[#484554] focus:outline-none focus:border-[#5B3FD4]/50 transition-colors"
                required
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#484554]" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#191b26] border border-[#484554]/30 rounded-xl py-3.5 pl-12 pr-4 text-sm text-[#e1e1f2] placeholder-[#484554] focus:outline-none focus:border-[#5B3FD4]/50 transition-colors"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#484554]" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password (min. 8 chars)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#191b26] border border-[#484554]/30 rounded-xl py-3.5 pl-12 pr-12 text-sm text-[#e1e1f2] placeholder-[#484554] focus:outline-none focus:border-[#5B3FD4]/50 transition-colors"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#484554] hover:text-[#8B8FA8] transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#5B3FD4] hover:bg-[#4720ca] text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-60 mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Creating account...
                </span>
              ) : "Create account →"}
            </button>
          </form>

          <p className="mt-6 text-center text-[#8B8FA8] text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-[#c9bfff] font-semibold hover:underline">Sign in</Link>
          </p>
          <p className="mt-4 text-center text-[#484554] text-xs">
            By signing up you agree to our{" "}
            <a href="#" className="hover:text-[#8B8FA8] underline">Terms</a> and{" "}
            <a href="#" className="hover:text-[#8B8FA8] underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
