import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import Icons from "@repo/ui/icons";

const FullPageDialog = ({
  trigger,
  title,
  description,
  content,
}: {
  trigger: ReactNode;
  title: string;
  description?: string;
  content: ReactNode | string;
}) => (
  <Dialog.Root modal>
    <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
    <Dialog.Portal>
      {/* <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" /> */}
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-0 left-0 min-h-screen h-full w-[calc(100%-272px)] ml-[272px] bg-white py-[45px] px-[35px] focus:outline-none">
        <Dialog.Title className="text-grey-700 text-4xl font-bold">
          {title}
        </Dialog.Title>
        {description && (
          <Dialog.Description className="text-grey-500 my-5 text-base">
            {description}
          </Dialog.Description>
        )}
        <div className="mt-[67px]">{content}</div>
        {/* <div className="mt-[25px] flex justify-end">
          <Dialog.Close asChild>
            <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              Save changes
            </button>
          </Dialog.Close>
        </div> */}
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

export default FullPageDialog;
