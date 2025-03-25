"use client";

import { useState, useRef, useEffect } from "react";

export const TextEditor = ({
  content,
  onContentChange,
  onApplyColor,
  onBoldToggle,
  onUnderlineToggle,
  onReset,
}) => {
  const editorRef = useRef(null);
  const [isBold, setIsBold] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const handleInput = () => {
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e) => {
    // Prevent Enter key from creating a new line (we'll handle it manually)
    if (e.key === "Enter") {
      e.preventDefault();
      document.execCommand("insertHTML", false, "<br>");
    }
  };

  const handleBoldClick = () => {
    document.execCommand("bold", false, null);
    setIsBold(!isBold);
    onBoldToggle();
  };

  const handleUnderlineClick = () => {
    document.execCommand("underline", false, null);
    setIsUnderline(!isUnderline);
    onUnderlineToggle();
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  return (
    <div>
      <div
        ref={editorRef}
        className="text-editor"
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="action-buttons">
        <button onClick={onReset}>Reset All</button>
        <button onClick={handleBoldClick} className={isBold ? "active" : ""}>
          Bold
        </button>
        <button
          onClick={handleUnderlineClick}
          className={isUnderline ? "active" : ""}
        >
          Underline
        </button>
      </div>
    </div>
  );
};
