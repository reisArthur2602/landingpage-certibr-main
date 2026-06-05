'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: 'A certiBR emite o certificado digital?',
        answer: 'Não emitimos o certificado diretamente como autoridade certificadora. A certiBR atua como parceira e intermediadora: orientamos qual é o certificado ideal para o seu caso e fazemos a ponte com autoridades certificadoras autorizadas e credenciadas no padrão ICP-Brasil, que realizam a emissão.',
    },
    {
        question: 'Como funciona a contratação pela certiBR?',
        answer: 'É simples: você entra em contato pelo WhatsApp, conta sobre o seu negócio e nós indicamos o tipo de certificado mais adequado. Em seguida, intermediamos todo o processo de emissão com um parceiro autorizado e acompanhamos você até o certificado estar pronto para uso.',
    },
    {
        question: 'Qual a diferença entre os modelos A1 e A3?',
        answer: 'O modelo A1 é um arquivo digital instalado no computador, com validade de 1 ano e muito prático para o dia a dia. O modelo A3 fica armazenado em um token ou cartão, com mais portabilidade e validade de até 3 anos. Durante a orientação, ajudamos você a escolher o ideal.',
    },
    {
        question: 'Qual certificado eu preciso: e-CNPJ ou e-CPF?',
        answer: 'O e-CNPJ é voltado para empresas (assinatura de documentos, emissão de notas fiscais e acesso a portais do governo em nome da empresa). O e-CPF é para pessoas físicas e profissionais. Na orientação gratuita, identificamos qual atende a sua necessidade.',
    },
    {
        question: 'Preciso de certificado para emitir nota fiscal?',
        answer: 'Sim. Para emitir notas fiscais eletrônicas (NF-e, NFC-e ou NFS-e) é necessário um certificado digital válido. Nós orientamos qual modelo é o mais indicado para o seu tipo de operação.',
    },
    {
        question: 'O atendimento e a orientação têm custo?',
        answer: 'A orientação para escolher o certificado ideal é gratuita e sem compromisso. Você só investe quando decide seguir com a emissão por meio de um dos nossos parceiros autorizados.',
    },
];

const FAQ = () => {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section id="duvidas" className="bg-slate-50 py-20 lg:py-28">
            <div className="mx-auto max-w-3xl px-5 sm:px-8">
                <div className="text-center">
                    <span className="text-sm font-bold uppercase tracking-wider text-brand-600">
                        Dúvidas frequentes
                    </span>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Ainda com perguntas?
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Reunimos as dúvidas mais comuns sobre certificados digitais e a nossa
                        intermediação.
                    </p>
                </div>

                <div className="mt-12 space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = open === index;
                        return (
                            <div
                                key={faq.question}
                                className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                                    isOpen ? 'border-brand-200' : 'border-slate-200'
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpen(isOpen ? null : index)}
                                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                                    aria-expanded={isOpen}
                                >
                                    <span className="text-base font-semibold text-slate-900">
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        size={20}
                                        className={`shrink-0 text-brand-600 transition-transform duration-300 ${
                                            isOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${
                                        isOpen
                                            ? 'grid-rows-[1fr] opacity-100'
                                            : 'grid-rows-[0fr] opacity-0'
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
