export const COLORS = {
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

export const createMultiColoredText = () => {
  const colors = [
    "#dc322f", // Red
    "#859900", // Green
    "#b58900", // Gold
    "#268bd2", // Blue
    "#d33682", // Pink
    "#2aa198", // Teal
  ];

  return Array.from("Colored")
    .map(
      (char, index) =>
        `<span style="color: ${colors[index % colors.length]}">${char}</span>`
    )
    .join("");
};
