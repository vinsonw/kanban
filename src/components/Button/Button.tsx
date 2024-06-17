import "./Button.scss";
import clsx from "clsx";

interface Props {
  size?: "large" | "small";
  type?: "primary" | "secondary" | "danger";
  label: string;
  disabled?: boolean;
}

const Button = ({
  size = "large",
  type = "primary",
  disabled = false,
  label,
}: Props) => {
  return (
    <button
      disabled={disabled}
      className={clsx("button", size, type, { disabled })}
    >
      {label}
    </button>
  );
};

export default Button;
