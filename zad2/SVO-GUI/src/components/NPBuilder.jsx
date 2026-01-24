import { useMemo } from "react";
import Select from "./Select";
import { DETERMINES, ADJECTIVES, NOUNS } from "../data/words";

const NPBuilder = ({ config, setConfig, freqColor }) => {
  const buttonBase = "px-3 py-1.5 text-sm rounded-md transition-all";
  const activeBtn = "bg-slate-800 text-white font-bold shadow-md";
  const inactiveBtn = "bg-slate-100 text-slate-600 hover:bg-slate-200";

  const sortedNouns = useMemo(() => [...NOUNS].sort(), []);
  const sortedAdjectives = useMemo(() => [...ADJECTIVES].sort(), []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
        <button
          className={`${buttonBase} flex-1 ${config.type === "pronoun" ? activeBtn : inactiveBtn
            }`}
          onClick={() => setConfig({ ...config, type: "pronoun" })}
        >
          Zaimek
        </button>
        <button
          className={`${buttonBase} flex-1 ${config.type === "noun" ? activeBtn : inactiveBtn
            }`}
          onClick={() => setConfig({ ...config, type: "noun" })}
        >
          Rzeczownik
        </button>
      </div>

      <div className="space-y-3">
        {config.type === "pronoun" ? (
          <>
            <Select
              label="Osoba"
              value={config.person}
              options={[
                { val: "1", label: "1. (Ja/My)" },
                { val: "2", label: "2. (Ty/Wy)" },
                { val: "3", label: "3. (On/Oni)" },
              ]}
              onChange={(v) => setConfig({ ...config, person: v })}
            />
            <Select
              label="Liczba"
              value={config.number}
              options={[
                { val: "singular", label: "Pojedyncza" },
                { val: "plural", label: "Mnoga" },
              ]}
              onChange={(v) => setConfig({ ...config, number: v })}
            />
          </>
        ) : (
          <>
            <Select
              label="Wariant"
              value={config.variant}
              options={[
                { val: "noun", label: "Sam rzeczownik" },
                { val: "adj+noun", label: "Przymiotnik + Rzecz." },
                { val: "det+noun", label: "Determinator + Rzecz." },
              ]}
              onChange={(v) => setConfig({ ...config, variant: v })}
            />
            {config.variant === "det+noun" && (
              <Select
                label="Determinator"
                value={config.determiner}
                options={DETERMINES}
                onChange={(v) => setConfig({ ...config, determiner: v })}
              />
            )}
            {config.variant === "adj+noun" && (
              <div
                className={`p-2 rounded-lg border-2 border-solid ${freqColor || "border-transparent"
                  }`}
              >
                <Select
                  label="Przymiotnik"
                  value={config.adj}
                  options={sortedAdjectives}
                  onChange={(v) => setConfig({ ...config, adj: v })}
                />
                <Select
                  label="Rzeczownik"
                  value={config.noun}
                  options={sortedNouns}
                  onChange={(v) => setConfig({ ...config, noun: v })}
                />
              </div>
            )}
            {config.variant !== "adj+noun" && (
              <Select
                label="Rzeczownik"
                value={config.noun}
                options={sortedNouns}
                onChange={(v) => setConfig({ ...config, noun: v })}
              />
            )}
            <Select
              label="Liczba"
              value={config.number}
              options={[
                { val: "singular", label: "Pojedyncza" },
                { val: "plural", label: "Mnoga" },
              ]}
              onChange={(v) => setConfig({ ...config, number: v })}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default NPBuilder;
