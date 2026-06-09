// Rastreamento de conversão sem dependências obrigatórias.
// Dispara o evento no Google Analytics (gtag) e/ou Meta Pixel (fbq) se existirem.
// Nunca quebra a página caso nenhum esteja instalado.

export type AnalyticsEvent =
    | 'click_whatsapp_hero'
    | 'click_quiz_start'
    | 'submit_quiz_whatsapp'
    | 'click_certificate_card'
    | 'click_whatsapp_floating';

interface AnalyticsWindow {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
}

export function trackEvent(
    event: AnalyticsEvent,
    params: Record<string, unknown> = {},
): void {
    if (typeof window === 'undefined') return;

    const w = window as unknown as AnalyticsWindow;

    try {
        if (typeof w.gtag === 'function') {
            w.gtag('event', event, params);
        }
        if (typeof w.fbq === 'function') {
            w.fbq('trackCustom', event, params);
        }
    } catch {
        // Silencioso de propósito: analytics nunca deve quebrar a UX.
    }
}
