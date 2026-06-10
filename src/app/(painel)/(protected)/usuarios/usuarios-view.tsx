'use client';

import { useState, type ReactNode } from 'react';
import { Plus, X, UserCheck, UserX, ArrowRightLeft } from 'lucide-react';
import { usePainel } from '@/lib/painel/store';
import { useMenuToggle } from '@/components/painel/menu-context';
import Topbar from '@/components/painel/topbar';
import { formatDate } from '@/lib/painel/utils';
import type { UserRole } from '@/lib/painel/types';

const inputCls =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100';

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-600">{label}</label>
            {children}
        </div>
    );
}

function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">{title}</h3>
                    <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"><X size={18} /></button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default function UsuariosView() {
    const onMenuClick = useMenuToggle();
    const { users, leads, currentUser, createUser, updateUser, transferLeads } = usePainel();

    const [showNewModal, setShowNewModal] = useState(false);
    const [transferModal, setTransferModal] = useState<string | null>(null);
    const [transferToId, setTransferToId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<UserRole>('consultor');
    const [formError, setFormError] = useState('');

    if (currentUser?.role !== 'admin') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
                <p className="text-lg font-medium">Acesso restrito a administradores.</p>
            </div>
        );
    }

    const resetForm = () => { setName(''); setEmail(''); setPassword(''); setRole('consultor'); setFormError(''); };

    const handleCreate = () => {
        if (!name.trim() || !email.trim() || !password.trim()) { setFormError('Preencha todos os campos obrigatórios.'); return; }
        if (users.some((u) => u.email === email.trim().toLowerCase())) { setFormError('E-mail já cadastrado.'); return; }
        createUser({ name: name.trim(), email: email.trim().toLowerCase(), password, role, active: true });
        setShowNewModal(false);
        resetForm();
    };

    const handleTransfer = () => {
        if (!transferModal || !transferToId) return;
        transferLeads(transferModal, transferToId);
        setTransferModal(null);
        setTransferToId('');
    };

    const getLeadCount = (userId: string) => leads.filter((l) => l.assignedToId === userId).length;

    return (
        <div className="flex flex-col">
            <Topbar title="Usuários" onMenuClick={onMenuClick} />

            <div className="flex-1 p-5 sm:p-6 space-y-4">
                <div className="flex justify-end">
                    <button
                        onClick={() => setShowNewModal(true)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 transition"
                    >
                        <Plus size={16} />
                        Novo usuário
                    </button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50">
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Usuário</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Perfil</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Leads</th>
                                <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 md:table-cell">Criado</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.map((u) => (
                                <tr key={u.id} className="hover:bg-slate-50 transition">
                                    <td className="px-4 py-3">
                                        <p className="font-semibold text-slate-900">{u.name}</p>
                                        <p className="text-xs text-slate-400">{u.email}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                                            {u.role === 'admin' ? 'Admin' : 'Consultor'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-slate-700 font-medium">{getLeadCount(u.id)}</td>
                                    <td className="hidden px-4 py-3 text-slate-500 md:table-cell">{formatDate(u.createdAt)}</td>
                                    <td className="px-4 py-3">
                                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${u.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                                            {u.active ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-1.5">
                                            {u.id !== currentUser?.id ? (
                                                <>
                                                    <button onClick={() => { setTransferModal(u.id); setTransferToId(''); }} className="grid h-8 w-8 place-items-center rounded-lg bg-slate-50 text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition">
                                                        <ArrowRightLeft size={15} />
                                                    </button>
                                                    <button onClick={() => updateUser(u.id, { active: !u.active })} className={`grid h-8 w-8 place-items-center rounded-lg transition ${u.active ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>
                                                        {u.active ? <UserX size={15} /> : <UserCheck size={15} />}
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="text-xs text-slate-400 pr-2">Você</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showNewModal && (
                <Modal title="Novo usuário" onClose={() => { setShowNewModal(false); resetForm(); }}>
                    <div className="space-y-4">
                        {formError && <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{formError}</div>}
                        <Field label="Nome completo *"><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ana Silva" className={inputCls} /></Field>
                        <Field label="E-mail *"><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ana@certibr.com.br" className={inputCls} /></Field>
                        <Field label="Senha *"><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha de acesso" className={inputCls} /></Field>
                        <Field label="Perfil">
                            <select value={role} onChange={(e) => setRole(e.target.value as UserRole)} className={inputCls}>
                                <option value="consultor">Consultor</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </Field>
                        <div className="flex gap-3 pt-2">
                            <button onClick={() => { setShowNewModal(false); resetForm(); }} className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">Cancelar</button>
                            <button onClick={handleCreate} className="flex-1 rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition">Criar usuário</button>
                        </div>
                    </div>
                </Modal>
            )}

            {transferModal && (
                <Modal title="Transferir leads" onClose={() => { setTransferModal(null); setTransferToId(''); }}>
                    <div className="space-y-4">
                        <p className="text-sm text-slate-600">
                            Todos os leads de <strong>{users.find((u) => u.id === transferModal)?.name}</strong>{' '}
                            ({getLeadCount(transferModal)} leads) serão transferidos para:
                        </p>
                        <select value={transferToId} onChange={(e) => setTransferToId(e.target.value)} className={inputCls}>
                            <option value="">— Selecionar consultor —</option>
                            {users.filter((u) => u.active && u.id !== transferModal).map((u) => (
                                <option key={u.id} value={u.id}>{u.name}</option>
                            ))}
                        </select>
                        <div className="flex gap-3 pt-1">
                            <button onClick={() => { setTransferModal(null); setTransferToId(''); }} className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">Cancelar</button>
                            <button onClick={handleTransfer} disabled={!transferToId} className="flex-1 rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50 transition">Transferir</button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}
