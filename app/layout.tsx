import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HeatWise AI | Urban Cooling Intelligence",
  description: "Physics-guided urban heat intelligence and cooling intervention planning.",
  openGraph: {
    title: "HeatWise AI | Urban Cooling Intelligence",
    description: "From urban heat observation to evidence-based cooling action.",
    images: [{ url: "/og.png", width: 1680, height: 945, alt: "HeatWise urban cooling intelligence" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HeatWise AI | Urban Cooling Intelligence",
    description: "From urban heat observation to evidence-based cooling action.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.addEventListener('unhandledrejection', function(event) {
                  var reason = event.reason;
                  var stack = (reason && reason.stack) ? String(reason.stack) : '';
                  var message = (reason && reason.message) ? String(reason.message) : String(reason);
                  if (stack.includes('chrome-extension://') || stack.includes('moz-extension://') || message.includes('M_ID') || message.includes('Cannot read properties of undefined')) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                  }
                }, true);

                window.addEventListener('error', function(event) {
                  var filename = event.filename ? String(event.filename) : '';
                  var message = event.message ? String(event.message) : '';
                  if (filename.includes('chrome-extension://') || filename.includes('moz-extension://') || message.includes('M_ID')) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                  }
                }, true);
              }
            `,
          }}
        />
      </head>
      <body
        className="antialiased overflow-x-hidden w-full max-w-[100vw]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
