import { useState } from 'react'
import { FiImage } from 'react-icons/fi'
import './common.css'

// Shows a photo from public/images/.
// If the file doesn't exist yet, it shows a styled placeholder
// with the file name, so you know exactly which photo to add.
export default function Photo({ src, alt = '', className = '', showLabel = true }) {
  const [failed, setFailed] = useState(!src)

  if (failed) {
    return (
      <div className={`photo photo-placeholder ${className}`} role="img" aria-label={alt}>
        <FiImage size={26} aria-hidden="true" />
        {showLabel && src && <span>{src}</span>}
      </div>
    )
  }

  return (
    <img
      className={`photo ${className}`}
      src={`/images/${src}`}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
