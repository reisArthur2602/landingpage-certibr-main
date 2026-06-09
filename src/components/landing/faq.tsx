'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: 'Qual a diferença entre A1 e A3?',
        answer: 'O A1 é um arquivo digital instalado no computador, prático para o dia a dia e com validade de 1 ano. O A3 fica armazenado em token ou cartão (mídia física), com mais portabilidade e validade de até 3 anos. Na orientação, ajudamos você a escolher o mais adequado.',
    },
    {
        question: 'Qual certificado serve para emitir nota fiscal?',
        answer: 'Para emitir notas fiscais eletrônicas (NF-e, NFC-e ou NFS-e) normalmente se usa o e-CNPJ. Dependendo do seu caso, o e-CPF também pode atender. Analisamos a sua operação e indicamos a opção correta antes da compra.',
    },
    {
        question: 'Preciso de e-CPF ou e-CNPJ?',
        answer: 'O e-CNPJ representa a empresa (emitir notas, acessar a Receita/e-CAC e assinar documentos em nome da empresa). O e-CPF representa a pessoa física, ideal para profissionais liberais. Na orientação gratuita, identificamos qual atende você.',
    },
    {
        question: 'Vocês são uma Autoridade Certificadora?',
        answer: 'Não. Atuamos como intermediadora/parceira comercial, auxiliando na escolha, no atendimento e no acompanhamento de todo o processo. A emissão do certificado é feita por parceiros autorizados dentro da cadeia ICP-Brasil.',
    },
    {
        question: 'Quais documentos preciso enviar?',
        answer: 'Depende do tipo de certificado (e-CPF ou e-CNPJ) e do seu perfil. Após entender o seu caso, enviamos a lista exata de documentos necessários pelo WhatsApp, sem você precisar adivinhar nada.',
    },
    {
        question: 'Consigo fazer o processo online?',
        answer: 'Em muitos casos sim, com validação por videoconferência, dependendo do tipo de certificado e do parceiro responsável pela emissão. Verificamos a melhor forma para o seu caso e te orientamos passo a passo.',
    },
    {
        question: 'Vocês ajudam na instalação?',
        answer: 'Sim. Depois da emissão, orientamos a instalação e o uso do certificado e seguimos à disposição para tirar dúvidas durante a vigência.',
    },
    {
        question: 'Quanto tempo demora?',
        answer: 'O prazo varia conforme o tipo de certificado, a disponibilidade dos seus documentos e o agendamento da validação. Assim que entendemos a sua urgência, passamos uma estimativa realista para o seu caso.',
    },
    {
        question: 'O certificado tem validade jurídica?',
        answer: 'Sim. Certificados digitais emitidos dentro do padrão ICP-Brasil têm validade jurídica e são aceitos por órgãos públicos, bancos e sistemas oficiais.',
    },
    {
        question: 'Como funciona o pagamento?',
        answer: 'Após entender a sua necessidade, enviamos os valores e as formas de pagamento disponíveis pelo WhatsApp. Tudo é informado de forma transparente antes de você decidir seguir.',
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
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
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
