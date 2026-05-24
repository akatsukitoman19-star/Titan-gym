import React, { useState, useEffect } from "react";
import { 
  Dumbbell, 
  Flame, 
  Activity, 
  Zap, 
  Users, 
  TrendingUp, 
  Sparkles, 
  ShieldAlert, 
  Instagram, 
  Facebook, 
  Twitter, 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowUp, 
  Check, 
  Plus, 
  Minus, 
  TrendingDown, 
  CheckCircle2, 
  Calendar,
  Waves
} from "lucide-react";

// Import custom components
import BMICalculator from "./components/BMICalculator";
import ImageSlider from "./components/ImageSlider";
import CountdownTimer from "./components/CountdownTimer";
import GalleryGrid from "./components/GalleryGrid";
import { PROGRAMS, TRAINERS, PRICING, TESTIMONIALS, TRANSFORMATION_GALLERY, STATS, FAQS } from "./data";

// Animated counter hook helper
function Counter({ targetValue, duration = 1500, suffix = "" }: { targetValue: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercentage = Math.min(progress / duration, 1);
      setCount(Math.floor(progressPercentage * targetValue));
      
      if (progressPercentage < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(targetValue);
      }
    };
    requestAnimationFrame(step);
  }, [targetValue, duration]);

  return (
    <span className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white glow-text">
      {count}{suffix}
    </span>
  );
}

export default function App() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFAQIndex, setActiveFAQIndex] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Lead Generation states
  const [bookingTrainer, setBookingTrainer] = useState<string | null>(null);
  const [joiningPlan, setJoiningPlan] = useState<string | null>(null);
  
  // Custom contact input state
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "", plan: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Slide testimonial intervals
  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(testimonialTimer);
  }, []);

  // Window scroll event to toggle Back-To-Top trigger
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulating initial cinematic loader fadeout
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 1100);
    return () => clearTimeout(loadTimer);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setContactForm({ name: "", email: "", phone: "", message: "", plan: "" });
    }, 4500);
  };

  const handleBookTrainerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Success! Your elite conditioning request with ${bookingTrainer} has been lodged. A Titan Coordinator will contact you within 2 working hours.`);
    setBookingTrainer(null);
  };

  const handleJoinPlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Welcome to Titan! Your spot in the ${joiningPlan} tier is securely held. We've sent a pass-code invitation with next steps to your inbox.`);
    setJoiningPlan(null);
  };

  // Helper map for lucide components based on data tags
  const getIcon = (name: string) => {
    switch (name) {
      case "Dumbbell": return <Dumbbell className="w-6 h-6 text-titan-red" />;
      case "Flame": return <Flame className="w-6 h-6 text-titan-orange" />;
      case "Activity": return <Activity className="w-6 h-6 text-titan-red" />;
      case "Zap": return <Zap className="w-6 h-6 text-titan-orange" />;
      case "Users": return <Users className="w-6 h-6 text-titan-red" />;
      case "TrendingUp": return <TrendingUp className="w-6 h-6 text-titan-orange" />;
      case "Sparkles": return <Sparkles className="w-6 h-6 text-titan-red" />;
      case "ShieldAlert": return <ShieldAlert className="w-6 h-6 text-titan-orange" />;
      default: return <Dumbbell className="w-6 h-6 text-titan-red" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-x-hidden font-sans relative">
      
      {/* 1. 全 Fullscreen Cinematic Preloader */}
      {!isPageLoaded && (
        <div className="fixed inset-0 bg-black z-[999] flex flex-col items-center justify-center">
          <div className="text-center space-y-4 max-w-sm px-6">
            {/* Loading symbol */}
            <div className="relative flex items-center justify-center w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 border-t-2 border-r-2 border-titan-red rounded-full animate-spin"></div>
              <Dumbbell className="w-10 h-10 text-titan-red animate-pulse" />
            </div>
            
            <h2 className="font-display font-black tracking-widest text-white text-2xl uppercase">
              TITAN <span className="text-titan-red">FITNESS</span>
            </h2>
            <div className="w-full bg-zinc-900 h-[2px] rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-titan-red to-titan-orange h-full animate-[loading_1s_infinite]"></div>
            </div>
            <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
              Mapping Peak Physical Architecture...
            </p>
          </div>
        </div>
      )}

      {/* 2. Sticky Glass Header/Navbar */}
      <nav className="glass-navbar fixed top-0 w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="bg-titan-red/10 border border-titan-red/20 p-2 rounded-lg group-hover:bg-titan-red transition-all duration-500">
                <Dumbbell className="w-6 h-6 text-titan-red group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="font-display font-black text-xl tracking-widest text-white uppercase">
                TITAN <span className="text-titan-red group-hover:text-titan-orange transition-colors duration-300">FITNESS</span>
              </span>
            </a>

            {/* Desktop Navigation links */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#about" className="text-sm font-semibold tracking-wider uppercase text-zinc-400 hover:text-white transition-all">About</a>
              <a href="#programs" className="text-sm font-semibold tracking-wider uppercase text-zinc-400 hover:text-white transition-all">Programs</a>
              <a href="#trainers" className="text-sm font-semibold tracking-wider uppercase text-zinc-400 hover:text-white transition-all">Trainers</a>
              <a href="#pricing" className="text-sm font-semibold tracking-wider uppercase text-zinc-400 hover:text-white transition-all">Membership</a>
              <a href="#transformations" className="text-sm font-semibold tracking-wider uppercase text-zinc-400 hover:text-white transition-all">Transformations</a>
              <a href="#calculator" className="text-sm font-semibold tracking-wider uppercase text-zinc-400 hover:text-white transition-all">BMI Tool</a>
              <a href="#gallery" className="text-sm font-semibold tracking-wider uppercase text-zinc-400 hover:text-white transition-all">Gallery</a>
              <a href="#faqs" className="text-sm font-semibold tracking-wider uppercase text-zinc-400 hover:text-white transition-all">FAQs</a>
            </div>

            {/* Action Call for intake */}
            <div className="hidden lg:flex items-center gap-4">
              <a 
                href="#pricing" 
                className="bg-transparent border border-titan-red/30 hover:border-titan-red/80 px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 text-white cursor-pointer"
              >
                Inquire Offer
              </a>
              <a 
                href="#contact" 
                className="bg-gradient-to-r from-titan-red to-titan-orange text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-all duration-300 pointer-events-auto cursor-pointer shadow-lg shadow-titan-red/10"
              >
                Join Now
              </a>
            </div>

            {/* Mobile Hamburger menu launcher */}
            <button 
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation overlay drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-zinc-950 border-b border-white/5 animate-slideup absolute top-20 left-0 w-full pb-8 px-6 space-y-4">
            <div className="flex flex-col space-y-3.5 pt-4">
              <a 
                href="#about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
              >
                About Gym
              </a>
              <a 
                href="#programs" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
              >
                Training Programs
              </a>
              <a 
                href="#trainers" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
              >
                Certified Coaches
              </a>
              <a 
                href="#pricing" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
              >
                Premium Pricing
              </a>
              <a 
                href="#transformations" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
              >
                Transformations
              </a>
              <a 
                href="#calculator" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
              >
                BMI Calculator
              </a>
              <a 
                href="#gallery" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
              >
                Visual Gallery
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
              >
                Contact & Maps
              </a>
            </div>
            
            <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
              <a 
                href="#pricing" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-zinc-900 border border-white/10 text-white py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all"
              >
                Inquire Offer
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-gradient-to-r from-titan-red to-titan-orange text-white py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all"
              >
                Book Intake Tour
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* 3. HERO SECTION (Cinema workout backing + Counters) */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-black">
        {/* Background dark high-octane background img */}
        <div className="absolute inset-0 z-0 select-none overflow-hidden origin-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/70 to-black z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-black z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920"
            alt="Intense premium dark gym warehouse background with orange lights" 
            className="w-full h-full object-cover opacity-65 bg-zoom"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content box */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 md:space-y-8 animate-slideup">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-titan-red/10 border border-titan-red/30">
              <span className="w-2 h-2 rounded-full bg-titan-red animate-ping"></span>
              <span className="text-xs font-bold tracking-widest text-titan-red uppercase font-mono">NEON ACCENT HIGH PERFORMANCE ARENA</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7.5xl leading-[1.05] text-white tracking-tight">
              Transform Your Body. <br />
              <span className="bg-gradient-to-r from-titan-red via-titan-orange to-red-500 bg-clip-text text-transparent underline decoration-red-600/30">
                Transform Your Life.
              </span>
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Welcome to the ultimate raw strength destination. Unleash your inner athlete at Delhi's flagship premium conditioning facility equipped with elite custom steel, biometric monitors, and world-class certified coaches.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <a 
                href="#contact" 
                className="px-8 py-4.5 bg-gradient-to-r from-titan-red to-titan-orange text-white rounded-xl font-display font-bold text-sm uppercase tracking-widest hover:opacity-90 hover:scale-[1.02] transform transition-all shadow-lg shadow-titan-red/25 cursor-pointer text-center"
              >
                Get Started Today
              </a>
              <a 
                href="#programs" 
                className="px-8 py-4.5 bg-zinc-900/80 border border-white/10 text-white rounded-xl font-display font-bold text-sm uppercase tracking-widest hover:bg-zinc-800 hover:border-white/20 transition-all cursor-pointer text-center"
              >
                Explore Programs
              </a>
            </div>

            {/* Mobile-friendly Stats block inside hero */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/5 max-w-3xl mx-auto lg:mx-0 text-left">
              {STATS.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-baseline gap-0.5">
                    {/* Animated counters triggered on compile */}
                    <Counter targetValue={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side countdown timer element banner */}
          <div className="lg:col-span-5 w-full">
            <div className="space-y-6">
              <CountdownTimer />
              
              {/* Secondary glass list block */}
              <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
                <p className="text-xs uppercase tracking-widest font-extrabold text-white text-left">Facility Highlights</p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-green-500/10 border border-green-500/20 rounded-md mt-0.5">
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <p className="text-xs text-zinc-300 text-left">Custom-cut calibrated steel plate benches & dumbbells up to 75kg</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-green-500/10 border border-green-500/20 rounded-md mt-0.5">
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <p className="text-xs text-zinc-300 text-left">Pure performance air filtration system cycled every 3 hours</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-green-500/10 border border-green-500/20 rounded-md mt-0.5">
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <p className="text-xs text-zinc-300 text-left">Complimentary VIP recovery sauna access for Elite pass-holders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom wave border divide */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-px">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] text-zinc-950 fill-current">
            <path d="M1200 120L0 120 309.19 8C480.99 19.5 613.3 61 772.3 61 936.3 61 1081.2 27.5 1200 8V120z"></path>
          </svg>
        </div>
      </section>

      {/* 4. ABOUT GYM SECTION */}
      <section id="about" className="py-24 md:py-32 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Col: High-Res Composite layout of gym floor */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl h-[450px]">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800" 
                  alt="Lifting heavy session at Titan Gym" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Micro metrics card overlay */}
                <div className="absolute bottom-6 left-6 right-6 lg:-right-6 bg-black/90 backdrop-blur-md rounded-2xl p-5 border border-white/10 z-20 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold tracking-widest text-titan-orange uppercase">TITAN PROTOCOL</span>
                    <span className="text-[10px] text-zinc-500 font-mono">SECURE TIERED ZONE</span>
                  </div>
                  <p className="text-sm font-semibold text-white">"No gimmicks. No distractions. Purely results-focused atmosphere built for heavy progress."</p>
                </div>
              </div>
            </div>

            {/* Right Col: About information index */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold tracking-widest text-titan-red uppercase font-mono">01 / WHY TITAN FITNESS</span>
                <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase">
                  UNCOMPROMISING ATHLETIC <br />
                  <span className="text-titan-red glow-text">DEVELOPMENT ARENA</span>
                </h2>
                <div className="h-1 w-20 bg-titan-red"></div>
              </div>

              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                Titan Fitness Gym stands as Delhi's premiere flagship facility built purely for high-performance development. For over five years, we've focused entirely on providing elite equipment standards, premium recovery loops, and scientifically-grounded exercise program mappings. We banish commercial clutter to prioritize your performance.
              </p>

              {/* Grid of highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* 1. Modern Equipment */}
                <div className="glass-card hover:bg-zinc-900/60 p-5 rounded-2xl border border-white/5 hover:border-titan-red/20 transition-all duration-300">
                  <div className="p-2.5 bg-titan-red/10 border border-titan-red/20 rounded-xl w-fit mb-4">
                    <Dumbbell className="w-5 h-5 text-titan-red" />
                  </div>
                  <h4 className="font-display font-bold text-white text-base mb-1.5 uppercase tracking-wide">Modern Calibration Equipment</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Unrestricted access to hammer-strength series, power racks, custom dumbbell towers to 75kg, and eleiko barbell plates.
                  </p>
                </div>

                {/* 2. Certified Trainers */}
                <div className="glass-card hover:bg-zinc-900/60 p-5 rounded-2xl border border-white/5 hover:border-titan-red/20 transition-all duration-300">
                  <div className="p-2.5 bg-titan-orange/10 border border-titan-orange/20 rounded-xl w-fit mb-4">
                    <Users className="w-5 h-5 text-titan-orange" />
                  </div>
                  <h4 className="font-display font-bold text-white text-base mb-1.5 uppercase tracking-wide">Certified Elite Coaches</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Train alongside certified strength specialists holding gold-standards credentials in sports kinematics & physical prep.
                  </p>
                </div>

                {/* 3. Nutrition Mapping */}
                <div className="glass-card hover:bg-zinc-900/60 p-5 rounded-2xl border border-white/5 hover:border-titan-red/20 transition-all duration-300">
                  <div className="p-2.5 bg-titan-red/10 border border-titan-red/20 rounded-xl w-fit mb-4">
                    <Sparkles className="w-5 h-5 text-titan-red" />
                  </div>
                  <h4 className="font-display font-bold text-white text-base mb-1.5 uppercase tracking-wide">Target Nutrition Support</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Custom nutrition strategies based on body bio-markers to optimize fat loss, continuous muscle recovery, and energy caps.
                  </p>
                </div>

                {/* 4. Goal Mapping */}
                <div className="glass-card hover:bg-zinc-900/60 p-5 rounded-2xl border border-white/5 hover:border-titan-red/20 transition-all duration-300">
                  <div className="p-2.5 bg-titan-orange/10 border border-titan-orange/20 rounded-xl w-fit mb-4">
                    <TrendingUp className="w-5 h-5 text-titan-orange" />
                  </div>
                  <h4 className="font-display font-bold text-white text-base mb-1.5 uppercase tracking-wide">Fat Loss & Muscle Gain</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Engineered workout blueprints tailored carefully toward rapid body recomposition, muscle density, and functional tone.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. PROGRAMS SECTION (Beautiful styled cards) */}
      <section id="programs" className="py-24 md:py-32 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header block */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-titan-red uppercase font-mono">02 / CONDITIONING BLUEPRINTS</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase">
              TITAN PERFORMANCE <span className="text-titan-red glow-text">PROGRAMS</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-titan-red to-titan-orange mx-auto"></div>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-md mx-auto">
              Choose your path of progression. Every discipline is supported by structured tracking files and guided trainer floor oversight.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROGRAMS.map((program) => (
              <div 
                key={program.id}
                id={`program-card-${program.id}`}
                className="group glass-card hover:bg-zinc-900/60 rounded-2xl overflow-hidden border border-white/5 hover:border-titan-red/20 transition-all duration-500 flex flex-col justify-between h-[380px] pointer-events-auto"
              >
                {/* Image and Tag layer */}
                <div className="relative h-44 overflow-hidden bg-zinc-950">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
                  <img 
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  
                  {program.tag && (
                    <div className="absolute top-4 right-4 z-20 bg-black/80 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded text-[9px] font-bold text-titan-orange uppercase tracking-wider">
                      {program.tag}
                    </div>
                  )}

                  {/* Icon medallion */}
                  <div className="absolute -bottom-6 left-6 z-20 p-3 bg-zinc-950 border border-white/10 rounded-xl group-hover:border-titan-red/30 transition-all duration-300">
                    {getIcon(program.iconName)}
                  </div>
                </div>

                {/* Information Layer */}
                <div className="p-6 pt-8 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-white text-lg tracking-tight group-hover:text-titan-red transition-colors duration-300 uppercase">
                      {program.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mt-1.5 line-clamp-3">
                      {program.description}
                    </p>
                  </div>

                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-1.5 text-xs text-titan-orange hover:text-white transition-all font-semibold uppercase tracking-widest mt-2"
                  >
                    Enroll Program <Plus className="w-3 h-3 text-titan-red" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. TRAINERS SECTION (IMPORTANT SHOWCASE) */}
      <section id="trainers" className="py-24 md:py-32 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header block */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-titan-orange uppercase font-mono">03 / SPECIALIST SHOWCASE</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase">
              MEET THE <span className="text-titan-red glow-text">ELITE COACHES</span>
            </h2>
            <div className="h-1 w-24 bg-titan-red mx-auto"></div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
              Our specialists hold state or international physical preparation standards, committing to guiding your metrics safely.
            </p>
          </div>

          {/* Trainer Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TRAINERS.map((trainer) => (
              <div 
                key={trainer.id}
                id={`trainer-card-${trainer.id}`}
                className="group relative bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden glass-card transition-all duration-500 glow-border pointer-events-auto"
              >
                {/* Images with cinematic red linear accents */}
                <div className="relative h-[280px] overflow-hidden bg-black">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10"></div>
                  <img 
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating experience badge */}
                  <div className="absolute top-4 left-4 z-20 bg-titan-red px-2.5 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider shadow-md">
                    {trainer.experience} Exp
                  </div>

                  {/* Hover detail block (slides up on hover) */}
                  <div className="absolute inset-0 bg-black/90 p-6 flex flex-col justify-end z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-xs font-bold text-titan-orange uppercase tracking-wider mb-2">Qualifications</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {trainer.specialties.map((spec, sIdx) => (
                        <span key={sIdx} className="text-[9px] bg-zinc-900 border border-white/10 px-2 py-0.5 rounded text-zinc-300">
                          {spec}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">{trainer.bio}</p>
                    
                    {/* Social media icons on hover */}
                    <div className="flex gap-3 mb-2">
                      <a href={trainer.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-900 hover:bg-titan-red rounded-lg transition-colors text-white">
                        <Instagram className="w-4 h-4" />
                      </a>
                      <a href={trainer.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-900 hover:bg-titan-red rounded-lg transition-colors text-white">
                        <Facebook className="w-4 h-4" />
                      </a>
                      <a href={trainer.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-900 hover:bg-titan-red rounded-lg transition-colors text-white">
                        <Twitter className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Permanent Info Frame */}
                <div className="p-5 space-y-3 bg-zinc-950">
                  <div>
                    <h3 className="font-display font-bold text-white text-lg tracking-tight group-hover:text-titan-red transition-all">
                      {trainer.name}
                    </h3>
                    <p className="text-xs text-titan-orange uppercase tracking-widest font-semibold mt-0.5">
                      {trainer.role}
                    </p>
                  </div>

                  {/* Action button inside card */}
                  <button 
                    onClick={() => setBookingTrainer(trainer.name)}
                    className="w-full py-2.5 bg-zinc-900 hover:bg-gradient-to-r hover:from-titan-red hover:to-titan-orange border border-white/5 hover:border-transparent text-xs font-bold text-white uppercase tracking-wider rounded-xl transition-all duration-300 pointer-events-auto cursor-pointer"
                  >
                    Book Session
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. MEMBERSHIP PRICING SECTION */}
      <section id="pricing" className="py-24 md:py-32 bg-black relative">
        {/* Background glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-titan-red/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header block */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-titan-red uppercase font-mono">04 / CLEAR PRICING</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase">
              TITAN MEMBERSHIP <span className="text-titan-red glow-text">PLANS</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-titan-red to-titan-orange mx-auto"></div>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-md mx-auto">
              Upgrade physical potential today. Choose a performance tier built to support your daily athletic lifestyle.
            </p>
          </div>

          {/* Offer Banner Block */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-titan-red/10 via-titan-orange/10 to-titan-red/10 border border-titan-orange/30 rounded-2xl p-6 text-center">
              <span className="text-xs font-black tracking-widest text-titan-orange uppercase">LIMITED OFFER FOR SUBSCRIBERS</span>
              <p className="text-sm text-zinc-300 mt-1">Get an extra <span className="text-white font-extrabold">₹500 OFF</span> & zero setup charges using code <span className="text-titan-red font-mono font-black">TITAN35</span> in forms.</p>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PRICING.map((plan) => {
              const isPopular = plan.popular;
              return (
                <div 
                  key={plan.id}
                  id={`pricing-${plan.id}`}
                  className={`group relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-500 pointer-events-auto h-full ${
                    isPopular 
                      ? "bg-zinc-900 border-2 border-titan-red shadow-[0_0_30px_rgba(255,42,42,0.15)] scale-[1.03]" 
                      : "bg-zinc-950 border border-white/5 hover:border-white/20"
                  }`}
                >
                  {/* Badge */}
                  {isPopular && (
                    <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-titan-red to-titan-orange px-4 py-1.5 rounded-full text-[10px] font-black tracking-wider text-white shadow-lg">
                      {plan.badge}
                    </div>
                  )}

                  {/* Plan Info Header */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display font-black text-2xl text-white tracking-wide uppercase">{plan.name}</h3>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed h-10">{plan.subtitle}</p>
                    </div>

                    <div className="flex items-baseline gap-1 pt-2 border-t border-white/5">
                      <span className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight">{plan.price}</span>
                      <span className="text-sm text-zinc-500">/ {plan.period}</span>
                    </div>

                    {/* Features list */}
                    <div className="space-y-3.5 pt-4">
                      {plan.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3">
                          <div className={`p-0.5 rounded-md mt-0.5 border ${
                            isPopular ? "bg-titan-red/10 border-titan-red/20 text-titan-red" : "bg-white/5 border-white/10 text-white"
                          }`}>
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs text-zinc-300 leading-normal">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Plan Button */}
                  <div className="pt-8 mt-auto">
                    <button 
                      onClick={() => setJoiningPlan(plan.name)}
                      className={`w-full py-4 rounded-xl font-display font-bold text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer pointer-events-auto ${
                        isPopular
                          ? "bg-gradient-to-r from-titan-red to-titan-orange text-white shadow-lg shadow-titan-red/20 hover:opacity-90 active:scale-95"
                          : "bg-zinc-905 bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-805 hover:bg-zinc-850 hover:border-white/25"
                      }`}
                    >
                      Join Performance Tier
                    </button>
                    <p className="text-center text-[10px] text-zinc-500 mt-3">Cancel or hold access options in user app jederzeit.</p>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. PHYSIC TRANSFORMATIONS (Before/After Slider) */}
      <section id="transformations" className="py-24 md:py-32 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header block */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-titan-red uppercase font-mono">05 / VERIFIABLE ATTAINMENT</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase">
              ATHLETE <span className="text-titan-red glow-text">TRANSFORMATIONS</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-titan-red to-titan-orange mx-auto"></div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
              Real results from real Delhi members. Use our interactive sliding frames to inspect their body recomposition details.
            </p>
          </div>

          {/* Image Slider Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {TRANSFORMATION_GALLERY.map((item) => (
              <ImageSlider 
                key={item.id}
                beforeImage={item.beforeImg}
                afterImage={item.afterImg}
                name={item.name}
                achievement={item.achievement}
                duration={item.duration}
              />
            ))}
          </div>

          {/* Fast track program enrollment promo line */}
          <div className="text-center pt-10 mt-8">
            <p className="text-xs text-zinc-400 uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 flex-col md:flex-row">
              🏋🏽 Designed workout logs mapped by Coach Rahul Sharma. 
              <a href="#contact" className="text-titan-red underline hover:text-white transition-colors ml-1 font-black">
                Claim your custom plan blueprint now
              </a>
            </p>
          </div>

        </div>
      </section>

      {/* 9. TESTIMONIALS SLIDER SECTION */}
      <section className="py-24 md:py-32 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative glass-card border border-white/5 rounded-3xl p-8 md:p-16 max-w-4xl mx-auto overflow-hidden">
            
            {/* Decors */}
            <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-72 h-72 bg-titan-red/5 rounded-full blur-[90px] pointer-events-none"></div>
            
            <div className="space-y-3 mb-10 text-center">
              <span className="text-xs font-bold tracking-widest text-titan-orange uppercase font-mono">06 / VERBATIM REVIEWS</span>
              <h2 className="font-display font-black text-2xl md:text-4xl text-white tracking-tight uppercase">
                WHAT OUR <span className="text-titan-red glow-text">MEMBERS SAY</span>
              </h2>
              <div className="h-1 w-16 bg-titan-orange mx-auto"></div>
            </div>

            {/* Testimonials Slides block */}
            <div className="relative min-h-[180px] flex flex-col justify-between">
              
              <div className="space-y-6 text-center animate-slideup">
                <p className="text-base sm:text-xl text-zinc-300 leading-relaxed italic font-light">
                  "{TESTIMONIALS[activeTestimonial].quote}"
                </p>
                
                <div className="flex flex-col items-center gap-2">
                  <img 
                    src={TESTIMONIALS[activeTestimonial].image} 
                    alt={TESTIMONIALS[activeTestimonial].name} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-titan-red/50 shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-display font-black text-white text-base leading-none">
                      {TESTIMONIALS[activeTestimonial].name}
                    </h4>
                    <span className="text-zinc-500 text-[11px] uppercase tracking-wider font-semibold font-mono mt-0.5 inline-block">
                      {TESTIMONIALS[activeTestimonial].role}
                    </span>
                  </div>
                  
                  {/* Performance metric tag */}
                  <span className="px-3 py-1 bg-zinc-900 border border-white/10 rounded-full text-[10px] text-titan-orange uppercase font-bold tracking-wider mt-1">
                    🎯 Result: {TESTIMONIALS[activeTestimonial].transformationTag}
                  </span>
                </div>
              </div>

              {/* Slider Dots indicators */}
              <div className="flex justify-center gap-2.5 mt-8">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer pointer-events-auto ${
                      activeTestimonial === idx ? "bg-titan-red w-7 shadow-sm shadow-titan-red" : "bg-zinc-800"
                    }`}
                    aria-label={`Show testimonial ${idx + 1}`}
                  />
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 10. BMI CALCULATOR SECTION */}
      <section id="calculator" className="py-24 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: BMI informational hook */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold tracking-widest text-titan-orange uppercase font-mono">07 / MATHEMATICAL RATINGS</span>
                <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase">
                  CALCULATE YOUR <br />
                  <span className="text-titan-orange glow-orange-text">BODY MASS INDEX</span>
                </h2>
                <div className="h-1 w-20 bg-titan-orange"></div>
              </div>

              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                Body Mass Index (BMI) evaluates body weight thresholds based against structural height metrics. While not fully factoring dense functional muscular mass percentages, it offers a fast, clinical diagnostic indicator to prioritize fat-cutting or muscle gains program targets.
              </p>

              {/* Informational matrix lists */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 text-center">
                  <span className="block text-xs font-bold text-gray-400">Underweight</span>
                  <p className="text-sm font-black text-blue-400 mt-1 font-mono">&lt; 18.5</p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 text-center">
                  <span className="block text-xs font-bold text-gray-400">Healthy Weight</span>
                  <p className="text-sm font-black text-green-400 mt-1 font-mono">18.5 – 24.9</p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 text-center">
                  <span className="block text-xs font-bold text-gray-400">Overweight</span>
                  <p className="text-sm font-black text-yellow-500 mt-1 font-mono">25.0 – 29.9</p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 text-center">
                  <span className="block text-xs font-bold text-gray-400">Obese Range</span>
                  <p className="text-sm font-black text-titan-red mt-1 font-mono">≥ 30.0</p>
                </div>

              </div>

              <p className="text-xs text-zinc-500 italic">
                *Please note: Heavy bodybuilding athletes frequently map to high-overweight BMI levels due to dense hypertrophic muscle tissues. Floor fitness scans are available inside our facility.
              </p>
            </div>

            {/* Right Column: Calculator Input form */}
            <div className="lg:col-span-5">
              <BMICalculator />
            </div>

          </div>
        </div>
      </section>

      {/* 11. GALLERY SECTION WITH LIGHTBOX */}
      <section id="gallery" className="py-24 md:py-32 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header block */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-titan-red uppercase font-mono">08 / PREMIUM FACILITIES</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase">
              TITAN ATHLETIC <span className="text-titan-red glow-text">GALLERY</span>
            </h2>
            <div className="h-1 w-24 bg-titan-red mx-auto"></div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
              Inspect our high-performance architecture. Click any item card to open the interactive high-resolution lightroom.
            </p>
          </div>

          {/* Render custom filtering category grid component */}
          <GalleryGrid />

        </div>
      </section>

      {/* 12. FAQ ACCORDION SECTION */}
      <section id="faqs" className="py-24 bg-zinc-950 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header block */}
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <span className="text-xs font-bold tracking-widest text-titan-orange uppercase font-mono">09 / FREQUENT QUERIES</span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
              FREQUENTLY ASKED <span className="text-titan-orange glow-orange-text">ANSWERS</span>
            </h2>
            <div className="h-1 w-20 bg-titan-orange mx-auto"></div>
          </div>

          {/* Frequently Asked accordion cards stack */}
          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFAQIndex === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setActiveFAQIndex(isOpen ? null : idx)}
                  className="glass-card hover:bg-zinc-900/60 border border-white/5 rounded-2xl p-5 md:p-6 transition-all duration-300 cursor-pointer select-none pointer-events-auto"
                >
                  <div className="flex justify-between items-center gap-4">
                    <h3 className="font-display font-bold text-gray-100 text-sm md:text-base leading-tight">
                      {faq.question}
                    </h3>
                    <div className={`p-1.5 bg-zinc-805 bg-zinc-800 rounded-lg text-zinc-400 transition-transform duration-300 ${
                      isOpen ? "rotate-45 text-titan-orange" : ""
                    }`}>
                      <Plus className="w-4 h-4" />
                    </div>
                  </div>

                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-white/5 leading-relaxed text-xs sm:text-sm text-zinc-400 animate-slideup">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 13. CONTACT SECTION & GOOGLE MAPS EMBED */}
      <section id="contact" className="py-24 md:py-32 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            
            {/* Left side: Coordinates coordinates details & Maps iframe */}
            <div className="lg:col-span-6 space-y-8 flex flex-col justify-between">
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="text-xs font-bold tracking-widest text-titan-red uppercase font-mono">10 / LOCATION COORDINATES</span>
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
                    VISIT TITAN <span className="text-titan-red glow-text">FLOOR TODAY</span>
                  </h2>
                  <div className="h-1 w-20 bg-titan-red"></div>
                </div>

                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                  Titan Gym is conveniently situated inside the high-end retail strip of Greater Kailash-II, New Delhi. Drop by for a premium personal walk-through and complimentary bio-metric hydration analysis mapping.
                </p>

                {/* Vertical lists of contact pieces */}
                <div className="space-y-4">
                  
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-zinc-900 border border-white/5 rounded-xl text-titan-red">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Facility Address</span>
                      <p className="text-sm font-semibold text-zinc-200 mt-1">M- block Market, GK-II Retail Strip, GK-2, New Delhi, India 110048</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-zinc-900 border border-white/5 rounded-xl text-titan-red">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Call Desk Desk</span>
                      <p className="text-sm font-semibold text-zinc-200 mt-1">+91 78917 72709</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-zinc-900 border border-white/5 rounded-xl text-titan-red">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Digital Mailbox</span>
                      <p className="text-sm font-semibold text-zinc-200 mt-1">membership@titanfitness.in</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-zinc-900 border border-white/5 rounded-xl text-titan-red">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Operating Schedule</span>
                      <p className="text-sm font-semibold text-zinc-200 mt-1">Daily Access: 24 Hours / 7 Days. Trainer Floor Assistance: 6:00 AM - 10:00 PM</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Embedded Maps box */}
              <div className="w-full h-[250px] rounded-2xl overflow-hidden border border-white/5">
                <iframe 
                  title="Titan Gym GK II Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2s0x390ce3daecbe10a5%3A0xe5a3637feeb1b00!2sGreater+Kailash%2C+New+Delhi%2C+Delhi%20110048!3m2!1m1!2sz!5m2!1sen!2sin" 
                  className="w-full h-full border-0 grayscale invert contrast-125 opacity-80 hover:opacity-100 transition-opacity duration-300"
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer"
                ></iframe>
              </div>

            </div>

            {/* Right side: Modern lead form */}
            <div className="lg:col-span-6 glass-card rounded-2xl p-8 border border-white/5 flex flex-col justify-between">
              
              <div className="space-y-4">
                <h3 className="font-display font-black text-xl text-white tracking-wide uppercase">Request Intake Consultation</h3>
                <p className="text-xs text-zinc-400">Lock down your special promotion rate and schedule your premium tour onboarding.</p>
                
                {isSubmitted ? (
                  <div className="p-8 bg-zinc-900/40 rounded-2xl text-center border border-green-500/30 font-sans space-y-4 my-8 animate-slideup">
                    <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6 animate-pulse" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-white text-base">Request Registered!</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
                        Your VIP booking code has been lodged under mobile {contactForm.phone}. One of our elite instructors will dial you within 2 working hours. Ready to transform!
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5 pt-3">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Your Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Rahul Verma"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-titan-red transition-all text-xs"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Mobile Number</label>
                        <input
                          type="tel"
                          placeholder="e.g. +91 99999 88888"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-titan-red transition-all text-xs"
                          required
                          pattern="[0-9+() \-]{10,15}"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        placeholder="e.g. rahul@example.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-titan-red transition-all text-xs"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Target Performance Plan</label>
                      <select
                        value={contactForm.plan}
                        onChange={(e) => setContactForm({ ...contactForm, plan: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-titan-red transition-all text-xs"
                        required
                      >
                        <option value="">Select a performance tier...</option>
                        <option value="basic">Basic Performance (₹1,499/mo)</option>
                        <option value="pro">Pro Performance Active (₹2,999/mo) - HIGHEST DEMAND</option>
                        <option value="elite">Titan Elite Unlimited (₹5,999/mo)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Aspiration / Note (Optional)</label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Need to build raw strength, break deadlift barriers, keto tracking..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-titan-red transition-all text-xs resize-none"
                      />
                    </div>

                    <p className="text-[10px] text-zinc-500 text-left">
                      🛡️ By submitting, you authorize Titan Fitness to contact you on WhatsApp/Mobile to finalize gym tour bookings.
                    </p>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-titan-red to-titan-orange text-white font-display font-bold text-xs uppercase tracking-widest rounded-xl hover:opacity-95 transition-all shadow-lg cursor-pointer"
                    >
                      Lock Promoted Offer Spot Now
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 14. FOOTER */}
      <footer className="bg-zinc-950 border-t border-white/5 py-12 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            
            {/* Column 1 Logo and line */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="bg-titan-red/10 border border-titan-red/20 p-2 rounded-lg">
                  <Dumbbell className="w-5 h-5 text-titan-red" />
                </div>
                <span className="font-display font-black text-lg tracking-widest text-white uppercase">
                  TITAN <span className="text-titan-red">FITNESS</span>
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed mr-4">
                Delhi's premier luxury physical conditioning sanctuary built exclusively for heavy barbell lifts, cardiovascular limits, and biometric-backed athletic recovery.
              </p>
              
              <div className="flex gap-4 pt-1">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2 Navigation map */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest">MAP SECTIONS</h4>
              <ul className="space-y-2 text-xs text-zinc-500">
                <li><a href="#about" className="hover:text-white transition-colors">About Facility</a></li>
                <li><a href="#programs" className="hover:text-white transition-colors">Floor Blueprints</a></li>
                <li><a href="#trainers" className="hover:text-white transition-colors">Certified Specialists</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Membership Pricing</a></li>
                <li><a href="#transformations" className="hover:text-white transition-colors">Verifiable Transformations</a></li>
              </ul>
            </div>

            {/* Column 3 Extra items */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest font-mono">HIGHLIGHT EXTRA</h4>
              <ul className="space-y-2 text-xs text-zinc-500">
                <li><a href="#calculator" className="hover:text-white transition-colors">Calculator Meter</a></li>
                <li><a href="#gallery" className="hover:text-white transition-colors">Visual Gallery Grid</a></li>
                <li><a href="#faqs" className="hover:text-white transition-colors">Intake FAQ list</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Coordinates & Maps</a></li>
              </ul>
            </div>

            {/* Column 4 Legal Coordinates */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest">WIDGET ADVICE</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Titan Fitness adheres to regulatory athletic biomechanics guidance. Always seek licensed sports advice before training heavy.
              </p>
              <div className="pt-2 text-[10px] text-zinc-600 font-mono">
                © {new Date().getFullYear()} Titan Fitness Gym Private Ltd. All absolute rights reserved.
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* 15. FLOATING WhatsApp PULSE BUTTON (MANDATIVE DIRECTIVE) */}
      <a 
        href="https://wa.me/917891772709" 
        className="whatsapp-float hover:scale-110" 
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Titan Gym on WhatsApp"
        id="whatsapp-floating-button"
      >
        <i className="fab fa-whatsapp"></i>
      </a>

      {/* 16. BACK TO TOP BUTTON */}
      {showScrollTop && (
        <button
          id="back-to-top-button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-[100px] right-[25px] p-3.5 bg-zinc-900 hover:bg-titan-red text-zinc-400 hover:text-white rounded-full transition-all duration-300 shadow-xl cursor-pointer pointer-events-auto border border-white/5 z-40 hover:scale-105"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* 17. TRAINER BOOKING MODAL */}
      {bookingTrainer && (
        <div 
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fadein"
          onClick={() => setBookingTrainer(null)}
        >
          <div 
            className="glass-card max-w-md w-full bg-zinc-90 w-full p-8 rounded-2xl border border-white/10 relative pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              id="trainer-modal-close"
              onClick={() => setBookingTrainer(null)}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white rounded-full hover:bg-zinc-805 bg-zinc-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-titan-red/10 border border-titan-red/20 rounded-xl">
                  <Calendar className="w-6 h-6 text-titan-red" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-lg uppercase">Book {bookingTrainer}</h4>
                  <p className="text-xs text-zinc-400">Requesting elite 1-on-1 floor mapping session</p>
                </div>
              </div>

              <form onSubmit={handleBookTrainerSubmit} className="space-y-4 pt-2">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Your Full Name</label>
                  <input required type="text" className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" placeholder="e.g. Rahul Sharma" />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">WhatsApp Mobile Phone</label>
                  <input required type="tel" className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" placeholder="e.g. +91 99999 00000" />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Target Workout Hour</label>
                  <select required className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white">
                    <option value="early_morning">Early Morning (6:00 AM - 9:00 AM)</option>
                    <option value="midday">Midday Recovery (11:00 AM - 2:00 PM)</option>
                    <option value="evening">Peak Hours (5:00 PM - 9:00 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Current Health Target</label>
                  <textarea rows={2} className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-xs text-white resize-none" placeholder="e.g. Adding muscle density, mobility adjust..."></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3 bg-gradient-to-r from-titan-red to-titan-orange text-white font-display text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                >
                  Submit Booking Request
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 18. MEMBERSHIP JOINING PLAN MODAL */}
      {joiningPlan && (
        <div 
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fadein"
          onClick={() => setJoiningPlan(null)}
        >
          <div 
            className="glass-card max-w-md w-full p-8 rounded-2xl border border-white/10 relative pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              id="plan-modal-close"
              onClick={() => setJoiningPlan(null)}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white rounded-full hover:bg-zinc-805 bg-zinc-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-titan-orange/10 border border-titan-orange/20 rounded-xl">
                  <Check className="w-6 h-6 text-titan-orange" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-lg uppercase">{joiningPlan} Setup</h4>
                  <p className="text-xs text-zinc-400">Lock down current promoted subscription rate</p>
                </div>
              </div>

              <form onSubmit={handleJoinPlanSubmit} className="space-y-4 pt-2">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Your Full Name</label>
                  <input required type="text" className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" placeholder="e.g. Sahil Kulkarni" />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Mobile Phone Numbers</label>
                  <input required type="tel" className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" placeholder="e.g. +91 99999 11111" />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Coupon Promo Codes (Optional)</label>
                  <input type="text" className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white uppercase" placeholder="e.g. TITAN35" defaultValue="TITAN35" />
                </div>

                <div className="p-3 bg-zinc-950 border border-white/5 rounded-xl space-y-1">
                  <span className="block text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Setup Note</span>
                  <p className="text-[10px] text-zinc-500 leading-normal">
                    You'll complete checkout at the reception desk during physical check-in. This holds your 35% tier discount spot securely.
                  </p>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3 bg-gradient-to-r from-titan-red to-titan-orange text-white font-display text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                >
                  Hold discount spot
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
