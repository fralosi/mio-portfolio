import React, { useRef, useState } from 'react';
import { Flip } from 'gsap/Flip'; // Flip è ancora necessario qui per la logica

// Importiamo i nostri nuovi componenti
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { ProjectModal } from './components/ProjectModal';
import { Project } from './types/Project'; // Importiamo il tipo

function App() {
  const appRef = useRef(null);
  
  // Lo stato e la logica di Flip rimangono qui,
  // perché 'App' controlla sia la Griglia che il Modale.
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Questa funzione gestisce l'APERTURA del modale
  const handleProjectClick = (project: Project) => {
    // 1. Salva lo stato attuale (posizione della Card)
    // Selezioniamo solo la card con l'ID giusto
    const card = appRef.current.querySelector(`[data-flip-id="project-${project.id}"]`);
    const state = Flip.getState(card, { props: "borderRadius, boxShadow" });

    // 2. Aggiorna lo stato di React. Questo farà APPARIRE il modale
    setSelectedProject(project);

    // 3. Esegui l'animazione GSAP Flip
    // (Usiamo un piccolo timeout per essere sicuri che React abbia renderizzato il modale)
    setTimeout(() => {
      // Troviamo il modale appena apparso
      const modal = appRef.current.querySelector(`[data-flip-id="project-${project.id}"]`);
      
      Flip.from(state, {
        target: modal,
        duration: 0.6,
        ease: 'power3.inOut',
        props: "borderRadius, boxShadow", // Anima queste proprietà CSS
        onStart: () => {
          // Aggiungiamo una classe per bloccare lo scroll del body
          document.body.classList.add('overflow-hidden');
        }
      });
    }, 50); // 50ms di ritardo
  };

  // Questa funzione gestisce la CHIUSURA del modale
  const handleCloseModal = () => {
    if (!selectedProject) return;

    // 1. Salva lo stato attuale (posizione del Modale)
    const modal = appRef.current.querySelector(`[data-flip-id="project-${selectedProject.id}"]`);
    const state = Flip.getState(modal, { props: "borderRadius, boxShadow" });

    // 2. Trova la card (che è nascosta)
    const card = appRef.current.querySelector(`[data-flip-id="project-${selectedProject.id}"]`);

    // 3. Esegui l'animazione GSAP Flip (all'indietro)
    Flip.to(state, {
      target: card,
      duration: 0.6,
      ease: 'power3.inOut',
      props: "borderRadius, boxShadow",
      onComplete: () => {
        // 4. SOLO ALLA FINE, aggiorna lo stato di React per RIMUOVERE il modale
        setSelectedProject(null);
        // Rimuovi la classe per sbloccare lo scroll
        document.body.classList.remove('overflow-hidden');
      }
    });
  };

  return (
    // 'ref' ci serve per dare a GSAP un "contesto" in cui cercare gli elementi
    <div ref={appRef}> 
      <Navbar />
      <main>
        <Hero />
        <ProjectGrid 
          onProjectClick={handleProjectClick} 
          selectedProjectId={selectedProject?.id || null} 
        />
        {/* Qui andranno le altre sezioni (About, Contact, etc.) */}
      </main>
      
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

