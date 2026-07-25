export const DEFAULT_USER = {
  name: 'Sarah Johnson',
  status: 'Protected',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsTCDzWbsWn99APYomqRDkbS5k7UncVZ_w03EAuZRonCUwvscGvzAhT0gIUajYiNYib4IYOGGdstdGezp0E1_BC1J3vB9UagdRkFbw1BJxIIv8XV1LvUV0o9THrKzkjPS57dRT5hish5X_QgWA74J_OaSSQuBdH8w-TPKdsemLiU576c9A7yae9DFG56iiEfVljHu8c6svDS86psLGXi307-_x9_fRjq8UbtcDk4IzQEEQ2NEceF5DuYzAGO4-nGOyoGRmiI3BkPgo',
};

export const DEFAULT_LOCATION = {
  lat: 41.8781,
  lng: -87.6298,
  accuracy: 100,
};

export const NAV_ITEMS = [
  { href: '/',          icon: 'dashboard',          label: 'Dashboard' },
  { href: '/map',       icon: 'explore',            label: 'Safety Map' },
  { href: '/routes',    icon: 'route',              label: 'Route Planner' },
  { href: '/report',    icon: 'report',             label: 'Report Incident' },
  { href: '/community', icon: 'groups',             label: 'Community' },
  { href: '/analytics', icon: 'analytics',          label: 'Analytics' },
];

export const OTHER_NAV_ITEMS = [
  { href: '/assistant', icon: 'smart_toy',          label: 'Safety Assistant' },
  { href: '/profile',   icon: 'person',             label: 'Profile' },
  { href: '/settings',  icon: 'settings',           label: 'Settings' },
];

export const BOTTOM_NAV_ITEMS = [
  { href: '/',          icon: 'dashboard',  label: 'Home' },
  { href: '/map',       icon: 'explore',    label: 'Map' },
  { href: '/emergency', icon: 'emergency',  label: 'SOS',   sos: true },
  { href: '/assistant', icon: 'smart_toy',  label: 'Aegis' },
  { href: '/profile',   icon: 'person',     label: 'Profile' },
];

export const PAGE_TITLES = {
  '/':          'Dashboard',
  '/map':       'Safety Map',
  '/routes':    'Route Planner',
  '/report':    'Report Incident',
  '/community': 'Community',
  '/analytics': 'Analytics',
  '/assistant': 'Safety Assistant',
  '/profile':   'Profile',
  '/emergency': 'Emergency SOS',
  '/journey':   'Secure Journey',
  '/places':    'Safe Places',
  '/admin':     'Admin Panel',
  '/settings':  'Settings',
};
