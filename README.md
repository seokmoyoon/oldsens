# oldsens.

Memories into Art. 사진 한 장, 오래된 감성.

## MVP
- Photo upload and six curated art styles
- Bring your own Gemini API key (not persisted)
- One free generation per verified account, globally capped at 1,000 (planned)
- Paid credits and payment verification (planned)

## Run
```sh
npm install
npm run dev
```

Initial prototype uses BYOK only. Hosted credits and payments must remain disabled until server-side authentication, atomic credit accounting, rate limits and payment verification are implemented.
