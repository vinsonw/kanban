import React from "react";
import "./Select.scss";
import * as RadixSelect from "@radix-ui/react-select";

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
  return (
    <RadixSelect.Root
      value={activeOption?.id}
      onValueChange={handleSelectValueChange}
    >
      <RadixSelect.Trigger className="kb-select-trigger">
        <RadixSelect.Value placeholder="Click to select" />
        <RadixSelect.Icon className="text-violet11">{"👇"}</RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="kb-select-content">
          <RadixSelect.Viewport className="p-[5px]">
            <RadixSelect.Group>
              {optionList.map(({ label, id }) => (
                <SelectItem key={id} value={id}>
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
