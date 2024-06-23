import clsx from "clsx";
import "./Dropdown.scss";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";

export type Option<T> = {
  id: T;
  label: string;
  type?: "normal" | "warn";
};
interface Props<T> {
  children: React.ReactNode;
  optionList: Option<T>[];
  onSelect?: (id: T) => void;
  open: boolean;
  onOpenChange: (openToSet: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const _Dropdown = <T extends string>(
  {
    children,
    optionList,
    open,
    disabled,
    onOpenChange,
    onSelect = () => {},
    className,
  }: Props<T>,
  // ref is not needed here since wrapping Dialog is controlled.
  _ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  return (
    <DropdownMenu.Root open={open} onOpenChange={onOpenChange}>
      <DropdownMenu.Trigger
        disabled={disabled}
        className={clsx("dropdown-trigger", className)}
      >
        {children}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="dropdown-content" sideOffset={5}>
          {optionList.map(({ id, label, type = "normal" }) => (
            <DropdownMenu.Item
              key={id}
              className={clsx(["item", { warn: type === "warn" }])}
              onSelect={() => onSelect(id)}
            >
              {label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
const Dropdown = React.forwardRef(_Dropdown) as typeof _Dropdown;

export default Dropdown;
