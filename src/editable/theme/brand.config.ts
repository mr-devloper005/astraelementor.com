import { siteIdentity } from '@/config/site.identity'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

const { recipe } = getFactoryState()
const productKind = getProductKind(recipe)

export const slot4BrandConfig = {
  siteName: siteIdentity.name,
  tagline: siteIdentity.tagline,
  domain: siteIdentity.domain,
  baseUrl: siteIdentity.url,
  productKind,
  ogImage: siteIdentity.ogImage,
  accents:
    productKind === 'visual'
      ? { primary: '#8df0c8', surface: '#07101f' }
      : productKind === 'editorial'
        ? { primary: '#35858e', surface: '#f7f9f4' }
        : productKind === 'directory'
          ? { primary: '#35858e', surface: '#f7f9f4' }
          : { primary: '#35858e', surface: '#f7f9f4' },
} as const
