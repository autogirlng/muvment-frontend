"use client";

import useUploadImage from "@/hooks/useUploadImage";
import { useAppSelector } from "@/lib/hooks";
import { AvatarImage } from "@repo/ui/avatar";
import Button from "@repo/ui/button";
import { Spinner } from "@repo/ui/spinner";
import classNames from "classnames";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function OnboardingAddImagePage() {
  const { user } = useAppSelector((state) => state.user);

  const [image, setProfileImage] = useState<string | null>("");

  const { uploadImage } = useUploadImage({ setProfileImage });

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);
      console.log(formData);

      uploadImage.mutate(formData);
    } else {
      setProfileImage(null);
    }
  };

  return (
    <div className="space-y-10 flex flex-col items-center">
      <div className="space-y-3 3xl:space-y-4">
        <h1 className="text-h4 sm:text-h2 2xl:text-h1 font-medium text-black">
          Glad to have you{" "}
          <span className="text-primary-500">{user?.firstName}!</span>
        </h1>
        <p className="text-sm 2xl:text-base text-grey-500">
          {image
            ? "Looks good! Profile picture uploaded"
            : "Add some personalization to your account, add a profile picture."}
        </p>
      </div>

      {image ? (
        <AvatarImage
          image={image || ""}
          initials=""
          size="!w-[130px] !h-[130px]"
        />
      ) : (
        <div className="bg-grey-200 rounded-full w-[120px] h-[120px] ">
          {user?.firstName && user?.lastName ? (
            <div className="flex items-center justify-center w-full h-full text-4xl font-semibold text-black-500">
              {user?.firstName.charAt(0)}
              {user?.lastName.charAt(0)}
            </div>
          ) : null}
        </div>
      )}

      {image ? (
        //   <Link href="/onboarding/save-password">
        <Link href="/explore/results">
          <Button fullWidth variant="filled" color="primary" type="submit">
            Book a vehicle
          </Button>
        </Link>
      ) : (
        <div className="flex items-center gap-6">
          <Link href="/explore/results">
            <Button fullWidth variant="filled" color="primary" type="submit">
              Skip and Book a vehicle
            </Button>
          </Link>
          <label
            className={classNames(
              "w-full",
              uploadImage.isPending ? "" : "cursor-pointer"
            )}
          >
            <div className="w-full min-w-[200px] text-white hover:text-white text-sm 3xl:text-base !font-semibold rounded-2xl bg-primary-500 hover:bg-primary-400 py-4 px-7">
              {uploadImage.isPending ? (
                <Spinner className="!text-white mx-auto" />
              ) : (
                "  Upload profile picture"
              )}
            </div>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept=".png, .jpg, .jpeg"
              onChange={handleFileInputChange}
              style={{ display: "none" }}
              //      disabled={disabled || isLoading}
              //      {...rest}
            />
          </label>
        </div>
      )}
    </div>
  );
}
