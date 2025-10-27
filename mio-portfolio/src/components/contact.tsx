import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export function Contact() {
  const contactRef = useRef(null);

  // Semplice animazione di entrata per il form
  useGSAP(() => {
    gsap.from('.form-element', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: contactRef.current,
        start: 'top 80%',
      }
    });
  }, { scope: contactRef });

  // Gestore per l'invio (per ora, impedisce solo il ricaricamento)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Qui potresti aggiungere la logica per inviare il form
    // (es. Netlify Forms, Formspree, o un tuo endpoint)
    alert('Grazie per il tuo messaggio! (Questo è solo un test)');
  };

  return (
    <section ref={contactRef} id="contact" className="py-20 lg:py-32 p-6 lg:p-10">
      <div className="container mx-auto max-w-3xl text-center">
        
        <h2 className="form-element section-title text-5xl md:text-7xl font-serif font-bold mb-8">
          Contattami
        </h2>
        <p className="form-element text-lg text-neutral-300 leading-relaxed mb-12">
          Hai un progetto in mente o vuoi semplicemente salutarmi? 
          Inviami un messaggio.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="form-element">
            <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">Nome</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              required
              className="form-input"
              placeholder="Il tuo nome"
            />
          </div>
          <div className="form-element">
            <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              required
              className="form-input"
              placeholder="latua@email.com"
            />
          </div>
          <div className="form-element">
            <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">Messaggio</label>
            <textarea 
              id="message" 
              name="message"
              rows={5}
              required
              className="form-input"
              placeholder="Ciao, ti contatto per..."
            ></textarea>
          </div>
          <div className="form-element text-center">
            <button 
              type="submit" 
              className="cta-button bg-brand-accent text-white py-3 px-12 rounded-full font-bold uppercase tracking-wider hover:bg-blue-400 transition-colors"
            >
              Invia Messaggio
            </button>
          </div>
        </form>

        {/* Aggiungiamo anche i link social */}
        <div className="form-element mt-16">
          <p className="text-neutral-400 mb-4">Oppure trovami qui:</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-2xl hover:text-brand-accent transition-colors">LinkedIn</a>
            <a href="#" className="text-2xl hover:text-brand-accent transition-colors">GitHub</a>
            <a href="#" className="text-2xl hover:text-brand-accent transition-colors">Dribbble</a>
          </div>
        </div>

      </div>
    </section>
  );
}
