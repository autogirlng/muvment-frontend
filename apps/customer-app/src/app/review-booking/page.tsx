"use client";

import React, { useState, useEffect, FC, Suspense } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useHttp } from '@/hooks/useHttp';
import Image from 'next/image';
import { FullPageSpinner } from '@repo/ui/spinner';



interface Booking {
    id: string;
    startDate: string;
    endDate: string;
    duration: number;
    bookingType: "SINGLE_DAY" | "MULTI_DAY";
    amount: number;
    paymentStatus: string;
    paymentMethod: string;
    rentalAgreement: any;
    bookingStatus: string;
    isForSelf: boolean;
    guestName: string;
    guestEmail: string;
    guestPhoneNumber: string;
    pickupLocation: string;
    dropoffLocation: string;
    emergencyContact: string;
    userEmail: string;
    userPhoneNumber: string;
    userCountry: string;
    countryCode: string;
    specialInstructions: string;
    paymentLink: string;
    outskirtsLocation: string[];
    areaOfUse: string;
    extraDetails: string;
    purposeOfRide: string;
    tripPurpose: string;
    secondaryPhoneNumber: string;
    currencyCode: string;
    vehicleId: string;
    userId: string;
    hostId: string;
    version: number;
    createdAt: string;
    updatedAt: string;
    vehicle: {
        pricing: {
            dailyRate: {
                value: number;
                currency: null | string;
                unit: string;
            };
            extraHoursFee: number;
            airportPickupFee: number;
            hourlyRate: null | {
                value: number;
                currency: string;
                unit: string;
            };
            discounts: {
                durationInDays: number;
                percentage: number;
            }[];
        };
        tripSettings: {
            advanceNotice: string;
            maxTripDuration: string;
            provideDriver: boolean;
            fuelProvided: boolean;
        };
        id: string;
        listingName: string;
        location: string;
        address: string;
        vehicleType: string;
        make: string;
        model: string;
        yearOfRelease: string;
        hasTracker: boolean;
        hasInsurance: boolean;
        licensePlateNumber: string;
        vehicleColor: string;
        stateOfRegistration: string;
        vehicleDescription: string;
        numberOfSeats: number;
        status: string;
        vehicleStatus: string;
        userId: string;
        vehicleCurrency: string;
        isActive: boolean;
        areYouVehicleOwner: boolean;
        isReserved: boolean;
        reservationExpiresAt: string;
        unavailableFrom: null | string;
        unavailableUntil: null | string;
        features: string[];
        outskirtsLocation: string[];
        outskirtsPrice: null | number;
        createdAt: string;
        updatedAt: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            dob: null | string;
            profileImage: null | string;
            countryCode: string;
            country: string;
            emailConfirmed: boolean;
            phoneNumber: string;
            isActive: boolean;
            phoneVerified: boolean;
            bvnVerified: boolean;
            withdrawalAccountVerified: boolean;
            bio: null | string;
            city: null | string;
            cities: string[];
            userRole: string;
            isBusiness: boolean;
            businessLogo: null | string;
            businessName: null | string;
            businessAddress: null | string;
            businessPhoneNumber: null | string;
            businessEmail: null | string;
            createdAt: string;
            updatedAt: string;
            referralCode: string;
            referredBy: null | string;
            referralBalance: number;
            onBoardedBy: string;
            mouDocument: null | string;
            lastLogin: null | string; // ISO date string
            isDeleted: boolean;
            blockedReason: string;
            teamId: null | string;
        };
        VehicleImage: {
            id: string;
            frontView: string;
            backView: string;
            sideView1: string;
            sideView2: string;
            interior: string;
            other: string;
            vehicleId: string;
            createdAt: string;
            updatedAt: string;
        };
    };
    travelCompanions: any[];
}
const formatDate = (isoString: string) => {
    const date = new Date(isoString);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    // Get hours & minutes in local time
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format

    // Ordinal suffix (1st, 2nd, 3rd, etc.)
    const getOrdinal = (n: number) => {
        if (n > 3 && n < 21) return 'th';
        switch (n % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return `${day}${getOrdinal(day)} ${month} ${year} | ${hours}:${minutes}${ampm}`;
}



const Carousel: FC<{ vehicleImages: string[] }> = ({ vehicleImages }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % vehicleImages.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + vehicleImages.length) % vehicleImages.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return <>
        {
            vehicleImages.length > 0 ? (
                <>
                    <div className="relative mb-4 flex justify-center items-center overflow-hidden rounded-2xl" style={{ height: '400px' }}>
                        <Image
                            src={vehicleImages[currentIndex]}
                            alt={`Vehicle image ${currentIndex + 1}`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-2xl"
                            unoptimized={true}
                        />

                        <button
                            onClick={goToPrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300 z-10"
                            aria-label="Previous image"
                        >
                            <ChevronLeftIcon className="h-6 w-6" />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300 z-10"
                            aria-label="Next image"
                        >
                            <ChevronRightIcon className="h-6 w-6" />
                        </button>

                        <div className="absolute bottom-4 left-4 bg-white text-black text-sm px-5 py-2 rounded-full select-none">
                            {currentIndex + 1} / {vehicleImages.length}
                        </div>
                    </div>

                    <div className="flex justify-center items-center space-x-1  py-2 scrollbar-hide">
                        {vehicleImages.map((image, index) => (
                            <div
                                key={index}
                                className={`flex-shrink-0 cursor-pointer border-3 rounded-lg overflow-hidden transition-all duration-300
                                                        ${index === currentIndex ? 'border-blue-600 ring-2 ring-blue-500' : 'border-gray-300 opacity-70 hover:opacity-100 hover:border-blue-400'}
                                                    `}
                                onClick={() => goToSlide(index)}
                            >
                                <Image
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    width={100}
                                    height={50}
                                    objectFit="cover"
                                    className="rounded-md"
                                    unoptimized={true}
                                />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="relative mb-4 flex justify-center items-center overflow-hidden rounded-2xl bg-gray-200" style={{ height: '400px' }}>
                    <div className="text-gray-500">Loading images...</div>
                </div>
            )}
    </>
}

export default function ExternalBookingLinkPage() {

    const [booking, setBooking] = useState<Booking>();
    const params = useSearchParams();
    const http = useHttp()
    const router = useRouter()
    const [startDate, setStartDate] = useState<string>("")
    const [endDate, setEndDate] = useState<string>("")
    const [vehicleImages, setVehicleImages] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const fetchBookingDetails = async () => {
        setLoading(true)
        const bookingId = params.get("booking_id")
        try {
            const bookingDetails = await http.get<Booking>(`/bookings/getSingle/${bookingId}`)
            const images = [
                bookingDetails.vehicle.VehicleImage.frontView,
                bookingDetails.vehicle.VehicleImage.backView,
                bookingDetails.vehicle.VehicleImage.interior,
                bookingDetails.vehicle.VehicleImage.sideView1,
                bookingDetails.vehicle.VehicleImage.sideView2,
            ]
            setBooking(bookingDetails)
            setStartDate(formatDate(bookingDetails.startDate))
            setEndDate(formatDate(bookingDetails.endDate))
            setVehicleImages(images)

        } catch (error) {
            console.log(error)
        }
        setLoading(false)

    }

    useEffect(() => {
        fetchBookingDetails()
    }, [])

    if (loading || !booking) {
        return <FullPageSpinner />
    }

    return (

        <>


            <div className="max-w-lg mx-auto px-4  bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Header */}
                <div className="bg-white  py-4  mt-4  border-b shadow-sm">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">M</span>
                            </div>
                            <span className="text-xl font-semibold text-gray-800">muvment</span>
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{booking?.guestName}</h1>
                        <p className="text-gray-600 text-sm sm:text-base">Booking ID: {booking?.id}</p>
                    </div>
                </div>

                <div className=" py-4 ">
                    <h2 className="text-lg font-semibold">Duration</h2>
                    <div className=" flex flex-col mt-4 gap-4 shadow-sm">
                        {/* <div>
                            <span className="text-sm bg-black text-white py-1 px-7  rounded-full">
                                {booking?.duration}
                            </span>
                        </div> */}
                        <div className="rounded-lg">
                            <div className="text-xs font-bold mb-1">Start</div>
                            <div className="text-sm text-[#667185]">{startDate}</div>
                        </div>
                        <div className=" rounded-lg">
                            <div className="text-xs  font-bold mb-1">Stop</div>
                            <div className="text-sm text-[#667185]">{endDate}</div>
                        </div>
                    </div>

                </div>

                <div className=" py-4 ">
                    <h2 className="text-lg font-semibold">Itinerary</h2>
                    <div className=" flex flex-col mt-4 gap-4 shadow-sm">
                        <div className=" rounded-lg">
                            <div className="text-xs  font-bold mb-1">Pick-Up</div>
                            <div className="text-sm text-[#667185]">{booking?.pickupLocation}</div>
                        </div>
                        <div className="rounded-lg">
                            <div className="text-xs font-bold mb-1">Drop-Off</div>
                            <div className="text-sm text-[#667185] ">{booking?.dropoffLocation}</div>
                        </div>
                        <div className="rounded-lg">
                            <div className="text-xs font-bold mb-1">Area of Use</div>
                            <div className="text-sm text-[#667185]">{booking?.areaOfUse}</div>
                        </div>
                        <div className=" rounded-lg">
                            <div className="text-xs  font-bold mb-1">OutSkirt Locations</div>
                            <div>{booking?.outskirtsLocation.map((location, index) => {
                                return <span className="text-sm text-[#667185]" key={index}>{location + " "}</span>
                            })}
                            </div>
                        </div>
                    </div>

                </div>

                <div className=" py-4 ">
                    <h2 className="text-lg font-semibold">Vehicle - {booking?.vehicle.listingName} </h2>

                    {vehicleImages.length > 0 ? (
                        <>
                            <Carousel vehicleImages={vehicleImages} />
                        </>
                    ) : (
                        <div className="relative mb-4 flex justify-center items-center overflow-hidden rounded-2xl bg-gray-200" style={{ height: '400px' }}>
                            <div className="text-gray-500">Loading images...</div>
                        </div>
                    )}

                    <div className=" flex flex-col mt-4 gap-4 shadow-sm">
                        <div className=" rounded-lg">
                            <div className="text-xs  font-bold mb-1">Color</div>
                            <div className="text-sm text-[#667185]">{booking?.vehicle.vehicleColor}</div>
                        </div>
                        <div className=" rounded-lg">
                            <div className="text-xs  font-bold mb-1">Number of Seats</div>
                            <div className="text-sm text-[#667185]">{booking?.vehicle.numberOfSeats}</div>
                        </div>
                        <div className="rounded-lg">
                            <div className="text-xs font-bold mb-1">Features</div>
                            <div className="flex flex-row gap-x-2">
                                {
                                    booking?.vehicle.features.map((feature, index) => {
                                        return <span key={index} className="text-sm text-[#667185] ">{feature}</span>
                                    })
                                }
                            </div>
                        </div>

                    </div>

                </div>

                {
                    booking?.extraDetails.length !== 0 || booking?.purposeOfRide.length !== 0 && <div className=" py-4 ">
                        <h2 className="text-lg font-semibold">Extras</h2>
                        <div className=" flex flex-col mt-4 gap-4 shadow-sm">
                            {
                                booking.extraDetails && <div className=" rounded-lg">
                                    <div className="text-xs  font-bold mb-1">Extra Details</div>
                                    <div className="text-sm text-[#667185]">{booking.extraDetails}</div>
                                </div>
                            }

                            {
                                booking.purposeOfRide && <div className="rounded-lg">
                                    <div className="text-xs font-bold mb-1">Trip Purpose</div>
                                    <div className="text-sm text-[#6671s85] ">{booking.purposeOfRide}</div>
                                </div>
                            }



                        </div>

                    </div>
                }



                <div className=" py-4 ">
                    <h2 className="text-lg font-semibold">Prices</h2>
                    <div className=" flex flex-row mt-4 gap-4 shadow-sm">
                        <div className=" rounded-lg">
                            <div className="text-xs  font-medium mb-1">Daily Rate</div>
                            <div className="text-sm text-[#667185] ">₦{booking?.vehicle.pricing.dailyRate.value}</div>
                        </div>
                        <div className="rounded-lg">
                            <div className="text-xs font-medium mb-1">Extra Hours</div>
                            <div className="text-sm text-[#667185]">₦{booking?.vehicle.pricing.extraHoursFee}</div>
                        </div>
                    </div>
                    <div className=" rounded-lg">
                        <div className="text-xs mt-3  font-medium mb-1">Total</div>
                        <div className="text-sm text-[#667185]">₦{booking?.amount}</div>
                    </div>
                </div>

                <button
                    onClick={() => router.push(booking?.paymentLink || '')}
                    className='w-full bg-black mb-4 py-4 text-sm rounded-full text-white'>
                    Make Payment
                </button>


            </div >



        </>

    );
}