import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  highlightedLines?: string[];
  id?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  title = 'CSS Generated',
  highlightedLines = [],
  id = 'code-block'
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div id={id} className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-md text-sm">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-xs font-semibold text-slate-300 tracking-wide font-mono uppercase">{title}</span>
        </div>
        <button
          id={`${id}-copy-btn`}
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-blue-500 border border-slate-700"
          aria-label="CSSコードをコピー"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">コピー完了</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>CSS コピー</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto font-mono text-xs leading-relaxed text-slate-200 custom-scrollbar">
        <pre className="m-0">
          {lines.map((line, idx) => {
            const isHighlighted = highlightedLines.some(keyword => line.includes(keyword));
            
            // Format CSS syntax colors
            const isSelector = line.includes('{') || line.includes('}');
            const isComment = line.trim().startsWith('/*');

            let content: React.ReactNode = line;

            if (!isSelector && !isComment && line.includes(':')) {
              const colonIndex = line.indexOf(':');
              const property = line.slice(0, colonIndex);
              const value = line.slice(colonIndex + 1);

              content = (
                <>
                  <span className="text-blue-300 font-medium">{property}</span>:
                  <span className="text-yellow-400 font-normal">{value}</span>
                </>
              );
            } else if (isSelector) {
              content = <span className="text-slate-400 font-semibold">{line}</span>;
            } else if (isComment) {
              content = <span className="text-slate-500 italic">{line}</span>;
            }

            return (
              <div
                key={idx}
                className={`py-0.5 px-2 -mx-2 rounded transition-colors duration-150 ${
                  isHighlighted ? 'bg-blue-500/15 border-l-2 border-blue-500 font-semibold text-white' : ''
                }`}
              >
                {content}
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
};
