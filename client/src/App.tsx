import { useEffect, useState } from 'react';
import { Database, Play, RotateCcw, Table2 } from 'lucide-react';

const API = 'http://localhost:3000/api';
const examples = [
  { label: 'Create users table', query: 'CREATE TABLE users (id INT, name TEXT);' },
  { label: 'Insert a user', query: "INSERT INTO users VALUES (1, 'Nitin');" },
  { label: 'Select all users', query: 'SELECT * FROM users;' },
  { label: 'Find user by id', query: 'SELECT * FROM users WHERE id = 1;' },
];

export default function App() {
  const [query, setQuery] = useState(examples[2].query);
  const [output, setOutput] = useState('Run a query to see the result here.');
  const [ok, setOk] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tables, setTables] = useState<string[]>([]);

  const loadTables = async () => {
    try {
      const response = await fetch(`${API}/tables`);
      const data = await response.json();
      setTables(data.tables ?? []);
    } catch {
      setTables([]);
    }
  };

  useEffect(() => {
    loadTables();
  }, []);

  const runQuery = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(`${API}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();

      setOk(Boolean(data.ok));
      setOutput(data.output ?? data.message ?? 'Request failed.');
      await loadTables();
    } catch {
      setOk(false);
      setOutput('Could not reach the local API. Start the NestJS server on port 3000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-shell">
      <header>
        <div className="brand">
          <Database size={25} />
          <div>
            <h1>MiniDB</h1>
            <p>SQL playground</p>
          </div>
        </div>
        <span className="local-badge">Local engine</span>
      </header>

      <section className="workspace">
        <aside className="input-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">SQL COMMAND</span>
              <h2>Write a query</h2>
            </div>
            <button className="clear-button" onClick={() => setQuery('')} aria-label="Clear query">
              <RotateCcw size={16} /> Clear
            </button>
          </div>

          <textarea
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            spellCheck="false"
            aria-label="SQL query editor"
          />

          <button className="run-button" onClick={runQuery} disabled={loading}>
            <Play size={17} fill="currentColor" />
            {loading ? 'Running query...' : 'Run query'}
          </button>

          <div className="tables">
            <div className="table-title">
              <Table2 size={16} /> Tables
            </div>
            {tables.length ? (
              tables.map((table) => (
                <button key={table} onClick={() => setQuery(`SELECT * FROM ${table};`)}>
                  {table}
                </button>
              ))
            ) : (
              <p>No tables yet.</p>
            )}
          </div>
        </aside>

        <section className="output-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">CURRENT QUERY OUTPUT</span>
              <h2>Result</h2>
            </div>
            <span className={ok ? 'status success' : 'status error'}>
              {ok ? 'Ready' : 'Error'}
            </span>
          </div>

          <pre className={ok ? 'result success' : 'result error'}>{output}</pre>

          <div className="hint">
            Supports CREATE TABLE, INSERT, SELECT, UPDATE, DELETE, and equality-based WHERE
            filters.
          </div>
        </section>
      </section>
    </main>
  );
}
