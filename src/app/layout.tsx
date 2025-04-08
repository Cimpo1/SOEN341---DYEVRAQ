import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
        <style>{`
          body {
            font-family: 'Roboto', sans-serif;
          }
        `}</style>
      </head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
