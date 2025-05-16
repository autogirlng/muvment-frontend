import React from "react";

interface BulletListProps {
  items: string[];
  className?: string;
}

export const BulletList = ({
  items,
  className = "text-blue-400",
}: BulletListProps) => (
  <ul className={` pl-2 space-y-2  `}>
    {items.map((item, index) => (
      <p className={`"text-sm" ${className}`} key={index}>
        {item}
      </p>
    ))}
  </ul>
);
