import { createContext, useContext, type ReactNode } from 'react'

export type SitePaths = {
  root: string
  about: string
  shop: string
  protocol: string
  product: (id: string) => string
  shopStep: (step: string | number) => string
}

const WORKING: SitePaths = {
  root: '/designs/working',
  about: '/about',
  shop: '/designs/working/shop',
  protocol: '/designs/working/protocol',
  product: id => `/designs/working/product/${id}`,
  shopStep: step => `/designs/working/shop?step=${step}`,
}

const SiteRootContext = createContext<SitePaths>(WORKING)

export function SiteRootProvider({ root, children }: { root: string; children: ReactNode }) {
  const paths: SitePaths = root === WORKING.root
    ? WORKING
    : {
        root,
        about: `${root}/about`,
        shop: `${root}/shop`,
        protocol: `${root}/protocol`,
        product: id => `${root}/product/${id}`,
        shopStep: step => `${root}/shop?step=${step}`,
      }
  return <SiteRootContext.Provider value={paths}>{children}</SiteRootContext.Provider>
}

export function useSiteRoot() {
  return useContext(SiteRootContext)
}
