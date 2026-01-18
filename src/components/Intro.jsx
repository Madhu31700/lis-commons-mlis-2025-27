import { useEffect, useState } from "react"

import p1 from "../assets/intro/photo1.jpg"
import p2 from "../assets/intro/photo2.jpg"
import p3 from "../assets/intro/photo3.jpg"
import p4 from "../assets/intro/photo4.jpg"
import p5 from "../assets/intro/photo5.jpg"

const photos = [p1, p2, p3, p4, p5]

export default function Intro({ onFinish }) {
  const [offset, setOffset] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const move = setInterval(() => {
      setOffset((o) => o + 1)
    }, 40) // slow graceful motion

    const end = setTimeout(() => {
      setShow(false)
      onFinish()
    }, 5200)

    return () => {
      clearInterval(move)
      clearTimeout(end)
    }
  }, [onFinish])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <svg
        viewBox="0 0 1200 400"
        className="w-full max-w-6xl"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <mask id="text-mask">
            <rect width="100%" height="100%" fill="black" />
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="140"
              fontWeight="800"
              letterSpacing="14"
              fill="white"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              LIBRANDHANA
            </text>
          </mask>
        </defs>

        {/* Moving image layer */}
        <g mask="url(#text-mask)">
          {photos.map((src, i) => (
            <image
              key={i}
              href={src}
              x={-offset * 0.6 + i * 300}
              y={0}
              width="600"
              height="400"
              preserveAspectRatio="xMidYMid slice"
              opacity="0.75"
            />
          ))}
        </g>

        {/* Subtitle */}
        <text
          x="50%"
          y="80%"
          textAnchor="middle"
          fill="#cbd5f5"
          fontSize="18"
          letterSpacing="4"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          A SHARED JOURNEY OF LEARNING
        </text>
      </svg>
    </div>
  )
}
