"use client";

import { useState, useEffect } from "react";
import { COLORS, createMultiColoredText } from "../utils/colors";
import { ColorButton } from "../components/ColorButton";
import { TextEditor } from "../components/TextEditor";

export default function DiscordTextGenerator() {
  const [content, setContent] = useState("");
  const [selectedFgColor, setSelectedFgColor] = useState(null);
  const [selectedBgColor, setSelectedBgColor] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Initialize with default content
    const defaultContent =
      'Welcome to <span style="color: #5865f2;">Rebane\'s</span> ' +
      '<span style="color: #7289da;">Discord</span> ' +
      '<span id="multi-colored-text">' +
      createMultiColoredText() +
      "</span> Text Generator!";
    setContent(defaultContent);
  }, []);

  const applyColor = (color, type) => {
    if (type === "fg") {
      setSelectedFgColor(color);
    } else {
      setSelectedBgColor(color);
    }

    // This will be handled by the TextEditor component through execCommand
  };

  const convertToDiscordFormat = () => {
    let result = "```ansi\n";

    result += content
      .replace(/<span style="color: ([^"]+);">/g, "\x1b[31m")
      .replace(/<span style="background-color: ([^"]+);">/g, "\x1b[41m")
      .replace(/<\/span>/g, "\x1b[0m")
      .replace(/<br>/g, "\n");

    result += "\n```";
    return result;
  };

  const handleCopy = () => {
    const discordText = convertToDiscordFormat();
    navigator.clipboard.writeText(discordText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const resetAll = () => {
    const defaultContent =
      'Welcome to <span style="color: #5865f2;">Rebane\'s</span> ' +
      '<span style="color: #7289da;">Discord</span> ' +
      '<span id="multi-colored-text">' +
      createMultiColoredText() +
      "</span> Text Generator!";
    setContent(defaultContent);
    setSelectedFgColor(null);
    setSelectedBgColor(null);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Rebane&apos;s Discord Generator</h1>
        <p className="header-description">
          Craft Vibrant Messages with ANSI Color Magic
        </p>
      </div>

      <TextEditor
        content={content}
        onContentChange={setContent}
        onApplyColor={applyColor}
        onBoldToggle={() => {}}
        onUnderlineToggle={() => {}}
        onReset={resetAll}
      />

      <div className="section-label">Foreground Colors</div>
      <div className="color-grid">
        {COLORS.foreground.map((color) => (
          <ColorButton
            key={`fg-${color.code}`}
            color={color}
            type="fg"
            onClick={applyColor}
            isSelected={selectedFgColor === color.color}
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
            isSelected={selectedBgColor === color.color}
          />
        ))}
      </div>

      <button
        className="copy-btn"
        onClick={handleCopy}
        style={{
          background: copied
            ? "linear-gradient(45deg, #2ecc71, #27ae60)"
            : "linear-gradient(45deg, var(--accent-primary), var(--accent-secondary))",
        }}
      >
        {copied ? "Copied!" : "Copy Discord Formatted Text"}
      </button>
    </div>
  );
}
