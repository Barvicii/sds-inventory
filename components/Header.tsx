'use client';

import Link from 'next/link';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
}

export default function Header({ 
  title = "Chemical Shed", 
  subtitle = "Craigmore Farming - Respuesta a Emergencias",
  showBackButton = false 
}: HeaderProps) {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg sticky top-0 z-50 border-b-4 border-red-600">
      <div className="container mx-auto">
        {showBackButton && (
          <div className="mb-2">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
            >
              <i className="fas fa-arrow-left"></i>
              <span>Volver a selección</span>
            </Link>
          </div>
        )}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold uppercase tracking-wider">
              <i className="fas fa-skull-crossbones text-red-500 mr-2"></i>
              {title}
            </h1>
            <p className="text-xs text-gray-400">{subtitle}</p>
          </div>
          <div className="text-right">
            <a
              href="tel:111"
              className="bg-red-600 text-white font-bold py-2 px-4 rounded shadow hover:bg-red-700 transition animate-pulse"
            >
              <i className="fas fa-phone-alt mr-1"></i> 111
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
