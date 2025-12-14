import { type FC, type ButtonHTMLAttributes } from "react";
import Button from "./Button";
import type { LucideIcon } from "lucide-react";

interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
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
  iconSize?: number;
  colorClass?: string; // e.g. "text-primary", "text-error"
}

const IconButton: FC<IconButtonProps> = ({
  icon: Icon,
  tooltip,
  tooltipPosition = "top",
  variant = "ghost",
  size = "sm",
  iconSize = 18,
  colorClass = "",
  className = "",
  onClick,
  ...props
}) => {
  const button = (
    <Button
      variant={variant}
      size={size}
      className={`btn-square ${colorClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      <Icon size={iconSize} />
    </Button>
  );

  if (tooltip) {
    return (
      <div className={`tooltip tooltip-${tooltipPosition}`} data-tip={tooltip}>
        {button}
      </div>
    );
  }

  return button;
};

export default IconButton;
