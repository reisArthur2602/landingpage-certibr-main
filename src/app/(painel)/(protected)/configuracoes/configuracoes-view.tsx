'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import { usePainel } from '@/lib/painel/store';
import { useMenuToggle } from '@/components/painel/menu-context';
import Topbar from '@/components/painel/topbar';
import { CERT_LABELS } from '@/lib/painel/utils';
import type { CertificateType } from '@/lib/painel/types';

const CERTS = Object.entries(CERT_LABELS) as [CertificateType, string][];

const inputCls = (enabled: boolean) =>
    `w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 ${enabled ? '' : 'cursor-not-allowed opacity-60'}`;

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">{title}</h2>
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

export default function ConfiguracoesView() {
    const onMenuClick = useMenuToggle();
    const { settings, updateSettings, users, currentUser } = usePainel();

    const [companyName, setCompanyName] = useState(settings.companyName);
    const [mainWhatsApp, setMainWhatsApp] = useState(settings.mainWhatsApp);
    const [defaultAssigneeId, setDefaultAssigneeId] = useState(settings.defaultAssigneeId ?? '');
    const [prices, setPrices] = useState<Partial<Record<CertificateType, string>>>(settings.certificatePrices);
    const [saved, setSaved] = useState(false);

    const isAdmin = currentUser?.role === 'admin';
    const activeUsers = users.filter((u) => u.active);

    const handleSave = (e: FormEvent) => {
        e.preventDefault();
        updateSettings({
            companyName: companyName.trim(),
            mainWhatsApp: mainWhatsApp.trim(),
            defaultAssigneeId: defaultAssigneeId || undefined,
            certificatePrices: prices,
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div className="flex flex-col">
            <Topbar title="Configurações" onMenuClick={onMenuClick} />
            <div className="flex-1 p-5 sm:p-6">
                <form onSubmit={handleSave} className="mx-auto max-w-2xl space-y-6">
                    <Section title="Geral">
                        <Field label="Nome da empresa">
                            <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} disabled={!isAdmin} className={inputCls(isAdmin)} />
                        </Field>
                        <Field label="WhatsApp principal">
                            <input value={mainWhatsApp} onChange={(e) => setMainWhatsApp(e.target.value)} placeholder="5511999999999" disabled={!isAdmin} className={inputCls(isAdmin)} />
                        </Field>
                        <Field label="Consultor padrão para novos leads">
                            <select value={defaultAssigneeId} onChange={(e) => setDefaultAssigneeId(e.target.value)} disabled={!isAdmin} className={inputCls(isAdmin)}>
                                <option value="">— Sem atribuição automática —</option>
                                {activeUsers.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
                            </select>
                        </Field>
                    </Section>

                    <Section title="Preços dos certificados">
                        <p className="text-xs text-slate-400 -mt-2">Usado como referência interna. Deixe em branco para exibir "Consultar".</p>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {CERTS.filter(([k]) => k !== 'nao_sei').map(([key, label]) => (
                                <Field key={key} label={label}>
                                    <input
                                        value={prices[key] ?? ''}
                                        onChange={(e) => setPrices((prev) => ({ ...prev, [key]: e.target.value }))}
                                        placeholder="R$ 0,00"
                                        disabled={!isAdmin}
                                        className={inputCls(isAdmin)}
                                    />
                                </Field>
                            ))}
                        </div>
                    </Section>

                    <Section title="Sua conta">
                        <div className="space-y-1 text-sm">
                            <p><span className="text-slate-500">Nome:</span>{' '}<span className="font-medium text-slate-800">{currentUser?.name}</span></p>
                            <p><span className="text-slate-500">E-mail:</span>{' '}<span className="font-medium text-slate-800">{currentUser?.email}</span></p>
                            <p>
                                <span className="text-slate-500">Perfil:</span>{' '}
                                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${currentUser?.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                                    {currentUser?.role === 'admin' ? 'Administrador' : 'Consultor'}
                                </span>
                            </p>
                        </div>
                    </Section>

                    {isAdmin ? (
                        <div className="flex items-center justify-end gap-3">
                            {saved && (
                                <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
                                    <CheckCircle size={16} />
                                    Salvo!
                                </span>
                            )}
                            <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700">
                                <Save size={16} />
                                Salvar configurações
                            </button>
                        </div>
                    ) : (
                        <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                            Apenas administradores podem editar as configurações.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
