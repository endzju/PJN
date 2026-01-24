# PJN

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/endzju/PJN.git
   ```
2. Choose the project
   ```sh
   cd zad1/zipf_law
   ```
   or
   ```sh
   cd zad2/SVO-GUI
   ```
   or
   ```sh
   cd zad3/FrequencyChecker
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Run application
   ```sh
   npm run dev
   ```

## Project Descriptions


### 2. SVO Sentence Builder (zad2)
An interactive Sentence-Verb-Object (SVO) sentence constructor.
- Build sentences by selecting Subject, Verb, and Object.
- Handles grammar rules (conjugations, pluralization, determiners).
- **Integrated Frequency Checking**:
    - As you build sentences, the application checks if your word pairs (Subject-Verb, Verb-Object, Adjective-Noun) appear in a real-world corpus (logic from zad3). For Subject-Verb and Verb-Object pairs, border of the section of the second one changes its color, for Adjective-Noun pairs, border shows when the option is selected.
    - **Color Legend**:
      - <span style="color:red">**Red**</span>: Never occurs (0).
      - <span style="color:orange">**Yellow**</span>: Single occurrence (1).
       - <span style="color:green">**Green**</span>: Few occurrences (2-10).
      - <span style="color:blue">**Blue**</span>: Common collocation (>10).

### 3. Collocation Frequency Checker (zad3)
A tool for checking word collocation frequencies in english language based on a corpus from 2024.
- Analyze pairs: Subject-Verb, Verb-Object, Adjective-Noun.
- **Color Legend**:
    - <span style="color:red">**Red**</span>: Never occurs (0).
    - <span style="color:orange">**Yellow**</span>: Single occurrence (1).
    - <span style="color:green">**Green**</span>: Few occurrences (2-10).
    - <span style="color:blue">**Blue**</span>: Common collocation (>10).
