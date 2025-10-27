import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 p-6 lg:p-10 bg-neutral-900 border-t border-neutral-800">
      <div className="container mx-auto text-center text-neutral-400">
        <p>
          &copy; {currentYear} [Il Tuo Nome]. Tutti i diritti riservati.
        </p>
        <p className="text-sm mt-2">
          Realizzato con React, Tailwind CSS e GSAP.
        </p>
      </div>
    </footer>
  );
}
