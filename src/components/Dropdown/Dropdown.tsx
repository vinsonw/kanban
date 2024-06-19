import clsx from "clsx";
import "./Dropdown.scss";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export type Option = {
  id: string;
  label: string;
  type?: "normal" | "warn";
};
interface Props {
  children: React.ReactNode;
  optionList: Option[];
  onSelect: (id: string) => void;
}

const Dropdown = ({ children, optionList, onSelect }: Props) => {
  return (
    <DropdownMenu.Root>
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
