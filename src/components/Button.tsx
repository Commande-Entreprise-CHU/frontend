interface ButtonProps {
  description?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  description,
  onClick,
  children,
  className,
  disabled,
}) => {
  return (
    <button
      className={`btn btn-primary ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={description}
    >
      {children}
    </button>
  );
};

export default Button;
