# zoom-activity

Next.js app for validating a Zoom webhook endpoint URL.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

3. Set `ZOOM_WEBHOOK_SECRET_TOKEN` to the Secret Token from your Zoom webhook app.

4. Start the app:

   ```bash
   npm run dev
   ```

## Zoom endpoint

Use this URL in Zoom after deployment:

```text
https://your-domain.example/api/zoom/webhook
```

For Zoom's `endpoint.url_validation` event, the app returns:

```json
{
  "plainToken": "token-from-zoom",
  "encryptedToken": "hmac-sha256-hex"
}
```

`encryptedToken` is generated with HMAC-SHA256 using `ZOOM_WEBHOOK_SECRET_TOKEN`.
