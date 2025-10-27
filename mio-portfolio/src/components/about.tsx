import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Ci serve ScrollTrigger per le animazioni

// Dati per le competenze
const skills = [
  { name: 'React & TypeScript', level: 90 },
  { name: 'GSAP Animation', level: 80 },
  { name: 'Tailwind CSS', level: 95 },
  { name: 'UI/UX Design (Figma)', level: 75 },
  { name: 'Node.js & Backend', level: 60 },
];

export function About() {
  const aboutRef = useRef(null);

  useGSAP(() => {
    // Animiamo il titolo e il paragrafo
    gsap.from('.about-content', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: aboutRef.current,
        start: 'top 80%',
      }
    });

    // Animiamo le barre delle competenze
    gsap.from('.skill-bar-inner', {
      scaleX: 0,
      duration: 1.5,
      ease: 'power3.out',
      stagger: 0.1,
      transformOrigin: 'left',
      scrollTrigger: {
        trigger: '.skills-list',
        start: 'top 85%',
      }
    });

  }, { scope: aboutRef });

  return (
    <section ref={aboutRef} id="about" className="py-20 lg:py-32 p-6 lg:p-10 bg-neutral-800">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Colonna 1: Testo Bio */}
          <div>
            <h2 className="about-content section-title text-5xl md:text-7xl font-serif font-bold mb-8">
              Chi Sono
            </h2>
            <p className="about-content text-lg text-neutral-300 leading-relaxed mb-6">
              Sono un designer e sviluppatore creativo con sede in Italia. La mia passione è costruire esperienze digitali uniche che non siano solo funzionali, ma anche belle da vedere e divertenti da usare.
            </p>
            <p className="about-content text-lg text-neutral-300 leading-relaxed">
              Con un background in [Tua Laurea/Campo] e diversi anni di esperienza come freelance, ho affinato la mia capacità di trasformare idee complesse in interfacce pulite e animate.
            </p>
          </div>

          {/* Colonna 2: Competenze */}
          <div className="skills-list">
            <h3 className="about-content text-3xl font-serif font-bold mb-6">Le mie Competenze</h3>
            <div className="space-y-5">
              {skills.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-neutral-200">{skill.name}</span>
                    <span className="text-sm text-neutral-400">{skill.level}%</span>
                  </div>
                  <div className="skill-bar w-full bg-neutral-700 rounded-full h-3">
                    <div 
                      className="skill-bar-inner bg-brand-accent h-3 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
