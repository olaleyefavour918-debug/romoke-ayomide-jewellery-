import { useEffect, useRef, useState } from 'react';

type Section = 'home' | 'about' | 'services' | 'contact';

const WHATSAPP_NUMBER = '2349152313648';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
const PHONE_DISPLAY = '09152313648';
const PHONE_TEL = 'tel:+2349152313648';
const TIKTOK_LINK = 'https://vm.tiktok.com/ZS9M6cPgpXsLs-uo7tX/';

// ---------- Scroll reveal hook ----------
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

// ---------- Reveal wrapper ----------
function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ---------- Navbar ----------
function Navbar({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links: { label: string; section: Section }[] = [
    { label: 'Home', section: 'home' },
    { label: 'About', section: 'about' },
    { label: 'Services', section: 'services' },
    { label: 'Contact', section: 'contact' },
  ];

  const go = (s: Section) => {
    onNavigate(s);
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink/95 backdrop-blur-md shadow-luxe py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        <button
          onClick={() => go('home')}
          className="flex items-center gap-2 group"
        >
          <span className="w-9 h-9 rounded-full border-2 border-gold flex items-center justify-center text-gold font-display font-bold text-sm group-hover:rotate-12 transition-transform duration-500">
            R
          </span>
          <span className="font-display font-semibold text-white text-sm sm:text-base tracking-wide leading-tight text-left">
            Romoke Ayomide
            <span className="block text-gold text-[0.65rem] sm:text-xs font-normal tracking-widest uppercase">
              Jewellery Collection
            </span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.section}
              onClick={() => go(l.section)}
              className="text-white/90 hover:text-gold text-sm font-medium tracking-wide transition-colors duration-300 relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </button>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold hover:bg-gold-light text-ink px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-gold hover:scale-105"
          >
            WhatsApp
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`h-0.5 bg-gold transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`h-0.5 bg-gold transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-0.5 bg-gold transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="bg-ink/98 backdrop-blur-md px-5 py-6 flex flex-col gap-4 border-t border-gold/20">
          {links.map((l) => (
            <button
              key={l.section}
              onClick={() => go(l.section)}
              className="text-white/90 hover:text-gold text-left text-base font-medium transition-colors"
            >
              {l.label}
            </button>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold text-ink px-5 py-3 rounded-full text-center text-sm font-semibold"
          >
            Contact on WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
}

// ---------- Hero ----------
function Hero({ onContact }: { onContact: () => void }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image covering ~50% with dark overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Luxury jewellery"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink/90" />
        <div className="absolute inset-0 bg-ink/30" />
      </div>

      {/* Decorative gold accents */}
      <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-gold/10 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full bg-gold/10 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center py-32">
        <Reveal>
          <p className="text-gold text-xs sm:text-sm tracking-[0.3em] uppercase font-medium mb-6">
            Wholesale &amp; Retail Jewellery
          </p>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="font-display font-bold text-white text-4xl sm:text-6xl lg:text-7xl leading-tight mb-6">
            Romoke Ayomide
            <span className="block text-gold mt-2">Jewellery Collection</span>
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="text-white/85 text-lg sm:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Elegant Jewellery for Every Style. Wholesale Prices. Premium Quality.
          </p>
        </Reveal>
        <Reveal delay={450}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onContact}
              className="bg-gold hover:bg-gold-light text-ink px-10 py-4 rounded-full font-semibold text-base tracking-wide transition-all duration-300 hover:shadow-gold hover:scale-105 w-full sm:w-auto"
            >
              Contact Us
            </button>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-gold text-gold hover:bg-gold hover:text-ink px-10 py-4 rounded-full font-semibold text-base tracking-wide transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-gold/50 flex justify-center pt-2">
          <div className="w-1 h-2 bg-gold rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// ---------- Welcome Note ----------
function WelcomeNote({ onContact }: { onContact: () => void }) {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <Reveal>
          <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">
            Welcome
          </p>
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <p className="text-ink/80 text-base sm:text-lg leading-relaxed font-light">
            Welcome to <span className="font-semibold text-ink">Romoke Ayomide Jewellery Collection</span>, where elegance meets affordability. We specialize in beautiful, high-quality jewellery carefully selected to complement every style and occasion. Whether you're a reseller, business owner, or shopping for yourself, we provide fashionable jewellery at unbeatable wholesale prices. Our commitment is to quality, excellent customer service, and customer satisfaction. Let us help you shine with confidence.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button
              onClick={onContact}
              className="bg-ink hover:bg-ink/90 text-gold px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-luxe hover:scale-105"
            >
              Contact Us
            </button>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold hover:bg-gold-light text-ink px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-gold hover:scale-105"
            >
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Business Highlights ----------
const highlights = [
  { icon: '📦', title: 'Wholesale Jewellery Available' },
  { icon: '🚚', title: 'Nationwide Delivery' },
  { icon: '💰', title: 'Affordable Prices' },
  { icon: '✨', title: 'Premium Quality' },
  { icon: '🔒', title: 'Secure Payment' },
  { icon: '🤝', title: 'Trusted Seller' },
];

function Highlights() {
  return (
    <section className="bg-ink py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-3">
              Why Choose Us
            </p>
            <h2 className="font-display font-bold text-white text-3xl sm:text-4xl">
              Business Highlights
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 80}>
              <div className="bg-white/5 border border-gold/20 rounded-2xl p-6 sm:p-8 text-center hover:bg-white/10 hover:border-gold/40 transition-all duration-400 hover:-translate-y-1.5 group h-full">
                <div className="text-3xl sm:text-4xl mb-4 group-hover:scale-110 transition-transform duration-400">
                  {h.icon}
                </div>
                <p className="text-white/90 text-sm sm:text-base font-medium leading-snug">
                  {h.title}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- About ----------
function About() {
  return (
    <section id="about" className="bg-cream py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-3">
              Our Story
            </p>
            <h2 className="font-display font-bold text-ink text-3xl sm:text-4xl">
              About Us
            </h2>
            <div className="w-16 h-px bg-gold mx-auto mt-6" />
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-luxe">
                <img
                  src="https://images.pexels.com/photos/1454170/pexels-photo-1454170.jpeg?auto=compress&cs=tinysrgb&w=900"
                  alt="Romoke Ayomide Jewellery"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-ink rounded-2xl px-6 py-4 shadow-luxe hidden sm:block">
                <p className="text-gold font-display font-bold text-2xl">100%</p>
                <p className="text-white/70 text-xs tracking-wide">Quality Guaranteed</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="space-y-5">
              <p className="text-ink/80 text-base sm:text-lg leading-relaxed">
                Romoke Ayomide Jewellery Collection is a trusted jewellery business located in Yaba, Lagos State, Nigeria.
              </p>
              <p className="text-ink/70 text-base leading-relaxed">
                We specialize in supplying trendy and affordable jewellery for both wholesalers and retailers. Our collection includes bracelets, necklaces, waist chains, earrings, accessories, and many more fashionable items.
              </p>
              <p className="text-ink/70 text-base leading-relaxed">
                We believe every customer deserves quality products, excellent service, and affordable prices.
              </p>
              <blockquote className="border-l-2 border-gold pl-5 py-2">
                <p className="font-display italic text-ink text-lg sm:text-xl">
                  "Our goal is to make luxury jewellery accessible to everyone."
                </p>
              </blockquote>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------- Business Info ----------
const businessInfo = [
  { label: 'Business Name', value: 'Romoke Ayomide Jewellery Collection', icon: '🏪' },
  { label: 'Location', value: 'Yaba, Lagos State, Nigeria', icon: '📍' },
  { label: 'Phone Number', value: PHONE_DISPLAY, icon: '📞', href: PHONE_TEL },
  { label: 'Business Type', value: 'Wholesale & Retail Jewellery', icon: '💎' },
];

function BusinessInfo() {
  return (
    <section className="bg-ink py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-3">
              Details
            </p>
            <h2 className="font-display font-bold text-white text-3xl sm:text-4xl">
              Business Information
            </h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {businessInfo.map((info, i) => (
            <Reveal key={info.label} delay={i * 100}>
              <div className="bg-white/5 border border-gold/20 rounded-2xl p-6 sm:p-7 flex items-center gap-5 hover:bg-white/10 hover:border-gold/40 transition-all duration-400 h-full">
                <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-2xl shrink-0">
                  {info.icon}
                </div>
                <div>
                  <p className="text-gold/80 text-xs tracking-widest uppercase mb-1">
                    {info.label}
                  </p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-white font-medium text-base sm:text-lg hover:text-gold transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-white font-medium text-base sm:text-lg">
                      {info.value}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Social Media ----------
const socials = [
  {
    name: 'TikTok',
    handle: '@romiluxe_jewelry',
    href: TIKTOK_LINK,
    gradient: 'from-[#010101] to-[#252525]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.24 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.69a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.12z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    handle: 'Mide Perfumeryncollection',
    href: 'https://www.facebook.com/Mide-perfumeryncollection',
    gradient: 'from-[#1877F2] to-[#0a5dc7]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    handle: PHONE_DISPLAY,
    href: WHATSAPP_LINK,
    gradient: 'from-[#25D366] to-[#128C7E]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2z" />
      </svg>
    ),
  },
];

function SocialMedia() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-3">
              Connect With Us
            </p>
            <h2 className="font-display font-bold text-ink text-3xl sm:text-4xl">
              Follow Our Socials
            </h2>
            <div className="w-16 h-px bg-gold mx-auto mt-6" />
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-5 sm:gap-6">
          {socials.map((s, i) => (
            <Reveal key={s.name} delay={i * 120}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-gradient-to-br ${s.gradient} rounded-2xl p-7 flex flex-col items-center text-center text-white hover:scale-105 hover:shadow-luxe transition-all duration-400 h-full group`}
              >
                <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-400">
                  {s.icon}
                </div>
                <p className="font-display font-semibold text-lg">{s.name}</p>
                <p className="text-white/80 text-sm mt-1">{s.handle}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Why Shop With Us ----------
function WhyShop() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-ink/90" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <Reveal>
          <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">
            Our Promise
          </p>
          <h2 className="font-display font-bold text-white text-3xl sm:text-5xl mb-8">
            Why Shop With Us?
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-6">
            We don't just sell jewellery—we help you build confidence, style, and profitable businesses. Whether you're buying for yourself or stocking your own shop, we are committed to giving you the best value, quality products, and excellent customer service.
          </p>
        </Reveal>
        <Reveal delay={350}>
          <p className="text-gold font-display text-xl sm:text-2xl italic">
            Your satisfaction is our priority.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Services ----------
const services = [
  {
    icon: '📦',
    title: 'Wholesale Supply',
    desc: 'We supply quality jewellery in bulk at affordable wholesale prices.',
  },
  {
    icon: '🚚',
    title: 'Nationwide Delivery',
    desc: 'We deliver safely to every state across Nigeria.',
  },
  {
    icon: '🏪',
    title: 'Pickup Service',
    desc: 'Customers can arrange pickup after successful payment confirmation.',
  },
  {
    icon: '💬',
    title: 'Customer Support',
    desc: 'Friendly customer support available before and after purchase.',
  },
];

function Services() {
  return (
    <section id="services" className="bg-cream py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-3">
              What We Offer
            </p>
            <h2 className="font-display font-bold text-ink text-3xl sm:text-4xl">
              Our Services
            </h2>
            <div className="w-16 h-px bg-gold mx-auto mt-6" />
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <div className="bg-white rounded-2xl p-7 shadow-card hover:shadow-luxe transition-all duration-400 hover:-translate-y-2 h-full group border border-gold/10">
                <div className="w-16 h-16 rounded-2xl bg-ink flex items-center justify-center text-3xl mb-5 group-hover:bg-gold transition-colors duration-400">
                  {s.icon}
                </div>
                <h3 className="font-display font-semibold text-ink text-lg mb-3">
                  {s.title}
                </h3>
                <p className="text-ink/65 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Contact CTA ----------
function ContactCTA() {
  return (
    <section id="contact" className="bg-gradient-to-br from-ink via-ink to-ink/80 py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <Reveal>
          <h2 className="font-display font-bold text-white text-3xl sm:text-4xl mb-6">
            Ready to Shine?
          </h2>
          <p className="text-white/70 text-base sm:text-lg mb-10 leading-relaxed">
            Contact us today to place your order or inquire about our wholesale prices. We're here to help you shine with confidence.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold hover:bg-gold-light text-ink px-10 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:shadow-gold hover:scale-105"
            >
              Contact on WhatsApp
            </a>
            <a
              href={PHONE_TEL}
              className="border-2 border-gold text-gold hover:bg-gold hover:text-ink px-10 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="bg-ink border-t border-gold/20 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center text-gold font-display font-bold">
                R
              </span>
              <span className="font-display font-semibold text-white text-base leading-tight">
                Romoke Ayomide
                <span className="block text-gold text-xs font-normal tracking-widest uppercase">
                  Jewellery Collection
                </span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-2">
              Wholesale &amp; Retail Jewellery
            </p>
            <p className="text-white/60 text-sm leading-relaxed">
              Yaba, Lagos State, Nigeria
            </p>
          </div>

          <div>
            <h4 className="text-gold text-xs tracking-widest uppercase font-medium mb-4">
              Phone
            </h4>
            <a
              href={PHONE_TEL}
              className="text-white/80 hover:text-gold transition-colors text-base block mb-2"
            >
              {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-gold transition-colors text-sm"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div>
            <h4 className="text-gold text-xs tracking-widest uppercase font-medium mb-4">
              Social Media
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={TIKTOK_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-gold transition-colors"
                >
                  TikTok: @romiluxe_jewelry
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/Mide-perfumeryncollection"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-gold transition-colors"
                >
                  Facebook: Mide Perfumeryncollection
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-gold transition-colors"
                >
                  WhatsApp: {PHONE_DISPLAY}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/50 text-sm">
            © 2025 Romoke Ayomide Jewellery Collection. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ---------- Floating WhatsApp Button ----------
function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-luxe hover:scale-110 transition-transform duration-300"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2z" />
      </svg>
    </a>
  );
}

// ---------- App ----------
function App() {
  const scrollToSection = (section: Section) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-cream font-sans antialiased">
      <Navbar onNavigate={scrollToSection} />
      <main>
        <Hero onContact={() => scrollToSection('contact')} />
        <WelcomeNote onContact={() => scrollToSection('contact')} />
        <Highlights />
        <About />
        <BusinessInfo />
        <SocialMedia />
        <WhyShop />
        <Services />
        <ContactCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
