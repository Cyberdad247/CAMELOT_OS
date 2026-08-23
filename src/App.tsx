import React, { useState } from 'react';
import { Shield, FileJson, CheckCircle, Search, FileText, Database, BookOpen } from 'lucide-react';
import Markdown from 'react-markdown';

const schemaFiles = import.meta.glob(['../packages/contracts/*.json', '../harness/golden-receipts/*.json'], { eager: true, query: '?raw', import: 'default' });
const markdownFiles = import.meta.glob(['../*.md', '../docs/**/*.md'], { eager: true, query: '?raw', import: 'default' });

interface SchemaData {
  name: string;
  content: string;
  parsed?: any;
  isMarkdown?: boolean;
}

const schemas: SchemaData[] = Object.entries(schemaFiles).map(([path, content]) => {
  const name = path.split('/').pop() as string;
  let parsed = {};
  try {
    parsed = JSON.parse(content as string);
  } catch (e) {
    console.error("Failed to parse", name);
  }
  return { name, content: content as string, parsed, isMarkdown: false };
});

const markdowns: SchemaData[] = Object.entries(markdownFiles).map(([path, content]) => {
  const name = path.split('/').pop() as string;
  return { name, content: content as string, isMarkdown: true };
});

const allFiles = [...markdowns, ...schemas];

function App() {
  const [selectedSchema, setSelectedSchema] = useState<SchemaData | null>(allFiles.find(f => f.name === 'README.md') || allFiles[0] || null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSchemas = allFiles.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex h-screen bg-neutral-50 font-sans">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-neutral-200 flex flex-col h-full">
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-neutral-900" />
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-neutral-900">Camelot-OS</h1>
              <p className="text-sm text-neutral-500 font-medium">Harness & Contracts</p>
            </div>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search schemas..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-neutral-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-neutral-300 focus:ring-2 focus:ring-neutral-200 outline-none transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {filteredSchemas.map((schema) => (
            <button
              key={schema.name}
              onClick={() => setSelectedSchema(schema)}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center space-x-3 transition-colors ${selectedSchema?.name === schema.name ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 text-neutral-700'}`}
            >
              {schema.isMarkdown ? (
                <BookOpen className={`w-4 h-4 ${selectedSchema?.name === schema.name ? 'text-neutral-300' : 'text-neutral-400'}`} />
              ) : (
                <FileJson className={`w-4 h-4 ${selectedSchema?.name === schema.name ? 'text-neutral-300' : 'text-neutral-400'}`} />
              )}
              <span className="text-sm font-medium truncate">{schema.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        {selectedSchema ? (
          <>
            <div className="px-8 py-6 border-b border-neutral-100 flex items-center justify-between bg-white">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">{selectedSchema.name}</h2>
                <p className="text-sm text-neutral-500 mt-1">
                  {selectedSchema.isMarkdown ? 'Documentation File' : (selectedSchema.parsed?.title || 'JSON Schema Definition')}
                </p>
              </div>
              {!selectedSchema.isMarkdown && (
                <div className="flex items-center space-x-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                  <CheckCircle className="w-4 h-4" />
                  <span>Validated Schema</span>
                </div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-8 bg-neutral-50/50">
              <div className="max-w-4xl mx-auto space-y-6">
                
                {selectedSchema.isMarkdown ? (
                  <div className="bg-white p-8 rounded-xl border border-neutral-200 shadow-sm prose prose-neutral max-w-none">
                    <Markdown>{selectedSchema.content}</Markdown>
                  </div>
                ) : (
                  <>
                    {/* Meta Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
                        <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">Schema ID</h3>
                        <p className="text-sm font-medium text-neutral-800 break-all">{selectedSchema.parsed?.$id || 'N/A'}</p>
                      </div>
                      <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
                        <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">Schema Type</h3>
                        <p className="text-sm font-medium text-neutral-800">{selectedSchema.parsed?.type || 'object'}</p>
                      </div>
                    </div>

                    {/* Properties Overview */}
                    {selectedSchema.parsed?.properties ? (
                      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-neutral-100 bg-neutral-50/50 flex items-center space-x-2">
                          <Database className="w-4 h-4 text-neutral-500" />
                          <h3 className="text-sm font-semibold text-neutral-800">Properties Overview</h3>
                        </div>
                        <div className="divide-y divide-neutral-100">
                          {Object.entries(selectedSchema.parsed.properties).map(([key, value]: [string, any]) => (
                            <div key={key} className="px-5 py-3 flex items-start justify-between">
                              <div>
                                <span className="text-sm font-semibold text-neutral-900">{key}</span>
                                {selectedSchema.parsed.required?.includes(key) && (
                                  <span className="ml-2 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded uppercase tracking-wide">Required</span>
                                )}
                                <p className="text-xs text-neutral-500 mt-1">{value.description || 'No description provided.'}</p>
                              </div>
                              <div className="text-xs font-mono text-neutral-400 bg-neutral-50 px-2 py-1 rounded">
                                {value.type || 'any'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-center space-x-2">
                        <Database className="w-4 h-4 text-neutral-400" />
                        <p className="text-sm text-neutral-500 font-medium">No properties defined or not a standard schema object.</p>
                      </div>
                    )}

                    {/* Raw Code */}
                    <div className="bg-neutral-900 rounded-xl overflow-hidden shadow-lg border border-neutral-800">
                      <div className="px-5 py-3 border-b border-neutral-800 flex items-center space-x-2 bg-neutral-950">
                        <FileText className="w-4 h-4 text-neutral-500" />
                        <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Raw JSON</h3>
                      </div>
                      <div className="p-5 overflow-x-auto">
                        <pre className="text-sm font-mono text-neutral-300 leading-relaxed">
                          {JSON.stringify(selectedSchema.parsed, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-neutral-400">
            <Shield className="w-16 h-16 mb-4 text-neutral-200" />
            <p className="text-lg font-medium text-neutral-600">Select a schema to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
