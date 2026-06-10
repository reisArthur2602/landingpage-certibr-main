import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
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
        default: 'Certificado Digital A1 com Suporte | certiBR',
        template: '%s | certiBR',
    },

    description:
        'Compre Certificado Digital A1, e-CNPJ A1, e-CPF A1 ou NF-e A1 com orientação completa, atendimento pelo WhatsApp e suporte na instalação.',

    keywords: [
        'certificado digital A1',
        'e-CNPJ A1',
        'e-CPF A1',
        'NF-e A1',
        'certificado digital',
        'emissão certificado digital',
        'certificado digital para empresa',
        'renovação certificado digital',
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
        title: 'Certificado Digital A1 com Suporte | certiBR',
        description:
            'Compre Certificado Digital A1, e-CNPJ A1, e-CPF A1 ou NF-e A1 com orientação completa, atendimento pelo WhatsApp e suporte na instalação.',
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
        title: 'Certificado Digital A1 com Suporte | certiBR',
        description:
            'Compre Certificado Digital A1, e-CNPJ A1, e-CPF A1 ou NF-e A1 com orientação completa, atendimento pelo WhatsApp e suporte na instalação.',
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
        <html lang="pt-BR" className={`${sora.className} ${inter.className} h-full antialiased`}>
            <body>{children}</body>
        </html>
    );
}
