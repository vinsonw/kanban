import React, { useState } from "react";
import "./Select.scss";
import * as RadixSelect from "@radix-ui/react-select";
import clsx from "clsx";

type Option = {
  label: string;
  id: string;
};
interface Props {
  optionList: Option[];
  activeOption?: Option;
}

const Select = (props: Props) => {
  const { optionList, activeOption } = props;
  const handleSelectValueChange = (value: string) => {
    console.log("value to set", value);
  };
  const [open, setOpen] = useState(false);
  return (
    <RadixSelect.Root
      value={activeOption?.id}
      onValueChange={handleSelectValueChange}
      open={open}
      onOpenChange={(open) => setOpen(open)}
    >
      <RadixSelect.Trigger className={clsx("kb-select-trigger", { open })}>
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
