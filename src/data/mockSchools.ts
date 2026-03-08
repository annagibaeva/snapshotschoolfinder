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
];

export function getMatchedSchools(
  schoolTypes: string[],
  city: string
): School[] {
  return mockSchools.map((school) => ({
    ...school,
    matchScore: school.matchScore,
  })).sort((a, b) => b.matchScore - a.matchScore);
}
