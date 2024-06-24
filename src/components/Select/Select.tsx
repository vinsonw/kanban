import React, { useState } from "react";
import "./Select.scss";
import * as RadixSelect from "@radix-ui/react-select";
import clsx from "clsx";

type Option<T> = {
  label: string;
  id: T;
};
interface Props<T> {
  optionList: Option<T>[];
  activeOption?: Option<T>;
  onSelect: (id: T) => void;
  error?: boolean;
}

const Select = <T extends string>(props: Props<T>) => {
  const { optionList, activeOption, onSelect, error = false } = props;

  const [open, setOpen] = useState(false);
  return (
    <RadixSelect.Root
      value={activeOption?.id}
      onValueChange={onSelect}
      open={open}
      onOpenChange={(open) => setOpen(open)}
    >
      <RadixSelect.Trigger
        className={clsx("kb-select-trigger", { open, error })}
      >
        <RadixSelect.Value placeholder="Click to select" />
        <RadixSelect.Icon className={clsx("icon", { rotate: open })}>
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke="#635FC7"
              strokeWidth="2"
              fill="none"
              d="M9 6 5 2 1 6"
            />
          </svg>
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content position="popper" className="kb-select-content">
          <RadixSelect.Viewport>
            <RadixSelect.Group>
              {optionList.map(({ label, id }) => (
                <SelectItem className="kb-select-item" key={id} value={id}>
                  {label}
                </SelectItem>
              ))}
            </RadixSelect.Group>
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};
const SelectItem = React.forwardRef(
  ({ children, ...props }: any, forwardedRef: any) => {
    return (
      <RadixSelect.Item {...props} ref={forwardedRef}>
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      </RadixSelect.Item>
    );
  },
);

export default Select;
