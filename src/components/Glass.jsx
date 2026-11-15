/**
 * The liquid-glass surface used everywhere.
 * `interactive` adds a soft specular light that follows the pointer.
 */
export default function Glass({ as: Tag = 'div', className = '', interactive = false, children, ...rest }) {
  const onPointerMove = interactive
    ? (e) => {
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
      }
    : undefined

  return (
    <Tag
      className={`glass${interactive ? ' glass--interactive' : ''} ${className}`}
      onPointerMove={onPointerMove}
      {...rest}
    >
      {children}
    </Tag>
  )
}
