import Link from 'next/link';
import { Building2, Briefcase, User, FileText, RefreshCw, Landmark } from 'lucide-react';

const audiences = [
    {
        icon: Building2,
        badge: 'e-CNPJ A1',
        title: 'Empresas e CNPJs',
        description:
            'Emita notas fiscais, acesse o e-CAC e assine documentos em nome da sua empresa — sem token físico, tudo no computador.',
    },
    {
        icon: User,
        badge: 'MEI',
        title: 'MEIs e Autônomos',
        description:
            'Cumpra suas obrigações fiscais com o Certificado Digital A1, prático e instalado direto no computador, sem complicação.',
    },
    {
        icon: Briefcase,
        badge: 'e-CPF A1',
        title: 'Profissionais Liberais',
        description:
            'Advogados, médicos, contadores e engenheiros que precisam assinar documentos e acessar sistemas com validade jurídica.',
    },
    {
        icon: FileText,
        badge: 'NF-e A1',
        title: 'Quem precisa emitir NF-e',
        description:
            'Ideal para quem usa ERPs, sistemas de gestão ou plataformas contábeis que exigem certificado para emissão de nota fiscal.',
    },
    {
        icon: Landmark,
        badge: 'e-CAC',
        title: 'Acesso à Receita Federal',
        description:
            'Acesse o portal e-CAC, emita certidões, regularize pendências e acompanhe processos fiscais online com segurança.',
    },
    {
        icon: RefreshCw,
        badge: 'Renovação',
        title: 'Renovação de Certificado',
        description:
            'Certificado vencido ou próximo do vencimento? Facilitamos o processo de renovação do seu Certificado A1 de forma rápida.',
    },
];

const AudienceSection = () => {
    return (
        <section className="bg-white py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-sm font-bold uppercase tracking-wider text-brand-600">
                        Para quem é
                    </span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Para quem é o{' '}
                        <span className="text-brand-600">Certificado Digital A1</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Sem token físico, sem cartão, sem complicação. Arquivo digital instalado
                        direto no computador — ideal para empresas, profissionais e pessoa física.
                    </p>
                </div>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {audiences.map((item) => (
                        <div
                            key={item.title}
                            className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
                        >
                            <div className="flex items-start gap-4">
                                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100">
                                    <item.icon size={22} />
                                </span>
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wide text-brand-500">
                                        {item.badge}
                                    </span>
                                    <h3 className="mt-0.5 text-base font-bold text-slate-900">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                            <p className="mt-4 text-sm leading-relaxed text-slate-600">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <p className="text-sm text-slate-500">
                        Ainda com dúvida sobre qual certificado é o seu?{' '}
                        <Link
                            href="#quiz"
                            className="font-semibold text-brand-600 underline-offset-2 hover:underline"
                        >
                            Faça o teste rápido →
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AudienceSection;
