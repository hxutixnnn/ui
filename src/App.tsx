import { useEffect, useRef, useState, type ReactNode } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Search01Icon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  GithubIcon,
  Moon02Icon,
  Sun03Icon,
  Menu01Icon,
  Copy01Icon,
  SourceCodeIcon,
  Layers01Icon,
  Add01Icon,
  Settings01Icon,
  Folder01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ActionButton } from "@/components/tien/action-button"
import { FormField } from "@/components/tien/form-field"
import { LabeledSwitch } from "@/components/tien/labeled-switch"
import { SimpleDialog } from "@/components/tien/simple-dialog"
import { SimpleSelect } from "@/components/tien/simple-select"
import { SimpleTooltip } from "@/components/tien/simple-tooltip"
import { EmptyState } from "@/components/tien/empty-state"
import { PageHeader } from "@/components/tien/page-header"
import { useTheme } from "@/components/theme-provider"
import { entries, type Entry } from "./catalog"
import "./site.css"

type IconType = typeof Search01Icon
const Icon = ({ icon, size = 18 }: { icon: IconType; size?: number }) => (
  <HugeiconsIcon icon={icon} size={size} strokeWidth={1.7} />
)
const componentExports: Record<string, string> = {
  card: "Card, CardHeader, CardTitle, CardDescription, CardContent",
  accordion: "Accordion, AccordionItem, AccordionTrigger, AccordionContent",
  tabs: "Tabs, TabsList, TabsTrigger, TabsContent",
}
const sourceFiles = import.meta.glob("./components/{tien,ui}/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>
function CopyButton({
  text,
  label = "Copy",
}: {
  text: string
  label?: string
}) {
  const [state, setState] = useState("idle")
  return (
    <button
      className="copy-button"
      aria-label={label}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setState("copied")
        } catch {
          setState("failed")
        }
        setTimeout(() => setState("idle"), 2200)
      }}
    >
      <Icon icon={state === "copied" ? Tick02Icon : Copy01Icon} size={15} />
      <span>
        {state === "copied"
          ? "Copied"
          : state === "failed"
            ? "Select and copy"
            : label}
      </span>
    </button>
  )
}
function Code({ children }: { children: string }) {
  return (
    <div className="code-block">
      <CopyButton text={children} />
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  )
}
function Demo({ name }: { name: string }) {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [created, setCreated] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  const save = () => {
    setLoading(true)
    setSaved(false)
    timer.current = setTimeout(() => {
      setLoading(false)
      setSaved(true)
    }, 1000)
  }
  switch (name) {
    case "action-button":
      return (
        <div className="demo-stack">
          <div className="demo-row">
            <ActionButton
              loading={loading}
              leadingIcon={<Icon icon={saved ? Tick02Icon : Add01Icon} />}
              onClick={save}
            >
              {saved ? "Changes saved" : "Save changes"}
            </ActionButton>
            <ActionButton
              variant="outline"
              trailingIcon={<Icon icon={ArrowRight01Icon} />}
            >
              Continue
            </ActionButton>
          </div>
          <span className="demo-hint" role="status">
            {loading ? "Saving your demo changes…" : "Try the loading state."}
          </span>
        </div>
      )
    case "form-field":
      return (
        <div className="field-demo">
          <FormField
            label="Email address"
            type="email"
            placeholder="you@example.com"
            description="Used for project invitations."
          />
          <FormField label="Project name" defaultValue="My next big thing" />
        </div>
      )
    case "labeled-switch":
      return (
        <div className="field-demo">
          <LabeledSwitch
            label="Email notifications"
            description="Updates about your projects."
            defaultChecked
          />
          <Separator />
          <LabeledSwitch
            label="Weekly digest"
            description="A little less inbox, a little more focus."
          />
        </div>
      )
    case "simple-dialog":
      return (
        <SimpleDialog
          open={dialog}
          onOpenChange={setDialog}
          trigger={
            <Button>
              Edit profile <Icon icon={ArrowUpRight01Icon} />
            </Button>
          }
          title="Edit profile"
          description="Make yourself at home."
          footer={
            <Button onClick={() => setDialog(false)}>Save changes</Button>
          }
        >
          <FormField label="Name" defaultValue="Tien Nguyen" />
          <FormField
            label="Email"
            defaultValue="tien@example.com"
            type="email"
          />
        </SimpleDialog>
      )
    case "simple-select":
      return (
        <div className="field-demo">
          <SimpleSelect
            label="Framework"
            placeholder="Choose a framework"
            options={[
              { label: "Next.js", value: "next" },
              { label: "Vite", value: "vite" },
              { label: "TanStack Start", value: "start" },
              { label: "Astro", value: "astro" },
            ]}
          />
        </div>
      )
    case "simple-tooltip":
      return (
        <SimpleTooltip content="Project settings">
          <Button variant="outline">
            <Icon icon={Settings01Icon} />
            Settings
          </Button>
        </SimpleTooltip>
      )
    case "empty-state":
      return (
        <EmptyState
          icon={<Icon icon={Folder01Icon} size={26} />}
          title={created ? "Your project is ready" : "No projects yet"}
          description={
            created
              ? "A new home for your next idea."
              : "Your next idea starts here."
          }
          action={
            <Button onClick={() => setCreated(!created)}>
              <Icon icon={Add01Icon} />
              {created ? "Reset demo" : "Create project"}
            </Button>
          }
        />
      )
    case "page-header":
      return (
        <div className="w-full">
          <PageHeader
            eyebrow="Workspace"
            title="Your projects"
            description="Everything you are working on."
            actions={
              <Button onClick={() => setCreated(!created)}>
                {created ? "Project created" : "New project"}
              </Button>
            }
          />
        </div>
      )
    case "button":
      return (
        <div className="demo-row">
          <Button>
            Continue <Icon icon={ArrowRight01Icon} />
          </Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Delete</Button>
          <Button disabled>Disabled</Button>
        </div>
      )
    case "input":
      return (
        <div className="field-demo">
          <Input
            aria-label="Email"
            type="email"
            placeholder="you@example.com"
          />
          <Input
            aria-label="Disabled input"
            placeholder="Disabled input"
            disabled
          />
        </div>
      )
    case "textarea":
      return (
        <Textarea
          className="max-w-sm"
          aria-label="Notes"
          placeholder="Write a few notes…"
        />
      )
    case "checkbox":
      return (
        <div className="demo-stack">
          <label className="demo-row">
            <Checkbox defaultChecked />
            Accept the terms
          </label>
          <label className="demo-row">
            <Checkbox />
            Send me product updates
          </label>
        </div>
      )
    case "switch":
      return (
        <div className="demo-row">
          <Switch aria-label="Enable notifications" defaultChecked />
          <Switch aria-label="Enable digest" />
          <Switch aria-label="Unavailable setting" disabled />
        </div>
      )
    case "badge":
      return (
        <div className="demo-row">
          <Badge>
            <span className="status-dot" />
            Active
          </Badge>
          <Badge variant="secondary">Draft</Badge>
          <Badge variant="outline">Archived</Badge>
          <Badge variant="destructive">Failed</Badge>
        </div>
      )
    case "card":
      return (
        <Card className="w-full max-w-xs">
          <CardHeader>
            <div className="project-icon">
              <Icon icon={Layers01Icon} />
            </div>
            <CardTitle>Personal website</CardTitle>
            <CardDescription>A place for everything you make.</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary">In progress</Badge>
          </CardContent>
        </Card>
      )
    case "accordion":
      return (
        <Accordion className="max-w-md">
          <AccordionItem value="source">
            <AccordionTrigger>Do I own the code?</AccordionTrigger>
            <AccordionContent>
              Yes. Components are copied into your project, ready to change.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="stack">
            <AccordionTrigger>What is this built on?</AccordionTrigger>
            <AccordionContent>
              React, shadcn/ui, Base UI, and Tailwind CSS. This library uses the
              Luma yellow preset.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )
    case "tabs":
      return (
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="p-4">
            Your component, in action.
          </TabsContent>
          <TabsContent value="code" className="p-4">
            The source lives in your project.
          </TabsContent>
          <TabsContent value="details" className="p-4">
            Built with Base UI keyboard navigation.
          </TabsContent>
        </Tabs>
      )
    case "separator":
      return (
        <div className="field-demo">
          <p>Project settings</p>
          <Separator />
          <p className="text-muted-foreground">Team preferences</p>
        </div>
      )
    case "skeleton":
      return (
        <div className="demo-row">
          <Skeleton className="size-12 rounded-full" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      )
    default:
      return null
  }
}
function PreviewCard({
  name,
  children,
  onNavigate,
}: {
  name: string
  children?: ReactNode
  onNavigate: (path: string) => void
}) {
  const e = entries.find((e) => e.name === name)!
  return (
    <article className="preview-card">
      <div className="mini-preview">{children ?? <Demo name={name} />}</div>
      <button
        className="card-caption"
        onClick={() => onNavigate("/components/" + name)}
      >
        <span>{e.title}</span>
        <Icon icon={ArrowUpRight01Icon} size={16} />
      </button>
    </article>
  )
}
function ComponentPage({ entry }: { entry: Entry }) {
  const [tab, setTab] = useState("preview")
  const wrapper = entry.category !== "Foundations"
  const src =
    sourceFiles[`./components/${wrapper ? "tien" : "ui"}/${entry.name}.tsx`] ??
    ""
  return (
    <>
      <div className="section-kicker">
        {entry.category} <span>/</span> {entry.title}
      </div>
      <div className="page-title">
        <h1>{entry.title}</h1>
        <Badge variant="outline">
          {wrapper ? "Simplified API" : "shadcn / Luma"}
        </Badge>
      </div>
      <p className="page-description">{entry.description}</p>
      <div className="example-tabs">
        <button
          aria-pressed={tab === "preview"}
          className={tab === "preview" ? "selected" : ""}
          onClick={() => setTab("preview")}
        >
          Preview
        </button>
        <button
          aria-pressed={tab === "source"}
          className={tab === "source" ? "selected" : ""}
          onClick={() => setTab("source")}
        >
          Source
        </button>
        <span>React · TypeScript</span>
      </div>
      {tab === "preview" ? (
        <div className="large-preview">
          <Demo name={entry.name} />
        </div>
      ) : (
        <Code>{src}</Code>
      )}
      <section className="doc-section">
        <h2>Installation</h2>
        <Code>{`npx shadcn@latest add hxutixnnn/ui/${entry.name}`}</Code>
        <p>Installs the source and its dependencies into your project.</p>
      </section>
      <section className="doc-section">
        <h2>Usage</h2>
        <Code>{`"use client"\n\nimport { ${
          componentExports[entry.name] ??
          entry.title
            .split(" ")
            .map((s) => s[0].toUpperCase() + s.slice(1))
            .join("")
        } } from "@/components/${wrapper ? "tien/" : "ui/"}${entry.name}"\n${entry.imports ?? ""}\nexport default function Example() {\n  return (\n    <>\n${entry.code
          .split("\n")
          .map((line) => "      " + line)
          .join("\n")}\n    </>\n  )\n}`}</Code>
      </section>
      <section className="doc-section">
        <h2>Props</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {entry.props.map(([name, type, description]) => (
                <tr key={name}>
                  <td>
                    <code>{name}</code>
                  </td>
                  <td>
                    <code>{type}</code>
                  </td>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          {wrapper
            ? "See Source for the complete TypeScript interface."
            : "All underlying Base UI or native element props are supported. See Source for exports."}
        </p>
      </section>
    </>
  )
}
function Guide() {
  return (
    <>
      <div className="section-kicker">GET STARTED</div>
      <h1>Make it yours.</h1>
      <p className="page-description">
        One set of defaults for your next project. Source files you can change.
      </p>
      <section className="doc-section">
        <h2>1. Start with your preset</h2>
        <p>Initialize a React project with Luma, yellow, Geist, and Base UI.</p>
        <Code>{"npx shadcn@latest init hxutixnnn/ui/index"}</Code>
      </section>
      <section className="doc-section">
        <h2>2. Add your components</h2>
        <p>Install directly from the GitHub registry.</p>
        <Code>
          {
            "npx shadcn@latest add hxutixnnn/ui/action-button\nnpx shadcn@latest add hxutixnnn/ui/form-field"
          }
        </Code>
        <p>Or use the hosted registry URL.</p>
        <Code>
          {
            "npx shadcn@latest add https://ui.nguyenhuutien.com/r/action-button.json"
          }
        </Code>
      </section>
      <section className="doc-section">
        <h2>3. Give your agent the context</h2>
        <p>
          Point your coding agent to the component catalog and installation
          guide.
        </p>
        <Code>
          {
            "Use Tien UI for this project. Read https://ui.nguyenhuutien.com/llms.txt\nInstall components from hxutixnnn/ui. Prefer the simplified wrappers\nfor buttons, form fields, selects, tooltips, and dialogs."
          }
        </Code>
      </section>
      <section className="doc-section">
        <h2>Keep the source close</h2>
        <p>
          Foundations install to components/ui. Simplified components install to
          components/tien. Change the source to fit your product. There is no
          runtime Tien UI package.
        </p>
      </section>
    </>
  )
}
function App() {
  const [path, setPath] = useState(
    window.location.pathname.replace(/\/$/, "") || "/"
  )
  const [query, setQuery] = useState("")
  const [mobile, setMobile] = useState(false)
  const { theme, setTheme } = useTheme()
  const searchRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLButtonElement>(null)
  const navigate = (next: string) => {
    window.history.pushState({}, "", next)
    setPath(next)
    setMobile(false)
    setQuery("")
    window.scrollTo(0, 0)
  }
  useEffect(() => {
    const pop = () => {
      setPath(window.location.pathname.replace(/\/$/, "") || "/")
      setMobile(false)
    }
    window.addEventListener("popstate", pop)
    return () => window.removeEventListener("popstate", pop)
  }, [])
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setMobile(true)
        setTimeout(() => searchRef.current?.focus(), 0)
      }
      if (e.key === "Escape") {
        if (
          window.innerWidth <= 800 &&
          document.activeElement?.closest(".sidebar")
        )
          menuRef.current?.focus()
        setMobile(false)
        setQuery("")
      }
    }
    window.addEventListener("keydown", key)
    return () => window.removeEventListener("keydown", key)
  }, [])
  const current = entries.find((e) => path === "/components/" + e.name)
  useEffect(() => {
    document.title = `${current?.title ?? (path === "/guide" ? "Usage guide" : "Components for my next idea")} · Tien UI`
  }, [path, current])
  const filtered = entries.filter((e) =>
    (e.title + " " + e.description).toLowerCase().includes(query.toLowerCase())
  )
  const groups = ["Everyday", "Forms", "Overlays", "Layout", "Foundations"]
  return (
    <TooltipProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="app-shell">
        {mobile && (
          <button
            className="mobile-scrim"
            aria-label="Close navigation"
            onClick={() => setMobile(false)}
          />
        )}
        <aside
          id="library-navigation"
          className={`sidebar ${mobile ? "is-open" : ""}`}
        >
          <a
            className="brand"
            href="/"
            onClick={(e) => {
              e.preventDefault()
              navigate("/")
            }}
          >
            <span className="brand-mark">
              t<span>.</span>
            </span>
            <span>
              Tien <span className="brand-ui">UI</span>
            </span>
            <Badge variant="outline">v0.1</Badge>
          </a>
          <p className="sidebar-tagline">My components. My defaults.</p>
          <div className="search-box">
            <Icon icon={Search01Icon} size={16} />
            <input
              ref={searchRef}
              aria-label="Find a component"
              placeholder="Find a component…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <kbd>⌘ K</kbd>
          </div>
          <nav aria-label="Main navigation">
            <div className="nav-intro">
              <a
                href="/"
                className={path === "/" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault()
                  navigate("/")
                }}
              >
                <Icon icon={Layers01Icon} size={16} />
                Overview
              </a>
              <a
                href="/guide"
                className={path === "/guide" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault()
                  navigate("/guide")
                }}
              >
                <Icon icon={SourceCodeIcon} size={16} />
                Usage guide
              </a>
            </div>
            {groups.map((group) => {
              const items = filtered.filter((e) => e.category === group)
              return (
                items.length > 0 && (
                  <div className="nav-group" key={group}>
                    <div className="nav-group-title">
                      {group}
                      <span>{items.length.toString().padStart(2, "0")}</span>
                    </div>
                    {items.map((e) => (
                      <a
                        key={e.name}
                        href={"/components/" + e.name}
                        className={current?.name === e.name ? "active" : ""}
                        onClick={(event) => {
                          event.preventDefault()
                          navigate("/components/" + e.name)
                        }}
                      >
                        {e.title}
                        {e.name === "action-button" && (
                          <span className="tiny-dot" />
                        )}
                      </a>
                    ))}
                  </div>
                )
              )
            })}
            {filtered.length === 0 && (
              <p className="no-results">No components found.</p>
            )}
          </nav>
          <div className="sidebar-bottom">
            <a
              href="https://github.com/hxutixnnn"
              target="_blank"
              rel="noreferrer"
            >
              <img className="avatar" src="/avatar.jpg" alt="" width={32} height={32} />
              <span>
                Nguyen Huu Tien<small>@hxutixnnn</small>
              </span>
              <Icon icon={ArrowUpRight01Icon} size={15} />
            </a>
          </div>
        </aside>
        <div className="main-shell">
          <header className="topbar">
            <div className="breadcrumb">
              <button
                ref={menuRef}
                aria-expanded={mobile}
                aria-controls="library-navigation"
                className="mobile-toggle icon-button"
                aria-label="Open navigation"
                onClick={() => {
                  setMobile(true)
                  setTimeout(() => searchRef.current?.focus(), 0)
                }}
              >
                <Icon icon={Menu01Icon} />
              </button>
              <span>Library</span>
              <span className="slash">/</span>
              <span>
                {current?.title ??
                  (path === "/guide" ? "Usage guide" : "Overview")}
              </span>
            </div>
            <div className="top-actions">
              <a href="/llms.txt" className="llms-link">
                llms.txt <Icon icon={ArrowUpRight01Icon} size={13} />
              </a>
              <a
                className="icon-button"
                href="https://github.com/hxutixnnn/ui"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub repository"
              >
                <Icon icon={GithubIcon} />
              </a>
              <span className="vertical-line" />
              <button
                className="icon-button"
                aria-label="Toggle color theme"
                onClick={() =>
                  setTheme(
                    theme === "dark" ||
                      (theme === "system" &&
                        matchMedia("(prefers-color-scheme: dark)").matches)
                      ? "light"
                      : "dark"
                  )
                }
              >
                <Icon icon={theme === "dark" ? Sun03Icon : Moon02Icon} />
              </button>
            </div>
          </header>
          <main
            id="main"
            className={
              current || path === "/guide" ? "content docs-content" : "content"
            }
          >
            {current ? (
              <ComponentPage key={current.name} entry={current} />
            ) : path === "/guide" ? (
              <Guide />
            ) : path === "/" ? (
              <>
                <div className="hero">
                  <div className="hero-top">
                    <span className="eyebrow">
                      <span className="tiny-dot" /> A PERSONAL COMPONENT LIBRARY
                    </span>
                    <span className="edition">EST. 2026</span>
                  </div>
                  <h1>
                    Less setup.
                    <br />
                    More{" "}
                    <span className="highlight-word">
                      making
                      <svg
                        viewBox="0 0 310 12"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 8 Q 150 0 308 5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="5"
                        />
                      </svg>
                    </span>
                    .
                  </h1>
                  <p>
                    The components I reach for, with the defaults I like.
                    <br className="desktop-break" /> Built on shadcn/ui. Ready
                    for my next idea.
                  </p>
                  <div className="hero-actions">
                    <Button
                      size="lg"
                      onClick={() => navigate("/components/action-button")}
                    >
                      Explore components <Icon icon={ArrowRight01Icon} />
                    </Button>
                    <button
                      className="text-link"
                      onClick={() => navigate("/guide")}
                    >
                      How to use <Icon icon={ArrowUpRight01Icon} size={16} />
                    </button>
                  </div>
                  <div className="preset-strip">
                    <span>
                      <span className="yellow-swatch" />
                      Luma / Yellow
                    </span>
                    <span>Geist</span>
                    <span>Base UI</span>
                    <a
                      href="https://ui.shadcn.com/create?preset=b6GfB1yV8&item=preview"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View preset <Icon icon={ArrowUpRight01Icon} size={13} />
                    </a>
                  </div>
                </div>
                <div className="install-strip">
                  <div>
                    <span className="terminal-symbol">❯</span>
                    <code>
                      npx shadcn@latest add hxutixnnn/ui/action-button
                    </code>
                  </div>
                  <CopyButton text="npx shadcn@latest add hxutixnnn/ui/action-button" />
                </div>
                <section className="collection-section">
                  <div className="section-heading">
                    <div>
                      <span className="section-kicker">THE COLLECTION</span>
                      <h2>Small pieces. Already considered.</h2>
                    </div>
                    <span className="component-count">
                      {entries.length} components <span>↙</span>
                    </span>
                  </div>
                  <div className="preview-grid">
                    <PreviewCard name="action-button" onNavigate={navigate} />
                    <PreviewCard name="form-field" onNavigate={navigate} />
                    <PreviewCard name="labeled-switch" onNavigate={navigate} />
                    <PreviewCard name="simple-dialog" onNavigate={navigate}>
                      <div className="dialog-teaser">
                        <span className="demo-label">
                          A little less boilerplate
                        </span>
                        <h3>A dialog in a few props.</h3>
                        <Demo name="simple-dialog" />
                      </div>
                    </PreviewCard>
                    <PreviewCard name="simple-select" onNavigate={navigate} />
                    <PreviewCard name="badge" onNavigate={navigate} />
                  </div>
                </section>
                <section className="agent-note">
                  <span className="agent-icon">
                    <Icon icon={SourceCodeIcon} size={22} />
                  </span>
                  <div>
                    <h3>For me. And my coding agent.</h3>
                    <p>
                      Install the source. Keep the same patterns across
                      projects.
                    </p>
                  </div>
                  <a href="/llms.txt">
                    Read llms.txt <Icon icon={ArrowUpRight01Icon} size={15} />
                  </a>
                </section>
              </>
            ) : (
              <>
                <h1>Nothing here yet.</h1>
                <p className="page-description">
                  This component page does not exist.
                </p>
                <Button onClick={() => navigate("/")}>
                  Back to the library
                </Button>
              </>
            )}
          </main>
          <footer>
            <span>
              Tien UI <span className="footer-dot">·</span> Built to be used.
            </span>
            <span>
              shadcn/ui + Base UI <span className="footer-dot">/</span>{" "}
              <a
                href="https://github.com/hxutixnnn/ui"
                target="_blank"
                rel="noreferrer"
              >
                Source <Icon icon={ArrowUpRight01Icon} size={13} />
              </a>
            </span>
          </footer>
        </div>
      </div>
    </TooltipProvider>
  )
}
export default App
