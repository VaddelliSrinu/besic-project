import React, { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { EncryptionService } from '../services/encryptionService';
import { Button } from './ui/Button';
import { TextArea } from './ui/TextArea';
import { PasswordInput } from './ui/PasswordInput';
import { ResultDisplay } from './ResultDisplay';

const encryptionService = new EncryptionService();

export function EncryptionForm() {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEncrypt = async () => {
    if (!text || !password) {
      setError('Please enter both text and password');
      return;
    }
    
    try {
      setError(null);
      const encrypted = await encryptionService.encrypt(text, password);
      setResult(JSON.stringify(encrypted, null, 2));
      setIsEncrypted(true);
    } catch (error) {
      setError('Encryption failed: ' + error.message);
    }
  };

  const handleDecrypt = async () => {
    if (!text || !password) {
      setError('Please enter both encrypted data and password');
      return;
    }

    try {
      setError(null);
      const encryptedData = JSON.parse(text);
      const decrypted = await encryptionService.decrypt(encryptedData, password);
      if (decrypted.success) {
        setResult(decrypted.plaintext);
        setIsEncrypted(false);
      } else {
        setError(decrypted.error || 'Decryption failed');
      }
    } catch (error) {
      setError('Invalid encrypted data format');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <TextArea
          label={isEncrypted ? "Enter encrypted data" : "Enter text to encrypt"}
          placeholder={isEncrypted ? "Paste encrypted data here..." : "Type or paste your text here..."}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
        />
        
        <PasswordInput
          label="Password"
          placeholder="Enter your encryption password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <Button
            icon={isEncrypted ? Unlock : Lock}
            onClick={isEncrypted ? handleDecrypt : handleEncrypt}
          >
            {isEncrypted ? 'Decrypt' : 'Encrypt'}
          </Button>
        </div>
      </div>

      {result && (
        <ResultDisplay
          result={result}
          onCopy={handleCopy}
          copied={copied}
        />
      )}
    </div>
  );
}