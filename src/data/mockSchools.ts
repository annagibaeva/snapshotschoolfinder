import { School } from "@/types/snapshot";

export const mockSchools: School[] = [
  {
    id: "1",
    name: "The International School of Amsterdam",
    type: "International",
    curriculum: "IB",
    location: "Amsterdam Zuid, Netherlands",
    ageRange: "3–18",
    matchScore: 94,
    highlights: ["Full IB programme", "40+ nationalities", "English-medium", "Strong pastoral care"],
    tuitionRange: "€12,000–€22,000/yr",
    applicationSteps: [
      { title: "Online Application", description: "Complete the online form with child details and upload documents", timeline: "2–3 weeks before deadline" },
      { title: "Document Submission", description: "Submit transcripts, passport copies, and immunisation records", timeline: "With application" },
      { title: "Assessment Day", description: "Child attends a half-day assessment with age-appropriate activities", timeline: "4–6 weeks after application" },
      { title: "Interview", description: "Family interview with admissions team (can be virtual)", timeline: "1–2 weeks after assessment" },
      { title: "Decision", description: "Offer letter sent via email with enrollment deadline", timeline: "2–3 weeks after interview" },
    ],
  },
  {
    id: "2",
    name: "Sunflower Montessori Nursery",
    type: "Montessori",
    curriculum: "Montessori",
    location: "Amsterdam Oud-West, Netherlands",
    ageRange: "0–6",
    matchScore: 88,
    highlights: ["Bilingual Dutch/English", "Small group sizes", "Garden play area", "Flexible hours"],
    tuitionRange: "€1,200–€1,800/mo",
    applicationSteps: [
      { title: "Enquiry & Tour", description: "Book a school tour and meet the lead guide", timeline: "Anytime" },
      { title: "Waitlist Registration", description: "Complete registration form and pay the €50 admin fee", timeline: "After tour" },
      { title: "Place Offered", description: "When a spot opens, you'll receive an offer by email", timeline: "Varies (1–12 months)" },
      { title: "Trial Week", description: "Child attends for a settling-in week", timeline: "Before start date" },
    ],
  },
  {
    id: "3",
    name: "De Regenboog Primary School",
    type: "Local Curriculum",
    curriculum: "Dutch National",
    location: "Amsterdam Oost, Netherlands",
    ageRange: "4–12",
    matchScore: 72,
    highlights: ["Free public education", "Strong community feel", "Dutch-medium with NT2 support", "After-school care available"],
    tuitionRange: "Free (voluntary contribution ~€100/yr)",
    applicationSteps: [
      { title: "Registration", description: "Register with the municipality and apply directly to the school", timeline: "From age 3" },
      { title: "School Visit", description: "Tour the school and meet the principal", timeline: "By appointment" },
      { title: "Placement", description: "Confirmation of placement, typically guaranteed for catchment area", timeline: "3–6 months before start" },
    ],
  },
  {
    id: "4",
    name: "Little Explorers Daycare",
    type: "Daycare",
    curriculum: "Play-based",
    location: "Amsterdam Centrum, Netherlands",
    ageRange: "0–4",
    matchScore: 85,
    highlights: ["Central location", "English-speaking staff", "Organic meals included", "Open 7:30–18:30"],
    tuitionRange: "€1,400–€2,100/mo (childcare benefit eligible)",
    applicationSteps: [
      { title: "Enquiry", description: "Contact the daycare and request availability", timeline: "Anytime" },
      { title: "Visit & Tour", description: "Visit during opening hours to see the environment", timeline: "Within 1–2 weeks" },
      { title: "Waitlist", description: "Join the waitlist with preferred start date", timeline: "After visit" },
      { title: "Contract", description: "Sign contract and confirm days when place is available", timeline: "1–6 months" },
    ],
  },
  {
    id: "5",
    name: "Amsterdam Lyceum",
    type: "Secondary",
    curriculum: "Dutch National (VWO/HAVO)",
    location: "Amsterdam Zuid, Netherlands",
    ageRange: "12–18",
    matchScore: 68,
    highlights: ["Top academic results", "Bilingual stream available", "Excellent sports facilities", "Strong university placement"],
    tuitionRange: "Free (voluntary contribution ~€200/yr)",
    applicationSteps: [
      { title: "Pre-registration", description: "Register interest during the open day period (Jan–Mar)", timeline: "January–March" },
      { title: "Application", description: "Submit application with primary school recommendation (basisschooladvies)", timeline: "March" },
      { title: "Lottery/Placement", description: "Oversubscribed schools use a lottery system", timeline: "April" },
      { title: "Confirmation", description: "Accept place and complete enrollment forms", timeline: "May" },
    ],
  },
  {
    id: "6",
    name: "The British School of Amsterdam",
    type: "International",
    curriculum: "British (IGCSE/A-Level)",
    location: "Amsterdam Buitenveldert, Netherlands",
    ageRange: "3–18",
    matchScore: 91,
    highlights: ["British curriculum", "Small class sizes", "Strong expat community", "Excellent transition support"],
    tuitionRange: "€14,000–€24,000/yr",
    applicationSteps: [
      { title: "Online Application", description: "Complete application and upload recent school reports", timeline: "Rolling admissions" },
      { title: "Assessment", description: "Age-appropriate assessment in English and Maths", timeline: "Within 2 weeks of application" },
      { title: "Family Meeting", description: "Informal meeting with Head of Section", timeline: "After assessment" },
      { title: "Offer", description: "Conditional or unconditional offer issued", timeline: "Within 1 week" },
      { title: "Enrollment", description: "Accept offer, pay deposit, and submit medical forms", timeline: "Within 2 weeks of offer" },
    ],
  },
];

export function getMatchedSchools(
  schoolTypes: string[],
  childAge: string
): School[] {
  const age = parseInt(childAge) || 5;

  return mockSchools
    .map((school) => {
      let score = school.matchScore;
      const [minAge, maxAge] = school.ageRange.split("–").map((s) => parseInt(s));
      if (age >= minAge && age <= maxAge) score += 5;
      else score -= 20;

      if (schoolTypes.length > 0) {
        const typeMatch = schoolTypes.some(
          (t) => school.type.toLowerCase().includes(t.toLowerCase()) || school.curriculum.toLowerCase().includes(t.toLowerCase())
        );
        if (typeMatch) score += 8;
      }

      return { ...school, matchScore: Math.min(99, Math.max(10, score)) };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}
