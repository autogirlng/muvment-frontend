import Image from "next/image";
import React, { useState } from "react";
import useReviews from "./hooks/useReviews";
import StarRating from "@repo/ui/starRating";
import { FullPageSpinner } from "@repo/ui/spinner";
import { Review } from "@/utils/types";
import Pagination from "@repo/ui/pagination";

type Props = { id: string };

export default function VehicleReviews({ id }: Props) {
  const pageLimit = 20;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    vehicleReviews,
    isError,
    isLoading,

    totalCount,
  } = useReviews({ id, currentPage, pageLimit });

  if (isLoading) {
    return <FullPageSpinner />;
  }
  if (isError) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-10">
        {vehicleReviews.length > 0 ? (
          vehicleReviews.map((review: Review, index: number) => (
            <ReviewCard key={index} review={review} />
          ))
        ) : (
          <p>No reviews found</p>
        )}
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalCount}
        pageLimit={pageLimit}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="space-y-6 p-6 bg-grey-90 rounded-[32px]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-3 items-center">
          {review.user.profileImage && (
            <Image
              src={review.user.profileImage}
              alt=""
              height={40}
              width={40}
              className="w-10 h-10 rounded-full"
            />
          )}
          <div className="space-y-[2px]">
            <p className="text-grey-700 text-sm 3xl:text-base">{`${review.user.firstName} ${review.user.lastName}`}</p>
            <p className="text-grey-500 text-xs 3xl:text-sm">
              {review.updatedAt}
            </p>
          </div>
        </div>
        <StarRating n={review.rating} />
      </div>
      <div className="text-black text-sm 3xl:text-base">{review.message}</div>
    </div>
  );
};
