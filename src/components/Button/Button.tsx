import "./Button.scss";
import clsx from "clsx";

interface Props {
  size?: "large" | "small";
  type?: "primary" | "secondary" | "danger";
  nativeType?: "button" | "submit";
  label: string;
  disabled?: boolean;
}

const Button = ({
  size = "large",
  type = "primary",
  disabled = false,
  nativeType = "button",
  label,
}: Props) => {
  return (
    <button
      type={nativeType}
      disabled={disabled}
      className={clsx("button", size, type, { disabled })}
    >
      {label}
    </button>
  );
};

export default Button;
