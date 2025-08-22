
import { 
  BookingSummaryPricing,
  TripDetails,
  Trips, 
  VehicleInformation
} from "@/utils/types";
import  {  useState, useEffect, useRef } from "react";
import { useHttp } from "@/hooks/useHttp";


export const useItineraryForm = (vehicle:VehicleInformation | null) => {
      const [bookingPriceBreakdown, setBookingPriceBreakdown] = useState<BookingSummaryPricing | undefined>();
      const [_, setTripOutskirt] = useState<boolean>(false)
      const [trips, setTrips] = useState<Trips[]>([])
      const outskirtTrips = useRef<string[]>([])


      const [isTripFormsComplete, setIsTripFormComplete] = useState<boolean>(false)
    
      const http = useHttp()
      const addTrip = (id: string) => {
        setTrips(prev => [...prev, { id }])
        setIsTripFormComplete(false)
    
      }
    
      const deleteTrip = async (idToDelete: string) => {
        const trips: TripDetails[] = JSON.parse(sessionStorage.getItem("trips") || '[]');
        const updatedTrips = trips.filter((trip) => trip.id !== idToDelete);
        sessionStorage.setItem("trips", JSON.stringify(updatedTrips));
        setTrips(prev => prev.filter((trip) => trip.id !== idToDelete));
        const bookingTypes: string[] = [];
        updatedTrips.map((trip) => {
          trip.bookingType && bookingTypes.push(trip.bookingType)
        })
        const bookingPrice = await http.post<BookingSummaryPricing>("/api/bookings/calculate-price",
          {
            vehicleId: vehicle?.id,
            bookingTypes,
            isExtension: false,
            isOutskirt: false
          }
        );
        bookingPrice && setBookingPriceBreakdown(bookingPrice)
    
      }
    
   const onChangeTrip = async (id: string, details: TripDetails) => {
  // 1. Create a new updated trips array
  const updatedTrips = trips.map((trip) => {
    if (trip.id === id) {
      const currentTripDetails = trip.tripDetails || {};
      return {
        ...trip,
        tripDetails: { ...currentTripDetails, ...details },
      };
    }
    return trip;
  });

  // 2. Update the trips state
  setTrips(updatedTrips);

  const areaOfUseBreakdown = details.areaOfUse?.split("_");
  const isOutskirt = areaOfUseBreakdown && areaOfUseBreakdown[areaOfUseBreakdown.length - 1] === "OUTSKIRT";

  // 3. Update the outskirtTrips ref based on the specific trip change
  if (isOutskirt) {
    if (!outskirtTrips.current.includes(id)) {
      outskirtTrips.current = [...outskirtTrips.current, id];
    }
  } else {
    outskirtTrips.current = outskirtTrips.current.filter((tripID) => tripID !== id);
  }

  // 4. Update the outskirt state
  setTripOutskirt(outskirtTrips.current.length > 0);

  // 5. Check conditions to proceed with price calculation
  if (
    (details.bookingType && details.bookingType.length > 0) ||
    (areaOfUseBreakdown && areaOfUseBreakdown.length >= 1)
  ) {
    // 6. Recalculate booking types from the new state
    const bookingTypes: string[] = [];
    updatedTrips.forEach((trip) => {
      if (trip.tripDetails?.bookingType) {
        bookingTypes.push(trip.tripDetails.bookingType);
      }
    });

    // 7. Make API call
    try {
      const bookingPrice = await http.post<BookingSummaryPricing>("/api/bookings/calculate-price", {
        vehicleId: vehicle?.id,
        bookingTypes,
        isExtension: false,
        isOutskirt: outskirtTrips.current.length > 0,
        numberOfOutskirts: outskirtTrips.current.length,
      });
      setBookingPriceBreakdown(bookingPrice);
    } catch (error) {
      console.error("Error calculating price:", error);
    }
  }
};
    
      useEffect(() => {
        const requiredFields: (keyof TripDetails)[] = [
          'bookingType',
          'tripStartDate',
          'tripStartTime',
          'pickupLocation',
          'dropoffLocation',
          'areaOfUse'
        ];
        const missingFields: { id: string, fields: string[] }[] = [];
        for (const trip of trips) {
          const tripId = trip.id
          const details = trip.tripDetails;
    
          const fields: (keyof TripDetails)[] = []
    
          if (!details) {
            continue;
          }
    
    
          for (const field of requiredFields) {
            if (!(field in details) || !details[field]) {
              fields.push(field)
            }
          }
          if (fields.length >= 1) missingFields.push({ id: tripId, fields })
        }
        setIsTripFormComplete(missingFields.length === 0)
      }, [trips])

      return {setTrips, trips, deleteTrip, onChangeTrip, addTrip, bookingPriceBreakdown, isTripFormsComplete}
} 