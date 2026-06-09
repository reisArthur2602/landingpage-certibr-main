import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
import './globals.css';

// Sora (variável) para títulos — tom tech/SaaS. Usada com pesos 600/700.
const sora = Sora({
    variable: '--font-sora',
    subsets: ['latin'],
    display: 'swap',
});

// Inter (variável) para textos, botões, cards, formulários, FAQ e navegação.
const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
    display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'https://www.certibr.com.br';

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),

    title: {
        default: 'Certificado Digital A1 e A3 com Suporte | certiBR',
        template: '%s | certiBR',
    },

    description:
        'Compre certificado digital A1, A3, e-CNPJ ou e-CPF com orientação completa, atendimento pelo WhatsApp e suporte na instalação.',

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
        title: 'Certificado Digital A1 e A3 com Suporte | certiBR',
        description:
            'Compre certificado digital A1, A3, e-CNPJ ou e-CPF com orientação completa, atendimento pelo WhatsApp e suporte na instalação.',
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
        title: 'Certificado Digital A1 e A3 com Suporte | certiBR',
        description:
            'Compre certificado digital A1, A3, e-CNPJ ou e-CPF com orientação completa, atendimento pelo WhatsApp e suporte na instalação.',
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
        <html
            lang="pt-BR"
            className={`${sora.variable} ${inter.variable} h-full antialiased`}
        >
            <body>{children}</body>
        </html>
    );
}
