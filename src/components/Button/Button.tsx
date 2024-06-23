import React from "react";
import "./Button.scss";
import clsx from "clsx";

interface Props {
  size?: "large" | "small";
  type?: "primary" | "secondary" | "danger";
  nativeType?: "button" | "submit";
  style?: React.CSSProperties;
  label: string | React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = React.forwardRef(
  (
    {
      size = "large",
      type = "primary",
      disabled = false,
      nativeType = "button",
      label,
      onClick,
      style = {},
    }: Props,
    forwardRef: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <button
        ref={forwardRef}
        type={nativeType}
        disabled={disabled}
        className={clsx("button", size, type, { disabled })}
        style={style}
        onClick={() => onClick?.()}
      >
        {label}
      </button>
    );
  },
);

export default Button;
