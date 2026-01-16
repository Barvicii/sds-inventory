import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header de emergencia */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-600 rounded-full mb-6 animate-pulse">
            <i className="fas fa-skull-crossbones text-white text-4xl"></i>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 uppercase tracking-wider">
            Chemical Shed
          </h1>
          <p className="text-gray-400 text-lg">Craigmore Farming - Emergency Response System</p>
        </div>

        {/* Botones de selección */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Chemical Shed */}
          <Link href="/chemical">
            <div className="group bg-red-600 hover:bg-red-700 rounded-2xl p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-2xl border-4 border-red-500">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-4 group-hover:bg-opacity-30 transition-all">
                  <i className="fas fa-flask text-white text-4xl"></i>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2 uppercase">Chemical Shed</h2>
                <p className="text-red-100 text-sm mb-4">Judco & Patutahi</p>
                <div className="flex items-center justify-center gap-2 text-white text-sm">
                  <span>Access Inventory</span>
                  <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                </div>
              </div>
            </div>
          </Link>

          {/* Fertilizer Shed */}
          <Link href="/fertilizer">
            <div className="group bg-green-600 hover:bg-green-700 rounded-2xl p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-2xl border-4 border-green-500">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-4 group-hover:bg-opacity-30 transition-all">
                  <i className="fas fa-seedling text-white text-4xl"></i>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2 uppercase">Fertilizer Shed</h2>
                <p className="text-green-100 text-sm mb-4">Judco & Patutahi</p>
                <div className="flex items-center justify-center gap-2 text-white text-sm">
                  <span>Access Inventory</span>
                  <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Información de emergencia */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 border border-gray-700 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <i className="fas fa-phone-alt text-white text-xl"></i>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg mb-2">In Case of Emergency</h3>
              <p className="text-gray-400 text-sm mb-3">
                Call 111 immediately and provide chemical information from the inventory
              </p>
              <a href="tel:111" className="inline-flex items-center gap-2 bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition">
                <i className="fas fa-phone-alt"></i>
                <span>Call 111</span>
              </a>
            </div>
          </div>
        </div>

        {/* Admin Access */}
        <Link href="/admin">
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 hover:bg-opacity-50 transition-all cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-upload text-white"></i>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Update Inventory</h3>
                  <p className="text-gray-400 text-sm">Upload weekly ChemicalStores file</p>
                </div>
              </div>
              <i className="fas fa-arrow-right text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all"></i>
            </div>
          </div>
        </Link>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-xs">
          <p>Developed by <span className="text-blue-400 font-semibold">BarviciiCorp</span></p>
        </div>
      </div>
    </div>
  );
}
