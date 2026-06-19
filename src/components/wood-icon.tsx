import type { ElementType } from "react";
import {
  GitBranch,
  Bot,
  Code2,
  Search,
  Workflow,
  MessageSquare,
  Clock,
  AppWindow,
  Terminal,
  Server,
  ShieldCheck,
  TrendingUp,
  Megaphone,
  Compass,
  Rocket,
  Landmark,
  HeartPulse,
  Scale,
  Briefcase,
  Kanban,
  FileType,
  HardDrive,
  Folder,
  Lock,
  Globe,
  Database,
  Cpu,
  Network,
  Layers,
  Zap,
  Sparkles,
  Brain,
  LayoutDashboard,
  Building2,
  Target,
  Users,
  FileText,
  FileCheck,
  BookOpen,
  Table,
  DollarSign,
  LineChart,
  PieChart,
  ScrollText,
  Coffee,
  Video,
  Trophy,
  HeartHandshake,
  Quote,
  ArrowRightLeft,
  Calendar,
  Key,
  KeyRound,
  Fingerprint,
  Boxes,
  Feather,
  Shield,
  Cloud,
} from "lucide-react";

/**
 * Maps a flat lucide-react icon to its wooden-craft PNG equivalent so the whole
 * site can share one wooden icon language. Reuses the existing feature /
 * solution / trust / industry art where a concept already exists, and the
 * general wooden set in public/brand/ui/* for everything else.
 *
 * Only DECORATIVE concept-icons should be routed through <WoodIcon>. Functional
 * glyphs (arrows, chevrons, table check/x/minus, copy, spinners, menu), tiny
 * pill/button micro-icons, and icons inside mock product-UI stay flat.
 */
const WOOD: Map<ElementType, string> = new Map([
  // reuse existing art
  [GitBranch, "/brand/feat/git.png"],
  [Bot, "/brand/feat/agents.png"],
  [Code2, "/brand/solutions/engineering.png"],
  [Search, "/brand/feat/search.png"],
  [Workflow, "/brand/solutions/operations.png"],
  [MessageSquare, "/brand/feat/chat.png"],
  [Clock, "/brand/feat/schedule.png"],
  [AppWindow, "/brand/feat/htmlapp.png"],
  [Terminal, "/brand/feat/terminal.png"],
  [Server, "/brand/trust/self-hosted.png"],
  [HardDrive, "/brand/feat/files.png"],
  [ShieldCheck, "/brand/trust/soc2.png"],
  [TrendingUp, "/brand/solutions/sales.png"],
  [Megaphone, "/brand/solutions/marketing.png"],
  [Compass, "/brand/solutions/product.png"],
  [Landmark, "/brand/icons/financial-services.png"],
  [HeartPulse, "/brand/icons/healthcare.png"],
  [Briefcase, "/brand/icons/professional-services.png"],
  [Kanban, "/brand/feat/tasks.png"],
  [FileType, "/brand/feat/docs.png"],
  [Table, "/brand/feat/docs.png"],
  // general wooden UI set
  [Rocket, "/brand/ui/rocket.png"],
  [Scale, "/brand/ui/scale.png"],
  [Folder, "/brand/ui/folder.png"],
  [Lock, "/brand/ui/lock.png"],
  [Globe, "/brand/ui/globe.png"],
  [Database, "/brand/ui/database.png"],
  [Cpu, "/brand/ui/cpu.png"],
  [Network, "/brand/ui/network.png"],
  [Layers, "/brand/ui/layers.png"],
  [Zap, "/brand/ui/zap.png"],
  [Sparkles, "/brand/ui/sparkles.png"],
  [Brain, "/brand/ui/brain.png"],
  [LayoutDashboard, "/brand/ui/dashboard.png"],
  [Building2, "/brand/ui/building.png"],
  [Target, "/brand/ui/target.png"],
  [Users, "/brand/ui/team.png"],
  [FileText, "/brand/ui/document.png"],
  [FileCheck, "/brand/ui/filecheck.png"],
  [BookOpen, "/brand/ui/book.png"],
  [DollarSign, "/brand/ui/coins.png"],
  [LineChart, "/brand/ui/chart.png"],
  [PieChart, "/brand/ui/chart.png"],
  [ScrollText, "/brand/ui/scroll.png"],
  [Coffee, "/brand/ui/coffee.png"],
  [Video, "/brand/ui/video.png"],
  [Trophy, "/brand/ui/trophy.png"],
  [HeartHandshake, "/brand/ui/handshake.png"],
  [Quote, "/brand/ui/quote.png"],
  [ArrowRightLeft, "/brand/ui/migrate.png"],
  [Calendar, "/brand/ui/calendar.png"],
  [Key, "/brand/ui/key.png"],
  [KeyRound, "/brand/ui/key.png"],
  [Fingerprint, "/brand/ui/fingerprint.png"],
  [Boxes, "/brand/ui/boxes.png"],
  [Feather, "/brand/ui/feather.png"],
  [Shield, "/brand/ui/shield.png"],
  [Cloud, "/brand/ui/cloud.png"],
]);

export function woodSrcFor(icon: ElementType): string | undefined {
  return WOOD.get(icon);
}

/**
 * Renders a decorative concept-icon as its wooden PNG. Falls back to the flat
 * lucide icon when no wooden equivalent exists, so it is always safe to use.
 * The passed className (sizing like `h-6 w-6`, plus any color classes) is kept;
 * color classes are simply inert on the image.
 */
export function WoodIcon({
  icon: Icon,
  className = "",
}: {
  icon: ElementType;
  className?: string;
}) {
  const src = WOOD.get(Icon);
  if (!src) return <Icon className={className} />;
  return <img src={src} alt="" aria-hidden className={`object-contain ${className}`} />;
}
