'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
    Search,
    MessageCircle,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    SlidersHorizontal,
    X,
} from 'lucide-react';
import { usePainel } from '@/lib/painel/store';
import { useMenuToggle } from '@/components/painel/menu-context';
import Topbar from '@/components/painel/topbar';
import StatusBadge from '@/components/painel/status-badge';
import {
    STATUS_LABELS,
    CERT_LABELS,
    formatDate,
    buildWhatsAppUrl,
} from '@/lib/painel/utils';
import { LEAD_STATUSES } from '@/lib/painel/types';
import type { LeadStatus, CertificateType } from '@/lib/painel/types';
import { MESSAGE_TEMPLATES } from '@/lib/painel/messages';

const PAGE_SIZE = 15;

export default function LeadsTable() {
    const onMenuClick = useMenuToggle();
    const { getVisibleLeads, users } = usePainel();
    const allLeads = getVisibleLeads();

    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState<LeadStatus | ''>('');
    const [filterCert, setFilterCert] = useState<CertificateType | ''>('');
    const [filterConsultor, setFilterConsultor] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return allLeads.filter((l) => {
            if (q && !l.name.toLowerCase().includes(q) && !l.whatsapp.includes(q) && !(l.cpfCnpj ?? '').includes(q)) return false;
            if (filterStatus && l.status !== filterStatus) return false;
            if (filterCert && l.certificateType !== filterCert) return false;
            if (filterConsultor && l.assignedToId !== filterConsultor) return false;
            return true;
        });
    }, [allLeads, search, filterStatus, filterCert, filterConsultor]);

    const paginated = useMemo(
        () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        [filtered, page],
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const getUserName = (id?: string) => users.find((u) => u.id === id)?.name ?? '—';

    const clearFilters = () => {
        setSearch('');
        setFilterStatus('');
        setFilterCert('');
        setFilterConsultor('');
        setPage(1);
    };

    const hasFilters = search || filterStatus || filterCert || filterConsultor;

    return (
        <div className="flex flex-col">
            <Topbar
                title="Leads"
                onMenuClick={onMenuClick}
                action={{ label: 'Novo lead', href: '/leads/novo' }}
            />

            <div className="flex-1 p-5 sm:p-6 space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            placeholder="Buscar por nome, WhatsApp ou CPF/CNPJ…"
                            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters((v) => !v)}
                        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                            showFilters
                                ? 'border-brand-300 bg-brand-50 text-brand-700'
                                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                        <SlidersHorizontal size={16} />
                        Filtros
                        {hasFilters && <span className="h-2 w-2 rounded-full bg-brand-600" />}
                    </button>
                    {hasFilters && (
                        <button
                            onClick={clearFilters}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-500 hover:bg-slate-50"
                        >
                            <X size={14} />
                            Limpar
                        </button>
                    )}
                </div>

                {showFilters && (
                    <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-3">
                        <select
                            value={filterStatus}
                            onChange={(e) => { setFilterStatus(e.target.value as LeadStatus | ''); setPage(1); }}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-brand-400"
                        >
                            <option value="">Status: Todos</option>
                            {LEAD_STATUSES.map((s) => (
                                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                            ))}
                        </select>
                        <select
                            value={filterCert}
                            onChange={(e) => { setFilterCert(e.target.value as CertificateType | ''); setPage(1); }}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-brand-400"
                        >
                            <option value="">Certificado: Todos</option>
                            {(Object.entries(CERT_LABELS) as [CertificateType, string][]).map(([k, v]) => (
                                <option key={k} value={k}>{v}</option>
                            ))}
                        </select>
                        <select
                            value={filterConsultor}
                            onChange={(e) => { setFilterConsultor(e.target.value); setPage(1); }}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-brand-400"
                        >
                            <option value="">Consultor: Todos</option>
                            {users.filter((u) => u.active).map((u) => (
                                <option key={u.id} value={u.id}>{u.name}</option>
                            ))}
                        </select>
                    </div>
                )}

                <p className="text-sm text-slate-500">
                    {filtered.length} lead{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
                </p>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50">
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Cliente</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Certificado</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                                    <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 md:table-cell">Consultor</th>
                                    <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 lg:table-cell">Criado</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {paginated.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-sm text-slate-400">
                                            Nenhum lead encontrado para os filtros selecionados.
                                        </td>
                                    </tr>
                                )}
                                {paginated.map((lead) => {
                                    return (
                                        <tr key={lead.id} className="hover:bg-slate-50 transition">
                                            <td className="px-4 py-3">
                                                <Link href={`/leads/${lead.id}`} className="group block">
                                                    <p className="font-semibold text-slate-900 group-hover:text-brand-700 transition">{lead.name}</p>
                                                    <p className="text-xs text-slate-500">{lead.whatsapp}</p>
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-slate-700 font-medium">{CERT_LABELS[lead.certificateType]}</span>
                                                {lead.mainUse && (
                                                    <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[140px]">{lead.mainUse}</p>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <StatusBadge status={lead.status} size="sm" />
                                            </td>
                                            <td className="hidden px-4 py-3 text-slate-600 md:table-cell">
                                                {getUserName(lead.assignedToId)}
                                            </td>
                                            <td className="hidden px-4 py-3 text-slate-500 lg:table-cell">
                                                {formatDate(lead.createdAt)}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <a
                                                        href={buildWhatsAppUrl(lead.whatsapp, MESSAGE_TEMPLATES.initial(lead.name))}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        title="Abrir WhatsApp"
                                                        className="grid h-8 w-8 place-items-center rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition"
                                                    >
                                                        <MessageCircle size={15} />
                                                    </a>
                                                    <Link
                                                        href={`/leads/${lead.id}`}
                                                        title="Ver detalhes"
                                                        className="grid h-8 w-8 place-items-center rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 transition"
                                                    >
                                                        <ExternalLink size={15} />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
                            <p className="text-sm text-slate-500">Página {page} de {totalPages}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <button
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
