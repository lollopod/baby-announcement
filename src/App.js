import React, { useState, useEffect } from "react";

const translations = {
  en: {
    welcome: "We're thrilled to announce...",
    intro: "Can you guess our baby's name? Unscramble the letters!",
    button: "Guess",
    correct: "Correct! Meet our baby:",
    details: "Born on April 10, 2025. 3.2kg, 50cm.",
  },
  pt: {
    welcome: "Estamos muito felizes em anunciar...",
    intro: "Você consegue adivinhar o nome do nosso bebê? Desembaralhe as letras!",
    button: "Adivinhar",
    correct: "Correto! Conheça o nosso bebê:",
    details: "Nascido em 10 de abril de 2025. 3,2kg, 50cm.",
  },
  it: {
    welcome: "Siamo felicissimi di annunciare...",
    intro: "Riesci a indovinare il nome del nostro bambino? Riordina le lettere!",
    button: "Indovina",
    correct: "Esatto! Ecco il nostro bambino:",
    details: "Nato il 10 aprile 2025. 3,2kg, 50cm.",
  },
  de: {
    welcome: "Wir freuen uns sehr, bekannt zu geben...",
    intro: "Kannst du den Namen unseres Babys erraten? Sortiere die Buchstaben!",
    button: "Raten",
    correct: "Richtig! Hier ist unser Baby:",
    details: "Geboren am 10. April 2025. 3,2kg, 50cm.",
  },
};

const babyName = "SOPHIA";
const scrambledName = babyName.split("").sort(() => 0.5 - Math.random()).join("");

function App() {
  const [lang, setLang] = useState("en");
  const [guess, setGuess] = useState("");
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audio.play().catch(() => {});
  }, []);

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-orange-50 text-center p-6">
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="lang" className="block font-medium mb-1">
            Language:
          </label>
          <select
            id="lang"
            className="p-2 rounded border"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="en">English</option>
            <option value="pt">Português</option>
            <option value="it">Italiano</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
        <h1 className="text-2xl font-bold mb-2">{t.welcome}</h1>
        <p>{t.intro}</p>

        {!revealed && (
          <div className="mt-6">
            <div className="text-3xl tracking-widest font-mono mb-2">{scrambledName}</div>
            <input
              className="p-2 border rounded w-full mb-2"
              value={guess}
              onChange={(e) => setGuess(e.target.value.toUpperCase())}
              placeholder="Type your guess..."
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                if (guess === babyName) setRevealed(true);
              }}
            >
              {t.button}
            </button>
          </div>
        )}

        {revealed && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">{t.correct}</h2>
            <img
              src="/baby.jpg"
              alt="Our baby"
              className="rounded-2xl shadow-md mx-auto w-full max-w-xs mb-4"
            />
            <p>{t.details}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
