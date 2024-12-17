import React from 'react';
import { EncryptionForm } from './components/EncryptionForm';
import { Shield, Github } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Secure Encryption App</h1>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <EncryptionForm />
        </div>
      </main>

      <footer className="mt-8 py-4 text-center text-sm text-gray-500">
        <p>Built with security and privacy in mind. Your data never leaves your browser.</p>
      </footer>
    </div>
  );
}

export default App;