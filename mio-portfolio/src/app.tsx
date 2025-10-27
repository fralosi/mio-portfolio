import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
// Importa l'hook useGSAP!
import { useGSAP } from '@gsap/react';

// --- DATI DEI PROGETTI (che erano nell'HTML) ---
// (In futuro, questo arriverà da un file .json)
const projectsData = [
  {
    id: '1',
    title: 'Progetto Uno',
    description: 'Breve descrizione di questo fantastico progetto di design e sviluppo.',
    imageUrl: 'https://placehold.co/600x400/1A1D2E/C8FF00?text=Progetto+Uno',
    tags: ['React', 'GSAP', 'Tailwind'],
  },
  {
    id: '2',
    title: 'Progetto Due',
    description: 'Un\'identità visiva e un sito web per un brand emergente.',
    imageUrl: 'https://placehold.co/600x400/E07A5F/F5F0E6?text=Progetto+Due',
    tags: ['TypeScript', 'Figma'],
  },
  {
    id: '3',
    title: 'Progetto Tre',
    description: 'Applicazione mobile complessa con un focus sulla user experience.',
    imageUrl: 'https://placehold.co/600x400/00A3FF/111111?text=Progetto+Tre',
    tags: ['React Native', 'UX/UI'],
  },
];

// --- 1. COMPONENTE NAVBAR ---
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full p-6 lg:p-10 z-50">
      <nav className="flex justify-between items-center">
        <a href="/" className="font-serif text-2xl font-bold">[Logo]</a>
        <div className="hidden md:flex space-x-8">
          <a href="#about" className="hover:text-brand-accent transition-colors">About</a>
          <a href="#projects" className="hover:text-brand-accent transition-colors">Progetti</a>
          <a href="#contact" className="hover:text-brand-accent transition-colors">Contatti</a>
        </div>
        <button 
          className="md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          Menu
        </button>
      </nav>
      {/* TODO: Creare il menu mobile a tendina quando 'isMobileMenuOpen' è true */}
    </header>
  );
}

// --- 2. COMPONENTE HERO ---
function Hero() {
  const heroRef = useRef(null);

  // Animazione GSAP per l'Hero
  useGSAP(() => {
    // Inizializza gli elementi (prima che l'animazione parta)
    gsap.set('.hero-line', { opacity: 0, y: 50 });
    gsap.set('.hero-visual', { opacity: 0 });

    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });
    
    heroTl.to('.hero-line', {
      opacity: 1,
      y: 0,
      stagger: 0.15,
    }, 0.5) // Inizia dopo 0.5s
    .to('.hero-visual', {
      opacity: 1,
      x: 0,
      y: 0,
      stagger: 0.1,
      duration: 1,
    }, 1); // Inizia dopo 1s

  }, { scope: heroRef }); // 'scope' dice a GSAP di animare solo gli elementi dentro 'heroRef'

  return (
    <section ref={heroRef} id="home" className="min-h-screen flex items-center p-6 lg:p-10 pt-32 lg:pt-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          {/* Colonna Testo */}
          <div className="text-left">
            <h1 className="hero-line font-serif text-6xl md:text-8xl lg:text-9xl font-black">
              Design
            </h1>
            <h1 className="hero-line font-serif text-6xl md:text-8xl lg:text-9xl font-black md:pl-20">
              Creativo &
            </h1>
            <h1 className="hero-line font-serif text-6xl md:text-8xl lg:text-9xl font-black">
              Sviluppo
            </h1>
            <p className="hero-line subtitle max-w-md md:ml-20 mt-8 text-lg text-neutral-300">
              Ciao, sono [Il Tuo Nome]. Trasformo idee complesse in esperienze digitali eleganti e performanti.
            </p>
            <a href="#projects" className="hero-line cta-button inline-block mt-10 md:ml-20 bg-brand-accent text-white py-3 px-8 rounded-full font-bold uppercase tracking-wider hover:bg-blue-400 transition-colors">
              Vedi i miei lavori
            </a>
          </div>
          {/* Colonna Visual */}
          <div className="hidden md:block relative h-[500px]">
            <div 
              className="hero-visual absolute top-0 left-0 w-3/4 h-3/4 bg-neutral-800 rounded-lg" 
              style={{ transform: 'rotate(-10deg) translateX(-20px)' }}
            ></div>
            <div 
              className="hero-visual absolute bottom-0 right-0 w-1/2 h-1/2 bg-brand-accent rounded-lg" 
              style={{ transform: 'rotate(5deg) translateY(20px)' }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- 3. COMPONENTE PROJECT CARD (SOTTO-COMPONENTE) ---
// Definiamo i "tipi" di props per TypeScript
type ProjectCardProps = {
  project: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
  };
};

function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // --- Animazione Hover (con useGSAP) ---
  useGSAP(() => {
    if (!cardRef.current) return;
    
    const img = cardRef.current.querySelector('img');
    const cardContent = cardRef.current.querySelector('.card-content');
    
    const tl = gsap.timeline({ paused: true, defaults: { duration: 0.3, ease: 'power1.out' } });
    tl.to(img, { scale: 1.05 })
      .to(cardContent, { y: -5 }, 0); // Muovi l'intera card

    cardRef.current.addEventListener('mouseenter', () => tl.play());
    cardRef.current.addEventListener('mouseleave', () => tl.reverse());

    // Cleanup (importante per React)
    return () => {
      cardRef.current?.removeEventListener('mouseenter', () => tl.play());
      cardRef.current?.removeEventListener('mouseleave', () => tl.reverse());
    };

  }, { scope: cardRef });

  // --- Animazione ScrollTrigger (con useGSAP) ---
  useGSAP(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  }, { scope: cardRef });

  return (
    // 'ref' collega il DOM a React
    // 'opacity-0' è importante per l'animazione ScrollTrigger
    <div ref={cardRef} className="project-card opacity-0">
      <div className="card-content bg-neutral-800 rounded-lg overflow-hidden shadow-lg cursor-pointer">
        <div className="overflow-hidden h-80">
          <img 
            src={project.imageUrl} 
            alt={`Immagine ${project.title}`}
            className="w-full h-full object-cover transition-transform duration-300 ease-out"
          />
        </div>
        <div className="p-6">
          <h3 className="font-serif text-2xl font-bold mb-2">{project.title}</h3>
          <p className="text-neutral-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 4. COMPONENTE PROJECT GRID ---
function ProjectGrid() {
  const gridRef = useRef(null);

  // Animazione Titolo Sezione
  useGSAP(() => {
    gsap.from('.section-title', {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: '.section-title',
        start: 'top 90%',
      }
    });
  }, { scope: gridRef });

  return (
    <section ref={gridRef} id="projects" className="py-20 lg:py-32 p-6 lg:p-10">
      <div className="container mx-auto">
        <h2 className="section-title text-5xl md:text-7xl font-serif font-bold mb-16 text-center">
          Progetti Recenti
        </h2>
        
        <div className="project-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Questo è il "loop" di React. 
            Prende i dati e crea una card per ogni progetto.
          */}
          {projectsData.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
      {/* NOTA: L'animazione GSAP Flip per il modale è complessa.
        La implementeremo nel prossimo step.
      */}
    </section>
  );
}


// --- 5. COMPONENTE PRINCIPALE APP ---
// Questo è il componente che 'main.tsx' importa
function App() {
  return (
    // <> (React Fragment) ci permette di raggruppare gli elementi
    <>
      <Navbar />
      <main>
        <Hero />
        <ProjectGrid />
        {/* Qui andranno le altre sezioni (About, Contact, etc.) */}
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default App;
