'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/lib/hooks/useAuth';
import { loginSchema, type LoginFormValues } from '@/lib/validations/auth';
import { AuthFormField } from '@/components/auth/AuthFormField';

export default function LoginPage() {
  const { login, isLoading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    await login(values.email, values.password);
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden premium-dot-grid"
      style={{ background: 'var(--bg-main)' }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full blur-[120px] bg-indigo-500/[0.08]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl bg-cyan-500/[0.04]" />
      </div>

      <div className="w-full max-w-[400px] relative z-10 animate-text-reveal">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2 select-none mb-1">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg text-white"
              style={{
                background: 'linear-gradient(135deg, #818CF8 0%, #C084FC 50%, #22D3EE 100%)',
                boxShadow: '0 0 32px rgba(192,132,252,0.4)',
              }}
              aria-hidden
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <span className="font-bold text-2xl tracking-tight">AutoFlow</span>
          </Link>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Sign in to your workspace
          </p>
        </div>

        <div className="premium-card rounded-2xl p-8" style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.6)' }}>
          <h2 className="text-lg font-semibold mb-6 tracking-tight">Welcome back</h2>

          {error && (
            <div className="glass-alert glass-alert-error mb-5 rounded-xl" role="alert">
              <span className="text-xs">{error}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <AuthFormField
              id="login-email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              registration={register('email')}
              error={errors.email}
            />
            <AuthFormField
              id="login-password"
              label="Password"
              type="password"
              placeholder="Your password"
              autoComplete="current-password"
              registration={register('password')}
              error={errors.password}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full font-semibold rounded-xl px-4 py-3.5 text-sm transition-all duration-200 mt-2 active:scale-95 disabled:opacity-50 text-white"
              style={{
                background: 'linear-gradient(135deg, #818CF8 0%, #C084FC 50%, #22D3EE 100%)',
                boxShadow: isLoading ? 'none' : '0 0 24px rgba(192,132,252,0.35)',
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In ->'}
            </button>
          </form>

          <p className="text-center text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-[var(--text-secondary)] hover:text-indigo-400">
              Sign up for free
            </Link>
          </p>
        </div>

        <p className="text-center text-[10px] mt-4" style={{ color: 'var(--text-muted)' }}>
          Secured • Meta-approved • No spam
        </p>
      </div>
    </div>
  );
}
