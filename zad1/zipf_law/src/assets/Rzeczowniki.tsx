import { useState, useEffect } from 'react'

// Definiujemy strukturę pojedynczego obiektu z Twojego pliku
interface Slowo {
  den: string;
  pol: string;
}

export default function Rzeczowniki() {
  const [data, setData] = useState<Slowo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/zipf/rzeczowniki.json')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Ładowanie...</p>;

  return (
    <div>
      <p>Lista rzeczowników (Duński - Polski):</p>
      <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid white' }}>
            <th>Duński (den)</th>
            <th>Polski (pol)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #333' }}>
              <td style={{ padding: '8px' }}>{item.den}</td>
              <td style={{ padding: '8px' }}>{item.pol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}