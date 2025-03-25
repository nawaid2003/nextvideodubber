"use client";

import { useState } from "react";
import ColorButton from "../components/ColorButton";
import TextEditor from "../components/TextEditor";

const COLORS = {
  foreground: [
    { code: 30, name: "Dark Gray", color: "#4f545c", ansi: "\x1b[30m" },
    { code: 31, name: "Red", color: "#dc322f", ansi: "\x1b[31m" },
    { code: 32, name: "Green", color: "#859900", ansi: "\x1b[32m" },
    { code: 33, name: "Gold", color: "#b58900", ansi: "\x1b[33m" },
    { code: 34, name: "Blue", color: "#268bd2", ansi: "\x1b[34m" },
    { code: 35, name: "Pink", color: "#d33682", ansi: "\x1b[35m" },
    { code: 36, name: "Teal", color: "#2aa198", ansi: "\x1b[36m" },
    { code: 37, name: "White", color: "#ffffff", ansi: "\x1b[37m" },
  ],
  background: [
    { code: 40, name: "Black", color: "#002b36", ansi: "\x1b[40m" },
    { code: 41, name: "Red", color: "#cb4b16", ansi: "\x1b[41m" },
    { code: 42, name: "Green", color: "#586e75", ansi: "\x1b[42m" },
    { code: 43, name: "Yellow", color: "#657b83", ansi: "\x1b[43m" },
    { code: 44, name: "Blue", color: "#839496", ansi: "\x1b[44m" },
    { code: 45, name: "Magenta", color: "#6c71c4", ansi: "\x1b[45m" },
    { code: 46, name: "Cyan", color: "#93a1a1", ansi: "\x1b[46m" },
    { code: 47, name: "White", color: "#fdf6e3", ansi: "\x1b[47m" },
  ],
};

export default function Home() {
  const [selectedFg, setSelectedFg] = useState(null);
  const [selectedBg, setSelectedBg] = useState(null);
  const [copyCount, setCopyCount] = useState(0);
  const [copyBtnText, setCopyBtnText] = useState(
    "Copy text as Discord formatted"
  );

  const applyColor = (color, type) => {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    if (!selectedText) return;

    const span = document.createElement("span");
    span.className = `ansi-${color.code}`;
    span.textContent = selectedText;

    range.deleteContents();
    range.insertNode(span);

    if (type === "fg") {
      setSelectedFg(color.code);
    } else {
      setSelectedBg(color.code);
    }
  };

  const nodesToANSI = (nodes, states) => {
    let text = "";
    for (const node of nodes) {
      if (node.nodeType === 3) {
        text += node.textContent;
        continue;
      }
      if (node.nodeName === "BR") {
        text += "\n";
        continue;
      }

      const currentState = { ...states.at(-1) };

      // Handle class-based ANSI codes
      if (node.className) {
        const ansiMatch = node.className.match(/ansi-(\d+)/);
        if (ansiMatch) {
          const ansiCode = parseInt(ansiMatch[1]);
          if (ansiCode < 30) currentState.st = ansiCode;
          else if (ansiCode < 40) currentState.fg = ansiCode;
          else currentState.bg = ansiCode;
        }
      }

      // Handle italic style (both class and inline style)
      const isItalic =
        node.style?.fontStyle === "italic" ||
        node.className?.includes("ansi-3");
      if (isItalic) {
        currentState.italic = true;
      }

      states.push(currentState);

      // Build ANSI code sequence
      const ansiCodes = [];
      if (currentState.st !== undefined && currentState.st !== 2)
        ansiCodes.push(currentState.st);
      if (currentState.fg !== undefined && currentState.fg !== 2)
        ansiCodes.push(currentState.fg);
      if (currentState.bg !== undefined && currentState.bg !== 2)
        ansiCodes.push(currentState.bg);
      if (currentState.italic) ansiCodes.push(3); // ANSI code for italic

      if (ansiCodes.length > 0) {
        text += `\x1b[${ansiCodes.join(";")}m`;
      }

      text += nodesToANSI(node.childNodes, states);
      states.pop();

      // Reset formatting
      text += `\x1b[0m`;

      // Reapply parent styles if needed
      const parentState = states.at(-1);
      if (parentState) {
        const parentCodes = [];
        if (parentState.st !== undefined && parentState.st !== 2)
          parentCodes.push(parentState.st);
        if (parentState.fg !== undefined && parentState.fg !== 2)
          parentCodes.push(parentState.fg);
        if (parentState.bg !== undefined && parentState.bg !== 2)
          parentCodes.push(parentState.bg);
        if (parentState.italic) parentCodes.push(3);

        if (parentCodes.length > 0) {
          text += `\x1b[${parentCodes.join(";")}m`;
        }
      }
    }
    return text;
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        const funnyCopyMessages = [
          "Copied!",
          "Double Copy!",
          "Triple Copy!",
          "Dominating!!",
          "Rampage!!",
          "Mega Copy!!",
          "Unstoppable!!",
          "Wicked Sick!!",
          "Monster Copy!!!",
          "GODLIKE!!!",
          "BEYOND GODLIKE!!!!",
          Array(16)
            .fill(0)
            .reduce(
              (p) => p + String.fromCharCode(Math.floor(Math.random() * 65535)),
              ""
            ),
        ];

        const newCount = Math.min(11, copyCount + 1);
        setCopyCount(newCount);
        setCopyBtnText(funnyCopyMessages[newCount]);

        setTimeout(() => {
          setCopyCount(0);
          setCopyBtnText("Copy text as Discord formatted");
        }, 2000);
      },
      (err) => {
        if (copyCount > 2) return;
        alert(
          "Copying failed for some reason, let's try showing an alert, maybe you can copy it instead."
        );
        alert(text);
      }
    );
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Rebane&apos;s Discord Generator</h1>
        <p className="header-description">
          Craft Vibrant Messages with ANSI Color Magic
        </p>
      </div>

      <TextEditor onCopy={handleCopy} />

      <div className="section-label">Foreground Colors</div>
      <div className="color-grid">
        {COLORS.foreground.map((color) => (
          <ColorButton
            key={`fg-${color.code}`}
            color={color}
            type="fg"
            onClick={applyColor}
            isSelected={selectedFg === color.code}
          />
        ))}
      </div>

      <div className="section-label">Background Colors</div>
      <div className="color-grid">
        {COLORS.background.map((color) => (
          <ColorButton
            key={`bg-${color.code}`}
            color={color}
            type="bg"
            onClick={applyColor}
            isSelected={selectedBg === color.code}
          />
        ))}
      </div>

      <button
        className="copy-btn"
        onClick={() => {
          const editor = document.querySelector(".text-editor");
          if (editor) {
            const nodes = editor.childNodes;
            const ansiText = nodesToANSI(nodes, [{ fg: 2, bg: 2, st: 2 }]);
            const toCopy = `\`\`\`ansi\n${ansiText}\n\`\`\``;
            handleCopy(toCopy);
          }
        }}
        style={{
          backgroundColor:
            copyCount <= 8 ? (copyCount > 0 ? "#3BA55D" : "") : "#ED4245",
        }}
      >
        {copyBtnText}
      </button>
    </div>
  );
}
