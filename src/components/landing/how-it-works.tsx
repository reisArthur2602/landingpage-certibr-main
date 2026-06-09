import { MessageSquare, Search, FileText, Handshake, LifeBuoy, ShieldCheck } from 'lucide-react';
import { WHATSAPP_URL } from './site-config';

const steps = [
    {
        icon: MessageSquare,
        title: 'Você chama no WhatsApp',
        description:
            'Fale com a gente e conte sobre o seu negócio ou profissão. Sem formulários longos e sem compromisso.',
    },
    {
        icon: Search,
        title: 'Identificamos o certificado ideal',
        description:
            'Analisamos a sua necessidade e indicamos o tipo certo: e-CNPJ, e-CPF, A1 ou A3.',
    },
    {
        icon: FileText,
        title: 'Enviamos valores e documentos necessários',
        description:
            'Você recebe o orçamento e a lista exata de documentos para dar andamento, sem surpresas.',
    },
    {
        icon: Handshake,
        title: 'Fazemos a ponte com parceiro autorizado',
        description:
            'Conectamos você a um parceiro autorizado da cadeia ICP-Brasil, responsável pela emissão.',
    },
    {
        icon: LifeBuoy,
        title: 'Você recebe suporte para instalar e usar',
        description:
            'Acompanhamos a instalação e seguimos à disposição durante toda a vigência do certificado.',
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
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Do primeiro contato ao certificado pronto
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Um processo simples e transparente, conduzido por gente que entende do
                        assunto.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
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
                                <h3 className="mt-5 text-base font-bold text-slate-900">
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Aviso de intermediação (tom positivo) */}
                <div className="mt-12 flex items-start gap-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-6">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
                        <ShieldCheck size={22} />
                    </span>
                    <p className="text-sm leading-relaxed text-slate-700">
                        Atuamos como parceira/intermediadora comercial, conectando você a parceiros
                        autorizados na cadeia ICP-Brasil e acompanhando todo o processo — da escolha
                        à instalação.
                    </p>
                </div>

                <div className="mt-12 flex justify-center">
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
