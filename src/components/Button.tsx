import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "ghost"
    | "link"
    | "outline"
    | "error"
    | "success"
    | "warning"
    | "info";
  size?: "lg" | "md" | "sm" | "xs";
  loading?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ElementType;
  endIcon?: React.ElementType;
  icon?: React.ElementType;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  startIcon: StartIcon,
  endIcon: EndIcon,
  icon: Icon,
  disabled,
  type = "button",
  ...props
}) => {
  const baseClass = "btn";
  const variantClass = variant !== "ghost" ? `btn-${variant}` : "btn-ghost";
  const sizeClass = `btn-${size}`;
  const widthClass = fullWidth ? "w-full" : "";

  // Use Icon as StartIcon if provided
  const FinalStartIcon = StartIcon || Icon;

  return (
    <button
      className={`${baseClass} ${variantClass} ${sizeClass} ${widthClass} ${className}`}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading && <span className="loading loading-spinner loading-sm"></span>}
      {!loading && FinalStartIcon && (
        <span className={children ? "mr-2" : ""}>
          <FinalStartIcon size={size === "xs" || size === "sm" ? 16 : 20} />
        </span>
      )}
      {children}
      {!loading && EndIcon && (
        <span className={children ? "ml-2" : ""}>
          <EndIcon size={size === "xs" || size === "sm" ? 16 : 20} />
        </span>
      )}
    </button>
  );
};

export default Button;
