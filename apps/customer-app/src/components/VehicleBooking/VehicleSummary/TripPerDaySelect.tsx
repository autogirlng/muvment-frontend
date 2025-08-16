
import { useState, useMemo } from "react";
import DateInput from "../DateInput";
import TimeInput from "../TimeInput";
import { useFetchUrlParams } from "@/utils/functions";
import Icons from "@repo/ui/icons";
import SelectInput from "@repo/ui/select";
import { ReactNode } from "react";
import cn from "classnames";
import { format } from 'date-fns';
import {
    CalendarValue,
    MappedInformation,
    VehicleInformation,
    VehiclePerksProp,
} from "@/utils/types";
import { addDays, differenceInDays } from "date-fns";
import { setFlagsFromString } from "v8";
"./TripPerDaySelect";

type InitialValuesProps = {
    bookingType: "SINGLE_DAY" | "MULTI_DAY" | string;
    startDate: Date | null;
    startTime: Date | null;
    endDate: Date | null;
    endTime: Date | null;
    pickupLocation: string;
};


const InputSection = ({
    title,
    children,
    error,
}: {
    title: string;
    children: ReactNode;
    textColor?: "black";
    error?: string;
}) => {
    return (
        <div className="p-1">
            <p
                className={cn(
                    "text-sm 3xl:text-base",
                    "text-black"
                )}
            >
                {title}
            </p>
            <div className="flex items-center gap-3">{children}</div>
            {error && <p className="text-error-500 ">{error}</p>}
        </div>
    );
};
interface tripDetails {
    id?: string;
    bookingType?: string;
    tripStartDate?: string;
    tripStartTime?: string;
    pickupLocation?: string;
    dropOffLocation?: string;
    areaOfUse?: string;
}

interface ITripPerDaySelect {
    day: string,
    deleteMethod?: (idToDelete: string) => void,
    id: string,
    onChangeTrip: (id: string, details: tripDetails) => void;
    vehicle?: VehicleInformation | null
}

const TripPerDaySelect = ({ day, deleteMethod, id, onChangeTrip, vehicle }: ITripPerDaySelect) => {
    const [date, setDate] = useState(`Day ${day}: Choose Date`);

    const [bookingType, setBookingType] = useState('');
    const [tripStartDate, setTripStartDate] = useState<Date>(new Date());
    const [tripStartTime, setTripStartTime] = useState<Date | null>(null);
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [areaOfUse, setAreaOfUse] = useState('Mainland Central');
    const [isDayTwoCollapsed, setIsDayTwoCollapsed] = useState(false);

    const onChange = (key: string, value: string) => {
        const trips: tripDetails[] = JSON.parse(sessionStorage.getItem('trips') || '[]')
        const tripExists = trips.some(trip => trip.id === id);
        let updatedTrips;
        if (tripExists) {
            updatedTrips = trips.map((trip) => {
                if (trip.id === id) {
                    return { ...trip, [key]: value };
                }
                return trip;
            });
        } else {
            updatedTrips = [...trips, { id, [key]: value }];
        }
        sessionStorage.setItem("trips", JSON.stringify(updatedTrips))

        onChangeTrip(id, { [key]: value })

        switch (key) {
            case 'date':
                setDate(value);
                break;
            case 'bookingType':

                setBookingType(value)
                break;
            case 'tripStartDate':
                const date = new Date(value);
                setTripStartDate(date);
                const formattedDate = format(date, "MMM do yyyy");
                setDate(`Day ${day}: ${formattedDate}`)
                break;
            case 'tripStartTime':
                setTripStartTime(new Date(value));
                break;
            case 'pickupLocation':
                setPickupLocation(value);
                break;
            case 'dropoffLocation':
                setDropoffLocation(value);
                break;
            case 'areaOfUse':
                setAreaOfUse(value);
                break;
            default:
                break;
        }

    }



    return <>
        <div className="rounded-2xl px-4 p-2 mt-1 border border-grey-200">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsDayTwoCollapsed(!isDayTwoCollapsed)}
            >
                <div className="flex items-center space-x-2 text-gray-600">
                    {Icons.ic_calendar}
                    <span className="text-sm">{date}</span>
                </div>
                {
                    day !== "1" && deleteMethod &&
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => deleteMethod(id)} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 6h18" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                }
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 text-gray-600 transition-transform duration-300 ${isDayTwoCollapsed ? 'rotate-180' : 'rotate-0'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>

            {/* Form fields for Day 2 */}
            {!isDayTwoCollapsed && (
                <div className="mt-2 pt-2 space-y-4">
                    {/* Booking Type */}
                    <div>
                        <InputSection title="Booking Type">
                            <SelectInput
                                id="bookingType"
                                placeholder="Select Booking Type"
                                variant="outlined"
                                className=""
                                options={[
                                    { option: "1 Hour", value: "AN_HOUR" },
                                    { option: "3 hours", value: "THREE_HOURS" },
                                    { option: "6 hours", value: "SIX_HOURS" },
                                    { option: "12 hours", value: " TWELVE_HOURS" },
                                    { option: "Airport Transfers", value: "AIRPORT_PICKUP" },

                                ]}
                                value={bookingType}
                                onChange={(value) => onChange("bookingType", value)}
                            />
                        </InputSection>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            {/* Dropdown Arrow Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Trip Start */}
                    <div>
                        <InputSection
                            title="Trip Start"
                            textColor="black"
                        // error={
                        //     !isDateRangeValid ? "Invalid date range selected" : undefined
                        // }
                        >
                            <DateInput
                                name="startDate"
                                value={tripStartDate}
                                onChange={(value: CalendarValue) => {
                                    onChange("tripStartDate", value?.toString() || '')
                                }}
                                minDate={new Date()} />


                            <TimeInput
                                name="startTime"
                                value={tripStartTime}
                                onChange={(date: Date) => onChange("tripStartTime", date.toString())}
                                timeType="start" />
                        </InputSection>

                    </div>


                    <InputSection title="Pickup Location">
                        <input
                            type="text"
                            name="pickupLocation"
                            value={pickupLocation}
                            onChange={(e) => onChange("pickupLocation", e.target.value)}
                            placeholder="Enter location"
                            className="w-full rounded-[18px] p-4 text-left text-sm h-[56px] outline-none bg-white text-grey-900 border border-grey-300 hover:border-primary-500 focus:border-primary-500 focus:shadow-[0_0_0_4px_#1E93FF1A] placeholder:text-grey-400"
                        />
                    </InputSection>

                    <InputSection title="Drop-off Location">
                        <input
                            type="text"
                            name="dropoffLocation"
                            value={dropoffLocation}
                            onChange={(e) => onChange("dropoffLocation", e.target.value)}
                            placeholder="Enter location"
                            className="w-full rounded-[18px] p-4 text-left text-sm h-[56px] outline-none bg-white text-grey-900 border border-grey-300 hover:border-primary-500 focus:border-primary-500 focus:shadow-[0_0_0_4px_#1E93FF1A] placeholder:text-grey-400"
                        />
                    </InputSection>

                    {/* Area of Use */}
                    <InputSection title="Area of Use">
                        <SelectInput
                            id="areaOfUse"
                            placeholder="Select Area of Use"
                            variant="outlined"
                            options={[
                                { option: "Mainland Central", value: "MAINLAND_CENTRAL" },
                                { option: "Island Central", value: "ISLAND_CENTRAL" },
                                { option: "Mainland Outskirt", value: "MAINLAND_OUTSKIRT" },

                            ]}
                            value={areaOfUse}
                            onChange={(value) => onChange("areaOfUse", value)}

                        />
                    </InputSection>

                </div>
            )}
        </div>
    </>
}

export { TripPerDaySelect }