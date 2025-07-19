"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";

const features = [
  {
    title: "Real Mentors, Real Guidance",
    description:
      "Get direct access to mentors who've walked the path before you.",
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2940&auto=format&fit=crop",
    gradient: "from-blue-400/20 to-cyan-400/20"
  },
  {
    title: "Growth & Career Readiness",
    description:
      "Gain the confidence to excel academically and prepare for your career.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2835&auto=format&fit=crop",
    gradient: "from-green-400/20 to-emerald-400/20"
  },
  {
    title: "Insights-Driven Support",
    description:
      "Get actionable feedback to make every session impactful.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    gradient: "from-yellow-400/20 to-orange-400/20"
  },
  {
    title: "Personalized Learning",
    description:
      "We tailor the mentorship experience to fit each student's unique goals, learning style, and pace.",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2940&auto=format&fit=crop",
    gradient: "from-purple-400/20 to-pink-400/20"
  },
];

export default function StudentFeatures() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Get visible cards in order
  const getVisibleCards = () => {
    const ordered = [];
    for (let i = 0; i < features.length; i++) {
      ordered.push(features[(currentIndex + i) % features.length]);
    }
    return ordered;
  };

  const visible = getVisibleCards();

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 to-blue-50/30 py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            What's in it for Students?
          </h2>
          <p className="max-w-2xl mx-auto mt-6 text-slate-600 text-base md:text-lg lg:text-xl">
            EduVibe is a student-mentor platform designed to personalize learning journeys.
          </p>
        </div>

        <div className="relative flex justify-center items-center">
          <div className="flex gap-4 md:gap-6 w-full justify-center items-center max-w-7xl">
            {visible.map((feature, idx) => (
              <motion.div
                key={`${feature.title}-${currentIndex}`}
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  scale: idx === 0 ? 1 : 0.85,
                  y: idx === 0 ? 0 : 20
                }}
                exit={{ opacity: 0, x: -100, scale: 0.8 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: idx * 0.1
                }}
                className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  idx === 0 
                    ? "w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px]" 
                    : "w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px]"
                } flex-shrink-0`}
              >
                {/* Background Image */}
                <div 
                  className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${feature.image})`,
                  }}
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent`} />
                  
                  {/* Colored Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}`} />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                  <motion.h3 
                    className={`font-bold mb-2 ${
                      idx === 0 
                        ? "text-xl sm:text-2xl md:text-3xl lg:text-4xl" 
                        : "text-sm sm:text-base md:text-lg lg:text-xl"
                    }`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                  >
                    {feature.title}
                  </motion.h3>
                  
                  {idx === 0 && (
                    <motion.p 
                      className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {feature.description}
                    </motion.p>
                  )}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {features.map((_, idx) => (
            <Button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? "bg-slate-800 w-8" 
                  : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}