'use client';

import { useMenuToggle } from '@/components/painel/menu-context';
import Topbar from '@/components/painel/topbar';
import { MESSAGE_TEMPLATES } from '@/lib/painel/messages';
import { usePainel } from '@/lib/painel/store';
import type { LeadStatus } from '@/lib/painel/types';
import {
    CERT_LABELS,
    STATUS_COLORS,
    STATUS_LABELS,
    buildWhatsAppUrl,
} from '@/lib/painel/utils';
import { GripVertical, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

const KANBAN_STATUSES: LeadStatus[] = ['novo', 'em_atendimento', 'aguardando_pagamento', 'instalado'];

export default function KanbanBoard() {
    const onMenuClick = useMenuToggle();
    const { getVisibleLeads, changeStatus, users } = usePainel();
    const leads = getVisibleLeads();

    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [overColumn, setOverColumn] = useState<LeadStatus | null>(null);
    const dragData = useRef<{ id: string; fromStatus: LeadStatus } | null>(null);

    const getUserName = (id?: string) => users.find((u) => u.id === id)?.name ?? '—';
    const leadsFor = (status: LeadStatus) => leads.filter((l) => l.status === status);

    const handleDragStart = (e: React.DragEvent, id: string, fromStatus: LeadStatus) => {
        dragData.current = { id, fromStatus };
        setDraggingId(id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent, status: LeadStatus) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setOverColumn(status);
    };

    const handleDrop = (e: React.DragEvent, toStatus: LeadStatus) => {
        e.preventDefault();
        if (!dragData.current) return;
        const { id, fromStatus } = dragData.current;
        if (fromStatus !== toStatus) changeStatus(id, toStatus);
        setDraggingId(null);
        setOverColumn(null);
        dragData.current = null;
    };

    const handleDragEnd = () => {
        setDraggingId(null);
        setOverColumn(null);
        dragData.current = null;
    };

    return (
        <div className="flex flex-col h-full">
            <Topbar
                title="Kanban"
                onMenuClick={onMenuClick}
                action={{ label: 'Novo lead', href: '/leads/novo' }}
            />
            <div className="flex-1 overflow-y-auto">
                <div className="flex h-full gap-3 p-4 sm:p-5">
                    {KANBAN_STATUSES.map((status) => {
                        const cols = STATUS_COLORS[status];
                        const columnLeads = leadsFor(status);
                        const isOver = overColumn === status;

                        return (
                            <div
                                key={status}
                                className="flex flex-1 min-w-0 flex-col"
                                onDragOver={(e) => handleDragOver(e, status)}
                                onDrop={(e) => handleDrop(e, status)}
                                onDragLeave={() => setOverColumn(null)}
                            >
                                <div
                                    className={`mb-2 flex items-center justify-between rounded-xl border px-3 py-2.5 ${cols.bg} ${cols.border}`}
                                >
                                    <div className="flex items-center gap-2 min-w-0">
                                        <span
                                            className={`h-2 w-2 shrink-0 rounded-full ${cols.dot}`}
                                        />
                                        <span
                                            className={`text-xs font-semibold truncate ${cols.text}`}
                                        >
                                            {STATUS_LABELS[status]}
                                        </span>
                                    </div>
                                    <span
                                        className={`rounded-full px-2 py-0.5 text-xs font-bold ${cols.text}`}
                                    >
                                        {columnLeads.length}
                                    </span>
                                </div>

                                <div
                                    className={`flex-1 space-y-2 rounded-2xl p-1.5 transition-colors ${
                                        isOver
                                            ? 'bg-brand-50 ring-2 ring-brand-300 ring-dashed'
                                            : ''
                                    }`}
                                >
                                    {columnLeads.length === 0 && (
                                        <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-slate-200 py-10 text-xs text-slate-400">
                                            Arraste aqui
                                        </div>
                                    )}
                                    {columnLeads.map((lead) => {
                                        const isDragging = draggingId === lead.id;
                                        return (
                                            <div
                                                key={lead.id}
                                                draggable
                                                onDragStart={(e) =>
                                                    handleDragStart(e, lead.id, status)
                                                }
                                                onDragEnd={handleDragEnd}
                                                className={`rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all ${
                                                    isDragging
                                                        ? 'opacity-50 scale-95 cursor-grabbing'
                                                        : 'cursor-grab hover:shadow-md'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between gap-1 mb-2">
                                                    <Link
                                                        href={`/leads/${lead.id}`}
                                                        className="text-sm font-semibold text-slate-900 hover:text-brand-700 transition leading-tight"
                                                        onClick={(e) =>
                                                            isDragging && e.preventDefault()
                                                        }
                                                    >
                                                        {lead.name}
                                                    </Link>
                                                    <GripVertical
                                                        size={14}
                                                        className="shrink-0 mt-0.5 text-slate-300"
                                                    />
                                                </div>
                                                <p className="text-xs text-slate-500 mb-2">
                                                    {CERT_LABELS[lead.certificateType]}
                                                </p>
                                                <div className="flex items-center justify-end gap-2">
                                                    <a
                                                        href={buildWhatsAppUrl(
                                                            lead.whatsapp,
                                                            MESSAGE_TEMPLATES.initial(lead.name)
                                                        )}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        draggable={false}
                                                        className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <MessageCircle size={12} />
                                                    </a>
                                                </div>
                                                {lead.assignedToId && (
                                                    <p className="mt-2 text-xs text-slate-400 truncate">
                                                        {getUserName(lead.assignedToId)}
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
