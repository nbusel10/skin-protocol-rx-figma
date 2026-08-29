/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROTOCOL_EMAIL_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
