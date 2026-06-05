import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Letícia Vas',
        role: 'Loja de roupas · MEI',
        initials: 'LV',
        text: 'Eu não entendia nada de certificado digital. A certiBR me explicou tudo com paciência e resolveu em pouco tempo. Atendimento excelente!',
    },
    {
        name: 'André Amaral',
        role: 'Escritório de contabilidade',
        initials: 'AA',
        text: 'Indico para todos os meus clientes. Eles cuidam da parte chata e ainda conseguem um preço melhor do que eu encontrava sozinho.',
    },
    {
        name: 'Renan Oliveira',
        role: 'Prestador de serviços',
        initials: 'RO',
        text: 'Precisava do e-CNPJ com urgência para emitir notas. Me orientaram pelo WhatsApp e em pouco tempo estava tudo certo.',
    },
    {
        name: 'Bruna Castro',
        role: 'Distribuidora · Pequena empresa',
        initials: 'BC',
        text: 'O diferencial é o suporte. Sempre que tive dúvida na instalação, alguém me respondeu na hora. Recomendo demais.',
    },
];

const Testimonials = () => {
    return (
        <section className="bg-white py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="mb-3 flex justify-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={20} className="fill-brand-500 text-brand-500" />
                        ))}
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Quem já contou com a certiBR{' '}
                        <span className="text-brand-600">recomenda</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Empreendedores que simplificaram a vida com a nossa intermediação.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {testimonials.map((t) => (
                        <figure
                            key={t.name}
                            className="flex flex-col rounded-3xl border border-slate-100 bg-slate-50/60 p-6 transition-all hover:border-brand-200 hover:bg-white hover:shadow-lg hover:shadow-brand-900/5"
                        >
                            <Quote className="text-brand-300" size={28} />
                            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">
                                “{t.text}”
                            </blockquote>
                            <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                                <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">
                                    {t.initials}
                                </span>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">{t.name}</p>
                                    <p className="text-xs text-slate-500">{t.role}</p>
                                </div>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
