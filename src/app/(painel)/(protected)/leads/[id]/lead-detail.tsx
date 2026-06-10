'use client';

import type { MessageKey } from '@/lib/painel/messages';
import { MESSAGE_LABELS, MESSAGE_TEMPLATES, makeWhatsAppLink } from '@/lib/painel/messages';
import { usePainel } from '@/lib/painel/store';
import type { LostReason } from '@/lib/painel/types';
import { LEAD_STATUSES } from '@/lib/painel/types';
import {
    CERT_LABELS,
    LOST_REASON_LABELS,
    PERSON_TYPE_LABELS,
    STATUS_LABELS,
    formatDateTime,
} from '@/lib/painel/utils';
import {
    ArrowLeft,
    Calendar,
    CheckCircle2,
    ChevronDown,
    Circle,
    MessageCircle,
    RotateCcw,
    Send,
    X,
} from 'lucide-react';
import Link from 'next/link';
import { useState, type FormEvent, type ReactNode } from 'react';
import StatusBadge from '@/components/painel/status-badge';

const LOST_REASONS = Object.entries(LOST_REASON_LABELS) as [LostReason, string][];
const MSG_KEYS = Object.keys(MESSAGE_TEMPLATES) as MessageKey[];

function Card({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {title}
            </h2>
            {children}
        </div>
    );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
    return (
        <div className="flex items-start justify-between gap-2">
            <dt className="shrink-0 text-slate-500">{label}</dt>
            <dd className="text-right font-medium text-slate-800">{value ?? '—'}</dd>
        </div>
    );
}

function Modal({
    title,
    children,
    onClose,
}: {
    title: string;
    children: ReactNode;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">{title}</h3>
                    <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                        <X size={18} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default function LeadDetail({ id }: { id: string }) {
    const {
        getLead,
        changeStatus,
        markAsLost,
        reactivateLead,
        addNote,
        toggleChecklistItem,
        setFollowUp,
        users,
    } = usePainel();

    const lead = getLead(id);

    const [noteText, setNoteText] = useState('');
    const [savingNote, setSavingNote] = useState(false);
    const [showFollowUpForm, setShowFollowUpForm] = useState(false);
    const [followUpDate, setFollowUpDate] = useState('');
    const [followUpTime, setFollowUpTime] = useState('09:00');
    const [followUpNote, setFollowUpNote] = useState('');
    const [showStatusDrop, setShowStatusDrop] = useState(false);
    const [showLostModal, setShowLostModal] = useState(false);
    const [lostReason, setLostReason] = useState<LostReason>('nao_respondeu');
    const [lostNote, setLostNote] = useState('');

    if (!lead) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
                <p className="text-lg font-medium">Lead não encontrado.</p>
                <Link href="/leads" className="mt-4 text-sm text-brand-600 hover:underline">
                    Voltar à lista
                </Link>
            </div>
        );
    }

    const getUserName = (uid?: string) => users.find((u) => u.id === uid)?.name ?? '—';

    const handleAddNote = async (e: FormEvent) => {
        e.preventDefault();
        if (!noteText.trim()) return;
        setSavingNote(true);
        await new Promise((r) => setTimeout(r, 150));
        addNote(lead.id, noteText.trim());
        setNoteText('');
        setSavingNote(false);
    };

    const handleSaveFollowUp = () => {
        if (!followUpDate) return;
        const [h, m] = followUpTime.split(':').map(Number);
        const d = new Date(followUpDate);
        d.setHours(h, m, 0, 0);
        setFollowUp(lead.id, d, followUpNote.trim());
        setShowFollowUpForm(false);
        setFollowUpNote('');
    };

    const handleMarkLost = () => {
        markAsLost(lead.id, lostReason, lostNote.trim());
        setShowLostModal(false);
        setLostNote('');
    };

    const isLost = lead.status === 'perdido';
    const isDone = lead.status === 'instalado';

    return (
        <div className="min-h-full bg-slate-50">
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <Link
                            href="/leads"
                            className="shrink-0 rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div className="min-w-0">
                            <h1 className="truncate text-lg font-bold text-slate-900">{lead.name}</h1>
                            <p className="text-xs text-slate-500">{lead.whatsapp}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <StatusBadge status={lead.status} size="md" />
                        {!isDone && !isLost && (
                            <div className="relative">
                                <button
                                    onClick={() => setShowStatusDrop((v) => !v)}
                                    className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
                                >
                                    Mover
                                    <ChevronDown size={14} />
                                </button>
                                {showStatusDrop && (
                                    <div className="absolute right-0 top-full mt-1 z-20 w-56 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                                        <div className="py-1">
                                            {LEAD_STATUSES.filter(
                                                (s) => s !== lead.status && s !== 'perdido'
                                            ).map((s) => (
                                                <button
                                                    key={s}
                                                    onClick={() => {
                                                        changeStatus(lead.id, s);
                                                        setShowStatusDrop(false);
                                                    }}
                                                    className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                                                >
                                                    {STATUS_LABELS[s]}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {isLost && (
                            <button
                                onClick={() => reactivateLead(lead.id)}
                                className="flex items-center gap-1 rounded-xl bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-100 transition"
                            >
                                <RotateCcw size={14} />
                                Reativar
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-5xl p-4 sm:p-6">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left column */}
                    <div className="space-y-5 lg:col-span-2">
                        <Card title="Ações rápidas — WhatsApp">
                            <div className="flex flex-wrap gap-2">
                                {MSG_KEYS.map((key) => (
                                    <a
                                        key={key}
                                        href={makeWhatsAppLink(lead, key)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-green-50 border border-green-200 px-3 py-2 text-xs font-medium text-green-700 hover:bg-green-100 transition"
                                    >
                                        <MessageCircle size={13} />
                                        {MESSAGE_LABELS[key]}
                                    </a>
                                ))}
                            </div>
                        </Card>

                        <Card title="Anotações">
                            <form onSubmit={handleAddNote} className="space-y-3">
                                <textarea
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                    rows={3}
                                    placeholder="Adicionar anotação…"
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
                                />
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={!noteText.trim() || savingNote}
                                        className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50"
                                    >
                                        <Send size={14} />
                                        {savingNote ? 'Salvando…' : 'Salvar'}
                                    </button>
                                </div>
                            </form>
                            {lead.notes.length > 0 && (
                                <div className="mt-4 space-y-3">
                                    {lead.notes.map((n) => (
                                        <div key={n.id} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <span className="text-xs font-semibold text-slate-600">
                                                    {getUserName(n.userId)}
                                                </span>
                                                <span className="text-xs text-slate-400">
                                                    {formatDateTime(n.createdAt)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-800 whitespace-pre-wrap">{n.content}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>

                        <Card title={`Checklist (${lead.checklist.filter((i) => i.checked).length}/${lead.checklist.length})`}>
                            <div className="space-y-2">
                                {lead.checklist.map((item) => (
                                    <button
                                        key={item.key}
                                        onClick={() => toggleChecklistItem(lead.id, item.key)}
                                        className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                                            item.checked
                                                ? 'bg-green-50 border border-green-100'
                                                : 'bg-white border border-slate-100 hover:border-slate-200'
                                        }`}
                                    >
                                        {item.checked ? (
                                            <CheckCircle2 size={18} className="shrink-0 text-green-600" />
                                        ) : (
                                            <Circle size={18} className="shrink-0 text-slate-300" />
                                        )}
                                        <span className={`text-sm ${item.checked ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                                            {item.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </Card>

                        <Card title="Histórico">
                            <div className="space-y-1">
                                {[...lead.activities].reverse().map((act) => (
                                    <div key={act.id} className="flex gap-3 py-2">
                                        <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-400" />
                                        <div className="min-w-0">
                                            <p className="text-sm text-slate-700">{act.description}</p>
                                            <p className="mt-0.5 text-xs text-slate-400">
                                                {getUserName(act.userId)} · {formatDateTime(act.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Right column */}
                    <div className="space-y-5">
                        <Card title="Informações">
                            <dl className="space-y-3 text-sm">
                                <Row label="Certificado" value={CERT_LABELS[lead.certificateType]} />
                                <Row label="Tipo de pessoa" value={PERSON_TYPE_LABELS[lead.personType]} />
                                {lead.cpfCnpj && <Row label="CPF/CNPJ" value={lead.cpfCnpj} />}
                                {lead.email && <Row label="E-mail" value={lead.email} />}
                                {lead.mainUse && <Row label="Uso principal" value={lead.mainUse} />}
                                <Row label="Criado em" value={formatDateTime(lead.createdAt)} />
                            </dl>
                            {isLost && lead.lostReason && (
                                <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3">
                                    <p className="text-xs font-semibold text-red-700 mb-0.5">Motivo da perda</p>
                                    <p className="text-sm text-red-600">{LOST_REASON_LABELS[lead.lostReason]}</p>
                                    {lead.lostNote && (
                                        <p className="mt-1 text-xs text-red-500">{lead.lostNote}</p>
                                    )}
                                </div>
                            )}
                        </Card>

                        <Card title="Próximo retorno">
                            {lead.nextFollowUpAt ? (
                                <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 mb-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className="text-sm font-semibold text-amber-800">
                                                {formatDateTime(lead.nextFollowUpAt)}
                                            </p>
                                            {lead.nextFollowUpNote && (
                                                <p className="mt-1 text-xs text-amber-700 italic">
                                                    &ldquo;{lead.nextFollowUpNote}&rdquo;
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => setFollowUp(lead.id, null, '')}
                                            className="shrink-0 text-amber-400 hover:text-amber-600 transition"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="mb-3 text-sm text-slate-400">Nenhum retorno agendado.</p>
                            )}
                            {!showFollowUpForm ? (
                                <button
                                    onClick={() => setShowFollowUpForm(true)}
                                    className="w-full rounded-xl border border-dashed border-slate-300 py-2.5 text-sm text-slate-500 hover:border-brand-400 hover:text-brand-600 transition"
                                >
                                    <Calendar size={14} className="inline mr-1.5" />
                                    Agendar retorno
                                </button>
                            ) : (
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="mb-1 block text-xs text-slate-500">Data</label>
                                            <input
                                                type="date"
                                                value={followUpDate}
                                                onChange={(e) => setFollowUpDate(e.target.value)}
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-xs text-slate-500">Hora</label>
                                            <input
                                                type="time"
                                                value={followUpTime}
                                                onChange={(e) => setFollowUpTime(e.target.value)}
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400"
                                            />
                                        </div>
                                    </div>
                                    <input
                                        value={followUpNote}
                                        onChange={(e) => setFollowUpNote(e.target.value)}
                                        placeholder="Anotação do retorno (opcional)"
                                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSaveFollowUp}
                                            disabled={!followUpDate}
                                            className="flex-1 rounded-xl bg-brand-600 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50"
                                        >
                                            Salvar
                                        </button>
                                        <button
                                            onClick={() => setShowFollowUpForm(false)}
                                            className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </Card>

                        {!isLost && !isDone && (
                            <Card title="Ações">
                                <button
                                    onClick={() => setShowLostModal(true)}
                                    className="w-full rounded-xl border border-red-200 bg-red-50 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100 transition"
                                >
                                    Marcar como perdido
                                </button>
                            </Card>
                        )}
                    </div>
                </div>
            </div>

            {showLostModal && (
                <Modal title="Marcar como perdido" onClose={() => setShowLostModal(false)}>
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-600">Motivo</label>
                            <select
                                value={lostReason}
                                onChange={(e) => setLostReason(e.target.value as LostReason)}
                                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400"
                            >
                                {LOST_REASONS.map(([k, v]) => (
                                    <option key={k} value={k}>{v}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-600">
                                Observação (opcional)
                            </label>
                            <textarea
                                value={lostNote}
                                onChange={(e) => setLostNote(e.target.value)}
                                rows={3}
                                placeholder="Contexto adicional…"
                                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-400"
                            />
                        </div>
                        <div className="flex gap-3 pt-1">
                            <button
                                onClick={() => setShowLostModal(false)}
                                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleMarkLost}
                                className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition"
                            >
                                Confirmar perda
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}
