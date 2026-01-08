import os.path

import spacy
import json
from collections import Counter
from tqdm import tqdm
import os

nlp = spacy.load("en_core_web_sm")


def generate_corpus_data(file_path):

    file_size = os.path.getsize(file_path)

    data = {
        "subj-verb": Counter(),
        "verb-obj": Counter(),
        "adj-noun": Counter()
    }

    pbar = tqdm(total=file_size, unit='B', unit_scale=True, desc="Przetwarzanie korpusu")

    with open(file_path, 'r', encoding='utf-8') as f:
        for doc in nlp.pipe(f, batch_size=20):
            for token in doc:
                lemma = token.lemma_.lower()

                if token.dep_ == "nsubj" and token.head.pos_ == "VERB":
                    pair = f"{lemma}-{token.head.lemma_.lower()}"
                    data["subj-verb"][pair] += 1

                if token.dep_ in ["obj", "dobj"] and token.head.pos_ == "VERB":
                    pair = f"{token.head.lemma_.lower()}-{lemma}"
                    data["verb-obj"][pair] += 1

                if token.dep_ == "amod" and token.head.pos_ == "NOUN":
                    pair = f"{lemma}-{token.head.lemma_.lower()}"
                    data["adj-noun"][pair] += 1

            pbar.update(len(doc.text.encode('utf-8')))

    pbar.close()

    final_data = {category: dict(counts) for category, counts in data.items()}
    return final_data


results = generate_corpus_data('./24-US.txt')

with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=4)

print("Plik data.json został wygenerowany pomyślnie!")
