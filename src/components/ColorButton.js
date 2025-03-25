"use client";

const ColorButton = ({ color, type, onClick, isSelected }) => {
  const tooltipInfo = {
    // Foreground colors
    30: { name: "Dark Gray", code: "#4f545c" },
    31: { name: "Red", code: "#dc322f" },
    32: { name: "Green", code: "#859900" },
    33: { name: "Gold", code: "#b58900" },
    34: { name: "Blue", code: "#268bd2" },
    35: { name: "Pink", code: "#d33682" },
    36: { name: "Teal", code: "#2aa198" },
    37: { name: "White", code: "#ffffff" },
    // Background colors
    40: { name: "Black", code: "#002b36" },
    41: { name: "Red", code: "#cb4b16" },
    42: { name: "Green", code: "#586e75" },
    43: { name: "Yellow", code: "#657b83" },
    44: { name: "Blue", code: "#839496" },
    45: { name: "Magenta", code: "#6c71c4" },
    46: { name: "Cyan", code: "#93a1a1" },
    47: { name: "White", code: "#fdf6e3" },
  }[color.code] || { name: color.name, code: color.color };

  return (
    <div className="color-button-container">
      <button
        className={`color-button ${isSelected ? "selected" : ""}`}
        style={{ backgroundColor: color.color }}
        onClick={() => onClick(color, type)}
        data-code={color.code}
        data-type={type}
      >
        {isSelected && <span className="selected-check">✓</span>}
      </button>
      <div className="color-tooltip">
        <div className="tooltip-header">{tooltipInfo.name}</div>
        <div className="tooltip-code">{tooltipInfo.code}</div>
        <div className="tooltip-ansi">ANSI: {color.code}</div>
      </div>
    </div>
  );
};

export default ColorButton;
