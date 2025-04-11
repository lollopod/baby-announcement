import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { styled, createStitches } from "@stitches/react";

const { css } = createStitches({
  theme: {
    colors: {
      background: "#fef6e4",
      card: "#fff",
      primary: "#8bd3dd",
      primaryDark: "#5db6c2",
      text: "#001858",
      selectedLang: "#1e90ff",
    },
    fonts: {
      body: "'Comic Neue', cursive",
    },
  },
});

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

const Container = styled("div", {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  //background: "url('/linz-cartoon-bg.jpg') center/cover no-repeat",
  padding: "2rem",
  fontFamily: "$body",
});

const Card = styled("div", {
  backgroundColor: "$card",
  borderRadius: "24px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
  padding: "2.5rem",
  maxWidth: "500px",
  width: "100%",
  textAlign: "center",
  color: "$text",
});

const LangSelect = styled("div", {
  marginBottom: "1.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
});

const LangButton = styled("button", {
  padding: "0.4rem 0.8rem",
  fontSize: "0.9rem",
  backgroundColor: "$primary",
  color: "$text",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontFamily: "$body",
  '&:hover': {
    backgroundColor: "$primaryDark",
  },
  variants: {
    selected: {
      true: {
        backgroundColor: "$selectedLang",
        color: "white",
      }
    }
  }
});

const Scrambled = styled("div", {
  fontSize: "2.25rem",
  letterSpacing: "0.4rem",
  fontWeight: "bold",
  marginBottom: "1.25rem",
});

const Input = styled("input", {
  padding: "0.6rem 1rem",
  fontSize: "1.1rem",
  marginBottom: "1rem",
  border: "2px dashed #ccc",
  borderRadius: "12px",
  width: "100%",
  boxSizing: "border-box",
  fontFamily: "$body",
});

const Button = styled("button", {
  padding: "0.85rem 1.8rem",
  fontSize: "1rem",
  backgroundColor: "$primary",
  color: "$text",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",

  '&:hover': {
    backgroundColor: "$primaryDark",
  },
});

const Photo = styled("img", {
  marginTop: "1.5rem",
  width: "100%",
  borderRadius: "20px",
  border: "4px solid #8bd3dd",
});

function App() {
  const [lang, setLang] = useState("en");
  const [guess, setGuess] = useState("");
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2);
    if (translations[browserLang]) {
      setLang(browserLang);
    }

    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audio.play().catch(() => {});
  }, []);

  const t = translations[lang];

  return (
    <Container>
      <Card>
        <LangSelect>
          {Object.keys(translations).map((code) => (
            <LangButton key={code} selected={lang === code} onClick={() => setLang(code)}>
              {code.toUpperCase()}
            </LangButton>
          ))}
        </LangSelect>

        {!revealed && (
          <>
            <h1>{t.welcome}</h1>
            <p>{t.intro}</p>
          </>
        )}

        {!revealed && (
          <>
            <Photo src="/parents-illustration.png" alt="Cartoon of parents" style={{ marginBottom: "1.5rem" }} />
            <Scrambled>{scrambledName}</Scrambled>
            <Input
              value={guess}
              onChange={(e) => setGuess(e.target.value.toUpperCase())}
              placeholder="Type your guess..."
            />
            <Button onClick={() => guess === babyName && setRevealed(true)}>
              {t.button}
            </Button>
          </>
        )}

        {revealed && (
          <div>
            <h2>{t.correct}</h2>
            <Photo src="/baby.jpg" alt="Our baby" />
            <p>{t.details}</p>
          </div>
        )}
      </Card>
    </Container>
  );
}

const container = document.getElementById("root");
createRoot(container).render(<App />);

export default App;
