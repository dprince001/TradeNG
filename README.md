# TradeNG — Web

TradeNG is a peer-to-peer escrow marketplace: sellers list items, buyers purchase directly or negotiate a price via offers, and payments are held in escrow until the buyer confirms receipt. This repo is the **Next.js web client** for the platform.

- **Design (Figma):** https://www.figma.com/design/mTczcEieXFNfN170IUHdmY/TradeNG?node-id=99-574&p=f&t=uyGOEtcyNXMvLV0Q-0
- **Backend repo:** https://github.com/marvelmiles/tradeNG-api.git
- **API docs (Swagger UI):** https://tradeng-api.onrender.com/api/docs/v1/
- **API base URL:** `https://tradeng-api.onrender.com/api/v1`

## Tech stack

- **Framework:** Next.js 13 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui + Radix primitives, Framer Motion
- **State/data:** Redux Toolkit + RTK Query (REST), Socket.io-client (realtime)
- **Forms:** react-hook-form + zod
- **Notifications (toasts):** sonner

## Prerequisites

1. **The TradeNG API.** This web app talks to `https://tradeng-api.onrender.com/api/v1` (hardcoded in [`src/app/redux/api/apiSlice.ts`](src/app/redux/api/apiSlice.ts)) and connects its Socket.io client to the same origin — there is no `.env` to configure. To run against a local instance instead, clone the [backend repo](https://github.com/marvelmiles/tradeNG-api.git), run it on port 5000, and swap the `getBaseUrl()` value in `apiSlice.ts` to `http://localhost:5000/api/v1`.
2. Node.js (any version compatible with Next.js 13 / React 18, e.g. 18.x or 20.x).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # lint the project
```

## Demo accounts

The API's `npm run db:seed` script (run on the backend) populates a full set of demo accounts covering every account/listing/transaction state. **Every seeded account uses the password `Passw0rd1`.**

| Email | Role | Notes |
|---|---|---|
| `adaeze.seller@tradeng.dev` | Top seller #1 | `ACTIVE`, verified seller, highest completed-sales count — tops the top-sellers leaderboard. Has listings in every status (active, negotiable, draft, sold), an open dispute, a completed withdrawal, and notifications across most types. |
| `chidi.seller@tradeng.dev` | Top seller #2 | `ACTIVE`, verified seller. Has a cancelled listing, a transaction mid auto-release countdown (`RECEIPT_CONFIRMED`), and a pending withdrawal request. |
| `bola.seller@tradeng.dev` | Top seller #3 | `ACTIVE`, verified seller. Has a transaction still in escrow (`PAID`, not yet shipped-confirmed), one still `PENDING_PAYMENT`, and a rejected withdrawal (with its ledger reversal). |
| `ifeoma.seller@tradeng.dev` | Verified seller, low volume | `ACTIVE`, verified seller, but zero released sales — deliberately absent from the top-sellers leaderboard despite being verified. Has a refunded transaction from a buyer-favor dispute resolution. |
| `emeka.buyer@tradeng.dev` | Buyer | `ACTIVE`, no listings. Buyer on several transactions above; has a wishlist and an ongoing counter-offer thread. |
| `ngozi.buyer@tradeng.dev` | Buyer | `ACTIVE`, has a pending seller-verification request — useful for testing the verification-approval path. |
| `tunde.unverified@tradeng.dev` | Unverified account | `status: "UNVERIFIED"` — use this to test the signup/email-verification flow. Has a live signup OTP: `482913`. |
| `grace.suspended@tradeng.dev` | Suspended account | `status: "SUSPENDED"` — use this to test the login rejection path for suspended users. |

> These accounts only exist after the API's seed script has been run against its database. If login fails with "user not found," the hosted database may need to be reseeded (`npm run db:seed` on the backend).

## Project structure

```
src/app/
├─ (pages)/
│  ├─ (auth)/          Login, register, OTP verification, forgot/reset password, onboarding
│  ├─ (users)/profile/  My profile, edit profile, public seller/buyer profile, orders, listings, wallet, settings
│  ├─ (product)/        Product detail page, list/edit item flow
│  ├─ (order)/          Checkout, payment, payment status, confirm delivery, order details
│  ├─ (info)/            About, contact, FAQs, privacy/terms, dispute center, escrow protection
│  ├─ chat/              Buyer/seller messaging (Socket.io realtime)
│  ├─ discovery/         Category/discovery browsing
│  ├─ favourites/        Wishlist
│  ├─ home/              Landing page (top sellers, categories, platform stats)
│  └─ listings/          Marketplace listing search/browse
├─ components/           Shared UI (layout, auth, chat, list-items, profile) + primitives (Button, Input, Modal, Loader…)
├─ redux/api/             RTK Query API slices, one per backend resource (auth, listings, transactions, chat, wallet, reviews, uploads, …)
├─ context/               React context providers (Socket.io connection/notifications)
└─ hooks/                 Shared hooks (useCurrentUser, useGet, usePost, usePaginatedQuery, useAuthGuard, …)
```

## How it works

- **Auth & session:** On login/OTP-verify, the API returns `{ user, token }`, which is stored in Redux (`state.app.userInfo`) and persisted to `localStorage` so sessions survive a refresh. `useCurrentUser()` reads this state; `useAuthGuard()` gates actions behind a login prompt for guests.
- **Data fetching:** All REST calls go through RTK Query slices in `src/app/redux/api/`. `useGet`/`usePost` are thin wrappers around RTK Query hooks that standardize loading state and toast on success/error. `usePaginatedQuery` layers infinite-scroll pagination on top of list endpoints (cursor- or page-based, per the API's pagination contract).
- **Realtime:** `SocketContext` opens a single authenticated Socket.io connection (JWT passed as `auth.token`) and exposes chat messages, typing indicators, read receipts, offer updates, and live notification counts to the rest of the app.
- **Escrow flow:** Seller publishes a listing → buyer buys directly or negotiates an offer → a `Transaction` is created (`PENDING_PAYMENT`) → buyer checks out via Nomba → webhook/manual verify marks it `PAID` → buyer confirms receipt (`RECEIPT_CONFIRMED`) → buyer releases payment or it auto-releases after 48h (`RELEASED`) → buyer can leave a review. Disputes can be raised at the `PAID`/`RECEIPT_CONFIRMED` stages, moving the transaction to `DISPUTED`.
- **Response envelope:** Every API response is wrapped as `{ success, message, data, pagination, code, status, ... }`; `usePost`/`useGet` unwrap this so components just deal with `data`.

For the full request/response contracts (schemas, status codes, socket event payloads), see the [API docs](https://tradeng-api.onrender.com/api/docs/v1/) — the Swagger UI is served directly by the running API server.
