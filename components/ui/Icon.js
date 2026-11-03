import {
  Globe, Zap, LayoutDashboard, Code2, Smartphone, BrainCircuit, Sparkles, MessageSquareText, Database, Cloud,
  GitBranch, ShieldCheck, Megaphone, Search, Radar, PenTool, ShoppingCart, Workflow, Compass, Layers, Server,
  GraduationCap, HeartPulse, ShoppingBag, Building2, Landmark, Store, Rocket, Factory, Briefcase, ClipboardCheck,
  LifeBuoy, Users, Boxes, CalendarCheck, TrendingUp, Cpu, Lock,
} from "lucide-react";

const map = {
  Globe, Zap, LayoutDashboard, Code2, Smartphone, BrainCircuit, Sparkles, MessageSquareText, Database, Cloud,
  GitBranch, ShieldCheck, Megaphone, Search, Radar, PenTool, ShoppingCart, Workflow, Compass, Layers, Server,
  GraduationCap, HeartPulse, ShoppingBag, Building2, Landmark, Store, Rocket, Factory, Briefcase, ClipboardCheck,
  LifeBuoy, Users, Boxes, CalendarCheck, TrendingUp, Cpu, Lock,
};

export default function Icon({ name, className = "h-5 w-5", ...rest }) {
  const C = map[name] || Layers;
  return <C className={className} aria-hidden="true" {...rest} />;
}
