import { useEffect } from 'react'
import { site } from '../data/siteConfig'

// Sets the browser tab title (also helps SEO).
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${site.fullName}, ${site.city}`
      : `${site.fullName} | Taekwondo Classes in ${site.city}`
  }, [title])
}
