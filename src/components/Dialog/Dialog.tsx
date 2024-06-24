import * as RadixDialog from "@radix-ui/react-dialog";
import "./Dialog.scss";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface Props {
  children: React.ReactNode;
  dialogContent: React.ReactNode;
  open?: boolean;
  onOpenChange?: (openToSet: boolean) => void;
  dialogTitle: string;
}

const Dialog = ({
  children,
  dialogContent,
  onOpenChange,
  open,
  dialogTitle,
}: Props) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Trigger asChild>{children}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="dialog-overlay" />
        <RadixDialog.Content className="dialog-content">
          <VisuallyHidden.Root>
            <RadixDialog.Title>{dialogTitle}</RadixDialog.Title>
            <RadixDialog.Description>{dialogTitle}</RadixDialog.Description>
          </VisuallyHidden.Root>
          {dialogContent}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Dialog;
