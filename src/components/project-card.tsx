import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  description: string;
  tags: readonly string[];
  link?: string;
  size?: "small" | "medium" | "large";
}

export function ProjectCard({ title, description, tags, link, size = "medium" }: Props) {
  const sizeClasses = {
    small: "md:col-span-1",
    medium: "md:col-span-1",
    large: "md:col-span-2 lg:col-span-2",
  };

  return (
    <Card className={cn(
      "group flex flex-col h-full bg-white dark:bg-[#121212] overflow-hidden border border-gray-200/60 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-gray-300 dark:hover:border-zinc-700 transition-all duration-200 ease-out print:shadow-none print:bg-white print:text-black print:border-gray-300",
      sizeClasses[size]
    )}>
      <CardHeader className="p-4 sm:p-5 pb-2.5 sm:pb-3.5">
        <CardTitle className="text-base font-bold leading-tight">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <span className="line-clamp-1">{title}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse"></span>
            </a>
          ) : (
            <span className="text-gray-900 dark:text-gray-100 line-clamp-1">{title}</span>
          )}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed mt-2 line-clamp-3 sm:line-clamp-4">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto p-4 sm:p-5 pt-0">
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 5).map((tag) => (
            <Badge
              className="text-[10px] sm:text-xs px-2 py-0.5 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-300 border border-indigo-100/40 dark:border-indigo-900/20 font-medium rounded-md hover:bg-indigo-100/50 dark:hover:bg-indigo-900/40 transition-colors"
              variant="secondary"
              key={tag}
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 5 && (
            <Badge
              className="text-[10px] sm:text-xs px-2 py-0.5 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-100/40 dark:border-gray-800/40 font-medium rounded-md"
              variant="secondary"
            >
              +{tags.length - 5}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
