'use client';

import { useState, useEffect } from 'react';
import { Chemical, DangerLevel } from '@/types/chemical';
import { loadDataFromMongoDB } from '@/lib/excel';
import ChemicalCard from './ChemicalCard';

interface InventoryListProps {
  storesUrl?: string; // URL del Excel de stores
  chemicalsUrl?: string; // URL del Excel de químicos
  initialData?: Chemical[]; // Datos iniciales (para desarrollo)
  filterByType?: 'Chem' | 'Fert'; // Filtrar por tipo de shed
}

/**
 * Componente principal que gestiona el inventario
 * - Carga ambos archivos Excel (stores + chemicals)
 * - Agrupa químicos del mismo nombre y suma cantidades
 * - Filtra por tipo de shed (Chem o Fert)
 * - Maneja filtros y búsqueda
 * - Renderiza las tarjetas
 */
export default function InventoryList({ storesUrl, chemicalsUrl, initialData = [], filterByType }: InventoryListProps) {
  const [chemicals, setChemicals] = useState<Chemical[]>(initialData);
  const [filteredChemicals, setFilteredChemicals] = useState<Chemical[]>(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [dangerFilter, setDangerFilter] = useState<DangerLevel | 'all'>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos al montar el componente
  useEffect(() => {
    loadExcelData();
  }, []);

  /**
   * Carga datos desde MongoDB (con fallback a Excel)
   */
  const loadExcelData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await loadDataFromMongoDB();
      
      // Filtrar por tipo de shed si se especifica
      const filteredData = filterByType
        ? data.filter(chem => {
            // Verificar si la ubicación incluye el tipo de shed
            const ubicacion = chem.Ubicacion.toLowerCase();
            return filterByType === 'Chem' 
              ? ubicacion.includes('chem shed')
              : ubicacion.includes('fert shed');
          })
        : data;
      
      setChemicals(filteredData);
      setFilteredChemicals(filteredData);
    } catch (err) {
      setError('Error al cargar el inventario. Verifique las URLs de los archivos Excel.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Aplicar filtros cuando cambian los criterios
  useEffect(() => {
    filterChemicals();
  }, [searchTerm, dangerFilter, chemicals]);

  /**
   * Filtra los químicos según búsqueda y nivel de peligro
   */
  const filterChemicals = () => {
    let filtered = [...chemicals];

    // Filtro de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (chem) =>
          chem.Nombre.toLowerCase().includes(term) ||
          chem.Activo.toLowerCase().includes(term) ||
          chem.Ubicacion?.toLowerCase().includes(term)
      );
    }

    // Filtro de nivel de peligro
    if (dangerFilter !== 'all') {
      filtered = filtered.filter((chem) => chem.Peligro === dangerFilter);
    }

    setFilteredChemicals(filtered);
  };

  return (
    <div>
      {/* Panel de control y filtros */}
      <div className="bg-white p-4 shadow-md sticky top-20 z-40">
        <div className="container mx-auto">
          {/* Buscador */}
          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <i className="fas fa-search text-gray-400"></i>
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search chemical..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
            />
          </div>

          {/* Botones de filtro */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setDangerFilter('all')}
              className={`flex-1 py-2 px-4 rounded font-bold text-sm whitespace-nowrap focus:ring-2 ring-gray-400 ${
                dangerFilter === 'all'
                  ? 'bg-gray-300 text-gray-900'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDangerFilter('high')}
              className={`flex-1 py-2 px-4 rounded font-bold text-sm whitespace-nowrap border border-red-200 focus:ring-2 ring-red-500 ${
                dangerFilter === 'high'
                  ? 'bg-red-200 text-red-900'
                  : 'bg-red-100 hover:bg-red-200 text-red-800'
              }`}
            >
              <i className="fas fa-exclamation-triangle"></i> High Risk
            </button>
            <button
              onClick={() => setDangerFilter('medium')}
              className={`flex-1 py-2 px-4 rounded font-bold text-sm whitespace-nowrap border border-orange-200 focus:ring-2 ring-orange-500 ${
                dangerFilter === 'medium'
                  ? 'bg-orange-200 text-orange-900'
                  : 'bg-orange-100 hover:bg-orange-200 text-orange-800'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setDangerFilter('low')}
              className={`flex-1 py-2 px-4 rounded font-bold text-sm whitespace-nowrap border border-green-200 focus:ring-2 ring-green-500 ${
                dangerFilter === 'low'
                  ? 'bg-green-200 text-green-900'
                  : 'bg-green-100 hover:bg-green-200 text-green-800'
              }`}
            >
              Low
            </button>
          </div>

          <div className="mt-2 text-xs text-gray-500 text-right">
            <span>{filteredChemicals.length} Products Displayed</span>
          </div>
        </div>
      </div>

      {/* Lista de químicos */}
      <main className="container mx-auto p-4 mb-10">
        {loading && (
          <div className="text-center py-10">
            <i className="fas fa-spinner fa-spin text-4xl text-gray-400"></i>
            <p className="mt-4 text-gray-600">Loading inventory...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-4">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </div>
        )}

        {!loading && !error && filteredChemicals.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            <i className="fas fa-search text-4xl mb-4"></i>
            <p>No chemicals found with current filters.</p>
          </div>
        )}

        {!loading && !error && filteredChemicals.map((chemical, index) => (
          <ChemicalCard key={index} chemical={chemical} />
        ))}
      </main>
    </div>
  );
}
