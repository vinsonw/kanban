import * as RadixDialog from "@radix-ui/react-dialog";
import "./Dialog.scss";

interface Props {
  children: React.ReactNode;
  dialogContent: React.ReactNode;
}

const Dialog = ({ children, dialogContent }: Props) => {
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger asChild>{children}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="dialog-overlay" />
        <RadixDialog.Content className="dialog-content">
          {dialogContent}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Dialog;
