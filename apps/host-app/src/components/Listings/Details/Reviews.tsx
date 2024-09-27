import StarRating from "@repo/ui/starRating";
import Image from "next/image";
import React from "react";

type Props = {};

type Review = {
  image: string;
  name: string;
  time: string;
  stars: number;
  message: string;
};

const reviews: Review[] = [
  {
    image: "/images/avatar.png",
    name: "Aisha O",
    time: "June 5, 2024|2:30PM",
    stars: 4,
    message:
      "I had an amazing experience renting from Jeffrey. The car was in pristine condition and exactly as de...",
  },
  {
    image: "/images/avatar.png",
    name: "Aisha O",
    time: "June 5, 2024|2:30PM",
    stars: 4,
    message:
      "I had an amazing experience renting from Jeffrey. The car was in pristine condition and exactly as de...",
  },
  {
    image: "/images/avatar.png",
    name: "Aisha O",
    time: "June 5, 2024|2:30PM",
    stars: 4,
    message:
      "I had an amazing experience renting from Jeffrey. The car was in pristine condition and exactly as de...",
  },
  {
    image: "/images/avatar.png",
    name: "Aisha O",
    time: "June 5, 2024|2:30PM",
    stars: 4,
    message:
      "I had an amazing experience renting from Jeffrey. The car was in pristine condition and exactly as de...",
  },
];

export default function Reviews({}: Props) {
  return (
    <div className="space-y-10">
      {reviews.map((review, index: number) => (
        <ReviewCard key={index} review={review} />
      ))}
    </div>
  );
}

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="space-y-6 p-6 bg-grey-90 rounded-[32px]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-3 items-center">
          <Image
            src={review.image}
            alt=""
            height={40}
            width={40}
            className="w-10 h-10 rounded-full"
          />
          <div className="space-y-[2px]">
            <p className="text-grey-700 text-sm 3xl:text-base">{review.name}</p>
            <p className="text-grey-500 text-xs 3xl:text-sm">{review.time}</p>
          </div>
        </div>
        <StarRating n={review.stars} />
      </div>
      <div className="text-black text-sm 3xl:text-base">{review.message}</div>
    </div>
  );
};
