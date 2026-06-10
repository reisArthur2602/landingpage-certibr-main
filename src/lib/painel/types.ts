export type UserRole = 'admin' | 'consultor';

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phone?: string;
    active: boolean;
    createdAt: Date;
}

export type LeadStatus =
    | 'novo'
    | 'em_atendimento'
    | 'aguardando_documentos'
    | 'aguardando_pagamento'
    | 'pagamento_confirmado'
    | 'em_emissao'
    | 'emitido'
    | 'instalado'
    | 'perdido'
    | 'renovacao_futura';

export const LEAD_STATUSES: LeadStatus[] = [
    'novo',
    'em_atendimento',
    'aguardando_documentos',
    'aguardando_pagamento',
    'pagamento_confirmado',
    'em_emissao',
    'emitido',
    'instalado',
    'perdido',
    'renovacao_futura',
];

export type CertificateType = 'ecnpj_a1' | 'ecpf_a1' | 'nfe_a1' | 'renovacao_a1' | 'nao_sei';
export type PersonType = 'cnpj' | 'cpf' | 'nao_sei';
export type Urgency = 'hoje' | 'semana' | 'pesquisando';
export type LeadOrigin =
    | 'site'
    | 'quiz'
    | 'whatsapp'
    | 'google_ads'
    | 'instagram'
    | 'indicacao'
    | 'renovacao'
    | 'outros';
export type LostReason =
    | 'preco'
    | 'nao_respondeu'
    | 'comprou_outro'
    | 'pesquisando'
    | 'sem_documentos'
    | 'desistiu'
    | 'nao_era_a1'
    | 'outro';

export type ActivityType =
    | 'criado'
    | 'status_alterado'
    | 'consultor_alterado'
    | 'nota_adicionada'
    | 'retorno_agendado'
    | 'dado_alterado'
    | 'perdido'
    | 'reativado'
    | 'concluido'
    | 'vencimento_registrado'
    | 'checklist_alterado';

export interface QuizAnswers {
    tipo?: string;
    uso?: string;
    situacao?: string;
    urgencia?: string;
}

export interface LeadNote {
    id: string;
    leadId: string;
    userId: string;
    content: string;
    createdAt: Date;
}

export interface LeadActivity {
    id: string;
    leadId: string;
    userId: string;
    type: ActivityType;
    description: string;
    createdAt: Date;
}

export interface ChecklistItem {
    key: string;
    label: string;
    checked: boolean;
    checkedAt?: Date;
    checkedById?: string;
}

export const DEFAULT_CHECKLIST: Array<{ key: string; label: string }> = [
    { key: 'doc_pessoal', label: 'Documento pessoal recebido' },
    { key: 'cpf_cnpj_conferido', label: 'CPF/CNPJ conferido' },
    { key: 'contrato_social', label: 'Contrato social recebido (se CNPJ)' },
    { key: 'comprovante_dados', label: 'Comprovante / dados necessários recebidos' },
    { key: 'pagamento_confirmado', label: 'Pagamento confirmado' },
    { key: 'dados_enviados_parceiro', label: 'Dados enviados para parceiro autorizado' },
    { key: 'emissao_acompanhada', label: 'Emissão acompanhada' },
    { key: 'certificado_entregue', label: 'Certificado entregue ao cliente' },
    { key: 'instalacao_concluida', label: 'Instalação / orientação concluída' },
    { key: 'vencimento_registrado', label: 'Data de vencimento registrada' },
];

export interface Lead {
    id: string;
    name: string;
    whatsapp: string;
    email?: string;
    cpfCnpj?: string;
    personType: PersonType;
    certificateType: CertificateType;
    mainUse?: string;
    certificateSituation?: string;
    urgency: Urgency;
    origin: LeadOrigin;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    status: LeadStatus;
    assignedToId?: string;
    createdAt: Date;
    updatedAt: Date;
    lastContactAt?: Date;
    nextFollowUpAt?: Date;
    nextFollowUpNote?: string;
    issuedAt?: Date;
    expiresAt?: Date;
    lostReason?: LostReason;
    lostNote?: string;
    quizAnswers?: QuizAnswers;
    notes: LeadNote[];
    activities: LeadActivity[];
    checklist: ChecklistItem[];
}

export interface AppSettings {
    companyName: string;
    mainWhatsApp: string;
    defaultAssigneeId?: string;
    certificatePrices: Partial<Record<CertificateType, string>>;
    messages: {
        initial: string;
        documents: string;
        payment: string;
        installation: string;
        renewal: string;
    };
}

export interface CreateLeadInput {
    name: string;
    whatsapp: string;
    email?: string;
    cpfCnpj?: string;
    personType: PersonType;
    certificateType: CertificateType;
    mainUse?: string;
    certificateSituation?: string;
    urgency: Urgency;
    origin: LeadOrigin;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    assignedToId?: string;
    quizAnswers?: QuizAnswers;
    notes?: string;
}
