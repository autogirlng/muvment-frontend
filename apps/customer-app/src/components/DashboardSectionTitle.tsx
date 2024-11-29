import { ReactNode } from "react";

type Props = { children?: ReactNode; title: string };

export default function DashboardSectionTitle({ children, title }: Props) {
  return (
    <div className="flex items-center justify-between gap-2">
      <h1 className="text-h2 md:text-h3 3xl:text-4xl text-black !font-bold">
        {title}
      </h1>
      {children}
    </div>
  );
}
