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

interface Booking {
  id: string;
  startDate: string;
  endDate: string;
  duration: number;
  bookingType: string;
  amount: number;
  paymentStatus: string;
  paymentMethod: string;
  bookingStatus: string;
  isForSelf: boolean;
  guestName: string;
  guestEmail: string;
  guestPhoneNumber: string;
  pickupLocation: string;
  dropoffLocation: string;
  paymentLink: string;
  outskirtsLocation: string[];
  areaOfUse: string;
  currencyCode: string;
  createdAt: string;
  vehicle: {
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
    vehicleDescription: string;
    numberOfSeats: number;
    features: string[];
    pricing: {
      dailyRate: {
        value: number;
        currency: string | null;
        unit: string;
      };
      extraHoursFee: number;
      airportPickupFee: number;
      discounts: Array<{
        durationInDays: number;
        percentage: number;
      }>;
    };
    tripSettings: {
      advanceNotice: string;
      maxTripDuration: string;
      provideDriver: boolean;
      fuelProvided: boolean;
    };
    user: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      businessName?: string;
      businessAddress?: string;
      city: string;
    };
    VehicleImage: {
      frontView: string;
      backView: string;
      sideView1: string;
      sideView2: string;
      interior: string;
      other: string;
    };
  };
}

const BookingPage: React.FC = () => {
  const pathname = usePathname();
  const [booking, setBooking] = useState<Booking | null>(null);
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
          `${muvmentUrl}/api/bookings/getSingle/${bookingId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
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
          text: `Check out this booking: ${booking?.vehicle.listingName}`,
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
              <p className="text-primary-100">ID: {booking.id}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => copyToClipboard(booking.id, "Booking ID")}
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
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.bookingStatus)}`}
                  >
                    {booking.bookingStatus}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.paymentStatus)}`}
                  >
                    {booking.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Trip Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Start Date</p>
                  <p className="font-medium">{formatDate(booking.startDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">End Date</p>
                  <p className="font-medium">{formatDate(booking.endDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium">{booking.duration} days</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Booking Type</p>
                  <p className="font-medium">
                    {booking.bookingType.replace("_", " ")}
                  </p>
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Location Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Pickup Location</p>
                  <p className="font-medium">{booking.pickupLocation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Dropoff Location</p>
                  <p className="font-medium">{booking.dropoffLocation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Area of Use</p>
                  <p className="font-medium">{booking.areaOfUse}</p>
                </div>
                {booking.outskirtsLocation.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600">Outskirts Locations</p>
                    <p className="font-medium">
                      {booking.outskirtsLocation.join(", ")}
                    </p>
                  </div>
                )}
              </div>
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
                  <p className="font-medium">{booking.guestName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Booking for Self</p>
                  <p className="font-medium">
                    {booking.isForSelf ? "Yes" : "No"}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{booking.guestEmail}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{booking.guestPhoneNumber}</p>
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
                  <p className="font-medium">{booking.vehicle.listingName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Make & Model</p>
                  <p className="font-medium">
                    {booking.vehicle.make} {booking.vehicle.model}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Year</p>
                  <p className="font-medium">{booking.vehicle.yearOfRelease}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Color</p>
                  <p className="font-medium">{booking.vehicle.vehicleColor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">License Plate</p>
                  <p className="font-medium">
                    {booking.vehicle.licensePlateNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Seats</p>
                  <p className="font-medium">{booking.vehicle.numberOfSeats}</p>
                </div>
              </div>

              {booking.vehicle.features.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Features</p>
                  <div className="flex flex-wrap gap-2">
                    {booking.vehicle.features.map((feature, index) => (
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
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Host Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Host Name</p>
                  <p className="font-medium">
                    {booking.vehicle.user.firstName}{" "}
                    {booking.vehicle.user.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">City</p>
                  <p className="font-medium">{booking.vehicle.user.city}</p>
                </div>
                {booking.vehicle.user.businessName && (
                  <div>
                    <p className="text-sm text-gray-600">Business</p>
                    <p className="font-medium">
                      {booking.vehicle.user.businessName}
                    </p>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">
                      {booking.vehicle.user.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vehicle Image */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Vehicle Photos</h3>
              <div className="space-y-4">
                <img
                  src={booking.vehicle.VehicleImage.frontView}
                  alt="Vehicle front view"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="grid grid-cols-2 gap-2">
                  <img
                    src={booking.vehicle.VehicleImage.sideView1}
                    alt="Side view"
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <img
                    src={booking.vehicle.VehicleImage.interior}
                    alt="Interior"
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
                    {formatCurrency(booking.amount, booking.currencyCode)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-medium">
                    {booking.paymentMethod.replace("_", " ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Daily Rate</p>
                  <p className="font-medium">
                    {formatCurrency(
                      booking.vehicle.pricing.dailyRate.value,
                      booking.currencyCode
                    )}
                  </p>
                </div>
                {booking.paymentStatus === "PENDING" && booking.paymentLink && (
                  <a
                    href={booking.paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-primary-600 text-white text-center py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Complete Payment
                  </a>
                )}
              </div>
            </div>

            {/* Trip Settings */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Trip Settings
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Driver Provided</p>
                  <p className="font-medium">
                    {booking.vehicle.tripSettings.provideDriver ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fuel Provided</p>
                  <p className="font-medium">
                    {booking.vehicle.tripSettings.fuelProvided ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Advance Notice</p>
                  <p className="font-medium">
                    {booking.vehicle.tripSettings.advanceNotice}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Max Trip Duration</p>
                  <p className="font-medium">
                    {booking.vehicle.tripSettings.maxTripDuration}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
