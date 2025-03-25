import "./globals.css";

export const metadata = {
  title: "Rebane's Discord Colored Text Generator",
  description: "Craft Vibrant Messages with ANSI Color Magic",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
