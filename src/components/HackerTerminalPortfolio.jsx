import React, { useState, useEffect } from "react";

const HackerTerminalPortfolio = () => {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  const commandsList = [
    "1. Show Resume",
    "2. About Me",
    "3. Exit"
  ];

  useEffect(() => {
    // Welcome messages
    const welcomeLines = [
      "echo Welcome to My  Terminal Portfolio",
      "echo Choose an option:"
    ];
    let index = 0;

    const interval = setInterval(() => {
      if (index < welcomeLines.length) {
        setLines((prev) => [...prev, welcomeLines[index]]);
        index++;
      } else {
        setLines((prev) => [...prev, ...commandsList]);
        setShowPrompt(true); // show input prompt after welcome
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCommand = () => {
    const command = input.trim(); // Trim spaces

    if (command === "1") {
      window.open("/resume.pdf", "_blank"); // PDF should be in /public folder
      setLines((prev) => [...prev, "> " + command]);
      setInput("");
    } else if (command === "2") {
      setLines((prev) => [
        ...prev,
        "> " + command,
        "echo I am Shubh, a Web Developer.",
        <span key="github">
          echo GitHub:{" "}
          <a
            href="https://github.com/Shubham21122002"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "lime", textDecoration: "underline" }}
          >
            https://github.com/shubh
          </a>
        </span>
      ]);
      setInput("");
    } else if (command === "3") {
      setLines((prev) => [...prev, "> " + command, "echo Goodbye!"]);
      setInput("");
      setShowPrompt(false);
    } else {
      setLines((prev) => [...prev, "> " + command, "echo Invalid command"]);
      setInput("");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "lime",
        fontFamily: "monospace",
        height: "100vh",
        padding: "20px",
        overflowY: "auto",
      }}
    >
      {lines.map((line, idx) => (
        <div key={idx}>{line}</div>
      ))}

      {showPrompt && (
        <div>
          &gt;{" "}
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCommand();
            }}
            style={{
              backgroundColor: "black",
              color: "lime",
              border: "none",
              outline: "none",
              fontFamily: "monospace",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default HackerTerminalPortfolio;
