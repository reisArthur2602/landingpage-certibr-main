import { Building2, User, FileText, HardDrive, Cloud, ArrowRight } from 'lucide-react';
import { WHATSAPP_URL } from './site-config';

const certificates = [
    {
        icon: Building2,
        tag: 'Pessoa Jurídica',
        title: 'e-CNPJ',
        description:
            'Para empresas assinarem documentos, emitirem notas fiscais e acessarem portais do governo com validade jurídica.',
    },
    {
        icon: User,
        tag: 'Pessoa Física',
        title: 'e-CPF',
        description:
            'Para profissionais e autônomos assinarem digitalmente e acessarem serviços da Receita com segurança.',
    },
    {
        icon: FileText,
        tag: 'Fiscal',
        title: 'NF-e / NFC-e',
        description:
            'Certificado voltado à emissão de notas fiscais eletrônicas, ideal para quem vende produtos e serviços.',
    },
];

const models = [
    {
        icon: HardDrive,
        title: 'Modelo A1',
        description:
            'Arquivo digital instalado no computador. Prático, sem mídia física e fácil de usar no dia a dia.',
    },
    {
        icon: Cloud,
        title: 'Modelo A3',
        description:
            'Armazenado em token ou cartão, com mais portabilidade e validade de até 3 anos.',
    },
];

const Certificates = () => {
    return (
        <section id="certificados" className="bg-slate-50 py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-sm font-bold uppercase tracking-wider text-brand-600">
                        Certificados
                    </span>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Encontramos o certificado{' '}
                        <span className="text-brand-600">certo para você</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Cada negócio tem uma necessidade. Nós orientamos qual modelo faz sentido e
                        intermediamos a emissão com parceiros autorizados.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-3">
                    {certificates.map((cert) => (
                        <div
                            key={cert.title}
                            className="group flex flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5"
                        >
                            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                                <cert.icon size={26} />
                            </span>
                            <span className="mt-5 text-xs font-semibold uppercase tracking-wide text-brand-600">
                                {cert.tag}
                            </span>
                            <h3 className="mt-1 text-xl font-bold text-slate-900">{cert.title}</h3>
                            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                                {cert.description}
                            </p>
                            <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
                            >
                                Solicitar orientação
                                <ArrowRight
                                    size={16}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </a>
                        </div>
                    ))}
                </div>

                {/* A1 vs A3 */}
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {models.map((model) => (
                        <div
                            key={model.title}
                            className="flex items-start gap-5 rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50/60 to-white p-7"
                        >
                            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-brand-600 shadow-sm">
                                <model.icon size={24} />
                            </span>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">{model.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                    {model.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certificates;
