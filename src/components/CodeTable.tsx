'use client';

import { useRef } from 'react';
import { TableStyle } from '@/types';
import { toPng } from 'html-to-image';

interface CodeTableProps {
  code: string;
  style: TableStyle;
}

export default function CodeTable({ code, style }: CodeTableProps) {
  const tableRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = async () => {
    if (!tableRef.current) return;
    
    try {
      const dataUrl = await toPng(tableRef.current, {
        backgroundColor: style.backgroundColor,
        quality: 1.0,
        pixelRatio: 2,
      });
      
      // Create a temporary link to download the image
      const link = document.createElement('a');
      link.download = 'code-table.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      // Fallback to copying HTML
      copyHTMLToClipboard();
    }
  };

  const copyHTMLToClipboard = async () => {
    if (!tableRef.current) return;
    
    try {
      // Create a temporary div to hold the table
      const tempDiv = document.createElement('div');
      tempDiv.appendChild(tableRef.current.cloneNode(true));
      
      // Copy the table to clipboard using the clipboard API
      const clipboardItem = new ClipboardItem({
        'text/html': new Blob([tempDiv.innerHTML], { type: 'text/html' }),
        'text/plain': new Blob([getPlainTextTable()], { type: 'text/plain' })
      });
      
      await navigator.clipboard.write([clipboardItem]);
      alert('Table copied to clipboard! You can now paste it into Google Docs.');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      // Fallback to manual selection
      selectTableForCopy();
    }
  };

  const copyTableToClipboard = async () => {
    if (!code.trim()) return;
    
    try {
      // Create a properly formatted table for Google Docs
      const lines = code.split('\n');
      const tableHTML = `
        <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: ${style.tableWidth}; background-color: ${style.backgroundColor};">
          <thead>
            <tr style="background-color: #f3f4f6;">
              <th style="border: ${style.borderWidth}px ${style.borderStyle} ${style.borderColor}; padding: 8px 12px; font-size: ${style.fontSize}px; font-weight: bold; color: ${style.textColor}; text-align: center;">Line #</th>
              <th style="border: ${style.borderWidth}px ${style.borderStyle} ${style.borderColor}; padding: 8px 12px; font-size: ${style.fontSize}px; font-weight: bold; color: ${style.textColor}; text-align: left;">Code</th>
            </tr>
          </thead>
          <tbody>
            ${lines.map((line, index) => `
              <tr>
                <td style="border: ${style.borderWidth}px ${style.borderStyle} ${style.borderColor}; padding: 8px 12px; font-size: ${style.fontSize}px; font-weight: ${style.fontWeight}; color: ${style.textColor}; text-align: center; background-color: #f9fafb; font-family: monospace;">${index + 1}</td>
                <td style="border: ${style.borderWidth}px ${style.borderStyle} ${style.borderColor}; padding: 8px 12px; font-size: ${style.fontSize}px; font-weight: ${style.fontWeight}; color: ${style.textColor}; text-align: left; font-family: monospace; white-space: pre;">${line || '\u00A0'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
      
      // Try to use the modern Clipboard API first
      if (navigator.clipboard && navigator.clipboard.write) {
        try {
          const clipboardItem = new ClipboardItem({
            'text/html': new Blob([tableHTML], { type: 'text/html' }),
            'text/plain': new Blob([getPlainTextTable()], { type: 'text/plain' })
          });
          
          await navigator.clipboard.write([clipboardItem]);
          alert('Table copied to clipboard! You can now paste it into Google Docs with proper formatting.');
          return;
        } catch (clipboardError) {
          console.log('Clipboard API failed, trying fallback method...');
        }
      }
      
      // Fallback: Create a temporary textarea and copy from it
      const textarea = document.createElement('textarea');
      textarea.value = tableHTML;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      
      try {
        document.execCommand('copy');
        alert('Table copied to clipboard! You can now paste it into Google Docs with proper formatting.');
      } catch (execError) {
        console.error('execCommand failed:', execError);
        // Final fallback: manual selection
        selectTableForCopy();
      } finally {
        document.body.removeChild(textarea);
      }
    } catch (error) {
      console.error('Error copying table to clipboard:', error);
      // Fallback to manual selection
      selectTableForCopy();
    }
  };

  const getPlainTextTable = () => {
    const lines = code.split('\n');
    return lines.map((line, index) => `${index + 1}\t${line}`).join('\n');
  };

  const selectTableForCopy = () => {
    if (!tableRef.current) return;
    
    // Select the table content for manual copying
    const range = document.createRange();
    range.selectNodeContents(tableRef.current);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
    alert('Table selected! Press Ctrl+C to copy, then paste into Google Docs.');
  };

  const copyTextToClipboard = async () => {
    if (!code.trim()) return;
    
    const lines = code.split('\n');
    const tableText = lines.map((line, index) => `${index + 1}\t${line}`).join('\n');
    
    try {
      await navigator.clipboard.writeText(tableText);
      alert('Table text copied to clipboard! You can paste it into Google Docs.');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      alert('Failed to copy to clipboard. Please try selecting and copying manually.');
    }
  };

  const getTableStyles = () => ({
    width: style.tableWidth,
    borderCollapse: 'collapse' as const,
    backgroundColor: style.backgroundColor,
    border: style.borderStyle !== 'none' ? `${style.borderWidth}px ${style.borderStyle} ${style.borderColor}` : 'none',
  });

  const getCellStyles = () => ({
    border: style.borderStyle !== 'none' ? `${style.borderWidth}px ${style.borderStyle} ${style.borderColor}` : 'none',
    padding: '8px 12px',
    fontSize: `${style.fontSize}px`,
    fontWeight: style.fontWeight,
    color: style.textColor || '#000000', // Fallback to black if no color specified
    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
    verticalAlign: 'top' as const,
    textAlign: 'left' as const,
  });

  if (!code.trim()) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Code Table</h2>
        <div className="text-center text-gray-500 py-12">
          <p>Enter some code to see the table preview</p>
        </div>
      </div>
    );
  }

  const lines = code.split('\n');

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Code Table</h2>
        <div className="flex gap-2">
          <button
            onClick={copyTextToClipboard}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Copy Text
          </button>
                     <button
             onClick={copyTableToClipboard}
             className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
           >
             Copy Table
           </button>
                     <button
             onClick={copyToClipboard}
             className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
           >
             Download PNG
           </button>
           <button
             onClick={selectTableForCopy}
             className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors text-sm"
           >
             Select Table
           </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div ref={tableRef} className="inline-block">
          <table style={getTableStyles()}>
            <thead>
              <tr>
                                 <th style={{ 
                   ...getCellStyles(), 
                   backgroundColor: '#f3f4f6', 
                   fontWeight: 'bold',
                   color: '#374151' // Dark gray for better contrast on light background
                 }}>
                   Line #
                 </th>
                 <th style={{ 
                   ...getCellStyles(), 
                   backgroundColor: '#f3f4f6', 
                   fontWeight: 'bold',
                   color: '#374151' // Dark gray for better contrast on light background
                 }}>
                   Code
                 </th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, index) => (
                <tr key={index}>
                                     <td style={{ 
                     ...getCellStyles(), 
                     backgroundColor: '#f9fafb', 
                     textAlign: 'center' as const,
                     color: '#6b7280' // Medium gray for line numbers
                   }}>
                     {index + 1}
                   </td>
                                   <td style={getCellStyles()}>
                   <pre style={{ 
                     margin: 0, 
                     whiteSpace: 'pre', 
                     fontFamily: 'inherit',
                     fontSize: 'inherit',
                     fontWeight: 'inherit',
                     color: 'inherit'
                   }}>
                     {line || '\u00A0'}
                   </pre>
                 </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>Total lines: {lines.length}</p>
                 <p className="mt-2">
           <strong>Tip:</strong> Use "Copy Text" for plain text format, "Copy Table" for Google Docs formatting, 
           "Download PNG" for an image, or "Select Table" to manually copy the formatted table.
         </p>
      </div>
    </div>
  );
}
