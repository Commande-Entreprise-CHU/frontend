import React from "react";

interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  compact?: boolean;
  bordered?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  actions,
  className = "",
  bodyClassName = "",
  compact = false,
  bordered = true,
  ...props
}) => {
  return (
    <div
      className={`card bg-base-100 shadow-sm ${
        bordered ? "border border-base-200" : ""
      } ${compact ? "card-compact" : ""} ${className}`}
      {...props}
    >
      <div className={`card-body ${bodyClassName}`}>
        {title && <h2 className="card-title">{title}</h2>}
        {children}
        {actions && (
          <div className="card-actions justify-end mt-4">{actions}</div>
        )}
      </div>
    </div>
  );
};

export default Card;
