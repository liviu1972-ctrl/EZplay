import React, { useState, useEffect } from 'react';

interface DocumentationViewProps {
  onBack: () => void;
}

const DocumentationView: React.FC<DocumentationViewProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'docs' | 'jsonData'>('rules');
  const [rulesContent, setRulesContent] = useState('Se încarcă regulamentul...');
  const [docsContent, setDocsContent] = useState('Se încarcă documentația tehnică...');
  const [jsonDataContent, setJsonDataContent] = useState('Se încarcă datele jocului...');

  useEffect(() => {
    // Fetch rules content
    fetch('/documentation/rules.md')
      .then(response => response.text())
      .then(text => setRulesContent(text))
      .catch(error => {
        console.error('Failed to fetch rules:', error);
        setRulesContent('Eroare la încărcarea regulamentului.');
      });

    // Fetch technical docs content
    fetch('/documentation/technical_docs.md')
      .then(response => response.text())
      .then(text => setDocsContent(text))
      .catch(error => {
        console.error('Failed to fetch technical docs:', error);
        setDocsContent('Eroare la încărcarea documentației tehnice.');
      });

    // Fetch game data JSON
    fetch('/documentation/game_data.json')
      .then(response => response.json())
      .then(data => setJsonDataContent(JSON.stringify(data, null, 2)))
      .catch(error => {
          console.error('Failed to fetch game data:', error);
          setJsonDataContent('Eroare la încărcarea datelor jocului.');
      });
  }, []);

  const renderContent = () => {
    if (activeTab === 'jsonData') {
        return <pre className="bg-slate-900 text-sm whitespace-pre-wrap break-all"><code>{jsonDataContent}</code></pre>;
    }
    
    const contentToDisplay = activeTab === 'rules' ? rulesContent : docsContent;
    
    return (
        <div className="prose prose-invert max-w-none whitespace-pre-wrap font-sans">
            {contentToDisplay.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-3xl font-bold mt-6 mb-3 border-b border-slate-700 pb-2">{line.substring(2)}</h1>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-bold mt-5 mb-2">{line.substring(3)}</h2>;
                }
                if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-xl font-bold mt-4 mb-1">{line.substring(4)}</h3>;
                }
                if (line.startsWith('* ')) {
                    return <li key={index} className="ml-6 list-disc">{line.substring(2)}</li>;
                }
                if (line.trim().startsWith('```')) {
                    return <pre key={index} className="bg-slate-800 p-4 rounded-md my-4 overflow-x-auto"><code>{line.replace(/`/g, '')}</code></pre>;
                }
                return <p key={index} className="mb-4 leading-relaxed">{line}</p>;
            })}
        </div>
    );
  }

  return (
    <div className="w-full max-w-5xl h-[90vh] bg-slate-800/80 backdrop-blur-sm rounded-lg p-8 shadow-2xl animate-fade-in text-white flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-6 uppercase tracking-wider text-yellow-400">Documentație</h1>
      
      <div className="flex border-b border-slate-700 mb-4">
        <button
          onClick={() => setActiveTab('rules')}
          className={`px-6 py-3 text-lg font-semibold transition-colors duration-200 ${
            activeTab === 'rules'
              ? 'border-b-2 border-blue-500 text-blue-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Regulament
        </button>
        <button
          onClick={() => setActiveTab('docs')}
          className={`px-6 py-3 text-lg font-semibold transition-colors duration-200 ${
            activeTab === 'docs'
              ? 'border-b-2 border-blue-500 text-blue-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Documentație Tehnică
        </button>
        <button
          onClick={() => setActiveTab('jsonData')}
          className={`px-6 py-3 text-lg font-semibold transition-colors duration-200 ${
            activeTab === 'jsonData'
              ? 'border-b-2 border-blue-500 text-blue-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Date Joc (JSON)
        </button>
      </div>

      <div className="flex-grow overflow-y-auto pr-4 bg-slate-900/50 p-4 rounded-md">
        {renderContent()}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 text-lg"
        >
          Înapoi la Meniu
        </button>
      </div>
    </div>
  );
};

export default DocumentationView;