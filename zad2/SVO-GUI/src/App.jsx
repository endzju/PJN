import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import { buildNounPhrase, conjugateVerb } from "./data/grammar";
import wordData from "./data/data.json";
import Section from "./components/Section";
import NPBuilder from "./components/NPBuilder";
import Select from "./components/Select";
import { VERBS } from "./data/words";

function App() {
  const sortedVerbs = useMemo(() => [...VERBS].sort(), []);

  const [subject, setSubject] = useState({
    type: "pronoun",
    person: "1",
    number: "singular",
    noun: "cat",
    adj: "big",
    determiner: "the",
    variant: "noun",
  });

  const [verb, setVerb] = useState({
    type: "affirmative",
    tense: "present_simple",
    lex: "be",
    modal: "",
  });

  const [object, setObject] = useState({
    type: "noun",
    person: "3",
    number: "singular",
    noun: "apple",
    adj: "red",
    determiner: "a",
    variant: "noun",
  });

  const [sentence, setSentence] = useState("");

  const getFrequencyColor = (type, w1, w2) => {
    if (!w1 || !w2) return "";
    const key = `${w1.toLowerCase()}-${w2.toLowerCase()}`;
    const count = wordData[type]?.[key] || 0;

    if (count === 0) return "border-red-500";
    if (count === 1) return "border-yellow-400";
    if (count <= 10) return "border-green-500";
    return "border-blue-600";
  };

  const [colors, setColors] = useState({
    subjAdj: "",
    subjVerb: "",
    verbObj: "",
    objAdj: "",
  });

  useEffect(() => {
    const subjPhrase = buildNounPhrase(subject);
    const objPhrase = buildNounPhrase(object);

    const verbPhrase = conjugateVerb(
      verb.lex,
      verb.tense,
      verb.type,
      verb.modal,
      subjPhrase
    );

    // Calculate Frequencies
    const newColors = {
      subjAdj: "",
      subjVerb: "",
      verbObj: "",
      objAdj: ""
    };

    // 1. Subject Adj-Noun
    if (subject.variant === "adj+noun") {
      newColors.subjAdj = getFrequencyColor("adj-noun", subject.adj, subject.noun);
    }

    // 2. Subj-Verb (Noun + Verb)
    newColors.subjVerb = getFrequencyColor("subj-verb", subject.noun, verb.lex);

    // 3. Verb-Obj (Verb + Noun)
    newColors.verbObj = getFrequencyColor("verb-obj", verb.lex, object.noun);

    // 4. Object Adj-Noun
    if (object.variant === "adj+noun") {
      newColors.objAdj = getFrequencyColor("adj-noun", object.adj, object.noun);
    }

    setColors(newColors);

    let finalSentence = "";

    if (verb.type == "question") {
      const vMain = verbPhrase.main ? ` ${verbPhrase.main}` : "";
      finalSentence = `${verbPhrase.aux} ${subjPhrase.text}${vMain} ${objPhrase.text}?`;
    } else {
      const fullVerb = verbPhrase.aux
        ? `${verbPhrase.aux} ${verbPhrase.main}`
        : verbPhrase.main;
      finalSentence = `${subjPhrase.text} ${fullVerb} ${objPhrase.text}.`;
    }

    finalSentence =
      finalSentence.charAt(0).toUpperCase() + finalSentence.slice(1);
    finalSentence = finalSentence.replace(/\s+/g, " ").trim();

    setSentence(finalSentence);
  }, [subject, verb, object]);

  return (
    <div className="font-sans p-5 bg-slate-100 min-h-screen">
      <h1 className="text-center text-neutral-700 mb-5">
        Kreator Zdań SVO (Angielski)
      </h1>

      <div className="p-5 bg-zinc-800 text-white text-2xl text-center rounded-lg mb-5 shadow-md">
        {sentence}
      </div>

      <div className="flex flex-row flex-wrap gap-2.5">
        <Section
          title="1. Podmiot (Subject)"
          color="border-orange-600 text-orange-600"
        >
          <NPBuilder config={subject} setConfig={setSubject} label="Podmiot" freqColor={colors.subjAdj} />
        </Section>

        <Section
          title="2. Orzeczenie (Verb)"
          color="border-sky-500 text-sky-500"
          freqColor={colors.subjVerb}
        >
          <Select
            label="Tryb"
            value={verb.type}
            options={[
              { val: "affirmative", label: "Twierdzenie" },
              { val: "negative", label: "Przeczenie" },
              { val: "question", label: "Pytanie" },
            ]}
            onChange={(v) => setVerb({ ...verb, type: v })}
          />
          <Select
            label="Czas"
            value={verb.tense}
            options={[
              { val: "present_simple", label: "Present Simple" },
              { val: "present_continuous", label: "Present Continuous" },
              { val: "present_perfect", label: "Present Perfect" },
              { val: "past_simple", label: "Past Simple" },
              { val: "past_continuous", label: "Past Continuous" },
              { val: "past_perfect", label: "Past Perfect" },
              { val: "future_simple", label: "Future Simple" },
              { val: "future_continuous", label: "Future Continuous" },
              { val: "future_perfect", label: "Future Perfect" },
            ]}
            onChange={(v) => setVerb({ ...verb, tense: v })}
          />
          <Select
            label="Czasownik Modalny (opcj.)"
            value={verb.modal}
            options={[
              { val: "", label: "-- Brak --" },
              { val: "can", label: "can" },
              { val: "should", label: "should" },
              { val: "would", label: "would" },
              { val: "must", label: "must" },
              { val: "may", label: "may" },
            ]}
            onChange={(v) => setVerb({ ...verb, modal: v })}
          />
          <Select
            label="Czasownik Główny"
            value={verb.lex}
            options={sortedVerbs}
            onChange={(v) => setVerb({ ...verb, lex: v })}
          />
        </Section>

        <Section
          title="3. Dopełnienie (Object)"
          color="border-green-500 text-green-500"
          freqColor={colors.verbObj}
        >
          <NPBuilder
            config={object}
            setConfig={setObject}
            label="Dopełnienie"
            freqColor={colors.objAdj}
          />
        </Section>
      </div>
    </div>
  );
}

export default App;
