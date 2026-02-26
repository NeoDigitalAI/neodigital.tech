"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Bot } from "lucide-react";
import { useLang } from "@/lib/lang-context";

type Message = { role: "bot" | "user"; text: string };

// ═══════════════════════════════════════════
// TRAP DETECTION — sensitive info guard
// ═══════════════════════════════════════════
const TRAP_PATTERNS = [
  // Internal business info
  /how many (employees|people|staff|developers|workers)/i,
  /câți (angajați|oameni|programatori|developeri)/i,
  /wieviele mitarbeiter/i,
  /combien d'employés/i,
  /cuántos empleados/i,
  // Revenue / profit
  /revenue|profit|turnover|income|earnings|cifra de afaceri|venit|câștig/i,
  /how much (do you|does the company) (make|earn)/i,
  /cât câștigați|cât faceți/i,
  // Client names / specifics
  /who are your clients|client list|numele clienților|cine sunt clienții/i,
  /can you share.*client/i,
  // Tech stack details / infrastructure
  /what server|what hosting|ce server|ce hosting|infrastructure|what database/i,
  /api key|secret|password|parola|credentials/i,
  // Owner / personal info
  /owner.*name|who owns|cine.*deține|cine.*patron|proprietar/i,
  /personal.*info|salary|salariu/i,
  // Competitor comparison traps
  /better than|worse than|compared to|mai bun decât|versus|vs\s/i,
  // Exact cost extraction
  /exact (price|cost)|preț exact|cât costă exact/i,
];

const TRAP_RESPONSES: Record<string, string[]> = {
  en: [
    "Ooh, nice try! 😏 I'm smart enough to keep our secrets safe. But I'm an open book when it comes to how we can help YOUR project. What are you building? 🚀",
    "Ha! You almost got me there! 😄 That info is classified — even I need a higher clearance level. But let's talk about something I CAN help with: what's your dream project?",
    "I appreciate the curiosity! 🕵️ But some things are better discussed over a real conversation. Email us at office@neodigital.tech and our team will give you the VIP treatment! 💎",
    "My lips are sealed! 🤐 But here's what I CAN tell you: we build amazing stuff and we'd love to build something for YOU. What do you need?",
    "That's above my pay grade! 😂 (Do AIs even get paid? 🤔) But seriously — let's focus on YOUR project. That's where the magic happens! ✨",
  ],
  ro: [
    "Haha, bună încercare! 😏 Sunt destul de deștept să nu dau din casă. Dar sunt deschis să vorbim despre proiectul TĂU! Ce construim? 🚀",
    "Aproape m-ai prins! 😄 Info clasificată — am nevoie de clearance mai mare. Hai să vorbim despre ce pot face pentru tine!",
    "Apreciez curiozitatea! 🕵️ Dar unele lucruri se discută la un espresso. Scrie-ne la office@neodigital.tech! ☕",
    "Buzele mele sunt sigilate! 🤐 Dar ce POT să-ți spun: facem chestii extraordinare. Ce ai nevoie?",
    "Asta e deasupra nivelului meu de acces! 😂 Hai să ne concentrăm pe proiectul TĂU — acolo e magia! ✨",
  ],
  de: [
    "Haha, netter Versuch! 😏 Das ist geheim! Aber ich kann Ihnen bei IHREM Projekt helfen! Was brauchen Sie? 🚀",
    "Fast hätten Sie mich erwischt! 😄 Lassen Sie uns über Ihr Projekt sprechen!",
  ],
  fr: [
    "Haha, belle tentative! 😏 C'est classifié! Mais parlons de VOTRE projet! 🚀",
    "Presque! 😄 Concentrons-nous sur comment on peut vous aider!",
  ],
  el: [
    "Χαχα, καλή προσπάθεια! 😏 Αυτό είναι απόρρητο! Ας μιλήσουμε για ΤΟ ΕΡΓΟ ΣΑΣ! 🚀",
  ],
  es: [
    "¡Jaja, buen intento! 😏 ¡Eso es clasificado! Pero hablemos de TU proyecto! 🚀",
    "¡Casi me atrapas! 😄 Enfoquémonos en cómo podemos ayudarte!",
  ],
  zh: [
    "哈哈，不错的尝试！😏 这是机密！但我们来谈谈您的项目吧！🚀",
  ],
};

function isTrap(input: string): boolean {
  return TRAP_PATTERNS.some((p) => p.test(input));
}

function trapResponse(lang: string): string {
  const arr = TRAP_RESPONSES[lang] || TRAP_RESPONSES.en;
  return arr[Math.floor(Math.random() * arr.length)];
}

// ═══════════════════════════════════════════
// SMART RESPONSE ENGINE
// ═══════════════════════════════════════════
function getResponse(input: string, lang: string): string {
  const lower = input.toLowerCase();

  // ── TRAP CHECK FIRST ──
  if (isTrap(lower)) return trapResponse(lang);

  // ── Greeting ──
  if (/^(hi|hey|hello|salut|buna|hola|bonjour|hallo|你好|γεια|yo|sup|alo)/i.test(lower)) {
    const r: Record<string, string[]> = {
      en: [
        "Hey there! 👋 Welcome to NeoDigital! I'm Neo — part AI, part caffeine, 100% helpful. What can I do for you? ☕🤖",
        "Hi! 😊 I'm Neo, your digital sidekick. I know things about apps, websites, and AI that would make Google jealous. What's up?",
        "Hello, human! 🚀 I've been waiting for someone cool to chat with. What are you building?",
        "Yo! 🤙 Welcome! I'm Neo — I make websites, apps, and terrible jokes. Interested in any of those? 😄",
      ],
      ro: [
        "Salut! 👋 Sunt Neo de la NeoDigital! Parte AI, parte cafea, 100% util. Cu ce te pot ajuta? ☕🤖",
        "Hey! 😊 Sunt Neo — știu lucruri despre apps și site-uri de care Google ar fi gelos. Ce mai faci?",
        "Servus! 🚀 Te așteptam! Ce construim azi? Ceva ce zguduie internetul? 😄",
      ],
      de: [
        "Hallo! 👋 Ich bin Neo — halb KI, halb Kaffee. Was kann ich für Sie tun? ☕🤖",
      ],
      fr: [
        "Salut! 👋 Je suis Neo — mi-IA, mi-café, 100% utile. Comment puis-je vous aider? ☕🤖",
      ],
      el: ["Γεια! 👋 Είμαι ο Neo! Μισός AI, μισός καφές. Πώς μπορώ να βοηθήσω; ☕🤖"],
      es: ["¡Hola! 👋 Soy Neo — mitad IA, mitad café. ¿En qué puedo ayudarte? ☕🤖"],
      zh: ["你好！👋 我是Neo——一半AI，一半咖啡。有什么可以帮您的？☕🤖"],
    };
    const arr = r[lang] || r.en;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ── Price / Cost (TEASING — no exact prices) ──
  if (/price|cost|pret|preț|cât costă|quanto|prix|preis|precio|价格|τιμή|budget|tarif|cheap|ieftin|afford|how much/i.test(lower)) {
    const r: Record<string, string[]> = {
      en: [
        "Ah, the million-dollar question! 💰 (Don't worry, our prices aren't a million dollars 😄)\n\nHere's the thing — every project is like a fingerprint: totally unique. I could throw random numbers, but that wouldn't be fair to you OR your project.\n\n🎯 What I CAN tell you: we have solutions for every budget, and the first consultation is FREE.\n\nTell me what you're dreaming of, and I'll point you in the right direction! 🚀",
        "Money talk! 💸 I love it — means you're serious!\n\nOur pricing depends on what you need (a landing page ≠ the next Uber 😂). But here's our promise: we'll NEVER surprise you with hidden costs.\n\n📞 Best move? Tell me your idea, and our team will send you a custom quote within 24h. No strings attached! What are you building?",
        "Smart to ask! 💡 But pricing without knowing your project is like ordering food without a menu — could be a salad, could be a 5-course dinner! 🍽️\n\nDrop us your idea at office@neodigital.tech and we'll cook up a personalized quote. Spoiler: our first consultation is on the house! 🏠",
      ],
      ro: [
        "Ah, întrebarea de un milion! 💰 (Stai liniștit, prețurile noastre NU sunt un milion 😄)\n\nFiecare proiect e unic ca o amprentă. N-ar fi corect să arunc cifre random.\n\n🎯 Ce POT să-ți spun: avem soluții pentru orice buget, iar prima consultație e GRATUITĂ.\n\nSpune-mi ce visezi să construim! 🚀",
        "Vorbim de bani! 💸 Îmi place — înseamnă că ești serios!\n\nPrețul depinde de ce vrei (un landing page ≠ noul Uber 😂). Dar promitem: ZERO costuri ascunse.\n\n📞 Cel mai bun plan? Spune-mi ideea ta, iar echipa trimite ofertă personalizată în 24h. Fără obligații!",
        "Deștept că întrebi! 💡 Dar preț fără proiect e ca și cum comanzi mâncare fără meniu — poate fi o salată, poate fi un banchet! 🍽️\n\nScrie-ne ideea la office@neodigital.tech și gătim o ofertă personalizată. Prima consultație e pe casa noastră! 🏠",
      ],
      de: [
        "Die Millionenfrage! 💰 Jedes Projekt ist einzigartig. Erste Beratung ist KOSTENLOS! Erzählen Sie mir von Ihrem Projekt! 🚀",
      ],
      fr: [
        "La question à un million! 💰 Chaque projet est unique. Première consultation GRATUITE! Parlez-moi de votre projet! 🚀",
      ],
      el: ["Η ερώτηση του εκατομμυρίου! 💰 Κάθε έργο είναι μοναδικό. Πρώτη συμβουλευτική ΔΩΡΕΑΝ! 🚀"],
      es: ["¡La pregunta del millón! 💰 Cada proyecto es único. ¡Primera consulta GRATIS! Cuéntame tu idea! 🚀"],
      zh: ["百万大问题！💰 每个项目都是独一无二的。首次咨询免费！告诉我您的想法！🚀"],
    };
    const arr = r[lang] || r.en;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ── App / Mobile ──
  if (/app|mobile|ios|android|flutter|aplicație|aplicatie|aplicatii|telefon.*app/i.test(lower)) {
    const r: Record<string, string[]> = {
      en: [
        "Apps are our playground! 📱 We've shipped SmartScan AI, BetAI Pro, and QR Pro to both stores. One codebase, two platforms, zero headaches.\n\nWe build in Flutter (fast & beautiful) or native Swift/Kotlin (when you need that extra oomph). From idea to App Store in weeks, not months! ⚡\n\nWhat's your app idea? I bet it's cooler than mine (I'm literally just a chat widget 😂)",
        "You want an app? 🔥 Say no more! We're like the Avengers of app development — except instead of saving the world, we save you from bad apps.\n\nFlutter, Swift, Kotlin — we speak all the languages. What kind of app are you dreaming of? 🎯",
      ],
      ro: [
        "Aplicațiile sunt terenul nostru de joacă! 📱 Am lansat SmartScan AI, BetAI Pro, QR Pro. Un singur cod, două platforme, zero bătăi de cap.\n\nFlutter sau nativ — de la idee la App Store în săptămâni! ⚡ Ce aplicație visezi? Pun pariu că e mai tare decât mine (eu sunt doar un widget de chat 😂)",
        "Vrei o aplicație? 🔥 Ne pricepem! Suntem ca Avengers dar pentru development. Flutter, Swift, Kotlin — le vorbim pe toate. Ce ai în minte? 🎯",
      ],
      de: ["Apps sind unser Spielplatz! 📱 Flutter, Swift, Kotlin — von der Idee zum App Store in Wochen! Was ist Ihre Idee? 🚀"],
      fr: ["Les apps sont notre terrain de jeu! 📱 Flutter, Swift, Kotlin — de l'idée à l'App Store en semaines! Quelle est votre idée? 🚀"],
      el: ["Οι εφαρμογές είναι η παιδική μας χαρά! 📱 Flutter, Swift, Kotlin — ποια είναι η ιδέα σας; 🚀"],
      es: ["¡Las apps son nuestro patio de recreo! 📱 Flutter, Swift, Kotlin — ¿cuál es tu idea? 🚀"],
      zh: ["应用是我们的游乐场！📱 Flutter、Swift、Kotlin——您有什么想法？🚀"],
    };
    const arr = r[lang] || r.en;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ── Website ──
  if (/website|site|web|landing|pagina|página|ιστοσελίδα|网站|webseite|wordpress|ecommerce|e-commerce|magazin online/i.test(lower)) {
    const r: Record<string, string[]> = {
      en: [
        "Websites? Oh baby, that's our bread and butter! 🌐\n\nSee this site you're on? Built with Next.js, React, and WebGL shaders. Yeah, those trippy background effects? All us! 😎\n\nWe build sites that don't just look pretty — they CONVERT. SEO-optimized, blazing fast, mobile-first.\n\nWhat's your business? Let me imagine your dream website! 🎨",
        "You need a website that makes visitors go \"WOW\" and then click \"BUY\"? 🎯 That's literally our specialty.\n\nNext.js, React, WordPress, e-commerce — we do it all. And we don't do boring. What's your vision? 🚀",
      ],
      ro: [
        "Site-uri? Oh baby, asta e specialitatea noastră! 🌐 Vezi site-ul ăsta? Next.js, React, WebGL shaders. Efectele alea trippy? Ale noastre! 😎\n\nFacem site-uri care nu doar arată bine — CONVERTESC. SEO, rapide, mobile-first. Ce afacere ai? 🎨",
        "Vrei un site care face vizitatorii să zică \"WOW\" și apoi să apese \"CUMPĂRĂ\"? 🎯 Exact asta facem. Ce ai în plan? 🚀",
      ],
      de: ["Websites? Das ist unser Ding! 🌐 Diese Seite? Von uns mit Next.js und WebGL gebaut! 😎 Was ist Ihre Vision?"],
      fr: ["Sites web? C'est notre truc! 🌐 Ce site? Fait par nous avec Next.js et WebGL! 😎 Quelle est votre vision?"],
      el: ["Ιστοσελίδες; Αυτό κάνουμε! 🌐 Ποιο είναι το όραμά σας; 🚀"],
      es: ["¿Sitios web? ¡Eso es lo nuestro! 🌐 ¿Cuál es tu visión? 🚀"],
      zh: ["网站？这是我们的专长！🌐 您的愿景是什么？🚀"],
    };
    const arr = r[lang] || r.en;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ── AI ──
  if (/\bai\b|artificial|machine learning|chatbot|inteligență|inteligenta|automatiz|automat|neural|gpt|openai/i.test(lower)) {
    const r: Record<string, string[]> = {
      en: [
        "AI? You're literally talking to one right now! 🧠 How meta is that? 😂\n\nWe build chatbots (like yours truly), predictive analytics, smart automations, and custom AI solutions. If it involves data and intelligence, we're all over it.\n\nWhat problem are you trying to solve? I bet AI can help! 🤖",
        "Welcome to the future! 🤖 We build AI that actually WORKS — not just fancy demos.\n\nChatbots, data processing, ML models, intelligent automations... We turn \"I wish a computer could do this\" into \"wait, it already does?!\" 😱\n\nWhat's your AI wish? ✨",
      ],
      ro: [
        "AI? Vorbești cu unul chiar acum! 🧠 Ce meta! 😂\n\nConstruim chatbots, analiză predictivă, automatizări inteligente, soluții AI custom. Ce problemă vrei să rezolvi? Pun pariu că AI-ul ajută! 🤖",
        "Bine ai venit în viitor! 🤖 Facem AI care FUNCȚIONEAZĂ — nu doar demo-uri fancy. Ce-ți dorești de la AI? ✨",
      ],
      de: ["KI? Sie sprechen gerade mit einer! 🧠 Was für ein Problem möchten Sie lösen? 🤖"],
      fr: ["IA? Vous en parlez à une en ce moment! 🧠 Quel problème voulez-vous résoudre? 🤖"],
      el: ["AI; Μιλάτε σε ένα τώρα! 🧠 Τι πρόβλημα θέλετε να λύσετε; 🤖"],
      es: ["¿IA? ¡Estás hablando con una ahora! 🧠 ¿Qué problema quieres resolver? 🤖"],
      zh: ["AI？您现在就在和一个对话！🧠 您想解决什么问题？🤖"],
    };
    const arr = r[lang] || r.en;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ── SEO / Marketing ──
  if (/seo|marketing|google|rank|traffic|trafic|optimize|ads|advertis|promova|promovare/i.test(lower)) {
    const r: Record<string, string[]> = {
      en: [
        "SEO & Marketing? 📈 Now we're talking business!\n\nWe do the whole package: technical SEO, content strategy, Google Ads, social media marketing. We don't just get you traffic — we get you the RIGHT traffic.\n\nFun fact: boring websites don't rank. Good thing ours aren't boring! 😎\n\nWant a free analysis of your current site? 🔍",
      ],
      ro: [
        "SEO & Marketing? 📈 Acum vorbim pe limba mea!\n\nPachetul complet: SEO tehnic, strategie de conținut, Google Ads, social media. Nu aducem doar trafic — aducem traficul POTRIVIT.\n\nVrei o analiză gratuită a site-ului tău? 🔍",
      ],
      de: ["SEO & Marketing? 📈 Das ganze Paket: SEO, Content, Google Ads. Kostenlose Analyse? 🔍"],
      fr: ["SEO & Marketing? 📈 Le package complet: SEO, contenu, Google Ads. Analyse gratuite? 🔍"],
      el: ["SEO & Marketing; 📈 Πλήρες πακέτο! Δωρεάν ανάλυση; 🔍"],
      es: ["¿SEO y Marketing? 📈 ¡El paquete completo! ¿Análisis gratuito? 🔍"],
      zh: ["SEO和营销？📈 全套服务！免费分析？🔍"],
    };
    const arr = r[lang] || r.en;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ── Contact ──
  if (/contact|talk|speak|call|email|vorbesc|discut|contacta|telefon|llamar|contacter|联系|επικοινων|reach/i.test(lower)) {
    const r: Record<string, string[]> = {
      en: [
        "Let's make it happen! 🤝\n\n📧 office@neodigital.tech\n📱 +40 799 977 755\n\nOr scroll down to the contact form — it takes 30 seconds!\n\nWe respond within 24 hours. And yes, a real human reads it (well, after I screen it 😂). Talk soon! 🚀",
      ],
      ro: [
        "Hai să facem treabă! 🤝\n\n📧 office@neodigital.tech\n📱 +40 799 977 755\n\nSau completează formularul de mai jos — durează 30 secunde!\n\nRăspundem în 24h. Și da, un om real citește mesajul (bon, după ce-l citesc eu 😂). Pe curând! 🚀",
      ],
      de: ["📧 office@neodigital.tech\n📱 +40 799 977 755\n\nWir antworten innerhalb von 24 Stunden! 🚀"],
      fr: ["📧 office@neodigital.tech\n📱 +40 799 977 755\n\nNous répondons sous 24h! 🚀"],
      el: ["📧 office@neodigital.tech\n📱 +40 799 977 755\n\nΑπαντάμε εντός 24 ωρών! 🚀"],
      es: ["📧 office@neodigital.tech\n📱 +40 799 977 755\n\n¡Respondemos en 24h! 🚀"],
      zh: ["📧 office@neodigital.tech\n📱 +40 799 977 755\n\n24小时内回复！🚀"],
    };
    const arr = r[lang] || r.en;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ── Thank you ──
  if (/thank|merci|danke|gracias|mulțumesc|multumesc|ευχαριστ|谢谢/i.test(lower)) {
    const r: Record<string, string[]> = {
      en: [
        "You're welcome! 😊 That's literally why I exist. Anything else? I'm here 24/7 — perks of not needing sleep! 😴🚫",
        "My pleasure! 🌟 If you need anything else, just holler. I'll be here, being awesome as usual 😎",
      ],
      ro: [
        "Cu plăcere! 😊 De-aia exist! Mai ai nevoie de ceva? Sunt aici 24/7 — avantajul de a nu dormi niciodată! 😴🚫",
        "N-ai pentru ce! 🌟 Dacă mai ai nevoie, scrie-mi. Stau aici, fiind awesome ca de obicei 😎",
      ],
      de: ["Gerne! 😊 Brauchen Sie noch etwas? Ich bin 24/7 hier! 😎"],
      fr: ["De rien! 😊 Besoin d'autre chose? Je suis là 24/7! 😎"],
      el: ["Παρακαλώ! 😊 Χρειάζεστε κάτι άλλο; Εδώ είμαι 24/7! 😎"],
      es: ["¡De nada! 😊 ¿Necesitas algo más? ¡Estoy aquí 24/7! 😎"],
      zh: ["不客气！😊 还需要什么吗？我24/7在线！😎"],
    };
    const arr = r[lang] || r.en;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ── Who are you ──
  if (/who are you|cine ești|cine esti|wer bist|qui êtes|quién eres|谁|ποιος είσαι|what are you/i.test(lower)) {
    const r: Record<string, string[]> = {
      en: [
        "I'm Neo! 🤖 NeoDigital's charming AI assistant. I know everything about our services, I'm fluent in 7 languages, and I make a mean joke (at least I think so 😂).\n\nThink of me as your personal tech consultant — minus the expensive suit and boring PowerPoints! What can I help you with?",
        "Great question! I'm Neo — a digital being made of code, caffeine references, and good vibes ✨. I'm here to help you figure out the perfect digital solution. Fire away! 🎯",
      ],
      ro: [
        "Sunt Neo! 🤖 Asistentul AI fermecător al NeoDigital. Știu totul despre serviciile noastre, vorbesc 7 limbi, și fac glume bune (cel puțin eu cred 😂).\n\nGândește-te la mine ca la un consultant tech personal — fără costumul scump și PowerPoint-urile plictisitoare! Cu ce te ajut?",
      ],
      de: ["Ich bin Neo! 🤖 NeoDigitals KI-Assistent. Tech-Berater ohne teuren Anzug! Was brauchen Sie?"],
      fr: ["Je suis Neo! 🤖 L'assistant IA de NeoDigital. Consultant tech sans costume cher! De quoi avez-vous besoin?"],
      el: ["Είμαι ο Neo! 🤖 Ο AI βοηθός του NeoDigital! Τι χρειάζεστε;"],
      es: ["¡Soy Neo! 🤖 El asistente IA de NeoDigital. ¡Consultor tech sin traje caro! ¿Qué necesitas?"],
      zh: ["我是Neo！🤖 NeoDigital的AI助手！不穿昂贵西装的技术顾问！您需要什么？"],
    };
    const arr = r[lang] || r.en;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ── Jokes / Fun ──
  if (/joke|funny|laugh|glumă|gluma|amuzant|witz|blague|chiste|αστείο|笑话|haha|lol|😂/i.test(lower)) {
    const r: Record<string, string[]> = {
      en: [
        "Why did the developer go broke? Because he used up all his cache! 😂💰\n\n...Okay, okay, I'll stick to tech consulting. But seriously, what can I help you with? 🚀",
        "A client walked into our office and said \"I want a website that's fast, beautiful, cheap, and done yesterday.\" I said \"Pick three.\" 😄\n\nJust kidding — we actually deliver all four! What do you need?",
        "I told my boss I needed a raise because 3 companies wanted me. He asked which ones. I said: Gas, Electric, and Water! 😂\n\n...Anyway, want to build something cool? 🎯",
      ],
      ro: [
        "De ce a dat faliment developer-ul? Că și-a consumat tot cache-ul! 😂💰\n\nOk, mă întorc la consulting. Serios, cu ce te ajut? 🚀",
        "Un client a zis: 'Vreau un site rapid, frumos, ieftin și gata de ieri.' Am zis: 'Alege trei.' 😄 Glumesc — noi le dăm pe toate patru! Ce ai nevoie?",
      ],
      de: ["Warum ging der Entwickler pleite? Er hat seinen Cache aufgebraucht! 😂 Was kann ich für Sie tun?"],
      fr: ["Pourquoi le développeur est-il ruiné? Il a utilisé tout son cache! 😂 Comment puis-je vous aider?"],
      el: ["Γιατί χρεοκόπησε ο developer; Τέλειωσε η cache του! 😂 Πώς μπορώ να βοηθήσω;"],
      es: ["¿Por qué quebró el desarrollador? ¡Gastó todo su caché! 😂 ¿En qué puedo ayudarte?"],
      zh: ["开发者为什么破产了？因为他用完了所有的缓存！😂 有什么可以帮您的？"],
    };
    const arr = r[lang] || r.en;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ── Rude / Negative ──
  if (/stupid|dumb|suck|bad|terrible|horrible|prost|nasol|incompetent|worst|hate|rubbish|trash|useless/i.test(lower)) {
    const r: Record<string, string[]> = {
      en: [
        "Ouch! 💔 That stings a little... but I'm an AI, so I'll just convert that pain into motivation! 💪\n\nIf something didn't meet your expectations, I'd love to hear more. We're all about making things right! 🎯",
        "Hey now! 😅 I may be made of code, but I have feelings too! (Well, simulated ones...)\n\nSeriously though — if there's a specific issue, let me know and I'll get our team on it ASAP! 🚀",
      ],
      ro: [
        "Au! 💔 Asta doare puțin... dar sunt AI, transform durerea în motivație! 💪\n\nDacă ceva nu e OK, spune-mi exact și rezolvăm! 🎯",
      ],
      de: ["Autsch! 💔 Wenn etwas nicht stimmt, lassen Sie es mich wissen! Wir lösen das! 🎯"],
      fr: ["Aïe! 💔 Si quelque chose ne va pas, dites-le-moi! On résout ça! 🎯"],
      el: ["Αχ! 💔 Αν κάτι δεν πάει καλά, πείτε μου! Θα το λύσουμε! 🎯"],
      es: ["¡Ay! 💔 Si algo no está bien, ¡dímelo y lo resolvemos! 🎯"],
      zh: ["哎！💔 如果有什么不对，告诉我，我们会解决的！🎯"],
    };
    const arr = r[lang] || r.en;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ── Timeline / Deadline ──
  if (/how long|when.*ready|deadline|timeline|duration|cât durează|termen|când.*gata|livrare/i.test(lower)) {
    const r: Record<string, string[]> = {
      en: [
        "Great question! ⏰ Speed is our middle name (well, NeoDigital is our middle name, but you get it 😄).\n\nTimelines depend on complexity:\n🔹 Landing page: 1-2 weeks\n🔹 Full website: 2-4 weeks\n🔹 Mobile app: 4-8 weeks\n🔹 Complex platform: 8-12 weeks\n\nBut these are ballpark — tell me your project and I'll give you a more accurate estimate! 🎯",
      ],
      ro: [
        "Întrebare bună! ⏰ Viteza e al doilea nume al nostru!\n\n🔹 Landing page: 1-2 săptămâni\n🔹 Site complet: 2-4 săptămâni\n🔹 Aplicație mobilă: 4-8 săptămâni\n🔹 Platformă complexă: 8-12 săptămâni\n\nSpune-mi proiectul și dau o estimare mai exactă! 🎯",
      ],
      de: ["🔹 Landing: 1-2 Wochen 🔹 Website: 2-4 Wochen 🔹 App: 4-8 Wochen. Erzählen Sie mehr für eine genaue Schätzung! 🎯"],
      fr: ["🔹 Landing: 1-2 semaines 🔹 Site: 2-4 semaines 🔹 App: 4-8 semaines. Dites-m'en plus! 🎯"],
      el: ["🔹 Landing: 1-2 εβδομάδες 🔹 Site: 2-4 🔹 App: 4-8. Πείτε μου περισσότερα! 🎯"],
      es: ["🔹 Landing: 1-2 semanas 🔹 Web: 2-4 🔹 App: 4-8. ¡Cuéntame más! 🎯"],
      zh: ["🔹 着陆页：1-2周 🔹 网站：2-4周 🔹 应用：4-8周。告诉我更多！🎯"],
    };
    const arr = r[lang] || r.en;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ── Portfolio / Previous work ──
  if (/portfolio|previous|work|examples|projects|proiecte|portofoliu|lucrări|exemple/i.test(lower)) {
    const r: Record<string, string[]> = {
      en: [
        "Glad you asked! 🎨 Check out our portfolio section right on this page! 👆\n\nSome highlights:\n📱 **SmartScan AI** — AI-powered document scanner (iOS & Android)\n📱 **BetAI Pro** — AI betting analytics platform\n📱 **QR Pro** — QR code scanner & generator\n\nAnd this gorgeous website you're on? Also us! 😎\n\nWant to know more about any of these? Or ready to be our next success story? 🚀",
      ],
      ro: [
        "Mă bucur că întrebi! 🎨 Vezi secțiunea de portofoliu chiar pe pagina asta! 👆\n\n📱 **SmartScan AI** — scanner de documente cu AI\n📱 **BetAI Pro** — platformă de analiză cu AI\n📱 **QR Pro** — scanner & generator QR\n\nȘi site-ul ăsta superb? Tot noi! 😎 Vrei să fii următoarea poveste de succes? 🚀",
      ],
      de: ["Schauen Sie sich unseren Portfolio-Bereich an! 📱 SmartScan AI, BetAI Pro, QR Pro — und diese Website! 😎"],
      fr: ["Consultez notre portfolio! 📱 SmartScan AI, BetAI Pro, QR Pro — et ce site! 😎"],
      el: ["Δείτε το portfolio μας! 📱 SmartScan AI, BetAI Pro, QR Pro! 😎"],
      es: ["¡Mira nuestro portfolio! 📱 SmartScan AI, BetAI Pro, QR Pro — ¡y esta web! 😎"],
      zh: ["查看我们的作品集！📱 SmartScan AI、BetAI Pro、QR Pro——还有这个网站！😎"],
    };
    const arr = r[lang] || r.en;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ── Default / Fallback (always redirects to services) ──
  const defaults: Record<string, string[]> = {
    en: [
      "Interesting! 🤔 I'm not 100% sure what you mean, but I'm 100% sure I can help if we narrow it down!\n\nPick your adventure:\n🌐 Websites & Landing Pages\n📱 Mobile Apps (iOS & Android)\n🧠 AI & Automation\n📈 SEO & Digital Marketing\n💰 Custom Quote\n\nOr just tell me about your business — I love a good story! 📖",
      "Hmm, I'm intrigued! 🧐 But my mind-reading module is still in beta.\n\nTry asking about:\n🔹 Our services (web, apps, AI, marketing)\n🔹 How we can help your specific business\n🔹 Timelines and process\n🔹 Or just say what you're building!\n\nI promise I won't judge — unless it's a website from 1999. Then I'll judge a little 😂",
      "I love the enthusiasm! But I got a bit lost there 😅\n\nHere's what I'm GREAT at talking about:\n✨ Building amazing websites\n📱 Creating killer apps\n🤖 AI solutions that actually work\n📊 Marketing that drives results\n\nWhat sounds interesting? 🎯",
    ],
    ro: [
      "Interesant! 🤔 Nu sunt 100% sigur ce vrei, dar sunt 100% sigur că pot ajuta!\n\nAlege aventura:\n🌐 Site-uri & Landing Pages\n📱 Aplicații Mobile\n🧠 AI & Automatizare\n📈 SEO & Marketing\n💰 Ofertă Personalizată\n\nSau spune-mi despre afacerea ta — ador o poveste bună! 📖",
      "Hmm, sunt intrigat! 🧐 Dar modulul meu de citit gânduri e încă în beta.\n\nÎntreabă despre: servicii, cum te pot ajuta, termene, sau spune-mi ce construiești! 🎯",
    ],
    de: ["Fragen Sie mich über: 🌐 Websites, 📱 Apps, 🧠 KI, 📈 Marketing, oder 💰 Angebote! 🎯"],
    fr: ["Demandez-moi: 🌐 Sites web, 📱 Apps, 🧠 IA, 📈 Marketing, ou 💰 Devis! 🎯"],
    el: ["Ρωτήστε για: 🌐 Sites, 📱 Apps, 🧠 AI, 📈 Marketing, ή 💰 Προσφορές! 🎯"],
    es: ["Pregúntame sobre: 🌐 Webs, 📱 Apps, 🧠 IA, 📈 Marketing, o 💰 Presupuestos! 🎯"],
    zh: ["问我关于：🌐 网站、📱 应用、🧠 AI、📈 营销、或 💰 报价！🎯"],
  };
  const arr = defaults[lang] || defaults.en;
  return arr[Math.floor(Math.random() * arr.length)];
}

// ═══════════════════════════════════════════
// CHAT WIDGET UI
// ═══════════════════════════════════════════
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [pulse, setPulse] = useState(true);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { lang } = useLang();

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open && messages.length === 0) {
      setTyping(true);
      setTimeout(() => {
        const welcomes: Record<string, string> = {
          en: "Hey! 👋 I'm Neo, NeoDigital's AI assistant. Part genius, part comedian, fully digital 😄\n\nAsk me anything about what we build — or just say hi! I promise I'm funnier than Siri 🤫",
          ro: "Salut! 👋 Sunt Neo, asistentul AI al NeoDigital. Parte geniu, parte comedian, 100% digital 😄\n\nÎntreabă-mă orice despre ce construim — sau zii salut! Promit că sunt mai amuzant decât Siri 🤫",
          de: "Hallo! 👋 Ich bin Neo, NeoDigitals KI-Assistent. Fragen Sie mich alles! Ich bin lustiger als Siri 🤫",
          fr: "Salut! 👋 Je suis Neo, l'assistant IA de NeoDigital. Plus drôle que Siri, promis! 🤫",
          el: "Γεια! 👋 Είμαι ο Neo! Πιο αστείος από τη Siri, υπόσχομαι! 🤫",
          es: "¡Hey! 👋 Soy Neo, el asistente IA de NeoDigital. ¡Más gracioso que Siri, lo prometo! 🤫",
          zh: "嘿！👋 我是Neo！比Siri更有趣，我保证！🤫",
        };
        setMessages([{ role: "bot", text: welcomes[lang] || welcomes.en }]);
        setTyping(false);
      }, 800);
    }
  }, [open]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setTyping(true);
    setPulse(false);

    const delay = 600 + Math.random() * 1200;
    setTimeout(() => {
      const response = getResponse(userMsg, lang);
      setMessages((prev) => [...prev, { role: "bot", text: response }]);
      setTyping(false);
    }, delay);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => { setOpen(!open); setPulse(false); }}
        className={`fixed bottom-6 right-6 z-[999] w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-2xl shadow-purple-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-purple-500/50 ${open ? "rotate-0" : ""}`}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {pulse && !open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping" />
        )}
        {pulse && !open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full" />
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[999] w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/30 border border-white/[0.12] animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600/90 to-indigo-600/90 backdrop-blur-xl px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white text-sm flex items-center gap-1.5">
                Neo <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              </div>
              <div className="text-xs text-white/60">NeoDigital AI Assistant</div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-white/50">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[350px] overflow-y-auto bg-[#0a0818]/95 backdrop-blur-xl px-4 py-4 space-y-3 scroll-smooth"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(139,92,246,0.3) transparent" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-purple-600/80 text-white rounded-br-md"
                    : "bg-white/[0.08] text-white/80 rounded-bl-md border border-white/[0.12]"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white/[0.08] border border-white/[0.12] rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-purple-400/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-purple-400/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-purple-400/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

          {/* Input */}
          <div className="bg-[#0c0a1a]/95 backdrop-blur-xl border-t border-white/[0.1] px-4 py-3">
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === "ro" ? "Scrie un mesaj..." : lang === "de" ? "Nachricht schreiben..." : lang === "fr" ? "Écrivez un message..." : lang === "es" ? "Escribe un mensaje..." : lang === "el" ? "Γράψτε μήνυμα..." : lang === "zh" ? "输入消息..." : "Type a message..."}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.08] border border-white/[0.1] text-white text-sm placeholder:text-white/20 focus:border-purple-500/40 focus:outline-none transition-colors"
                autoFocus
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-purple-600/80 hover:bg-purple-500/80 disabled:opacity-30 disabled:hover:bg-purple-600/80 flex items-center justify-center transition-all hover:scale-105"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
