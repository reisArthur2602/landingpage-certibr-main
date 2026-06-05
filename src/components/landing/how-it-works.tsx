import { MessageSquare, Lightbulb, Handshake, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_URL } from './site-config';

const steps = [
    {
        icon: MessageSquare,
        title: 'Você entra em contato',
        description:
            'Fale com a gente pelo WhatsApp e conte sobre o seu negócio. Sem formulários longos e sem compromisso.',
    },
    {
        icon: Lightbulb,
        title: 'Recebe orientação especializada',
        description:
            'Indicamos o tipo de certificado ideal (e-CNPJ, e-CPF, A1 ou A3) de acordo com a sua necessidade real.',
    },
    {
        icon: Handshake,
        title: 'Intermediamos a emissão',
        description:
            'Fazemos a ponte com uma autoridade certificadora autorizada e acompanhamos todo o processo até o fim.',
    },
    {
        icon: CheckCircle2,
        title: 'Certificado pronto para usar',
        description:
            'Você recebe orientação para instalar e usar, com nosso suporte disponível durante toda a vigência.',
    },
];

const HowItWorks = () => {
    return (
        <section id="como-funciona" className="bg-white py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-sm font-bold uppercase tracking-wider text-brand-600">
                        Como funciona
                    </span>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Simples do começo ao fim
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        A certiBR cuida da parte burocrática. Você só precisa nos dizer o que
                        precisa.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <div key={step.title} className="relative">
                            <div className="flex flex-col items-start">
                                <div className="relative">
                                    <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/25">
                                        <step.icon size={28} />
                                    </span>
                                    <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-brand-900 text-xs font-bold text-white">
                                        {index + 1}
                                    </span>
                                </div>
                                <h3 className="mt-5 text-lg font-bold text-slate-900">
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                    {step.description}
                                </p>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="absolute right-0 top-8 hidden h-px w-8 translate-x-full bg-brand-200 lg:block" />
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-14 flex justify-center">
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 hover:shadow-xl"
                    >
                        Começar agora
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
