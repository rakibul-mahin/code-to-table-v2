'use client';

interface CodeInputProps {
  code: string;
  onCodeChange: (code: string) => void;
}

export default function CodeInput({ code, onCodeChange }: CodeInputProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Input Code
        </h2>
        <p className="text-sm text-gray-600">
          Paste or type your code here to convert it to a table
        </p>
      </div>
      
      <textarea
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        placeholder="Paste your code here...
// Example:
function hello() {
  console.log('Hello World!');
}"
        className="w-full h-96 p-4 border border-gray-300 rounded-lg resize-none font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-black"
        style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
      />
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Lines: {code.split('\n').length}</p>
        <p>Characters: {code.length}</p>
      </div>
    </div>
  );
}
