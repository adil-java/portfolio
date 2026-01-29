import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

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
      "flex flex-col h-full bg-white dark:bg-gray-800/90 overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 print:shadow-none print:bg-white print:text-black print:border-gray-300",
      sizeClasses[size]
    )}>
      <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3">
        <CardTitle className="text-sm sm:text-base font-semibold leading-snug">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <span className="line-clamp-1">{title}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span>
            </a>
          ) : (
            <span className="text-gray-900 dark:text-gray-100 line-clamp-1">{title}</span>
          )}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 text-[11px] sm:text-xs leading-relaxed mt-1.5 line-clamp-2 sm:line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto p-3 sm:p-4 pt-0">
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 4).map((tag) => (
            <Badge
              className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-0 font-normal"
              variant="secondary"
              key={tag}
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 4 && (
            <Badge
              className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-0 font-normal"
              variant="secondary"
            >
              +{tags.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
