# API integration

This website is a frontend-only Next.js app. There is **no CaterPillar backend, database, or documented API contract in this repository**.

The booking UI talks to `lib/api`. That layer can use:

1. Local catalog data when no backend is configured
2. Development mock mode
3. A real HTTP API once `NEXT_PUBLIC_API_URL` and path env vars are set

Do not treat the payload below as a live backend contract.

## Environment variables

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | No | Public API origin or full pickup URL. Safe for the browser. |
| `NEXT_PUBLIC_MATERIALS_PATH` | No | Optional path appended to the API origin. **TODO — backend integration pending** |
| `NEXT_PUBLIC_PICKUPS_PATH` | No | Optional path appended to the API origin. **TODO — backend integration pending** |
| `NEXT_PUBLIC_SERVICEABILITY_PATH` | No | Optional path for pincode checks. **TODO — backend integration pending** |
| `NEXT_PUBLIC_USE_MOCK_API` | No | `true` only in local development. Ignored when `NODE_ENV=production`. |
| `NEXT_PUBLIC_PICKUP_API_URL` | No | Deprecated alias for `NEXT_PUBLIC_API_URL`. |
| `NEXT_PUBLIC_SITE_URL` | After the custom domain is connected | Canonical production origin, including `https`. Do not invent or hardcode the hostname in source. |
| `NEXT_PUBLIC_BOOKING_URL` | No | Override for Book a pickup CTAs. |
| `NEXT_PUBLIC_ANDROID_APP_URL` | No | Production store URL. |
| `NEXT_PUBLIC_IOS_APP_URL` | No | Production store URL. |

Put values in `.env.local`. Never commit secrets. `NEXT_PUBLIC_*` values are visible in the browser, so they must not include service-role keys, database passwords, or private tokens.

## Materials

**TODO — backend integration pending**

There is no materials endpoint in this project.

Until a backend documents one:

- `getMaterials()` returns the local catalog in `lib/data/materials.js`
- The booking UI does not know whether that list came from a file or an API

When a materials route exists, set `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_MATERIALS_PATH` to the documented values and implement the fetch inside `lib/api/materials.js`. Do not guess a path.

## Serviceability

**TODO — backend integration pending**

There is no serviceability endpoint in this project.

`checkServiceability(pincode)` exists in `lib/api/serviceability.js`.

- If mock mode is on, any valid 6-digit pincode is treated as available
- If `NEXT_PUBLIC_SERVICEABILITY_PATH` is empty, the booking form skips the check
- If a path is configured, the client calls `GET {API}{path}?pincode=560001`
- The UI blocks continue only when the backend explicitly returns `available: false` or `serviceable: false`

Do not hardcode a list of serviceable pincodes in the frontend.

## Pickup creation

**TODO — backend integration pending**

There is no pickup-creation endpoint in this project.

`createPickupRequest(form)` sends this frontend payload when an API URL is configured:

```json
{
  "customer": {
    "name": "Ada Lovelace",
    "phone": "9876543210"
  },
  "pickup": {
    "address": "12 Example Road",
    "locality": "Indiranagar",
    "pincode": "560038",
    "date": "2026-09-21",
    "timePreference": "evening"
  },
  "materials": ["paper", "cardboard"]
}
```

This is the website’s request shape. Replace or map these fields when the real backend documents its own names.

Expected success handling, once a backend exists:

- HTTP 2xx
- Optional JSON id in `requestId`, `id`, or `reference`
- The UI shows a reference **only** if the backend returns one

If `NEXT_PUBLIC_API_URL` is empty and mock mode is off, submission fails with a user-safe error. The app does not invent a live booking ID.

## Pickup lookup

**TODO — backend integration pending**

`getPickupRequest(id)` exists as a stub. No lookup route is defined.

## Error handling

`lib/api/client.js` maps network failures, timeouts, and HTTP 400 / 401 / 403 / 404 / 409 / 422 / 429 / 5xx to user-safe copy.

Raw server messages are not shown in the UI. Development logs include status and error codes only. They do not include names, phone numbers, or addresses.

## Mock mode

Enable only in development:

```txt
NEXT_PUBLIC_USE_MOCK_API=true
```

Add that line to `.env.local`, then run `npm run dev`.

When enabled:

- Materials come from the local catalog after a short delay
- Valid pincodes are treated as serviceable
- Pickup submission simulates a successful response
- The booking page shows that it is in development mock mode
- Mock references are labeled as mock, not live bookings

The booking form keeps progress in memory only. It does not write names, phone numbers, or addresses to localStorage.

Mock mode is forced off in production builds (`next build` / `next start`), even if the env flag is present.

## Switching modes

| Goal | Setup |
| --- | --- |
| Local UI with simulated submit | `.env.local` → `NEXT_PUBLIC_USE_MOCK_API=true` |
| Local UI, no backend, honest failure | Leave mock and API URL empty |
| Connect a real backend | Set `NEXT_PUBLIC_API_URL` and the documented path env vars. Keep mock unset. |
