'use client';

import { TableStyle } from '@/types';

interface TableControlsProps {
  style: TableStyle;
  onStyleChange: (style: Partial<TableStyle>) => void;
}

export default function TableControls({ style, onStyleChange }: TableControlsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Table Styling
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Border Controls */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-700">Border Settings</h3>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Border Width (px)</label>
            <input
              type="range"
              min="0"
              max="10"
              value={style.borderWidth}
              onChange={(e) => onStyleChange({ borderWidth: parseInt(e.target.value) })}
              className="w-full"
            />
            <span className="text-sm text-gray-500">{style.borderWidth}px</span>
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Border Style</label>
            <select
              value={style.borderStyle}
              onChange={(e) => onStyleChange({ borderStyle: e.target.value as any })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
              <option value="none">None</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Border Color</label>
            <input
              type="color"
              value={style.borderColor}
              onChange={(e) => onStyleChange({ borderColor: e.target.value })}
              className="w-full h-10 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        {/* Text Controls */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-700">Text Settings</h3>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Font Size (px)</label>
            <input
              type="range"
              min="8"
              max="24"
              value={style.fontSize}
              onChange={(e) => onStyleChange({ fontSize: parseInt(e.target.value) })}
              className="w-full"
            />
            <span className="text-sm text-gray-500">{style.fontSize}px</span>
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Font Weight</label>
            <select
              value={style.fontWeight}
              onChange={(e) => onStyleChange({ fontWeight: e.target.value as any })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Text Color</label>
            <input
              type="color"
              value={style.textColor}
              onChange={(e) => onStyleChange({ textColor: e.target.value })}
              className="w-full h-10 border border-gray-300 rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">Choose a dark color for good readability</p>
          </div>
        </div>
        
        {/* Table Controls */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-700">Table Settings</h3>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Table Width</label>
            <select
              value={style.tableWidth}
              onChange={(e) => onStyleChange({ tableWidth: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="100%">Full Width</option>
              <option value="75%">75% Width</option>
              <option value="50%">50% Width</option>
              <option value="auto">Auto Width</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Background Color</label>
            <input
              type="color"
              value={style.backgroundColor}
              onChange={(e) => onStyleChange({ backgroundColor: e.target.value })}
              className="w-full h-10 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
