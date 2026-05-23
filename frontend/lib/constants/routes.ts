/** Public routes — no auth required */
export const PUBLIC_PATHS = [
  '/',
  '/login',
  '/signup',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
] as const;

/** Dashboard & app routes — require session */
export const PROTECTED_PREFIXES = [
  '/dashboard',
  '/inbox',
  '/contacts',
  '/workflows',
  '/settings',
  '/billing',
  '/analytics',
  '/onboarding',
  '/team',
  '/security',
  '/templates',
  '/design-system',
] as const;
