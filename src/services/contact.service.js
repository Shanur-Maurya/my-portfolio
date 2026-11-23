// The email is assembled at runtime so it is not a literal string in the HTML.
// It is still public to anyone determined; use a dedicated address.
export const getPublicEmail = ({ user, domain }) => `${user}@${domain}`;

// Future: POST to a serverless endpoint that validates, rate-limits and sends the mail.
// Keep secrets on the server; add the endpoint origin to connect-src in public/_headers.
export async function sendMessage(/* { name, email, message } */) {
  throw new Error('Contact endpoint not configured yet.');
}
