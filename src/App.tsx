import React, { useState } from 'react';
import { 
  BookOpen, 
  Zap, 
  Target, 
  Calendar, 
  HelpCircle, 
  ChevronDown, 
  Loader2, 
  Sparkles,
  CheckCircle2,
  BarChart3,
  BrainCircuit,
  Clock,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { analyzePaper, AnalysisRequest } from './services/aiService';
import { cn } from './lib/utils';

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <BookOpen className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight">Paper<span className="text-accent">Kode</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#features" className="hover:text-accent transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-accent transition-colors">How it Works</a>
          <a href="#analyzer" className="hover:text-accent transition-colors">Analyzer</a>
          <button className="bg-accent hover:bg-accent/90 text-white px-5 py-2 rounded-full transition-all glow-button">
            Get Started
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="pt-32 pb-20 px-4 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
    </div>
    
    <div className="max-w-5xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-6">
          AI-Powered Exam Intelligence
        </span>
        <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-tight">
          Master Your CBSE Exams with <span className="text-accent">AI Precision</span>
        </h1>
        <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
          Analyze 15+ years of papers, predict 2025 trends, and get personalized study plans in seconds. Built specifically for Classes 9–12.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#analyzer" className="w-full sm:w-auto bg-accent text-white px-8 py-4 rounded-full font-bold text-lg glow-button flex items-center justify-center gap-2">
            Start Analyzing <ArrowRight className="w-5 h-5" />
          </a>
          <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-lg transition-all">
            View Sample Report
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const StatsBar = () => (
  <div className="bg-white/5 border-y border-white/5 py-10">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { label: "Years Analyzed", value: "15+" },
        { label: "Subjects Covered", value: "15" },
        { label: "Cost to Students", value: "₹0" },
        { label: "Success Rate", value: "98%" },
      ].map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-3xl md:text-4xl font-display font-bold text-accent mb-1">{stat.value}</div>
          <div className="text-sm text-white/40 uppercase tracking-widest font-bold">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="glass-card p-8 hover:border-accent/30 transition-all group">
    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon className="text-accent w-6 h-6" />
    </div>
    <h3 className="text-xl font-display font-bold mb-3">{title}</h3>
    <p className="text-white/50 leading-relaxed">{description}</p>
  </div>
);

const Features = () => (
  <section id="features" className="py-24 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Why PaperKode?</h2>
        <p className="text-white/50 max-w-xl mx-auto">We combine advanced AI with decades of CBSE paper data to give you an unfair advantage.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={BarChart3} 
          title="Topic Frequency" 
          description="Instantly see which chapters have appeared most in the last 15 years. Focus your energy where it matters."
        />
        <FeatureCard 
          icon={Target} 
          title="2025 Predictions" 
          description="Our AI identifies emerging patterns to predict high-probability questions for the upcoming board exams."
        />
        <FeatureCard 
          icon={BrainCircuit} 
          title="Smart Practice" 
          description="Generate questions that mirror the actual exam difficulty and style, including MCQs and case-based studies."
        />
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 px-4 bg-white/[0.02]">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">How it Works</h2>
          <div className="space-y-8">
            {[
              { step: "01", title: "Select Your Details", desc: "Choose your class, subject, and the depth of historical data you want to analyze." },
              { step: "02", title: "Choose Analysis Mode", desc: "Pick from Topic Frequency, Predictions, Study Plans, or Practice Questions." },
              { step: "03", title: "Get AI Insights", desc: "Our Gemini-powered engine processes the data and generates a comprehensive report." },
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="text-4xl font-display font-black text-white/10">{item.step}</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-white/50">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square glass-card flex items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-accent/5 animate-pulse" />
            <div className="relative z-10 text-center">
              <div className="w-24 h-24 bg-accent rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(108,99,255,0.3)]">
                <Sparkles className="text-white w-12 h-12" />
              </div>
              <p className="text-lg font-medium text-white/80">AI Engine Processing...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 px-4 border-t border-white/5 bg-background">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
          <BookOpen className="text-white w-4 h-4" />
        </div>
        <span className="text-lg font-display font-bold tracking-tight">PaperKode</span>
      </div>
      <div className="text-white/40 text-sm">
        © 2026 PaperKode. Built for CBSE Students.
      </div>
      <div className="flex gap-6 text-white/60 text-sm">
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Contact</a>
      </div>
    </div>
  </footer>
);

// --- Main App Component ---

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<AnalysisRequest>({
    classLevel: '10',
    subject: 'Maths',
    years: '10',
    mode: 'Topic Frequency',
    extraQuery: ''
  });

  const classes = ['9', '10', '11', '12'];
  const subjects = [
    'Maths', 'Science', 'Physics', 'Chemistry', 'Biology', 
    'English', 'Hindi', 'Social Science', 'Economics', 
    'Accountancy', 'Business Studies', 'Computer Science'
  ];
  const yearsOptions = ['5', '10', '15'];
  const modes = [
    { id: 'Topic Frequency', icon: BarChart3, label: 'Topic Frequency', color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { id: 'Predict 2025', icon: Target, label: 'Predict 2025', color: 'text-accent', bg: 'bg-accent/10' },
    { id: 'Study Plan', icon: Calendar, label: 'Study Plan', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { id: 'Practice Questions', icon: HelpCircle, label: 'Practice Questions', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await analyzePaper(formData);
      setResult(response || "No analysis generated.");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <StatsBar />
      
      <section id="analyzer" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">AI Paper Analyzer</h2>
            <p className="text-white/50">Select your parameters and let the AI do the heavy lifting.</p>
          </div>

          <div className="glass-card p-6 md:p-10 shadow-2xl">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Class</label>
                <div className="relative">
                  <select 
                    value={formData.classLevel}
                    onChange={(e) => setFormData({...formData, classLevel: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-accent transition-all"
                  >
                    {classes.map(c => <option key={c} value={c} className="bg-background">Class {c}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Subject</label>
                <div className="relative">
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-accent transition-all"
                  >
                    {subjects.map(s => <option key={s} value={s} className="bg-background">{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Years to Analyze</label>
                <div className="relative">
                  <select 
                    value={formData.years}
                    onChange={(e) => setFormData({...formData, years: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-accent transition-all"
                  >
                    {yearsOptions.map(y => <option key={y} value={y} className="bg-background">{y} Years</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1 mb-3 block">Select Analysis Mode</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {modes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setFormData({...formData, mode: mode.id})}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-2xl border transition-all gap-3",
                      formData.mode === mode.id 
                        ? "bg-accent/10 border-accent shadow-[0_0_20px_rgba(108,99,255,0.1)]" 
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    )}
                  >
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", mode.bg)}>
                      <mode.icon className={cn("w-5 h-5", mode.color)} />
                    </div>
                    <span className="text-xs font-bold text-center leading-tight">{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 mb-8">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Ask anything extra (Optional)</label>
              <textarea 
                placeholder="e.g. Focus on Calculus, or explain in simple terms..."
                value={formData.extraQuery}
                onChange={(e) => setFormData({...formData, extraQuery: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-all min-h-[100px] resize-none"
              />
            </div>

            <button 
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-accent text-white py-5 rounded-2xl font-bold text-xl glow-button flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Analyzing Papers...
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6 fill-current" />
                  Analyze Now
                </>
              )}
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center font-medium"
              >
                {error}
              </motion.div>
            )}

            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-accent w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-display font-bold">Analysis Result</h3>
                </div>
                <div className="glass-card p-8 md:p-10 prose prose-invert max-w-none prose-headings:font-display prose-headings:text-accent prose-p:text-white/70 prose-li:text-white/70">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
                <div className="mt-8 flex justify-center">
                  <button 
                    onClick={() => window.print()}
                    className="text-white/40 hover:text-white flex items-center gap-2 text-sm font-bold transition-colors"
                  >
                    <Clock className="w-4 h-4" /> Save as PDF for later
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
}
