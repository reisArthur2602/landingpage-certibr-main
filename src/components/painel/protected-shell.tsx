'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { usePainel } from '@/lib/painel/store';
import Sidebar from './sidebar';
import { MenuContext } from './menu-context';

export default function ProtectedShell({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { currentUser } = usePainel();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (currentUser === null) {
            const stored = localStorage.getItem('certibr_painel_user');
            if (!stored) router.replace('/login');
        }
    }, [currentUser, router]);

    if (!currentUser) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
            </div>
        );
    }

    return (
        <MenuContext.Provider value={() => setSidebarOpen(true)}>
            <div className="flex h-screen overflow-hidden bg-slate-50">
                <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <div className="flex flex-1 flex-col overflow-hidden">
                    <main className="flex-1 overflow-y-auto">{children}</main>
                </div>
            </div>
        </MenuContext.Provider>
    );
}
