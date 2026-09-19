import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck, TrendingUp, PieChart, Landmark, Umbrella, Globe2,
  Check, ArrowRight, Facebook, Twitter, Linkedin, Instagram, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";

const SERVICES = [
  { icon: TrendingUp, title: "Wealth Management", desc: "Bespoke strategies that preserve and grow capital across market cycles." },
  { icon: PieChart, title: "Investment Advisory", desc: "Research-driven guidance from seasoned advisors with global reach." },
  { icon: ShieldCheck, title: "Portfolio Optimization", desc: "Continuous rebalancing aligned to your risk profile and objectives." },
  { icon: Landmark, title: "Retirement Planning", desc: "Structured income planning for a confident, lasting retirement." },
  { icon: Umbrella, title: "Asset Protection", desc: "Defensive structures that shield wealth from volatility and risk." },
  { icon: Globe2, title: "Global Investment Solutions", desc: "Borderless access to institutional-grade opportunities worldwide." },
];

const WHY = [
  "Trust & Transparency",
  "Experienced Advisors with 20+ Years Combined Experience",
  "Global Reach & Local Expertise",
  "Personalized Solutions for Every Client",
  "Cutting-Edge Technology & Analytics",
  "24/7 Client Support",
];

const TESTIMONIALS = [
  { quote: "GlobalFinancialReserve has transformed my approach to wealth management. Their expertise and personalized service have given me confidence in my financial future.", name: "Jonathan Pierce", role: "Retired Entrepreneur", avatar: "https://media.base44.com/images/public/6aa18fbffd504fdb48d4b37a/2f3268c39_generated_image.png" },
  { quote: "The team at GlobalFinancialReserve provides exceptional service and strategic insights that have significantly grown my portfolio.", name: "Margaret Whitfield", role: "Family Office Principal", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" },
  { quote: "I trust GlobalFinancialReserve with my family's financial legacy. Their integrity and professionalism are unmatched.", name: "David Okonkwo", role: "Tech Founder", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
];

const HERO_IMG = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80";
const PORTFOLIO_IMG = "https://media.base44.com/images/public/6aa18fbffd504fdb48d4b37a/8def01b9e_generated_image.png";
const ABOUT_IMG = "https://media.base44.com/images/public/6aa18fbffd504fdb48d4b37a/8122fb83a_generated_image.png";
const ADVISOR_IMG = "https://media.base44.com/images/public/6aa18fbffd504fdb48d4b37a/354522323_generated_image.png";

export default function Landing() {
  const [activeT, setActiveT] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center shadow-md">
              <span className="font-display text-white text-lg font-bold">G</span>
            </div>
            <div className="leading-tight">
              <div className="font-display text-slate-900 text-sm font-semibold tracking-wide">GlobalFinancialReserve</div>
              <div className="text-slate-400 text-[10px] tracking-[0.2em] uppercase">Wealth Management</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-blue-700">About</a>
            <a href="#services" className="hover:text-blue-700">Services</a>
            <a href="#why" className="hover:text-blue-700">Why Us</a>
            <a href="#testimonials" className="hover:text-blue-700">Testimonials</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/signin"><Button size="sm">Sign In</Button></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="h-full w-full object-cover opacity-[0.06]" />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-medium text-blue-700 mb-6">
              <ShieldCheck className="h-3.5 w-3.5" /> Trusted Wealth Management Since 2003
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] font-bold text-slate-900 text-balance">
              Securing Tomorrow's <span className="text-blue-700">Wealth</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
              GlobalFinancialReserve is a premier financial management and investment advisory firm dedicated to helping individuals and institutions achieve their long-term financial goals through strategic wealth management and personalized investment solutions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/signin">
                <Button size="lg" className="gap-2">Get Started <ArrowRight className="h-4 w-4" /></Button>
              </Link>
              <a href="#about">
                <Button size="lg" variant="outline">Learn More</Button>
              </a>
            </div>
            <div className="mt-10 flex items-center gap-8 text-sm text-slate-500">
              <div><span className="text-2xl font-bold text-slate-900 block">$4.2B</span>Assets Guided</div>
              <div className="h-8 w-px bg-slate-200" />
              <div><span className="text-2xl font-bold text-slate-900 block">12K+</span>Clients Served</div>
              <div className="h-8 w-px bg-slate-200" />
              <div><span className="text-2xl font-bold text-slate-900 block">20+</span>Years Experience</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-blue-200/30 blur-3xl rounded-full" />
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-elev-lg">
              <Image src={PORTFOLIO_IMG} alt="Financial markets trading dashboard" className="w-full h-[420px]" fittingType="fill" />
              <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur text-emerald-700 px-2.5 py-1 text-xs font-semibold shadow">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Markets
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-elev">
            <Image src={ABOUT_IMG} alt="Advisors celebrating a successful investment" className="w-full h-[340px]" fittingType="fill" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 to-transparent" />
            <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 backdrop-blur px-3 py-2 shadow">
              <div className="text-xs font-semibold text-slate-900">20+ Years of Excellence</div>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-blue-700 uppercase tracking-[0.2em] mb-3">About Us</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-6">About GlobalFinancialReserve</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Founded with a vision to democratize wealth management, GlobalFinancialReserve combines decades of financial expertise with cutting-edge technology. We provide comprehensive financial planning, portfolio optimization, and investment advisory services to clients worldwide. Our commitment to transparency, integrity, and client-first approach has made us a trusted partner in wealth management.
            </p>
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> SEC-Registered Advisory</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Fiduciary Standard</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold text-blue-700 uppercase tracking-[0.2em] mb-3">Our Services</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">Comprehensive Wealth Solutions</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="group rounded-2xl bg-white border border-slate-200 p-6 hover:border-blue-200 hover:shadow-elev transition-all">
                  <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why" className="py-16 lg:py-24 bg-sovereign text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 mb-6">
              <Image src={ADVISOR_IMG} alt="Global market access investment charts" className="w-full h-56" fittingType="fill" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <div className="text-sm font-semibold text-white">Global Market Access</div>
                <div className="text-xs text-blue-200/80">Institutional-grade opportunities</div>
              </div>
            </div>
            <div className="text-xs font-semibold text-blue-300 uppercase tracking-[0.2em] mb-3">Why Choose Us</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">A Partner You Can Trust</h2>
            <p className="text-blue-100/80 leading-relaxed mb-8">
              Our clients choose GlobalFinancialReserve for one reason above all: confidence. Confidence that their wealth is managed with integrity, expertise, and an unwavering focus on their long-term success.
            </p>
            <Link to="/signin">
              <Button size="lg" className="gap-2">Become a Client <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {WHY.map((w) => (
              <div key={w} className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-sm text-blue-50/90 font-medium">{w}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-[0.2em] mb-3">Client Remarks</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-10">What Our Clients Say</h2>
          <div className="relative rounded-2xl bg-white border border-slate-200 shadow-elev p-8 sm:p-12">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
            </div>
            <blockquote className="text-xl sm:text-2xl text-slate-700 font-medium leading-relaxed text-balance">
              "{TESTIMONIALS[activeT].quote}"
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-3">
              <img src={TESTIMONIALS[activeT].avatar} alt={TESTIMONIALS[activeT].name} className="h-12 w-12 rounded-full object-cover border-2 border-blue-100" />
              <div className="text-left">
                <div className="text-sm font-semibold text-slate-900">{TESTIMONIALS[activeT].name}</div>
                <div className="text-xs text-slate-500">{TESTIMONIALS[activeT].role}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveT(i)}
                className={`h-2 rounded-full transition-all ${i === activeT ? "w-8 bg-blue-600" : "w-2 bg-slate-300"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sovereign text-blue-100/70 pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-800 flex items-center justify-center">
                  <span className="font-display text-white text-lg font-bold">G</span>
                </div>
                <span className="font-display text-white text-base font-semibold">GlobalFinancialReserve</span>
              </div>
              <p className="text-sm leading-relaxed max-w-md">
                Empowering financial futures through trusted investment solutions and personalized wealth management.
              </p>
              <div className="flex gap-3 mt-5">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-colors">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#about" className="hover:text-white">About Us</a></li>
                <li><a href="#services" className="hover:text-white">Services</a></li>
                <li><a href="#why" className="hover:text-white">Why Choose Us</a></li>
                <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Legal</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-xs leading-relaxed text-blue-200/60">
            <span className="flex items-center gap-1.5 font-semibold text-blue-100/80 mb-1.5"><ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Private & Secure Platform</span>
            GlobalFinancialReserve is a private investment platform restricted exclusively to authorized clients with an active account. Access is protected by multi-step verification and industry-grade encryption to safeguard your financial information.
          </div>
          <div className="text-center text-xs text-blue-200/50 mt-6">
            © 2026 GlobalFinancialReserve. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}