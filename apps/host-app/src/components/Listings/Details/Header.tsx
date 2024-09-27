import BackLink from "@/components/BackLink";
import { ListingStatus } from "@/utils/types";
import { ListingBadge } from "@repo/ui/badge";
import { BlurredDialog } from "@repo/ui/dialog";
import { Popup } from "@repo/ui/popup";
import Link from "next/link";
import React, { useState } from "react";
import DeleteListing from "./modals/DeleteListing";
import DeactivateListing from "./modals/DeactivateListing";
import MoreButton from "@repo/ui/moreButton";

type Props = {
  name?: string;
  status?: ListingStatus;
  id?: string;
};

export default function ListingDetailsHeader({ name, status, id }: Props) {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openDeactivateModal, setOpenDeactivateModal] = useState<boolean>(false);

  const handleDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleDeactivateModal = () => {
    setOpenDeactivateModal(!openDeactivateModal);
  };
  return (
    <div className="flex justify-between items-center gap-3">
      <div className="space-y-5 w-full md:w-fit">
        <BackLink backLink="/listings" />
        <div className="flex flex-col md:flex-row items-center gap-6">
          <h5 className="text-4xl 3xl:text-h2 !font-bold">{name || ""}</h5>
          <ListingBadge status={status ? status : "review"} />
        </div>
      </div>

      <Popup
        trigger={<MoreButton className="!mx-0" />}
        content={
          <>
            <p className="!text-xs 3xl:!text-base !font-semibold">Actions</p>
            <ul className="space-y-2 *:py-2">
              <li>
                <Link
                  href={`/vehicle-onboarding?id=${id}`}
                  className="!text-xs 3xl:!text-base "
                >
                  Edit listing
                </Link>
              </li>
              <li>
                <BlurredDialog
                  open={openDeleteModal}
                  onOpenChange={handleDeleteModal}
                  trigger={
                    <button className="!text-xs 3xl:!text-base ">
                      Delete listing
                    </button>
                  }
                  content={
                    <DeleteListing handleModal={handleDeleteModal} id={id} />
                  }
                />
              </li>
              <li>
                <BlurredDialog
                  open={openDeactivateModal}
                  onOpenChange={handleDeactivateModal}
                  trigger={
                    <button className="!text-xs 3xl:!text-base ">
                      Deactivate listing
                    </button>
                  }
                  content={
                    <DeactivateListing
                      handleModal={handleDeactivateModal}
                      id={id}
                    />
                  }
                />
              </li>
              <li>
                <Link href={`/`} className="!text-xs 3xl:!text-base ">
                  View as customer
                </Link>
              </li>
            </ul>
          </>
        }
      ></Popup>
    </div>
  );
}
