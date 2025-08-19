"use client";

import type { NextPage } from "next";
import { useState, useMemo, useEffect, FC, ReactNode } from "react";
import { format, addHours } from "date-fns";
import BackLink from "@/components/BackLink";
import {
  MapPin,
  Clock,
  CircleDashed,
  Globe,
  Ticket,
  Warning,
  CaretDown,
} from "@phosphor-icons/react";
import { formatNumberWithCommas } from "@/utils/functions";
import Button from "@repo/ui/button";
import { useRouter } from "next/navigation";
import TopHeader from "@/components/Navbar/TopHeader";
import useExtendBooking from "./hooks/useExtendBooking";
import { useSearchParams } from "next/navigation";
import { FullPageSpinner } from "@repo/ui/spinner";
import Link from "next/link";

// Helper component for displaying trip details
const InfoCard: FC<{
  icon: ReactNode;
  title: string;
  details: string | string[];
}> = ({ icon, title, details }) => (
  <div className="flex items-start space-x-4">
    <div className="mt-1 text-gray-500">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{title}</p>
      {Array.isArray(details) ? (
        details.map((detail, index) => (
          <p key={index} className="font-medium text-gray-800 text-sm">
            {detail}
          </p>
        ))
      ) : (
        <p className="font-medium text-gray-800 text-sm">{details}</p>
      )}
    </div>
  </div>
);

// Helper component for the timeline in the trip summary
const TimelineItem: FC<{
  icon: ReactNode;
  text: string;
  subtext?: string;
  isWarning?: boolean;
}> = ({ icon, text, subtext, isWarning }) => (
  <div className="flex items-start space-x-4">
    <div className={`mt-1 ${isWarning ? "text-red-500" : "text-green-500"}`}>
      {icon}
    </div>
    <div>
      <p
        className={`font-medium ${isWarning ? "text-red-500" : "text-gray-800"}`}
      >
        {text}
      </p>
      {subtext && <p className="text-sm text-gray-500">{subtext}</p>}
    </div>
  </div>
);

const ExtendTripPage: NextPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");

  // State declarations
  const [extraHours, setExtraHours] = useState<number>(4);
  const [areaOfUse, setAreaOfUse] = useState<string>("Mainland");
  const [reason, setReason] = useState<string>("");
  const [specialRequests, setSpecialRequests] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(true);

  // Data fetching
  const { booking, isLoading, isError } = useExtendBooking({
    id: bookingId || undefined,
  });

  // Effects
  useEffect(() => {
    if (!bookingId) {
      router.push("/bookings");
    }
  }, [bookingId, router]);

  useEffect(() => {
    if (booking?.areaOfUse) {
      setAreaOfUse(booking.areaOfUse);
    }
  }, [booking]);

  useEffect(() => {
    if (isError) {
      router.push("/bookings");
    }
  }, [isError, router]);

  // Moved the useMemo hook above the conditional return to ensure consistent hook order
  const EXTRA_HOUR_COST = booking?.vehicle?.pricing?.extraHoursFee || 50000;
  const OUTSKIRT_COST = 10537;

  const totalCost = useMemo(() => {
    const hoursCost = extraHours * EXTRA_HOUR_COST;
    return hoursCost + OUTSKIRT_COST;
  }, [extraHours, EXTRA_HOUR_COST]);

  // Loading and error states
  if (!bookingId || isLoading) {
    return <FullPageSpinner />;
  }

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setExtraHours(value === "" ? 0 : parseInt(value, 10));
  };

  if (isError || !booking) {
    return null;
  }

  return (
    <>
      <TopHeader />
      <div className="min-h-screen bg-grey-50 font-sans pt-5 sm:pt-5">
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <BackLink backLink="/bookings" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            {/* Extend Trip Section */}
            <div className="lg:col-span-2 bg-grey-100 p-8 rounded-3xl border border-grey-200 shadow-sm">
              <h1 className="text-2xl font-bold text-grey-900 mb-6">
                Extend Trip
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 border-b border-grey-200 pb-8 mb-8">
                <InfoCard
                  icon={<Ticket size={20} />}
                  title="Booking ID"
                  details={booking.id}
                />
                <InfoCard
                  icon={<MapPin size={20} />}
                  title="Pick-up"
                  details={booking.pickupLocation}
                />
                <InfoCard
                  icon={<MapPin size={20} />}
                  title="Drop-off"
                  details={booking.dropoffLocation}
                />
                <InfoCard
                  icon={<Clock size={20} />}
                  title="Start"
                  details={format(
                    new Date(booking.startDate),
                    "dd MMM yyyy | hh:mma"
                  )}
                />
                <InfoCard
                  icon={<CircleDashed size={20} />}
                  title="Stop"
                  details={format(
                    new Date(booking.endDate),
                    "dd MMM yyyy | hh:mma"
                  )}
                />
                <InfoCard
                  icon={<Globe size={20} />}
                  title="Area Of Use"
                  details={booking.areaOfUse}
                />
              </div>
            </div>

            {/* Trip Summary Section */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-3xl border border-grey-200 shadow-sm">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h2 className="text-lg font-bold text-grey-900 mb-4">
                    Trip Summary
                  </h2>
                  <div className="space-y-4">
                    <TimelineItem
                      icon={<MapPin size={20} />}
                      text={booking.pickupLocation}
                      subtext="Pick-up"
                    />
                    <TimelineItem
                      icon={<MapPin size={20} />}
                      text={booking.dropoffLocation}
                      subtext="Drop-off"
                    />
                    <TimelineItem
                      icon={<Warning size={20} />}
                      text={`Your trip is now going to end at ${
                        extraHours > 0
                          ? format(
                              addHours(new Date(booking.endDate), extraHours),
                              "hh:mma"
                            )
                          : format(new Date(booking.endDate), "hh:mma")
                      }`}
                      isWarning
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Input Section */}
            <div className="lg:col-span-2 p-8 rounded-3xl border border-grey-200 shadow-sm">
              <label className="text-sm mt-4 font-medium text-gray-700">
                New Drop-off Location{" "}
                <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                value={booking.dropoffLocation}
                readOnly
                className="mt-1 block w-full border border-grey-300 rounded-lg shadow-sm p-4 text-xs"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="extraHours"
                    className="block mt-4 text-sm font-medium text-gray-700"
                  >
                    Number Of Extra Hours
                  </label>
                  <input
                    type="number"
                    id="extraHours"
                    name="extraHours"
                    placeholder="Enter number of extra hours"
                    value={extraHours}
                    onChange={handleHoursChange}
                    className="mt-1 block w-full border border-grey-300 rounded-lg shadow-sm p-4 text-xs focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="areaOfUse"
                    className="block text-sm font-medium text-grey-700"
                  >
                    Area of Use
                  </label>
                  <div className="relative mt-1">
                    <select
                      id="areaOfUse"
                      name="areaOfUse"
                      value={areaOfUse}
                      onChange={(e) => setAreaOfUse(e.target.value)}
                      className="appearance-none block w-full border border-grey-300 rounded-lg shadow-sm p-4 text-xs focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="Mainland">Mainland</option>
                      <option value="Island">Island</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <CaretDown size={16} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="reason"
                  className="text-sm font-medium text-gray-700"
                >
                  Reason For Extension{" "}
                  <span className="text-gray-400">(optional)</span>
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  rows={3}
                  placeholder="Please let us know why you are extending this trip"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="mt-1 block w-full border border-grey-300 rounded-lg shadow-sm p-2 text-xs focus:ring-primary-500 focus:border-primary-500"
                ></textarea>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="requests"
                  className="text-sm font-medium text-grey-700"
                >
                  Special Requests{" "}
                  <span className="text-grey-400">(optional)</span>
                </label>
                <textarea
                  id="requests"
                  name="requests"
                  rows={3}
                  placeholder="Add extra trip details you would like to share"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="mt-1 block w-full border border-grey-300 rounded-lg shadow-sm p-2 text-xs focus:ring-primary-500 focus:border-primary-500"
                ></textarea>
              </div>
              <div className="flex items-start mt-4">
                <input
                  id="accept"
                  name="accept"
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-grey-300 rounded-lg mt-1"
                />
                <div className="ml-3 text-sm">
                  <label htmlFor="accept" className="text-grey-700">
                    I understand and accept that exceeding the agreed booking
                    duration whether in hours or days will result in additional
                    charges, as outlined in{" "}
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:text-primary-500"
                    >
                      Muvment&apos;s pricing policy.
                    </a>
                  </label>
                </div>
              </div>
            </div>

            {/* Cost Breakdown Section */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-3xl border border-grey-200 shadow-sm">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h2 className="text-lg font-bold text-grey-900 mb-4">
                    Cost Breakdown
                  </h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <p className="text-grey-600">Number of extra hours</p>
                      <p className="font-medium text-grey-800">
                        {extraHours}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-grey-600">
                        Extra hours cost (set by host)
                      </p>
                      <p className="font-medium text-grey-800">
                        {formatNumberWithCommas(EXTRA_HOUR_COST)}/hr
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-grey-600">Outskirt cost</p>
                      <p className="font-medium text-grey-800">
                        {formatNumberWithCommas(OUTSKIRT_COST)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-grey-200 pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-grey-900">Total</p>
                    <p className="text-xl font-bold text-grey-900">
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                        minimumFractionDigits: 0,
                      }).format(totalCost)}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                className="w-full mt-6 bg-primary-700 hover:bg-primary-500 text-white"
                size="lg"
                disabled={!isChecked}
                onClick={() => {
                  // Handle payment logic here
                }}
              >
                Proceed to payment
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ExtendTripPage;
