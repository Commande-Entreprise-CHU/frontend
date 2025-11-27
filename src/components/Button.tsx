interface ButtonProps {
  description?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}
const Button: React.FC<ButtonProps> = ({
  description,
  onClick,
  children,
  className,
  disabled,
  type = "button",
}) => {
  return (
    <button
      className={`btn btn-primary ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={description}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
