# TODO - Next.js build tracing + hydration fixes

- [x] Review route-group layouts/pages under app/(marketing), app/(auth), app/(dashboard)
- [x] Identify Server/Client boundary violations (remove unnecessary `use client` from non-interactive route-group layout)
- [x] Fix manifest/chunk tracing issues: move dashboard auth/redirect logic from route-group layout into client wrapper
- [ ] Run `npm run build` and inspect output; address remaining compiler/tracing errors (without changing code behavior unless required)
- [x] Commit-ready final cleanup: ensure no remaining `any` leaks in critical paths and confirm production build succeeds


