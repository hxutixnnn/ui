export type Entry = {
  name: string
  title: string
  category: string
  description: string
  code: string
  imports?: string
  props: [string, string, string][]
}
export const entries: Entry[] = [
  {
    name: "action-button",
    title: "Action button",
    category: "Everyday",
    description:
      "Icons and a loading state, without repeating the same markup.",
    code: '<ActionButton onClick={() => alert("Demo changes saved")}>\n  Save changes\n</ActionButton>',
    props: [
      ["loading", "boolean", "Disables the button and shows a spinner."],
      [
        "leadingIcon / trailingIcon",
        "ReactNode",
        "Content before or after the label.",
      ],
    ],
  },
  {
    name: "form-field",
    title: "Form field",
    category: "Forms",
    description: "A label, input, description, and error that belong together.",
    code: '<FormField\n  label="Email address"\n  type="email"\n  placeholder="you@example.com"\n  description="Used for project invitations."\n/>',
    props: [
      ["label", "ReactNode", "Accessible label for the input."],
      [
        "description / error",
        "ReactNode",
        "Help text or a validation message.",
      ],
    ],
  },
  {
    name: "labeled-switch",
    title: "Labeled switch",
    category: "Forms",
    description: "A switch with a label and a little room for context.",
    code: '<LabeledSwitch\n  label="Email notifications"\n  description="Updates about your projects."\n  defaultChecked\n/>',
    props: [
      ["label", "ReactNode", "Text associated with the switch."],
      ["description", "ReactNode", "Additional context below the label."],
    ],
  },
  {
    name: "simple-dialog",
    imports:
      'import { Button } from "@/components/ui/button"\nimport { FormField } from "@/components/tien/form-field"',
    title: "Simple dialog",
    category: "Overlays",
    description: "One component for the trigger, title, content, and footer.",
    code: '<SimpleDialog\n  trigger={<Button>Edit profile</Button>}\n  title="Edit profile"\n  description="Make yourself at home."\n>\n  <FormField label="Name" defaultValue="Tien Nguyen" />\n</SimpleDialog>',
    props: [
      ["trigger", "ReactElement", "Button that opens the dialog."],
      [
        "title / description",
        "ReactNode",
        "Accessible dialog heading and description.",
      ],
      ["footer", "ReactNode", "Optional footer actions."],
      [
        "open / onOpenChange",
        "boolean / callback",
        "Optional controlled state.",
      ],
    ],
  },
  {
    name: "simple-select",
    title: "Simple select",
    category: "Forms",
    description: "Pass your options. Get a keyboard-friendly select.",
    code: '<SimpleSelect\n  label="Framework"\n  placeholder="Choose a framework"\n  options={[\n    { label: "Next.js", value: "next" },\n    { label: "Vite", value: "vite" },\n  ]}\n/>',
    props: [
      [
        "options",
        "{ label: string, value: string, disabled?: boolean }[]",
        "Available choices.",
      ],
      ["label", "ReactNode", "Accessible field label."],
      [
        "value",
        "string | null",
        "Optional controlled selection. Null shows the placeholder.",
      ],
      [
        "defaultValue",
        "string | null",
        "Initial selection for an uncontrolled select.",
      ],
      [
        "onValueChange",
        "(value: string | null) => void",
        "Called when the selection changes.",
      ],
    ],
  },
  {
    name: "simple-tooltip",
    imports: 'import { Button } from "@/components/ui/button"',
    title: "Simple tooltip",
    category: "Overlays",
    description: "A helpful label, right where you need it.",
    code: '<SimpleTooltip content="Project settings">\n  <Button variant="outline">Settings</Button>\n</SimpleTooltip>',
    props: [
      ["content", "ReactNode", "The tooltip text."],
      ["children", "ReactElement", "The focusable trigger."],
    ],
  },
  {
    name: "empty-state",
    imports: 'import { Button } from "@/components/ui/button"',
    title: "Empty state",
    category: "Layout",
    description: "Give an empty page a useful next step.",
    code: '<EmptyState\n  title="No projects yet"\n  description="Your next idea starts here."\n  action={<Button>Create project</Button>}\n/>',
    props: [
      ["title / description", "ReactNode", "Heading and supporting text."],
      ["icon / action", "ReactNode", "Optional icon and next step."],
    ],
  },
  {
    name: "page-header",
    imports: 'import { Button } from "@/components/ui/button"',
    title: "Page header",
    category: "Layout",
    description: "A consistent place for the page title and its actions.",
    code: '<PageHeader\n  eyebrow="Workspace"\n  title="Your projects"\n  description="Everything you are working on."\n  actions={<Button>New project</Button>}\n/>',
    props: [
      ["title / description", "ReactNode", "Page heading and supporting text."],
      ["eyebrow / actions", "ReactNode", "Optional context and actions."],
    ],
  },
  {
    name: "button",
    title: "Button",
    category: "Foundations",
    description: "The Luma button, with pill corners and your yellow accent.",
    code: '<div className="flex flex-wrap gap-2">\n  <Button>Continue</Button>\n  <Button variant="outline">Cancel</Button>\n  <Button variant="secondary">Secondary</Button>\n</div>',
    props: [
      [
        "variant",
        "default | outline | secondary | ghost | destructive | link",
        "Visual treatment.",
      ],
      ["size", "default | xs | sm | lg | icon", "Button size."],
    ],
  },
  {
    name: "input",
    title: "Input",
    category: "Foundations",
    description:
      "A text input with the preset’s focus, border, and spacing defaults.",
    code: '<Input aria-label="Email" placeholder="you@example.com" type="email" />',
    props: [["...props", "Input props", "Supports native input attributes."]],
  },
  {
    name: "textarea",
    title: "Textarea",
    category: "Foundations",
    description: "A flexible field for longer thoughts.",
    code: '<Textarea aria-label="Notes" placeholder="Write a few notes…" />',
    props: [
      ["...props", "Textarea props", "Supports native textarea attributes."],
    ],
  },
  {
    name: "checkbox",
    title: "Checkbox",
    category: "Foundations",
    description: "A small, accessible choice with a clear checked state.",
    code: '<label className="flex items-center gap-2">\n  <Checkbox defaultChecked /> Accept the terms\n</label>',
    props: [
      [
        "checked / defaultChecked",
        "boolean",
        "Controlled or initial checked state.",
      ],
    ],
  },
  {
    name: "switch",
    title: "Switch",
    category: "Foundations",
    description: "Toggle a setting with a single click or the keyboard.",
    code: '<Switch aria-label="Enable notifications" defaultChecked />',
    props: [
      [
        "checked / onCheckedChange",
        "boolean / callback",
        "Controlled toggle state.",
      ],
    ],
  },
  {
    name: "badge",
    title: "Badge",
    category: "Foundations",
    description: "Compact labels for status and metadata.",
    code: '<div className="flex flex-wrap gap-2">\n  <Badge>Active</Badge>\n  <Badge variant="secondary">Draft</Badge>\n  <Badge variant="outline">Archived</Badge>\n</div>',
    props: [
      [
        "variant",
        "default | secondary | outline | destructive",
        "Badge appearance.",
      ],
    ],
  },
  {
    name: "card",
    title: "Card",
    category: "Foundations",
    description: "A rounded container for related content and actions.",
    code: "<Card>\n  <CardHeader>\n    <CardTitle>Project details</CardTitle>\n    <CardDescription>A place for your next idea.</CardDescription>\n  </CardHeader>\n  <CardContent>Your content here.</CardContent>\n</Card>",
    props: [
      [
        "children",
        "ReactNode",
        "Compose with CardHeader, CardContent, and CardFooter.",
      ],
    ],
  },
  {
    name: "accordion",
    title: "Accordion",
    category: "Foundations",
    description: "Progressively reveal answers without leaving the page.",
    code: '<Accordion>\n  <AccordionItem value="source">\n    <AccordionTrigger>Do I own the code?</AccordionTrigger>\n    <AccordionContent>Yes. It lives in your project.</AccordionContent>\n  </AccordionItem>\n</Accordion>',
    props: [["multiple", "boolean", "Allow multiple sections to stay open."]],
  },
  {
    name: "tabs",
    title: "Tabs",
    category: "Foundations",
    description: "Move between related views with keyboard navigation.",
    code: '<Tabs defaultValue="preview">\n  <TabsList>\n    <TabsTrigger value="preview">Preview</TabsTrigger>\n    <TabsTrigger value="code">Code</TabsTrigger>\n  </TabsList>\n  <TabsContent value="preview">Your preview</TabsContent>\n  <TabsContent value="code">Your code</TabsContent>\n</Tabs>',
    props: [["value / defaultValue", "string", "Active or initial tab."]],
  },
  {
    name: "separator",
    title: "Separator",
    category: "Foundations",
    description: "A quiet dividing line between related sections.",
    code: "<Separator />",
    props: [
      ["orientation", "horizontal | vertical", "Direction of the separator."],
    ],
  },
  {
    name: "skeleton",
    title: "Skeleton",
    category: "Foundations",
    description: "Keep the layout stable while content loads.",
    code: '<div className="space-y-3">\n  <Skeleton className="h-4 w-48" />\n  <Skeleton className="h-4 w-32" />\n</div>',
    props: [
      ["className", "string", "Set the dimensions to match your content."],
    ],
  },
]
