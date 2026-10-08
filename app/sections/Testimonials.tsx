"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote: "What Aarav and Anuj have built is not just a science project — it's a prototype for the future of agriculture. The level of systems integration they achieved is what I'd expect from a startup, not a school exhibition.",
    name: "Dr. Rajesh Kumar",
    role: "Head of Computer Science",
    organization: "Delhi Public School",
    rating: 5,
  },
  {
    quote: "I watched them debug a firmware issue for three hours straight at the exhibition. Their persistence and technical depth — from KiCad PCB design to TensorFlow Lite — is genuinely remarkable for their age.",
    name: "Priya Sharma",
    role: "STEM Coordinator",
    organization: "National Science Foundation",
    rating: 5,
  },
  {
    quote: "The WhatsApp integration was the moment every judge's jaw dropped. They built something that actually solves a real problem — water waste in agriculture — using technology that's accessible anywhere.",
    name: "Vikram Singh",
    role: "IoT Engineer",
    organization: "Tech Innovation Lab",
    rating: 5,
  },
  {
    quote: "Project Verde demonstrates what's possible when you combine deep hardware knowledge with modern cloud architecture. The plant disease detection model alone is exhibition-worthy.",
    name: "Prof. Anita Verma",
    role: "Engineering Mentor",
    organization: "IIT Delhi Outreach",
    rating: 4,
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  const t = testimonials[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="relative z-10 py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="section-label">{'// MENTOR VOICES'}</span>
          <h2 className="section-heading text-center">
            WHAT THEY{" "}
            <span className="text-primary text-neon italic">SAY.</span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="glass p-8 md:p-10 rounded-3xl border border-white/5 relative"
            >
              <Quote
                size={32}
                className="absolute top-4 left-4 text-primary/10"
              />

              <div className="mb-6">
                <p className="text-lg md:text-xl text-slate-200 leading-relaxed italic font-medium">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-primary font-bold font-heading text-lg">
                      {t.name}
                    </span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className={i < t.rating ? "text-yellow-500" : "text-white/10"}
                          fill={i < t.rating ? "#eab308" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs font-mono text-white/40">
                    {t.role} &middot; {t.organization}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-white/10 text-white/40 hover:text-primary hover:border-primary/40 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-primary w-6"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full border border-white/10 text-white/40 hover:text-primary hover:border-primary/40 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
