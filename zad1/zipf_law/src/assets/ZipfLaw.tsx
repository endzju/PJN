import { useState, useEffect } from 'react'

export default function ZipfLaw(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/zipf/zipf.json') 
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
        console.log(json);
      })
  }, []);

  if (loading) return <p>Ładowanie...</p>;
    
  return <>
    <div>
      <p>Prawo Zipfa w języku duńskim:</p>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #ccc' }}>
          <th style={{ textAlign: 'left' }}>Słowo</th>
          <th style={{ textAlign: 'left' }}>&nbsp;&nbsp;Występowanie&nbsp;&nbsp;</th>
          <th style={{ textAlign: 'left' }}>Stała Zipfa</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(data).map((element, index) => (
          <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
            <td>{element[0]}</td>
            <td>{element[1]}%</td>
            <td>{element[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  </>
}