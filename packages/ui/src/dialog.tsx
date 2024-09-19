import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Icons from "@repo/ui/icons";

type Props = {
  trigger: ReactNode;
  title: string;
  description?: string;
  content: ReactNode | string;
};

const BlurredDialog = ({ trigger, title, description, content }: Props) => (
  <Dialog.Root modal>
    <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
    <Dialog.Portal>
      {/* <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" /> */}
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-0 left-0 min-h-[350px] h-full w-[calc(100%-272px)] ml-[272px] bg-white py-[45px] px-[35px] focus:outline-none">
        <Dialog.Title className="text-grey-700 text-4xl font-bold">
          {title}
        </Dialog.Title>
        {description && (
          <Dialog.Description className="text-grey-500 my-5 text-base">
            {description}
          </Dialog.Description>
        )}
        <div className="mt-[67px]">{content}</div>
       
        <Dialog.Close asChild>
          <button
            className="text-primary-500 font-semibold text-base absolute top-[45px] right-[35px] appearance-none inline-flex gap-2 items-center justify-center focus:outline-none"
            aria-label="Close"
          >
            {Icons.ic_close_circle}
            Close
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default BlurredDialog;
