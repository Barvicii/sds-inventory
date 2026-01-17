'use client';

import { useState } from 'react';

export default function UploadReferencePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const uploadReference = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/upload-chemicals-reference', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Error uploading reference data');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/upload-chemicals-reference');
      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Error checking status');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Chemicals Reference Data Upload
          </h1>
          <p className="text-gray-600 mb-8">
            Upload Chemicals.xlsx data to MongoDB for hazard classification lookups
          </p>

          <div className="space-y-4">
            <button
              onClick={uploadReference}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {loading ? '⏳ Processing...' : '📚 Upload Reference Data to MongoDB'}
            </button>

            <button
              onClick={checkStatus}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {loading ? '⏳ Checking...' : '🔍 Check Current Status'}
            </button>
          </div>

          {error && (
            <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4">
              <p className="text-red-700 font-medium">❌ Error</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4">
              <p className="text-green-700 font-medium mb-3">✅ Success</p>
              
              {result.stats && (
                <div className="bg-white rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold text-gray-800 mb-3">Upload Statistics:</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-gray-600">Total Chemicals</p>
                      <p className="text-2xl font-bold text-blue-600">{result.stats.totalChemicals}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded">
                      <p className="text-gray-600">With Hazard Classes</p>
                      <p className="text-2xl font-bold text-purple-600">{result.stats.withHazardClasses}</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded">
                      <p className="text-gray-600">Chemicals</p>
                      <p className="text-2xl font-bold text-orange-600">{result.stats.chemicals}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-gray-600">Fertilizers</p>
                      <p className="text-2xl font-bold text-green-600">{result.stats.fertilizers}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Uploaded: {new Date(result.stats.uploadDate).toLocaleString()}
                  </p>
                </div>
              )}

              {result.total !== undefined && (
                <div className="bg-white rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold text-gray-800 mb-3">Current Status:</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-gray-600">Total Records</p>
                      <p className="text-2xl font-bold text-blue-600">{result.total}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded">
                      <p className="text-gray-600">With Hazard Data</p>
                      <p className="text-2xl font-bold text-purple-600">{result.withHazardClasses}</p>
                    </div>
                  </div>
                  
                  {result.sampleData && result.sampleData.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Sample Data (first 3):</p>
                      <div className="space-y-2">
                        {result.sampleData.slice(0, 3).map((item: any, idx: number) => (
                          <div key={idx} className="bg-gray-50 p-2 rounded text-xs">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-gray-600">Type: {item.type}</p>
                            {item.hazardClasses && (
                              <p className="text-orange-600">Hazard: {item.hazardClasses}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {result.message && (
                <p className="text-green-600 text-sm mt-3">{result.message}</p>
              )}
            </div>
          )}

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">ℹ️ Instructions</h3>
            <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside">
              <li>Click "Upload Reference Data" to load Chemicals.xlsx into MongoDB</li>
              <li>This only needs to be done once (or when the Chemicals file is updated)</li>
              <li>After upload, the weekly ChemicalStores uploads will automatically include hazard data</li>
              <li>Use "Check Current Status" to verify the data is loaded</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
