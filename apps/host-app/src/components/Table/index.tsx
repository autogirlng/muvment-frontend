import { tableHeadItems } from "@/utils/data";
import TableRow from "./TableRow";
import TableHead from "./TableHead";
import { BookingOverviewTableRow } from "@/utils/types";
import Image from "next/image";

export default function Table({
  items,
  emptyStateMessage,
}: {
  items: BookingOverviewTableRow[];
  emptyStateMessage: string;
}) {
  return items.length > 0 ? (
    <div className="overflow-auto">
      <table className="w-full min-w-full divide-y divide-grey-200 border-t border-grey-200 bg-white md:mt-7">
        <TableHead tableHeadItems={tableHeadItems} />
        <tbody className="divide-y divide-grey-200 ">
          {items?.map((item, index) => <TableRow key={index} items={item} />)}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="bg-grey-75 rounded-[40px] py-[88px] px-5 space-y-6 2xl:space-y-10 flex flex-col items-center justify-center">
      <Image
        src="/images/empty_state.png"
        alt=""
        width={182}
        height={151}
        className="w-[112px] 2xl:w-[182px]"
      />
      <div className="space-y-3 2xl:space-y-6 text-center text-grey-500">
        <h3 className="text-h6 2xl:text-h4 4xl:text-h3 font-medium">
          No Data Yet
        </h3>
        <p className="text-base 2xl:text-xl 4xl:text-h6 font-medium">
          {emptyStateMessage}
        </p>
      </div>
    </div>
  );
}
