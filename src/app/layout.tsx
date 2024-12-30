import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "zhijiang li",
  description: "photography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="en">
    <head>
      <title>zhijiang li</title>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-R0M2056RBS"></script>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#222222" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-title" content="zhjng.li" />
      <meta name="application-name" content="zhjng.li" />
      <meta name="msapplication-TileColor" content="#222222" />
      <meta name="theme-color" content="#ffffff" />
    </head>
    {/* TODO: style="display: block; margin: 0px" */}
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">
        {children}
        {/* netlify */}
        <form name="contact" netlify-honeypot="say-hi" hidden>
          <input type="text" name="first_name" />
          <input type="text" name="last_name" />
          <input type="email" name="email" />
          <input type="text" name="subject" />
          <textarea name="message"></textarea>
        </form>
      </div>
    </body>
  </html>
);

    // <html lang="en">
    //   <body
    //     className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    //   >
    //     {children}
    //   </body>
    // </html>
}
