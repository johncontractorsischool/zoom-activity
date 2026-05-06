export default function Home() {
  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">Zoom Activity</p>
        <h1>Webhook endpoint is ready.</h1>
        <p>
          Configure Zoom&apos;s Event Notification Endpoint URL to point at{" "}
          <code>/api/zoom/webhook</code> on your deployed app.
        </p>
      </section>
    </main>
  );
}
