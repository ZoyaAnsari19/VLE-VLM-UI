import Script from "next/script";

export default function Home() {
  return (
    <>
      <a href="#apply" className="skip-link">
        Skip to application form
      </a>
      <main id="app"></main>
      <Script src="/static/app.js" type="module" strategy="afterInteractive" />
    </>
  );
}
