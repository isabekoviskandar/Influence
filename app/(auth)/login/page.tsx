"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BarChart2, Sparkles, Diamond, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // Mock network delay
      await new Promise(r => setTimeout(r, 1000));
      // TODO: const res = await api.post('/auth/login', { email, password })
      // TODO: useUserStore.getState().setUser(res.data.user, res.data.token, res.data.plan)
      localStorage.setItem("auth_token", "mock_token_demo");
      router.push("/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#11131e] text-[#e1e1f2] overflow-hidden selection:bg-[#5b3fd4] selection:text-white">

      {/* LEFT COLUMN: Brand Panel */}
      <section className="hidden md:flex w-1/2 flex-col justify-between p-16 relative overflow-hidden bg-[#151729]">
        {/* Radial Glow Overlay */}
        <div
          className="absolute w-96 h-96 rounded-full bg-[#5B3FD4] opacity-10 blur-3xl right-[-50px] top-[-50px] pointer-events-none"
        ></div>

        {/* Top Brand Section */}
        <div className="relative z-10">
          <div className="flex items-center">
            <span className="text-lg font-medium text-white tracking-tight">influence.uz</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#5B3FD4] inline-block ml-1"></div>
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 max-w-md flex-1 flex flex-col justify-center">
          <h1 className="text-5xl font-bold leading-tight text-white tracking-tight mb-2">
            Grow smarter.
          </h1>
          <h1 className="text-5xl font-bold leading-tight text-white tracking-tight">
            Post better.
          </h1>

          <div className="mt-10 space-y-8">
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-[#5B3FD4]/10">
                <BarChart2 className="w-4 h-4 text-[#5B3FD4]" />
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-0.5">Deep Analytics</p>
                <p className="text-xs text-[#8B8FA8] leading-relaxed">Know exactly who watches and when</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-[#5B3FD4]/10">
                <Sparkles className="w-4 h-4 text-[#5B3FD4]" />
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-0.5">AI Ideas</p>
                <p className="text-xs text-[#8B8FA8] leading-relaxed">Content ideas built for your niche</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-[#5B3FD4]/10">
                <Diamond className="w-4 h-4 text-[#5B3FD4]" />
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-0.5">Brand Deals</p>
                <p className="text-xs text-[#8B8FA8] leading-relaxed">Get paid by brands that match you</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="relative z-10">
          <p className="text-xs text-[#8B8FA8]">© 2025 influence.uz</p>
        </div>
      </section>

      {/* RIGHT COLUMN: Auth Form */}
      <section className="w-full md:w-1/2 h-full flex flex-col justify-center items-center p-10 bg-[#0D0F1A]">
        <div className="w-full max-w-sm">

          {/* Header */}
          <div className="mb-8 text-left">
            <h2 className="text-2xl font-medium text-white mb-1">Welcome back</h2>
            <p className="text-sm text-[#8B8FA8]">Sign in to your account</p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[#8B8FA8]" htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full h-11 px-4 bg-[#151729] border border-[#1E2035] rounded-lg text-sm text-white placeholder:text-[#8B8FA8]/40 focus:outline-none focus:border-[#5B3FD4] transition-colors"
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-[#8B8FA8]" htmlFor="password">Password</label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full h-11 pl-4 pr-10 bg-[#151729] border border-[#1E2035] rounded-lg text-sm text-white placeholder:text-[#8B8FA8]/40 focus:outline-none focus:border-[#5B3FD4] transition-colors"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B8FA8] hover:text-[#e1e1f2] transition-colors p-1"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-right mt-1">
                <Link href="#" className="text-xs text-[#5B3FD4] hover:underline">Forgot password?</Link>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-[#E24B4A]/10 border border-[#E24B4A]/40 rounded-lg flex items-start gap-2 animate-in fade-in duration-300">
                <AlertCircle className="w-4 h-4 text-[#E24B4A] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#E24B4A]">{error}</p>
              </div>
            )}

            {/* Sign In Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-[#5B3FD4] hover:bg-[#7B61FF] text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#1E2035]"></div>
            <span className="text-xs text-[#8B8FA8] uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-[#1E2035]"></div>
          </div>

          {/* Social Login */}
          <button
            type="button"
            className="w-full h-11 flex items-center justify-center gap-2 bg-transparent border border-[#1E2035] hover:bg-[#151729] rounded-lg text-white text-sm font-medium transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          {/* Footer Link */}
          <div className="mt-8 text-center text-sm text-[#8B8FA8]">
            Don&apos;t have an account?
            <Link href="/signup" className="ml-1 text-[#5B3FD4] font-medium hover:underline">
              Create one free &rarr;
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
