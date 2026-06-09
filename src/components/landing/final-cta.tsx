import { MessageCircle, ShieldCheck } from 'lucide-react';
import { WHATSAPP_URL } from './site-config';

const FinalCTA = () => {
    return (
        <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
            <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-14 text-center shadow-2xl shadow-brand-900/20 sm:px-12 lg:py-20">
                <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-brand-900/30 blur-2xl" />

                <div className="relative">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white">
                        <ShieldCheck size={15} />
                        Orientação gratuita e sem compromisso
                    </span>
                    <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Pronto para ter o certificado digital certo para o seu negócio?
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-lg text-brand-50/90">
                        Fale agora com um especialista da certiBR. A gente te orienta e cuida de toda
                        a intermediação com os parceiros autorizados.
                    </p>
                    <div className="mt-9 flex justify-center">
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-brand-700 shadow-lg transition-all hover:scale-[1.02] hover:bg-brand-50"
                        >
                            <MessageCircle size={20} />
                            Falar com um especialista
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;
