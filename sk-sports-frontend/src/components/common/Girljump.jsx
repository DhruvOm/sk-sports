import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export default function KickKid({ className = '' }) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return (
    <div className={className} aria-hidden="true">
      <DotLottieReact src="/animations/girl-jumping.lottie" loop autoplay={!reduce} />
    </div>
  )
}