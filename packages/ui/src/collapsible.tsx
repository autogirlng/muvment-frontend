import { ReactNode, useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";

type Props = {
  title: string | ReactNode;
  openText: string | ReactNode;
  closeText: string | ReactNode;
  children: ReactNode;
};

const Collapse = ({ title, openText, closeText, children }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className="space-y-2">
      <div className="flex justify-between items-center">
        {title}

        <Collapsible.Trigger asChild>
          <button className="">{open ? openText : closeText}</button>
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content className="space-y-3">
        {children}
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default Collapse;
