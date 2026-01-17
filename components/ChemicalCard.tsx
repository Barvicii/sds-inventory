'use client';

import { Chemical } from '@/types/chemical';
import { getDangerStyles } from '@/lib/utils';
import { getOneDriveSdsLink } from '@/lib/onedrive-links';

interface ChemicalCardProps {
  chemical: Chemical;
}

/**
 * Tarjeta de químico individual
 * Muestra la cantidad de forma destacada y visible, especialmente para alto riesgo
 */
export default function ChemicalCard({ chemical }: ChemicalCardProps) {
  const style = getDangerStyles(chemical.Peligro);
  const isHighRisk = chemical.Peligro === 'high';
  
  // Usar LinkSDS del Excel si existe, sino buscar en el mapeo de OneDrive
  const sdsLink = chemical.LinkSDS || getOneDriveSdsLink(chemical.Nombre);

  return (
    <div
      className={`chemical-card bg-white p-5 rounded-lg shadow-sm mb-4 flex flex-col md:flex-row justify-between items-start md:items-center ${style.border}`}
    >
      {/* Información principal */}
      <div className="flex-1 w-full">
        {/* Badge de nivel de peligro */}
        <div className="flex items-center justify-between mb-1">
          <span
            className={`text-xs font-bold px-2 py-1 rounded border ${style.badge} flex items-center gap-2`}
          >
            <i className={`${style.icon} ${chemical.Peligro === 'high' ? 'text-red-600' : chemical.Peligro === 'medium' ? 'text-orange-500' : 'text-green-500'}`}></i>
            {style.text}
          </span>
          {/* Cantidad en móvil (header) */}
          <span className={`md:hidden font-mono text-sm px-2 py-1 rounded border ${isHighRisk ? 'font-bold bg-red-100 border-red-300 text-red-900' : 'bg-gray-100'}`}>
            {chemical.Cantidad}
          </span>
        </div>

        {/* Nombre del químico */}
        <h3 className="font-bold text-gray-800 text-xl mt-1">{chemical.Nombre}</h3>

        {/* Clasificación de peligro (HazardClasses) - Siempre visible si existe */}
        {chemical.HazardClasses && chemical.HazardClasses.trim() !== '' && (
          <div className="mt-1 mb-2">
            <p className={`text-xs font-semibold px-2 py-1 rounded inline-block ${
              chemical.HazardClasses.toLowerCase().includes('class 9') || chemical.HazardClasses.toLowerCase().includes('9.1')
                ? 'bg-purple-100 text-purple-900 border border-purple-300'
                : isHighRisk 
                ? 'bg-red-100 text-red-900 border border-red-300' 
                : chemical.Peligro === 'medium'
                ? 'bg-orange-100 text-orange-900 border border-orange-300'
                : 'bg-yellow-100 text-yellow-900 border border-yellow-300'
            }`}>
              <i className="fas fa-exclamation-triangle mr-1"></i>
              {chemical.HazardClasses}
            </p>
          </div>
        )}

        {/* Activo (Ingrediente activo) */}
        {chemical.Activo && (
          <p className="text-sm text-gray-600 mt-1">
            <i className="fas fa-flask text-gray-400 mr-1"></i>
            {chemical.Activo}
          </p>
        )}

        {/* Detalles adicionales */}
        <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-600">
          {chemical.Ubicacion && (
            <span className="bg-gray-50 px-2 py-1 rounded border border-gray-100">
              <i className="fas fa-map-marker-alt text-gray-400 mr-1"></i> {chemical.Ubicacion}
            </span>
          )}
          {chemical.Tipo && (
            <span className="bg-blue-50 px-2 py-1 rounded border border-blue-100 text-blue-700">
              <i className="fas fa-tag text-blue-400 mr-1"></i> {chemical.Tipo}
            </span>
          )}
        </div>
      </div>

      {/* CANTIDAD - MUY VISIBLE (Desktop) */}
      <div className={`hidden md:block mx-8 text-center min-w-[100px] px-4 py-3 rounded-lg border-2 ${style.quantityBg}`}>
        <p className="text-xs text-gray-500 uppercase font-bold mb-1">
          {isHighRisk && <i className="fas fa-exclamation-triangle text-red-600 mr-1"></i>}
          Quantity
        </p>
        <p className={`font-mono text-gray-800 ${isHighRisk ? 'text-2xl font-extrabold text-red-900' : 'text-xl font-bold'}`}>
          {chemical.Cantidad}
        </p>
      </div>

      {/* Botón SDS */}
      <div className="mt-4 md:mt-0 w-full md:w-auto">
        <a
          href={sdsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex md:flex-col items-center justify-center bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 border border-blue-200 p-3 rounded-lg transition text-center group w-full md:w-24"
        >
          <i className="fas fa-file-pdf text-xl mb-0 md:mb-1 mr-2 md:mr-0 group-hover:scale-110 transition-transform"></i>
          <span className="text-sm font-bold">SDS</span>
        </a>
      </div>
    </div>
  );
}
