"use client"

import { useEffect, useRef, useState } from "react";

// Enlace de WhatsApp de contacto de TapHub (botones CTA de la landing).
const WHATSAPP_URL = "https://wa.me/message/JBJKRI2LYY5YP1";

const COPY = {
  es: {
    navLinks: [
      { href: "#como-funciona", label: "Cómo funciona" },
      { href: "#para-quien", label: "Para quién" },
      { href: "#precios", label: "Precios" },
    ],
    navCta: "Quiero mi hub →",
    eyebrow: "Networking del siglo XXI",
    heroTitle: "Un toque.",
    heroTitleEm: "Tu mundo completo.",
    heroSub: "TapHub convierte cada contacto físico en una oportunidad real.",
    heroSubStrong: "Tu hub digital + tu tarjeta NFC",
    heroSubEnd: " — sin apps, sin fricciones, sin tarjetas que se pierden.",
    heroCta1: "Ver mi demo en vivo",
    heroCta2: "Cómo funciona",
    stat1Num: "95%", stat1Label: "tarjetas que se pierden",
    stat2Num: "10s", stat2Label: "para causar impacto",
    stat3Num: "24/7", stat3Label: "tu hub activo",
    logosLabel: "Diseñado para profesionales que hacen networking constante",
    logos: ["Realtors", "Brokers", "Consultores", "Abogados", "Vendedores B2B", "Fundadores"],
    problemLabel: "El problema",
    problemTitle: "Las tarjetas de papel",
    problemTitleEm: "ya no convierten.",
    problemSub: "Inviertes tiempo y dinero en eventos. Das tarjetas. La gente las guarda... o las pierde. Nadie te busca. El networking falla porque la herramienta que usas tiene 50 años.",
    problems: [
      { icon: "🗑️", title: "El 95% de las tarjetas acaba en la basura", desc: "En promedio, un profesional descarta las tarjetas recibidas en menos de una semana." },
      { icon: "🔍", title: "Nadie te busca — te olvidan", desc: "Sin un sistema de seguimiento, el contacto muere en el momento en que se da la mano." },
      { icon: "📊", title: "Cero métricas, cero datos", desc: "¿Cuántas tarjetas repartiste? ¿Cuántas se convirtieron en oportunidades? No lo sabes." },
    ],
    bigStatText: "Eso genera la mayoría de tarjetas de presentación después de un evento.",
    withTapHub: "Con TapHub, en cambio",
    withItems: [["Leads generados", "Rastreados"], ["Tiempo de respuesta", "Inmediato"], ["Tarjetas perdidas", "Imposible"], ["Tu hub disponible", "24/7"]],
    howLabel: "Cómo funciona",
    howTitle: "Tres pasos.",
    howTitleEm: "Sin complicaciones.",
    howSub: "En menos de 5 días tienes tu hub activo, tu tarjeta en mano y un sistema que trabaja por ti en cada evento.",
    steps: [
      { n: "01", t: "Diseñamos tu hub", d: "Creamos tu página personal con tu identidad, propuesta de valor, portafolio, testimonios y CTA de conversión. Optimizada para móvil, carga en menos de 2 segundos.", tag: "⏱ 3–5 días hábiles" },
      { n: "02", t: "Programamos tu tarjeta", d: "Configuramos tu tarjeta NFC con tu dominio personalizado. Un toque desde cualquier iPhone (desde el 7) o Android y tu hub aparece al instante. Sin apps, sin claves.", tag: "📱 Compatible con cualquier móvil" },
      { n: "03", t: "Tú cierras, nosotros medimos", d: "Sal a eventos con tu tarjeta. Cada toque queda registrado. Ves quién visitó tu hub, cuándo y qué hizo. Tu próximo cliente puede estar a un toque de distancia.", tag: "📊 Analytics en tiempo real" },
    ],
    whoLabel: "Para quién",
    whoTitle: "Hecho para quien",
    whoTitleEm: "cierra en persona.",
    whoSub: "TapHub no es para todo el mundo. Es para profesionales cuyo negocio vive en eventos, reuniones y contactos físicos.",
    who: [
      { icon: "🏠", t: "Realtors y Brokers", d: "En ferias inmobiliarias o recorridos, cada toque es un lead calificado. Tu hub muestra propiedades, testimonios y un botón directo para agendar visita.", r: "→ Más leads en cada feria" },
      { icon: "💼", t: "Consultores", d: "En conferencias y meetups, tu hub hace el pitch inicial por ti. Casos de éxito, metodología y un calendario para agendar la primera llamada.", r: "→ Reuniones agendadas en el evento" },
      { icon: "⚖️", t: "Abogados", d: "Demuestra autoridad desde el primer contacto. Tu hub muestra especialidades, logros y permite solicitar consulta de inmediato con total privacidad.", r: "→ Consultas sin intermediarios" },
      { icon: "📈", t: "Vendedores B2B", d: "Transforma cada handshake en pipeline. Tu hub integra con tu CRM y registra automáticamente cada contacto para seguimiento inmediato.", r: "→ Pipeline desde el evento" },
      { icon: "🚀", t: "Fundadores", d: "Pitch tu startup en cada conversación sin hablar. Tu hub cuenta la historia, muestra tracción y dirige a quien sea a la siguiente acción.", r: "→ Inversores e interesados 24/7" },
      { icon: "🌐", t: "Networkers profesionales", d: "Si tu negocio vive de relaciones, TapHub es tu infraestructura. Centraliza todo lo que eres en un solo punto de contacto memorable.", r: "→ Nunca más te olvidan" },
    ],
    pricingLabel: "Precios",
    pricingTitle: "Invierte menos de lo que",
    pricingTitleEm: "cuesta un cliente perdido.",
    pricingSub: "Setup único + mensualidad baja. Sin contratos. Sin sorpresas.",
    plans: [
      { name: "Starter", price: "$49.000", period: "setup único", monthly: "mes", features: ["Hub básico (5 secciones)", "1 tarjeta NFC incluida", "Dominio personalizado", "CTA: WhatsApp o Cal.com", "Hosting y soporte básico"], cta: "Empezar →", solid: false },
      { name: "Pro", price: "$69.000", period: "setup único", monthly: "mes · todo incluido", features: ["Hub completo (8 secciones)", "2 tarjetas NFC con diseño premium", "Copywriting profesional incluido", "Analytics dashboard", "Integraciones (Calendly, WA, CRM)", "Actualizaciones mensuales"], cta: "Quiero el Pro →", solid: true },
      { name: "Plan Anual", price: "$690.000", period: "COP / año", monthly: "Ahorro equivalente a 2 meses", features: ["Todo el Plan Pro", "Sin permanencia mensual", "Prioridad en soporte"], cta: "Hablemos →", solid: false },
    ],
    popularBadge: "El más vendido",
    pricingNote: '💡 Un profesional gasta en promedio <strong style="color:var(--cream)">$300–500/año en tarjetas de papel</strong> que no generan datos ni seguimiento. TapHub Pro cuesta <strong style="color:var(--green)">$69.000/mes</strong> y convierte cada contacto en pipeline real.',
    testiLabel: "Resultados reales",
    testiTitle: "Lo que dicen quienes",
    testiTitleEm: "ya tienen su hub.",
    testimonials: [
      { q: "En Startco repartí mi tarjeta NFC 40 veces. Al día siguiente tenía 12 personas en mi hub y 3 reuniones agendadas. Antes repartía 40 tarjetas de papel y no sabía ni si alguien las miraba.", init: "MR", name: "Martina Rodríguez", role: "Consultora de Marketing · Medellín", metric: "📊 40 toques · 12 visitas · 3 reuniones en 24h" },
      { q: "Como realtor, cada feria inmobiliaria era un caos de papeles. Ahora doy un toque con mi tarjeta y el cliente ya tiene mi portafolio de propiedades, mis casos de éxito y un botón para agendar visita.", init: "CA", name: "Carlos Arango", role: "Realtor Senior · Bogotá", metric: "🏠 4 propiedades vendidas desde su hub en el primer mes" },
      { q: "Lo que más me sorprendió fue ver exactamente quién visitó mi hub y cuándo. Pude hacer seguimiento personalizado a cada contacto. Eso con una tarjeta de papel es imposible.", init: "SV", name: "Sofía Vargas", role: "Abogada Corporativa · Medellín", metric: "⚖️ 8 consultas agendadas en su primer evento con TapHub" },
    ],
    faqLabel: "Preguntas frecuentes",
    faqTitle: "Todo lo que necesitas",
    faqTitleEm: "saber antes.",
    faqs: [
      { q: "¿Necesito instalar una app?", a: "No. Absolutamente ninguna app. Cuando alguien toca tu tarjeta, el hub se abre directamente en el navegador de su teléfono. Fricción cero." },
      { q: "¿Funciona en iPhone?", a: "Sí, desde el iPhone 7 en adelante (iOS 13+). Compatible con todos los Android con NFC activo. Cubre más del 95% de los smartphones del mercado." },
      { q: "¿Qué pasa si pierdo la tarjeta?", a: "Tu hub sigue funcionando — es independiente de la tarjeta física. Te enviamos una tarjeta de reemplazo y en 10 minutos está programada. Tu enlace y tu hub no cambian." },
      { q: "¿Puedo cambiar el contenido de mi hub?", a: "Sí, cuantas veces quieras. Los planes Pro y Elite incluyen actualizaciones mensuales sin costo adicional. Los cambios urgentes se aplican en menos de 48 horas." },
      { q: "¿Cuánto tiempo tarda en estar listo?", a: "Entre 3 y 5 días hábiles desde que recibes el formulario de onboarding. Si tienes un evento próximo, contáctanos y buscamos la forma de acelerarlo." },
      { q: "¿Puedo cancelar el plan mensual?", a: "Sí, en cualquier momento sin penalizaciones. Tu hub seguirá activo hasta el final del período pagado. No hay contratos de largo plazo ni cláusulas ocultas." },
    ],
    ctaLabel: "Empieza hoy",
    ctaTitle: "¿Listo para que tu próximo",
    ctaTitleEm: "genere pipeline",
    ctaTitleEnd: "evento",
    ctaSub: "Déjanos tu nombre y WhatsApp. En menos de 24 horas te mostramos cómo quedaría tu hub personalizado — sin compromiso.",
    ctaInputName: "Tu nombre",
    ctaInputPhone: "WhatsApp",
    ctaBtn: "Ver mi hub →",
    ctaNote: "Sin spam. Sin compromiso. Solo te mostramos cómo quedaría.",
    footerLinks: [
      { href: "#como-funciona", label: "Cómo funciona" },
      { href: "#precios", label: "Precios" },
      { href: "#contacto", label: "Contacto" },
      { href: "#", label: "Política de privacidad" },
    ],
    footerCopy: "© 2025 TapHub · Medellín, Colombia",
  },
  en: {
    navLinks: [
      { href: "#como-funciona", label: "How it works" },
      { href: "#para-quien", label: "Who it's for" },
      { href: "#precios", label: "Pricing" },
    ],
    navCta: "Get my hub →",
    eyebrow: "21st century networking",
    heroTitle: "One tap.",
    heroTitleEm: "Your whole world.",
    heroSub: "TapHub turns every physical contact into a real opportunity.",
    heroSubStrong: "Your digital hub + your NFC card",
    heroSubEnd: " — no apps, no friction, no lost cards.",
    heroCta1: "See my live demo",
    heroCta2: "How it works",
    stat1Num: "95%", stat1Label: "cards that get lost",
    stat2Num: "10s", stat2Label: "to make an impact",
    stat3Num: "24/7", stat3Label: "your hub active",
    logosLabel: "Built for professionals who network constantly",
    logos: ["Realtors", "Brokers", "Consultants", "Lawyers", "B2B Sales", "Founders"],
    problemLabel: "The problem",
    problemTitle: "Paper cards",
    problemTitleEm: "no longer convert.",
    problemSub: "You invest time and money in events. You hand out cards. People keep them... or lose them. Nobody finds you. Networking fails because your tool is 50 years old.",
    problems: [
      { icon: "🗑️", title: "95% of cards end up in the trash", desc: "On average, professionals discard received cards in less than a week." },
      { icon: "🔍", title: "Nobody looks for you — they forget you", desc: "Without a follow-up system, the connection dies the moment you shake hands." },
      { icon: "📊", title: "Zero metrics, zero data", desc: "How many cards did you hand out? How many became opportunities? You don't know." },
    ],
    bigStatText: "That's what most business cards generate after an event.",
    withTapHub: "With TapHub, instead",
    withItems: [["Leads generated", "Tracked"], ["Response time", "Immediate"], ["Lost cards", "Impossible"], ["Your hub available", "24/7"]],
    howLabel: "How it works",
    howTitle: "Three steps.",
    howTitleEm: "No complications.",
    howSub: "In less than 5 days you have your hub live, your card in hand, and a system that works for you at every event.",
    steps: [
      { n: "01", t: "We design your hub", d: "We create your personal page with your identity, value proposition, portfolio, testimonials and conversion CTA. Mobile-optimized, loads in under 2 seconds.", tag: "⏱ 3–5 business days" },
      { n: "02", t: "We program your card", d: "We configure your NFC card with your custom domain. One tap from any iPhone (from the 7) or Android and your hub appears instantly. No apps, no passwords.", tag: "📱 Compatible with any phone" },
      { n: "03", t: "You close, we measure", d: "Go to events with your card. Every tap is recorded. See who visited your hub, when and what they did. Your next client could be just a tap away.", tag: "📊 Real-time analytics" },
    ],
    whoLabel: "Who it's for",
    whoTitle: "Built for those who",
    whoTitleEm: "close in person.",
    whoSub: "TapHub isn't for everyone. It's for professionals whose business lives at events, meetings and physical contacts.",
    who: [
      { icon: "🏠", t: "Realtors & Brokers", d: "At property fairs or tours, every tap is a qualified lead. Your hub shows properties, testimonials and a direct button to schedule a visit.", r: "→ More leads at every fair" },
      { icon: "💼", t: "Consultants", d: "At conferences and meetups, your hub makes the initial pitch for you. Success stories, methodology and a calendar to book the first call.", r: "→ Meetings scheduled at the event" },
      { icon: "⚖️", t: "Lawyers", d: "Demonstrate authority from the first contact. Your hub shows specialties, achievements and allows immediate consultation requests with full privacy.", r: "→ Consultations without intermediaries" },
      { icon: "📈", t: "B2B Sales", d: "Turn every handshake into pipeline. Your hub integrates with your CRM and automatically records every contact for immediate follow-up.", r: "→ Pipeline from the event" },
      { icon: "🚀", t: "Founders", d: "Pitch your startup in every conversation without speaking. Your hub tells the story, shows traction and directs anyone to the next action.", r: "→ Investors & interested parties 24/7" },
      { icon: "🌐", t: "Professional networkers", d: "If your business lives on relationships, TapHub is your infrastructure. Centralize everything you are in one memorable point of contact.", r: "→ They'll never forget you" },
    ],
    pricingLabel: "Pricing",
    pricingTitle: "Invest less than what",
    pricingTitleEm: "a lost client costs.",
    pricingSub: "One-time setup + low monthly fee. No contracts. No surprises.",
    plans: [
      { name: "Starter", price: "$49.000", period: "one-time setup", monthly: "month", features: ["Basic hub (5 sections)", "1 NFC card included", "Custom domain", "CTA: WhatsApp or Cal.com", "Hosting and basic support"], cta: "Get started →", solid: false },
      { name: "Pro", price: "$69.000", period: "one-time setup", monthly: "month · all included", features: ["Full hub (8 sections)", "2 premium design NFC cards", "Professional copywriting included", "Analytics dashboard", "Integrations (Calendly, WA, CRM)", "Monthly updates"], cta: "I want Pro →", solid: true },
      { name: "Annual Plan", price: "$690.000", period: "COP / year", monthly: "Save 2 months equivalent", features: ["Everything in Pro", "No monthly commitment", "Priority support"], cta: "Let's talk →", solid: false },
    ],
    popularBadge: "Best seller",
    pricingNote: '💡 The average professional spends <strong style="color:var(--cream)">$300–500/year on paper cards</strong> that generate no data or follow-up. TapHub Pro costs <strong style="color:var(--green)">$69.000/month</strong> and turns every contact into real pipeline.',
    testiLabel: "Real results",
    testiTitle: "What people say who",
    testiTitleEm: "already have their hub.",
    testimonials: [
      { q: "At Startco I handed out my NFC card 40 times. The next day I had 12 people in my hub and 3 meetings scheduled. Before I handed out 40 paper cards and didn't even know if anyone looked at them.", init: "MR", name: "Martina Rodríguez", role: "Marketing Consultant · Medellín", metric: "📊 40 taps · 12 visits · 3 meetings in 24h" },
      { q: "As a realtor, every property fair was a paper chaos. Now I tap my card and the client already has my property portfolio, success stories and a button to schedule a visit.", init: "CA", name: "Carlos Arango", role: "Senior Realtor · Bogotá", metric: "🏠 4 properties sold from his hub in the first month" },
      { q: "What surprised me most was seeing exactly who visited my hub and when. I could do personalized follow-up with every contact. That's impossible with a paper card.", init: "SV", name: "Sofía Vargas", role: "Corporate Lawyer · Medellín", metric: "⚖️ 8 consultations scheduled at her first TapHub event" },
    ],
    faqLabel: "Frequently asked questions",
    faqTitle: "Everything you need to",
    faqTitleEm: "know before.",
    faqs: [
      { q: "Do I need to install an app?", a: "No. Absolutely no app needed. When someone taps your card, the hub opens directly in their phone's browser. Zero friction." },
      { q: "Does it work on iPhone?", a: "Yes, from iPhone 7 onwards (iOS 13+). Compatible with all Android with active NFC. Covers more than 95% of smartphones on the market." },
      { q: "What if I lose the card?", a: "Your hub keeps working — it's independent of the physical card. We send you a replacement card and it's programmed in 10 minutes. Your link and hub don't change." },
      { q: "Can I change my hub content?", a: "Yes, as many times as you want. Pro and Elite plans include monthly updates at no extra cost. Urgent changes are applied in less than 48 hours." },
      { q: "How long does it take to be ready?", a: "Between 3 and 5 business days from when you receive the onboarding form. If you have an upcoming event, contact us and we'll find a way to speed it up." },
      { q: "Can I cancel the monthly plan?", a: "Yes, at any time without penalties. Your hub will remain active until the end of the paid period. No long-term contracts or hidden clauses." },
    ],
    ctaLabel: "Start today",
    ctaTitle: "Ready for your next",
    ctaTitleEm: "to generate pipeline",
    ctaTitleEnd: "event",
    ctaSub: "Leave your name and WhatsApp. In less than 24 hours we'll show you how your personalized hub would look — no commitment.",
    ctaInputName: "Your name",
    ctaInputPhone: "WhatsApp",
    ctaBtn: "See my hub →",
    ctaNote: "No spam. No commitment. We'll just show you what it would look like.",
    footerLinks: [
      { href: "#como-funciona", label: "How it works" },
      { href: "#precios", label: "Pricing" },
      { href: "#contacto", label: "Contact" },
      { href: "#", label: "Privacy policy" },
    ],
    footerCopy: "© 2025 TapHub · Medellín, Colombia",
  },
};

export default function LandingHome() {
    const [lang, setLang] = useState<"es" | "en">("es");
    const [muted, setMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const t = COPY[lang];

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !muted;
            setMuted(prev => !prev);
        }
    };

    useEffect(() => {
        const reveals = document.querySelectorAll('.th-reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('visible'), i * 80);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(el => observer.observe(el));

        const nav = document.getElementById('th-nav');
        const onScroll = () => {
            if (nav) nav.style.borderBottomColor = window.scrollY > 60 ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.04)';
        };
        window.addEventListener('scroll', onScroll);
        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', onScroll);
        };
    }, []);
    return (
        <>
            <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-size: 16px; }
        :root {
          --black: #0A0A0A; --dark: #111111; --card: #161616; --border: #222222;
          --muted: #555555; --mid: #888888; --cream: #F5F0E8; --white: #FAFAFA;
          --green: #1DB874; --green2: #16A066;
          --green-dim: rgba(29,184,116,0.12); --green-glow: rgba(29,184,116,0.25);
          --serif: 'Inter', Georgia, serif; --sans: 'Outfit', system-ui, sans-serif;
          --radius: 16px; --radius-sm: 8px; --radius-xl: 28px;
        }
        .taphub-root { background: var(--black); color: var(--white); font-family: var(--sans); font-weight: 400; line-height: 1.6; overflow-x: hidden; }
        .taphub-root ::-webkit-scrollbar { width: 4px; }
        .taphub-root ::-webkit-scrollbar-track { background: var(--black); }
        .taphub-root ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
        .taphub-root::before { content:''; position:fixed; inset:0; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"); pointer-events:none; z-index:9999; opacity:0.5; }
        .th-nav { position:fixed; top:0; left:0; right:0; z-index:100; padding:20px 5%; display:flex; align-items:center; justify-content:space-between; backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); background:rgba(10,10,10,0.7); border-bottom:1px solid rgba(255,255,255,0.04); transition:all 0.3s; }
        .th-nav-logo { font-family:var(--serif); font-size:22px; font-style:italic; color:var(--cream); text-decoration:none; letter-spacing:-0.3px; }
        .th-nav-logo span { color:var(--green); font-style:normal; }
        .th-nav-links { display:flex; gap:36px; list-style:none; }
        .th-nav-links a { color:var(--mid); text-decoration:none; font-size:13px; font-weight:500; letter-spacing:0.04em; text-transform:uppercase; transition:color 0.2s; }
        .th-nav-links a:hover { color:var(--white); }
        .th-nav-cta { background:var(--green)!important; color:#000!important; padding:9px 22px; border-radius:100px; font-size:13px!important; font-weight:600!important; letter-spacing:0.02em!important; text-transform:none!important; transition:transform 0.2s, box-shadow 0.2s!important; }
        .th-nav-cta:hover { transform:translateY(-1px); box-shadow:0 8px 32px var(--green-glow)!important; color:#000!important; }
        .th-hero { min-height:100vh; display:flex; align-items:center; padding:120px 5% 80px; position:relative; overflow:hidden; }
        .th-hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse 60% 70% at 65% 50%, rgba(29,184,116,0.07) 0%, transparent 70%), radial-gradient(ellipse 40% 50% at 20% 80%, rgba(29,184,116,0.04) 0%, transparent 60%); }
        .th-hero-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px); background-size:80px 80px; mask-image:radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 70%); }
        .th-hero-inner { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; width:100%; max-width:1200px; margin:0 auto; position:relative; z-index:2; }
        .th-hero-eyebrow { display:inline-flex; align-items:center; gap:8px; background:var(--green-dim); border:1px solid rgba(29,184,116,0.3); color:var(--green); font-size:11px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; padding:6px 14px; border-radius:100px; margin-bottom:28px; animation:thFadeUp 0.8s ease both; }
        .th-hero-eyebrow::before { content:''; width:6px; height:6px; background:var(--green); border-radius:50%; animation:thPulse 2s infinite; }
        @keyframes thPulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.5;transform:scale(0.8);} }
        .th-hero-title { font-family:var(--serif); font-size:clamp(42px,5.5vw,76px); font-weight:700; line-height:1.05; letter-spacing:-1.5px; color:var(--cream); margin-bottom:24px; animation:thFadeUp 0.8s 0.1s ease both; }
        .th-hero-title em { color:var(--green); }
        .th-hero-sub { font-size:17px; line-height:1.7; color:var(--mid); max-width:480px; margin-bottom:44px; animation:thFadeUp 0.8s 0.2s ease both; }
        .th-hero-sub strong { color:var(--white); font-weight:500; }
        .th-hero-actions { display:flex; gap:14px; align-items:center; flex-wrap:wrap; animation:thFadeUp 0.8s 0.3s ease both; }
        .th-btn-primary { background:var(--green); color:#000; font-weight:600; font-size:15px; padding:15px 32px; border-radius:100px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:transform 0.2s, box-shadow 0.2s; }
        .th-btn-primary:hover { transform:translateY(-2px); box-shadow:0 16px 48px var(--green-glow); }
        .th-btn-primary svg { transition:transform 0.2s; }
        .th-btn-primary:hover svg { transform:translateX(3px); }
        .th-btn-ghost { color:var(--mid); font-size:14px; font-weight:500; text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:color 0.2s; padding:15px 0; }
        .th-btn-ghost:hover { color:var(--white); }
        .th-hero-stats { display:flex; gap:32px; margin-top:56px; padding-top:40px; border-top:1px solid var(--border); animation:thFadeUp 0.8s 0.4s ease both; }
        .th-stat-num { font-family:var(--serif); font-size:32px; font-weight:700; color:var(--cream); line-height:1; margin-bottom:4px; }
        .th-stat-label { font-size:12px; color:var(--muted); letter-spacing:0.04em; }
        .th-hero-visual { display:flex; justify-content:center; align-items:center; position:relative; animation:thFadeIn 1.2s 0.3s ease both; }
        .th-nfc-scene { position:relative; width:340px; height:440px; }
        .th-nfc-card { position:absolute; width:300px; height:188px; border-radius:20px; background:linear-gradient(135deg,#1a1a1a 0%,#222 50%,#1a1a1a 100%); border:1px solid rgba(255,255,255,0.08); padding:24px; box-shadow:0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.06); top:0; left:0; animation:thCardFloat 4s ease-in-out infinite; overflow:hidden; }
        .th-nfc-card::before { content:''; position:absolute; top:-50%; right:-20%; width:200px; height:200px; background:radial-gradient(circle, rgba(29,184,116,0.15) 0%, transparent 70%); border-radius:50%; }
        .th-card-logo { font-family:var(--serif); font-style:italic; font-size:18px; color:var(--cream); margin-bottom:auto; }
        .th-card-logo span { color:var(--green); font-style:normal; }
        .th-card-nfc-icon { position:absolute; top:24px; right:24px; width:32px; height:32px; opacity:0.4; }
        .th-card-name { position:absolute; bottom:24px; left:24px; }
        .th-card-person { font-size:15px; font-weight:500; color:var(--cream); margin-bottom:2px; }
        .th-card-role { font-size:11px; color:var(--muted); letter-spacing:0.04em; }
        .th-card-dots { position:absolute; bottom:24px; right:24px; display:flex; gap:5px; }
        .th-dot { width:6px; height:6px; border-radius:50%; background:var(--border); }
        .th-dot:last-child { background:var(--green); }
        .th-hub-preview { position:absolute; bottom:0; right:0; width:200px; background:#1a1a1a; border:1px solid var(--border); border-radius:20px; padding:18px; box-shadow:0 24px 60px rgba(0,0,0,0.5); animation:thCardFloat 4s 1.5s ease-in-out infinite; }
        .th-hub-top { display:flex; align-items:center; gap:10px; margin-bottom:14px; padding-bottom:14px; border-bottom:1px solid var(--border); }
        .th-hub-avatar { width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg,var(--green2),var(--green)); display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:600; color:#000; flex-shrink:0; }
        .th-hub-info { flex:1; min-width:0; }
        .th-hub-name { font-size:12px; font-weight:500; color:var(--cream); margin-bottom:1px; }
        .th-hub-title { font-size:10px; color:var(--muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .th-hub-btn { width:100%; background:var(--green); color:#000; font-size:11px; font-weight:600; padding:9px; border-radius:8px; text-align:center; margin-bottom:8px; }
        .th-hub-link { width:100%; background:var(--border); color:var(--mid); font-size:10px; padding:7px; border-radius:6px; text-align:center; }
        .th-tap-animation { position:absolute; top:140px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:6px; }
        .th-tap-rings { position:relative; width:50px; height:50px; }
        .th-ring { position:absolute; border:1.5px solid var(--green); border-radius:50%; animation:thRingPulse 2s ease-out infinite; }
        .th-ring:nth-child(1){inset:35%;animation-delay:0s;}
        .th-ring:nth-child(2){inset:20%;animation-delay:0.4s;}
        .th-ring:nth-child(3){inset:0%;animation-delay:0.8s;}
        @keyframes thRingPulse { 0%{opacity:1;transform:scale(0.8);} 100%{opacity:0;transform:scale(1);} }
        .th-tap-label { font-size:10px; color:var(--green); letter-spacing:0.08em; font-weight:500; text-transform:uppercase; }
        @keyframes thCardFloat { 0%,100%{transform:translateY(0px);} 50%{transform:translateY(-10px);} }
        @keyframes thFadeUp { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
        @keyframes thFadeIn { from{opacity:0;} to{opacity:1;} }
        .th-section { padding:100px 5%; }
        .th-container { max-width:1200px; margin:0 auto; }
        .th-section-label { display:inline-flex; align-items:center; gap:8px; font-size:11px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:var(--green); margin-bottom:20px; }
        .th-section-label::before { content:''; width:20px; height:1px; background:var(--green); }
        .th-section-title { font-family:var(--serif); font-size:clamp(32px,4vw,54px); font-weight:700; line-height:1.1; letter-spacing:-1px; color:var(--cream); margin-bottom:20px; }
        .th-section-title em { font-style:italic; color:var(--green); }
        .th-section-sub { font-size:16px; color:var(--mid); line-height:1.7; max-width:560px; }
        .th-logos-section { padding:40px 5%; border-top:1px solid var(--border); border-bottom:1px solid var(--border); }
        .th-logos-label { font-size:11px; color:var(--muted); letter-spacing:0.1em; text-transform:uppercase; text-align:center; margin-bottom:28px; }
        .th-logos-row { display:flex; justify-content:center; align-items:center; gap:48px; flex-wrap:wrap; }
        .th-logo-item { font-family:var(--serif); font-size:18px; font-style:italic; color:var(--border); letter-spacing:-0.5px; transition:color 0.3s; }
        .th-logo-item:hover { color:var(--mid); }
        .th-problem-section { background:var(--dark); }
        .th-problem-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
        .th-problem-cards { display:flex; flex-direction:column; gap:14px; }
        .th-problem-card { background:var(--black); border:1px solid var(--border); border-radius:var(--radius); padding:22px 24px; display:flex; gap:16px; align-items:flex-start; transition:border-color 0.3s; }
        .th-problem-card:hover { border-color:var(--muted); }
        .th-problem-icon { width:40px; height:40px; border-radius:10px; background:rgba(255,255,255,0.04); display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
        .th-problem-text h4 { font-size:14px; font-weight:600; color:var(--cream); margin-bottom:4px; }
        .th-problem-text p { font-size:13px; color:var(--muted); line-height:1.55; }
        .th-big-stat { text-align:center; padding:40px; background:var(--card); border:1px solid var(--border); border-radius:var(--radius-xl); margin-top:24px; }
        .th-big-stat-num { font-family:var(--serif); font-size:80px; font-weight:700; line-height:1; color:var(--green); margin-bottom:12px; }
        .th-big-stat-text { font-size:14px; color:var(--mid); line-height:1.5; max-width:240px; margin:0 auto; }
        .th-steps-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; background:var(--border); border-radius:var(--radius-xl); overflow:hidden; margin-top:64px; }
        .th-step-card { background:var(--dark); padding:44px 36px; position:relative; transition:background 0.3s; }
        .th-step-card:hover { background:var(--card); }
        .th-step-num { font-family:var(--serif); font-size:56px; font-weight:700; color:var(--border); line-height:1; margin-bottom:20px; transition:color 0.3s; }
        .th-step-card:hover .th-step-num { color:var(--green); }
        .th-step-title { font-size:18px; font-weight:600; color:var(--cream); margin-bottom:12px; }
        .th-step-desc { font-size:14px; color:var(--muted); line-height:1.6; }
        .th-step-tag { display:inline-block; background:var(--green-dim); color:var(--green); font-size:11px; padding:4px 12px; border-radius:100px; margin-top:20px; font-weight:500; border:1px solid rgba(29,184,116,0.2); }
        .th-who-section { background:var(--dark); }
        .th-who-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:60px; }
        .th-who-card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius-xl); padding:32px 28px; cursor:pointer; transition:all 0.3s; position:relative; overflow:hidden; }
        .th-who-card::before { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:var(--green); transform:scaleX(0); transition:transform 0.3s; }
        .th-who-card:hover { border-color:var(--green); transform:translateY(-4px); }
        .th-who-card:hover::before { transform:scaleX(1); }
        .th-who-icon { font-size:32px; margin-bottom:18px; display:block; }
        .th-who-title { font-size:18px; font-weight:600; color:var(--cream); margin-bottom:8px; }
        .th-who-desc { font-size:13px; color:var(--muted); line-height:1.6; }
        .th-who-result { margin-top:18px; padding-top:18px; border-top:1px solid var(--border); font-size:12px; color:var(--green); font-weight:500; }
        .th-pricing-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:64px; }
        .th-pricing-card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius-xl); padding:36px 32px; transition:all 0.3s; position:relative; }
        .th-pricing-card:hover { transform:translateY(-4px); }
        .th-pricing-card.featured { border-color:var(--green); background:linear-gradient(160deg, rgba(29,184,116,0.06) 0%, var(--card) 60%); }
        .th-popular-badge { position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:var(--green); color:#000; font-size:11px; font-weight:700; padding:4px 16px; border-radius:100px; white-space:nowrap; letter-spacing:0.04em; }
        .th-plan-name { font-size:13px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:var(--mid); margin-bottom:16px; }
        .th-plan-price { font-family:var(--serif); font-size:52px; font-weight:700; color:var(--cream); line-height:1; margin-bottom:4px; }
        .th-plan-price sup { font-size:24px; vertical-align:top; margin-top:10px; display:inline-block; }
        .th-plan-period { font-size:13px; color:var(--muted); margin-bottom:8px; }
        .th-plan-monthly { font-size:13px; color:var(--green); margin-bottom:28px; padding-bottom:28px; border-bottom:1px solid var(--border); }
        .th-plan-features { list-style:none; display:flex; flex-direction:column; gap:12px; margin-bottom:32px; }
        .th-plan-features li { font-size:14px; color:var(--mid); display:flex; align-items:flex-start; gap:10px; line-height:1.4; }
        .th-plan-features li::before { content:''; width:16px; height:16px; border-radius:50%; background:var(--green-dim); border:1px solid rgba(29,184,116,0.3); flex-shrink:0; margin-top:1px; background-image:url("data:image/svg+xml,%3Csvg width='10' height='8' viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 4L3.5 6.5L9 1' stroke='%231DB874' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:center; }
        .th-btn-plan { display:block; text-align:center; padding:14px; border-radius:100px; font-weight:600; font-size:14px; text-decoration:none; transition:all 0.2s; }
        .th-btn-plan-outline { border:1px solid var(--border); color:var(--cream); }
        .th-btn-plan-outline:hover { border-color:var(--green); color:var(--green); }
        .th-btn-plan-solid { background:var(--green); color:#000; border:1px solid var(--green); }
        .th-btn-plan-solid:hover { background:var(--green2); box-shadow:0 8px 32px var(--green-glow); }
        .th-testimonials-section { background:var(--dark); }
        .th-testimonials-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:60px; }
        .th-testi-card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius-xl); padding:32px; transition:all 0.3s; }
        .th-testi-card:hover { border-color:var(--muted); transform:translateY(-2px); }
        .th-testi-quote { font-size:28px; color:var(--green); font-family:var(--serif); line-height:1; margin-bottom:16px; }
        .th-testi-text { font-size:15px; color:var(--mid); line-height:1.65; margin-bottom:24px; font-style:italic; }
        .th-testi-author { display:flex; align-items:center; gap:12px; }
        .th-testi-avatar { width:42px; height:42px; border-radius:50%; background:linear-gradient(135deg,#333,#222); display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:600; color:var(--cream); flex-shrink:0; }
        .th-testi-name { font-size:13px; font-weight:600; color:var(--cream); }
        .th-testi-role { font-size:12px; color:var(--muted); }
        .th-testi-metric { margin-top:20px; padding:12px 16px; background:var(--green-dim); border:1px solid rgba(29,184,116,0.2); border-radius:var(--radius-sm); font-size:12px; color:var(--green); font-weight:500; }
        .th-faq-grid { display:grid; grid-template-columns:1fr 1fr; gap:2px; background:var(--border); border-radius:var(--radius-xl); overflow:hidden; margin-top:64px; }
        .th-faq-item { background:var(--dark); padding:32px 36px; cursor:pointer; transition:background 0.2s; }
        .th-faq-item:hover { background:var(--card); }
        .th-faq-q { font-size:15px; font-weight:600; color:var(--cream); margin-bottom:10px; display:flex; justify-content:space-between; align-items:start; gap:16px; }
        .th-faq-icon { width:20px; height:20px; border:1px solid var(--border); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:14px; color:var(--green); flex-shrink:0; margin-top:1px; }
        .th-faq-a { font-size:13px; color:var(--muted); line-height:1.65; display:none; }
        .th-cta-section { padding:80px 5% 120px; }
        .th-cta-box { max-width:900px; margin:0 auto; background:var(--card); border:1px solid var(--border); border-radius:32px; padding:80px; text-align:center; position:relative; overflow:hidden; }
        .th-cta-box::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 60% 60% at 50% 0%, rgba(29,184,116,0.1) 0%, transparent 70%); }
        .th-cta-box > * { position:relative; z-index:1; }
        .th-cta-title { font-family:var(--serif); font-size:clamp(32px,4vw,52px); font-weight:700; color:var(--cream); line-height:1.1; letter-spacing:-1px; margin-bottom:20px; }
        .th-cta-title em { font-style:italic; color:var(--green); }
        .th-cta-sub { font-size:16px; color:var(--mid); margin-bottom:44px; max-width:480px; margin-left:auto; margin-right:auto; }
        .th-cta-form { display:flex; gap:12px; max-width:480px; margin:0 auto 20px; }
        .th-cta-input { flex:1; background:rgba(255,255,255,0.06); border:1px solid var(--border); border-radius:100px; padding:14px 22px; font-size:14px; color:var(--white); font-family:var(--sans); outline:none; transition:border-color 0.2s; }
        .th-cta-input::placeholder { color:var(--muted); }
        .th-cta-input:focus { border-color:var(--green); }
        .th-cta-note { font-size:12px; color:var(--muted); }
        .th-footer { padding:48px 5%; border-top:1px solid var(--border); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px; }
        .th-footer-logo { font-family:var(--serif); font-style:italic; font-size:20px; color:var(--cream); }
        .th-footer-logo span { color:var(--green); font-style:normal; }
        .th-footer-links { display:flex; gap:28px; list-style:none; }
        .th-footer-links a { font-size:13px; color:var(--muted); text-decoration:none; transition:color 0.2s; }
        .th-footer-links a:hover { color:var(--white); }
        .th-footer-copy { font-size:12px; color:var(--border); }
        .th-reveal { opacity:0; transform:translateY(30px); transition:opacity 0.7s ease, transform 0.7s ease; }
        .th-reveal.visible { opacity:1; transform:translateY(0); }
        @media (max-width: 900px) {
          .th-hero-inner, .th-problem-grid, .th-steps-grid, .th-who-grid, .th-pricing-grid, .th-testimonials-grid, .th-faq-grid { grid-template-columns:1fr; }
          .th-hero-visual { display:none; }
          .th-hero { padding:100px 5% 60px; }
          .th-nav-links { display:none; }
          .th-cta-form { flex-direction:column; }
          .th-cta-box { padding:48px 28px; }
          .th-footer { flex-direction:column; text-align:center; }
        }
      `}</style>

            <div className="taphub-root">
                {/* NAV */}
                <nav className="th-nav" id="th-nav">
                    <a href="#" className="th-nav-logo">Tap<span>Hub</span></a>
                    <ul className="th-nav-links">
                        {t.navLinks.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
                        <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="th-nav-cta">{t.navCta}</a></li>
                    </ul>
                    <button
                        onClick={() => setLang(lang === "es" ? "en" : "es")}
                        style={{
                            marginLeft: "16px",
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "var(--cream)",
                            fontSize: "12px",
                            fontWeight: 600,
                            padding: "5px 12px",
                            borderRadius: "100px",
                            cursor: "pointer",
                            letterSpacing: "0.06em",
                            transition: "background 0.2s, border-color 0.2s",
                            flexShrink: 0,
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(29,184,116,0.12)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(29,184,116,0.4)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)"; }}
                    >
                        {lang === "es" ? "EN" : "ES"}
                    </button>
                </nav>

                {/* HERO — VIDEO */}
                <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "#000" }}>
                    <video
                        ref={videoRef}
                        src="/uploads/TAPHUB.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    {/* Gradient overlay so nav is readable */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 40%, transparent 70%, rgba(0,0,0,0.5) 100%)", pointerEvents: "none" }} />
                    {/* Sound toggle */}
                    <button
                        onClick={toggleMute}
                        aria-label={muted ? "Activar sonido" : "Silenciar"}
                        style={{
                            position: "absolute", bottom: "32px", right: "32px",
                            width: "48px", height: "48px", borderRadius: "50%",
                            background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            color: "#fff", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "background 0.2s, border-color 0.2s",
                            zIndex: 10,
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(29,184,116,0.5)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--green)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.55)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
                    >
                        {muted ? (
                            /* muted icon */
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <line x1="23" y1="9" x2="17" y2="15" />
                                <line x1="17" y1="9" x2="23" y2="15" />
                            </svg>
                        ) : (
                            /* sound on icon */
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                            </svg>
                        )}
                    </button>
                </section>

                {/* LOGOS */}
                <div className="th-logos-section">
                    <div className="th-logos-label">{t.logosLabel}</div>
                    <div className="th-logos-row">
                        {t.logos.map(l => (
                            <span key={l} className="th-logo-item">{l}</span>
                        ))}
                    </div>
                </div>

                {/* PROBLEMA */}
                <section className="th-section th-problem-section">
                    <div className="th-container">
                        <div className="th-problem-grid">
                            <div className="th-reveal">
                                <div className="th-section-label">{t.problemLabel}</div>
                                <h2 className="th-section-title">{t.problemTitle}<br /><em>{t.problemTitleEm}</em></h2>
                                <p className="th-section-sub">{t.problemSub}</p>
                                <div className="th-problem-cards" style={{ marginTop: "36px" }}>
                                    {t.problems.map(c => (
                                        <div key={c.title} className="th-problem-card">
                                            <div className="th-problem-icon">{c.icon}</div>
                                            <div className="th-problem-text"><h4>{c.title}</h4><p>{c.desc}</p></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="th-reveal">
                                <div className="th-big-stat">
                                    <div className="th-big-stat-num">$0</div>
                                    <div className="th-big-stat-text" style={{ fontSize: "16px", color: "var(--mid)" }}>{t.bigStatText}</div>
                                </div>
                                <div style={{ marginTop: "16px", background: "var(--card)", border: "1px solid var(--green)", borderRadius: "var(--radius-xl)", padding: "32px" }}>
                                    <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--green)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>{t.withTapHub}</div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                        {t.withItems.map(([k, v]) => (
                                            <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "var(--mid)" }}>
                                                <span>{k}</span><span style={{ color: "var(--green)", fontWeight: 600 }}>{v}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CÓMO FUNCIONA */}
                <section id="como-funciona" className="th-section">
                    <div className="th-container">
                        <div className="th-reveal" style={{ textAlign: "center" }}>
                            <div className="th-section-label" style={{ justifyContent: "center" }}>{t.howLabel}</div>
                            <h2 className="th-section-title">{t.howTitle}<br /><em>{t.howTitleEm}</em></h2>
                            <p className="th-section-sub" style={{ margin: "0 auto" }}>{t.howSub}</p>
                        </div>
                        <div className="th-steps-grid th-reveal">
                            {t.steps.map(s => (
                                <div key={s.n} className="th-step-card">
                                    <div className="th-step-num">{s.n}</div>
                                    <div className="th-step-title">{s.t}</div>
                                    <div className="th-step-desc">{s.d}</div>
                                    <span className="th-step-tag">{s.tag}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PARA QUIÉN */}
                <section id="para-quien" className="th-section th-who-section">
                    <div className="th-container">
                        <div className="th-reveal">
                            <div className="th-section-label">{t.whoLabel}</div>
                            <h2 className="th-section-title">{t.whoTitle}<br /><em>{t.whoTitleEm}</em></h2>
                            <p className="th-section-sub">{t.whoSub}</p>
                        </div>
                        <div className="th-who-grid th-reveal">
                            {t.who.map(c => (
                                <div key={c.t} className="th-who-card">
                                    <span className="th-who-icon">{c.icon}</span>
                                    <div className="th-who-title">{c.t}</div>
                                    <div className="th-who-desc">{c.d}</div>
                                    <div className="th-who-result">{c.r}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PRICING */}
                <section id="precios" className="th-section">
                    <div className="th-container">
                        <div className="th-reveal" style={{ textAlign: "center" }}>
                            <div className="th-section-label" style={{ justifyContent: "center" }}>{t.pricingLabel}</div>
                            <h2 className="th-section-title">{t.pricingTitle}<br /><em>{t.pricingTitleEm}</em></h2>
                            <p className="th-section-sub" style={{ margin: "0 auto" }}>{t.pricingSub}</p>
                        </div>
                        <div className="th-pricing-grid th-reveal">
                            {t.plans.map((plan, i) => (
                                <div key={plan.name} className={`th-pricing-card${i === 1 ? " featured" : ""}`}>
                                    {i === 1 && <span className="th-popular-badge">{t.popularBadge}</span>}
                                    <div className="th-plan-name">{plan.name}</div>
                                    <div className="th-plan-price"><sup>$</sup>{plan.price.replace("$", "")}</div>
                                    <div className="th-plan-period">{plan.period}</div>
                                    <div className="th-plan-monthly">{plan.monthly}</div>
                                    <ul className="th-plan-features">
                                        {plan.features.map(f => <li key={f}>{f}</li>)}
                                    </ul>
                                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`th-btn-plan ${plan.solid ? "th-btn-plan-solid" : "th-btn-plan-outline"}`}>{plan.cta}</a>
                                </div>
                            ))}
                        </div>
                        <div className="th-reveal" style={{ marginTop: "40px", padding: "32px", background: "var(--dark)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", textAlign: "center" }}>
                            <p style={{ fontSize: "14px", color: "var(--muted)" }} dangerouslySetInnerHTML={{ __html: t.pricingNote }} />
                        </div>
                    </div>
                </section>

                {/* TESTIMONIALS */}
                <section className="th-section th-testimonials-section">
                    <div className="th-container">
                        <div className="th-reveal" style={{ textAlign: "center" }}>
                            <div className="th-section-label" style={{ justifyContent: "center" }}>{t.testiLabel}</div>
                            <h2 className="th-section-title">{t.testiTitle}<br /><em>{t.testiTitleEm}</em></h2>
                        </div>
                        <div className="th-testimonials-grid th-reveal">
                            {t.testimonials.map(testi => (
                                <div key={testi.name} className="th-testi-card">
                                    <div className="th-testi-quote">"</div>
                                    <p className="th-testi-text">{testi.q}</p>
                                    <div className="th-testi-author">
                                        <div className="th-testi-avatar">{testi.init}</div>
                                        <div><div className="th-testi-name">{testi.name}</div><div className="th-testi-role">{testi.role}</div></div>
                                    </div>
                                    <div className="th-testi-metric">{testi.metric}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="th-section">
                    <div className="th-container">
                        <div className="th-reveal" style={{ textAlign: "center" }}>
                            <div className="th-section-label" style={{ justifyContent: "center" }}>{t.faqLabel}</div>
                            <h2 className="th-section-title">{t.faqTitle}<br /><em>{t.faqTitleEm}</em></h2>
                        </div>
                        <div className="th-faq-grid th-reveal" id="th-faq">
                            {t.faqs.map(f => (
                                <div key={f.q} className="th-faq-item" onClick={(e) => {
                                    const item = e.currentTarget;
                                    const ans = item.querySelector('.th-faq-a') as HTMLElement;
                                    const icon = item.querySelector('.th-faq-icon') as HTMLElement;
                                    if (!ans || !icon) return;
                                    const isOpen = ans.style.display === 'block';
                                    ans.style.display = isOpen ? 'none' : 'block';
                                    icon.textContent = isOpen ? '+' : '−';
                                }}>
                                    <div className="th-faq-q">{f.q}<span className="th-faq-icon">+</span></div>
                                    <div className="th-faq-a">{f.a}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA FINAL */}
                <section id="contacto" className="th-cta-section">
                    <div className="th-container">
                        <div className="th-cta-box th-reveal">
                            <div className="th-section-label" style={{ justifyContent: "center", marginBottom: "24px" }}>{t.ctaLabel}</div>
                            <h2 className="th-cta-title">¿{t.ctaTitle} {t.ctaTitleEnd} <em>{t.ctaTitleEm}</em>?</h2>
                            <p className="th-cta-sub">{t.ctaSub}</p>
                            <div className="th-cta-form">
                                <input type="text" className="th-cta-input" placeholder={t.ctaInputName} />
                                <input type="tel" className="th-cta-input" placeholder={t.ctaInputPhone} />
                                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="th-btn-primary" style={{ whiteSpace: "nowrap" }}>{t.ctaBtn}</a>
                            </div>
                            <p className="th-cta-note">{t.ctaNote}</p>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="th-footer">
                    <div className="th-footer-logo">Tap<span>Hub</span></div>
                    <ul className="th-footer-links">
                        {t.footerLinks.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
                    </ul>
                    <div className="th-footer-copy">{t.footerCopy}</div>
                </footer>
            </div>

        </>
    );
}