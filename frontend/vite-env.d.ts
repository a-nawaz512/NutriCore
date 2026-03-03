interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Add other VITE_ env vars here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}