import {
  ArrowUpRight,
  Award,
  Bike,
  BookOpen,
  BookOpenText,
  ChefHat,
  Dumbbell,
  Gamepad2,
  Guitar,
  Palette,
  Soup,
  Briefcase,
  Code2,
  Command,
  Download,
  FileText,
  FolderGit2,
  Globe,
  GraduationCap,
  Heart,
  Home,
  Link2,
  ScrollText,
  Trophy,
  Mail,
  MapPin,
  Moon,
  Phone,
  Send,
  Sparkles,
  Sun,
  User,
} from 'lucide-react'

/* Brand marks, drawn inline so they never disappear from an icon library. */
const brand = (path) =>
  function BrandIcon({ size = 18, ...props }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d={path} />
      </svg>
    )
  }

const Github = brand(
  'M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.4-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z',
)
const Linkedin = brand(
  'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z',
)
const X = brand(
  'M18.9 1.2h3.7l-8 9.2 9.4 12.4h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9Zm-1.3 19.4h2L6.5 3.2H4.3l13.3 17.4Z',
)
const Medium = brand(
  'M13.5 12a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Zm7.4 0c0 3.5-1.5 6.4-3.4 6.4s-3.4-2.9-3.4-6.4 1.5-6.4 3.4-6.4 3.4 2.9 3.4 6.4ZM24 12c0 3.1-.5 5.7-1.2 5.7s-1.2-2.6-1.2-5.7.5-5.7 1.2-5.7S24 8.9 24 12Z',
)
const Youtube = brand(
  'M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z',
)

const ICONS = {
  // brands
  github: Github,
  linkedin: Linkedin,
  x: X,
  twitter: X,
  medium: Medium,
  youtube: Youtube,
  // generic
  globe: Globe,
  web: Globe,
  link: Link2,
  mail: Mail,
  email: Mail,
  phone: Phone,
  map: MapPin,
  file: FileText,
  resume: FileText,
  download: Download,
  book: BookOpen,
  award: Award,
  briefcase: Briefcase,
  folder: FolderGit2,
  code: Code2,
  sparkles: Sparkles,
  graduation: GraduationCap,
  user: User,
  send: Send,
  home: Home,
  sun: Sun,
  moon: Moon,
  command: Command,
  arrow: ArrowUpRight,
  scroll: ScrollText,
  patent: ScrollText,
  trophy: Trophy,
  heart: Heart,
  reading: BookOpenText,
  gamepad: Gamepad2,
  motorcycle: Bike,
  bike: Bike,
  dumbbell: Dumbbell,
  chef: ChefHat,
  guitar: Guitar,
  palette: Palette,
  bowl: Soup,
}

/** <Icon name="github" /> — names come from portfolio.json; unknown names fall back to a link icon. */
export default function Icon({ name, size = 18, ...props }) {
  const Cmp = ICONS[String(name || '').toLowerCase()] || Link2
  return <Cmp size={size} {...props} />
}
