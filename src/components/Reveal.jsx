import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

/**
 * Fades children in from a soft blur as they scroll into view.
 * When the animation ends we add `is-revealed`, which forces `filter: none`:
 * any filter left on a wrapper (even blur(0px)) stops the glass card inside
 * from blurring the page behind it.
 */
export default function Reveal({ children, delay = 0, y = 14, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const [done, setDone] = useState(false)
  const Cmp = motion[as] || motion.div
  if (reduce) return <Cmp className={className}>{children}</Cmp>
  return (
    <Cmp
      className={`${className}${done ? ' is-revealed' : ''}`.trim() || undefined}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => setDone(true)}
    >
      {children}
    </Cmp>
  )
}
