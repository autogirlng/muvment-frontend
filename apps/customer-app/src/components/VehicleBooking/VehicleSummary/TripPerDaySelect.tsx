import { useState, useRef, useEffect } from "react";
import DateInput from "../DateInput";
import TimeInput from "../TimeInput";
import Icons from "@repo/ui/icons";
import SelectInput from "@repo/ui/select";
import { ReactNode } from "react";
import cn from "classnames";
import { format } from 'date-fns';
import {
    CalendarValue,
    TripDetails,
    ITripPerDaySelect
} from "@/utils/types";
import { toTitleCase } from "@/utils/functions";
import { GroupCheckBox } from "@repo/ui/checkbox";
import TextArea from "@repo/ui/textarea";
import { GoogleMapsLocationInput } from "../GoogleMapsLocationInput";


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
            {error && <p className="text-error-500 text-sm">{error}</p>}
        </div>
    );
};


const TripPerDaySelect = ({ day, deleteMethod, id, onChangeTrip, vehicle, initialValues, disabled, page, isCollapsed, toggleOpen }: ITripPerDaySelect) => {
    const [date, setDate] = useState(`Day ${day}: Choose Date`);
    const [bookingType, setBookingType] = useState(initialValues?.bookingType || '');
    const initialTripStartTime = initialValues ? new Date(`${initialValues.tripStartTime}`) : null
    const initialTripStartDate = initialValues ? new Date(`${initialValues.tripStartDate}`) : null
    const [tripStartDate, setTripStartDate] = useState<Date | null>(initialTripStartDate);
    const [tripStartTime, setTripStartTime] = useState<Date | null>(initialTripStartTime);
    const [pickupLocation, setPickupLocation] = useState(initialValues?.pickupLocation || "");
    const [dropoffLocation, setDropoffLocation] = useState(initialValues?.dropoffLocation || "");
    const [areaOfUse, setAreaOfUse] = useState(initialValues?.areaOfUse);
    const [extraDetails, setExtraDetails] = useState<string>('')
    const [purposeOfRide, setPurposeOfRide] = useState<string>('')
    const [isDayTwoCollapsed, setIsDayTwoCollapsed] = useState(false);
    const [checkedLocations, setCheckedLocations] = useState<string[]>([])
    const [checkedExtremeLocations, setCheckedExtremeLocations] = useState<string[]>([])

    const isOutskirt = (): string => {
        const location = initialValues?.areaOfUse?.split("_")

        if (location && location[location.length - 1] === "OUTSKIRT") {
            return 'outskirt'
        }

        else if (location && location[location.length - 1] === "AREA" && location && location[location.length - 2] === "EXTREME") {
            return 'extreme'
        }
        else {
            return ''

        }
    }

    const onChange = (key: string, value: string) => {
        const trips: TripDetails[] = JSON.parse(sessionStorage.getItem('trips') || '[]')
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
            case 'extraDetails':
                setExtraDetails(value);
                break;
            case 'purposeOfRide':
                setPurposeOfRide(value);
                break;

            default:
                break;
        }
    }

    const areasOfUse = (): { option: string, value: string }[] => {
        let areas = [
            {
                option: `${toTitleCase(vehicle?.location || "")} Mainland Central`,
                value: `${vehicle?.location && vehicle.location.toUpperCase()}_MAINLAND_CENTRAL`
            },
            {
                option: `${toTitleCase(vehicle?.location || "")} Island Central`,
                value: `${vehicle?.location && vehicle.location.toUpperCase()}_ISLAND_CENTRAL`
            },
        ]
        if (vehicle?.outskirtsLocation && vehicle.outskirtsLocation.length >= 1) {
            areas.push({
                option: `${toTitleCase(vehicle?.location || "")} Mainland Outskirt`,
                value: `${vehicle?.location && vehicle.location.toUpperCase()}_MAINLAND_OUTSKIRT`
            },)
        }
        if (vehicle?.extremeAreasLocation && vehicle.extremeAreasLocation.length >= 1) {
            areas.push({
                option: `${toTitleCase(vehicle?.location || "")} Extreme Area`,
                value: `${vehicle?.location && vehicle.location.toUpperCase()}_EXTREME_AREA`
            },)
        }
        return areas;
    }


    return <>
        <div className="rounded-2xl px-4 p-2 mt-1 border border-grey-200">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleOpen()}
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
                    className={`h-5 w-5 text-gray-600 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : 'rotate-0'}`}
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


            {!isCollapsed && (
                <div className="mt-2 pt-2 space-y-4">
                    <div>
                        <InputSection title="Booking Type">
                            <SelectInput
                                disabled={disabled}
                                id="bookingType"
                                placeholder="Select Booking Type"
                                variant="outlined"
                                className=""
                                options={[
                                    { option: "1 Hour", value: "AN_HOUR" },
                                    { option: "3 hours", value: "THREE_HOURS" },
                                    { option: "6 hours", value: "SIX_HOURS" },
                                    { option: "12 hours", value: "TWELVE_HOURS" },
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
                        >
                            <DateInput
                                name="startDate"
                                value={tripStartDate}
                                disabled={disabled}
                                onChange={(value: CalendarValue) => { onChange("tripStartDate", value?.toString() || '') }}
                                minDate={new Date()} />
                            <TimeInput
                                name="startTime"
                                disabled={disabled}
                                value={tripStartTime}
                                onChange={(date: Date) => onChange("tripStartTime", date.toString())}
                                timeType="start" />
                        </InputSection>
                    </div>
                    <InputSection title="Pickup location">
                        <GoogleMapsLocationInput
                            disabled={disabled}
                            value={pickupLocation}
                            onChange={(value) => onChange("pickupLocation", value)}
                            placeholder="Enter location"
                        />
                    </InputSection>

                    <InputSection title="Drop-off Location">
                        <GoogleMapsLocationInput
                            disabled={disabled}
                            value={dropoffLocation}
                            onChange={(value) => onChange("dropoffLocation", value)}
                            placeholder="Enter location"
                        />
                    </InputSection>


                    <InputSection title="Area of Use" >
                        <SelectInput
                            id="areaOfUse"
                            placeholder="Select Area of Use"
                            variant="outlined"
                            disabled={disabled}
                            options={areasOfUse()}
                            value={areaOfUse}
                            onChange={(value) => onChange("areaOfUse", value)}
                        />
                    </InputSection>
                    {
                        page === 'booking-vehicle' &&
                        isOutskirt() === "outskirt" &&
                        (vehicle?.outskirtsLocation?.length ?? 0) >= 1 &&
                        <div className="space-y-3">
                            <label
                                htmlFor="features"
                                className="text-sm block font-medium mt-4 text-black"
                            >
                                Outskirt locations
                            </label>
                            <p className="text-sm text-grey-600">
                                Stops here will incur an additional cost of {vehicle?.vehicleCurrency} {vehicle?.outskirtsPrice} set by the host
                                of your vehicle
                            </p>
                            <div className="flex flex-wrap gap-x-4 gap-y-8">
                                {vehicle?.outskirtsLocation?.map((location) => (
                                    <GroupCheckBox
                                        key={location}
                                        feature={location}
                                        checkedValues={checkedLocations}
                                        onChange={(feature: string, isChecked: boolean) => {
                                            if (isChecked) {
                                                // Only keep the newly selected checkbox one
                                                setCheckedLocations([feature]);

                                                const trips: TripDetails[] = JSON.parse(sessionStorage.getItem("trips") || "[]");
                                                const updatedTrips = trips.map((trip) => {
                                                    if (trip.id === id) {
                                                        return {
                                                            ...trip,
                                                            outskirtLocations: [feature],
                                                        };
                                                    }
                                                    return trip;
                                                });
                                                sessionStorage.setItem("trips", JSON.stringify(updatedTrips));
                                            } else {
                                                // If unchecked, clear selection
                                                setCheckedLocations([]);

                                                const trips: TripDetails[] = JSON.parse(sessionStorage.getItem("trips") || "[]");
                                                const updatedTrips = trips.map((trip) => {
                                                    if (trip.id === id) {
                                                        return {
                                                            ...trip,
                                                            outskirtLocations: [],
                                                        };
                                                    }
                                                    return trip;
                                                });
                                                sessionStorage.setItem("trips", JSON.stringify(updatedTrips));
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    }

                    {
                        page === 'booking-vehicle' &&
                        isOutskirt() === "extreme" &&
                        (vehicle?.extremeAreasLocation?.length ?? 0) >= 1 &&
                        <div className="space-y-3">
                            <label
                                htmlFor="features"
                                className="text-sm block font-medium mt-4 text-black"
                            >
                                Extreme locations
                            </label>
                            <p className="text-sm text-grey-600">
                                Stops here will incur an additional cost of {vehicle?.vehicleCurrency} {vehicle?.extremeAreaPrice} set by the host
                                of your vehicle
                            </p>
                            <div className="flex flex-wrap gap-x-4 gap-y-8">
                                {vehicle?.extremeAreasLocation?.map((location) => (
                                    <GroupCheckBox
                                        key={location}
                                        feature={location}
                                        checkedValues={checkedExtremeLocations}
                                        onChange={(feature: string, isChecked: boolean) => {
                                            if (isChecked) {
                                                // Only keep the newly selected checkbox one
                                                setCheckedExtremeLocations([feature]);
                                                const trips: TripDetails[] = JSON.parse(sessionStorage.getItem("trips") || "[]");
                                                const updatedTrips = trips.map((trip) => {
                                                    if (trip.id === id) {
                                                        return {
                                                            ...trip,
                                                            extremeLocations: [feature],
                                                        };
                                                    }
                                                    return trip;
                                                });
                                                sessionStorage.setItem("trips", JSON.stringify(updatedTrips));
                                            } else {
                                                // If unchecked, clear selection
                                                setCheckedExtremeLocations([]);

                                                const trips: TripDetails[] = JSON.parse(sessionStorage.getItem("trips") || "[]");
                                                const updatedTrips = trips.map((trip) => {
                                                    if (trip.id === id) {
                                                        return {
                                                            ...trip,
                                                            extremeLocations: [],
                                                        };
                                                    }
                                                    return trip;
                                                });
                                                sessionStorage.setItem("trips", JSON.stringify(updatedTrips));
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    }

                    {
                        page === 'booking-vehicle' && <>
                            <TextArea
                                name="extraDetails"
                                id="extraDetails"
                                label="Extra details (optional)"
                                placeholder="Add extra trip details you would like to share"
                                value={extraDetails}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    onChange("extraDetails", e.target.value)
                                }
                            />

                            <TextArea
                                name="purposeOfRide"
                                id="purposeOfRide"
                                label="Purpose of ride (optional)"
                                placeholder="Add your purpose of ride"
                                value={purposeOfRide}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    onChange("purposeOfRide", e.target.value)
                                }
                            />
                        </>
                    }

                </div>
            )}


        </div>
    </>
}

export { TripPerDaySelect }


