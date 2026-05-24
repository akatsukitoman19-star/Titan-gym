import { Program, Trainer, PricingPlan, Testimonial, GalleryItem, FAQItem, TransformationItem } from "./types";

export const STATS = [
  { value: 500, label: "Active Members", suffix: "+" },
  { value: 12, label: "Certified Trainers", suffix: "" },
  { value: 24, label: "Access Hours", suffix: "/7" },
  { value: 5, label: "Years Experience", suffix: "+" },
];

export const PROGRAMS: Program[] = [
  {
    id: "1",
    title: "Weight Training",
    description: "Build raw strength, increase bone density, and sculpt your ideal physique with guided progression.",
    iconName: "Dumbbell",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600",
    tag: "strength"
  },
  {
    id: "2",
    title: "Fat Loss",
    description: "High-intensity fat-burning routines engineered to skyrocket metabolism and shed fat rapidly.",
    iconName: "Flame",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=600",
    tag: "shred"
  },
  {
    id: "3",
    title: "Cardio Endurance",
    description: "Condition your cardiovascular system, boost stamina, and maximize oxygen intake limits.",
    iconName: "Activity",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600",
    tag: "stamina"
  },
  {
    id: "4",
    title: "CrossFit Studio",
    description: "High-octane operational fitness combining gymnastics, weightlifting, and metabolic sprints.",
    iconName: "Zap",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=600",
    tag: "intensity"
  },
  {
    id: "5",
    title: "Personal Training",
    description: "1-on-1 performance mapping under premium elite coaches tailored to your biochemical build.",
    iconName: "Users",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600",
    tag: "elite"
  },
  {
    id: "6",
    title: "Strength Building",
    description: "Powerlifting-focused programs designed to break heavy lift plateaus and set power records.",
    iconName: "TrendingUp",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=600",
    tag: "power"
  },
  {
    id: "7",
    title: "Yoga & Mobility",
    description: "Decompress joints, optimize athletic deep range architecture, and achieve mental calibration.",
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
    tag: "recovery"
  },
  {
    id: "8",
    title: "Bodybuilding Pro",
    description: "Hypertrophy-intensive routines crafted specifically for symmetry, mass addition, and stage cuts.",
    iconName: "ShieldAlert",
    image: "https://images.pexels.com/photos/17852467/pexels-photo-17852467.jpeg",
    tag: "pro-cut"
  }
];

export const TRAINERS: Trainer[] = [
  {
    id: "t1",
    name: "Rahul Sharma",
    role: "Head Strength Coach",
    experience: "8+ Years",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&h=600&w=600",
    bio: "Former national powerlifter specialized in barbell biomechanics, posture adjustment, and raw power breakthrough plans.",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    specialties: ["Powerlifting", "Olympic Lifting", "Biomechanics"]
  },
  {
    id: "t2",
    name: "Arjun Mehta",
    role: "Fat Loss Specialist",
    experience: "6+ Years",
    image: "https://images.pexels.com/photos/34669284/pexels-photo-34669284.jpeg",
    bio: "Metabolic conditioning designer dedicated to body recomposition, high-density fat oxidization, and structured fat cutting.",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    specialties: ["HIIT", "Keto Nutrition", "Metabolism Tuning"]
  },
  {
    id: "t3",
    name: "Aman Verma",
    role: "Elite Bodybuilding Mentor",
    experience: "9+ Years",
    image: "https://images.pexels.com/photos/12709356/pexels-photo-12709356.jpeg",
    bio: "IFBB Pro classic physique contender focusing on muscle hypertrophy, target isolation dynamics, and pre-contest staging.",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    specialties: ["Hypertrophy", "Symmetry Sculpting", "Stage Prep"]
  },
  {
    id: "t4",
    name: "Priya Singh",
    role: "Yoga & Kinematics Trainer",
    experience: "5+ Years",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&h=600&w=600",
    bio: "Certified Ashtanga and mobility lead helping heavy athletes decompress joints, improve fascial elasticity, and elevate recovery.",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    specialties: ["Ashtanga Yoga", "Mobility Rehab", "Mindfulness Coach"]
  }
];

export const PRICING: PricingPlan[] = [
  {
    id: "p1",
    name: "Basic Plan",
    price: "₹1,499",
    period: "month",
    subtitle: "Essential gym floor access & entry-level gear mapping.",
    popular: false,
    features: [
      "Access to premium gym floor (6:00 AM - 10:00 PM)",
      "Standard cardio & machine floor zone access",
      "Complimentary standard locker room entry",
      "1x Fitness assessment with coach on registration",
      "Water station & premium shower access",
    ]
  },
  {
    id: "p2",
    name: "Pro Performance",
    price: "₹2,999",
    period: "month",
    subtitle: "Complete access, premium classes, and customized plan mapping.",
    popular: true,
    badge: "MOST POPULAR",
    features: [
      "All-Hour 24/7 Floor & Facility Access Included",
      "Unlimited group premium HIIT, CrossFit & group classes",
      "Monthly 1-on-1 checkin & custom strategy overhaul",
      "Full locker access with laundry facilities",
      "Custom sports nutrition tracker integrations",
      "Guest pass bundle (2 passes per month)",
    ]
  },
  {
    id: "p3",
    name: "Titan Elite",
    price: "₹5,999",
    period: "month",
    subtitle: "Unrestricted peak conditioning tier with perpetual personal coaching.",
    popular: false,
    features: [
      "All Pro Tier access points",
      "Unlimited 1-on-1 sessions with an Elite Coach",
      "Private biometric body scans & hydration analysis",
      "Tailored premium anabolic/strength menu plans",
      "VIP steam bath, sauna & recovery launchpad access",
      "Unlimited guest passes (always bring a gym partner)",
      "Free Titan Performance gym kit (T-shirt, shaker, bands)",
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "m1",
    name: "Vikram Rathore",
    role: "Tech Lead & Powerlifter",
    quote: "Titan Fitness Gym completely flipped my physical outlook. Combining premium calibrated steel equipment with elite strength program mapping helped me add 65kg to my squat. Indispensable for serious lifting.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    transformationTag: "Bench 140kg, Squat 210kg"
  },
  {
    id: "m2",
    name: "Anjali Deshmukh",
    role: "Creative Director",
    quote: "The Pro Performance HIIT and Yoga programs mapped my athletic recovery beautifully. I dropped 14% body fat while building exceptional cardiovascular reserves. The environment is pure focus & energy.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    transformationTag: "Dropped 12kg & Toned"
  },
  {
    id: "m3",
    name: "Sahil Kulkarni",
    role: "National Athlete",
    quote: "Pure performance. Most commercial gyms lack proper competitive bumper plates, heavy dumbbells up to 75kg, or professional platform spaces. Titan is a sanctuary for those chasing actual, verifiable strength.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    transformationTag: "Gained 6.5kg Lean Mass"
  }
];

export const TRANSFORMATION_GALLERY: TransformationItem[] = [
  {
    id: "t_gal1",
    name: "Kabir Sengupta",
    age: "28",
    goal: "Muscular Recomposition",
    beforeImg: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=400", // Cardio / before representation
    afterImg: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400",  // After lift
    duration: "6 Months",
    achievement: "Body Fat 24% to 11%"
  },
  {
    id: "t_gal2",
    name: "Rohan Deshmukh",
    age: "31",
    goal: "Shred & Lean Gain",
    beforeImg: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&q=80&w=400",
    afterImg: "https://images.unsplash.com/photo-1605296867304-46d5465a25f1?auto=format&fit=crop&q=80&w=400",
    duration: "4 Months",
    achievement: "Gained 8kg Lean Boundary Muscle"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Premium Dumbbells Range up to 75kg",
    category: "Equipment",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "g2",
    title: "Heavy Bench Platforms & Deadlift Racks",
    category: "Lifting",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "g3",
    title: "Technogym Cardiovascular Conditioning Loop",
    category: "Cardio",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "g4",
    title: "Calisthenics & Olympic Rings Zone",
    category: "CrossFit",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "g5",
    title: "Mobility Calibration Floor & Studio",
    category: "Yoga",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "g6",
    title: "Recovery Steam Chambers & Cold Plunges",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Do you offer membership freeze or holds?",
    answer: "Yes. We support up to 30 days of membership freezes per year for standard Pro members, and up to 60 days of holds for Elite memberships without overhead charges."
  },
  {
    question: "Is there private secure underground parking?",
    answer: "Absolutely. Titan Fitness provides biometric and pass-controlled secure basement parking with space for 150+ cars and premium sportbikes, complimentary for all active members."
  },
  {
    question: "Are the trainers certified internationally?",
    answer: "Every single personal coach and group trainer at Titan holds state or international gold standards certifications (e.g. ACSM, NASM, ACE, or Level 4 Strength Coaches) with verified elite track histories."
  },
  {
    question: "What safety protocols are maintained on the floor?",
    answer: "All weights and floors are sanitized systematically every 3 hours. We maintain heavy air purification ventilation cycles, and certified automated external defibrillator (AED) medical setups on site."
  }
];
