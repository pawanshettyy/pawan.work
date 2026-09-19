"use client"
import { Dithering } from "@paper-design/shaders-react"
import type React from "react"
import { TimeIST } from "@/components/time-ist"
import GitHubContribGraph from "@/components/GitHubContribGraph"
import { useState, useEffect, useRef } from "react"
import { FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6"
import { HiOutlineMail } from "react-icons/hi"
import { cn } from "@/lib/utils"

const SOCIALS = {
  x: "https://x.com/pawanshettyy",
  github: "https://github.com/pawanshettyy",
  linkedin: "https://www.linkedin.com/in/pawanshettyy",
  email: "mailto:wrk4pawan@gmail.com",
}

type Project = {
  title: string
  url?: string
  label: string
  color: "blue" | "yellow" | "purple" | "orange"
  comingSoon?: boolean
  description?: string
  metric?: string
  image?: string
}

const projects: Project[] = [
  {
    title: "Quantfolio",
    // url: "https://github.com/pawanshettyy/Quantfolio",
    label: "View project",
    color: "blue",
    description:
      "quantitative portfolio intelligence and research platform for brokerage ingestion, deterministic portfolio reconstruction, risk analytics, algorithmic research, ml experimentation, and event-driven backtesting.",
    metric: "quant finance",
    image: "/icons/soon.png",
    comingSoon: true,
  },
  {
    title: "InferMesh",
    // url: "https://github.com/pawanshettyy/InferMesh",
    label: "View project",
    color: "yellow",
    description:
      "distributed llm inference orchestrator with an openai-compatible gateway, load-aware worker routing, kv-cache-aware affinity, redis coordination, and prometheus/grafana observability.",
    metric: "distributed systems",
    image: "/icons/soon.png",
    comingSoon: true,
  },
  {
    title: "AMR-Assist",
    url: "https://github.com/pawanshettyy/amr-assist",
    label: "View project",
    color: "purple",
    description:
      "antimicrobial resistance intelligence platform combining antibiotic-specific xgboost resistance prediction with shap explainability and citation-grounded rag for clinical evidence.",
    metric: "clinical ai",
    image: "/icons/soon.png",
    comingSoon: false,
  },
  {
    title: "VeriDrop",
    // url: "https://github.com/pawanshettyy/VeriDrop",
    label: "View project",
    color: "orange",
    description:
      "resume-scale restricted-commerce prototype with event-driven order processing, privacy-conscious identity verification, face and liveness checks, compliance workflows, and auditable delivery handoff.",
    metric: "computer vision",
    image: "/icons/soon.png",
    comingSoon: true,
  },
]

function hueClasses(color: Project["color"]) {
  switch (color) {
    case "blue":
      return {
        hoverBg: "group-hover:bg-blue-500/10",
        ring: "ring-blue-500/30",
        hoverRing: "hover:ring-blue-500",
        button:
          "bg-blue-500 text-black hover:bg-blue-400 focus-visible:outline-blue-400",
      }
    case "yellow":
      return {
        hoverBg: "group-hover:bg-yellow-400/10",
        ring: "ring-yellow-400/30",
        hoverRing: "hover:ring-yellow-400",
        button:
          "bg-yellow-400 text-black hover:bg-yellow-300 focus-visible:outline-yellow-300",
      }
    case "purple":
      return {
        hoverBg: "group-hover:bg-purple-500/10",
        ring: "ring-purple-500/30",
        hoverRing: "hover:ring-purple-500",
        button:
          "bg-purple-500 text-black hover:bg-purple-400 focus-visible:outline-purple-400",
      }
    case "orange":
      return {
        hoverBg: "group-hover:bg-orange-500/10",
        ring: "ring-orange-500/30",
        hoverRing: "hover:ring-orange-500",
        button:
          "bg-orange-500 text-black hover:bg-orange-400 focus-visible:outline-orange-400",
      }
  }
}

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    obs.observe(el)

    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-500 will-change-transform",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function Home() {
  const [colorFront, setColorFront] = useState("hsl(0, 100%, 50%)")

  useEffect(() => {
    let hue = 0

    const interval = setInterval(() => {
      hue = (hue + 1) % 360
      setColorFront(`hsl(${hue}, 100%, 50%)`)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const pastProjects: [string, string, string][] = [
    [
      "ghostcue",
      "open-source desktop teleprompter built with electron + typescript",
      "https://github.com/pawanshettyy",
    ],
    [
      "tatkal automator",
      "irctc tatkal booking automation tool",
      "https://github.com/pawanshettyy",
    ],
    [
      "black hole raytracer",
      "schwarzschild black hole renderer using react + canvas",
      "https://github.com/pawanshettyy",
    ],
    [
      "warehouse inventory",
      "quick commerce warehouse system built in python + streamlit + sqlite",
      "https://github.com/pawanshettyy",
    ],
    [
      "sports arbitrage calc",
      "arbitrage calculator for sports betting mathematics",
      "https://github.com/pawanshettyy",
    ],
    [
      "dmd screener",
      "ml pre-screener for duchenne muscular dystrophy in indian pediatric cohorts",
      "https://github.com/pawanshettyy",
    ],
    [
      "shack-hartmann",
      "wavefront reconstruction using zernike polynomials + fried parameter estimation",
      "https://github.com/pawanshettyy",
    ],
    [
      "face recognition kiosk",
      "offline facial recognition + liveness detection, under 20mb (mobilefacenet + onnx)",
      "https://github.com/pawanshettyy",
    ],
    [
      "ca firm saas",
      "gst reconciliation error detection saas for indian chartered accountants",
      "https://github.com/pawanshettyy",
    ],
    [
      "ai insurance reader",
      "ai-powered medical insurance policy reader and summarizer",
      "https://github.com/pawanshettyy",
    ],
    [
      "n8n cold email pipeline",
      "agentic n8n pipeline for cold-emailing research professors at iits",
      "https://github.com/pawanshettyy",
    ],
    [
      "payroll system",
      "employee payroll management system in java + spring boot",
      "https://github.com/pawanshettyy",
    ],
    [
      "campus network design",
      "full campus network topology designed in cisco packet tracer",
      "https://github.com/pawanshettyy",
    ],
    [
      "vyom rover",
      "engineering lead for college rover competing in the indian rover challenge",
      "https://github.com/pawanshettyy",
    ],
    [
      "quantneural work",
      "early ml research and trading signal experiments",
      "https://github.com/pawanshettyy",
    ],
  ]

  const pastRows = Array.from(
    { length: 5 },
    (_, i) => pastProjects.slice(i * 3, i * 3 + 3),
  )

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left: Content */}
      <main className="relative w-full overflow-y-auto bg-black no-scrollbar md:h-screen md:w-3/4">
        {/* IST time badge pinned to top-right of the left content panel */}
        <div className="absolute right-3 top-3 z-10 md:right-4 md:top-4">
          <TimeIST />
        </div>

        <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
          {/* Header */}
          <header className="mb-3 flex items-center gap-4 md:mb-4 md:gap-6">
            <h1 className="text-pretty text-6xl font-semibold tracking-tight md:text-6xl">
              yo, I&apos;m pawan
            </h1>
          </header>

          {/* Socials */}
          <section className="mb-6 md:mb-8">
            <h2 className="sr-only">Social links</h2>
            <ul className="flex flex-wrap items-center gap-3 md:gap-4">
              <li>
                <a
                  href={SOCIALS.x}
                  aria-label="X (Twitter)"
                  title="X (Twitter)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 transition-colors hover:border-white/20 hover:bg-white/5"
                >
                  <FaXTwitter className="h-5 w-5 text-white/80 hover:text-white" />
                </a>
              </li>
              <li>
                <a
                  href={SOCIALS.github}
                  aria-label="GitHub"
                  title="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 transition-colors hover:border-white/20 hover:bg-white/5"
                >
                  <FaGithub className="h-5 w-5 text-white/80 hover:text-white" />
                </a>
              </li>
              <li>
                <a
                  href={SOCIALS.linkedin}
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 transition-colors hover:border-white/20 hover:bg-white/5"
                >
                  <FaLinkedin className="h-5 w-5 text-white/80 hover:text-white" />
                </a>
              </li>
              <li>
                <a
                  href={SOCIALS.email}
                  aria-label="Send email"
                  title="Send email"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 transition-colors hover:border-white/20 hover:bg-white/5"
                >
                  <HiOutlineMail className="h-5 w-5 text-white/80 hover:text-white" />
                </a>
              </li>
            </ul>
          </section>

          {/* Intro */}
          <section className="space-y-4 text-lg leading-relaxed text-white/80 md:space-y-6 md:text-xl">
            <p>
               ai & ml undergrad at tcet (mu, 2024–28) and a builder from mumbai, india.
                i enjoy turning ideas into production-grade systems from ai and ml
                platforms to quantitative finance and distributed infrastructure.
                currently building amr-assist and inferMesh while exploring new ideas across
                tech and finance..
            </p>
            <p>
              gssoc&apos;25 contributor. software team @ vyom voyage (in-space cansat
              2026). ex-founding engineer @ spaciefy (aetheron.ai). open for internships,
              research, and interesting collaborations. when i&apos;m not coding, i&apos;m
              probably at the gym or watching football/f1.
            </p>
          </section>

          {/* Projects */}
          <section className="mt-10 md:mt-14">
            <Reveal>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight md:mb-6 md:text-3xl">
                building now
              </h2>
            </Reveal>

            <Reveal delay={75}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
                {projects.map((p, idx) => {
                  const c = hueClasses(p.color)

                  return (
                    <div
                      key={p.title}
                      className={cn(
                        "group relative rounded-xl bg-black p-4 ring-1 ring-white/10 transition-all duration-200 hover:-translate-y-1 md:p-5",
                        c.hoverRing,
                        c.hoverBg,
                      )}
                      style={{ transitionDelay: `${idx * 15}ms` }}
                    >
                      <div className="flex h-full flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={`${p.title} logo`}
                            className="h-6 w-6 shrink-0 rounded-sm bg-white/5 ring-1 ring-white/10"
                          />
                          <h3 className="text-lg font-medium text-white md:text-xl">
                            {p.title}
                          </h3>
                        </div>

                        <div className="mt-1 min-h-12">
                          {p.description ? (
                            <p className="text-sm leading-6 text-white/70 md:text-[15px]">
                              {p.description.split("\n").map((line, i) => (
                                <span key={i} className="block">
                                  {line}
                                </span>
                              ))}
                            </p>
                          ) : null}
                        </div>

                        <div className="mt-auto flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                          {p.url && !p.comingSoon ? (
                            <a
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                                c.button,
                              )}
                              aria-label={`Open ${p.title}`}
                              title={p.title}
                            >
                              {p.label || "View project"}
                            </a>
                          ) : (
                            <button
                              disabled
                              tabIndex={-1}
                              className="inline-flex cursor-not-allowed items-center rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-white/60"
                              aria-disabled="true"
                              aria-label={`${p.title} coming soon`}
                              title="Coming soon"
                            >
                              {p.label || "Coming soon"}
                            </button>
                          )}

                          <span className="text-xs text-white/70 md:text-sm">
                            {p.metric || (p.comingSoon ? "coming soon" : "")}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </section>

          {/* Experience */}
          <section className="mt-12 md:mt-16">
            <Reveal>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight md:mb-6 md:text-3xl">
                experience
              </h2>
            </Reveal>

            <Reveal delay={75}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
                {[
                  {
                    title: "founding engineer @ spaciefy · aetheron.ai",
                    tenure: "sep 2025 – jun 2026",
                    note: "designed backend architecture for a real-time collaborative design platform supporting concurrent multi-user editing and state synchronization. built production APIs and microservices with FastAPI, Node.js, and PostgreSQL covering authentication, data modeling, business logic, and service integration. improved API performance by approximately 30% through database indexing, query optimization, and caching.",
                    link: null,
                    label: null,
                  },
                  {
                    title: "full stack engineer intern @ rad kring",
                    tenure: "jul 2025 – oct 2025",
                    note: "built responsive React, Vite, and Tailwind interfaces for an urban air-mobility booking platform across desktop, tablet, and mobile clients. integrated booking, payment, and selection workflows with Node.js, Express, and MongoDB Atlas APIs, with structured error handling. optimized WebP and video assets and implemented CI/CD deployments through Netlify and Render.",
                    link: null,
                    label: null,
                  },
                  {
                    title: "backend developer intern @ quantneural",
                    tenure: "jun 2025 – jul 2025",
                    note: "developed backend services for real-time machine learning data pipelines, including inference APIs and optimized database queries. contributed to testing, API documentation, debugging, and maintainable service architecture in an agile development environment.",
                    link: null,
                    label: null,
                  },
                ].map((h, i) => (
                  <div
                    key={h.title}
                    className="group rounded-xl bg-black p-4 ring-1 ring-white/10 transition-all hover:-translate-y-1 hover:ring-2 hover:ring-white/70 hover:shadow-2xl md:p-5"
                    style={{ transitionDelay: `${i * 20}ms` }}
                  >
                    <div className="flex h-full flex-col gap-4">
                      <div>
                        <h3 className="text-lg font-medium text-white md:text-xl">
                          {h.title}
                        </h3>

                        <p className="mt-0.5 mb-1 text-xs text-white/40">
                          {h.tenure}
                        </p>

                        <div className="mt-1 min-h-12">
                          <p className="text-sm leading-6 text-white/70 md:text-[15px]">
                            {h.note}
                          </p>
                        </div>
                      </div>

                      {h.link && (
                        <div className="mt-auto flex items-center justify-end gap-2">
                          <a
                            href={h.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20 focus-visible:bg-white focus-visible:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            aria-label={`Visit ${h.title}`}
                            title={h.label || "Visit"}
                          >
                            {h.label}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* Past Projects / Graveyard */}
          <section className="mt-12 md:mt-16">
            <Reveal>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight md:mb-6 md:text-3xl">
                more projects
              </h2>
            </Reveal>

            <Reveal delay={75}>
              <div className="overflow-x-auto">
                <table className="w-full table-fixed border-separate border-spacing-0">
                  <tbody>
                    {pastRows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map(([name, desc, href]) => (
                          <td
                            key={name}
                            className="align-top border border-white/10 p-0"
                          >
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative block h-full w-full cursor-pointer p-3 text-white/90 transition-colors hover:text-black focus-visible:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:p-4"
                              aria-label={`open ${name} on github`}
                            >
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 rounded-none bg-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
                              />
                              <p className="relative z-10 text-sm leading-6 md:text-[15px]">
                                <span className="font-medium">{name}</span>{" "}
                                <span className="opacity-70">({desc})</span>
                              </p>
                            </a>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 md:mt-5">
                <a
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 underline underline-offset-4 hover:text-white md:text-base"
                  aria-label="see many more projects on my github"
                >
                  find even more on my github
                </a>
              </div>

              <GitHubContribGraph username="pawanshettyy" />

              <h3 className="mb-4 pt-10 text-2xl font-semibold tracking-tight md:mb-6 md:text-3xl">
                reach out &amp; more
              </h3>

              <p className="mt-3 text-sm text-white/80 md:text-base">
                always open for internships, freelance gigs, and interesting
                collabs. reach me via{" "}
                <a
                  href={SOCIALS.email}
                  className="underline underline-offset-4 hover:text-white"
                  aria-label="send me an email"
                >
                  email
                </a>{" "}
                or on{" "}
                <a
                  href={SOCIALS.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-white"
                  aria-label="message me on x"
                >
                  X
                </a>
                . thank you for visiting, have a great day ahead!
              </p>
            </Reveal>
          </section>
        </div>
      </main>

      {/* Right: Dithering strip */}
      <aside className="relative h-56 w-full md:sticky md:top-0 md:h-screen md:w-1/4">
        <Dithering
          style={{ height: "100%", width: "100%" }}
          colorBack="rgb(0, 0, 0)"
          colorFront={colorFront}
          shape="simplex"
          type="4x4"
          pxSize={2}
          offsetX={0}
          offsetY={0}
          scale={0.5}
          rotation={0}
          speed={1}
        />
      </aside>
    </div>
  )
}
