// Central configuration for the certiBR landing page.
// Update WhatsApp number / contact details here in one place.

export const WHATSAPP_NUMBER = '5500000000000'; // TODO: substituir pelo número real
export const WHATSAPP_MESSAGE = encodeURIComponent(
    'Olá! Vim pelo site da certiBR e gostaria de uma orientação sobre certificado digital.',
);
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export const NAV_LINKS = [
    { label: 'Início', href: '#inicio' },
    { label: 'Certificados', href: '#certificados' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Vantagens', href: '#vantagens' },
    { label: 'Dúvidas', href: '#duvidas' },
] as const;
