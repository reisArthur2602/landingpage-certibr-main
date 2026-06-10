'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { usePainel } from '@/lib/painel/store';
import { useMenuToggle } from '@/components/painel/menu-context';
import Topbar from '@/components/painel/topbar';
import { CERT_LABELS, ORIGIN_LABELS, PERSON_TYPE_LABELS } from '@/lib/painel/utils';
import type { CertificateType, PersonType, LeadOrigin } from '@/lib/painel/types';

const CERTS = Object.entries(CERT_LABELS) as [CertificateType, string][];
const ORIGINS = Object.entries(ORIGIN_LABELS) as [LeadOrigin, string][];
const PERSON_TYPES = Object.entries(PERSON_TYPE_LABELS) as [PersonType, string][];

const inputCls =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100';

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">{title}</h2>
            {children}
        </div>
    );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-600">{label}</label>
            {children}
        </div>
    );
}

export default function NovoLeadForm() {
    const router = useRouter();
    const onMenuClick = useMenuToggle();
    const { createLead, users } = usePainel();

    const [name, setName] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [email, setEmail] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [personType, setPersonType] = useState<PersonType>('nao_sei');
    const [certificateType, setCertificateType] = useState<CertificateType>('nao_sei');
    const [mainUse, setMainUse] = useState('');
    const [origin, setOrigin] = useState<LeadOrigin>('whatsapp');
    const [assignedToId, setAssignedToId] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const activeUsers = users.filter((u) => u.active);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        if (!name.trim()) { setError('Nome é obrigatório.'); return; }
        const phone = whatsapp.replace(/\D/g, '');
        if (phone.length < 10) { setError('WhatsApp inválido.'); return; }

        setSaving(true);
        await new Promise((r) => setTimeout(r, 200));
        const lead = createLead({
            name: name.trim(),
            whatsapp: phone,
            email: email.trim() || undefined,
            cpfCnpj: cpfCnpj.replace(/\D/g, '') || undefined,
            personType,
            certificateType,
            mainUse: mainUse.trim() || undefined,
            urgency: 'semana',
            origin,
            assignedToId: assignedToId || undefined,
            notes: notes.trim() || undefined,
        });
        setSaving(false);
        router.push(`/leads/${lead.id}`);
    };

    return (
        <div className="flex flex-col">
            <Topbar title="Novo lead" onMenuClick={onMenuClick} />

            <div className="flex-1 p-5 sm:p-6">
                <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
                    {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
                    )}

                    <Section title="Dados do cliente">
                        <Field label="Nome completo *">
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: João Silva" className={inputCls} />
                        </Field>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="WhatsApp *">
                                <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="(11) 99999-9999" className={inputCls} />
                            </Field>
                            <Field label="E-mail">
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemplo.com" className={inputCls} />
                            </Field>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="CPF / CNPJ">
                                <input value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} placeholder="000.000.000-00" className={inputCls} />
                            </Field>
                            <Field label="Tipo de pessoa">
                                <select value={personType} onChange={(e) => setPersonType(e.target.value as PersonType)} className={inputCls}>
                                    {PERSON_TYPES.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                                </select>
                            </Field>
                        </div>
                    </Section>

                    <Section title="Certificado">
                        <Field label="Tipo de certificado">
                            <select value={certificateType} onChange={(e) => setCertificateType(e.target.value as CertificateType)} className={inputCls}>
                                {CERTS.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                            </select>
                        </Field>
                        <Field label="Uso principal (opcional)">
                            <input value={mainUse} onChange={(e) => setMainUse(e.target.value)} placeholder="Ex: Emitir NF-e, acessar e-CAC…" className={inputCls} />
                        </Field>
                    </Section>

                    <Section title="Atribuição e origem">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Origem do lead">
                                <select value={origin} onChange={(e) => setOrigin(e.target.value as LeadOrigin)} className={inputCls}>
                                    {ORIGINS.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                                </select>
                            </Field>
                            <Field label="Consultor responsável">
                                <select value={assignedToId} onChange={(e) => setAssignedToId(e.target.value)} className={inputCls}>
                                    <option value="">— Sem consultor —</option>
                                    {activeUsers.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
                                </select>
                            </Field>
                        </div>
                    </Section>

                    <Section title="Observações iniciais">
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={4}
                            placeholder="Anotações sobre o lead, contexto da conversa…"
                            className={`${inputCls} resize-none`}
                        />
                    </Section>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-60"
                        >
                            {saving ? 'Salvando…' : 'Criar lead'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
