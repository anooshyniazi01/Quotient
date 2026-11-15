import React, { useState } from 'react';
import { Icon } from '../icons/Icons';

export interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="cwrap">
      <button
        type="button"
        className="cp"
        onClick={handleCopy}
        aria-label="Copy code to clipboard"
      >
        <Icon name={copied ? 'check' : 'copy'} size={12} />
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre className="code">{code}</pre>
    </div>
  );
};
