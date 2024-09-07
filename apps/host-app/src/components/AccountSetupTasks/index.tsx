import React from "react";
import TaskCard from "./TaskCard";
import Icons from "@repo/ui/icons";

type Props = {};

type Task = {
  icon: JSX.Element;
  title: string;
  link: string;
  linkText: string;
};

// Create the array of tasks
const tasks: Task[] = [
  {
    icon: Icons.ic_lock,
    title: "Verify Phone Number",
    link: "/account-setup/verify-number",
    linkText: "Start Verification",
  },
  {
    icon: Icons.ic_lock,
    title: "Verify your identity",
    link: "/account-setup/verify-identity",
    linkText: "Start Verification",
  },
  {
    icon: Icons.ic_lock,
    title: "Setup Withdrawal Account",
    link: "/account-setup/withdrawal-account-setup",
    linkText: "Get Started",
  },
];

export default function AccountSetupTasks({}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 3xl:gap-10 4xl:gap-[70px]">
      {tasks.map((task, index) => (
        <TaskCard
          key={index}
          icon={task.icon}
          title={task.title}
          link={task.link}
          linkText={task.linkText}
        />
      ))}
    </div>
  );
}
