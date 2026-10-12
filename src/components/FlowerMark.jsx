export default function FlowerMark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => (
        <ellipse
          key={index}
          cx="16"
          cy="6.5"
          rx="2.8"
          ry="5.5"
          transform={`rotate(${index * 45} 16 16)`}
        />
      ))}
      <circle cx="16" cy="16" r="2.2" />
    </svg>
  )
}
