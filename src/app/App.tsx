import { useState, useRef, useEffect } from "react";
import { Code2, Database, BarChart3, Brain, Wrench, Briefcase, GraduationCap, Award, ChevronDown } from "lucide-react";
import svgPathsBurger from "@/imports/Burger/svg-mtdv1onceg";
import svgPathsHome from "@/imports/Home/svg-ewwfuvsrng";
import imgHeroPerson from "@/imports/Burger/f4d7792241ade353515843fc44bf4f33ac8d48cd.png";
import imgAboutPerson from "@/imports/About/54460c6b07a60652048526012507cff338176e45.png";

// ─── NON-TRANSLATABLE DATA (urls, images, dates, proper nouns) ───────────────
const DATA = {
  personal: {
    handle: "b_saurabh7",
    name: "Saurabh Babalsure",
    email: "saurabhbabalsure@gmail.com",
    phone: "+91 7709545306",
    website: "saurabhbabalsure.me",
    linkedinUrl: "https://linkedin.com/in/saurabh-babalsure",
    githubUrl: "https://github.com/bsaurabh7",
    kaggleUrl: "https://kaggle.com/bsaurabh7",
  },
  projects: [
    { name: "OmniStream – Fleet Telemetry & Lakehouse", stack: ["Azure Event Hubs","Databricks","PySpark","Delta Lake","MongoDB","Power BI"], liveUrl: null as null, githubUrl: "https://github.com/bsaurabh7" },
    { name: "Arthmize – AI Money Mentor",              stack: ["Vite","React","FastAPI","Supabase","Qwen 2.5","Playwright"],              liveUrl: null as null, githubUrl: "https://github.com/bsaurabh7" },
    { name: "Qualify – AI Voice Bot",                  stack: ["Whisper","GPT-3.5","RAG","Node.js","Twilio","React.js"],                  liveUrl: null as null, githubUrl: "https://github.com/bsaurabh7" },
    { name: "SymAI – AI-Based OPD Assistance System",  stack: ["Whisper AI","NLP","Qwen/GPT","Next.js","Node.js","FastAPI","MySQL","MongoDB"], liveUrl: null as null, githubUrl: "https://github.com/bsaurabh7" },
    { name: "XPlorer – Trek Planning & Gear Platform",  stack: ["Java","JavaScript","JSP","MySQL","Apache Tomcat","Bootstrap"],              liveUrl: null as null, githubUrl: "https://github.com/bsaurabh7" },
  ],
  smallProjects: [
    { name: "AutoScore – ML Used Car Price Forecasting", stack: "Python · Scikit-learn · Pandas · NumPy · Matplotlib", githubUrl: "https://github.com/bsaurabh7", context: "Academic Project 2025" },
    { name: "ParKing – Parking Management System", stack: "HTML · CSS · Bootstrap · PHP · MySQL · XAMPP", githubUrl: "https://github.com/bsaurabh7", context: "Academic Project 2024" },
  ],
  skills: [
    { icon: Code2,    items: ["Python","Bash","Go","SQL","C","C++"] },
    { icon: Database, items: ["MySQL","PostgreSQL","MongoDB","Pinecone","Delta Lake"] },
    { icon: BarChart3,items: ["Data Modeling","ETL","Data Warehousing","Azure Data Lake Storage","Azure Databricks","Apache Spark","Kafka","Delta Lake","Power BI (DAX)","Statistics","EDA","Excel"] },
    { icon: Brain,    items: ["NumPy","Pandas","Scikit-learn","Matplotlib","PyTorch","Feature Engineering","Model Evaluation","XGBoost","LightGBM","Jupyter Notebook","Kaggle","NLP","LLMs","RAG","Hugging Face","OpenAI API","LangChain","LlamaIndex"] },
    { icon: Wrench,   items: ["Azure Infrastructure","AWS Fundamentals","Git","Linux","CI/CD","Docker","ML Lifecycle","MLflow","VS Code"] },
  ],
  education: [
    { institution: "ASM's IBMR, Pune (SPPU)", period: "Sep 2023 – Jun 2025", grade: "7.44 / 10" },
    { institution: "MMM College, Pune (SPPU)", period: "Sep 2020 – Jul 2023", grade: "8.59 / 10" },
    { institution: "Maharashtra State Board",  period: "Jun 2019 – Jul 2020", grade: "64.62%" },
    { institution: "Maharashtra State Board",  period: "Jun 2017 – Jun 2018", grade: "90.00%" },
  ],
  certifications: [
    { issuer: "Microsoft Learn",    period: "Jun 2026 – Jun 2027", grade: null as null|string, url: "https://learn.microsoft.com/api/credentials/share/en-gb/SaurabhBabalsure-9219/C0EECF74660F3791?sharingId=7A412054C1F5E39A" },
    { issuer: "MongoDB University", period: "Jun 2026",            grade: null,                url: "https://www.credly.com/badges/840aaf2d-ffc4-4df9-809d-d92d584f9dbd" },
    { issuer: "Snowflake",          period: "Jul 2026",            grade: null,                url: null as null|string },
    { issuer: "Docker",             period: "Jul 2026",            grade: null,                url: null },
    { issuer: "LinkedIn Learning",  period: "Aug 2026",            grade: null,                url: null },
    { issuer: "AWS Academy",        period: "Aug 2024",            grade: null,                url: null },
    { issuer: "IBM / edX",          period: "Oct 2023",            grade: null,                url: null },
    { issuer: "Lotus IT Hub, Pune", period: "Aug 2022",            grade: "A+",                url: null },
  ],
  allMedia: [
    { platform: "Github",   label: "bsaurabh7",          url: "https://github.com/bsaurabh7" },
    { platform: "LinkedIn", label: "saurabh-babalsure",  url: "https://linkedin.com/in/saurabh-babalsure" },
    { platform: "Kaggle",   label: "bsaurabh7",          url: "https://kaggle.com/bsaurabh7" },
  ],
};

// ─── ALL TRANSLATABLE TEXT ────────────────────────────────────────────────────
const T = {
  en: {
    // NAV
    nav: { home:"home", aboutMe:"about-me", skills:"skills", projects:"projects", experience:"experience", certifications:"certifications", education:"education", achievements:"achievements", contacts:"contact" },
    // HERO
    role1: "data engineer", role2: "ai/ml developer", heroAnd: "and",
    heroLine1: "Raw Data.", heroLine2: "Real Intelligence.", heroLine3: "Built by",
    tagline: "Transforming data into intelligent, scalable solutions — applied AI, ML, Generative AI & MLOps with a focus on innovation and continuous learning.",
    currentlyOn: "Currently working as a",
    currentlyOnValue: "Freelance Data Consultant",
    contactBtn: "Contact me !!",
    roadmapLabel: "career path",
    roadmap: ["Data Analyst","Data Analytics","Data Engineer","Data Scientist","Machine Learning Engineer","AI/Generative AI Engineer","MLOps Engineer"],
    // QUOTE
    quote: "With great data comes great responsibility — and great opportunity",
    quoteAuthor: "A Data Engineering Principle",
    // BIO
    bio: [
      "Hello, I'm Saurabh Babalsure!",
      "I'm a Data Engineer based in Pune, India — passionate about transforming raw data into intelligent, scalable solutions through applied AI, Machine Learning, and Generative AI.",
      "I build end-to-end systems: from real-time streaming pipelines and cloud lakehouses to RAG-powered LLM applications and ML model APIs. Building a strong foundation in MLOps for robust, production-ready systems — continuously learning the newest technologies in AI.",
    ],
    // EXPERIENCE
    expRole: "Freelance Data Consultant",
    expCompany: "Independent / Freelance Team",
    expType: "Freelance",
    expDesc: "Collaborating in a freelance team to deliver web applications and analytical pipelines for SMEs. Built automated data workflows and marketing analytics, transforming sales and service metrics into actionable insights to drive business growth.",
    // PROJECTS
    projectDescs: [
      "End-to-end Kappa streaming platform for 50K simulated vehicles using Azure Event Hubs, Databricks (PySpark), and Delta Lake. Real-time pipelines with ML anomaly detection via Isolation Forest, MongoDB Atlas, ADLS Gen2, and Power BI dashboards.",
      "AI-powered finance assistant for tax, retirement & investment insights using LLMs and live data pipelines. Built with Vite, React, FastAPI, Supabase (PostgreSQL), Hugging Face (Qwen 2.5). Enabled 2–3x faster financial planning.",
      "Lead qualification voice bot using Whisper, GPT-3.5, and RAG to retrieve contextual leads. Node.js with MongoDB & MySQL for data management, React.js + Tailwind dashboard, Twilio for automated calls — 80% lead processing efficiency.",
      "Scalable AI-powered OPD system streamlining patient intake using Whisper AI, NLP, and Qwen/GPT to process data and generate preliminary reports. Doctors access EHRs via a Next.js dashboard backed by Node.js, FastAPI, MySQL, and MongoDB. Delivers faster consultations, multilingual support, and research-ready data.",
      "Full-stack web application enabling trek planning, gear purchases, payments, and weather integration. Built with Java, JSP, JavaScript, Bootstrap, MySQL, and Apache Tomcat. Designed ER/DFD diagrams to map system architecture.",
    ],
    projectContexts: ["Team Project 2026", "ET GenAI Hackathon 2026 — Semifinalist", "Team Project 2026", "Team Project 2025", "Academic Project 2024"],
    smallProjectDescs: [
      "Evaluated ML models (Random Forest, Linear Regression, etc.) for used car price prediction using R² score. Processed data with Pandas and NumPy, visualized trends with Matplotlib in Jupyter Notebook.",
      "Web-based parking management system enabling users to search, reserve, and pay for parking slots online with real-time availability tracking, QR-based check-in/check-out, and an admin dashboard for parking and payment management.",
    ],
    // SKILLS
    skillCategories: ["Languages","Databases","Data Engineering & Analytics","AI / ML & Libraries","Cloud & MLOps"],
    // EDUCATION
    eduDegrees: ["MCA","B.Sc. Computer Science","XII – Computer Science","X"],
    // CERTIFICATIONS
    certTitles: [
      "Azure Databricks Data Engineer Associate",
      "MongoDB Certified Associate Data Modeler",
      "Generative AI Professional Certificate",
      "Docker Foundations Professional Certificate",
      "Career Essentials in GitHub Professional Certificate",
      "AWS Academy Graduate – Introduction to Cloud",
      "Introduction to Data Science by IBM",
      "C, C++ Programming",
    ],
    // ACHIEVEMENTS
    achievements: [
      "The Economic Times GenAI Hackathon 2026 (Team of 3) — Semifinalist",
      "Databricks Spark Wars 4.0 Global Hackathon by Celebal Technologies — Participant",
      "MAH-MCA-CET 2023 — 93.80 percentile",
      "Celebal Technologies AnaVerse 2.0 — Final Round, Ranked 74 / 860",
    ],
    // LANGUAGES
    langNames: ["English","Hindi","Marathi"],
    langLevels: ["Business Proficient","Proficient","Native Speaker"],
    // INTERESTS
    interests: ["Sports & Fitness","Solo Alpine Trekking","Exploring New Technologies","Reading & Self-Learning"],
    // FUN FACTS
    funFacts: [
      "Solo alpine trekker when not pushing code",
      "Python is my second native language (after Marathi)",
      "93.80 percentile in MAH-MCA-CET 2023",
      "ET GenAI Hackathon 2026 — Semifinalist",
      "Ranked 74/860 in Celebal AnaVerse 2.0",
      "I like data more than conclusions",
      "Sports and fitness keep me grounded",
      "Reading and self-learning are my superpowers",
    ],
    // SECTION / PAGE LABELS
    sections: { projects:"projects", skills:"skills", experience:"experience", certifications:"certifications", education:"education", achievements:"achievements", aboutMe:"about-me", contacts:"contacts", allMedia:"all-media", languages:"languages", interests:"interests", funFacts:"my-fun-facts" },
    pages: { projects:"projects", worksSub:"List of my projects", completeApps:"complete-apps", smallProjects:"small-projects", experience:"experience", expSub:"My professional journey", certifications:"certifications", certSub:"Professional credentials & badges", achievements:"achievements", achieveSub:"Hackathons, competitions & milestones", education:"education", eduSub:"Academic background", skills:"skills", skillsSub:"Technologies & tools", aboutMe:"about-me", aboutSub:"Who am I?", contacts:"contacts", contactSub:"Get in touch" },
    // BUTTONS
    btns: { viewAll:"View all -->", readMore:"Read more ->", github:"Github <~>", live:"Live <~>", reachMe:"Reach me here", messageMe:"Message me here", callWhatsapp:"Call / WhatsApp" },
    // FOOTER
    footer: { role:"Data Engineer & AI/ML Developer", media:"Media", madeBy:"Made by", copy:"© Copyright" },
    // CONTACT OPEN-TO
    openTo: "I'm open to full-time opportunities as a Data Analyst · Data Analytics · Data Engineer · Data Scientist · Machine Learning Engineer · AI/Generative AI Engineer · MLOps Engineer. If you have a project, a question, or just want to connect — don't hesitate to reach out.",
  },

  hi: {
    nav: { home:"होम", aboutMe:"मेरे बारे में", skills:"कौशल", projects:"परियोजनाएं", experience:"अनुभव", certifications:"प्रमाणपत्र", education:"शिक्षा", achievements:"उपलब्धियां", contacts:"संपर्क" },
    role1: "डेटा इंजीनियर", role2: "एआई/एमएल डेवलपर", heroAnd: "और",
    heroLine1: "कच्चा डेटा।", heroLine2: "असली बुद्धिमत्ता।", heroLine3: "निर्मित",
    tagline: "डेटा को बुद्धिमान, स्केलेबल समाधानों में रूपांतरित करना — अनुप्रयुक्त AI, ML, जनरेटिव AI और MLOps के साथ, नवाचार और निरंतर सीखने पर ध्यान केंद्रित करते हुए।",
    currentlyOn: "वर्तमान में काम कर रहा हूँ",
    currentlyOnValue: "OmniStream – रीयल-टाइम फ्लीट टेलीमेट्री प्लेटफ़ॉर्म",
    contactBtn: "संपर्क करें !!",
    roadmapLabel: "करियर पथ",
    roadmap: ["डेटा एनालिस्ट","डेटा एनालिटिक्स","डेटा इंजीनियर","डेटा साइंटिस्ट","मशीन लर्निंग इंजीनियर","एआई/जनरेटिव एआई इंजीनियर","MLOps इंजीनियर"],
    quote: "महान डेटा के साथ महान जिम्मेदारी आती है — और महान अवसर भी",
    quoteAuthor: "एक डेटा इंजीनियरिंग सिद्धांत",
    bio: [
      "नमस्ते, मैं सौरभ बबलसुरे हूँ!",
      "मैं पुणे, भारत में एक डेटा इंजीनियर हूँ — कच्चे डेटा को बुद्धिमान, स्केलेबल समाधानों में बदलने के प्रति जुनूनी, अनुप्रयुक्त AI, मशीन लर्निंग और जनरेटिव AI के माध्यम से।",
      "मैं एंड-टू-एंड सिस्टम बनाता हूँ: रीयल-टाइम स्ट्रीमिंग पाइपलाइन और क्लाउड लेकहाउस से लेकर RAG-संचालित LLM एप्लिकेशन और ML मॉडल API तक। प्रोडक्शन-रेडी सिस्टम के लिए MLOps में मजबूत नींव बना रहा हूँ।",
    ],
    expRole: "फ्रीलांस डेटा सलाहकार",
    expCompany: "स्वतंत्र / फ्रीलांस टीम",
    expType: "फ्रीलांस",
    expDesc: "SMEs के लिए वेब एप्लिकेशन और विश्लेषणात्मक पाइपलाइन प्रदान करने के लिए एक फ्रीलांस टीम में सहयोग किया। स्वचालित डेटा वर्कफ़्लो और मार्केटिंग एनालिटिक्स बनाए, बिक्री और सेवा मेट्रिक्स को कार्रवाई योग्य अंतर्दृष्टि में बदला।",
    projectDescs: [
      "Azure Event Hubs, Databricks (PySpark) और Delta Lake का उपयोग करके 50K अनुकरणीय वाहनों के लिए एंड-टू-एंड Kappa स्ट्रीमिंग प्लेटफ़ॉर्म। Isolation Forest द्वारा ML विसंगति पहचान, MongoDB Atlas, ADLS Gen2 और Power BI डैशबोर्ड।",
      "LLMs और लाइव डेटा पाइपलाइन का उपयोग करके कर, सेवानिवृत्ति और निवेश अंतर्दृष्टि के लिए AI-संचालित वित्त सहायक। 2–3x तेज़ वित्तीय योजना सक्षम की।",
      "प्रासंगिक लीड पुनः प्राप्त करने के लिए Whisper, GPT-3.5 और RAG का उपयोग करके लीड क्वालिफिकेशन वॉयस बॉट। Twilio के साथ स्वचालित कॉल — 80% लीड प्रोसेसिंग दक्षता।",
      "Whisper AI, NLP और Qwen/GPT का उपयोग करके रोगी डेटा प्रोसेस करने और प्रारंभिक रिपोर्ट तैयार करने वाला स्केलेबल AI-संचालित OPD सिस्टम। डॉक्टर Next.js डैशबोर्ड के माध्यम से EHR एक्सेस करते हैं। तेज़ परामर्श, बहुभाषी समर्थन और अनुसंधान-तैयार डेटा।",
      "जावा, JSP, JavaScript, Bootstrap, MySQL और Apache Tomcat से निर्मित फुल-स्टैक वेब एप्लिकेशन जो ट्रेक प्लानिंग, गियर खरीद, भुगतान और मौसम एकीकरण सक्षम करता है।",
    ],
    projectContexts: ["टीम प्रोजेक्ट 2026", "ET GenAI Hackathon 2026 — सेमीफाइनलिस्ट", "टीम प्रोजेक्ट 2026", "टीम प्रोजेक्ट 2025", "शैक्षणिक प्रोजेक्ट 2024"],
    smallProjectDescs: [
      "Python में ML मॉडल (Random Forest, Linear Regression आदि) का उपयोग करके पुरानी कारों के मूल्य पूर्वानुमान। R² स्कोर से मूल्यांकन, Pandas/NumPy से डेटा प्रोसेसिंग और Matplotlib से विज़ुअलाइज़ेशन।",
      "वेब-आधारित पार्किंग प्रबंधन प्रणाली जो उपयोगकर्ताओं को ऑनलाइन पार्किंग स्लॉट खोजने, आरक्षित करने और भुगतान करने की सुविधा देती है। रियल-टाइम उपलब्धता, QR चेक-इन/आउट और एडमिन डैशबोर्ड सहित।",
    ],
    skillCategories: ["प्रोग्रामिंग भाषाएं","डेटाबेस","डेटा इंजीनियरिंग और विश्लेषण","AI / ML और लाइब्रेरी","क्लाउड और MLOps"],
    eduDegrees: ["MCA","कंप्यूटर विज्ञान में B.Sc.","XII – कंप्यूटर विज्ञान","X"],
    certTitles: [
      "Azure Databricks डेटा इंजीनियर एसोसिएट",
      "MongoDB सर्टिफाइड एसोसिएट डेटा मॉडलर",
      "जनरेटिव AI प्रोफेशनल सर्टिफिकेट",
      "Docker फाउंडेशन्स प्रोफेशनल सर्टिफिकेट",
      "GitHub प्रोफेशनल सर्टिफिकेट – GitHub में करियर की आवश्यकताएं",
      "AWS Academy Graduate – Introduction to Cloud",
      "Introduction to Data Science by IBM",
      "C, C++ Programming",
    ],
    achievements: [
      "The Economic Times GenAI Hackathon 2026 (3 की टीम) — सेमीफाइनलिस्ट",
      "Celebal Technologies द्वारा Databricks Spark Wars 4.0 वैश्विक हैकाथॉन — प्रतिभागी",
      "MAH-MCA-CET 2023 — 93.80 पर्सेंटाइल",
      "Celebal Technologies AnaVerse 2.0 — फाइनल राउंड, रैंक 74 / 860",
    ],
    langNames: ["अंग्रेज़ी","हिंदी","मराठी"],
    langLevels: ["व्यावसायिक दक्षता","दक्ष","मातृभाषा"],
    interests: ["खेल और फिटनेस","अकेले पर्वतारोहण","नई प्रौद्योगिकियां खोजना","पढ़ना और स्व-शिक्षा"],
    funFacts: [
      "कोड न करते समय अकेले पर्वतारोहण करता हूँ",
      "Python मेरी दूसरी मातृभाषा है (मराठी के बाद)",
      "MAH-MCA-CET 2023 में 93.80 पर्सेंटाइल",
      "ET GenAI Hackathon 2026 — सेमीफाइनलिस्ट",
      "Celebal AnaVerse 2.0 में रैंक 74/860",
      "मुझे निष्कर्षों से ज़्यादा डेटा पसंद है",
      "खेल और फिटनेस मुझे जमीन से जोड़ते हैं",
      "पढ़ना और स्व-शिक्षा मेरी महाशक्तियाँ हैं",
    ],
    sections: { projects:"परियोजनाएं", skills:"कौशल", experience:"अनुभव", certifications:"प्रमाणपत्र", education:"शिक्षा", achievements:"उपलब्धियां", aboutMe:"मेरे-बारे-में", contacts:"संपर्क", allMedia:"सभी-माध्यम", languages:"भाषाएं", interests:"रुचियां", funFacts:"मेरे-रोचक-तथ्य" },
    pages: { projects:"परियोजनाएं", worksSub:"मेरी परियोजनाओं की सूची", completeApps:"पूर्ण-ऐप्स", smallProjects:"छोटी-परियोजनाएं", experience:"अनुभव", expSub:"मेरी पेशेवर यात्रा", certifications:"प्रमाणपत्र", certSub:"पेशेवर प्रमाण-पत्र और बैज", achievements:"उपलब्धियां", achieveSub:"हैकाथॉन, प्रतियोगिताएं और मील के पत्थर", education:"शिक्षा", eduSub:"शैक्षणिक पृष्ठभूमि", skills:"कौशल", skillsSub:"तकनीकें और उपकरण", aboutMe:"मेरे-बारे-में", aboutSub:"मैं कौन हूँ?", contacts:"संपर्क", contactSub:"संपर्क में रहें" },
    btns: { viewAll:"सभी देखें -->", readMore:"और पढ़ें ->", github:"Github <~>", live:"Live <~>", reachMe:"यहाँ संपर्क करें", messageMe:"यहाँ संदेश भेजें", callWhatsapp:"कॉल / WhatsApp" },
    footer: { role:"डेटा इंजीनियर और एआई/एमएल डेवलपर", media:"सोशल मीडिया", madeBy:"निर्मित", copy:"© कॉपीराइट" },
    openTo: "मैं डेटा एनालिस्ट · डेटा एनालिटिक्स · डेटा इंजीनियर · डेटा साइंटिस्ट · मशीन लर्निंग इंजीनियर · एआई/जनरेटिव एआई इंजीनियर · MLOps इंजीनियर के रूप में पूर्णकालिक अवसरों के लिए खुला हूँ। यदि आपके पास कोई प्रोजेक्ट, प्रश्न है या बस जुड़ना चाहते हैं — बेझिझक संपर्क करें।",
  },

  mr: {
    nav: { home:"होम", aboutMe:"माझ्याबद्दल", skills:"कौशल्ये", projects:"प्रकल्प", experience:"अनुभव", certifications:"प्रमाणपत्रे", education:"शिक्षण", achievements:"यश", contacts:"संपर्क" },
    role1: "डेटा इंजिनियर", role2: "एआय/एमएल डेव्हलपर", heroAnd: "आणि",
    heroLine1: "कच्चा डेटा।", heroLine2: "खरी बुद्धिमत्ता।", heroLine3: "निर्माण केले",
    tagline: "डेटाला बुद्धिमान, स्केलेबल समाधानांमध्ये रूपांतरित करणे — अनुप्रयुक्त AI, ML, जनरेटिव AI आणि MLOps सह, नवकल्पना आणि सतत शिकण्यावर लक्ष केंद्रित करून।",
    currentlyOn: "सध्या काम करत आहे",
    currentlyOnValue: "OmniStream – रिअल-टाइम फ्लीट टेलीमेट्री प्लॅटफॉर्म",
    contactBtn: "संपर्क करा !!",
    roadmapLabel: "करियर मार्ग",
    roadmap: ["डेटा अॅनालिस्ट","डेटा अॅनालिटिक्स","डेटा इंजिनियर","डेटा सायंटिस्ट","मशीन लर्निंग इंजिनियर","एआय/जनरेटिव एआय इंजिनियर","MLOps इंजिनियर"],
    quote: "महान डेटासह महान जबाबदारी येते — आणि महान संधी देखील",
    quoteAuthor: "एक डेटा इंजिनियरिंग तत्त्व",
    bio: [
      "नमस्कार, मी सौरभ बबलसुरे!",
      "मी पुणे, भारतातील एक डेटा इंजिनियर आहे — अनुप्रयुक्त AI, मशीन लर्निंग आणि जनरेटिव AI द्वारे कच्च्या डेटाला बुद्धिमान, स्केलेबल समाधानांमध्ये बदलण्याची आवड बाळगतो।",
      "मी एंड-टू-एंड सिस्टम बनवतो: रिअल-टाइम स्ट्रीमिंग पाइपलाइन आणि क्लाउड लेकहाउसपासून RAG-चालित LLM अनुप्रयोग आणि ML मॉडेल API पर्यंत। MLOps मध्ये उत्पादन-तयार प्रणालींसाठी मजबूत पाया तयार करत आहे।",
    ],
    expRole: "फ्रीलांस डेटा सल्लागार",
    expCompany: "स्वतंत्र / फ्रीलांस टीम",
    expType: "फ्रीलांस",
    expDesc: "SMEs साठी वेब अनुप्रयोग आणि विश्लेषणात्मक पाइपलाइन प्रदान करण्यासाठी फ्रीलांस टीममध्ये सहकार्य केले. स्वयंचलित डेटा वर्कफ्लो आणि मार्केटिंग अॅनालिटिक्स तयार केले, विक्री आणि सेवा मेट्रिक्सला कृती करण्यायोग्य अंतर्दृष्टीमध्ये रूपांतरित केले.",
    projectDescs: [
      "Azure Event Hubs, Databricks (PySpark) आणि Delta Lake वापरून 50K अनुकरणीय वाहनांसाठी एंड-टू-एंड Kappa स्ट्रीमिंग प्लॅटफॉर्म. Isolation Forest द्वारे ML विसंगती शोध, MongoDB Atlas, ADLS Gen2 आणि Power BI डॅशबोर्ड.",
      "LLMs आणि लाइव्ह डेटा पाइपलाइन वापरून कर, निवृत्ती आणि गुंतवणूक अंतर्दृष्टीसाठी AI-चालित वित्त सहाय्यक. 2–3x जलद आर्थिक नियोजन सक्षम केले.",
      "प्रासंगिक लीड पुनः प्राप्त करण्यासाठी Whisper, GPT-3.5 आणि RAG वापरून लीड क्वालिफिकेशन व्हॉइस बॉट. Twilio सह स्वयंचलित कॉल — 80% लीड प्रक्रिया कार्यक्षमता.",
      "Whisper AI, NLP आणि Qwen/GPT वापरून रुग्ण डेटा प्रक्रिया आणि प्राथमिक अहवाल तयार करणारी स्केलेबल AI-चालित OPD प्रणाली. डॉक्टर Next.js डॅशबोर्डद्वारे EHR प्रवेश करतात. जलद सल्लामसलत, बहुभाषिक समर्थन आणि संशोधन-तयार डेटा.",
      "जावा, JSP, JavaScript, Bootstrap, MySQL आणि Apache Tomcat वापरून बनवलेले फुल-स्टॅक वेब अॅप्लिकेशन जे ट्रेक नियोजन, गियर खरेदी, पेमेंट आणि हवामान एकीकरण सक्षम करते.",
    ],
    projectContexts: ["टीम प्रकल्प 2026", "ET GenAI Hackathon 2026 — सेमीफायनलिस्ट", "टीम प्रकल्प 2026", "टीम प्रकल्प 2025", "शैक्षणिक प्रकल्प 2024"],
    smallProjectDescs: [
      "Python मध्ये ML मॉडेल्स (Random Forest, Linear Regression इ.) वापरून जुन्या कारांच्या किमतीचे अनुमान. R² स्कोरने मूल्यांकन, Pandas/NumPy ने डेटा प्रक्रिया आणि Matplotlib ने व्हिज्युअलायझेशन.",
      "वेब-आधारित पार्किंग व्यवस्थापन प्रणाली जी वापरकर्त्यांना ऑनलाइन पार्किंग स्लॉट शोधणे, आरक्षण करणे आणि पेमेंट करण्याची सुविधा देते. रिअल-टाइम उपलब्धता, QR चेक-इन/आउट आणि अॅडमिन डॅशबोर्डसह.",
    ],
    skillCategories: ["प्रोग्रामिंग भाषा","डेटाबेस","डेटा इंजिनियरिंग आणि विश्लेषण","AI / ML आणि लायब्ररी","क्लाउड आणि MLOps"],
    eduDegrees: ["MCA","संगणक विज्ञानात B.Sc.","XII – संगणक विज्ञान","X"],
    certTitles: [
      "Azure Databricks डेटा इंजिनियर असोसिएट",
      "MongoDB सर्टिफाइड असोसिएट डेटा मॉडेलर",
      "जनरेटिव AI प्रोफेशनल सर्टिफिकेट",
      "Docker फाउंडेशन्स प्रोफेशनल सर्टिफिकेट",
      "GitHub प्रोफेशनल सर्टिफिकेट – GitHub मधील करिअर आवश्यकता",
      "AWS Academy Graduate – Introduction to Cloud",
      "Introduction to Data Science by IBM",
      "C, C++ Programming",
    ],
    achievements: [
      "The Economic Times GenAI Hackathon 2026 (3 जणांची टीम) — सेमीफायनलिस्ट",
      "Celebal Technologies द्वारे Databricks Spark Wars 4.0 जागतिक हॅकाथॉन — सहभागी",
      "MAH-MCA-CET 2023 — 93.80 पर्सेंटाइल",
      "Celebal Technologies AnaVerse 2.0 — फायनल फेरी, रँक 74 / 860",
    ],
    langNames: ["इंग्रजी","हिंदी","मराठी"],
    langLevels: ["व्यावसायिक प्रवीण","प्रवीण","मातृभाषा"],
    interests: ["खेळ आणि फिटनेस","एकट्याने पर्वतारोहण","नवीन तंत्रज्ञान शोधणे","वाचन आणि स्व-शिक्षण"],
    funFacts: [
      "कोड करत नसताना एकट्याने पर्वतारोहण करतो",
      "Python माझी दुसरी मातृभाषा आहे (मराठीनंतर)",
      "MAH-MCA-CET 2023 मध्ये 93.80 पर्सेंटाइल",
      "ET GenAI Hackathon 2026 — सेमीफायनलिस्ट",
      "Celebal AnaVerse 2.0 मध्ये रँक 74/860",
      "मला निष्कर्षांपेक्षा डेटा आवडतो",
      "खेळ आणि फिटनेस मला जमिनीशी जोडतात",
      "वाचन आणि स्व-शिक्षण माझ्या महाशक्ती आहेत",
    ],
    sections: { projects:"प्रकल्प", skills:"कौशल्ये", experience:"अनुभव", certifications:"प्रमाणपत्रे", education:"शिक्षण", achievements:"यश", aboutMe:"माझ्याबद्दल", contacts:"संपर्क", allMedia:"सर्व-माध्यमे", languages:"भाषा", interests:"आवडी", funFacts:"माझ्याबद्दल-मजेशीर-गोष्टी" },
    pages: { projects:"प्रकल्प", worksSub:"माझ्या प्रकल्पांची यादी", completeApps:"पूर्ण-अॅप्स", smallProjects:"लहान-प्रकल्प", experience:"अनुभव", expSub:"माझा व्यावसायिक प्रवास", certifications:"प्रमाणपत्रे", certSub:"व्यावसायिक प्रमाणपत्रे आणि बॅजेस", achievements:"यश", achieveSub:"हॅकाथॉन, स्पर्धा आणि टप्पे", education:"शिक्षण", eduSub:"शैक्षणिक पार्श्वभूमी", skills:"कौशल्ये", skillsSub:"तंत्रज्ञान आणि साधने", aboutMe:"माझ्याबद्दल", aboutSub:"मी कोण आहे?", contacts:"संपर्क", contactSub:"संपर्कात राहा" },
    btns: { viewAll:"सर्व पहा -->", readMore:"अधिक वाचा ->", github:"Github <~>", live:"Live <~>", reachMe:"येथे संपर्क करा", messageMe:"येथे संदेश पाठवा", callWhatsapp:"कॉल / WhatsApp" },
    footer: { role:"डेटा इंजिनियर आणि एआय/एमएल डेव्हलपर", media:"सोशल मीडिया", madeBy:"निर्माता", copy:"© कॉपीराइट" },
    openTo: "मी डेटा अॅनालिस्ट · डेटा अॅनालिटिक्स · डेटा इंजिनियर · डेटा सायंटिस्ट · मशीन लर्निंग इंजिनियर · एआय/जनरेटिव एआय इंजिनियर · MLOps इंजिनियर म्हणून पूर्णवेळ संधींसाठी उपलब्ध आहे. जर तुमच्याकडे एखादा प्रकल्प, प्रश्न असेल किंवा फक्त जोडायचे असेल — मोकळेपणाने संपर्क करा.",
  },

  es: {
    nav: { home:"inicio", aboutMe:"sobre-mí", skills:"habilidades", projects:"proyectos", experience:"experiencia", certifications:"certificaciones", education:"educación", achievements:"logros", contacts:"contacto" },
    role1: "ingeniero de datos", role2: "desarrollador ia/ml", heroAnd: "y",
    heroLine1: "Datos Crudos.", heroLine2: "Inteligencia Real.", heroLine3: "Construido por",
    tagline: "Transformando datos en soluciones inteligentes y escalables — IA aplicada, ML, IA Generativa y MLOps con enfoque en innovación y aprendizaje continuo.",
    currentlyOn: "Trabajando actualmente en",
    currentlyOnValue: "OmniStream – Plataforma de Telemetría de Flota en Tiempo Real",
    contactBtn: "¡Contáctame !!",
    roadmapLabel: "trayectoria profesional",
    roadmap: ["Analista de Datos","Analítica de Datos","Ingeniero de Datos","Científico de Datos","Ingeniero ML","Ingeniero IA/IA Generativa","Ingeniero MLOps"],
    quote: "Con grandes datos viene gran responsabilidad — y gran oportunidad",
    quoteAuthor: "Un Principio de Ingeniería de Datos",
    bio: [
      "¡Hola, soy Saurabh Babalsure!",
      "Soy un Ingeniero de Datos en Pune, India — apasionado por transformar datos brutos en soluciones inteligentes y escalables mediante IA aplicada, Machine Learning e IA Generativa.",
      "Construyo sistemas de extremo a extremo: desde pipelines de streaming en tiempo real y data lakehouses hasta aplicaciones LLM con RAG y APIs de modelos ML. Construyendo una base sólida en MLOps para sistemas robustos y listos para producción.",
    ],
    expRole: "Consultor de Datos Freelance",
    expCompany: "Independiente / Equipo Freelance",
    expType: "Freelance",
    expDesc: "Colaboré en un equipo freelance para entregar aplicaciones web y pipelines analíticos para PYMEs. Construí flujos de datos automatizados y analíticas de marketing, transformando métricas de ventas y servicios en insights accionables.",
    projectDescs: [
      "Plataforma de streaming Kappa de extremo a extremo para 50K vehículos simulados usando Azure Event Hubs, Databricks (PySpark) y Delta Lake. Pipelines en tiempo real con detección de anomalías ML mediante Isolation Forest, MongoDB Atlas, ADLS Gen2 y dashboards de Power BI.",
      "Asistente financiero impulsado por IA para insights de impuestos, jubilación e inversión usando LLMs y pipelines de datos en vivo. Habilitó 2–3x una planificación financiera más rápida.",
      "Bot de voz para calificación de leads usando Whisper, GPT-3.5 y RAG. Dashboard en React.js + Tailwind, Twilio para llamadas automatizadas — 80% de eficiencia en procesamiento de leads.",
      "Sistema OPD escalable impulsado por IA usando Whisper AI, NLP y Qwen/GPT para procesar datos y generar informes preliminares. Los médicos acceden a EHRs via dashboard Next.js. Consultas más rápidas, soporte multilingüe y datos listos para investigación.",
      "Aplicación web full-stack con Java, JSP, JavaScript, Bootstrap, MySQL y Apache Tomcat para planificación de treks, compra de equipos, pagos e integración meteorológica.",
    ],
    projectContexts: ["Proyecto en Equipo 2026", "ET GenAI Hackathon 2026 — Semifinalista", "Proyecto en Equipo 2026", "Proyecto en Equipo 2025", "Proyecto Académico 2024"],
    smallProjectDescs: [
      "Evaluación de modelos ML (Random Forest, Regresión Lineal, etc.) para predicción de precios de autos usados con R². Procesamiento con Pandas/NumPy y visualización con Matplotlib en Jupyter Notebook.",
      "Sistema de gestión de estacionamiento web que permite a los usuarios buscar, reservar y pagar plazas de aparcamiento en línea con seguimiento de disponibilidad en tiempo real, check-in/out por QR y panel de administración.",
    ],
    skillCategories: ["Lenguajes","Bases de Datos","Ingeniería y Análisis de Datos","IA / ML y Librerías","Cloud y MLOps"],
    eduDegrees: ["MCA","Licenciatura en Ciencias de la Computación","XII – Ciencias de la Computación","X"],
    certTitles: [
      "Azure Databricks Ingeniero de Datos Asociado",
      "MongoDB Modelador de Datos Asociado Certificado",
      "Certificado Profesional de IA Generativa",
      "Certificado Profesional de Fundamentos Docker",
      "Certificado Profesional de Aspectos Esenciales de GitHub",
      "AWS Academy Graduate – Introduction to Cloud",
      "Introduction to Data Science by IBM",
      "C, C++ Programming",
    ],
    achievements: [
      "The Economic Times GenAI Hackathon 2026 (Equipo de 3) — Semifinalista",
      "Hackathon Global Databricks Spark Wars 4.0 de Celebal Technologies — Participante",
      "MAH-MCA-CET 2023 — Percentil 93.80",
      "Celebal Technologies AnaVerse 2.0 — Ronda Final, Puesto 74 / 860",
    ],
    langNames: ["Inglés","Hindi","Maratí"],
    langLevels: ["Competencia Profesional","Competente","Lengua Materna"],
    interests: ["Deportes y Fitness","Senderismo en Solitario","Explorar Nuevas Tecnologías","Lectura y Autoaprendizaje"],
    funFacts: [
      "Hago senderismo en solitario cuando no estoy programando",
      "Python es mi segundo idioma nativo (después del Maratí)",
      "Percentil 93.80 en MAH-MCA-CET 2023",
      "ET GenAI Hackathon 2026 — Semifinalista",
      "Puesto 74/860 en Celebal AnaVerse 2.0",
      "Me gustan los datos más que las conclusiones",
      "Los deportes y el fitness me mantienen conectado",
      "La lectura y el autoaprendizaje son mis superpoderes",
    ],
    sections: { projects:"proyectos", skills:"habilidades", experience:"experiencia", certifications:"certificaciones", education:"educación", achievements:"logros", aboutMe:"sobre-mí", contacts:"contacto", allMedia:"redes-sociales", languages:"idiomas", interests:"intereses", funFacts:"datos-curiosos" },
    pages: { projects:"proyectos", worksSub:"Lista de mis proyectos", completeApps:"apps-completas", smallProjects:"proyectos-pequeños", experience:"experiencia", expSub:"Mi trayectoria profesional", certifications:"certificaciones", certSub:"Credenciales y certificados profesionales", achievements:"logros", achieveSub:"Hackathons, competencias e hitos", education:"educación", eduSub:"Formación académica", skills:"habilidades", skillsSub:"Tecnologías y herramientas", aboutMe:"sobre-mí", aboutSub:"¿Quién soy?", contacts:"contacto", contactSub:"Ponte en contacto" },
    btns: { viewAll:"Ver todo -->", readMore:"Leer más ->", github:"Github <~>", live:"En vivo <~>", reachMe:"Contáctame aquí", messageMe:"Escríbeme aquí", callWhatsapp:"Llamar / WhatsApp" },
    footer: { role:"Ingeniero de Datos y Desarrollador IA/ML", media:"Redes Sociales", madeBy:"Hecho por", copy:"© Copyright" },
    openTo: "Estoy abierto a oportunidades de tiempo completo como Analista de Datos · Analítica de Datos · Ingeniero de Datos · Científico de Datos · Ingeniero de Machine Learning · Ingeniero de IA/IA Generativa · Ingeniero MLOps. ¡Si tienes un proyecto, pregunta o simplemente quieres conectar — no dudes en contactarme!",
  },

  fr: {
    nav: { home:"accueil", aboutMe:"à-propos", skills:"compétences", projects:"projets", experience:"expérience", certifications:"certifications", education:"formation", achievements:"réalisations", contacts:"contact" },
    role1: "ingénieur des données", role2: "développeur ia/ml", heroAnd: "et",
    heroLine1: "Données Brutes.", heroLine2: "Intelligence Réelle.", heroLine3: "Construit par",
    tagline: "Transformer les données en solutions intelligentes et évolutives — IA appliquée, ML, IA Générative et MLOps, axé sur l'innovation et l'apprentissage continu.",
    currentlyOn: "Travaille actuellement sur",
    currentlyOnValue: "OmniStream – Plateforme de Télémétrie de Flotte en Temps Réel",
    contactBtn: "Contactez-moi !!",
    roadmapLabel: "parcours professionnel",
    roadmap: ["Analyste de Données","Analytique de Données","Ingénieur de Données","Data Scientist","Ingénieur ML","Ingénieur IA/IA Générative","Ingénieur MLOps"],
    quote: "De grandes données impliquent de grandes responsabilités — et de grandes opportunités",
    quoteAuthor: "Un Principe d'Ingénierie des Données",
    bio: [
      "Bonjour, je suis Saurabh Babalsure !",
      "Je suis un Ingénieur des Données basé à Pune, en Inde — passionné par la transformation des données brutes en solutions intelligentes et évolutives grâce à l'IA appliquée, au Machine Learning et à l'IA Générative.",
      "Je construis des systèmes de bout en bout : des pipelines de streaming en temps réel et des data lakehouses aux applications LLM alimentées par RAG et aux API de modèles ML. Je construis une base solide en MLOps pour des systèmes robustes et prêts pour la production.",
    ],
    expRole: "Consultant en Données Freelance",
    expCompany: "Indépendant / Équipe Freelance",
    expType: "Freelance",
    expDesc: "Collaboré au sein d'une équipe freelance pour livrer des applications web et des pipelines analytiques pour des PME. Construit des flux de données automatisés et des analyses marketing, transformant les métriques de ventes et de services en insights actionnables.",
    projectDescs: [
      "Plateforme de streaming Kappa de bout en bout pour 50K véhicules simulés avec Azure Event Hubs, Databricks (PySpark) et Delta Lake. Pipelines en temps réel avec détection d'anomalies ML via Isolation Forest, MongoDB Atlas, ADLS Gen2 et tableaux de bord Power BI.",
      "Assistant financier alimenté par IA pour des insights sur les impôts, la retraite et les investissements utilisant des LLMs et des pipelines de données en direct. Planification financière 2–3x plus rapide.",
      "Bot vocal de qualification de leads utilisant Whisper, GPT-3.5 et RAG. Tableau de bord React.js + Tailwind, Twilio pour appels automatisés — 80% d'efficacité de traitement des leads.",
      "Système OPD scalable alimenté par IA avec Whisper AI, NLP et Qwen/GPT pour traiter les données et générer des rapports préliminaires. Les médecins accèdent aux DSE via un tableau de bord Next.js. Consultations plus rapides, support multilingue et données prêtes pour la recherche.",
      "Application web full-stack avec Java, JSP, JavaScript, Bootstrap, MySQL et Apache Tomcat pour la planification de treks, l'achat d'équipements, les paiements et l'intégration météo.",
    ],
    projectContexts: ["Projet d'Équipe 2026", "ET GenAI Hackathon 2026 — Demi-finaliste", "Projet d'Équipe 2026", "Projet d'Équipe 2025", "Projet Académique 2024"],
    smallProjectDescs: [
      "Évaluation de modèles ML (Random Forest, Régression Linéaire, etc.) pour la prédiction de prix de voitures d'occasion avec R². Traitement avec Pandas/NumPy et visualisation avec Matplotlib dans Jupyter Notebook.",
      "Système de gestion de stationnement web permettant aux utilisateurs de rechercher, réserver et payer des places en ligne avec suivi de disponibilité en temps réel, check-in/out par QR et tableau de bord administrateur.",
    ],
    skillCategories: ["Langages","Bases de Données","Ingénierie et Analyse des Données","IA / ML et Bibliothèques","Cloud et MLOps"],
    eduDegrees: ["MCA","Licence en Informatique","XII – Informatique","X"],
    certTitles: [
      "Azure Databricks Ingénieur de Données Associé",
      "MongoDB Modélisateur de Données Associé Certifié",
      "Certificat Professionnel en IA Générative",
      "Certificat Professionnel Fondations Docker",
      "Certificat Professionnel Carrière Essentielle sur GitHub",
      "AWS Academy Graduate – Introduction to Cloud",
      "Introduction to Data Science by IBM",
      "C, C++ Programming",
    ],
    achievements: [
      "The Economic Times GenAI Hackathon 2026 (Équipe de 3) — Demi-finaliste",
      "Hackathon Mondial Databricks Spark Wars 4.0 par Celebal Technologies — Participant",
      "MAH-MCA-CET 2023 — 93.80e percentile",
      "Celebal Technologies AnaVerse 2.0 — Tour Final, Classé 74 / 860",
    ],
    langNames: ["Anglais","Hindi","Marathi"],
    langLevels: ["Maîtrise Professionnelle","Compétent","Langue Maternelle"],
    interests: ["Sport et Fitness","Randonnée en Solo","Explorer de Nouvelles Technologies","Lecture et Auto-apprentissage"],
    funFacts: [
      "Je fais de la randonnée en solo quand je ne code pas",
      "Python est ma deuxième langue maternelle (après le Marathi)",
      "93.80e percentile au MAH-MCA-CET 2023",
      "ET GenAI Hackathon 2026 — Demi-finaliste",
      "Classé 74/860 à Celebal AnaVerse 2.0",
      "Je préfère les données aux conclusions",
      "Le sport et le fitness me gardent ancré",
      "La lecture et l'auto-apprentissage sont mes super-pouvoirs",
    ],
    sections: { projects:"projets", skills:"compétences", experience:"expérience", certifications:"certifications", education:"formation", achievements:"réalisations", aboutMe:"à-propos", contacts:"contact", allMedia:"réseaux-sociaux", languages:"langues", interests:"intérêts", funFacts:"anecdotes" },
    pages: { projects:"projets", worksSub:"Liste de mes projets", completeApps:"apps-complètes", smallProjects:"petits-projets", experience:"expérience", expSub:"Mon parcours professionnel", certifications:"certifications", certSub:"Certifications et badges professionnels", achievements:"réalisations", achieveSub:"Hackathons, concours et jalons", education:"formation", eduSub:"Parcours académique", skills:"compétences", skillsSub:"Technologies et outils", aboutMe:"à-propos", aboutSub:"Qui suis-je?", contacts:"contact", contactSub:"Prenez contact" },
    btns: { viewAll:"Voir tout -->", readMore:"Lire plus ->", github:"Github <~>", live:"En direct <~>", reachMe:"Me contacter ici", messageMe:"M'écrire ici", callWhatsapp:"Appeler / WhatsApp" },
    footer: { role:"Ingénieur Données & Développeur IA/ML", media:"Réseaux Sociaux", madeBy:"Réalisé par", copy:"© Copyright" },
    openTo: "Je suis ouvert aux opportunités à temps plein en tant qu'Analyste de Données · Analytique de Données · Ingénieur de Données · Data Scientist · Ingénieur Machine Learning · Ingénieur IA/IA Générative · Ingénieur MLOps. Si vous avez un projet, une question ou souhaitez simplement vous connecter — n'hésitez pas à me contacter !",
  },

  de: {
    nav: { home:"start", aboutMe:"über-mich", skills:"fähigkeiten", projects:"projekte", experience:"erfahrung", certifications:"zertifikate", education:"bildung", achievements:"erfolge", contacts:"kontakt" },
    role1: "dateningenieur", role2: "ki/ml-entwickler", heroAnd: "und",
    heroLine1: "Rohdaten.", heroLine2: "Echte Intelligenz.", heroLine3: "Gebaut von",
    tagline: "Daten in intelligente, skalierbare Lösungen verwandeln — angewandte KI, ML, Generative KI und MLOps mit Fokus auf Innovation und kontinuierlichem Lernen.",
    currentlyOn: "Aktuell arbeite ich an",
    currentlyOnValue: "OmniStream – Echtzeit-Flottentelemetrie-Plattform",
    contactBtn: "Kontaktiere mich !!",
    roadmapLabel: "karrierepfad",
    roadmap: ["Datenanalyst","Datenanalyse","Dateningenieur","Data Scientist","ML-Ingenieur","KI/Generative KI Ingenieur","MLOps-Ingenieur"],
    quote: "Mit großen Daten kommt große Verantwortung — und große Möglichkeiten",
    quoteAuthor: "Ein Datentechnik-Prinzip",
    bio: [
      "Hallo, ich bin Saurabh Babalsure!",
      "Ich bin ein Dateningenieur in Pune, Indien — leidenschaftlich dabei, Rohdaten durch angewandte KI, maschinelles Lernen und Generative KI in intelligente, skalierbare Lösungen zu verwandeln.",
      "Ich baue End-to-End-Systeme: von Echtzeit-Streaming-Pipelines und Cloud-Lakehouses bis hin zu RAG-gestützten LLM-Anwendungen und ML-Modell-APIs. Aufbau einer soliden MLOps-Grundlage für produktionsbereite Systeme.",
    ],
    expRole: "Freiberuflicher Datenberater",
    expCompany: "Unabhängig / Freelance-Team",
    expType: "Freiberuflich",
    expDesc: "In einem Freelance-Team zusammengearbeitet, um Webanwendungen und Analyse-Pipelines für KMUs zu liefern. Automatisierte Daten-Workflows und Marketing-Analytics erstellt, die Verkaufs- und Servicemetriken in umsetzbare Erkenntnisse umgewandelt haben.",
    projectDescs: [
      "End-to-End Kappa-Streaming-Plattform für 50K simulierte Fahrzeuge mit Azure Event Hubs, Databricks (PySpark) und Delta Lake. Echtzeit-Pipelines mit ML-Anomalieerkennung via Isolation Forest, MongoDB Atlas, ADLS Gen2 und Power BI Dashboards.",
      "KI-gestützter Finanzassistent für Steuer-, Renten- und Investitionseinblicke mit LLMs und Live-Datenpipelines. 2–3x schnellere Finanzplanung ermöglicht.",
      "Lead-Qualifizierungs-Voicebot mit Whisper, GPT-3.5 und RAG. React.js + Tailwind Dashboard, Twilio für automatisierte Anrufe — 80% Lead-Verarbeitungseffizienz.",
      "Skalierbares KI-gestütztes OPD-System mit Whisper AI, NLP und Qwen/GPT zur Verarbeitung von Patientendaten und Erstellung vorläufiger Berichte. Ärzte greifen über Next.js-Dashboard auf EHRs zu. Schnellere Konsultationen, mehrsprachiger Support und forschungsfertige Daten.",
      "Full-Stack-Webanwendung mit Java, JSP, JavaScript, Bootstrap, MySQL und Apache Tomcat für Trekkingplanung, Ausrüstungskauf, Zahlungen und Wetterintegration.",
    ],
    projectContexts: ["Teamprojekt 2026", "ET GenAI Hackathon 2026 — Halbfinalist", "Teamprojekt 2026", "Teamprojekt 2025", "Akademisches Projekt 2024"],
    smallProjectDescs: [
      "Bewertung von ML-Modellen (Random Forest, Lineare Regression usw.) für Gebrauchtwagenpreisvorhersage mit R². Datenverarbeitung mit Pandas/NumPy und Visualisierung mit Matplotlib in Jupyter Notebook.",
      "Webbasiertes Parkverwaltungssystem für die Online-Suche, Reservierung und Bezahlung von Parkplätzen mit Echtzeit-Verfügbarkeit, QR-Check-in/-out und Admin-Dashboard für Park- und Zahlungsverwaltung.",
    ],
    skillCategories: ["Sprachen","Datenbanken","Datentechnik & Analyse","KI / ML & Bibliotheken","Cloud & MLOps"],
    eduDegrees: ["MCA","B.Sc. Informatik","XII – Informatik","X"],
    certTitles: [
      "Azure Databricks Dateningenieur Assoziiert",
      "MongoDB Zertifizierter Assoziierter Datenmodellierer",
      "Generative KI Professional Zertifikat",
      "Docker Foundations Professional Zertifikat",
      "Karriere-Grundlagen im GitHub Professional Zertifikat",
      "AWS Academy Graduate – Introduction to Cloud",
      "Introduction to Data Science by IBM",
      "C, C++ Programming",
    ],
    achievements: [
      "The Economic Times GenAI Hackathon 2026 (Team von 3) — Halbfinalist",
      "Databricks Spark Wars 4.0 Globaler Hackathon von Celebal Technologies — Teilnehmer",
      "MAH-MCA-CET 2023 — 93.80 Perzentil",
      "Celebal Technologies AnaVerse 2.0 — Finale Runde, Rang 74 / 860",
    ],
    langNames: ["Englisch","Hindi","Marathi"],
    langLevels: ["Berufliche Kompetenz","Kompetent","Muttersprache"],
    interests: ["Sport & Fitness","Solobergsteigen","Neue Technologien Erkunden","Lesen & Selbstlernen"],
    funFacts: [
      "Wenn ich nicht programmiere, wandere ich allein in den Bergen",
      "Python ist meine zweite Muttersprache (nach Marathi)",
      "93.80 Perzentil bei MAH-MCA-CET 2023",
      "ET GenAI Hackathon 2026 — Halbfinalist",
      "Rang 74/860 bei Celebal AnaVerse 2.0",
      "Ich mag Daten mehr als Schlussfolgerungen",
      "Sport und Fitness erden mich",
      "Lesen und Selbstlernen sind meine Superkräfte",
    ],
    sections: { projects:"projekte", skills:"fähigkeiten", experience:"erfahrung", certifications:"zertifikate", education:"bildung", achievements:"erfolge", aboutMe:"über-mich", contacts:"kontakt", allMedia:"soziale-medien", languages:"sprachen", interests:"interessen", funFacts:"interessante-fakten" },
    pages: { projects:"projekte", worksSub:"Meine Projektliste", completeApps:"vollständige-apps", smallProjects:"kleine-projekte", experience:"erfahrung", expSub:"Mein beruflicher Werdegang", certifications:"zertifikate", certSub:"Professionelle Zertifikate und Abzeichen", achievements:"erfolge", achieveSub:"Hackathons, Wettbewerbe & Meilensteine", education:"bildung", eduSub:"Akademischer Hintergrund", skills:"fähigkeiten", skillsSub:"Technologien & Werkzeuge", aboutMe:"über-mich", aboutSub:"Wer bin ich?", contacts:"kontakt", contactSub:"Kontakt aufnehmen" },
    btns: { viewAll:"Alle anzeigen -->", readMore:"Mehr lesen ->", github:"Github <~>", live:"Live <~>", reachMe:"Hier kontaktieren", messageMe:"Hier schreiben", callWhatsapp:"Anruf / WhatsApp" },
    footer: { role:"Dateningenieur & KI/ML-Entwickler", media:"Soziale Medien", madeBy:"Erstellt von", copy:"© Copyright" },
    openTo: "Ich bin offen für Vollzeitstellen als Datenanalyst · Datenanalyse · Dateningenieur · Data Scientist · Machine Learning Ingenieur · KI/Generative KI Ingenieur · MLOps Ingenieur. Wenn du ein Projekt oder eine Frage hast oder einfach in Kontakt treten möchtest — melde dich gerne!",
  },

  ja: {
    nav: { home:"ホーム", aboutMe:"自己紹介", skills:"スキル", projects:"プロジェクト", experience:"経歴", certifications:"資格", education:"学歴", achievements:"実績", contacts:"連絡先" },
    role1: "データエンジニア", role2: "AI/MLデベロッパー", heroAnd: "と",
    heroLine1: "生データ。", heroLine2: "真の知性。", heroLine3: "構築者",
    tagline: "データをインテリジェントでスケーラブルなソリューションに変換する — 応用AI、ML、生成AI、MLOpsを活用し、イノベーションと継続的学習に注力しています。",
    currentlyOn: "現在取り組んでいるプロジェクト",
    currentlyOnValue: "OmniStream – リアルタイム車両テレメトリプラットフォーム",
    contactBtn: "お問い合わせ !!",
    roadmapLabel: "キャリアパス",
    roadmap: ["データアナリスト","データアナリティクス","データエンジニア","データサイエンティスト","機械学習エンジニア","AI/生成AIエンジニア","MLOpsエンジニア"],
    quote: "大きなデータには大きな責任が伴う — そして大きなチャンスも",
    quoteAuthor: "データエンジニアリングの原則",
    bio: [
      "こんにちは、サウラブ・ババルスレです！",
      "インドのプネに拠点を置くデータエンジニアです。応用AI、機械学習、生成AIを通じて、生データをインテリジェントでスケーラブルなソリューションに変換することに情熱を持っています。",
      "リアルタイムストリーミングパイプラインやクラウドレイクハウスから、RAGを活用したLLMアプリケーションやMLモデルAPIまで、エンドツーエンドのシステムを構築します。本番環境対応の強固なシステムのためにMLOpsの基礎を積み上げています。",
    ],
    expRole: "フリーランス データコンサルタント",
    expCompany: "独立 / フリーランスチーム",
    expType: "フリーランス",
    expDesc: "中小企業向けのウェブアプリケーションと分析パイプラインを提供するフリーランスチームで協力。自動化されたデータワークフローとマーケティング分析を構築し、販売・サービス指標を実用的なインサイトに変換しました。",
    projectDescs: [
      "Azure Event Hubs、Databricks（PySpark）、Delta Lakeを使用した50K台の車両向けエンドツーエンドKappaストリーミングプラットフォーム。Isolation ForestによるML異常検知、MongoDB Atlas、ADLS Gen2、Power BIダッシュボードを統合。",
      "LLMとライブデータパイプラインを使用した税金・退職・投資インサイトのためのAI搭載金融アシスタント。財務計画を2〜3倍高速化。",
      "Whisper、GPT-3.5、RAGを使用したリード選定ボイスボット。React.js + TailwindダッシュボードとTwilio自動通話で80%のリード処理効率を実現。",
      "Whisper AI、NLP、Qwen/GPTを使用して患者データを処理し予備レポートを生成するスケーラブルなAI搭載OPDシステム。医師はNext.jsダッシュボード経由でEHRにアクセス。より迅速な診察、多言語サポート、研究対応データを実現。",
      "Java、JSP、JavaScript、Bootstrap、MySQL、Apache Tomcatを使用したフルスタックWebアプリ。トレッキング計画、装備購入、決済、天気統合を実現。",
    ],
    projectContexts: ["チームプロジェクト 2026", "ET GenAI Hackathon 2026 — セミファイナリスト", "チームプロジェクト 2026", "チームプロジェクト 2025", "学術プロジェクト 2024"],
    smallProjectDescs: [
      "R²スコアを使用した中古車価格予測のためのMLモデル（Random Forest、線形回帰など）の評価。Pandas/NumPyでデータ処理、MatplotlibでJupyter Notebook内に可視化。",
      "ユーザーがオンラインで駐車スペースを検索・予約・決済できるWebベースの駐車場管理システム。リアルタイム空き確認、QRコードによるチェックイン/アウト、駐車・決済管理のための管理ダッシュボードを搭載。",
    ],
    skillCategories: ["プログラミング言語","データベース","データエンジニアリング & 分析","AI / ML & ライブラリ","クラウド & MLOps"],
    eduDegrees: ["MCA","コンピュータサイエンス 理学士","XII – コンピュータサイエンス","X"],
    certTitles: [
      "Azure Databricks データエンジニアアソシエイト",
      "MongoDB 認定アソシエイトデータモデラー",
      "ジェネラティブAI プロフェッショナル認定",
      "Docker ファウンデーション プロフェッショナル認定",
      "GitHub プロフェッショナル認定 – キャリアエッセンシャル",
      "AWS Academy Graduate – Introduction to Cloud",
      "Introduction to Data Science by IBM",
      "C, C++ Programming",
    ],
    achievements: [
      "The Economic Times GenAI Hackathon 2026（チーム3名）— セミファイナリスト",
      "Celebal TechnologiesによるDatabricks Spark Wars 4.0グローバルハッカソン — 参加者",
      "MAH-MCA-CET 2023 — 93.80パーセンタイル",
      "Celebal Technologies AnaVerse 2.0 — 決勝ラウンド、74位/860人",
    ],
    langNames: ["英語","ヒンディー語","マラーティー語"],
    langLevels: ["ビジネス上級","上級","母国語"],
    interests: ["スポーツ & フィットネス","一人登山","新技術の探求","読書 & 自己学習"],
    funFacts: [
      "コードを書いていないときは一人で山に登る",
      "Pythonはマラーティー語の次に話せる言語",
      "MAH-MCA-CET 2023で93.80パーセンタイル",
      "ET GenAI Hackathon 2026 — セミファイナリスト",
      "Celebal AnaVerse 2.0で74位/860人",
      "結論よりもデータが好き",
      "スポーツとフィットネスで地に足をつけている",
      "読書と自己学習が私の超能力",
    ],
    sections: { projects:"プロジェクト", skills:"スキル", experience:"経歴", certifications:"資格", education:"学歴", achievements:"実績", aboutMe:"自己紹介", contacts:"連絡先", allMedia:"ソーシャルメディア", languages:"言語", interests:"趣味・関心", funFacts:"豆知識" },
    pages: { projects:"プロジェクト", worksSub:"プロジェクト一覧", completeApps:"完成アプリ", smallProjects:"小規模プロジェクト", experience:"経歴", expSub:"職務経歴", certifications:"資格", certSub:"専門資格・バッジ", achievements:"実績", achieveSub:"ハッカソン・コンペ・実績", education:"学歴", eduSub:"学術的背景", skills:"スキル", skillsSub:"技術・ツール", aboutMe:"自己紹介", aboutSub:"私について", contacts:"連絡先", contactSub:"ご連絡ください" },
    btns: { viewAll:"すべて見る -->", readMore:"続きを読む ->", github:"Github <~>", live:"ライブ <~>", reachMe:"こちらから連絡", messageMe:"メッセージを送る", callWhatsapp:"電話 / WhatsApp" },
    footer: { role:"データエンジニア & AI/MLデベロッパー", media:"ソーシャルメディア", madeBy:"制作者", copy:"© Copyright" },
    openTo: "データアナリスト · データアナリティクス · データエンジニア · データサイエンティスト · 機械学習エンジニア · AI/生成AIエンジニア · MLOpsエンジニアとしてのフルタイムの機会を求めています。プロジェクト、質問、またはつながりたい場合は、お気軽にご連絡ください。",
  },
} as const;

type LangKey = keyof typeof T;
const LANG_LABELS: Record<LangKey, string> = { en:"EN", hi:"HI", mr:"MR", es:"ES", fr:"FR", de:"DE", ja:"JA" };
type TType = typeof T.en;

type Page = "home"|"about-me"|"skills"|"projects"|"experience"|"certifications"|"education"|"achievements"|"contacts";
const FC = "'Fira Code', monospace";
const PAGE_SECTION_CLASS = "px-4 sm:px-6 lg:px-20 py-12 md:py-16";
const HERO_SECTION_CLASS = "px-4 sm:px-6 lg:px-20 py-12 md:py-14";
const PAGE_TITLE_CLASS = "text-[clamp(1.5rem,4vw,2rem)] leading-none";

// ── Icons ─────────────────────────────────────────────────────────────────────
function Dot() { return <svg width="4" height="4" viewBox="0 0 4 4" fill="none"><circle cx="2" cy="2" r="2" fill="#ABB2BF"/></svg>; }
function DotGrid({ rows=5, cols=5 }: { rows?: number; cols?: number }) {
  return <div className="grid gap-[8px]" style={{ gridTemplateColumns:`repeat(${cols},4px)` }}>{Array.from({length:rows*cols}).map((_,i)=><Dot key={i}/>)}</div>;
}
function LogoMark({ size=16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path d={svgPathsBurger.p34deb370} fill="white"/></svg>;
}
function GithubIcon({ size=21, color="#ABB2BF" }: { size?: number; color?: string }) {
  return <svg width={size} height={(size/21)*20} viewBox="0 0 21 20" fill="none"><path d={svgPathsHome.pa8926c0} fill={color}/></svg>;
}
function LinkedInIcon({ size=22, color="#ABB2BF" }: { size?: number; color?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="3" stroke={color} strokeWidth="1.5"/><rect x="6" y="10" width="2.2" height="7" rx="0.5" fill={color}/><circle cx="7.1" cy="7.5" r="1.3" fill={color}/><path d="M11 10h2.2v1s.7-1.2 2.3-1.2c2 0 2.5 1.3 2.5 3.1V17h-2.2v-3.7c0-.9-.3-1.6-1.2-1.6-.9 0-1.4.7-1.4 1.6V17H11V10z" fill={color}/></svg>;
}
function KaggleIcon({ size=22, color="#ABB2BF" }: { size?: number; color?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.071.335z" fill={color}/></svg>;
}
function EmailIcon({ size=18, color="#ABB2BF" }: { size?: number; color?: string }) {
  return <svg width={size} height={(size/20)*16} viewBox="0 0 20 16" fill="none"><rect x="0.5" y="0.5" width="19" height="15" rx="1" stroke={color}/><path d="M0 0L10 9L20 0" stroke={color}/></svg>;
}
function PhoneIcon({ size=17, color="#ABB2BF" }: { size?: number; color?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function GlobeIcon({ size=17, color="#ABB2BF" }: { size?: number; color?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="4" ry="9" stroke={color} strokeWidth="1.5"/><path d="M3 9h18M3 15h18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;
}

// ── Shared UI ─────────────────────────────────────────────────────────────────
function SH({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 md:gap-4 min-w-0">
      <div className={`flex items-start min-w-0 ${PAGE_TITLE_CLASS}`} style={{ fontFamily:FC, fontWeight:500, lineHeight:"normal" }}>
        <span style={{ color:"#c778dd" }}>#</span><span style={{ color:"#fff" }}>{label}</span>
      </div>
      <div className="h-px flex-1 min-w-[24px] self-center" style={{ background:"#c778dd" }}/>
    </div>
  );
}
function PH({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-2 min-w-0">
      <div className={`flex items-start min-w-0 ${PAGE_TITLE_CLASS}`} style={{ fontFamily:FC, fontWeight:600, lineHeight:"normal" }}>
        <span style={{ color:"#c778dd" }}>/</span><span style={{ color:"#fff" }}>{label}</span>
      </div>
      {sub && <p className="text-sm sm:text-base" style={{ fontFamily:FC, fontWeight:400, color:"#abb2bf" }}>{sub}</p>}
    </div>
  );
}
function Btn({ children, purple=false, href, onClick }: { children: React.ReactNode; purple?: boolean; href?: string; onClick?: () => void }) {
  const cls = "inline-flex max-w-full items-center justify-center px-[16px] py-[8px] cursor-pointer transition-opacity hover:opacity-75 whitespace-normal sm:whitespace-nowrap text-center";
  const s: React.CSSProperties = { fontFamily:FC, fontWeight:500, fontSize:16, color:"#fff", lineHeight:"normal", border:`1px solid ${purple?"#c778dd":"#abb2bf"}` };
  if (href) return <a href={href} target="_blank" rel="noreferrer" className={cls} style={s}>{children}</a>;
  return <button onClick={onClick} className={cls} style={s}>{children}</button>;
}

function SkillBlock({ category, icon:Icon, items }: { category: string; icon: React.ElementType; items: string[] }) {
  return (
    <div className="flex flex-col gap-[8px] py-[8px]" style={{ border:"1px solid #abb2bf" }}>
      <div className="px-[8px] flex items-center gap-[6px]">
        <Icon size={13} color="#c778dd"/>
        <p style={{ fontFamily:FC, fontWeight:600, fontSize:13, color:"#fff", lineHeight:"normal" }}>{category}</p>
      </div>
      <div className="w-full h-px" style={{ background:"#abb2bf" }}/>
      <p className="px-[8px]" style={{ fontFamily:FC, fontWeight:400, fontSize:13, color:"#abb2bf", lineHeight:"22px" }}>{items.join(", ")}</p>
    </div>
  );
}

function SmallCard({ proj, desc, t }: { proj: typeof DATA.smallProjects[0]; desc: string; t: TType }) {
  return (
    <div className="flex flex-col" style={{ border:"1px solid #abb2bf" }}>
      <div className="px-[8px] py-[8px]"><span style={{ fontFamily:FC, fontSize:13, color:"#abb2bf" }}>{proj.stack}</span></div>
      <div className="flex flex-col gap-[12px] p-[16px]" style={{ borderTop:"1px solid #abb2bf" }}>
        <p style={{ fontFamily:FC, fontWeight:500, fontSize:18, color:"#fff" }}>{proj.name}</p>
        <p style={{ fontFamily:FC, fontSize:13, color:"#abb2bf", lineHeight:"20px" }}>{desc}</p>
        <p style={{ fontFamily:FC, fontSize:12, color:"#c778dd" }}>{proj.context}</p>
        <Btn href={proj.githubUrl}>{t.btns.github}</Btn>
      </div>
    </div>
  );
}

function ProjectCard({ proj, desc, context, t }: { proj: typeof DATA.projects[0]; desc: string; context: string; t: TType }) {
  return (
    <div className="flex flex-col" style={{ border:"1px solid #abb2bf" }}>
      <div className="flex flex-wrap gap-[6px] p-[8px]">
        {proj.stack.map(s=><span key={s} style={{ fontFamily:FC, fontSize:13, color:"#abb2bf" }}>{s}</span>)}
      </div>
      <div className="flex flex-col gap-[12px] p-[16px]" style={{ borderTop:"1px solid #abb2bf" }}>
        <p style={{ fontFamily:FC, fontWeight:500, fontSize:19, color:"#fff", lineHeight:1.25 }}>{proj.name}</p>
        <p style={{ fontFamily:FC, fontSize:13, color:"#abb2bf", lineHeight:"20px" }}>{desc}</p>
        <p style={{ fontFamily:FC, fontSize:12, color:"#c778dd" }}>{context}</p>
        <div className="flex gap-[12px] flex-wrap">
          {proj.liveUrl && <Btn purple href={proj.liveUrl}>{t.btns.live}</Btn>}
          <Btn href={proj.githubUrl}>{t.btns.github}</Btn>
        </div>
      </div>
    </div>
  );
}


function SocialLinks({ size=22 }: { size?: number }) {
  return <>
    <a href={DATA.personal.githubUrl} target="_blank" rel="noreferrer" title="GitHub" className="flex items-center justify-center hover:opacity-60 transition-opacity" style={{ width:size+10, height:size+10 }}><GithubIcon size={size}/></a>
    <a href={DATA.personal.linkedinUrl} target="_blank" rel="noreferrer" title="LinkedIn" className="flex items-center justify-center hover:opacity-60 transition-opacity" style={{ width:size+10, height:size+10 }}><LinkedInIcon size={size}/></a>
    <a href={DATA.personal.kaggleUrl} target="_blank" rel="noreferrer" title="Kaggle" className="flex items-center justify-center hover:opacity-60 transition-opacity" style={{ width:size+10, height:size+10 }}><KaggleIcon size={size}/></a>
  </>;
}

function MediaSidebar() {
  return (
    <div className="hidden lg:flex fixed left-[17px] top-0 z-30 flex-col items-center gap-[8px]">
      <div className="h-[191px] w-px" style={{ background:"#abb2bf" }}/>
      <div className="flex flex-col gap-[6px] items-center"><SocialLinks size={19}/></div>
    </div>
  );
}

function SkillGrid({ t }: { t: TType }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-[32px] gap-4">
      {DATA.skills.map((g, i) => <SkillBlock key={i} category={t.skillCategories[i]} icon={g.icon} items={g.items}/>)}
    </div>
  );
}

function CertGrid({ t }: { t: TType }) {
  return (
    <div className="mt-[32px]" style={{ border:"1px solid #abb2bf" }}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        {DATA.certifications.map((c, i) => {
          const inner = (
            <div className="flex flex-col gap-[12px] p-[18px] h-full"
              style={{ borderRight:"1px solid #abb2bf", borderBottom:"1px solid #abb2bf" }}>
              <div className="size-[28px] flex items-center justify-center" style={{ background:"#c778dd" }}>
                <Award size={15} color="#fff"/>
              </div>
              <p style={{ fontFamily:FC, fontWeight:600, fontSize:13, color:"#fff", lineHeight:"1.5" }}>{t.certTitles[i]}</p>
              <div className="h-px w-full" style={{ background:"#abb2bf" }}/>
              <p style={{ fontFamily:FC, fontSize:13, color:"#abb2bf" }}>{c.issuer}</p>
              <p style={{ fontFamily:FC, fontSize:12, color:"#c778dd" }}>{c.period}</p>
              {c.grade && <p style={{ fontFamily:FC, fontSize:12, color:"#abb2bf" }}>Grade: <span style={{ color:"#fff", fontWeight:600 }}>{c.grade}</span></p>}
              {c.url && <p style={{ fontFamily:FC, fontSize:11, color:"#c778dd", marginTop:"auto" }}>View credential →</p>}
            </div>
          );
          return c.url
            ? <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" className="block" style={{ textDecoration:"none" }}>{inner}</a>
            : <div key={i}>{inner}</div>;
        })}
      </div>
    </div>
  );
}

function EduGrid({ t }: { t: TType }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 mt-[32px]">
      {DATA.education.map((e, i) => (
        <div key={i} className="flex flex-col gap-[10px] p-[16px]" style={{ border:"1px solid #abb2bf", borderLeft:i===0?"1px solid #abb2bf":"none" }}>
          <div className="size-[28px] flex items-center justify-center" style={{ background:"#c778dd" }}><GraduationCap size={14} color="#fff"/></div>
          <p style={{ fontFamily:FC, fontWeight:600, fontSize:13, color:"#fff", lineHeight:"1.4" }}>{t.eduDegrees[i]}</p>
          <div className="h-px w-full" style={{ background:"#abb2bf" }}/>
          <p style={{ fontFamily:FC, fontSize:13, color:"#abb2bf" }}>{e.institution}</p>
          <p style={{ fontFamily:FC, fontSize:12, color:"#abb2bf" }}>{e.period}</p>
          <p style={{ fontFamily:FC, fontWeight:600, fontSize:13, color:"#c778dd" }}>{e.grade}</p>
        </div>
      ))}
    </div>
  );
}

// ── Language Switcher ─────────────────────────────────────────────────────────
function LangSwitcher({ lang, setLang }: { lang: LangKey; setLang: (l: LangKey) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o=>!o)} className="flex items-center gap-[4px] hover:opacity-75 transition-opacity"
        style={{ fontFamily:FC, fontWeight:600, fontSize:15, color:"#abb2bf" }}>
        {LANG_LABELS[lang]}<ChevronDown size={13} color="#abb2bf" style={{ transform:open?"rotate(180deg)":"none", transition:"transform 0.2s" }}/>
      </button>
      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-50 flex flex-col" style={{ background:"#2d3139", border:"1px solid #abb2bf", minWidth:80 }}>
          {(Object.keys(LANG_LABELS) as LangKey[]).map(k => (
            <button key={k} onClick={() => { setLang(k); setOpen(false); }}
              className="px-[12px] py-[8px] text-left hover:opacity-75 transition-opacity"
              style={{ fontFamily:FC, fontWeight:k===lang?600:400, fontSize:14, color:k===lang?"#c778dd":"#abb2bf" }}>
              {LANG_LABELS[k]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer({ t }: { t: TType }) {
  return (
    <footer>
      <div className="h-px w-full" style={{ background:"#abb2bf" }}/>
      <div className={PAGE_SECTION_CLASS + " flex flex-col gap-8 items-center"}>
        <div className="flex w-full flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[8px]">
              <LogoMark/>
              <a href={`mailto:${DATA.personal.email}`} style={{ fontFamily:FC, fontSize:15, color:"#abb2bf" }} className="hover:text-white transition-colors">{DATA.personal.email}</a>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <p style={{ fontFamily:FC, fontWeight:500, fontSize:18, color:"#fff" }}>{t.footer.media}</p>
            <div className="flex gap-[4px] items-center"><SocialLinks size={19}/></div>
          </div>
        </div>
        <p style={{ fontFamily:FC, fontSize:15, color:"#abb2bf" }}>{t.footer.copy} {new Date().getFullYear()}. {t.footer.madeBy} {DATA.personal.name}</p>
      </div>
    </footer>
  );
}

// ── Pages ─────────────────────────────────────────────────────────────────────
function HomePage({ nav, t }: { nav: (p: Page) => void; t: TType }) {
  return (
    <div>
      <section className={HERO_SECTION_CLASS}>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col" style={{ gap:4 }}>
              <p style={{ fontFamily:FC, fontWeight:700, fontSize:"clamp(30px,5vw,58px)", color:"#fff", lineHeight:1.1, letterSpacing:"-0.02em" }}>
                {t.heroLine1}
              </p>
              <p style={{ fontFamily:FC, fontWeight:700, fontSize:"clamp(30px,5vw,58px)", color:"#c778dd", lineHeight:1.1, letterSpacing:"-0.02em" }}>
                {t.heroLine2}
              </p>
            </div>
            <p style={{ fontFamily:FC, fontSize:16, color:"#abb2bf", maxWidth:480, lineHeight:"26px" }}>{t.tagline}</p>
            <div className="flex flex-col gap-[6px] mt-[4px] min-w-0">
              <a href={`mailto:${DATA.personal.email}`} className="flex items-center gap-[8px] hover:opacity-75 transition-opacity w-fit max-w-full min-w-0">
                <EmailIcon size={15}/><span className="break-all" style={{ fontFamily:FC, fontSize:14, color:"#abb2bf" }}>{DATA.personal.email}</span>
              </a>
              <div className="flex items-center gap-[8px] min-w-0"><PhoneIcon size={15}/><span className="break-words" style={{ fontFamily:FC, fontSize:14, color:"#abb2bf" }}>{DATA.personal.phone}</span></div>
              <a href={`https://${DATA.personal.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-[8px] hover:opacity-75 transition-opacity w-fit max-w-full min-w-0">
                <GlobeIcon size={15}/><span style={{ fontFamily:FC, fontSize:14, color:"#abb2bf" }}>{DATA.personal.website}</span>
              </a>
            </div>
            <div className="mt-[4px]"><Btn purple onClick={() => nav("contacts")}>{t.contactBtn}</Btn></div>
          </div>
          <div className="relative flex min-h-[260px] items-end justify-center lg:min-h-[320px]">
            <div className="absolute left-[5%] top-[15%] hidden h-[104px] w-[104px] sm:block">
              <div className="absolute" style={{ bottom:0, left:0, right:"50%", top:"25%" }}>
                <svg className="w-full h-full" fill="none" viewBox="0 0 52.2178 78.3262">
                  <mask fill="white" id="m1"><path d={svgPathsBurger.p1834fd00}/></mask>
                  <path d={svgPathsBurger.p7e1ce71} fill="#C778DD" mask="url(#m1)"/>
                </svg>
              </div>
              <div className="absolute" style={{ bottom:"25%", left:"50%", right:0, top:0 }}>
                <div className="absolute" style={{ inset:"-1.28% -1.92%" }}>
                  <svg className="w-full h-full" fill="none" viewBox="0 0 54.2168 80.3262">
                    <mask fill="black" id="m2" maskUnits="userSpaceOnUse" width="55" height="81" x="0" y="0">
                      <rect fill="white" width="55" height="81"/><path d={svgPathsBurger.p9715a00}/>
                    </mask>
                    <path d={svgPathsBurger.p2b639a00} fill="#C778DD" mask="url(#m2)"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="relative aspect-[308/260] w-full max-w-[19.25rem] overflow-hidden sm:max-w-[21rem] lg:max-w-[20rem]">
              <img src={imgHeroPerson} alt={DATA.personal.name} className="absolute inset-0 h-full w-full object-cover object-[center_18%]"/>
            </div>
            <div className="absolute bottom-0 right-[2%] hidden sm:block"><DotGrid rows={5} cols={5}/></div>
          </div>
        </div>
        <div className="mt-8 flex w-full max-w-full flex-col gap-2 px-3 py-3 sm:w-fit sm:flex-row sm:items-center sm:gap-[10px]" style={{ border:"1px solid #abb2bf" }}>
          <div className="shrink-0 size-[16px]" style={{ background:"#c778dd" }}/>
          <p className="text-sm sm:text-base break-words" style={{ fontFamily:FC, color:"#abb2bf" }}>{t.currentlyOn} <span style={{ fontWeight:600, color:"#fff" }}>{t.currentlyOnValue}</span></p>
        </div>

        {/* Career Roadmap */}
        <div className="mt-[40px]">
          <div className="flex items-center gap-[10px] mb-[20px] min-w-0">
            <span style={{ fontFamily:FC, fontWeight:500, fontSize:14, color:"#c778dd" }}>#{t.roadmapLabel}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
            {t.roadmap.map((role, i) => (
              <div key={i} className="flex items-center">
                <div
                  className="px-[12px] py-[7px] flex items-center max-w-full text-center"
                  style={{
                    fontFamily: FC,
                    fontSize: 13,
                    fontWeight: i === 2 ? 700 : 400,
                    color: i === 2 ? "#c778dd" : i === 6 ? "#fff" : "#abb2bf",
                    border: `1px solid ${i === 2 ? "#c778dd" : i === 6 ? "#abb2bf" : "#3d4451"}`,
                    background: i === 2 ? "rgba(199,120,221,0.08)" : i === 6 ? "rgba(171,178,191,0.06)" : "transparent",
                    whiteSpace: "normal",
                  }}
                >
                  {role}
                </div>
                {i < t.roadmap.length - 1 && (
                  <span style={{ fontFamily: FC, fontSize: 16, color: "#c778dd", margin: "0 6px", lineHeight: 1 }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-20 py-16 md:py-20 flex justify-center">
        <div className="relative w-full max-w-[900px] text-center">
          <span className="absolute -top-[20px] left-0 text-[2.5rem] leading-none sm:text-[3rem]" style={{ fontFamily:FC, fontWeight:600, color:"#abb2bf" }}>"</span>
          <p className="px-6 sm:px-8" style={{ fontFamily:FC, fontWeight:600, fontSize:"clamp(20px,3vw,32px)", color:"#fff", lineHeight:1.35 }}>{t.quote}</p>
          <span className="absolute -bottom-[24px] right-0 text-[2.5rem] leading-none sm:text-[3rem]" style={{ fontFamily:FC, fontWeight:600, color:"#abb2bf" }}>"</span>
          <p className="mt-[24px]" style={{ fontFamily:FC, fontWeight:600, fontSize:16, color:"#abb2bf" }}>— {t.quoteAuthor}</p>
        </div>
      </section>

      {[
        { section: t.sections.projects, page:"projects" as Page, content: (
          <div>
            <p style={{ fontFamily:FC, fontSize:15, color:"#abb2bf" }}>{t.pages.worksSub}</p>

            <div className="mt-[24px]">
              <p style={{ fontFamily:FC, fontWeight:500, fontSize:26, color:"#fff", marginBottom:12 }}><span style={{ color:"#c778dd" }}>#</span>{t.pages.completeApps}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">{DATA.projects.map((p,i)=><ProjectCard key={i} proj={p} desc={t.projectDescs[i]} context={t.projectContexts[i]} t={t}/>)}</div>
            </div>

            <div className="mt-[32px]">
              <p style={{ fontFamily:FC, fontWeight:500, fontSize:26, color:"#fff", marginBottom:12 }}><span style={{ color:"#c778dd" }}>#</span>{t.pages.smallProjects}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">{DATA.smallProjects.map((p,i)=><SmallCard key={i} proj={p} desc={t.smallProjectDescs[i]} t={t}/>)}</div>
            </div>
          </div>
        ) },
        { section: t.sections.skills, page:"skills" as Page, content: <SkillGrid t={t}/> },
        { section: t.sections.experience, page:"experience" as Page, content: (
          <div className="flex flex-col gap-[12px] p-[20px]" style={{ border:"1px solid #abb2bf" }}>
            <div className="flex items-start gap-[12px]">
              <div className="size-[32px] shrink-0 flex items-center justify-center" style={{ background:"#c778dd" }}><Briefcase size={15} color="#fff"/></div>
              <div>
                <div className="flex flex-wrap items-center gap-[10px]">
                  <p style={{ fontFamily:FC, fontWeight:600, fontSize:18, color:"#fff" }}>{t.expRole}</p>
                  <span className="px-[8px] py-[2px]" style={{ fontFamily:FC, fontSize:12, color:"#c778dd", border:"1px solid #c778dd" }}>{t.expType}</span>
                </div>
                <p style={{ fontFamily:FC, fontSize:14, color:"#abb2bf" }}>{t.expCompany} · Dec 2025 – Present</p>
              </div>
            </div>
            <p style={{ fontFamily:FC, fontSize:14, color:"#abb2bf", lineHeight:"22px" }}>{t.expDesc}</p>
          </div>
        )},
        { section: t.sections.achievements, page:"achievements" as Page, content: (
          <div className="mt-[8px] grid sm:grid-cols-2 gap-[12px]">
            {t.achievements.map((a,i)=>(
              <div key={i} className="flex items-start gap-[12px] px-[16px] py-[12px]" style={{ border:"1px solid #abb2bf" }}>
                <div className="size-[28px] shrink-0 flex items-center justify-center" style={{ background:"#c778dd" }}>
                  <span style={{ fontFamily:FC, fontWeight:700, fontSize:13, color:"#fff" }}>{i+1}</span>
                </div>
                <p style={{ fontFamily:FC, fontSize:14, color:"#abb2bf", lineHeight:"22px" }}>{a}</p>
              </div>
            ))}
          </div>
        )},
      ].map(({ section, page, content }) => (
        <section key={section} className={PAGE_SECTION_CLASS}>
          <div className="flex flex-col gap-3 mb-[32px] sm:flex-row sm:items-center sm:justify-between">
            <SH label={section}/>
            <button onClick={() => nav(page)} className="shrink-0 hover:opacity-75 transition-opacity self-start sm:self-auto" style={{ fontFamily:FC, fontSize:15, color:"#abb2bf" }}>{t.btns.viewAll}</button>
          </div>
          {content}
        </section>
      ))}

      <section className={PAGE_SECTION_CLASS}>
        <SH label={t.sections.aboutMe}/>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12 mt-[32px]">
          <div className="flex flex-col gap-[16px]">
            {t.bio.map((p,i)=><p key={i} style={{ fontFamily:FC, fontSize:16, color:"#abb2bf", lineHeight:"26px" }}>{p}</p>)}
            <div className="mt-[8px]"><Btn purple onClick={() => nav("about-me")}>{t.btns.readMore}</Btn></div>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute top-0 left-0 hidden sm:block"><DotGrid rows={5} cols={5}/></div>
            <div className="mt-[40px] aspect-[280/370] w-full max-w-[17.5rem] overflow-hidden">
              <img src={imgAboutPerson} alt={DATA.personal.name} className="w-full h-full object-cover object-top"/>
            </div>
            <div className="absolute bottom-0 right-0 hidden sm:block"><DotGrid rows={5} cols={5}/></div>
            <div className="absolute bottom-0 left-0 hidden sm:block h-px w-[220px]" style={{ background:"#c778dd" }}/>
          </div>
        </div>
      </section>

      <section className={PAGE_SECTION_CLASS}>
        <SH label={t.sections.contacts}/>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12 mt-[32px]">
          <p style={{ fontFamily:FC, fontSize:16, color:"#abb2bf", lineHeight:"26px", maxWidth:505 }}>{t.openTo}</p>
          <div className="flex w-full flex-col gap-[10px] p-[16px] sm:w-fit max-w-full" style={{ border:"1px solid #abb2bf" }}>
            <p style={{ fontFamily:FC, fontWeight:600, fontSize:16, color:"#fff" }}>{t.btns.reachMe}</p>
            <a href={DATA.personal.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-[8px] hover:opacity-75 transition-opacity min-w-0"><LinkedInIcon size={17}/><span className="break-all" style={{ fontFamily:FC, fontSize:14, color:"#abb2bf" }}>linkedin.com/in/saurabh-babalsure</span></a>
            <a href={`mailto:${DATA.personal.email}`} className="flex items-center gap-[8px] hover:opacity-75 transition-opacity min-w-0"><EmailIcon size={15}/><span className="break-all" style={{ fontFamily:FC, fontSize:14, color:"#abb2bf" }}>{DATA.personal.email}</span></a>
            <div className="flex items-center gap-[8px] min-w-0"><PhoneIcon size={15}/><span className="break-words" style={{ fontFamily:FC, fontSize:14, color:"#abb2bf" }}>{DATA.personal.phone}</span></div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SkillsPage({ t }: { t: TType }) {
  return <div className={PAGE_SECTION_CLASS}><PH label={t.pages.skills} sub={t.pages.skillsSub}/><SkillGrid t={t}/></div>;
}

function WorksPage({ t }: { t: TType }) {
  return (
    <div className={PAGE_SECTION_CLASS}>
      <PH label={t.pages.projects} sub={t.pages.worksSub}/>
      <div className="mt-[40px]">
        <p style={{ fontFamily:FC, fontWeight:500, fontSize:26, color:"#fff", marginBottom:24 }}><span style={{ color:"#c778dd" }}>#</span>{t.pages.completeApps}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[16px]">
          {DATA.projects.map((p,i)=><ProjectCard key={i} proj={p} desc={t.projectDescs[i]} context={t.projectContexts[i]} t={t}/>)}
        </div>
      </div>
      <div className="mt-[48px]">
        <p style={{ fontFamily:FC, fontWeight:500, fontSize:26, color:"#fff", marginBottom:24 }}><span style={{ color:"#c778dd" }}>#</span>{t.pages.smallProjects}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[16px]">
          {DATA.smallProjects.map((p,i)=><SmallCard key={i} proj={p} desc={t.smallProjectDescs[i]} t={t}/>)}
        </div>
      </div>
    </div>
  );
}

function ExperiencePage({ t }: { t: TType }) {
  return (
    <div className={PAGE_SECTION_CLASS}>
      <PH label={t.pages.experience} sub={t.pages.expSub}/>
      <div className="mt-[40px] flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[12px] p-[20px] sm:p-[24px]" style={{ border:"1px solid #abb2bf" }}>
          <div className="flex flex-col gap-[12px] sm:flex-row sm:items-start sm:justify-between sm:gap-[12px]">
            <div className="flex items-start gap-[12px]">
              <div className="size-[36px] shrink-0 flex items-center justify-center" style={{ background:"#c778dd" }}><Briefcase size={17} color="#fff"/></div>
              <div>
                <div className="flex flex-wrap items-center gap-[10px]">
                  <p style={{ fontFamily:FC, fontWeight:600, fontSize:20, color:"#fff" }}>{t.expRole}</p>
                  <span className="px-[8px] py-[2px]" style={{ fontFamily:FC, fontSize:12, color:"#c778dd", border:"1px solid #c778dd" }}>{t.expType}</span>
                </div>
                <p style={{ fontFamily:FC, fontSize:14, color:"#abb2bf", marginTop:4 }}>{t.expCompany}</p>
              </div>
            </div>
            <p className="sm:text-right" style={{ fontFamily:FC, fontSize:14, color:"#c778dd" }}>Dec 2025 – Present</p>
          </div>
          <div className="h-px w-full" style={{ background:"#abb2bf" }}/>
          <p style={{ fontFamily:FC, fontSize:15, color:"#abb2bf", lineHeight:"24px" }}>{t.expDesc}</p>
        </div>
      </div>
    </div>
  );
}

function EducationPage({ t }: { t: TType }) {
  return <div className={PAGE_SECTION_CLASS}><PH label={t.pages.education} sub={t.pages.eduSub}/><EduGrid t={t}/></div>;
}

function CertificationsPage({ t }: { t: TType }) {
  return <div className={PAGE_SECTION_CLASS}><PH label={t.pages.certifications} sub={t.pages.certSub}/><CertGrid t={t}/></div>;
}

function AchievementsPage({ t }: { t: TType }) {
  return (
    <div className={PAGE_SECTION_CLASS}>
      <PH label={t.pages.achievements} sub={t.pages.achieveSub}/>
      <div className="mt-[40px] flex flex-col">
        {t.achievements.map((a,i)=>(
          <div key={i} className="flex items-start gap-[16px] px-[16px] py-[16px] sm:px-[20px] sm:py-[20px]" style={{ border:"1px solid #abb2bf", borderTop:i===0?"1px solid #abb2bf":"none" }}>
            <div className="size-[28px] shrink-0 flex items-center justify-center" style={{ background:"#c778dd" }}>
              <span style={{ fontFamily:FC, fontWeight:700, fontSize:13, color:"#fff" }}>{i+1}</span>
            </div>
            <p style={{ fontFamily:FC, fontSize:16, color:"#abb2bf", lineHeight:"26px" }}>{a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutPage({ t }: { t: TType }) {
  return (
    <div className={PAGE_SECTION_CLASS}>
      <PH label={t.pages.aboutMe} sub={t.pages.aboutSub}/>
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12 mt-[40px]">
        <div className="flex flex-col gap-[16px]">
          {t.bio.map((p,i)=><p key={i} style={{ fontFamily:FC, fontSize:16, color:"#abb2bf", lineHeight:"26px" }}>{p}</p>)}
        </div>
        <div className="relative flex justify-center">
          <div className="absolute top-0 left-0 hidden sm:block"><DotGrid rows={5} cols={5}/></div>
          <div className="mt-[40px] aspect-[280/400] w-full max-w-[17.5rem] overflow-hidden">
            <img src={imgAboutPerson} alt={DATA.personal.name} className="w-full h-full object-cover object-top"/>
          </div>
          <div className="absolute bottom-0 right-0 hidden sm:block"><DotGrid rows={5} cols={5}/></div>
        </div>
      </div>
      <div className="mt-[48px] grid grid-cols-1 sm:grid-cols-2 gap-[32px]">
        <div>
          <SH label={t.sections.languages}/>
          <div className="flex flex-col mt-[24px]">
            {t.langNames.map((name,i)=>(
              <div key={i} className="flex items-center justify-between px-[12px] py-[12px]" style={{ border:"1px solid #abb2bf", borderTop:i===0?"1px solid #abb2bf":"none" }}>
                <p style={{ fontFamily:FC, fontWeight:600, fontSize:14, color:"#fff" }}>{name}</p>
                <p style={{ fontFamily:FC, fontSize:13, color:"#abb2bf" }}>{t.langLevels[i]}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SH label={t.sections.interests}/>
          <div className="flex flex-wrap gap-[10px] mt-[24px]">
            {t.interests.map((item,i)=>(
              <div key={i} className="px-[12px] py-[6px]" style={{ border:"1px solid #abb2bf" }}>
                <span style={{ fontFamily:FC, fontSize:14, color:"#abb2bf" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-[48px]">
        <div className="flex items-center gap-[16px] mb-[24px] min-w-0">
          <p className="text-[clamp(1.5rem,4vw,1.875rem)] leading-none whitespace-normal" style={{ fontFamily:FC, fontWeight:500, color:"#fff" }}>
            <span style={{ color:"#c778dd" }}>#</span>{t.sections.funFacts}
          </p>
          <div className="hidden lg:block ml-[8px]"><DotGrid rows={3} cols={8}/></div>
        </div>
        <div className="flex flex-wrap gap-[10px]">
          {t.funFacts.map((f,i)=>(
            <div key={i} className="px-[12px] py-[6px]" style={{ border:"1px solid #abb2bf" }}>
              <span style={{ fontFamily:FC, fontSize:14, color:"#abb2bf" }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactsPage({ t }: { t: TType }) {
  return (
    <div className={PAGE_SECTION_CLASS}>
      <PH label={t.pages.contacts} sub={t.pages.contactSub}/>
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12 mt-[40px]">
        <p style={{ fontFamily:FC, fontSize:16, color:"#abb2bf", lineHeight:"26px", maxWidth:505 }}>{t.openTo}</p>
        <div className="flex flex-col gap-[16px] sm:flex-row sm:flex-wrap">
          <div className="flex w-full min-w-0 flex-col gap-[10px] p-[16px] sm:flex-1 sm:min-w-[190px]" style={{ border:"1px solid #abb2bf" }}>
            <p style={{ fontFamily:FC, fontWeight:600, fontSize:15, color:"#fff" }}>{t.btns.callWhatsapp}</p>
            <div className="flex items-center gap-[8px] min-w-0"><PhoneIcon size={15}/><span className="break-words" style={{ fontFamily:FC, fontSize:15, color:"#abb2bf" }}>{DATA.personal.phone}</span></div>
          </div>
          <div className="flex w-full min-w-0 flex-col gap-[10px] p-[16px] sm:flex-1 sm:min-w-[220px]" style={{ border:"1px solid #abb2bf" }}>
            <p style={{ fontFamily:FC, fontWeight:600, fontSize:15, color:"#fff" }}>{t.btns.messageMe}</p>
            <a href={DATA.personal.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-[8px] hover:opacity-75 transition-opacity min-w-0"><LinkedInIcon size={17}/><span className="break-all" style={{ fontFamily:FC, fontSize:13, color:"#abb2bf" }}>linkedin.com/in/saurabh-babalsure</span></a>
            <a href={`mailto:${DATA.personal.email}`} className="flex items-center gap-[8px] hover:opacity-75 transition-opacity min-w-0"><EmailIcon size={15}/><span className="break-all" style={{ fontFamily:FC, fontSize:13, color:"#abb2bf" }}>{DATA.personal.email}</span></a>
          </div>
        </div>
      </div>
      <div className="mt-[48px]">
        <SH label={t.sections.allMedia}/>
        <div className="flex flex-wrap gap-[12px] mt-[24px]">
          {DATA.allMedia.map(m => {
            const Icon = m.platform==="Github"?GithubIcon:m.platform==="LinkedIn"?LinkedInIcon:KaggleIcon;
            return <a key={m.platform} href={m.url} target="_blank" rel="noreferrer" className="flex items-center gap-[8px] px-[12px] py-[8px] hover:opacity-75 transition-opacity" style={{ border:"1px solid #abb2bf", fontFamily:FC, fontSize:15, color:"#abb2bf" }}><Icon size={17}/>@{m.label}</a>;
          })}
        </div>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<LangKey>("en");
  const bodyOverflowRef = useRef<string | null>(null);
  const t = T[lang];

  useEffect(() => {
    if (menuOpen) {
      bodyOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    } else if (bodyOverflowRef.current !== null) {
      document.body.style.overflow = bodyOverflowRef.current;
      bodyOverflowRef.current = null;
    }
    return () => {
      if (bodyOverflowRef.current !== null) {
        document.body.style.overflow = bodyOverflowRef.current;
        bodyOverflowRef.current = null;
      }
    };
  }, [menuOpen]);

  const nav = (p: Page) => { setPage(p); setMenuOpen(false); window.scrollTo({ top:0, behavior:"smooth" }); };

  const navLinks: { key: Page; label: string }[] = [
    { key:"home",           label:t.nav.home },
    { key:"about-me",       label:t.nav.aboutMe },
    { key:"skills",         label:t.nav.skills },
    { key:"projects",       label:t.nav.projects },
    { key:"experience",     label:t.nav.experience },
    { key:"certifications", label:t.nav.certifications },
    { key:"education",      label:t.nav.education },
    { key:"achievements",   label:t.nav.achievements },
    { key:"contacts",       label:t.nav.contacts },
  ];

  return (
    <div className="min-h-screen overflow-x-clip" style={{ background:"#282c33", color:"#fff" }}>
      <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-4 sm:px-6 lg:px-[60px]" style={{ background:"#282c33" }}>
        <button onClick={() => nav("home")} className="flex items-center gap-[8px] shrink-0 hover:opacity-75 transition-opacity">
          <LogoMark/><span style={{ fontFamily:FC, fontWeight:700, fontSize:16, color:"#fff" }}>{DATA.personal.handle}</span>
        </button>
        <nav className="hidden lg:flex items-center gap-[14px] overflow-x-auto">
          {navLinks.map(({ key, label }) => (
            <button key={key} onClick={() => nav(key)} className="flex items-start hover:opacity-75 transition-opacity shrink-0" style={{ fontFamily:FC, fontSize:13, lineHeight:"normal" }}>
              <span style={{ color:"#c778dd" }}>#</span>
              <span style={{ color:page===key?"#fff":"#abb2bf", fontWeight:page===key?600:400 }}>{label}</span>
            </button>
          ))}
          <LangSwitcher lang={lang} setLang={setLang}/>
        </nav>
        <div className="lg:hidden flex items-center gap-[12px]">
          <LangSwitcher lang={lang} setLang={setLang}/>
          <button className="flex flex-col gap-[5px]" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu">
            <div className="h-[2px] w-[24px]" style={{ background:"#d9d9d9" }}/>
            {!menuOpen && <div className="h-[2px] w-[15px] self-end" style={{ background:"#d9d9d9" }}/>}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col gap-[14px] overflow-y-auto px-4 sm:px-6 pt-[5.5rem] pb-8" style={{ background:"#282c33" }}>
          <button className="absolute top-[16px] right-[20px]" onClick={() => setMenuOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><line x1="3" y1="3" x2="21" y2="21" stroke="#d9d9d9" strokeWidth="2"/><line x1="21" y1="3" x2="3" y2="21" stroke="#d9d9d9" strokeWidth="2"/></svg>
          </button>
          {navLinks.map(({ key, label }) => (
            <button key={key} onClick={() => nav(key)} className="flex items-start text-left text-[1.25rem] sm:text-[1.375rem]" style={{ fontFamily:FC, fontWeight:500, lineHeight:"normal" }}>
              <span style={{ color:"#c778dd" }}>#</span><span style={{ color:"#fff" }}>{label}</span>
            </button>
          ))}
          <div className="flex gap-[8px] mt-[16px]"><SocialLinks size={26}/></div>
        </div>
      )}

      <MediaSidebar/>

      <main className="pt-16 lg:pl-[54px]">
        {page==="home"           && <HomePage nav={nav} t={t}/>}
        {page==="about-me"       && <AboutPage t={t}/>}
        {page==="skills"         && <SkillsPage t={t}/>}
        {page==="projects"       && <WorksPage t={t}/>}
        {page==="experience"     && <ExperiencePage t={t}/>}
        {page==="certifications" && <CertificationsPage t={t}/>}
        {page==="education"      && <EducationPage t={t}/>}
        {page==="achievements"   && <AchievementsPage t={t}/>}
        {page==="contacts"       && <ContactsPage t={t}/>}
      </main>

      <Footer t={t}/>
    </div>
  );
}
