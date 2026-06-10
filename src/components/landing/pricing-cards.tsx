'use client';

import { ArrowRight, HelpCircle } from 'lucide-react';
import { CERTIFICATES, buildWhatsAppUrl } from './site-config';
import { trackEvent } from './analytics';

const PricingCards = () => {
    const goToQuiz = () => {
        trackEvent('click_unknown_certificate', { source: 'pricing_cards' });
        document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="certificados" className="bg-slate-50 py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-sm font-bold uppercase tracking-wider text-brand-600">
                        Certificados
                    </span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Escolha o certificado{' '}
                        <span className="text-brand-600">ideal para você</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Selecione uma opção e fale com a gente, ou faça o teste rápido se ainda
                        estiver em dúvida.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {CERTIFICATES.map((cert) => (
                        <div
                            key={cert.id}
                            className={`group flex flex-col rounded-3xl border bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/5 ${
                                cert.highlight
                                    ? 'border-brand-300 ring-1 ring-brand-200'
                                    : 'border-slate-100 hover:border-brand-200'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
                                    {cert.badge}
                                </span>
                                {cert.highlight && (
                                    <span className="text-xs font-bold text-brand-600">
                                        Mais procurado
                                    </span>
                                )}
                            </div>

                            <h3 className="mt-4 text-2xl font-bold text-slate-900">
                                {cert.name}
                            </h3>
                            <p className="mt-1 text-sm font-semibold text-brand-700">
                                {cert.price}
                            </p>
                            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                                {cert.description}
                            </p>

                            <a
                                href={buildWhatsAppUrl(cert.whatsappMessage)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() =>
                                    trackEvent('click_certificate_card', { certificate: cert.id })
                                }
                                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                            >
                                Comprar pelo WhatsApp
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    ))}

                    {/* Card especial: não sei qual escolher -> rola para o quiz */}
                    <div className="flex flex-col rounded-3xl border-2 border-dashed border-brand-300 bg-brand-50/40 p-7">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 text-brand-700">
                            <HelpCircle size={24} />
                        </span>
                        <h3 className="mt-4 text-2xl font-bold text-slate-900">
                            Não sei qual escolher
                        </h3>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                            Receba orientação gratuita antes de comprar. Respondendo 4 perguntas
                            rápidas, indicamos o certificado certo para o seu caso.
                        </p>
                        <button
                            type="button"
                            onClick={goToQuiz}
                            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-600 px-5 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-600 hover:text-white"
                        >
                            Fazer o teste rápido
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default PricingCards;
