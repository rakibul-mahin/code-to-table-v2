'use client';

import { useState } from 'react';
import CodeInput from '@/components/CodeInput';
import CodeTable from '@/components/CodeTable';
import TableControls from '@/components/TableControls';
import { TableStyle } from '@/types';

export default function Home() {
  const [code, setCode] = useState<string>('');
  const [tableStyle, setTableStyle] = useState<TableStyle>({
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000000',
    fontSize: 14,
    fontWeight: 'normal',
    tableWidth: '100%',
    backgroundColor: '#ffffff',
    textColor: '#1f2937', // Dark gray for better readability
  });

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleStyleChange = (newStyle: Partial<TableStyle>) => {
    setTableStyle(prev => ({ ...prev, ...newStyle }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Code to Table Converter
          </h1>
          <p className="text-gray-600 text-lg">
            Convert your code into a customizable table format for Google Docs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Code Input */}
          <div className="lg:col-span-2">
            <CodeInput 
              code={code} 
              onCodeChange={handleCodeChange} 
            />
          </div>

          {/* Right Column - Table and Controls */}
          <div className="lg:col-span-2 space-y-6">
            <TableControls 
              style={tableStyle} 
              onStyleChange={handleStyleChange} 
            />
            <CodeTable 
              code={code} 
              style={tableStyle} 
            />
          </div>
        </div>
      </div>
    </main>
  );
}
