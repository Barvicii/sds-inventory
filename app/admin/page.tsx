'use client';

import { useState } from 'react';
import Link from 'next/link';

interface UploadStats {
  totalChemicals: number;
  totalRows: number;
  newChemicals: number;
  newChemicalsList: string[];
  fileName: string;
  fileSize: string;
  uploadDate: string;
  backupCreated: boolean;
}

export default function AdminPage() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<UploadStats | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-inventory', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error subiendo archivo');
      }

      setSuccess(data.stats);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Administration Panel
          </h1>
          <p className="text-gray-600">
            Update chemical inventory by uploading the Excel file
          </p>
          <Link 
            href="/"
            className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to inventory
          </Link>
        </div>

        {/* Upload Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📤 Upload ChemicalStores.xlsx
          </h2>
          
          <div className="mb-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <strong>Instructions:</strong>
                  </p>
                  <ul className="text-sm text-blue-700 list-disc list-inside mt-2 space-y-1">
                    <li>File must be Excel format (.xlsx)</li>
                    <li>Must contain "Chemical" column</li>
                    <li>Must have "Store", "StockUnit" or "Total" columns</li>
                    <li>Headers can be in any row (automatically detected)</li>
                    <li>Only shows Judco and Patutahi sheds (Chem/Fert)</li>
                    <li>Chemicals with zero stock are automatically filtered out</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Drag and Drop Area */}
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept=".xlsx,.xls"
                onChange={handleFileInput}
                disabled={uploading}
              />
              
              <label
                htmlFor="fileInput"
                className="cursor-pointer flex flex-col items-center"
              >
                <svg
                  className="w-16 h-16 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-lg font-medium text-gray-700 mb-2">
                  {uploading ? 'Uploading file...' : 'Drag file here'}
                </p>
                <p className="text-sm text-gray-500">
                  or click to select
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Format: Excel (.xlsx, .xls)
                </p>
              </label>
            </div>
          </div>

          {/* Loading State */}
          {uploading && (
            <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
              <span className="text-blue-700 font-medium">Processing file...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">Error:</p>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success State */}
          {success && (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700 font-medium">
                      ✅ File processed successfully
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      Data saved to database
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  📊 Update Summary
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded shadow-sm">
                    <p className="text-sm text-gray-600">Total Chemicals</p>
                    <p className="text-2xl font-bold text-blue-600">{success.totalChemicals}</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <p className="text-sm text-gray-600">Rows Processed</p>
                    <p className="text-2xl font-bold text-blue-600">{success.totalRows}</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <p className="text-sm text-gray-600">New Chemicals</p>
                    <p className="text-2xl font-bold text-green-600">{success.newChemicals}</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <p className="text-sm text-gray-600">File Size</p>
                    <p className="text-2xl font-bold text-gray-700">{success.fileSize}</p>
                  </div>
                </div>

                {success.newChemicals > 0 && (
                  <div className="mt-4 p-4 bg-yellow-50 rounded">
                    <p className="text-sm font-medium text-yellow-800 mb-2">
                      🆕 New chemicals detected:
                    </p>
                    <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1 max-h-32 overflow-y-auto">
                      {success.newChemicalsList.map((chemical, idx) => (
                        <li key={idx}>{chemical}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 text-xs text-gray-500">
                  <p>File: {success.fileName}</p>
                  <p>Upload date: {new Date(success.uploadDate).toLocaleString('en-NZ')}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            ❓ Frequently Asked Questions
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-800">How often should I update?</p>
              <p>It's recommended to update the inventory weekly or when there are significant changes in stock.</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">What if I upload the wrong file?</p>
              <p>Don't worry, you can upload the correct file again. The system will replace the data in the database.</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">Do new chemicals appear automatically?</p>
              <p>Yes, the system automatically detects new chemicals and adds them to the inventory.</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">Are SDS links updated automatically?</p>
              <p>New chemicals will attempt to find their SDS on Horticentre automatically using the intelligent mapping system.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
