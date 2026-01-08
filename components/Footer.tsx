export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 text-center p-6 text-xs mt-8">
      <p className="font-bold text-gray-300 mb-2">IMPORTANT</p>
      <p>Hazard levels are indicative for emergency triage purposes.</p>
      <p>Always consult the official SDS for specific Personal Protective Equipment (PPE) requirements.</p>
      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-gray-500">
          Developed by <span className="text-blue-400 font-semibold">BarviciiCorp</span>
        </p>
      </div>
    </footer>
  );
}
