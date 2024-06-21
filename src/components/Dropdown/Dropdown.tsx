import clsx from "clsx";
import "./Dropdown.scss";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

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
}

const Dropdown = <T extends string>({
  children,
  optionList,
  open,
  onOpenChange,
  onSelect = () => {},
}: Props<T>) => {
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
