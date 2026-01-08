import { DangerLevel, DangerStyles } from '@/types/chemical';

/**
 * Obtiene los estilos visuales según el nivel de peligro del químico
 */
export function getDangerStyles(level: DangerLevel): DangerStyles {
  switch (level) {
    case 'high':
      return {
        border: 'border-l-8 border-red-600',
        badge: 'bg-red-100 text-red-800 border-red-200',
        icon: 'fas fa-skull-crossbones',
        text: 'ALTO RIESGO',
        quantityBg: 'bg-red-50 border-red-300 ring-2 ring-red-400',
      };
    case 'medium':
      return {
        border: 'border-l-8 border-orange-400',
        badge: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: 'fas fa-exclamation-triangle',
        text: 'Riesgo Medio',
        quantityBg: 'bg-orange-50 border-orange-200',
      };
    case 'low':
      return {
        border: 'border-l-8 border-green-500',
        badge: 'bg-green-100 text-green-800 border-green-200',
        icon: 'fas fa-check-circle',
        text: 'Bajo Riesgo',
        quantityBg: 'bg-green-50 border-green-200',
      };
    default:
      return {
        border: 'border-l-4 border-gray-400',
        badge: 'bg-gray-100',
        icon: '',
        text: '',
        quantityBg: 'bg-gray-50',
      };
  }
}

/**
 * Normaliza el nivel de peligro desde el Excel
 */
export function normalizeDangerLevel(value: string): DangerLevel {
  const normalized = value.toLowerCase().trim();
  if (normalized.includes('alto') || normalized.includes('high')) return 'high';
  if (normalized.includes('medio') || normalized.includes('medium')) return 'medium';
  return 'low';
}

/**
 * Clasifica el peligro de un químico basado en HazardClasses
 */
export function classifyChemicalDanger(hazardClasses: string | undefined, chemical: string, activeIngredient: string): DangerLevel {
  if (!hazardClasses) {
    // Fallback a clasificación por keywords si no hay HazardClasses
    return classifyByKeywords(chemical, activeIngredient);
  }

  const hazard = hazardClasses.toLowerCase();
  
  // Alto riesgo: Class 6 (Tóxico), Class 8 (Corrosivo), explosivos
  if (
    hazard.includes('class 6') ||
    hazard.includes('class 8') ||
    hazard.includes('toxic to people') ||
    hazard.includes('corrosive') ||
    hazard.includes('explosive')
  ) {
    return 'high';
  }
  
  // Medio riesgo: Class 9 (Eco-tóxico), inflamables
  if (
    hazard.includes('class 9') ||
    hazard.includes('toxic to the environment') ||
    hazard.includes('flammable') ||
    hazard.includes('class 3')
  ) {
    return 'medium';
  }
  
  return 'low';
}

/**
 * Clasificación por keywords (fallback)
 */
function classifyByKeywords(chemical: string, activeIngredient: string): DangerLevel {
  const chemLower = (chemical + ' ' + activeIngredient).toLowerCase();
  
  // Alto riesgo: Organofosfatos, corrosivos severos, tóxicos agudos
  const highRiskKeywords = [
    'organofosfato', 'organophosphate', 'paraquat', 'acephate',
    'methyl bromide', 'phosphine', 'chloropicrin',
    'corrosive', 'corrosivo', 'toxic', 'tóxico'
  ];
  
  // Medio riesgo: Irritantes, nocivos
  const mediumRiskKeywords = [
    'irritant', 'irritante', 'harmful', 'nocivo',
    'fungicide', 'fungicida', 'herbicide', 'herbicida',
    'insecticide', 'insecticida'
  ];
  
  if (highRiskKeywords.some(keyword => chemLower.includes(keyword))) {
    return 'high';
  }
  
  if (mediumRiskKeywords.some(keyword => chemLower.includes(keyword))) {
    return 'medium';
  }
  
  return 'low';
}
