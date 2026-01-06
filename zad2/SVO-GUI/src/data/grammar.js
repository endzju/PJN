import { IRREGULARS } from "./words";

export const pluralize = (noun) => {
  const IRREGULAR_PLURAL_NOUNS = {
    person: "people",
    man: "men",
    woman: "women",
    child: "children",
  };

  const UNCOUNTABLE_NOUNS = ["water", "money", "trash", "information"];

  if (IRREGULAR_PLURAL_NOUNS[noun]) return IRREGULAR_PLURAL_NOUNS[noun];

  if (UNCOUNTABLE_NOUNS.includes(noun)) return noun;

  if (noun.endsWith("y") && !["a", "e", "i", "o", "u"].includes(noun[-2]))
    return noun.slice(0, -1) + "ies";
  if (noun.endsWith("s") || noun.endsWith("ch") || noun.endsWith("x"))
    return noun + "es";

  return noun + "s";
};

export const getPronoun = (person, number) => {
  if (person === "1") return number === "singular" ? "I" : "we";
  if (person === "2") return "you";
  if (person === "3") return number === "singular" ? "he/she/it" : "they";

  return "it";
};

export const buildNounPhrase = (config) => {
  if (config.type === "pronoun") {
    return {
      text: getPronoun(config.person, config.number),
      isPlural: config.number === "plural" || config.person === "2",
      isFirstPerson: config.person === "1" && config.number === "singular",
      isThirdPerson: config.person === "3" && config.number === "singular",
    };
  } else {
    let text = config.noun;
    if (config.number === "plural") text = pluralize(text);

    if (config.variant === "adj+noun") {
      text = `${config.adj} ${text}`;
    }

    let det = config.determiner;
    if (config.variant === "det+noun") {
      if (det === "a" && ["a", "e", "i", "o", "u"].includes(text[0])) {
        det = "an";
      }

      if (config.number === "plural" && (det === "a" || det === "an")) {
        det = "";
      }

      if (config.number === "plural" && (det === "this" || det === "that")) {
        det = det === "this" ? "these" : "those";
      }

      text = det ? `${det} ${text}` : text;
    }

    return {
      text,
      isPlural: config.number === "plural",
      isFirstPerson: false,
      isThirdPerson: config.number === "singular",
    };
  }
};

export const getV3 = (verb) => {
  if (IRREGULARS[verb]) return IRREGULARS[verb]["part"];
  if (verb.endsWith("e")) return verb + "d";
  return verb + "ed";
};

export const getV2 = (verb) => {
  if (IRREGULARS[verb]) return IRREGULARS[verb]["past"];
  if (verb.endsWith("e")) return verb + "d";
  return verb + "ed";
};

export const getIng = (verb) => {
  const doubleConsVerbs = [
    "put",
    "run",
    "get",
    "let",
    "set",
    "sit",
    "stop",
    "win",
    "cut",
    "begin",
  ];
  if (verb === "be") return "being";
  if (doubleConsVerbs.includes(verb)) return verb + verb.slice(-1) + "ing";
  if (verb.endsWith("ie")) return verb.slice(0, -2) + "ying";
  if (verb.endsWith("e") && !["see", "be"].includes(verb))
    return verb.slice(0, -1) + "ing";

  return verb + "ing";
};

export const conjugateVerb = (
  verbBase,
  tense,
  sentenceType,
  modal,
  subjectProps
) => {
  let main = verbBase;
  let aux = "";
  const applyNegation = (operator) =>
    sentenceType === "negative" ? `${operator} not` : operator;

  if (modal) {
    if (sentenceType === "question") return { aux: modal, main: verbBase };
    if (sentenceType === "negative")
      return { aux: "", main: `${modal} not ${verbBase}` };

    return { aux: "", main: `${modal} ${verbBase}` };
  }

  if (tense === "present_simple") {
    if (verbBase === "be") {
      let form = "";
      if (subjectProps.isFirstPerson) form = "am";
      else if (subjectProps.isThirdPerson) form = "is";
      else form = "are";

      if (sentenceType === "question") return { aux: form, main: "" };
      return { aux: "", main: applyNegation(form) };
    }

    if (sentenceType === "affirmative") {
      if (subjectProps.isThirdPerson) {
        if (IRREGULARS[verbBase]?.third) main = IRREGULARS[verbBase].third;
        else main = pluralize(verbBase); // zasady dodawania 's' są prawie identyczne
      }
      return { aux: "", main };
    } else {
      let doForm = subjectProps.isThirdPerson ? "does" : "do";
      if (sentenceType === "question") return { aux: doForm, main: verbBase };

      return { aux: "", main: `${doForm} not ${verbBase}` };
    }
  }

  if (tense === "past_simple") {
    if (verbBase === "be") {
      let form = "";
      if (subjectProps.isThirdPerson || subjectProps.isFirstPerson)
        form = "was";
      else form = "were";

      if (sentenceType === "question") return { aux: form, main: "" };
      return { aux: "", main: applyNegation(form) };
    }

    if (sentenceType === "affirmative")
      return { aux: "", main: getV2(verbBase) };
    if (sentenceType === "question") return { aux: "did", main: verbBase };
    return { aux: "", main: `did not ${verbBase}` };
  }

  if (tense === "future_simple") {
    if (sentenceType === "question") return { aux: "will", main: verbBase };
    if (sentenceType === "negative")
      return { aux: "", main: "will not " + verbBase };

    return { aux: "", main: "will " + verbBase };
  }

  // -------- CONTINUOUS TENSES --------------------
  if (tense.includes("continuous")) {
    const ingForm = getIng(verbBase);
    let beAux = "";

    if (tense === "present_continuous") {
      beAux = subjectProps.isFirstPerson
        ? "am"
        : subjectProps.isThirdPerson
        ? "is"
        : "are";
    } else if (tense === "past_continuous") {
      beAux =
        subjectProps.isFirstPerson || subjectProps.isThirdPerson
          ? "was"
          : "were";
    } else if (tense === "future_continuous") {
      if (sentenceType === "question")
        return { aux: "will", main: `be ${ingForm}` };

      return {
        aux: "",
        main:
          sentenceType === "negative"
            ? `will not be ${ingForm}`
            : `will be ${ingForm}`,
      };
    }

    if (sentenceType === "question") return { aux: beAux, main: ingForm };

    return { aux: "", main: `${applyNegation(beAux)} ${ingForm}` };
  }

  // -------- PERFECT TENSES ---------------
  if (tense.includes("perfect")) {
    const v3Form = getV3(verbBase);
    let haveAux = "";

    if (tense === "present_perfect") {
      haveAux = subjectProps.isThirdPerson ? "has" : "have";
    } else if (tense === "past_perfect") {
      haveAux = "had";
    } else if (tense === "future_perfect") {
      if (sentenceType === "question")
        return { aux: "will", main: `have ${v3Form}` };

      return {
        aux: "",
        main:
          sentenceType === "negative"
            ? `will not have ${v3Form}`
            : `will have ${v3Form}`,
      };
    }

    if (sentenceType === "question") return { aux: haveAux, main: v3Form };

    return { aux: "", main: `${applyNegation(haveAux)} ${v3Form}` };
  }

  return { aux, main };
};
