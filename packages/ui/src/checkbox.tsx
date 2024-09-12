import { useState } from "react";

import Icons from "@repo/ui/icons";
import * as Checkbox from "@radix-ui/react-checkbox";
import cn from "classnames";

const CheckBox = ({
  feature,
  onChange,
  checkedValues,
}: {
  feature: string;
  onChange: (feature: string, checked: boolean) => void;
  checkedValues: string[];
}) => {
  return (
    <div className="flex items-center space-x-3">
      <Checkbox.Root
        className={cn(
          "w-6 h-6 rounded",
          checkedValues.includes(feature)
            ? "bg-primary-400"
            : "bg-white border-[1.5px] border-grey-300"
        )}
        checked={checkedValues.includes(feature)}
        onCheckedChange={(checked) => onChange(feature, checked as boolean)}
        id={feature}
      >
        <Checkbox.Indicator className="flex items-center justify-center text-white">
          {Icons.ic_check}
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label htmlFor={feature} className="text-sm">
        {feature}
      </label>
    </div>
  );
};

export default CheckBox;
