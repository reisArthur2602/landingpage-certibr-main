'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Users,
    Kanban,
    ShieldCheck,
    UserCog,
    X,
    ChevronRight,
} from 'lucide-react';
import { usePainel } from '@/lib/painel/store';

const navItems = [
    { href: '/leads', label: 'Leads', icon: Users },
    { href: '/kanban', label: 'Kanban', icon: Kanban },
];

const adminItems = [
    { href: '/usuarios', label: 'Consultores', icon: UserCog },
];

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function Sidebar({ open, onClose }: Props) {
    const pathname = usePathname();
    const { currentUser, logout } = usePainel();

    const isActive = (href: string, exact?: boolean) =>
        exact ? pathname === href : pathname.startsWith(href);

    const NavLink = ({
        href,
        icon: Icon,
        label,
        exact,
    }: {
        href: string;
        icon: React.ElementType;
        label: string;
        exact?: boolean;
    }) => {
        const active = isActive(href, exact);
        return (
            <Link
                href={href}
                onClick={onClose}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    active
                        ? 'bg-brand-600 text-white shadow-sm'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
            >
                <Icon size={18} className="shrink-0" />
                {label}
                {active && <ChevronRight size={14} className="ml-auto opacity-60" />}
            </Link>
        );
    };

    return (
        <>
            {/* Mobile overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-slate-900 transition-transform duration-300 lg:static lg:translate-x-0 ${
                    open ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Logo */}
                <div className="flex h-16 shrink-0 items-center justify-between px-5 border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600">
                            <ShieldCheck size={18} className="text-white" />
                        </span>
                        <span className="text-lg font-bold text-white">
                            certi<span className="text-brand-400">BR</span>
                        </span>
                        <span className="rounded bg-brand-900 px-1.5 py-0.5 text-[10px] font-bold uppercase text-brand-300">
                            Painel
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="lg:hidden text-slate-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink key={item.href} {...item} />
                    ))}

                    {currentUser?.role === 'admin' && (
                        <>
                            <div className="my-3 border-t border-white/10" />
                            <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Administração
                            </p>
                            {adminItems.map((item) => (
                                <NavLink key={item.href} {...item} />
                            ))}
                        </>
                    )}
                </nav>

                {/* User footer */}
                <div className="border-t border-white/10 p-3">
                    <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">
                            {currentUser?.name.charAt(0)}
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-white">
                                {currentUser?.name}
                            </p>
                            <p className="truncate text-xs text-slate-400 capitalize">
                                {currentUser?.role}
                            </p>
                        </div>
                        <button
                            onClick={logout}
                            title="Sair"
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
