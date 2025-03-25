"use client";

import { useEffect, useRef, useState } from "react";

const TextEditor = ({ onCopy }) => {
  const editorRef = useRef(null);
  const [isBoldActive, setIsBoldActive] = useState(false);
  const [isUnderlineActive, setIsUnderlineActive] = useState(false);
  const [isItalicActive, setIsItalicActive] = useState(false);

  useEffect(() => {
    // Initialize editor with default content
    resetAll();
  }, []);

  const handleInput = (e) => {
    const base = e.target.innerHTML.replace(
      /<(\/?(br|span|span class="ansi-[0-9]*"))>/g,
      "[$1]"
    );
    if (base.includes("<") || base.includes(">")) {
      e.target.innerHTML = base
        .replace(/<.*?>/g, "")
        .replace(/[<>]/g, "")
        .replace(/\[(\/?(br|span|span class="ansi-[0-9]*"))\]/g, "<$1>");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      document.execCommand("insertLineBreak");
      e.preventDefault();
    }
  };

  const applyStyle = (style) => {
    const editor = editorRef.current;
    if (!editor) return;

    // Save current selection
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    if (!selectedText) return;

    // Create span with appropriate class
    const span = document.createElement("span");
    span.textContent = selectedText;

    if (style === "bold") {
      span.className = "ansi-1";
      setIsBoldActive(!isBoldActive);
    } else if (style === "underline") {
      span.className = "ansi-4";
      setIsUnderlineActive(!isUnderlineActive);
    } else if (style === "italic") {
      span.style.fontStyle = "italic";
      setIsItalicActive(!isItalicActive);
    }

    // Apply the style
    range.deleteContents();
    range.insertNode(span);

    // Restore selection
    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    selection.removeAllRanges();
    selection.addRange(newRange);
  };

  const resetAll = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML =
        'Welcome to&nbsp;<span class="ansi-33">Rebane</span>\'s <span class="ansi-45"><span class="ansi-37">Discord</span></span>&nbsp;' +
        '<span class="ansi-31">C</span><span class="ansi-32">o</span><span class="ansi-33">l</span>' +
        '<span class="ansi-34">o</span><span class="ansi-35">r</span><span class="ansi-36">e</span>' +
        '<span class="ansi-37">d</span>&nbsp;Text Generator!';
    }
    setIsBoldActive(false);
    setIsUnderlineActive(false);
    setIsItalicActive(false);
  };

  return (
    <div>
      <div
        ref={editorRef}
        className="text-editor"
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
      />
      <div className="action-buttons">
        <button onClick={resetAll}>Reset All</button>
        <button
          onClick={() => applyStyle("bold")}
          className={isBoldActive ? "active" : ""}
        >
          Bold
        </button>
        <button
          onClick={() => applyStyle("underline")}
          className={isUnderlineActive ? "active" : ""}
        >
          Underline
        </button>
        <button
          onClick={() => applyStyle("italic")}
          className={isItalicActive ? "active" : ""}
        >
          Italic
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
