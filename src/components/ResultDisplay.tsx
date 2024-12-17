import React from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from './ui/Button';

interface ResultDisplayProps {
  result: string;
  onCopy: () => void;
  copied: boolean;
}

export function ResultDisplay({ result, onCopy, copied }: ResultDisplayProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Result:</h3>
        <Button
          variant="secondary"
          icon={copied ? Check : Copy}
          onClick={onCopy}
          className="p-2"
        >
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>
      <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap break-all">
        {result}
      </pre>
    </div>
  );
}