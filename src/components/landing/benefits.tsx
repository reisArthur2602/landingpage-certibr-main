import {
    Headset,
    Wallet,
    ShieldCheck,
    Zap,
    UserCheck,
    ThumbsUp,
} from 'lucide-react';

const benefits = [
    {
        icon: Headset,
        title: 'Atendimento humano',
        description:
            'Você fala com gente de verdade, que entende do assunto e responde rápido — sem menus e sem robôs.',
    },
    {
        icon: Wallet,
        title: 'Os melhores preços',
        description:
            'Como intermediadora, negociamos com diversos parceiros e indicamos a opção com o melhor custo-benefício.',
    },
    {
        icon: ShieldCheck,
        title: 'Parceiros autorizados',
        description:
            'A emissão é feita por autoridades certificadoras credenciadas no padrão ICP-Brasil. Total segurança.',
    },
    {
        icon: Zap,
        title: 'Processo ágil',
        description:
            'Reduzimos a burocracia e organizamos cada etapa para que seu certificado saia o quanto antes.',
    },
    {
        icon: UserCheck,
        title: 'Orientação sob medida',
        description:
            'Analisamos o seu caso e indicamos o certificado certo. Nada de pagar por algo que você não precisa.',
    },
    {
        icon: ThumbsUp,
        title: 'Suporte de ponta a ponta',
        description:
            'Acompanhamos da escolha à instalação e seguimos à disposição durante toda a vigência do certificado.',
    },
];

const Benefits = () => {
    return (
        <section
            id="vantagens"
            className="relative overflow-hidden bg-brand-900 py-20 lg:py-28"
        >
            <div className="pointer-events-none absolute -right-32 -top-20 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-32 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-sm font-bold uppercase tracking-wider text-brand-300">
                        Por que a certiBR
                    </span>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        Vantagens de contratar com quem entende
                    </h2>
                    <p className="mt-4 text-lg text-brand-100/80">
                        Somos a ponte entre você e o certificado digital — com orientação honesta e
                        acompanhamento de verdade.
                    </p>
                </div>

                <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {benefits.map((benefit) => (
                        <div
                            key={benefit.title}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10"
                        >
                            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500/20 text-brand-300">
                                <benefit.icon size={24} />
                            </span>
                            <h3 className="mt-4 text-lg font-bold text-white">{benefit.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-brand-100/75">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
