import { Headset, Compass, Download, MessageCircle, Users, ShieldAlert, Laptop, FileText, Clock } from 'lucide-react';

const benefits = [
    {
        icon: Headset,
        title: 'Atendimento humano',
        description:
            'Você fala com gente de verdade, que entende do assunto e responde rápido — sem menus e sem robôs.',
    },
    {
        icon: Compass,
        title: 'Ajuda para escolher o certificado certo',
        description:
            'Analisamos o seu caso e indicamos exatamente o tipo de Certificado A1 que você precisa.',
    },
    {
        icon: Download,
        title: 'Suporte na instalação',
        description:
            'Não te deixamos na mão depois da compra: orientamos a instalação e o uso passo a passo.',
    },
    {
        icon: MessageCircle,
        title: 'Processo simples pelo WhatsApp',
        description:
            'Tudo resolvido pelo WhatsApp, sem deslocamento e sem burocracia desnecessária.',
    },
    {
        icon: Laptop,
        title: 'Sem token físico',
        description:
            'O Certificado Digital A1 é um arquivo digital instalado no computador — sem comprar token ou cartão.',
    },
    {
        icon: FileText,
        title: 'Ideal para emissão de nota fiscal',
        description:
            'Garanta a emissão de notas fiscais eletrônicas com o certificado correto para a sua operação.',
    },
    {
        icon: Users,
        title: 'Perfeito para empresas, MEIs e profissionais',
        description:
            'Atendemos desde MEIs e autônomos até empresas e profissionais liberais como advogados e médicos.',
    },
    {
        icon: ShieldAlert,
        title: 'Evite comprar o certificado errado',
        description:
            'Orientação antes da compra para você não gastar com um certificado que não atende ao seu objetivo.',
    },
    {
        icon: Clock,
        title: 'Acompanhamento até o certificado pronto',
        description:
            'Seguimos ao seu lado da escolha à instalação, até o certificado estar funcionando corretamente.',
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
                        Por que comprar com a gente
                    </span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Mais do que vender: a gente te orienta
                    </h2>
                    <p className="mt-4 text-lg text-brand-100/80">
                        Cuidamos da escolha, da compra e da instalação para você não ter dor de
                        cabeça.
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
