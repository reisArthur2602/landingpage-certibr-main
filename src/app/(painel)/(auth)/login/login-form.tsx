'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { usePainel } from '@/lib/painel/store';

export default function LoginForm() {
    const router = useRouter();
    const { login } = usePainel();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email || !password) { setError('Preencha e-mail e senha.'); return; }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 300));
        const ok = login(email.trim().toLowerCase(), password);
        setLoading(false);
        if (ok) {
            router.replace('/leads');
        } else {
            setError('E-mail ou senha incorretos.');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-brand-950 px-4">
            <div className="w-full max-w-sm">
                <div className="mb-8 text-center">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 shadow-xl shadow-brand-900/40">
                        <ShieldCheck size={32} className="text-white" />
                    </span>
                    <h1 className="mt-4 text-2xl font-bold text-white">
                        certi<span className="text-brand-400">BR</span> Painel
                    </h1>
                    <p className="mt-1 text-sm text-slate-400">Acesso exclusivo para consultores</p>
                </div>

                <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    {error && (
                        <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-900/30 px-4 py-3 text-sm text-red-300">
                            <AlertCircle size={16} className="shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">E-mail</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@certibr.com.br"
                                autoComplete="email"
                                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-brand-500 focus:bg-white/15"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-300">Senha</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPass ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 pr-11 text-sm text-white placeholder-slate-500 outline-none transition focus:border-brand-500 focus:bg-white/15"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass((p) => !p)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                                >
                                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-6 w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-900/30 transition hover:bg-brand-700 disabled:opacity-60"
                    >
                        {loading ? 'Entrando...' : 'Entrar no painel'}
                    </button>

                    <div className="mt-4 rounded-xl bg-slate-800/50 p-3 text-xs text-slate-400">
                        <p className="font-semibold text-slate-300 mb-1">Contas de demonstração:</p>
                        <p>admin@certibr.com.br / admin123</p>
                        <p>ana@certibr.com.br / ana123</p>
                    </div>
                </form>
            </div>
        </div>
    );
}
