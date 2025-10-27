import React from 'react'
import ReactDOM from 'react-dom/client'
// 1. Importa il router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 2. Importa i componenti delle pagine (creali in src/pages/)
// Per ora, useremo 'App' come home page
import App from './App.tsx' 
// import About from './pages/About.tsx' // Decommenta quando crei la pagina About

// 3. Importa gli stili globali (che includono Tailwind)
import './index.css'

// 4. Importa e registra i plugin GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

// REGISTRA I PLUGIN UNA SOLA VOLTA QUI
gsap.registerPlugin(ScrollTrigger, Flip);

// 5. Definisci le rotte del tuo sito
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // 'App.tsx' sarà la tua pagina Home
  },
  /*
  {
    path: '/about', // Esempio per un'altra pagina
    element: <About />,
  },
  */
]);

// 6. Avvia l'applicazione React
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Usa RouterProvider per dire a React quali pagine mostrare */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
