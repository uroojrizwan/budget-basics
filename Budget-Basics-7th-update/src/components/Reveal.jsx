import useReveal from '../hooks/useReveal'

// Wraps a section/card so it fades and lifts into place the first time it
// scrolls into view. Delay is in ms, useful for staggering a row of cards.
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, visible] = useReveal()

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' reveal-in' : ''}${className ? ' ' + className : ''}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
