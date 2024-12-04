import Link from "next/link";
import { useState } from "react";
import { ListingStatus } from "@/utils/types";
import { ListingBadge } from "@repo/ui/badge";
import { Popup } from "@repo/ui/popup";
import MoreButton from "@repo/ui/moreButton";
import Icons from "@repo/ui/icons";
import BackLink from "@/components/BackLink";

type Props = {
  name?: string;
  status?: ListingStatus;
  id?: string;
};

export default function ListingDetailsHeader({ name, status, id }: Props) {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openDeactivateModal, setOpenDeactivateModal] =
    useState<boolean>(false);

  const handleDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleDeactivateModal = () => {
    setOpenDeactivateModal(!openDeactivateModal);
  };
  return (
    <div className="space-y-5">
      <div className="flex justify-between gap-2">
        <BackLink backLink="/listings" />
        <div className="flex items-center gap-3">
          <div className="flex lg:hidden items-center justify-center w-10 h-10 rounded-full bg-primary-50 text-primary-500 ">
            {Icons.ic_calendar}
          </div>
          <Popup
            trigger={<MoreButton className="!mx-0" />}
            content={
              <>
                <p className="!text-xs 3xl:!text-base !font-semibold">
                  Actions
                </p>
                <ul className="space-y-2 *:py-2">
                  <li>
                    <Link
                      href={`/vehicle-onboarding?id=${id}`}
                      className="!text-xs 3xl:!text-base"
                    >
                      Edit listing
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={`/listings/view-as-customer/${id}`}
                      className="!text-xs 3xl:!text-base "
                    >
                      View as customer
                    </Link>
                  </li>
                </ul>
              </>
            }
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <h5 className="text-h6 sm:text-4xl 3xl:text-h2 !font-bold">
          {name || ""}
        </h5>
        <ListingBadge status={status ? status : "review"} />
      </div>
    </div>
  );
}
