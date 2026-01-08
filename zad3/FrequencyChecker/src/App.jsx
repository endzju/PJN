import { useState } from "react";
import "./App.css";
import wordData from "./corpus/data.json";

const App = () => {
  const [type, setType] = useState("adj-noun");
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");

  const getColor = () => {
    const key = `${word1.toLowerCase()}-${word2.toLowerCase()}`;
    const count = wordData[type][key] || 0;

    if (count == 0) return "bg-red-500 text-white";
    if (count == 1) return "bg-yellow-400 text-black";
    if (count > 1 && count <= 10) return "bg-green-500 text-white";
    return "bg-blue-600 text-white";
  };

  const statusLabel = () => {
    const key = `${word1.toLowerCase()}-${word2.toLowerCase()}`;
    const count = wordData[type][key] || 0;

    if (count == 0) return "Nigdy nie występuje";
    if (count == 1) return "Pojedyncze wystąpienie (możliwy błąd)";
    if (count > 1 && count <= 10) return "Występuje kilka razy";
    return "Powszechnie używane";
  };

  return (
    <div className="p-8 max-w-2xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Analiza Angielskich Kolokacji
      </h1>
      <div className="space-y-4 bg-gray-50 p-6 rounded-xl shadow-sm">
        <div>
          <label className="block text-sm font-medium mb-1">
            Rodzaj połączenia:
          </label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="subj-verb">Podmiot - Orzeczenie</option>
            <option value="verb-obj">Orzeczenie - Dopełnienie</option>
            <option value="adj-noun">Przymiotnik - Rzeczownik</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Słowo 1"
            value={word1}
            onChange={(e) => setWord1(e.target.value)}
            className="p-2 border rounded-md"
          />
          <input
            placeholder="Słowo 2"
            value={word2}
            onChange={(e) => setWord2(e.target.value)}
            className="p-2 border rounded-md"
          />
        </div>

        {word1 && word2 && (
          <div
            className={`mt-6 p-6 rounded-lg transition-colors duration-300 text-center ${getColor()}`}
          >
            <p className="text-lg font-semibold uppercase tracking-wider">
              {statusLabel()}
            </p>
            <p className="text-sm opacity-90 mt-1 italic">
              Para: {word1} + {word2}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
