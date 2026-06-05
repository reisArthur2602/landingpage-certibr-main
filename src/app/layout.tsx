import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
    variable: '--font-manrope',
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'https://www.certibr.com.br';

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),

    title: {
        default: 'certiBR — Certificado Digital sem complicação',
        template: '%s | certiBR',
    },

    description:
        'A certiBR orienta você a escolher o certificado digital ideal (e-CNPJ, e-CPF, A1 ou A3) e faz a ponte com autoridades certificadoras autorizadas ICP-Brasil. Atendimento humano, processo ágil.',

    keywords: [
        'certificado digital',
        'e-CNPJ',
        'e-CPF',
        'certificado digital A1',
        'certificado digital A3',
        'emissão certificado digital',
        'certificado digital para empresa',
        'NF-e certificado',
        'ICP-Brasil',
        'assinatura digital',
        'certiBR',
    ],

    authors: [{ name: 'certiBR', url: baseUrl }],
    creator: 'certiBR',
    publisher: 'certiBR',

    alternates: {
        canonical: '/',
    },

    openGraph: {
        type: 'website',
        url: '/',
        siteName: 'certiBR',
        title: 'certiBR — Certificado Digital sem complicação',
        description:
            'Orientação especializada e intermediação de certificados digitais com parceiros autorizados ICP-Brasil. Fale com um especialista.',
        locale: 'pt_BR',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'certiBR — Certificados Digitais',
            },
        ],
    },

    twitter: {
        card: 'summary_large_image',
        title: 'certiBR — Certificado Digital sem complicação',
        description:
            'Orientação especializada e intermediação de certificados digitais com parceiros autorizados ICP-Brasil.',
        images: ['/og-image.png'],
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1,
        },
    },

    // Descomente e preencha após verificar no Google Search Console
    // verification: {
    //     google: 'SEU_CODIGO_DE_VERIFICACAO',
    // },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" className={`${manrope.variable} h-full antialiased`}>
            <body>{children}</body>
        </html>
    );
}
