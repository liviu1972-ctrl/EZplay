import React, { useState } from 'react';
import type { Scenario, Card } from '../types';
import { ScenarioSchema } from '../game-logic/zod';
import { ZodError } from 'zod';

interface ScenarioLoaderProps {
  onStart: (scenario: Scenario) => void;
  onBack: () => void;
  availableExpansions: { id: string, name: string }[];
  allAvailableEntrepreneurs: Card[];
}

const placeholderScenario = {
  "version": 1,
  "scenarioName": "Piața Concentrată",
  "activeExpansions": ["base-game"],
  "gameConfig": {
    "eventsStartYear": 99,
    "maxActiveConsultants": 1,
    "shuffleMarketOnTurnEnd": false,
    "bonusBuyRule": "no_combo",
    "hudCalculationMode": "empty",
    "marketConfig": [
        { "title": "Cost 1 / Corporal", "filters": { "assetType": "corporal", "costOperator": "=", "costValue": 1, "isEmpty": false } },
        { "title": "Cost 1 / Uman", "filters": { "assetType": "uman", "costOperator": "=", "costValue": 1, "isEmpty": false } },
        { "title": "Cost > 1 / Corporal", "filters": { "assetType": "corporal", "costOperator": ">", "costValue": 1, "isEmpty": false } },
        { "title": "Cost > 1 / Uman", "filters": { "assetType": "uman", "costOperator": ">", "costValue": 1, "isEmpty": false } },
        { "title": "Necorporal", "filters": { "assetType": "necorporal", "costOperator": "any", "costValue": 0, "isEmpty": false } },
        { "title": "Extra", "filters": { "assetType": "any", "costOperator": "any", "costValue": 0, "isEmpty": true } }
    ],
    "startingCash": 10,
    "startingDeckSize": 10,
    "startingDeckMaxCost": 0,
    // FIX: Add missing properties to satisfy GameConfig type.
    "isAnafEnabled": false,
    "anafPenaltyMode": "incremental"
  },
  "objective": {
    "type": "timeLimit",
    "value": 5
  },
  "players": [
    {
      "type": "human",
      "name": "Jucător Liber",
      "startingCash": 10
    }
  ],
  "predefinedMarket": [
    ["base-game:s121", "base-game:s135"],
    ["base-game:s128", "base-game:s142", "base-game:s132"],
    ["base-game:s148", "base-game:s158", "base-game:s133"],
    [],
    [],
    []
  ]
};

const ScenarioDocumentation: React.FC<{
  availableExpansions: { id: string, name: string }[];
  allAvailableEntrepreneurs: Card[];
}> = ({ availableExpansions, allAvailableEntrepreneurs }) => {
  const expansionIds = availableExpansions.map(e => e.id);
  const entrepreneurIds = allAvailableEntrepreneurs.map(e => e.globalId);
  const strategies = [ 'balanced', 'aggressive', 'profit-focused', 'early-rusher', 'deck-thinner' ];
  const skillLevels = [ 'novice', 'competent', 'expert', 'master' ];
  const bonusBuyRules = [ 'no_combo', 'infinite_combo', 'hybrid_combo' ];

  return (
    <div className="prose prose-invert max-w-none text-slate-300">
      <h2 className="text-2xl font-bold">Structura Fișierului JSON pentru Scenarii (Versiunea 1)</h2>
      <p>Acest document descrie formatul exact al obiectului JSON necesar pentru a încărca un scenariu de joc personalizat. Respectarea acestei structuri este esențială pentru validare.</p>
      
      <h3>Obiectul Principal</h3>
      <pre className="bg-slate-800 p-3 rounded-md"><code>{`{
  "version": 1,
  "scenarioName": "Numele Scenariului Meu",
  "activeExpansions": ["base-game", "events"],
  "gameConfig": { ... },
  "objective": { "type": "timeLimit", "value": 10 },
  "bannedCards": ["base-game:s001"],
  "players": [ { ... } ],
  // Alegeți UNA din opțiunile de mai jos pentru piață:
  "predefinedMarket": [ [ ... ], [ ... ], ... ],
  "marketConfig": [ { ... }, { ... }, ... ]
}`}</code></pre>

      <h3 className="mt-4">Detalii Câmpuri Globale</h3>

      <h4 className="font-bold text-lg"><code>version</code> (obligatoriu)</h4>
      <ul><li><strong>Valoare:</strong> Trebuie să fie exact <code>1</code>.</li></ul>
      
      <h4 className="font-bold text-lg"><code>scenarioName</code> (obligatoriu)</h4>
      <ul><li><strong>Tip:</strong> String. Numele scenariului.</li></ul>

      <h4 className="font-bold text-lg"><code>activeExpansions</code> (obligatoriu)</h4>
      <ul>
        <li><strong>Tip:</strong> Array de String-uri.</li>
        <li><strong>Descriere:</strong> ID-urile extensiilor active. <code>"base-game"</code> este aproape întotdeauna necesară.</li>
        <li><strong>Valori Posibile:</strong> <code>{JSON.stringify(expansionIds)}</code></li>
      </ul>
      
      <h4 className="font-bold text-lg"><code>gameConfig</code> (obligatoriu)</h4>
      <p>Un obiect ce configurează regulile specifice ale jocului.</p>
      <ul>
          <li><code>eventsStartYear</code> (Număr): Anul de joc din care încep să apară evenimentele.</li>
          <li><code>maxActiveConsultants</code> (Număr): Numărul maxim de consultanți activi simultan.</li>
          <li><code>shuffleMarketOnTurnEnd</code> (Boolean): <code>true</code> sau <code>false</code>.</li>
          <li><code>bonusBuyRule</code> (String): Regula pentru efectele de cumpărare în lanț. Valori posibile: <code>{JSON.stringify(bonusBuyRules)}</code>.</li>
      </ul>

      <h4 className="font-bold text-lg mt-4"><code>objective</code> (opțional)</h4>
      <p>Definește condiția de victorie. Dacă este omis, jocul este 'Joc Infinit'. Structura depinde de <code>type</code>:</p>
      <ul>
          <li><code>&#123; "type": "timeLimit", "value": 10 &#125;</code> (Jocul se termină după 10 ani)</li>
          <li><code>&#123; "type": "cashGoal", "value": 50 &#125;</code> (Jocul se termină când un jucător atinge 50$)</li>
          <li><code>&#123; "type": "capitalizationGoal", "value": 200 &#125;</code> (Jocul se termină când un jucător atinge o capitalizare de 200$)</li>
      </ul>
      
      <h4 className="font-bold text-lg mt-4"><code>bannedCards</code> (opțional)</h4>
      <ul>
        <li><strong>Tip:</strong> Array de String-uri (<code>string[]</code>).</li>
        <li><strong>Descriere:</strong> O listă de <code>globalId</code>-uri pentru cărțile care vor fi complet eliminate din joc pentru acest scenariu. Aceste cărți nu vor apărea nici pe piață, nici în pool-ul pentru construirea pachetului inițial.</li>
        <li><strong>Exemplu:</strong> <code>["base-game:s001", "consultants:c001"]</code></li>
      </ul>

      <h3 className="mt-6 text-xl text-yellow-300">Configurarea Pieței (Market)</h3>
      <p>Alegeți **o singură metodă** (un singur câmp) din cele de mai jos pentru a configura piața. Prezența ambelor va genera o eroare.</p>

      <h4 className="font-bold text-lg mt-4">Metoda A: Piață Predefinită (Control Absolut)</h4>
      <ul>
        <li><strong>Câmp JSON:</strong> <code>predefinedMarket</code> (opțional)</li>
        <li><strong>Tip:</strong> Array de 6 Array-uri de String-uri (<code>string[6][]</code>).</li>
        <li><strong>Descriere:</strong> Specificați exact ce cărți se află în fiecare din cele 6 grămezi și în ce ordine (prima carte este cea vizibilă). Perfect pentru puzzle-uri sau tutoriale.</li>
      </ul>

      <h4 className="font-bold text-lg mt-4">Metoda B: Piață Bazată pe Reguli (Control Strategic)</h4>
      <ul>
        <li><strong>Câmp JSON:</strong> <code>marketConfig</code> (opțional)</li>
        <li><strong>Tip:</strong> Array de 6 obiecte `MarketSlotConfig`.</li>
        <li><strong>Descriere:</strong> Definiți regulile de filtrare (cost, tip activ) pentru fiecare slot, la fel ca în meniul "Configurare Joc". Jocul va genera o piață aleatorie care respectă aceste reguli. Perfect pentru scenarii tematice.</li>
      </ul>
      <p>Fiecare obiect din array-ul <code>marketConfig</code> are următoarea structură:</p>
      <pre className="bg-slate-800 p-3 rounded-md"><code>{`{
  "title": "Numele Slotului",
  "filters": {
    "assetType": "corporal", // Valori: "any", "corporal", "uman", "necorporal"
    "costOperator": ">=",     // Valori: "any", "=", ">", "<", ">=", "<="
    "costValue": 2,          // Valoare numerică pentru operatorul de cost
    "isEmpty": false         // 'true' dacă slotul trebuie să fie gol (ex: slot extra)
  }
}`}</code></pre>
      
      <h4 className="font-bold text-lg mt-4">Metoda C: Piață Implicită (Fără Control)</h4>
      <ul>
        <li><strong>Câmp JSON:</strong> Omiteți <code>predefinedMarket</code> și <code>marketConfig</code>.</li>
        <li><strong>Descriere:</strong> Jocul va folosi setările personale de configurare a pieței ale jucătorului.</li>
      </ul>
      
      <h3 className="mt-6 text-xl text-yellow-300">Configurarea Jucătorilor (`players`)</h3>
      <p>Un array de obiecte, unde fiecare obiect definește un jucător (cel puțin unul).</p>
      <h5>Structura Obiectului Jucător:</h5>
      <ul>
          <li><code>type</code> (String): <code>"human"</code> sau <code>"ai"</code>.</li>
          <li><code>name</code> (String): Numele jucătorului.</li>
          <li><code>aiStrategy</code> / <code>aiSkillLevel</code> (String, opțional): Strategia și nivelul AI-ului.</li>
          <li><code>startingCash</code> (Număr): Suma de bani rămasă jucătorului **după** faza de construire a pachetului.</li>
      </ul>
      
      <h4 className="font-bold text-lg mt-4">1. Configurarea Antreprenorului (alegeți o metodă per jucător)</h4>
      <ul>
        <li><strong>Impunere:</strong> <code>forceEntrepreneurId: "globalId"</code>. Jucătorul primește acest antreprenor. Obligatoriu pentru AI. (Ex: "base-game:a101").</li>
        <li><strong>Listă Permisă:</strong> <code>allowedEntrepreneurIds: ["gid1", "gid2"]</code>. Jucătorul uman va alege doar din această listă de globalId-uri.</li>
        <li><strong>Selecție Liberă:</strong> Nu includeți niciunul. Jucătorul uman alege din toate extensiile active.</li>
      </ul>

      <h4 className="font-bold text-lg mt-4">2. Configurarea Pachetului Inițial (alegeți o metodă per jucător)</h4>
      <ul>
        <li><strong>Pachet Impus:</strong> <code>startingDeck: ["gid1", "gid2"]</code>. Jucătorul primește exact aceste cărți. Obligatoriu pentru AI.</li>
        <li><strong>Construire Ghidată:</strong> <code>deckBuilderConfig: &#123;...&#125;</code>. Jucătorul uman construiește pachetul cu un buget, o dimensiune și o listă de cărți (<code>pool</code>) impuse de scenariu.</li>
        <li><strong>Construire Liberă:</strong> Nu includeți `startingDeck` sau `deckBuilderConfig`. Jucătorul uman construiește pachetul folosind setările sale globale.</li>
      </ul>
      
      <h3 className="mt-4">Notă despre ID-uri</h3>
      <p>Un <code>globalId</code> este format din <code>"id_extensie:id_local"</code> (ex: <code>"base-game:s001"</code>). O listă completă se găsește în meniul principal -&gt; Regulament -&gt; Date Joc (JSON).</p>
    </div>
  );
};

const ScenarioLoader: React.FC<ScenarioLoaderProps> = ({ onStart, onBack, availableExpansions, allAvailableEntrepreneurs }) => {
  const [scenarioJson, setScenarioJson] = useState(JSON.stringify(placeholderScenario, null, 2));
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'loader' | 'docs'>('loader');

  const handleStart = () => {
    try {
      setError(null);
      const parsedJson = JSON.parse(scenarioJson);
      const validatedScenario = ScenarioSchema.parse(parsedJson);
      // FIX: Cast the validated object to the Scenario type to satisfy the onStart prop.
      // The Zod schema ensures the structure is correct.
      onStart(validatedScenario as Scenario);
    } catch (e) {
      if (e instanceof ZodError) {
        const firstError = e.issues[0];
        const path = firstError.path.join('.');
        setError(`Eroare de validare în câmpul '${path}': ${firstError.message}`);
      } else if (e instanceof SyntaxError) {
        setError(`Eroare de sintaxă JSON: ${e.message}`);
      } else if (e instanceof Error) {
        setError(`Eroare: ${e.message}`);
      } else {
        setError('A apărut o eroare necunoscută la validarea JSON-ului.');
      }
    }
  };

  return (
    <div className="w-full max-w-4xl bg-slate-800/80 backdrop-blur-sm rounded-lg p-8 shadow-2xl animate-fade-in text-white flex flex-col h-[90vh]">
      <h1 className="text-3xl font-bold text-center mb-4 uppercase tracking-wider">Încărcare Scenariu de Joc</h1>
      
      <div className="flex border-b border-slate-700 mb-4">
        <button
          onClick={() => setActiveTab('loader')}
          className={`px-6 py-3 text-lg font-semibold transition-colors duration-200 ${
            activeTab === 'loader'
              ? 'border-b-2 border-blue-500 text-blue-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Loader
        </button>
        <button
          onClick={() => setActiveTab('docs')}
          className={`px-6 py-3 text-lg font-semibold transition-colors duration-200 ${
            activeTab === 'docs'
              ? 'border-b-2 border-blue-500 text-blue-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Documentație JSON
        </button>
      </div>

      {activeTab === 'loader' && (
        <div className="flex-grow flex flex-col">
          <p className="text-center text-slate-400 mb-6">Lipește conținutul fișierului JSON de configurare în căsuța de mai jos pentru a începe o lecție sau un scenariu predefinit.</p>
          <textarea
            value={scenarioJson}
            onChange={(e) => setScenarioJson(e.target.value)}
            placeholder="Lipește JSON-ul aici..."
            className="w-full flex-grow p-4 bg-slate-900 text-slate-300 font-mono text-sm border-2 border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          {error && <p className="mt-2 text-red-400 text-sm font-semibold bg-red-900/50 p-2 rounded-md border border-red-700">{error}</p>}
        </div>
      )}

      {activeTab === 'docs' && (
        <div className="flex-grow overflow-y-auto pr-4 bg-slate-900/50 p-4 rounded-md">
          <ScenarioDocumentation availableExpansions={availableExpansions} allAvailableEntrepreneurs={allAvailableEntrepreneurs} />
        </div>
      )}

      <div className="mt-6 flex justify-between items-center flex-shrink-0">
        <button
          onClick={onBack}
          className="px-8 py-3 bg-slate-600 text-white font-bold rounded-lg shadow-md hover:bg-slate-700 transition-colors"
        >
          Înapoi la Meniu
        </button>
        <button
          onClick={handleStart}
          className="px-10 py-4 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-colors text-2xl"
        >
          Pornește Scenariul
        </button>
      </div>
    </div>
  );
};

export default ScenarioLoader;