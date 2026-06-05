import Link from 'next/link';
import { MessageCircle, ShieldCheck, Star, Clock, Lock } from 'lucide-react';
import { WHATSAPP_URL } from './site-config';

const Hero = () => {
    return (
        <section
            id="inicio"
            className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white pt-28 pb-20 sm:pt-32 lg:pb-28"
        >
            <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 top-40 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-8">
                <div className="animate-fade-up">
                    <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">
                        <ShieldCheck size={15} />
                        Parceira oficial de autoridades certificadoras
                    </span>

                    <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]">
                        O certificado digital{' '}
                        <span className="text-brand-600">ideal para sua empresa</span>, sem
                        complicação
                    </h1>

                    <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
                        A certiBR orienta você a escolher o certificado certo e faz a ponte com
                        autoridades certificadoras autorizadas. Atendimento humano, do primeiro
                        contato até a emissão.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/30"
                        >
                            <MessageCircle size={19} />
                            Falar com um especialista
                        </a>
                        <Link
                            href="#certificados"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
                        >
                            Ver certificados
                        </Link>
                    </div>

                    <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-2">
                            <Clock size={16} className="text-brand-600" />
                            Emissão ágil
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <Lock size={16} className="text-brand-600" />
                            Padrão ICP-Brasil
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <Star size={16} className="text-brand-600 fill-brand-600" />
                            Atendimento nota 10
                        </span>
                    </div>
                </div>

                <div className="relative animate-fade-up [animation-delay:120ms]">
                    <div className="relative mx-auto max-w-md rounded-3xl border border-brand-100 bg-white p-6 shadow-2xl shadow-brand-900/10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-600 text-white">
                                    <ShieldCheck size={24} />
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        Certificado e-CNPJ
                                    </p>
                                    <p className="text-xs text-slate-500">Modelo A1 · 12 meses</p>
                                </div>
                            </div>
                            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                                Ativo
                            </span>
                        </div>

                        <div className="mt-6 space-y-3">
                            {[
                                'Validação simplificada',
                                'Emissão com parceiro autorizado',
                                'Suporte durante toda a vigência',
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                                >
                                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                                        <ShieldCheck size={14} />
                                    </span>
                                    {item}
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 rounded-2xl bg-brand-600 px-5 py-4 text-white">
                            <p className="text-xs font-medium text-brand-50/90">
                                Orientação gratuita
                            </p>
                            <p className="text-lg font-bold">
                                Descubra o certificado certo para você
                            </p>
                        </div>
                    </div>

                    <div className="absolute -left-4 bottom-6 hidden animate-float rounded-2xl border border-brand-100 bg-white px-4 py-3 shadow-xl sm:block">
                        <p className="text-2xl font-extrabold text-brand-600">+5 mil</p>
                        <p className="text-xs text-slate-500">empresas orientadas</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
