import DashboardSectionTitle from "../DashboardSectionTitle";
import ReviewCard from "../../packages/ui/reviewCard";
import { useState } from "react";
import cn from "classnames";
import { Form, Formik } from "formik";
import Button from "@repo/ui/button";
import TextArea from "@repo/ui/textarea";
import { replyReviewSchema } from "@/utils/validationSchema";
import EmptyState from "../../packages/ui/emptyState";
import Icons from "@repo/ui/icons";
import { Review } from "@/utils/types";

type Props = {};

export default function ReviewsModal({}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 10;

  const [reviewDetailData, setReviewDetailData] = useState<Review | null>(null);

  const openReviewDetail = (review: Review) => {
    setReviewDetailData(review);
  };

  const closeReviewDetail = () => {
    setReviewDetailData(null);
  };

  const reviews: Review[] = [
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
    <div className="md:grid md:grid-cols-3 gap-4 min-h-[65vh]">
      <div
        className={cn(
          "transition",
          reviewDetailData ? "md:col-span-2" : "md:col-span-3"
        )}
      >
        <DashboardSectionTitle title="Review Manager" />

        {reviews.length > 0 ? (
          <div className={cn("py-6", reviewDetailData && "pr-4 3xl:pr-12")}>
            {reviews.map((review, index) => (
              <ReviewCard
                key={index}
                review={review}
                onClick={() => openReviewDetail(review)}
                isSelected={reviewDetailData?.id === review.id}
              />
            ))}
          </div>
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

      {reviewDetailData && (
        <div
          className={cn(
            "col-span-1 py-11 md:py-6 px-6 md:px-0 3xl:px-8 min-w-[310px] flex flex-col gap-16 justify-between h-auto md:h-full absolute md:relative top-0 left-0 z-10 bg-white w-full "
          )}
        >
          <div
            className="flex md:hidden items-center gap-0.5 text-primary-500 cursor-pointer"
            onClick={closeReviewDetail}
          >
            {Icons.ic_chevron_left}
            <p className="text-sm 2xl:text-base font-medium">Back</p>
          </div>
          <ReviewCard
            review={reviewDetailData}
            isReviewDetail
            size="*:w-3 *:h-3"
            gap="!gap-1"
          />
          {reviewDetailData?.Reply?.map((item, index) => (
            <ReviewCard
              key={index}
              review={item}
              isReviewDetail
              size="*:w-3 *:h-3"
              gap="!gap-1"
            />
          ))}

          <Formik
            initialValues={{
              message: "",
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              console.log(values);

              setSubmitting(false);
            }}
            validationSchema={replyReviewSchema}
            enableReinitialize={true}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                isValid,
                dirty,
                handleBlur,
                handleChange,
                isSubmitting,
              } = props;

              return (
                <Form className="space-y-4">
                  <TextArea
                    name="message"
                    id="message"
                    type="text"
                    label="Reply Review"
                    placeholder="Type a message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      errors.message && touched.message ? errors.message : ""
                    }
                  />

                  <Button
                    color="primary"
                    fullWidth
                    radius="lg"
                    type="submit"
                    loading={isSubmitting}
                    disaabled={!isValid || !dirty || isSubmitting}
                  >
                    Post reply
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </div>
  );
}
