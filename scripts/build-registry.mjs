import fs from "node:fs/promises"
import path from "node:path"
import { execFileSync } from "node:child_process"
const base = JSON.parse(await fs.readFile("registry/preset.json", "utf8"))
const packageJson = JSON.parse(await fs.readFile("package.json", "utf8"))
const items = [
  {
    ...base,
    name: "index",
    title: "Tien UI defaults",
    description:
      "Luma, yellow, Geist, Hugeicons, and Base UI. Preset b6GfB1yV8.",
  },
]
for (const dir of ["ui", "tien"]) {
  for (const file of (await fs.readdir(`src/components/${dir}`))
    .filter((f) => f.endsWith(".tsx"))
    .sort()) {
    const name = path.basename(file, ".tsx")
    const sourcePath = `src/components/${dir}/${file}`
    const content = await fs.readFile(sourcePath, "utf8")
    const imports = [...content.matchAll(/from ["']([^"']+)["']/g)].map(
      (m) => m[1]
    )
    const localDependencies = [
      ...new Set(
        imports
          .filter((s) => s.startsWith("@/components/ui/"))
          .map((s) => `hxutixnnn/ui/${s.split("/").pop()}`)
      ),
    ]
    if (imports.includes("@/lib/utils")) localDependencies.push("utils")
    const deps = [
      ...new Set(
        imports
          .filter(
            (s) => !s.startsWith("@/") && !s.startsWith(".") && s !== "react"
          )
          .map((s) =>
            s.startsWith("@")
              ? s.split("/").slice(0, 2).join("/")
              : s.split("/")[0]
          )
      ),
    ].map((s) => `${s}@${packageJson.dependencies[s]}`)
    items.push({
      name,
      type: dir === "ui" ? "registry:ui" : "registry:component",
      title: name
        .split("-")
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join(" "),
      description: `${dir === "ui" ? "Luma preset foundation" : "Simplified Tien UI component"}: ${name}.`,
      dependencies: deps,
      registryDependencies: localDependencies,
      files: [
        {
          path: sourcePath,
          type: dir === "ui" ? "registry:ui" : "registry:component",
          target: dir === "ui" ? `@ui/${file}` : `@components/tien/${file}`,
        },
      ],
    })
  }
}
const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "tien-ui",
  homepage: "https://ui.nguyenhuutien.com",
  items,
}
await fs.writeFile("registry.json", JSON.stringify(registry, null, 2) + "\n")
execFileSync("node", ["node_modules/shadcn/dist/index.js", "build"], {
  stdio: "inherit",
})
// Hosted dependencies resolve on the same domain, while the source registry uses GitHub addresses.
for (const item of items) {
  const file = `public/r/${item.name}.json`
  const payload = JSON.parse(await fs.readFile(file, "utf8"))
  payload.registryDependencies = payload.registryDependencies?.map((dep) =>
    dep.startsWith("hxutixnnn/ui/")
      ? `https://ui.nguyenhuutien.com/r/${dep.split("/").pop()}.json`
      : dep
  )
  await fs.writeFile(file, JSON.stringify(payload, null, 2) + "\n")
}
await fs.writeFile(
  "public/r/registry.json",
  JSON.stringify(registry, null, 2) + "\n"
)
await fs.writeFile(
  "public/registry.json",
  JSON.stringify(registry, null, 2) + "\n"
)
console.log(`Built ${items.length} registry items.`)
