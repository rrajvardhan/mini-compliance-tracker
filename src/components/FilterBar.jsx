export default function FilterBar({ label, options, value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[9px] font-bold font-mono tracking-[0.15em] uppercase text-[#666] w-16 shrink-0">
        {label}
      </span>
      <div className="flex">
        {options.map((opt, i) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={[
              "text-[9px] font-bold font-mono tracking-widest uppercase px-3 py-1 border transition-colors duration-150",
              i === 0 ? "rounded-l-sm" : "",
              i === options.length - 1 ? "rounded-r-sm" : "",
              i > 0 ? "-ml-px" : "",
              value === opt
                ? "text-[#7ec8a4] border-[#7ec8a4]/60 bg-[#7ec8a4]/6 z-10 relative"
                : "text-[#666] border-[#2a2a2a] hover:text-[#d4d4d4] hover:border-[#444]",
            ].join(" ")}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
