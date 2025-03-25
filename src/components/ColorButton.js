"use client";

export const ColorButton = ({ color, type, onClick, isSelected }) => {
  return (
    <button
      className={`color-button ${isSelected ? "selected" : ""}`}
      style={{ backgroundColor: color.color }}
      onClick={() => onClick(color.color, type)}
      title={`${color.name} (${color.color})`}
    >
      <span className="color-tooltip">
        <span className="color-tooltip-code">{color.color}</span>
        <span className="color-tooltip-name">{color.name}</span>
      </span>
    </button>
  );
};
