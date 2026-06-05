import Benefits from '@/components/landing/benefits';
import Certificates from '@/components/landing/certificates';
import FAQ from '@/components/landing/faq';
import FinalCTA from '@/components/landing/final-cta';
import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import HowItWorks from '@/components/landing/how-it-works';
import Testimonials from '@/components/landing/testimonials';
import TrustBar from '@/components/landing/trust-bar';
import WhatsAppFloat from '@/components/landing/whatsapp-float';

const LandingPage = () => {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <TrustBar />
                <Certificates />
                <HowItWorks />
                <Benefits />
                <Testimonials />
                <FAQ />
                <FinalCTA />
            </main>
            <Footer />
            <WhatsAppFloat />
        </>
    );
};

export default LandingPage;
