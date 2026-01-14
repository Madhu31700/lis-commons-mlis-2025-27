import { FileText, Presentation } from "lucide-react"

export default function MaterialCard({ title, type, link }) {
  const Icon = type === "PDF" ? FileText : Presentation

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-blue-600 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="text-blue-500" size={26} />
        <h3 className="text-lg font-semibold text-zinc-100">
          {title}
        </h3>
      </div>

      <p className="text-sm text-zinc-400 mb-6">
        {type} format · Click to open
      </p>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 font-medium hover:underline"
      >
        View / Download →
      </a>
    </div>
  )
}
