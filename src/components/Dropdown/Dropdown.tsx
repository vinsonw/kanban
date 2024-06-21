import clsx from "clsx";
import "./Dropdown.scss";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export type Option<T extends string = string> = {
  id: T;
  label: string;
  type?: "normal" | "warn";
};
interface Props {
  children: React.ReactNode;
  optionList: Option[];
  onSelect?: (id: string) => void;
  open: boolean;
  onOpenChange: (openToSet: boolean) => void;
}

const Dropdown = ({
  children,
  optionList,
  open,
  onOpenChange,
  onSelect = () => {},
}: Props) => {
  return (
    <DropdownMenu.Root open={open} onOpenChange={onOpenChange}>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
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
export default Dropdown;
