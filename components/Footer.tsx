export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 text-center p-6 text-xs mt-8">
      <p className="font-bold text-gray-300 mb-2">IMPORTANTE</p>
      <p>Los niveles de peligro son referenciales para triaje de emergencia.</p>
      <p>Consulte siempre el SDS oficial para equipos de protección (PPE) específicos.</p>
      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-gray-500">
          Desarrollado by <span className="text-blue-400 font-semibold">BarviciiCorp</span>
        </p>
      </div>
    </footer>
  );
}
