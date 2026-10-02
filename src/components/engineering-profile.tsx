"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import {
  Check,
  Code2,
  Copy,
  FileCode2,
  FileText,
  GitBranch,
} from "lucide-react";

type Token = {
  text: string;
  kind?: "keyword" | "string" | "comment" | "property";
};
type CodeLine = Token[];
const t = (text: string, kind?: Token["kind"]): Token => ({ text, kind });
const files: { name: string; language: string; lines: CodeLine[] }[] = [
  {
    name: "engineer.ts",
    language: "TypeScript",
    lines: [
      [t("// A little about the person behind the code", "comment")],
      [t("const", "keyword"), t(" engineer = {")],
      [t("  name", "property"), t(": "), t('"Adil Javed"', "string"), t(",")],
      [
        t("  basedIn", "property"),
        t(": "),
        t('"Karachi, Pakistan"', "string"),
        t(","),
      ],
      [
        t("  focus", "property"),
        t(": ["),
        t('"Full stack", "Applied AI"', "string"),
        t("],"),
      ],
      [
        t("  mindset", "property"),
        t(": "),
        t('"Curious by default"', "string"),
        t(","),
      ],
      [t("  approach", "property"), t(": [")],
      [t('    "Understand the problem",', "string")],
      [t('    "Build with intention",', "string")],
      [t('    "Keep improving",', "string")],
      [t("  ],")],
      [t("};")],
      [],
      [t("export default", "keyword"), t(" engineer;")],
    ],
  },
  {
    name: "stack.ts",
    language: "TypeScript",
    lines: [
      [t("// Tools I use across the stack", "comment")],
      [t("const", "keyword"), t(" stack = {")],
      [t("  frontend", "property"), t(": [")],
      [t('    "React", "TypeScript", "React Native",', "string")],
      [t("  ],")],
      [
        t("  backend", "property"),
        t(": ["),
        t('"Node.js", "NestJS", "FastAPI"', "string"),
        t("],"),
      ],
      [
        t("  databases", "property"),
        t(": ["),
        t('"PostgreSQL", "MongoDB"', "string"),
        t("],"),
      ],
      [
        t("  ai", "property"),
        t(": ["),
        t('"Gemini", "RAG", "OpenCV"', "string"),
        t("],"),
      ],
      [
        t("  infrastructure", "property"),
        t(": ["),
        t('"Docker", "Redis"', "string"),
        t("],"),
      ],
      [t("};")],
      [],
      [t("// The right tool starts with the problem.", "comment")],
      [],
      [t("export default", "keyword"), t(" stack;")],
    ],
  },
  {
    name: "learning.md",
    language: "Markdown",
    lines: [
      [t("# Always a work in progress", "keyword")],
      [],
      [t("## Currently exploring", "property")],
      [t("- System design and application architecture")],
      [t("- DevOps and deployment workflows")],
      [t("- Redis and caching strategies")],
      [],
      [t("## Learning through projects", "property")],
      [t("- Applied AI with GreenBuddy")],
      [t("- Augmented reality with HomeFit")],
      [t("- Computer vision with SmartWear")],
      [],
      [t("Small experiments. Better questions.", "string")],
      [t("A little more understanding each time.", "string")],
    ],
  },
];

export function EngineeringProfile() {
  const [activeFile, setActiveFile] = useState(0);
  const [copyStatus, setCopyStatus] = useState("");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const file = files[activeFile];

  function selectFile(index: number) {
    setActiveFile(index);
    setCopyStatus("");
  }
  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % files.length;
    else if (event.key === "ArrowLeft")
      next = (index + files.length - 1) % files.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = files.length - 1;
    else return;
    event.preventDefault();
    selectFile(next);
    tabs.current[next]?.focus();
  }
  async function copyCode() {
    try {
      await navigator.clipboard.writeText(
        file.lines
          .map((line) => line.map((token) => token.text).join(""))
          .join("\n"),
      );
      setCopyStatus("Copied to clipboard");
    } catch {
      setCopyStatus("Select the code to copy it manually.");
    }
  }

  return (
    <div className="code-editor" data-reveal>
      <div className="editor-titlebar">
        <span className="editor-window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>adil / workspace</span>
        <Code2 size={14} aria-hidden="true" />
      </div>
      <div
        className="editor-tabs"
        role="tablist"
        aria-label="Engineering profile files"
      >
        {files.map((item, index) => (
          <button
            key={item.name}
            type="button"
            role="tab"
            id={`code-tab-${index}`}
            aria-selected={activeFile === index}
            aria-controls={`code-panel-${index}`}
            tabIndex={activeFile === index ? 0 : -1}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            onClick={() => selectFile(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {index === 2 ? (
              <FileText size={13} aria-hidden="true" />
            ) : (
              <FileCode2 size={13} aria-hidden="true" />
            )}
            {item.name}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`code-panel-${activeFile}`}
        aria-labelledby={`code-tab-${activeFile}`}
        tabIndex={0}
        className="editor-panel"
      >
        <pre>
          <code>
            {file.lines.map((line, index) => (
              <span className="code-line" key={index}>
                <span className="line-number" aria-hidden="true">
                  {index + 1}
                </span>
                <span>
                  {line.map((token, tokenIndex) => (
                    <span
                      className={
                        token.kind ? `syntax-${token.kind}` : undefined
                      }
                      key={tokenIndex}
                    >
                      {token.text}
                    </span>
                  ))}
                  {"\n"}
                </span>
              </span>
            ))}
          </code>
        </pre>
      </div>
      <div className="editor-statusbar">
        <span>
          <GitBranch size={12} aria-hidden="true" />
          main
        </span>
        <span>{file.language}</span>
        <button
          type="button"
          onClick={copyCode}
          aria-label={`Copy ${file.name}`}
        >
          {copyStatus === "Copied to clipboard" ? (
            <Check size={12} />
          ) : (
            <Copy size={12} />
          )}
          {copyStatus === "Copied to clipboard" ? "Copied" : "Copy"}
        </button>
      </div>
      <span className="sr-only" role="status">
        {copyStatus}
      </span>
    </div>
  );
}
