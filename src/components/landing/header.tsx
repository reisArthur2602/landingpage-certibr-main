'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShieldCheck, MessageCircle } from 'lucide-react';
import { NAV_LINKS, WHATSAPP_URL } from './site-config';

const Header = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-brand-700/95 backdrop-blur-md shadow-lg shadow-brand-900/20'
                    : 'border-b border-transparent bg-transparent'
            }`}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
                <Link
                    href="#inicio"
                    className={`flex items-center gap-2 font-bold transition-colors ${
                        scrolled ? 'text-white' : 'text-brand-800'
                    }`}
                >
                    <span
                        className={`grid h-9 w-9 place-items-center rounded-xl text-white shadow-sm transition-colors ${
                            scrolled ? 'bg-white/20' : 'bg-brand-600 shadow-brand-600/30'
                        }`}
                    >
                        <ShieldCheck size={20} />
                    </span>
                    <span className="text-xl tracking-tight">
                        certi
                        <span className={scrolled ? 'text-brand-200' : 'text-brand-600'}>BR</span>
                    </span>
                </Link>

                <nav className="hidden items-center gap-8 lg:flex">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors ${
                                scrolled
                                    ? 'text-white/90 hover:text-white'
                                    : 'text-slate-600 hover:text-brand-700'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 lg:flex">
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                            scrolled
                                ? 'bg-white text-brand-700 shadow-md hover:bg-brand-50'
                                : 'bg-brand-600 text-white shadow-md shadow-brand-600/25 hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/30'
                        }`}
                    >
                        <MessageCircle size={17} />
                        Falar com especialista
                    </a>
                </div>

                <button
                    type="button"
                    aria-label="Abrir menu"
                    onClick={() => setOpen((v) => !v)}
                    className={`grid h-10 w-10 place-items-center rounded-lg transition-colors lg:hidden ${
                        scrolled ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-brand-50'
                    }`}
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {open && (
                <div
                    className={`border-t px-5 pb-6 pt-2 lg:hidden ${
                        scrolled ? 'border-white/10 bg-brand-700' : 'border-brand-100 bg-white'
                    }`}
                >
                    <nav className="flex flex-col">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className={`border-b py-3 text-sm font-medium ${
                                    scrolled
                                        ? 'border-white/10 text-white/90'
                                        : 'border-slate-100 text-slate-700'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${
                            scrolled ? 'bg-white text-brand-700' : 'bg-brand-600 text-white'
                        }`}
                    >
                        <MessageCircle size={17} />
                        Falar com especialista
                    </a>
                </div>
            )}
        </header>
    );
};

export default Header;
