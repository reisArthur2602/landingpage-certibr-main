import { buildWhatsAppUrl } from './utils';
import type { Lead } from './types';

export const MESSAGE_TEMPLATES = {
    initial: (name: string) =>
        `Olá, ${name}! Vi que você tem interesse em um Certificado Digital A1. Vou te ajudar a escolher a melhor opção e seguir com o processo. 😊`,

    documents: (name: string) =>
        `Olá, ${name}! Para darmos continuidade ao seu Certificado Digital A1, preciso que envie os documentos solicitados. Assim que recebermos, seguimos com a emissão. 📄`,

    payment: (name: string) =>
        `Olá, ${name}! Segue a orientação para pagamento do seu Certificado Digital A1. Após a confirmação, damos continuidade ao processo. 💳`,

    installation: (name: string) =>
        `Olá, ${name}! Seu Certificado Digital A1 está pronto. Vamos te orientar na instalação e uso correto. 🎉`,

    renewal: (name: string) =>
        `Olá, ${name}! Seu Certificado Digital A1 vence em breve. Quer que eu te ajude com a renovação para evitar problemas na emissão de notas ou acesso aos sistemas? 🔄`,

    reminder: (name: string) =>
        `Olá, ${name}! Passando para verificar se você ainda tem interesse no Certificado Digital A1. Posso te ajudar? 👋`,
};

export type MessageKey = keyof typeof MESSAGE_TEMPLATES;

export const MESSAGE_LABELS: Record<MessageKey, string> = {
    initial: 'Mensagem inicial',
    documents: 'Solicitar documentos',
    payment: 'Orientação de pagamento',
    installation: 'Instruções de instalação',
    renewal: 'Mensagem de renovação',
    reminder: 'Lembrete de retorno',
};

export function makeWhatsAppLink(lead: Lead, key: MessageKey): string {
    const fn = MESSAGE_TEMPLATES[key];
    return buildWhatsAppUrl(lead.whatsapp, fn(lead.name));
}

export function makeCustomWhatsAppLink(lead: Lead, message: string): string {
    return buildWhatsAppUrl(lead.whatsapp, message);
}
