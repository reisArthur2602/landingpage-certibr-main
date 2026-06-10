'use client';

import { ArrowLeft, Check, MessageCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { trackEvent } from './analytics';
import { buildWhatsAppUrl } from './site-config';

type StepKey = 'tipo' | 'uso' | 'situacao' | 'urgencia';

interface QuizStep {
    key: StepKey;
    question: string;
    options: string[];
}

const QUIZ_STEPS: QuizStep[] = [
    {
        key: 'tipo',
        question: 'O certificado será para quem?',
        options: ['Empresa / CNPJ', 'Pessoa física / CPF', 'Não sei'],
    },
    {
        key: 'uso',
        question: 'Você precisa para quê?',
        options: [
            'Emitir nota fiscal',
            'Acessar Receita Federal / e-CAC',
            'Assinar documentos',
            'Meu contador pediu',
            'Renovar certificado vencido',
            'Não sei',
        ],
    },
    {
        key: 'situacao',
        question: 'Você já teve certificado digital antes?',
        options: ['Sim, quero renovar', 'Não, será o primeiro', 'Não sei'],
    },
    {
        key: 'urgencia',
        question: 'Qual sua urgência?',
        options: ['Preciso hoje', 'Preciso essa semana', 'Estou pesquisando'],
    },
];

const TOTAL_STEPS = QUIZ_STEPS.length + 1; // 4 perguntas + etapa de contato

type Answers = Partial<Record<StepKey, string>>;

const CertificateQuiz = () => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Answers>({});
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [started, setStarted] = useState(false);

    const isContactStep = step === QUIZ_STEPS.length;
    const progress = ((step + (isContactStep ? 1 : 0)) / TOTAL_STEPS) * 100;

    const handleSelect = (key: StepKey, value: string) => {
        if (!started) {
            trackEvent('click_quiz_start', { source: 'quiz_section' });
            setStarted(true);
        }
        setAnswers((prev) => ({ ...prev, [key]: value }));
        setStep((s) => s + 1);
    };

    const goBack = () => setStep((s) => Math.max(0, s - 1));

    const canSubmit = name.trim().length > 1 && phone.trim().length >= 8;

    const handleSubmit = () => {
        const lines = [
            `Olá! Me chamo ${name.trim()} e vim pelo site da certiBR. 😊`,
            '',
            'Preciso de ajuda com Certificado Digital A1. Preenchi o teste rápido:',
            '',
            `🏢 Certificado para: ${answers.tipo ?? '-'}`,
            `📋 Vou usar para: ${answers.uso ?? '-'}`,
            `📄 Situação: ${answers.situacao ?? '-'}`,
            `⏰ Urgência: ${answers.urgencia ?? '-'}`,
            '',
            `📱 Meu WhatsApp: ${phone.trim()}`,
            '',
            'Pode me ajudar?',
        ];

        trackEvent('submit_quiz_whatsapp', { ...answers });
        window.open(buildWhatsAppUrl(lines.join('\n')), '_blank', 'noopener,noreferrer');
    };

    const current = QUIZ_STEPS[step];

    return (
        <section
            id="quiz"
            className="scroll-mt-20 bg-linear-to-br from-brand-700 to-brand-900 py-20 lg:py-28"
        >
            <div className="mx-auto max-w-3xl px-5 sm:px-8">
                <div className="text-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white">
                        <Sparkles size={15} />
                        Teste rápido e gratuito
                    </span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Descubra qual Certificado A1 você precisa em 30 segundos
                    </h2>
                    <p className="mt-3 text-lg text-brand-100/85">
                        Responda algumas perguntas rápidas e receba orientação pelo WhatsApp.
                    </p>
                </div>

                <div className="mt-10 rounded-3xl bg-white p-6 shadow-2xl shadow-brand-950/30 sm:p-8">
                    {/* Progresso */}
                    <div className="mb-6">
                        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500">
                            <span>
                                Etapa {Math.min(step + 1, TOTAL_STEPS)} de {TOTAL_STEPS}
                            </span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                            <div
                                className="h-full rounded-full bg-brand-600 transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {!isContactStep && current ? (
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">{current.question}</h3>
                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                {current.options.map((option) => {
                                    const selected = answers[current.key] === option;
                                    return (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => handleSelect(current.key, option)}
                                            className={`flex min-h-14 items-center justify-between gap-3 rounded-2xl border-2 px-5 py-4 text-left text-sm font-semibold transition-all active:scale-[0.99] ${
                                                selected
                                                    ? 'border-brand-600 bg-brand-50 text-brand-800'
                                                    : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50/50'
                                            }`}
                                        >
                                            {option}
                                            <span
                                                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                                                    selected
                                                        ? 'border-brand-600 bg-brand-600 text-white'
                                                        : 'border-slate-300 text-transparent'
                                                }`}
                                            >
                                                <Check size={14} />
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {step > 0 && (
                                <button
                                    type="button"
                                    onClick={goBack}
                                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-brand-700"
                                >
                                    <ArrowLeft size={16} />
                                    Voltar
                                </button>
                            )}
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">
                                Quase lá! Para onde enviamos sua orientação?
                            </h3>
                            <p className="mt-2 text-sm text-slate-500">
                                Preencha seus dados e abriremos o WhatsApp com tudo já preenchido.
                            </p>

                            <div className="mt-5 space-y-4">
                                <div>
                                    <label
                                        htmlFor="quiz-name"
                                        className="mb-1.5 block text-sm font-semibold text-slate-700"
                                    >
                                        Nome
                                    </label>
                                    <input
                                        id="quiz-name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Seu nome"
                                        autoComplete="name"
                                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3.5 text-base text-slate-900 outline-none transition-colors focus:border-brand-500"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="quiz-phone"
                                        className="mb-1.5 block text-sm font-semibold text-slate-700"
                                    >
                                        WhatsApp
                                    </label>
                                    <input
                                        id="quiz-phone"
                                        type="tel"
                                        inputMode="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="(00) 00000-0000"
                                        autoComplete="tel"
                                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3.5 text-base text-slate-900 outline-none transition-colors focus:border-brand-500"
                                    />
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={!canSubmit}
                                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <MessageCircle size={19} />
                                Receber orientação no WhatsApp
                            </button>

                            <button
                                type="button"
                                onClick={goBack}
                                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-brand-700"
                            >
                                <ArrowLeft size={16} />
                                Voltar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CertificateQuiz;
