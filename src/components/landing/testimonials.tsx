import { Quote } from 'lucide-react';

// NOTE: depoimentos ilustrativos — substitua pelos relatos reais dos seus clientes.
// Para preservar a credibilidade, evitamos nomes completos e números não verificados.
const testimonials = [
    {
        segment: 'Microempreendedor (MEI)',
        text: 'Eu não entendia nada de certificado digital. Me explicaram tudo com paciência e indicaram o modelo certo para emitir minhas notas.',
    },
    {
        segment: 'Escritório de contabilidade',
        text: 'Encaminho meus clientes e o atendimento resolve a parte burocrática. Facilita muito o nosso dia a dia.',
    },
    {
        segment: 'Profissional liberal',
        text: 'Precisava do e-CPF e estava perdido entre A1 e A3. A orientação pelo WhatsApp deixou a escolha simples.',
    },
    {
        segment: 'Pequena empresa',
        text: 'O diferencial foi o suporte na instalação. Sempre que tive dúvida, fui atendido rápido.',
    },
];

const Testimonials = () => {
    return (
        <section id="depoimentos" className="bg-white py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-sm font-bold uppercase tracking-wider text-brand-600">
                        Quem já foi atendido
                    </span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Histórias de quem simplificou{' '}
                        <span className="text-brand-600">com a nossa ajuda</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Empresas, MEIs e profissionais que contaram com orientação do início ao fim.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {testimonials.map((t) => (
                        <figure
                            key={t.segment}
                            className="flex flex-col rounded-3xl border border-slate-100 bg-slate-50/60 p-6 transition-all hover:border-brand-200 hover:bg-white hover:shadow-lg hover:shadow-brand-900/5"
                        >
                            <Quote className="text-brand-300" size={28} />
                            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">
                                “{t.text}”
                            </blockquote>
                            <figcaption className="mt-5 border-t border-slate-100 pt-4 text-sm font-bold text-slate-900">
                                {t.segment}
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
