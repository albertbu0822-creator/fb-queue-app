export const metadata = {
  title: "Antrian Order F&B",
  description: "Display antrian pesanan F&B secara real-time",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#0A0A0A" />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#0A0A0A" }}>
        {children}
      </body>
    </html>
  );
}
