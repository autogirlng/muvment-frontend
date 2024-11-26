import { useState } from "react";
import { Review } from "@/utils/types";
import Pagination from "@repo/ui/pagination";
import ReviewCard from "@/components/ReviewCard";
import EmptyState from "@/components/EmptyState";

type Props = { id: string };

export default function VehicleReviews({ id }: Props) {
  const pageLimit = 20;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const vehicleReviews: Review[] = [
    {
      id: "66fa2e9aa25e201a09ef376a",
      message: "quite a long trip",
      rating: 3,
      bookingId: "66f2e76dcad27a7578d5cb8a",
      userId: "66e08242e11152f08a5569c9",
      createdAt: "2024-09-30T04:52:42.686Z",
      updatedAt: "2024-09-30T04:52:42.686Z",
      Reply: [
        {
          id: "67137c821488784ea0bb9f05",
          message: "true I noticed",
          reviewId: "66fa2e9aa25e201a09ef376a",
          userId: "66ddb4b8e45560fe9d34df42",
          createdAt: "2024-10-19T09:31:46.574Z",
          updatedAt: "2024-10-19T09:31:46.574Z",
          user: {
            id: "66ddb4b8e45560fe9d34df42",
            firstName: "Daniel",
            lastName: "Osariemen",
            email: "osazeepeter79@gmail.com",
            phoneNumber: "+2347017012573",
            profileImage:
              "http://res.cloudinary.com/do8zvgqpg/raw/upload/v1727344328/66ddb4b8e45560fe9d34df42/profile/car_preview1.png",
            // isBusiness: true,
            businessEmail: "DanielVentures@email.com",
            businessLogo:
              "http://res.cloudinary.com/do8zvgqpg/raw/upload/v1727992437/66ddb4b8e45560fe9d34df42/profile/top_header_avatar.png",
            businessPhoneNumber: "07014465164",
            businessName: "Daniel Ventures",
            country: "NG",

            dob: "",
            countryCode: "",
            emailConfirmed: true,
            phoneVerified: true,
            withdrawalAccountVerified: true,
            bvnVerified: true,
            bio: "",
            city: "",
            userRole: "HOST",
            businessAddress: "",
            createdAt: "",
            updatedAt: "",
            averageRating: 0,
            Verification: {
              id: "",
              phoneNumber: "",
              otpToken: "",
              bvnNumber: "",
              dob: "",
              userId: "",
              createdAt: "",
              updatedAt: "",
            },
          },
        },
      ],
      user: {
        id: "66e08242e11152f08a5569c9",
        firstName: "Daniel",
        lastName: "Osariemen",
        email: "host@example.com",
        phoneNumber: "08012345678",
        profileImage:
          "http://res.cloudinary.com/do8zvgqpg/raw/upload/v1727308111/66e08242e11152f08a5569c9/profile/Ticket%20details%20fill.png",
        // isBusiness: false,
        businessEmail: null,
        businessLogo:
          "http://res.cloudinary.com/do8zvgqpg/raw/upload/v1727308068/66e08242e11152f08a5569c9/profile/Checkout.png",
        businessPhoneNumber: null,
        businessName: null,
        country: "NG",

        dob: "",
        countryCode: "",
        emailConfirmed: true,
        phoneVerified: true,
        withdrawalAccountVerified: true,
        bvnVerified: true,
        bio: "",
        city: "",
        userRole: "HOST",
        businessAddress: "",
        createdAt: "",
        updatedAt: "",
        averageRating: 0,
        Verification: {
          id: "",
          phoneNumber: "",
          otpToken: "",
          bvnNumber: "",
          dob: "",
          userId: "",
          createdAt: "",
          updatedAt: "",
        },
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-10">
        {vehicleReviews.length > 0 ? (
          vehicleReviews.map((review: Review, index: number) => (
            <ReviewCard key={index} review={review} />
          ))
        ) : (
          <EmptyState
            title="No Reviews Yet"
            message="Your Customers Reviews Will Appear Here"
            image="/icons/empty_review_state.png"
            imageSize="w-[182px] 3xl:w-[265px]"
            noBg
          />
        )}
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={3}
        pageLimit={pageLimit}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
