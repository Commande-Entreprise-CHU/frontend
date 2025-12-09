import React, { useRef, useEffect, useState } from "react";
import Prism from "prismjs";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language,
  placeholder,
  className,
  style,
}) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for dark mode preference
    const htmlElement = document.documentElement;
    const observer = new MutationObserver(() => {
      const dataTheme = htmlElement.getAttribute("data-theme");
      setIsDark(
        dataTheme === "dark" ||
          (!dataTheme &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    });

    // Initial check
    const dataTheme = htmlElement.getAttribute("data-theme");
    setIsDark(
      dataTheme === "dark" ||
        (!dataTheme &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );

    // Observe data-theme attribute changes
    observer.observe(htmlElement, { attributes: true });

    return () => observer.disconnect();
  }, []);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  // Highlight code
  const grammar = Prism.languages[language] || Prism.languages.plaintext;
  const highlighted = grammar
    ? Prism.highlight(value || "", grammar, language)
    : Prism.util.encode(value || "");

  // Common styles for alignment
  const commonStyle: React.CSSProperties = {
    margin: 0,
    padding: "10px",
    border: 0,
    boxSizing: "border-box",
    fontFamily: '"Fira code", "Fira Mono", monospace',
    fontSize: "14px",
    lineHeight: "1.5",
    tabSize: 2,
    whiteSpace: "pre-wrap",
    wordBreak: "keep-all",
    overflowWrap: "break-word",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    overflow: "auto",
    background: "transparent",
  };

  return (
    <div
      className={`relative w-full h-full bg-base-100 code-editor-container ${
        className || ""
      }`}
      data-theme={isDark ? "dark" : "light"}
      style={{ ...style, position: "relative", isolation: "isolate" }}
    >
      {/* Syntax Highlighted Layer */}
      <pre
        ref={preRef}
        aria-hidden="true"
        style={{
          ...commonStyle,
          pointerEvents: "none",
          zIndex: 0,
          background: "transparent", // Ensure transparent background
        }}
        className={`language-${language}`}
      >
        <code dangerouslySetInnerHTML={{ __html: highlighted + "<br />" }} />
      </pre>

      {/* Input Layer */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onScroll={handleScroll}
        placeholder={placeholder}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        style={{
          ...commonStyle,
          color: "inherit",
          caretColor: "currentColor", // Uses text color from parent/theme
          zIndex: 1,
          resize: "none",
          outline: "none",
        }}
        className="focus:outline-none bg-transparent code-editor-textarea"
      />
      <style>{`
        textarea.code-editor-textarea {
          -webkit-text-fill-color: transparent;
        }
        /* Override DaisyUI and Prism default backgrounds/shadows that might conflict */
        .code-editor-container pre,
        .code-editor-container code {
          background: transparent !important;
          text-shadow: none !important;
          border: none !important;
          box-shadow: none !important;
          padding: 10px !important; /* Match commonStyle padding */
          margin: 0 !important;
        }
        
        /* Dark theme - Okaidia-like colors */
        .code-editor-container[data-theme="dark"] .token.comment,
        .code-editor-container[data-theme="dark"] .token.prolog,
        .code-editor-container[data-theme="dark"] .token.doctype,
        .code-editor-container[data-theme="dark"] .token.cdata {
          color: #7f8c8d;
        }
        
        .code-editor-container[data-theme="dark"] .token.punctuation {
          color: #f8f8f2;
        }
        
        .code-editor-container[data-theme="dark"] .token.property,
        .code-editor-container[data-theme="dark"] .token.tag,
        .code-editor-container[data-theme="dark"] .token.constant,
        .code-editor-container[data-theme="dark"] .token.symbol {
          color: #f92672;
        }
        
        .code-editor-container[data-theme="dark"] .token.selector,
        .code-editor-container[data-theme="dark"] .token.attr-name,
        .code-editor-container[data-theme="dark"] .token.string,
        .code-editor-container[data-theme="dark"] .token.char,
        .code-editor-container[data-theme="dark"] .token.builtin {
          color: #a6e22e;
        }
        
        .code-editor-container[data-theme="dark"] .token.number,
        .code-editor-container[data-theme="dark"] .token.attr-value {
          color: #ae81ff;
        }
        
        .code-editor-container[data-theme="dark"] .token.operator {
          color: #fd971f;
        }

        .code-editor-container[data-theme="light"] code {
          color: #ffffff;
        }
        
        /* Light theme - Tomorrow colors */
        .code-editor-container[data-theme="light"] .token.comment,
        .code-editor-container[data-theme="light"] .token.prolog,
        .code-editor-container[data-theme="light"] .token.doctype,
        .code-editor-container[data-theme="light"] .token.cdata {
          color: #8e908c;
        }
        
        .code-editor-container[data-theme="light"] .token.punctuation {
          color: #4d4d4c;
        }
        
        .code-editor-container[data-theme="light"] .token.property,
        .code-editor-container[data-theme="light"] .token.tag,
        .code-editor-container[data-theme="light"] .token.constant,
        .code-editor-container[data-theme="light"] .token.symbol {
          color: #c82828;
        }
        
        .code-editor-container[data-theme="light"] .token.selector,
        .code-editor-container[data-theme="light"] .token.attr-name,
        .code-editor-container[data-theme="light"] .token.string,
        .code-editor-container[data-theme="light"] .token.char,
        .code-editor-container[data-theme="light"] .token.builtin {
          color: #718c00;
        }
        
        .code-editor-container[data-theme="light"] .token.number,
        .code-editor-container[data-theme="light"] .token.attr-value {
          color: #3f6c9f;
        }
        
        .code-editor-container[data-theme="light"] .token.operator {
          color: #a16601;
        }
        
        /* Default text color for light mode (plaintext and ungrouped tokens) */
        .code-editor-container[data-theme="light"] code {
          color: #2c3e50;
        }
      `}</style>
    </div>
  );
};

export default CodeEditor;
