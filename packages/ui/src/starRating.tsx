import Icons from "@repo/ui/icons";
import { Fragment } from "react";

export default function StarRating({ n }: { n: number }) {
  const maxStars = 5;

  const numFilledStars = Math.min(n, maxStars);
  const numEmptyStars = maxStars - numFilledStars;

  const stars = [
    ...Array(numFilledStars).fill(Icons.ic_star_filled),
    ...Array(numEmptyStars).fill(Icons.ic_star_empty),
  ];

  return (
    <div className="flex items-center gap-2">
      {stars.map((star, index) => (
        <Fragment key={index}>{star}</Fragment>
      ))}
    </div>
  );
}
