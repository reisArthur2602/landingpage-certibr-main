'use client';

import { Menu, Plus } from 'lucide-react';
import Link from 'next/link';

interface Props {
    title: string;
    onMenuClick: () => void;
    action?: { label: string; href: string };
}

export default function Topbar({ title, onMenuClick, action }: Props) {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
                >
                    <Menu size={22} />
                </button>
                <h1 className="text-lg font-bold text-slate-900">{title}</h1>
            </div>
            {action && (
                <Link
                    href={action.href}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
                >
                    <Plus size={16} />
                    {action.label}
                </Link>
            )}
        </header>
    );
}
