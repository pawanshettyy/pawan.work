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
    title: "lumia",
    label: "View project",
    color: "blue",
    description: "self-hosted google photos alternative. sync, store and browse your photos privately with a fast mobile app and web ui.",
    metric: "in development",
    image: "/icons/lumia.png",
    comingSoon: true,
  },
  {
    title: "nagarsetu",
    label: "View project",
    color: "yellow",
    description: "hyperlocal civic social network for mumbai. report issues, auto-file bmc complaints, and hold your ward accountable.",
    metric: "in development",
    image: "/icons/nagarsetu.png",
    comingSoon: true,
  },
  {
    title: "antibiotic resistance detector",
    label: "View project",
    color: "purple",
    description: "ehr-based ml model (xgboost + shap) to detect antibiotic resistance patterns. rag-powered chatbot layer for clinical decision support.",
    metric: "research project",
    image: "/icons/soon.png",
    comingSoon: true,
  },
  {
    title: "sos dispatch",
    label: "View project",
    color: "orange",
    description: "blinkit-inspired emergency response web app. real-time responder dispatch using postgis geo-queries and supabase realtime websockets.",
    metric: "portfolio project",
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
        button: "bg-blue-500 text-black hover:bg-blue-400 focus-visible:outline-blue-400",
      }
    case "yellow":
      return {
        hoverBg: "group-hover:bg-yellow-400/10",
        ring: "ring-yellow-400/30",
        hoverRing: "hover:ring-yellow-400",
        button: "bg-yellow-400 text-black hover:bg-yellow-300 focus-visible:outline-yellow-300",
      }
    case "purple":
      return {
        hoverBg: "group-hover:bg-purple-500/10",
        ring: "ring-purple-500/30",
        hoverRing: "hover:ring-purple-500",
        button: "bg-purple-500 text-black hover:bg-purple-400 focus-visible:outline-purple-400",
      }
    case "orange":
      return {
        hoverBg: "group-hover:bg-orange-500/10",
        ring: "ring-orange-500/30",
        hoverRing: "hover:ring-orange-500",
        button: "bg-orange-500 text-black hover:bg-orange-400 focus-visible:outline-orange-400",
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
    ["ghostcue", "open-source desktop teleprompter built with electron + typescript", "https://github.com/pawanshettyy"],
    ["tatkal automator", "irctc tatkal booking automation tool", "https://github.com/pawanshettyy"],
    ["black hole raytracer", "schwarzschild black hole renderer using react + canvas", "https://github.com/pawanshettyy"],
    ["warehouse inventory", "quick commerce warehouse system built in python + streamlit + sqlite", "https://github.com/pawanshettyy"],
    ["sports arbitrage calc", "arbitrage calculator for sports betting mathematics", "https://github.com/pawanshettyy"],
    ["dmd screener", "ml pre-screener for duchenne muscular dystrophy in indian pediatric cohorts", "https://github.com/pawanshettyy"],
    ["shack-hartmann", "wavefront reconstruction using zernike polynomials + fried parameter estimation", "https://github.com/pawanshettyy"],
    ["face recognition kiosk", "offline facial recognition + liveness detection, under 20mb (mobilefacenet + onnx)", "https://github.com/pawanshettyy"],
    ["ca firm saas", "gst reconciliation error detection saas for indian chartered accountants", "https://github.com/pawanshettyy"],
    ["ai insurance reader", "ai-powered medical insurance policy reader and summarizer", "https://github.com/pawanshettyy"],
    ["n8n cold email pipeline", "agentic n8n pipeline for cold-emailing research professors at iits", "https://github.com/pawanshettyy"],
    ["payroll system", "employee payroll management system in java + spring boot", "https://github.com/pawanshettyy"],
    ["campus network design", "full campus network topology designed in cisco packet tracer", "https://github.com/pawanshettyy"],
    ["vyom rover", "engineering lead for college rover competing in the indian rover challenge", "https://github.com/pawanshettyy"],
    ["quantneural work", "early ml research and trading signal experiments", "https://github.com/pawanshettyy"],
  ]

  const pastRows = Array.from({ length: 5 }, (_, i) => pastProjects.slice(i * 3, i * 3 + 3))

  return (
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left: Content */}
        <main className="relative w-full md:w-3/4 md:h-screen bg-black overflow-y-auto no-scrollbar">
          {/* IST time badge pinned to top-right of the left content panel */}
          <div className="absolute right-3 top-3 md:right-4 md:top-4 z-10">
            <TimeIST />
          </div>

          <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
            {/* Header */}
            <header className="flex items-center gap-4 md:gap-6 mb-3 md:mb-4">
              <h1 className="text-pretty text-6xl md:text-6xl font-semibold tracking-tight">yo, I&apos;m pawan</h1>
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
                      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 hover:border-white/20 hover:bg-white/5 transition-colors"
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
                      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 hover:border-white/20 hover:bg-white/5 transition-colors"
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
                      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 hover:border-white/20 hover:bg-white/5 transition-colors"
                  >
                    <FaLinkedin className="h-5 w-5 text-white/80 hover:text-white" />
                  </a>
                </li>
                <li>
                  <a
                      href={SOCIALS.email}
                      aria-label="Send email"
                      title="Send email"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 hover:border-white/20 hover:bg-white/5 transition-colors"
                  >
                    <HiOutlineMail className="h-5 w-5 text-white/80 hover:text-white" />
                  </a>
                </li>
              </ul>
            </section>

            {/* Intro */}
            <section className="space-y-4 md:space-y-6 text-lg md:text-xl leading-relaxed text-white/80">
              <p>
                20 y/o builder from mumbai, india. ai & ml undergrad at tcet (mu, 2024–28). i like building things that are useful — full-stack apps, ml systems, civic tools. currently shipping lumia and nagarsetu while learning something new every day.
              </p>
              <p>
                gssoc&apos;25 contributor. software team @ vyom voyage (in-space cansat 2026). ex-spm @ aetheron.ai. open for internships and collabs 24/7. if not coding, i&apos;m at the gym or watching cricket.
              </p>
            </section>

            {/* Projects */}
            <section className="mt-10 md:mt-14">
              <Reveal>
                <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl font-semibold tracking-tight">building now</h2>
              </Reveal>
              <Reveal delay={75}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  {projects.map((p, idx) => {
                    const c = hueClasses(p.color)
                    return (
                        <div
                            key={p.title}
                            className={cn(
                                "group relative rounded-xl bg-black ring-1 ring-white/10 transition-all duration-200 hover:-translate-y-1 p-4 md:p-5",
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
                                  className="h-6 w-6 rounded-sm ring-1 ring-white/10 bg-white/5 shrink-0"
                              />
                              <h3 className="text-lg md:text-xl font-medium text-white">{p.title}</h3>
                            </div>
                            <div className="mt-1 min-h-12">
                              {p.description ? (
                                  <p className="text-white/70 text-sm md:text-[15px] leading-6">
                                    {p.description.split("\n").map((line, i) => (
                                        <span key={i} className="block">
                                  {line}
                                </span>
                                    ))}
                                  </p>
                              ) : null}
                            </div>
                            <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
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
                                      className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium bg-white/10 text-white/60 cursor-not-allowed"
                                      aria-disabled="true"
                                      aria-label={`${p.title} coming soon`}
                                      title="Coming soon"
                                  >
                                    {p.label || "Coming soon"}
                                  </button>
                              )}
                              <span className="text-xs md:text-sm text-white/70">
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
                <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl font-semibold tracking-tight">experience</h2>
              </Reveal>
              <Reveal delay={75}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  {[
                    {
                      title: "software product manager @ aetheron.ai",
                      tenure: "jan 2026 – jun 2026",
                      note: "worked closely with backend and frontend engineers to scope features, define apis and system behavior, and make trade-offs around performance, scalability, and delivery. previously founding engineer on spaciefy (sep–jan 2025) — built backend architecture, apis, auth, and data systems from scratch.",
                      link: null,
                      label: null,
                    },
                    {
                      title: "software team member @ vyom voyage · in-space cansat 2026",
                      tenure: "jun 2026 – present",
                      note: "multidisciplinary member across robotics, r&d, and software teams. previously team lead for rovers & robots (jun 2025–jan 2026), leading development for national and international competitions.",
                      link: null,
                      label: null,
                    },
                    {
                      title: "full stack engineer intern @ rad kring",
                      tenure: "jul 2025 – oct 2025",
                      note: "built an urban air mobility booking platform. led frontend in react, vite, and tailwind with framer motion animations. collaborated on backend apis using node.js, express, and mongodb atlas. deployed to netlify and render.",
                      link: null,
                      label: null,
                    },
                    {
                      title: "backend developer intern @ quantneural",
                      tenure: "jun 2025 – jul 2025",
                      note: "backend development internship. early experiments in server-side systems and ml-driven trading signal pipelines.",
                      link: null,
                      label: null,
                    },
                  ].map((h, i) => (
                      <div
                          key={h.title}
                          className="group rounded-xl bg-black ring-1 ring-white/10 transition-all hover:-translate-y-1 hover:ring-2 hover:ring-white/70 hover:shadow-2xl p-4 md:p-5"
                          style={{ transitionDelay: `${i * 20}ms` }}
                      >
                        <div className="flex h-full flex-col gap-4">
                          <div>
                            <h3 className="text-lg md:text-xl font-medium text-white">{h.title}</h3>
                            <p className="text-xs text-white/40 mt-0.5 mb-1">{h.tenure}</p>
                            <div className="mt-1 min-h-12">
                              <p className="text-sm md:text-[15px] text-white/70 leading-6">{h.note}</p>
                            </div>
                          </div>
                          {h.link && (
                              <div className="mt-auto flex items-center justify-end gap-2">
                                <a
                                    href={h.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium bg-white/10 text-white hover:bg-white/20 focus-visible:bg-white focus-visible:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl font-semibold tracking-tight">more projects</h2>
              </Reveal>
              <Reveal delay={75}>
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-separate border-spacing-0">
                    <tbody>
                    {pastRows.map((row, ri) => (
                        <tr key={ri}>
                          {row.map(([name, desc, href]) => (
                              <td key={name} className="align-top p-0 border border-white/10">
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative block w-full h-full p-3 md:p-4 cursor-pointer text-white/90 transition-colors hover:text-black focus-visible:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                    aria-label={`open ${name} on github`}
                                >
                              <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute inset-0 rounded-none bg-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
                              />
                                  <p className="relative z-10 text-sm md:text-[15px] leading-6">
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
                      className="text-sm md:text-base text-white/80 hover:text-white underline underline-offset-4"
                      aria-label="see many more projects on my github"
                  >
                    find even more on my github
                  </a>
                </div>
                <GitHubContribGraph username="pawanshettyy" />
                <h3 className="mb-4 md:mb-6 text-2xl md:text-3xl font-semibold tracking-tight pt-10">reach out &amp; more</h3>
                <p className="mt-3 text-sm md:text-base text-white/80">
                  always open for internships, freelance gigs, and interesting collabs. reach me via{" "}
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
        <aside className="w-full md:w-1/4 h-56 md:h-screen md:sticky md:top-0 relative">
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