"use client"
import React, {useEffect, useState} from "react"
import {FaArrowUpRightFromSquare} from "react-icons/fa6"

type Day = {
  date: string
  count: number
  level: number
}

export function GitHubContribGraph({username = "pawanshettyy"}: {username?: string}) {
  const [days, setDays] = useState<Day[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const url = `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`Fetch error: ${r.status}`)
        return r.json()
      })
      .then((json) => {
        if (!mounted) return
        if (json && Array.isArray(json.contributions)) {
          setDays(json.contributions)
        } else {
          setError("Unexpected API response")
        }
      })
      .catch((e) => {
        if (!mounted) return
        setError(String(e))
      })

    return () => {
      mounted = false
    }
  }, [username])

  if (error) {
    return (
      <div className="mt-8 rounded-xl bg-black ring-1 ring-white/10 p-5 md:p-6">
        <div className="text-sm text-white/70">Unable to load contributions: {error}</div>
      </div>
    )
  }

  if (!days) {
    return (
      <div className="mt-8 rounded-xl bg-black ring-1 ring-white/10 p-5 md:p-6">
        <div className="text-sm text-white/70">Loading contributions…</div>
      </div>
    )
  }

  // compute weeks columns (each week is an array of 7 days starting Sunday)
  const parseDate = (d: string) => new Date(d + "T00:00:00Z")
  const first = parseDate(days[0].date)
  const last = parseDate(days[days.length - 1].date)

  // find the Sunday on or before first
  const start = new Date(first)
  start.setUTCDate(start.getUTCDate() - start.getUTCDay())

  const totalDays = Math.ceil((+last - +start) / (1000 * 60 * 60 * 24)) + 1

  const dayMap = new Map(days.map((d) => [d.date, d]))

  const weeks: (Day | {date: string; count: number; level: number | null})[][] = []
  for (let i = 0; i < totalDays; i++) {
    const cur = new Date(start)
    cur.setUTCDate(start.getUTCDate() + i)
    const iso = cur.toISOString().slice(0, 10)
    const weekIndex = Math.floor(i / 7)
    if (!weeks[weekIndex]) weeks[weekIndex] = []
    const found = dayMap.get(iso)
    if (found) weeks[weekIndex].push(found)
    else weeks[weekIndex].push({date: iso, count: 0, level: null})
  }

  const levelToColor = (lvl: number | null) => {
    switch (lvl) {
      case 0:
        return "bg-white/5"
      case 1:
        return "bg-green-700"
      case 2:
        return "bg-green-600"
      case 3:
        return "bg-green-500"
      case 4:
        return "bg-green-400"
      default:
        return "bg-transparent"
    }
  }

  const totalContributions = days.reduce((s, d) => s + d.count, 0)

  return (
    <div className="mt-8 rounded-xl bg-black ring-1 ring-white/10 p-5 md:p-6 transition-all hover:ring-white/20">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h4 className="text-lg md:text-xl font-semibold text-white mb-1">GitHub Contributions</h4>
          <p className="text-sm text-white/60">Last year activity</p>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label={`View ${username} on GitHub`}
        >
          View on GitHub
          <FaArrowUpRightFromSquare className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="relative">
        <div className="overflow-x-auto no-scrollbar -mx-1 px-1">
          <div className="inline-flex gap-1 items-start min-w-full py-2">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1 flex-shrink-0">
                {week.map((d, di) => (
                  <div
                    key={di}
                    title={`${d.date} — ${d.count} contributions`}
                    className={`w-[11px] h-[11px] md:w-[13px] md:h-[13px] rounded-sm ${levelToColor(d.level as number | null)} border border-white/10 transition-all hover:border-white/40 hover:scale-110 cursor-pointer`}
                    aria-label={`${d.date}: ${d.count} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs md:text-sm">
        <span className="text-white/70">
          <span className="font-semibold text-white">{totalContributions.toLocaleString()}</span> contributions
        </span>
        <div className="flex items-center gap-2">
          <span className="text-white/50">Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${levelToColor(level)} border border-white/10`}
                aria-label={`Level ${level}`}
              />
            ))}
          </div>
          <span className="text-white/50">More</span>
        </div>
      </div>
    </div>
  )
}

export default GitHubContribGraph
