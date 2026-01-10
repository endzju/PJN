import { useState, useEffect } from 'react'

export default function Core() {
  const [data, setData] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/zipf/topcore_10000.json')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Ładowanie...</p>;

  return (
    <div>
      <p>Rdzeń języka Duńskiego:</p>
      <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid white' }}>
            <th>Słowo</th>
            <th>Liczba wystąpień</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([word, count], index) => (
            <tr key={index} style={{ borderBottom: '1px solid #333' }}>
              <td>{word}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}