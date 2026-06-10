'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type {
    User,
    Lead,
    LeadStatus,
    LostReason,
    AppSettings,
    CreateLeadInput,
} from './types';
import { DEFAULT_CHECKLIST } from './types';
import { MOCK_USERS, MOCK_LEADS, MOCK_SETTINGS } from './mock-data';
import { generateId } from './utils';

interface PainelContextType {
    // Auth
    currentUser: User | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;

    // Leads
    leads: Lead[];
    getLead: (id: string) => Lead | undefined;
    getVisibleLeads: () => Lead[];
    createLead: (data: CreateLeadInput) => Lead;
    updateLead: (id: string, data: Partial<Lead>) => void;
    changeStatus: (id: string, status: LeadStatus) => void;
    markAsLost: (id: string, reason: LostReason, note: string) => void;
    reactivateLead: (id: string) => void;
    addNote: (leadId: string, content: string) => void;
    toggleChecklistItem: (leadId: string, key: string) => void;
    setFollowUp: (leadId: string, date: Date | null, note: string) => void;
    registerExpiry: (leadId: string, issuedAt: Date, expiresAt: Date) => void;

    // Users
    users: User[];
    createUser: (data: Omit<User, 'id' | 'createdAt'>) => void;
    updateUser: (id: string, data: Partial<User>) => void;
    transferLeads: (fromId: string, toId: string) => void;

    // Settings
    settings: AppSettings;
    updateSettings: (data: Partial<AppSettings>) => void;
}

const PainelContext = createContext<PainelContextType | null>(null);

const SESSION_KEY = 'certibr_painel_user';

export function PainelProvider({ children }: { children: React.ReactNode }) {
    const [users, setUsers] = useState<User[]>(MOCK_USERS);
    const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
    const [settings, setSettings] = useState<AppSettings>(MOCK_SETTINGS);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem(SESSION_KEY);
        if (stored) {
            const user = users.find((u) => u.id === stored && u.active);
            if (user) setCurrentUser(user);
        }
    }, [users]);

    const login = (email: string, password: string): boolean => {
        const user = users.find(
            (u) => u.email === email && u.password === password && u.active,
        );
        if (!user) return false;
        setCurrentUser(user);
        localStorage.setItem(SESSION_KEY, user.id);
        return true;
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem(SESSION_KEY);
    };

    const getLead = (id: string) => leads.find((l) => l.id === id);

    const getVisibleLeads = () => {
        if (!currentUser) return [];
        if (currentUser.role === 'admin') return leads;
        return leads.filter((l) => l.assignedToId === currentUser.id);
    };

    const addActivity = (
        leadId: string,
        type: Lead['activities'][0]['type'],
        description: string,
    ) => {
        if (!currentUser) return;
        setLeads((prev) =>
            prev.map((l) =>
                l.id === leadId
                    ? {
                          ...l,
                          activities: [
                              ...l.activities,
                              {
                                  id: generateId(),
                                  leadId,
                                  userId: currentUser.id,
                                  type,
                                  description,
                                  createdAt: new Date(),
                              },
                          ],
                          updatedAt: new Date(),
                      }
                    : l,
            ),
        );
    };

    const createLead = (data: CreateLeadInput): Lead => {
        const id = `lead-${generateId()}`;
        const now = new Date();
        const initialNote = data.notes?.trim();

        const newLead: Lead = {
            id,
            name: data.name,
            whatsapp: data.whatsapp,
            email: data.email,
            cpfCnpj: data.cpfCnpj,
            personType: data.personType,
            certificateType: data.certificateType,
            mainUse: data.mainUse,
            certificateSituation: data.certificateSituation,
            urgency: data.urgency,
            origin: data.origin,
            utmSource: data.utmSource,
            utmMedium: data.utmMedium,
            utmCampaign: data.utmCampaign,
            status: 'novo',
            assignedToId: data.assignedToId ?? settings.defaultAssigneeId,
            createdAt: now,
            updatedAt: now,
            quizAnswers: data.quizAnswers,
            notes: initialNote
                ? [
                      {
                          id: generateId(),
                          leadId: id,
                          userId: currentUser?.id ?? 'system',
                          content: initialNote,
                          createdAt: now,
                      },
                  ]
                : [],
            activities: [
                {
                    id: generateId(),
                    leadId: id,
                    userId: currentUser?.id ?? 'system',
                    type: 'criado',
                    description: `Lead criado via ${data.origin === 'quiz' ? 'quiz da landing page' : data.origin}`,
                    createdAt: now,
                },
            ],
            checklist: DEFAULT_CHECKLIST.map((item) => ({
                ...item,
                checked: false,
            })),
        };
        setLeads((prev) => [newLead, ...prev]);
        return newLead;
    };

    const updateLead = (id: string, data: Partial<Lead>) => {
        setLeads((prev) =>
            prev.map((l) =>
                l.id === id ? { ...l, ...data, updatedAt: new Date() } : l,
            ),
        );
        if (Object.keys(data).some((k) => !['updatedAt', 'notes', 'activities', 'checklist'].includes(k))) {
            addActivity(id, 'dado_alterado', 'Dados do lead atualizados');
        }
    };

    const changeStatus = (id: string, status: LeadStatus) => {
        const lead = leads.find((l) => l.id === id);
        if (!lead || lead.status === status) return;
        const prev = lead.status;
        setLeads((arr) =>
            arr.map((l) =>
                l.id === id
                    ? {
                          ...l,
                          status,
                          updatedAt: new Date(),
                          activities: [
                              ...l.activities,
                              {
                                  id: generateId(),
                                  leadId: id,
                                  userId: currentUser?.id ?? 'system',
                                  type: 'status_alterado' as const,
                                  description: `Status alterado de "${prev}" para "${status}"`,
                                  createdAt: new Date(),
                              },
                          ],
                      }
                    : l,
            ),
        );
    };

    const markAsLost = (id: string, reason: LostReason, note: string) => {
        setLeads((arr) =>
            arr.map((l) =>
                l.id === id
                    ? {
                          ...l,
                          status: 'perdido' as LeadStatus,
                          lostReason: reason,
                          lostNote: note,
                          updatedAt: new Date(),
                          activities: [
                              ...l.activities,
                              {
                                  id: generateId(),
                                  leadId: id,
                                  userId: currentUser?.id ?? 'system',
                                  type: 'perdido' as const,
                                  description: `Marcado como perdido — Motivo: ${reason}. ${note}`,
                                  createdAt: new Date(),
                              },
                          ],
                      }
                    : l,
            ),
        );
    };

    const reactivateLead = (id: string) => {
        changeStatus(id, 'em_atendimento');
        addActivity(id, 'reativado', 'Lead reativado');
    };

    const addNote = (leadId: string, content: string) => {
        if (!currentUser) return;
        const note = {
            id: generateId(),
            leadId,
            userId: currentUser.id,
            content,
            createdAt: new Date(),
        };
        setLeads((prev) =>
            prev.map((l) =>
                l.id === leadId
                    ? {
                          ...l,
                          notes: [note, ...l.notes],
                          updatedAt: new Date(),
                          activities: [
                              ...l.activities,
                              {
                                  id: generateId(),
                                  leadId,
                                  userId: currentUser.id,
                                  type: 'nota_adicionada' as const,
                                  description: 'Anotação adicionada',
                                  createdAt: new Date(),
                              },
                          ],
                      }
                    : l,
            ),
        );
    };

    const toggleChecklistItem = (leadId: string, key: string) => {
        if (!currentUser) return;
        setLeads((prev) =>
            prev.map((l) => {
                if (l.id !== leadId) return l;
                const checklist = l.checklist.map((item) => {
                    if (item.key !== key) return item;
                    const checked = !item.checked;
                    return {
                        ...item,
                        checked,
                        checkedAt: checked ? new Date() : undefined,
                        checkedById: checked ? currentUser.id : undefined,
                    };
                });
                const item = checklist.find((i) => i.key === key);
                return {
                    ...l,
                    checklist,
                    updatedAt: new Date(),
                    activities: [
                        ...l.activities,
                        {
                            id: generateId(),
                            leadId,
                            userId: currentUser.id,
                            type: 'checklist_alterado' as const,
                            description: `Checklist: "${item?.label}" marcado como ${item?.checked ? 'concluído' : 'pendente'}`,
                            createdAt: new Date(),
                        },
                    ],
                };
            }),
        );
    };

    const setFollowUp = (leadId: string, date: Date | null, note: string) => {
        setLeads((prev) =>
            prev.map((l) =>
                l.id === leadId
                    ? {
                          ...l,
                          nextFollowUpAt: date ?? undefined,
                          nextFollowUpNote: note,
                          updatedAt: new Date(),
                          activities: [
                              ...l.activities,
                              {
                                  id: generateId(),
                                  leadId,
                                  userId: currentUser?.id ?? 'system',
                                  type: 'retorno_agendado' as const,
                                  description: date
                                      ? `Retorno agendado para ${date.toLocaleDateString('pt-BR')}`
                                      : 'Retorno removido',
                                  createdAt: new Date(),
                              },
                          ],
                      }
                    : l,
            ),
        );
    };

    const registerExpiry = (leadId: string, issuedAt: Date, expiresAt: Date) => {
        setLeads((prev) =>
            prev.map((l) =>
                l.id === leadId
                    ? {
                          ...l,
                          issuedAt,
                          expiresAt,
                          updatedAt: new Date(),
                          activities: [
                              ...l.activities,
                              {
                                  id: generateId(),
                                  leadId,
                                  userId: currentUser?.id ?? 'system',
                                  type: 'vencimento_registrado' as const,
                                  description: `Vencimento registrado: ${expiresAt.toLocaleDateString('pt-BR')}`,
                                  createdAt: new Date(),
                              },
                          ],
                      }
                    : l,
            ),
        );
    };

    const createUser = (data: Omit<User, 'id' | 'createdAt'>) => {
        const newUser: User = { ...data, id: `user-${generateId()}`, createdAt: new Date() };
        setUsers((prev) => [...prev, newUser]);
    };

    const updateUser = (id: string, data: Partial<User>) => {
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data } : u)));
    };

    const transferLeads = (fromId: string, toId: string) => {
        setLeads((prev) =>
            prev.map((l) =>
                l.assignedToId === fromId
                    ? {
                          ...l,
                          assignedToId: toId,
                          updatedAt: new Date(),
                          activities: [
                              ...l.activities,
                              {
                                  id: generateId(),
                                  leadId: l.id,
                                  userId: currentUser?.id ?? 'system',
                                  type: 'consultor_alterado' as const,
                                  description: 'Consultor responsável alterado',
                                  createdAt: new Date(),
                              },
                          ],
                      }
                    : l,
            ),
        );
    };

    const updateSettings = (data: Partial<AppSettings>) => {
        setSettings((prev) => ({ ...prev, ...data }));
    };

    return (
        <PainelContext.Provider
            value={{
                currentUser,
                login,
                logout,
                leads,
                getLead,
                getVisibleLeads,
                createLead,
                updateLead,
                changeStatus,
                markAsLost,
                reactivateLead,
                addNote,
                toggleChecklistItem,
                setFollowUp,
                registerExpiry,
                users,
                createUser,
                updateUser,
                transferLeads,
                settings,
                updateSettings,
            }}
        >
            {children}
        </PainelContext.Provider>
    );
}

export function usePainel(): PainelContextType {
    const ctx = useContext(PainelContext);
    if (!ctx) throw new Error('usePainel must be used inside PainelProvider');
    return ctx;
}
