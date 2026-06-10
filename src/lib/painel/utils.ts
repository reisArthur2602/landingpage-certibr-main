import type {
    LeadStatus,
    CertificateType,
    Urgency,
    LeadOrigin,
    LostReason,
    PersonType,
    ActivityType,
} from './types';

export function normalizeWhatsApp(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    if (digits.startsWith('55') && digits.length >= 12) return digits;
    return `55${digits}`;
}

export function buildWhatsAppUrl(phone: string, message: string): string {
    const normalized = normalizeWhatsApp(phone);
    return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export function formatCPFCNPJ(value: string): string {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 11) {
        return digits
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return digits
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
}

export function formatDate(date: Date | string | undefined | null): string {
    if (!date) return '—';
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(new Date(date));
}

export function formatDateTime(date: Date | string | undefined | null): string {
    if (!date) return '—';
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date));
}

export function formatTime(date: Date | string): string {
    return new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date));
}

export function daysUntil(date: Date | string): number {
    const target = new Date(date);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    return Math.round((target.getTime() - now.getTime()) / 86400000);
}

export function daysAgo(date: Date | string): number {
    return -daysUntil(date);
}

export function isToday(date: Date | string): boolean {
    const d = new Date(date);
    const now = new Date();
    return (
        d.getDate() === now.getDate() &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
    );
}

export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function formatPhoneDisplay(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    const local = digits.startsWith('55') ? digits.slice(2) : digits;
    if (local.length === 11) {
        return `(${local.slice(0, 2)}) ${local.slice(2, 7)}-${local.slice(7)}`;
    }
    if (local.length === 10) {
        return `(${local.slice(0, 2)}) ${local.slice(2, 6)}-${local.slice(6)}`;
    }
    return phone;
}

// ── Labels ────────────────────────────────────────────────────────────────────

export const STATUS_LABELS: Record<LeadStatus, string> = {
    novo: 'Novo lead',
    em_atendimento: 'Em atendimento',
    aguardando_documentos: 'Aguardando documentos',
    aguardando_pagamento: 'Aguardando pagamento',
    pagamento_confirmado: 'Pagamento confirmado',
    em_emissao: 'Em emissão',
    emitido: 'Emitido',
    instalado: 'Instalado / Concluído',
    perdido: 'Perdido',
    renovacao_futura: 'Renovação futura',
};

export const STATUS_COLORS: Record<
    LeadStatus,
    { bg: string; text: string; border: string; dot: string }
> = {
    novo: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
    em_atendimento: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
    aguardando_documentos: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200', dot: 'bg-orange-500' },
    aguardando_pagamento: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200', dot: 'bg-purple-500' },
    pagamento_confirmado: { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-200', dot: 'bg-indigo-500' },
    em_emissao: { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-200', dot: 'bg-cyan-500' },
    emitido: { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-200', dot: 'bg-teal-500' },
    instalado: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
    perdido: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
    renovacao_futura: { bg: 'bg-brand-100', text: 'text-brand-700', border: 'border-brand-200', dot: 'bg-brand-500' },
};

export const CERT_LABELS: Record<CertificateType, string> = {
    ecnpj_a1: 'e-CNPJ A1',
    ecpf_a1: 'e-CPF A1',
    nfe_a1: 'NF-e A1',
    renovacao_a1: 'Renovação A1',
    nao_sei: 'Não sei',
};

export const URGENCY_LABELS: Record<Urgency, string> = {
    hoje: 'Precisa hoje',
    semana: 'Essa semana',
    pesquisando: 'Pesquisando',
};

export const URGENCY_COLORS: Record<Urgency, { bg: string; text: string }> = {
    hoje: { bg: 'bg-red-50', text: 'text-red-600' },
    semana: { bg: 'bg-amber-50', text: 'text-amber-600' },
    pesquisando: { bg: 'bg-slate-100', text: 'text-slate-500' },
};

export const ORIGIN_LABELS: Record<LeadOrigin, string> = {
    site: 'Site',
    quiz: 'Quiz landing page',
    whatsapp: 'WhatsApp manual',
    google_ads: 'Google Ads',
    instagram: 'Instagram',
    indicacao: 'Indicação',
    renovacao: 'Renovação',
    outros: 'Outros',
};

export const LOST_REASON_LABELS: Record<LostReason, string> = {
    preco: 'Preço',
    nao_respondeu: 'Não respondeu',
    comprou_outro: 'Comprou em outro lugar',
    pesquisando: 'Apenas pesquisando',
    sem_documentos: 'Sem documentos',
    desistiu: 'Desistiu',
    nao_era_a1: 'Não era A1',
    outro: 'Outro',
};

export const PERSON_TYPE_LABELS: Record<PersonType, string> = {
    cnpj: 'CNPJ (Empresa)',
    cpf: 'CPF (Pessoa física)',
    nao_sei: 'Não sei',
};

export const ACTIVITY_LABELS: Record<ActivityType, string> = {
    criado: 'Lead criado',
    status_alterado: 'Status alterado',
    consultor_alterado: 'Consultor alterado',
    nota_adicionada: 'Anotação adicionada',
    retorno_agendado: 'Retorno agendado',
    dado_alterado: 'Dados alterados',
    perdido: 'Marcado como perdido',
    reativado: 'Lead reativado',
    concluido: 'Concluído',
    vencimento_registrado: 'Vencimento registrado',
    checklist_alterado: 'Checklist atualizado',
};
