interface LineChartProps {
  data: number[]
  color: string
  height?: number
  className?: string
}

export function LineChart({
  data,
  color,
  height = 100,
  className,
}: LineChartProps) {
  // Normalizar dados para o intervalo 0-1
  const max = Math.max(...data, 1)
  const normalizedData = data.map((value) => value / max)

  // Criar pontos para o caminho SVG
  const points = normalizedData
    .map((value, index) => {
      const x = (index / (normalizedData.length - 1)) * 100
      const y = 100 - value * 80 // Deixar algum espaço nas bordas
      return `${x},${y}`
    })
    .join(" L")

  return (
    <div className={className} style={{ height }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d={`M0,${100 - normalizedData[0] * 80} L${points}`}
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}
