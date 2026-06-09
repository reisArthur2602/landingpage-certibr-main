// =============================================================================
// Configuração central da landing page certiBR
// Altere aqui os dados de contato, preços e textos — sem mexer nos componentes.
// =============================================================================

export const COMPANY_NAME = 'certiBR';

// Número do WhatsApp no formato internacional, apenas dígitos: DDI + DDD + número.
// Ex.: 55 (Brasil) + 11 (DDD) + 999999999  ->  '5511999999999'
export const WHATSAPP_NUMBER = '5521975140550'; // TODO: substituir pelo número real

// E-mail de contato exibido no rodapé.
export const CONTACT_EMAIL = 'contato@certibr.com.br'; // TODO: substituir pelo e-mail real

/**
 * Monta uma URL do WhatsApp já com a mensagem codificada com segurança.
 * Use sempre esta função para evitar links quebrados.
 */
export function buildWhatsAppUrl(message: string): string {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Mensagens prontas reutilizáveis.
export const WHATSAPP_MESSAGES = {
    default: 'Olá, preciso de ajuda com certificado digital.',
    heroBuy: 'Olá, quero comprar um certificado digital. Pode me ajudar a escolher e emitir?',
} as const;

// URL padrão (botões genéricos: header, CTA final, rodapé).
export const WHATSAPP_URL = buildWhatsAppUrl(WHATSAPP_MESSAGES.default);

export const NAV_LINKS = [
    { label: 'Início', href: '#inicio' },
    { label: 'Certificados', href: '#certificados' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Vantagens', href: '#vantagens' },
    { label: 'Dúvidas', href: '#duvidas' },
] as const;

// -----------------------------------------------------------------------------
// Certificados / preços
// Troque `price` por "A partir de R$ 89,90" quando tiver os valores reais.
// -----------------------------------------------------------------------------
export interface Certificate {
    id: string;
    name: string;
    badge: string;
    price: string;
    description: string;
    whatsappMessage: string;
    highlight?: boolean;
}

export const CERTIFICATES: Certificate[] = [
    {
        id: 'ecnpj-a1',
        name: 'e-CNPJ A1',
        badge: 'Empresas',
        price: 'Consultar valor',
        description:
            'Ideal para empresas que precisam emitir nota fiscal, acessar a Receita Federal/e-CAC e assinar documentos.',
        whatsappMessage:
            'Olá, tenho interesse no certificado e-CNPJ A1. Pode me passar valores e documentos necessários?',
        highlight: true,
    },
    {
        id: 'ecpf-a1',
        name: 'e-CPF A1',
        badge: 'Pessoa física',
        price: 'Consultar valor',
        description: 'Ideal para pessoa física, advogados, médicos e profissionais liberais.',
        whatsappMessage:
            'Olá, tenho interesse no certificado e-CPF A1. Pode me passar valores e documentos necessários?',
    },
    {
        id: 'ecnpj-a3',
        name: 'e-CNPJ A3',
        badge: 'Token / cartão',
        price: 'Consultar valor',
        description: 'Certificado em token ou cartão para empresas que precisam de mídia física.',
        whatsappMessage:
            'Olá, tenho interesse no certificado e-CNPJ A3. Pode me passar valores e documentos necessários?',
    },
    {
        id: 'ecpf-a3',
        name: 'e-CPF A3',
        badge: 'Token / cartão',
        price: 'Consultar valor',
        description: 'Certificado em token ou cartão para pessoa física e profissionais.',
        whatsappMessage:
            'Olá, tenho interesse no certificado e-CPF A3. Pode me passar valores e documentos necessários?',
    },
];
