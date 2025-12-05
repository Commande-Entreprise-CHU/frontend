import React, { useRef } from "react";
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
      `}</style>
    </div>
  );
};

export default CodeEditor;
