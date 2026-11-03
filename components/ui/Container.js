import { cn } from "@/lib/utils";
export default function Container({ className, as: Tag = "div", children, ...rest }) {
  return <Tag className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)} {...rest}>{children}</Tag>;
}
