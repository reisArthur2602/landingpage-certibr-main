'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: 'O que é Certificado Digital A1?',
        answer: 'O Certificado Digital A1 é um arquivo digital instalado diretamente no computador ou smartphone, sem necessidade de token ou cartão físico. Ele tem validade de 1 ano e é aceito por órgãos públicos, bancos, sistemas fiscais e cartórios em todo o Brasil.',
    },
    {
        question: 'Qual certificado serve para emitir nota fiscal?',
        answer: 'Para emitir notas fiscais eletrônicas (NF-e, NFC-e ou NFS-e) normalmente se usa o e-CNPJ A1 (para empresas) ou o NF-e A1. Dependendo do seu sistema de gestão ou ERP, pode ser necessário o e-CPF A1. Analisamos a sua operação e indicamos a opção correta antes da compra.',
    },
    {
        question: 'Preciso de e-CPF ou e-CNPJ?',
        answer: 'O e-CNPJ A1 representa a empresa (emitir notas, acessar a Receita/e-CAC e assinar documentos em nome da empresa). O e-CPF A1 representa a pessoa física — ideal para profissionais liberais. Na orientação gratuita, identificamos qual atende o seu caso.',
    },
    {
        question: 'Vocês vendem A3, token ou cartão?',
        answer: 'Não. O foco da certiBR é exclusivamente o Certificado Digital A1, que é um arquivo digital instalado no computador — sem necessidade de token físico, cartão ou leitora. É a solução mais prática para a grande maioria dos casos.',
    },
    {
        question: 'Vocês são uma Autoridade Certificadora?',
        answer: 'Não. Atuamos como intermediadora/parceira comercial, auxiliando na escolha, no atendimento e no acompanhamento de todo o processo. A emissão do certificado é feita por parceiros autorizados dentro da cadeia ICP-Brasil.',
    },
    {
        question: 'Quais documentos preciso enviar?',
        answer: 'Depende do tipo de certificado (e-CPF A1 ou e-CNPJ A1) e do seu perfil. Após entender o seu caso, enviamos a lista exata de documentos necessários pelo WhatsApp, sem você precisar adivinhar nada.',
    },
    {
        question: 'Consigo fazer o processo online?',
        answer: 'Em muitos casos sim, com validação por videoconferência, dependendo do parceiro responsável pela emissão. Verificamos a melhor forma para o seu caso e te orientamos passo a passo.',
    },
    {
        question: 'Vocês ajudam na instalação?',
        answer: 'Sim. Depois da emissão, orientamos a instalação e o uso do Certificado A1 no seu computador e seguimos à disposição para tirar dúvidas durante toda a vigência.',
    },
    {
        question: 'Quanto tempo demora?',
        answer: 'O prazo varia conforme a disponibilidade dos seus documentos e o agendamento da validação. Assim que entendemos a sua urgência, passamos uma estimativa realista para o seu caso.',
    },
    {
        question: 'O certificado tem validade jurídica?',
        answer: 'Sim. Certificados digitais emitidos dentro do padrão ICP-Brasil têm validade jurídica e são aceitos por órgãos públicos, bancos, cartórios e sistemas oficiais em todo o Brasil.',
    },
    {
        question: 'Como funciona o pagamento?',
        answer: 'Após entender a sua necessidade, enviamos os valores e as formas de pagamento disponíveis pelo WhatsApp. Tudo é informado de forma transparente antes de você decidir seguir.',
    },
    {
        question: 'Posso renovar meu certificado com vocês?',
        answer: 'Sim! Se o seu Certificado Digital A1 está vencido ou próximo do vencimento, podemos ajudar na renovação. Entre em contato pelo WhatsApp e orientamos o processo de forma rápida e simples.',
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
