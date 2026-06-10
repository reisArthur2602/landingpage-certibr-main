import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import AudienceSection from '@/components/landing/audience-section';
import CertificateQuiz from '@/components/landing/certificate-quiz';
import PricingCards from '@/components/landing/pricing-cards';
import HowItWorks from '@/components/landing/how-it-works';
import Benefits from '@/components/landing/benefits';
import Testimonials from '@/components/landing/testimonials';
import FAQ from '@/components/landing/faq';
import FinalCTA from '@/components/landing/final-cta';
import Footer from '@/components/landing/footer';
import WhatsAppFloat from '@/components/landing/whatsapp-float';

const LandingPage = () => {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <AudienceSection />
                <CertificateQuiz />
                <PricingCards />
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
