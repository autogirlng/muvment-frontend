import { useAppSelector } from "@/lib/hooks";
import { referralTableHeadItems } from "@/utils/data";
import { copyToCipboard } from "@/utils/functions";
import TableCell from "@repo/ui/tableCell";
import TableHead from "@repo/ui/tableHead";
import EmptyState from "../EmptyState";
import { format } from "date-fns";
import { ReferralBadge } from "@repo/ui/badge";
import { useState } from "react";
import useFetchReferrals from "./hooks/useFetchReferrals";
import Pagination from "@repo/ui/pagination";
import { FullPageSpinner } from "@repo/ui/spinner";

type Props = {};

export default function Referrals({}: Props) {
  const { user } = useAppSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [codeButtonState, setCodeButtonState] = useState<{
    clicked: boolean;
    hovered: boolean;
  }>({ clicked: false, hovered: false });
  const [linkButtonState, setLinkButtonState] = useState<{
    clicked: boolean;
    hovered: boolean;
  }>({ clicked: false, hovered: false });
  const pageLimit = 10;

  const { referrals, totalCount, isError, error, isLoading, isSuccess } =
    useFetchReferrals({ currentPage, pageLimit });

  const referralLink = `https://muvment.ng/signup?code=${user?.referralCode}`;

  const handleCopyCode = () => {
    copyToCipboard(user?.referralCode || "");
    setCodeButtonState({ clicked: true, hovered: false });
    setTimeout(() => {
      setCodeButtonState({ clicked: false, hovered: false });
    }, 2000);
  };

  const handleCopyLink = () => {
    copyToCipboard(referralLink);
    setLinkButtonState({ clicked: true, hovered: false });
    setTimeout(() => {
      setLinkButtonState({ clicked: false, hovered: false });
    }, 2000);
  };

  const getCodeButtonStyles = () => {
    if (codeButtonState.clicked) {
      return "bg-[#1D2739] text-white";
    }
    if (codeButtonState.hovered) {
      return "bg-[#D6EDFF] text-[#0673FF] font-bold";
    }
    return "bg-grey-100 text-grey-600";
  };

  const getLinkButtonStyles = () => {
    if (linkButtonState.clicked) {
      return "bg-[#1D2739] text-white";
    }
    if (linkButtonState.hovered) {
      return "bg-[#D6EDFF] text-[#0673FF] font-bold";
    }
    return "bg-grey-100 text-grey-600";
  };

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 text-xs md:text-sm 3xl:text-base text-grey-500 px-3 sm:px-4 md:px-0">
      <h6 className="!font-semibold text-base md:text-xl 3xl:text-h6 text-grey-700">
        Referrals
      </h6>

      <div className="space-y-2">
        <p>Total Number Of Referrals</p>
        <h2 className="text-xl sm:text-2xl md:text-h3 lg:text-4xl 3xl:text-h2 text-primary-500">
          {user?.stats?.referralStats.totalReferrals}
        </h2>
      </div>

      {/* Responsive referral boxes */}
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
        {/* Referral Code Box */}
        <div className="bg-white rounded-lg sm:rounded-xl py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-7 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 md:gap-0 flex-1">
          <div className="space-y-1 sm:space-y-2 flex-1 min-w-0 w-full sm:w-auto">
            <p className="!font-medium text-sm md:text-base text-black">
              Referral Code
            </p>
            <p className="text-xs md:text-sm break-all text-grey-600 font-mono">
              {user?.referralCode}
            </p>
          </div>
          <button
            className={`rounded-lg sm:rounded-xl py-2 sm:py-2 md:py-3 px-3 sm:px-4 md:px-5 !font-semibold transition-colors duration-200 text-xs sm:text-xs md:text-sm whitespace-nowrap flex-shrink-0 w-full sm:w-auto ${getCodeButtonStyles()}`}
            onClick={handleCopyCode}
            onMouseEnter={() =>
              setCodeButtonState((prev) => ({ ...prev, hovered: true }))
            }
            onMouseLeave={() =>
              setCodeButtonState((prev) => ({ ...prev, hovered: false }))
            }
          >
            {codeButtonState.clicked ? "Code Copied!" : "Copy Code"}
          </button>
        </div>

        {/* Referral Link Box */}
        <div className="bg-white rounded-lg sm:rounded-xl py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-7 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 md:gap-0 flex-1">
          <div className="space-y-1 sm:space-y-2 flex-1 min-w-0 w-full sm:w-auto">
            <p className="!font-medium text-sm md:text-base text-black">
              Referral Link
            </p>
            <p className="text-xs md:text-sm break-all text-grey-600 font-mono">
              {referralLink}
            </p>
          </div>
          <button
            className={`rounded-lg sm:rounded-xl py-2 sm:py-2 md:py-3 px-3 sm:px-4 md:px-5 !font-semibold transition-colors duration-200 text-xs sm:text-xs md:text-sm whitespace-nowrap flex-shrink-0 w-full sm:w-auto ${getLinkButtonStyles()}`}
            onClick={handleCopyLink}
            onMouseEnter={() =>
              setLinkButtonState((prev) => ({ ...prev, hovered: true }))
            }
            onMouseLeave={() =>
              setLinkButtonState((prev) => ({ ...prev, hovered: false }))
            }
          >
            {linkButtonState.clicked ? "Link Copied!" : "Copy Link"}
          </button>
        </div>
      </div>

      {/* Table Section */}
      {isLoading ? (
        <FullPageSpinner className="!min-h-[300px]" />
      ) : isError ? (
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 text-center">
          <p className="text-red-500">Something went wrong</p>
        </div>
      ) : referrals.length > 0 ? (
        <div className="bg-white rounded-lg sm:rounded-xl overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-auto">
            <table className="w-full min-w-full divide-y divide-grey-200 border-t border-grey-200 md:mt-7">
              <TableHead tableHeadItems={referralTableHeadItems} />
              <tbody className="divide-y divide-grey-200">
                {referrals?.map((item, index) => (
                  <tr key={item.id}>
                    <TableCell
                      content={item?.referredUserName}
                      className="text-grey-900 !font-semibold w-fit"
                    />
                    <TableCell
                      content={item?.referredUserEmail}
                      className="text-grey-900"
                    />
                    <TableCell
                      content={
                        item?.createdAt
                          ? `${format(new Date(item?.createdAt), "MMM d, yyyy")} | ${format(
                              new Date(item?.createdAt),
                              "hh:mma"
                            )}`
                          : "-"
                      }
                      className="text-grey-900"
                    />
                    <TableCell
                      content={
                        typeof item?.status === "string"
                          ? item.status
                          : item?.status
                            ? "JOINED"
                            : "PENDING"
                      }
                      isBadge
                      badge={
                        <ReferralBadge
                          status={
                            typeof item?.status === "string"
                              ? item.status === "JOINED"
                                ? "JOINED"
                                : "PENDING"
                              : item?.status
                                ? "JOINED"
                                : "PENDING"
                          }
                        />
                      }
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="block sm:hidden">
            <div className="divide-y divide-grey-200">
              {referrals?.map((item, index) => (
                <div key={item.id} className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-grey-900 text-sm truncate">
                        {item?.referredUserName}
                      </h4>
                      <p className="text-xs text-grey-600 mt-1 break-all">
                        {item?.referredUserEmail}
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      <ReferralBadge
                        status={
                          typeof item?.status === "string"
                            ? item.status === "JOINED"
                              ? "JOINED"
                              : "PENDING"
                            : item?.status
                              ? "JOINED"
                              : "PENDING"
                        }
                      />
                    </div>
                  </div>
                  <div className="text-xs text-grey-500">
                    {item?.createdAt
                      ? `${format(new Date(item?.createdAt), "MMM d, yyyy")} | ${format(
                          new Date(item?.createdAt),
                          "hh:mma"
                        )}`
                      : "-"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : !user?.referralCode ? (
        <EmptyState
          title="No Referrals"
          image="/icons/empty_trnx_state.png"
          imageSize="w-[120px] sm:w-[182px] 3xl:w-[265px]"
        />
      ) : null}

      <div className="px-0 sm:px-0">
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageLimit={pageLimit}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

/* 

[
                  {
                    id: "90833",
                    referredUserName: "Nyquist Ndubuisi Nwaukwa",
                    referredUserEmail: "nyquist.nwaukwa@gmail.com",
                    status: true,
                    createdAt: new Date().toISOString(),
                  },
                  {
                    id: "90834",
                    referredUserName: "Ebuka Arinze",
                    referredUserEmail: "ebuka.arinze@gmail.com",
                    status: false,
                    createdAt: new Date().toISOString(),
                  },
                ]

*/
