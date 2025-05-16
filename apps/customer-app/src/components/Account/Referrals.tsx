import { useAppSelector } from "@/lib/hooks";
import { referralTableHeadItems } from "@/utils/data";
import { copyToCipboard } from "@/utils/functions";
import TableCell from "@repo/ui/tableCell";
import TableHead from "@repo/ui/tableHead";
import EmptyState from "../EmptyState";
import { format } from "date-fns";
import { ReferralBadge } from "@repo/ui/badge";
import { UserReferrals } from "@/utils/types";
import { useState } from "react";

type Props = {};

export default function Referrals({}: Props) {
  const { user } = useAppSelector((state) => state.user);
  const [referals, setReferrals] = useState<UserReferrals[]>([
    { name: "", email: "", date: "", status: "PENDING" },
  ]);

  return (
    <div className="space-y-8 text-xs md:text-sm 3xl:text-base text-grey-500">
      <h6 className="!font-semibold text-base md:text-xl 3xl:text-h6 text-grey-700">
        Referrals
      </h6>

      <div className="space-y-2">
        <p>Total Number Of Referrals</p>
        <h2 className="text-h3 md:text-4xl 3xl:text-h2 text-primary-500">
          {user?.stats?.referralStats.totalReferrals}
        </h2>
      </div>

      <div className="bg-white rounded-xl py-6 px-7 flex justify-between items-center">
        <div className="space-y-2">
          <p className="!font-medium text-base text-black">Referral Code</p>
          <p className="text-sm">{user?.referralCode}</p>
        </div>
        <button
          className="rounded-xl bg-grey-100 py-3 px-5 text-grey-600 !font-semibold"
          onClick={() => copyToCipboard(user?.referralCode || "")}
        >
          Copy Code
        </button>
      </div>

      {referals.length > 0 ? (
        <div className="overflow-auto">
          <table className="w-full min-w-full divide-y divide-grey-200 border-t border-grey-200 bg-white md:mt-7">
            <TableHead tableHeadItems={referralTableHeadItems} />
            <tbody className="divide-y divide-grey-200 ">
              {referals?.map((item, index) => (
                <tr key={index}>
                  <TableCell
                    content={item?.name}
                    className="text-grey-900 !font-semibold w-fit"
                  />
                  <TableCell
                    content={item?.email}
                    className="text-primary-500"
                  />
                  <TableCell
                    content={
                      item?.date
                        ? `${format(new Date(item?.date), "MMM d, yyyy")} | ${format(
                            new Date(item?.date),
                            "hh:mma"
                          )}`
                        : "-"
                    }
                    className="text-grey-900"
                  />

                  <TableCell
                    content={item?.status}
                    isBadge
                    badge={<ReferralBadge status={item?.status} />}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title="No Referrals"
          image="/icons/empty_trnx_state.png"
          imageSize="w-[182px] 3xl:w-[265px]"
        />
      )}
    </div>
  );
}
