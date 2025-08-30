import { formatNumberWithCommas } from "@/utils/functions"
import { BookingSummaryPricing, VehicleInformation } from "@/utils/types"
import { toTitleCase } from "@/utils/functions"
import { Trips, TripDetails } from "@/utils/types"

interface BookingCostBreakdownProps {
    bookingPriceBreakdown: BookingSummaryPricing,
    trips: any,
    vehicle: VehicleInformation | null
}

export const BookingCostBreakdown = ({ bookingPriceBreakdown, trips, vehicle }: BookingCostBreakdownProps) => {
    return <div className="rounded-2xl p-5 m-0 border border-grey-200">
        <h2 className="font-bold">Cost Breakdown</h2>
        <div className="border-b border-grey-200 pb-4">

            <div className="w-full text-sm flex justify-between mt-3">
                <span>Total Cost</span>
                <span>{bookingPriceBreakdown.currency || 'NGN'} {formatNumberWithCommas(bookingPriceBreakdown.breakdown.originalPrice) || 0}</span>
            </div>
            <div className="w-full  text-sm flex justify-between mt-4">
                <span>Extra Hours</span>
                <span>Billed as you go</span>
            </div>
            {<div className="w-full  text-sm flex justify-between mt-4">
                <span>Outskirt Price</span>
                <span> {bookingPriceBreakdown.currency || 'NGN'} {formatNumberWithCommas(bookingPriceBreakdown.breakdown.outskirtFee) || 0}</span>
            </div>}

            {<div className="w-full  text-sm flex justify-between mt-4">
                <span>Extreme Area Price</span>
                <span> {bookingPriceBreakdown.currency || 'NGN'} {formatNumberWithCommas(bookingPriceBreakdown.breakdown.extremeAreaFee) || 0}</span>
            </div>
            }
            {<div className="w-full  text-sm flex justify-between mt-4">
                <span>Area of Use</span>
                <span style={{ textTransform: "capitalize" }}>
                    {trips.map((trip: any) => {
                        const areaOfUse = toTitleCase(trip.tripDetails?.areaOfUse || trip.areaOfUse || '')
                        const area1 = toTitleCase(toTitleCase(areaOfUse?.split("_")[1] || ''))
                        let area2 = toTitleCase(areaOfUse?.split("_")[2] || '')

                        if (area2 === "Outskirt") {
                            return <span key={trip.id}>(day {Number(trip.id?.split("-")[1]) + 1}) <span className="text-[blue] text-xs">+NGN{vehicle?.outskirtsPrice}</span> <br /></span>
                        }
                        else if (area1 === "Extreme" && area2 === "Area") {
                            return <span key={trip.id}>(day {Number(trip.id?.split("-")[1]) + 1}) <span className="text-[blue] text-xs">+NGN{vehicle?.extremeAreaPrice}</span> <br /></span>
                        }
                        else {
                            return;
                        }

                    })}
                </span>
            </div>}

            {
                bookingPriceBreakdown.breakdown.discountAmount > 0 &&
                <div className="w-full text-sm flex justify-between mt-4">
                    <span>Discount - {bookingPriceBreakdown.breakdown.discountPercentage}%</span>
                    <span>-{bookingPriceBreakdown.currency || 'NGN'} {formatNumberWithCommas(bookingPriceBreakdown.breakdown.discountAmount)}</span>
                </div>
            }
        </div>
        <div className="w-full text-sm flex justify-between mt-4">
            <span>Total</span>
            <span className="font-bold">{bookingPriceBreakdown.currency || 'NGN'} {formatNumberWithCommas(bookingPriceBreakdown.totalPrice)}</span>
        </div>
    </div>
}