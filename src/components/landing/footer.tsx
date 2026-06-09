import Link from 'next/link';
import { ShieldCheck, Mail, MessageCircle, MapPin } from 'lucide-react';
import { NAV_LINKS, WHATSAPP_URL, CONTACT_EMAIL } from './site-config';

const socials = [
    {
        label: 'Instagram',
        path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm6.41-10.4a1.44 1.44 0 11-1.44-1.44 1.44 1.44 0 011.44 1.44z',
    },
    {
        label: 'Facebook',
        path: 'M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z',
    },
    {
        label: 'LinkedIn',
        path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z',
    },
];

const certLinks = ['e-CNPJ A1', 'e-CPF A1', 'e-CNPJ A3', 'e-CPF A3'];

const Footer = () => {
    return (
        <footer className="bg-brand-950 text-brand-100/80">
            <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Link
                            href="#inicio"
                            className="flex items-center gap-2 font-bold text-white"
                        >
                            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white">
                                <ShieldCheck size={20} />
                            </span>
                            <span className="text-xl">
                                certi<span className="text-brand-400">BR</span>
                            </span>
                        </Link>
                        <p className="mt-4 max-w-xs text-sm leading-relaxed">
                            Parceira e intermediadora na contratação de certificados digitais.
                            Orientamos e conectamos você a autoridades certificadoras autorizadas.
                        </p>
                        <div className="mt-5 flex gap-3">
                            {socials.map((social) => (
                                <a
                                    key={social.label}
                                    href="#"
                                    aria-label={social.label}
                                    className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-600"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="17"
                                        height="17"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d={social.path} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                            Navegação
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                            Certificados
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm">
                            {certLinks.map((item) => (
                                <li key={item}>
                                    <a
                                        href={WHATSAPP_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors hover:text-white"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                            Contato
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm">
                            <li>
                                <a
                                    href={WHATSAPP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 transition-colors hover:text-white"
                                >
                                    <MessageCircle size={16} className="text-brand-400" />
                                    Falar no WhatsApp
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    className="flex items-center gap-3 transition-colors hover:text-white"
                                >
                                    <Mail size={16} className="text-brand-400" />
                                    {CONTACT_EMAIL}
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={16} className="mt-0.5 text-brand-400" />
                                Atendimento em todo o Brasil
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-brand-100/60 sm:flex-row">
                    <p>© {new Date().getFullYear()} certiBR. Todos os direitos reservados.</p>
                    <p className="max-w-md text-center sm:text-right">
                        A certiBR é intermediadora e não emite certificados como autoridade
                        certificadora. A emissão é realizada por parceiros autorizados ICP-Brasil.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
