import React, { useRef, useState } from 'react';
import { Flip } from 'gsap/Flip';

// Importiamo i nostri componenti
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { ProjectModal } from './components/ProjectModal';
import { About } from './components/About'; // NUOVO
import { Contact } from './components/Contact'; // NUOVO
import { Footer } from './components/Footer'; // NUOVO
import { Project } from './types/Project';

function App() {
  const appRef = useRef(null);
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Funzione APERTURA modale
  const handleProjectClick = (project: Project) => {
    // 1. Salva lo stato (posizione della card)
    const card = appRef.current.querySelector(`[data-flip-id="project-${project.id}"]`);
    const state = Flip.getState(card, { props: "borderRadius, boxShadow" });

    // 2. Aggiorna lo stato React (fa apparire il modale)
    setSelectedProject(project);

    // 3. Esegui animazione GSAP Flip
    setTimeout(() => {
      const modal = appRef.current.querySelector(`[data-flip-id="project-${project.id}"]`);
      Flip.from(state, {
        target: modal,
        duration: 0.6,
        ease: 'power3.inOut',
        props: "borderRadius, boxShadow",
        onStart: () => {
          // Blocca lo scroll del body
          document.body.classList.add('overflow-hidden');
        }
      });
    }, 50); // 50ms di ritardo per React
  };

  // Funzione CHIUSURA modale
  const handleCloseModal = () => {
    if (!selectedProject) return;

    // 1. Salva lo stato (posizione del modale)
    const modal = appRef.current.querySelector(`[data-flip-id="project-${selectedProject.id}"]`);
    const state = Flip.getState(modal, { props: "borderRadius, boxShadow" });
    
    // 2. Trova la card di destinazione (che è nascosta)
    const card = appRef.current.querySelector(`[data-flip-id="project-${selectedProject.id}"]`);

    // 3. Esegui animazione Flip (all'indietro)
    Flip.to(state, {
      target: card,
      duration: 0.6,
      ease: 'power3.inOut',
      props: "borderRadius, boxShadow",
      onComplete: () => {
        // 4. Solo alla fine, rimuovi il modale e sblocca lo scroll
        setSelectedProject(null);
        document.body.classList.remove('overflow-hidden');
      }
    });
  };

  return (
    // 'ref' serve a GSAP per sapere dove cercare gli elementi
    <div ref={appRef}> 
      <Navbar />
      <main>
        <Hero />
        <ProjectGrid 
          onProjectClick={handleProjectClick} 
          selectedProjectId={selectedProject?.id || null} 
        />
        <About /> {/* Sezione "Chi Sono" */}
        <Contact /> {/* Sezione "Contatti" */}
      </main>
      <Footer /> {/* Footer */}
      
      {/* Il modale viene renderizzato solo se 'selectedProject' non è nullo */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={handleCloseModal} // Usa la funzione animata per chiudere
        />
      )}
    </div>
  );
}

export default App;

