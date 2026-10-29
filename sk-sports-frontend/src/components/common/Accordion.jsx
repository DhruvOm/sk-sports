import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import './common.css'

// FAQ list. Only one answer is open at a time.
export default function Accordion({ items, defaultOpen = -1 }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q} className={`accordion-item glass ${isOpen ? 'open' : ''}`}>
            <button
              type="button"
              className="accordion-q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{item.q}</span>
              <FiPlus className="accordion-icon" size={22} aria-hidden="true" />
            </button>
            <div className="accordion-a" hidden={!isOpen}>
              <p>{item.a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
