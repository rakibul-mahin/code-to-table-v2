# Code to Table Converter

A Next.js application that converts code into customizable tables for easy insertion into Google Docs and other documents.

## Features

- **Code Input**: Paste or type your code in a dedicated textarea
- **Customizable Table Styling**: 
  - Border width, style, and color
  - Font size and weight
  - Table width and background color
  - Text color customization
- **Multiple Export Options**:
  - Copy as plain text (tab-separated)
  - Copy as HTML (rich formatting)
  - Download as PNG image
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Preview**: See your table updates as you type and style

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Usage

1. **Input Code**: Paste or type your code in the left panel
2. **Customize Styling**: Use the controls in the middle panel to adjust table appearance
3. **Preview Table**: See the generated table in the right panel
4. **Export**: Choose from three export options:
   - **Copy Text**: Tab-separated format for simple pasting
   - **Copy HTML**: Rich HTML format for Google Docs
   - **Download PNG**: Image file for document insertion

## Technology Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **html-to-image** for PNG export functionality

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles
├── components/
│   ├── CodeInput.tsx       # Code input component
│   ├── CodeTable.tsx       # Table display and export
│   └── TableControls.tsx   # Styling controls
└── types/
    └── index.ts            # TypeScript interfaces
```

## Customization Options

### Border Settings
- Width: 0-10px
- Style: Solid, Dashed, Dotted, None
- Color: Custom color picker

### Text Settings
- Font Size: 8-24px
- Font Weight: Normal or Bold
- Text Color: Custom color picker

### Table Settings
- Width: Full, 75%, 50%, or Auto
- Background Color: Custom color picker

## Browser Compatibility

- Modern browsers with ES6+ support
- Clipboard API support for copy functionality
- Canvas API support for PNG export

## License

MIT License - feel free to use and modify as needed.
