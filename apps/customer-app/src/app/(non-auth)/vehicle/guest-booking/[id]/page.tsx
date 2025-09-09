"use client";

import React, { useState, useEffect } from "react";
import {
  Copy,
  Share2,
  Calendar,
  MapPin,
  User,
  Car,
  CreditCard,
  Clock,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { MultipleBookingInformation } from "@/utils/types";
import { toTitleCase } from "@/utils/functions";


const BookingPage: React.FC = () => {
  const pathname = usePathname();
  const [booking, setBooking] = useState<MultipleBookingInformation[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const bookingId = pathname.split("/").pop() || "";
  const muvmentUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://api.muvment.com";

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(
          `${muvmentUrl}/api/bookings/group/${bookingId}`
        );
        if (!response.ok) {
          // throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBooking(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch booking"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, muvmentUrl]);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(`${type} copied to clipboard!`);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const shareBooking = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Booking Details",
          text: `Check out this booking: ${booking && booking[0].vehicle.listingName}`,
          url: url,
        });
      } catch (err) {
        console.error("Error sharing: ", err);
      }
    } else {
      copyToClipboard(url, "Link");
    }
  };

  const formatCurrency = (amount: number, currency: string = "NGN") => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "text-success-600 bg-success-100";
      case "pending":
        return "text-warning-600 bg-warning-100";
      case "cancelled":
        return "text-danger-600 bg-danger-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-black mb-2">
            Error Loading Booking
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-black">
            Booking not found
          </h2>
        </div>
      </div>
    );
  }


  return (

    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="bg-primary-600 text-white py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Booking Details</h1>
              <p className="text-primary-100">ID: {bookingId}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => copyToClipboard(bookingId, "Booking ID")}
                className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-400 px-4 py-2 rounded-lg transition-colors"
              >
                <Copy className="h-4 w-4" />
                <span>Copy ID</span>
              </button>
              <button
                onClick={shareBooking}
                className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-400 px-4 py-2 rounded-lg transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {copySuccess && (
        <div className="max-w-4xl mx-auto px-4 py-2">
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>{copySuccess}</span>
          </div>
        </div>
      )}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Status */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Booking Status</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Booking Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking[0].bookingStatus)}`}
                  >
                    {booking[0].bookingStatus}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking[0].paymentStatus)}`}
                  >
                    {booking[0].paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Trip Details
              </h2>

              {
                booking.map((bookingTrip) => {
                  return <div key={bookingTrip.id}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Start Date</p>
                        <p className="font-medium">{formatDate(bookingTrip.startDate)}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-medium">{bookingTrip.duration} hours</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Booking Type</p>
                        <p className="font-medium">
                          {toTitleCase(bookingTrip.bookingType.replaceAll("_", " ").toLowerCase())}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Pickup Location</p>
                        <p className="font-medium">{bookingTrip.pickupLocation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Dropoff Location</p>
                        <p className="font-medium">{bookingTrip.dropoffLocation}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">Area of Use</p>
                        <p className="font-medium">{toTitleCase(bookingTrip.areaOfUse.replaceAll("_", " "))}</p>
                      </div>
                      {bookingTrip.outskirtsLocation.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-600">Outskirts Locations</p>
                          <p className="font-medium">
                            {bookingTrip.outskirtsLocation.join(", ")}
                          </p>
                        </div>
                      )}

                      {bookingTrip.extremeAreasLocation.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-600">Extreme Locations</p>
                          <p className="font-medium">
                            {bookingTrip.outskirtsLocation.join(", ")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                })
              }
            </div>

            {/* Guest Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Guest Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Guest Name</p>
                  <p className="font-medium">{booking[0].guestName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Booking for Self</p>
                  <p className="font-medium">
                    {booking[0].isForSelf ? "Yes" : "No"}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div>
                    <p className="text-sm text-gray-600 space-x-2">Email</p>
                    <p className="font-medium ">{booking[0].guestEmail}</p>
                  </div>
                </div>
                <br />
                <div className="flex items-center space-x-2">
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{booking[0].guestPhoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Car className="h-5 w-5 mr-2" />
                Vehicle Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Vehicle</p>
                  <p className="font-medium">{booking[0].vehicle.listingName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Make & Model</p>
                  <p className="font-medium">
                    {booking[0].vehicle.make} {booking[0].vehicle.model}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Year</p>
                  <p className="font-medium">{booking[0].vehicle.yearOfRelease}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Color</p>
                  <p className="font-medium">{booking[0].vehicle.vehicleColor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">License Plate</p>
                  <p className="font-medium">
                    {booking[0].vehicle.licensePlateNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Seats</p>
                  <p className="font-medium">{booking[0].vehicle.numberOfSeats}</p>
                </div>
              </div>
              {booking[0].vehicle.features.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Features</p>
                  <div className="flex flex-wrap gap-2">
                    {booking[0].vehicle.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>



            {/* Host Information */}
            {/* <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Host Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Host Name</p>
                  <p className="font-medium">
                    {"booking.vehicle.user.firstName"}{" "}
                    {"booking.vehicle.user.lastName"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">City</p>
                  <p className="font-medium">{"booking.vehicle.user.city"}</p>
                </div>
                {/* {booking.vehicle.user.businessName && (
                  <div>
                    <p className="text-sm text-gray-600">Business</p>
                    <p className="font-medium">
                      {"booking.vehicle.user.businessName"}
                    </p>
                  </div>
                )} 
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">
                      {"booking.vehicle.user.phoneNumber"}
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vehicle Image */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Vehicle Photos</h3>
              <div className="space-y-4">
                <Image
                  src={booking[0].vehicle.VehicleImage.frontView}
                  alt="Vehicle front view"
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Image
                    src={booking[0].vehicle.VehicleImage.sideView1}
                    alt="Side view"
                    width={250}
                    height={150}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <Image
                    src={booking[0].vehicle.VehicleImage.interior}
                    alt="Interior"
                    width={250}
                    height={150}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(booking[0].amount, booking[0].currencyCode)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-medium">
                    {booking[0].paymentMethod.replace("_", " ")}
                  </p>
                </div>
                {/* <div>
                  <p className="text-sm text-gray-600">Daily Rate</p>
                  <p className="font-medium">
                    {formatCurrency(
                      // booking.vehicle.pricing.dailyRate.value,
                      10000,
                      booking[0].currencyCode || "NGN"
                    )}
                  </p>
                </div> */}
                {booking[0].paymentStatus === "PENDING" && booking[0].paymentLink && (
                  <a
                    href={booking[0].paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-primary-600 text-white text-center py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Complete Payment
                  </a>
                )}
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>




  );
};

export default BookingPage;
