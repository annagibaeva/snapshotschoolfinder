import { School } from "@/types/snapshot";

export const schoolTypeOptions = [
  { id: "international", label: "International School", icon: "🌍", desc: "IB, British, American curriculum" },
  { id: "local_public", label: "Local Public School", icon: "🏫", desc: "State-funded, local curriculum" },
  { id: "local_private", label: "Local Private School", icon: "🎓", desc: "Private, local curriculum" },
  { id: "montessori", label: "Montessori", icon: "🌱", desc: "Child-led learning philosophy" },
  { id: "nursery", label: "Nursery / Daycare", icon: "🧸", desc: "Ages 0–3 early education" },
  { id: "bilingual", label: "Bilingual School", icon: "💬", desc: "Two-language immersion" },
];

export const priorityOptions = [
  { id: "academic", label: "Academic Excellence", icon: "📚" },
  { id: "wellbeing", label: "Child Wellbeing", icon: "💛" },
  { id: "language", label: "Language Support", icon: "🗣️" },
  { id: "community", label: "Expat Community", icon: "🤝" },
  { id: "sport", label: "Sports & Arts", icon: "🎨" },
  { id: "proximity", label: "Close to Home", icon: "📍" },
];

export const ageOptions = [
  "0–1 (Newborn/Infant)",
  "1–2 (Toddler)",
  "2–3 (Nursery age)",
  "3–4 (Pre-K)",
  "4–5 (Kindergarten)",
  "5–6 (Year 1 / Grade 1)",
  "6–7 (Year 2 / Grade 2)",
  "7–8 (Year 3 / Grade 3)",
  "8–10 (Year 4–5)",
  "10–12 (Year 6–7)",
  "12–14 (Secondary / Middle)",
  "14–18 (High School / Sixth Form)",
];

export const mockSchools: School[] = [
  {
    id: "1",
    name: "The International School of Amsterdam",
    type: "International · IB",
    curriculum: "IB",
    location: "Amsterdam Zuid",
    ageRange: "3–18",
    matchScore: 97,
    highlights: ["IB Diploma", "Expat-friendly", "Strong community"],
    tuitionRange: "€12,000–€22,000/yr",
    lang: "English",
    deadline: "Feb 2025",
    color: "142 40% 33%",
    tip: "This school receives high demand from expat families. We recommend starting your enquiry at least 6 months before your intended start date.",
    applicationSteps: [
      { title: "Online Application", description: "Complete the online form with child details and upload documents", timeline: "2–3 weeks before deadline" },
      { title: "Assessment Day", description: "Child attends a half-day assessment with age-appropriate activities", timeline: "4–6 weeks after application" },
      { title: "Interview", description: "Family interview with admissions team (can be virtual)", timeline: "1–2 weeks after assessment" },
      { title: "Offer", description: "Offer letter sent via email with enrollment deadline", timeline: "2–3 weeks after interview" },
    ],
  },
  {
    id: "2",
    name: "Montessori Academy Noord",
    type: "Montessori · Private",
    curriculum: "Montessori",
    location: "Amsterdam Noord",
    ageRange: "2–12",
    matchScore: 91,
    highlights: ["Child-led", "Bilingual", "Small classes"],
    tuitionRange: "€1,200–€1,800/mo",
    lang: "Dutch/English",
    deadline: "Rolling",
    color: "14 68% 63%",
    tip: "Montessori schools often have rolling admissions but limited spots. Visiting early gives you the best chance at placement.",
    applicationSteps: [
      { title: "Enquiry Form", description: "Submit interest form on the school website", timeline: "Anytime" },
      { title: "School Visit", description: "Book and attend a tour of the school", timeline: "Within 2 weeks" },
      { title: "Application", description: "Complete full application with supporting documents", timeline: "After visit" },
      { title: "Offer", description: "Place offered when available", timeline: "1–6 months" },
    ],
  },
  {
    id: "3",
    name: "Basisschool De Regenboog",
    type: "Local Public",
    curriculum: "Dutch National",
    location: "Amsterdam Oost",
    ageRange: "4–12",
    matchScore: 78,
    highlights: ["Local curriculum", "Affordable", "Integration support"],
    tuitionRange: "Free (voluntary ~€100/yr)",
    lang: "Dutch",
    deadline: "Mar 2025",
    color: "231 19% 30%",
    tip: "Public schools in the Netherlands are free and generally guaranteed for children in the catchment area. Register early for popular schools.",
    applicationSteps: [
      { title: "Register Interest", description: "Register with the municipality and apply directly", timeline: "From age 3" },
      { title: "Application Form", description: "Submit application to the school", timeline: "By deadline" },
      { title: "Confirmation", description: "Placement confirmed, typically guaranteed for catchment area", timeline: "3–6 months before start" },
    ],
  },
  // — Berlin —
  {
    id: "4",
    name: "Berlin Metropolitan School",
    type: "International · IB",
    curriculum: "IB",
    location: "Berlin Mitte, Germany",
    ageRange: "3–18",
    matchScore: 95,
    highlights: ["Full IB programme", "Central location", "50+ nationalities"],
    tuitionRange: "€8,000–€16,000/yr",
    lang: "English",
    deadline: "Jan 2025",
    color: "199 55% 38%",
    tip: "Berlin Metropolitan is one of the most popular international schools in the city. Apply early — spots for mid-year joiners are very limited.",
    applicationSteps: [
      { title: "Online Application", description: "Submit application form with transcripts and passport copies", timeline: "Rolling, ideally 6+ months ahead" },
      { title: "Entrance Assessment", description: "Age-appropriate assessment in English and Maths", timeline: "Within 3 weeks" },
      { title: "Family Interview", description: "Meet with admissions coordinator (in-person or virtual)", timeline: "1–2 weeks after assessment" },
      { title: "Offer & Enrollment", description: "Receive offer, pay registration fee, and confirm place", timeline: "Within 2 weeks" },
    ],
  },
  {
    id: "5",
    name: "Phorms Campus Berlin Süd",
    type: "Bilingual · Private",
    curriculum: "German/English Bilingual",
    location: "Berlin Steglitz-Zehlendorf, Germany",
    ageRange: "1–18",
    matchScore: 88,
    highlights: ["Bilingual immersion", "From daycare to Abitur", "Green campus"],
    tuitionRange: "€300–€1,200/mo (income-based)",
    lang: "German/English",
    deadline: "Rolling",
    color: "152 45% 40%",
    tip: "Phorms uses income-based tuition, making it more accessible than many international schools. Bilingual competence develops quickly even for non-German speakers.",
    applicationSteps: [
      { title: "Enquiry", description: "Contact admissions and request an information pack", timeline: "Anytime" },
      { title: "Campus Tour", description: "Visit the campus and meet teaching staff", timeline: "By appointment" },
      { title: "Trial Day", description: "Child spends a day at the school", timeline: "After tour" },
      { title: "Enrollment", description: "Sign contract and confirm start date", timeline: "1–4 weeks" },
    ],
  },
  {
    id: "6",
    name: "Grundschule am Arkonaplatz",
    type: "Local Public",
    curriculum: "Berlin State Curriculum",
    location: "Berlin Prenzlauer Berg, Germany",
    ageRange: "6–12",
    matchScore: 71,
    highlights: ["Free education", "Welcome classes for newcomers", "Strong neighbourhood school"],
    tuitionRange: "Free",
    lang: "German",
    deadline: "Oct 2024",
    color: "35 40% 45%",
    tip: "Berlin public schools offer 'Willkommensklassen' (welcome classes) for children who don't yet speak German — an excellent bridge for expat kids.",
    applicationSteps: [
      { title: "Schulamt Registration", description: "Register with the local school authority (Schulamt)", timeline: "By October of prior year" },
      { title: "School Assignment", description: "Assigned to catchment school or apply for preferred school", timeline: "November–January" },
      { title: "Enrollment Day", description: "Attend enrollment day with required documents", timeline: "February–March" },
    ],
  },
  // — Dubai —
  {
    id: "7",
    name: "GEMS Wellington International School",
    type: "International · British",
    curriculum: "British (IGCSE/A-Level)",
    location: "Al Sufouh, Dubai, UAE",
    ageRange: "3–18",
    matchScore: 96,
    highlights: ["Outstanding KHDA rating", "World-class facilities", "Strong expat network"],
    tuitionRange: "AED 45,000–95,000/yr",
    lang: "English",
    deadline: "Rolling",
    color: "350 60% 45%",
    tip: "GEMS schools in Dubai have rolling admissions but top-rated campuses fill fast. Securing a place for September entry typically requires applying by March.",
    applicationSteps: [
      { title: "Online Application", description: "Apply via the GEMS website with recent school reports", timeline: "Rolling admissions" },
      { title: "Assessment", description: "CAT4 or age-appropriate assessment", timeline: "Within 1 week" },
      { title: "Offer", description: "Conditional offer issued with fee schedule", timeline: "3–5 business days" },
      { title: "Registration", description: "Pay registration fee, submit medical forms, and confirm", timeline: "Within 2 weeks of offer" },
    ],
  },
  {
    id: "8",
    name: "Dubai International Academy",
    type: "International · IB",
    curriculum: "IB (PYP/MYP/DP)",
    location: "Emirates Hills, Dubai, UAE",
    ageRange: "3–18",
    matchScore: 92,
    highlights: ["Full IB World School", "Very Good KHDA rating", "Diverse community"],
    tuitionRange: "AED 50,000–88,000/yr",
    lang: "English",
    deadline: "Mar 2025",
    color: "210 50% 40%",
    tip: "DIA is one of the few schools in Dubai offering the full IB continuum. Families committed to the IB pathway should consider this a top choice.",
    applicationSteps: [
      { title: "Application Form", description: "Submit online application with school records and passport", timeline: "By March for September start" },
      { title: "Entrance Test", description: "Age-appropriate assessment in core subjects", timeline: "Within 2 weeks" },
      { title: "Parent Meeting", description: "Informal meeting with head of section", timeline: "After assessment" },
      { title: "Enrollment", description: "Accept offer, pay deposit, submit ECA and medical forms", timeline: "Within 10 days" },
    ],
  },
  {
    id: "9",
    name: "Blossom Nursery — Marina",
    type: "Nursery · Private",
    curriculum: "EYFS (British Early Years)",
    location: "Dubai Marina, Dubai, UAE",
    ageRange: "0–4",
    matchScore: 84,
    highlights: ["British EYFS curriculum", "Outdoor play focus", "Flexible schedules"],
    tuitionRange: "AED 25,000–48,000/yr",
    lang: "English",
    deadline: "Rolling",
    color: "28 70% 55%",
    tip: "Nurseries in Dubai often have shorter waitlists than schools. Visiting in person is the best way to assess the environment and staff.",
    applicationSteps: [
      { title: "Enquiry & Tour", description: "Book a visit to see the nursery in action", timeline: "Anytime" },
      { title: "Registration", description: "Complete registration form and pay admin fee", timeline: "After tour" },
      { title: "Start Date", description: "Agree start date and settling-in schedule", timeline: "Flexible" },
    ],
  },
  // — Singapore —
  {
    id: "10",
    name: "UWC South East Asia",
    type: "International · IB",
    curriculum: "IB (PYP/MYP/DP)",
    location: "Dover / Tampines, Singapore",
    ageRange: "4–18",
    matchScore: 98,
    highlights: ["Top IB results globally", "Mission-driven", "Two campuses", "Outstanding pastoral care"],
    tuitionRange: "SGD 38,000–55,000/yr",
    lang: "English",
    deadline: "Oct 2024",
    color: "340 55% 45%",
    tip: "UWCSEA is consistently ranked among the top international schools in Asia. The waitlist can be 1–2 years, so apply as early as possible.",
    applicationSteps: [
      { title: "Online Application", description: "Submit application with school reports, references, and personal statement", timeline: "By October for following August" },
      { title: "Assessment", description: "Full-day assessment including academics, social interaction, and interview", timeline: "November–February" },
      { title: "Decision", description: "Offers released in a single round", timeline: "March" },
      { title: "Acceptance", description: "Accept offer and pay deposit within deadline", timeline: "Within 3 weeks" },
    ],
  },
  {
    id: "11",
    name: "Canadian International School",
    type: "International · IB/Bilingual",
    curriculum: "IB with bilingual streams",
    location: "Tanjong Katong, Singapore",
    ageRange: "2–18",
    matchScore: 90,
    highlights: ["Chinese-English bilingual", "IB World School", "Lakeside campus"],
    tuitionRange: "SGD 28,000–42,000/yr",
    lang: "English/Chinese",
    deadline: "Rolling",
    color: "0 65% 50%",
    tip: "CIS offers one of the strongest bilingual (Chinese-English) IB programmes in Singapore — ideal for families wanting language immersion alongside the IB.",
    applicationSteps: [
      { title: "Application", description: "Apply online with academic transcripts and references", timeline: "Rolling admissions" },
      { title: "Assessment", description: "Language and academic assessment", timeline: "Within 2 weeks" },
      { title: "Interview", description: "Family interview with admissions", timeline: "After assessment" },
      { title: "Offer", description: "Offer issued with enrollment pack", timeline: "1–2 weeks" },
    ],
  },
  {
    id: "12",
    name: "EtonHouse Broadrick",
    type: "Montessori · International",
    curriculum: "IB PYP / Reggio-inspired",
    location: "Broadrick Road, Singapore",
    ageRange: "18mo–6",
    matchScore: 86,
    highlights: ["Inquiry-based learning", "Small class sizes", "Beautiful heritage campus"],
    tuitionRange: "SGD 18,000–28,000/yr",
    lang: "English",
    deadline: "Rolling",
    color: "270 35% 45%",
    tip: "EtonHouse is well-regarded for early years in Singapore. Their Reggio-inspired approach works especially well for creative, curious children.",
    applicationSteps: [
      { title: "School Tour", description: "Book a campus tour to see the learning environment", timeline: "Anytime" },
      { title: "Application", description: "Submit application with child's birth certificate and immunisation records", timeline: "After tour" },
      { title: "Playdate Assessment", description: "Child attends a structured play session", timeline: "Within 2 weeks" },
      { title: "Enrollment", description: "Accept place and sign enrollment agreement", timeline: "Within 1 week" },
    ],
  },
];

export function getMatchedSchools(
  schoolTypes: string[],
  city: string
): School[] {
  const cityLower = city.toLowerCase().trim();

  return mockSchools
    .filter((school) => {
      if (!cityLower) return true;
      return school.location.toLowerCase().includes(cityLower);
    })
    .map((school) => {
      let score = school.matchScore;
      if (schoolTypes.length > 0) {
        const typeMatch = schoolTypes.some(
          (t) =>
            school.type.toLowerCase().includes(t.replace("_", " ")) ||
            school.curriculum.toLowerCase().includes(t.replace("_", " "))
        );
        if (typeMatch) score = Math.min(99, score + 3);
        else score = Math.max(40, score - 8);
      }
      return { ...school, matchScore: score };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}
