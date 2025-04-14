import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { styled, createStitches } from "@stitches/react";
import { Clock, CalendarDays, Ruler, Weight, Download, LucideExternalLink } from "lucide-react";
import html2canvas from "html2canvas";
import { keyframes } from "@stitches/react";



import parentsIllustration from "./assets/parents-illustration.png";
import babyPhoto from "./assets/baby.jpg";
import easterFrame from "./assets/easter-frame.png";

const fadeIn = keyframes({
  from: { opacity: 0, transform: "translateY(-5px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

const shake = keyframes({
  '0%': { transform: 'translateX(0)' },
  '25%': { transform: 'translateX(-5px)' },
  '50%': { transform: 'translateX(5px)' },
  '75%': { transform: 'translateX(-5px)' },
  '100%': { transform: 'translateX(0)' },
});

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
      body: "'Trebuchet MS', sans-serif",
    },
  },
});

const babyName = "LUCA";

const translations = {
  en: {
    welcome: "We're thrilled to announce...",
    intro: "Can you guess our baby's name? Unscramble the letters!",
    button: "Guess",
    correct: `Correct! Meet ${babyName}. Mum and baby are doing great!`,
    details: ["10:45", "April 14, 2025", "3.8kg", "50cm"],
    wrong: "Oops! Try again.",
    download: "Download keepsake image",
    type: "Type your guess..."
  },
  pt: {
    welcome: "Estamos muito felizes em anunciar...",
    intro: "Você consegue adivinhar o nome do nosso bebê? Desembaralhe as letras!",
    button: "Adivinhar",
    correct:`Correto! Conheça ${babyName}. Mae e ninho estao muito bem!`,
    details: ["10:45", "14 de abril de 2025", "3,2kg", "50cm"],
    wrong: "Ops! Tente novamente.",
    download: "Baixar imagem comemorativa",
    type: "Digite o seu palpite..."
  },
  it: {
    welcome: "Siamo felicissimi di annunciare...",
    intro: "Riesci a indovinare il nome del nostro bambino? Riordina le lettere!",
    button: "Indovina",
    correct: `Esatto! Ecco ${babyName}. La mamma e il bebe stanno benone!`,
    details: ["10:45", "14 aprile 2025", "3,2kg", "50cm"],
    wrong: "Ops! Riprova.",
    download: "Scarica l'immagine ricordo",
    type: "Scrivi il tuo tentativo..."
  },
  de: {
    welcome: "Wir freuen uns sehr, bekannt zu geben...",
    intro: "Kannst du den Namen unseres Babys erraten? Sortiere die Buchstaben!",
    button: "Raten",
    correct: `Richtig! Hier ist ${babyName}. Mama und kind sind sehr gut!`,
    details: ["10:45", "14. April 2025", "3,2kg", "50cm"],
    wrong: "Ups! Versuch es nochmal.",
    download: "Erinnerungsbild herunterladen",
    type: "Gib deinen Tipp ein..."
  },
};




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

  variants: {
    shake: {
      true: {
        animation: `${shake} 0.4s`,
      }
    }
  }
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
  border: "6px dashed",
  borderImage: "linear-gradient(45deg, #f7b7a3, #fdd692, #a3d9f7, #c6f6d5) 1",
});

const PhotoNoBorder = styled("img", {
  marginTop: "1.5rem",
  width: "100%"
});

const ErrorBanner = styled("div", {
  color: "white",
  backgroundColor: "$error",
  padding: "0.8rem",
  borderRadius: "10px",
  marginTop: "1rem",
  fontWeight: "bold",
  animation: `${fadeIn} 0.4s ease-in-out`,
});

const OverlayInfo = styled("ul", {
  position: "absolute",
  top: "4%",
  right: "4%",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  padding: "0.5rem 0.75rem",
  borderRadius: "12px",
  listStyle: "none",
  textAlign: "center",
  fontSize: "0.55vw", // scales with image width
  color: "$text",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  maxWidth: "10%",
  maxHeight: "10%",
});

const OverlayItem = styled("li", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.3rem",
  marginBottom: "0.3rem",
  whiteSpace: "nowrap",
});

const DownloadButton = styled("button", {
  marginTop: "1.5rem",
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  color: "$primaryDark",
});

const PhotoWrapper = styled("div", {
  position: "relative",
});

const EasterOverlay = styled("img", {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  pointerEvents: "none",
  zIndex: 2,
});

function App() {
  const [lang, setLang] = useState("en");
  const [guess, setGuess] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [wrongGuess, setWrongGuess] = useState(false);
  const cardRef = useRef(null);
  const exportRef = useRef(null);
  const [shakeInput, setShakeInput] = useState(false);

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

  const handleGuess = () => {
    if (guess === babyName) {
      setRevealed(true);
      setWrongGuess(false);
      setShakeInput(false);
    } else {
      setWrongGuess(true);
      setShakeInput(true);
    }
  };

  const handleDownload = async () => {
    if (exportRef.current) {
      const canvas = await html2canvas(exportRef.current);
      const link = document.createElement("a");
      link.download = "baby-announcement.png";
      link.href = canvas.toDataURL();
      link.click();
    }

  };
  const scrambledName = (name: string) => {
    if (name.length < 2) return name;
  
    let shuffled = name;
    while (shuffled === name) {
      const arr = name.split('');
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      shuffled = arr.join('');
    }
    return shuffled;
  }

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
            <Photo src={parentsIllustration} alt="Cartoon of parents" style={{ marginBottom: "1.5rem" }} />
            <Scrambled>{scrambledName(babyName)}</Scrambled>
            <Input
              value={guess}
              onChange={(e) => {
                setGuess(e.target.value.toUpperCase());
                setWrongGuess(false);
                setShakeInput(false); // Reset shake when typing
              }}
              shake={shakeInput}
              placeholder={t.type}
            />
            <Button onClick={handleGuess}>
              {t.button}
            </Button>
            {wrongGuess && (
              <ErrorBanner css={{ marginTop: "0.5rem", fontSize: "1.1rem", animation: "fadeIn 0.5s ease-in-out" }}>
              {t.wrong}
              </ErrorBanner>
            )}
          </>
        )}

        {revealed && (
          <div style={{ position: "relative" }}>
            <h2>{t.correct}</h2>
            <ul style={{
                marginTop: "2rem",
                padding: 0,
                listStyle: "none",
                fontSize: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                color: "#001858",
                alignItems: "center",        // Center items horizontally
                justifyContent: "center",
                textAlign: "center"
              }}>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Clock size={20} /> {t.details[0]}
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CalendarDays size={20} /> {t.details[1]}
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Weight size={20} /> {t.details[2]}
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Ruler size={20} /> {t.details[3]}
                </li>
              </ul>
            <PhotoWrapper>
              <Photo src={babyPhoto} alt="Our baby"/>
            </PhotoWrapper>
            <div ref={exportRef} style={{ position: "absolute", left: "-9999px", top: 0 }}>
              <PhotoWrapper>
                <PhotoNoBorder src={babyPhoto} alt="Our baby" />
                 {/*  <OverlayInfo>
                    <OverlayItem><Clock size="2em" />{t.details[0]}</OverlayItem>
                    <OverlayItem><CalendarDays size="2em" />{t.details[1]}</OverlayItem>
                    <OverlayItem><Weight size="2em" />{t.details[2]}</OverlayItem>
                    <OverlayItem><Ruler size="2em" />{t.details[3]}</OverlayItem>
                  </OverlayInfo> */}
              </PhotoWrapper>
            </div>
            <DownloadButton onClick={handleDownload}>
              <Download size={24} />
            </DownloadButton>
          </div>
        )}
      </Card>
    </Container>
  );
}

const container = document.getElementById("root");
createRoot(container).render(<App />);

export default App;
