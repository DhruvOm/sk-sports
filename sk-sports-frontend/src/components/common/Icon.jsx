// One place to map our icon names to react-icons.
// Usage: <Icon name="fitness" size={28} />
import {
  FaUserGraduate,
  FaUsers,
  FaShieldAlt,
  FaDumbbell,
  FaHandshake,
  FaBalanceScale,
  FaFistRaised,
  FaFire,
  FaUserShield,
} from 'react-icons/fa'

const icons = {
  instructor: FaUserGraduate,
  ages: FaUsers,
  shield: FaShieldAlt,
  fitness: FaDumbbell,
  courtesy: FaHandshake,
  integrity: FaUserShield,
  perseverance: FaFistRaised,
  selfcontrol: FaBalanceScale,
  spirit: FaFire,
}

export default function Icon({ name, size = 24, ...props }) {
  const Component = icons[name] || FaShieldAlt
  return <Component size={size} aria-hidden="true" {...props} />
}
