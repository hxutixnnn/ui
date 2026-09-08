# Tien UI

My components. My defaults.

A personal React component library by Nguyen Huu Tien, inspired by the source-owned workflow of [Kitze UI](https://ui.kitze.io). Original simplified wrappers on top of shadcn/ui and Base UI.

**Website:** https://ui.nguyenhuutien.com

## Start a project

```sh
npx shadcn@latest init hxutixnnn/ui/index
```

The preset uses Luma, neutral, yellow, Geist, Hugeicons, and Base UI. Its original shadcn preset code is [`b6GfB1yV8`](https://ui.shadcn.com/create?preset=b6GfB1yV8&item=preview). `/index` is required for GitHub registry initialization in the current CLI.

## Add components

```sh
npx shadcn@latest add hxutixnnn/ui/action-button
npx shadcn@latest add hxutixnnn/ui/form-field
```

Or install from the hosted registry:

```sh
npx shadcn@latest add https://ui.nguyenhuutien.com/r/action-button.json
```

Eight simplified components cover action buttons, form fields, labeled switches, dialogs, selects, tooltips, empty states, and page headers. Sixteen underlying shadcn foundations are included. The website documents 19 directly useful components; the remaining primitives support composition and wrapper dependencies.

Simplified components install to `components/tien`, respecting your components alias. Foundations install to your UI alias. Use Base UI's `render` API instead of Radix's `asChild`. Wrap tooltip usage in the exported `TooltipProvider`.

For coding agents, read [llms.txt](https://ui.nguyenhuutien.com/llms.txt).

## Development

Requires Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
npm run build
npm run lint
```

`npm run build` generates both the GitHub root catalog and hosted registry payloads, then checks TypeScript and builds the website. Component source lives in `src/components/tien` and `src/components/ui`. `registry/preset.json` stores the exact official initialization payload, so rebuilding does not refetch mutable theme defaults.

## Deploy

The Cloudflare CLI and an authenticated profile with access to `nguyenhuutien.com` are required.

```sh
npm run deploy
```

The deployment uses Cloudflare Workers static assets. `cloudflare.config.ts` declares the domain and account. `wrangler.config.ts` points to the built assets. Cloudflare provisions the custom domain routing and certificate.

## License

MIT. The shadcn/ui foundations retain their upstream MIT attribution in `THIRD_PARTY_NOTICES.md`.
