
import { 
  BookingSummaryPricing,
  TripDetails,
  Trips, 
  VehicleInformation
} from "@/utils/types";
import  {  useState, useEffect } from "react";
import { useHttp } from "@/hooks/useHttp";


export const useItineraryForm = (vehicle:VehicleInformation | null) => {
      const [bookingPriceBreakdown, setBookingPriceBreakdown] = useState<BookingSummaryPricing | undefined>();
      const [_, setTripOutskirt] = useState<boolean>(false)
      const [trips, setTrips] = useState<Trips[]>([])
    
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
        const updatedDays = trips.map(trip => {
          if (trip.id === id) {
            const currentTripDetails = trip.tripDetails || {};
            return {
              ...trip,
              tripDetails: { ...currentTripDetails, ...details }
            };
          }
          return trip;
        });
        setTrips(updatedDays);
        if (details.bookingType && details.bookingType.length > 0) {
          const bookingTypes: string[] = [];
          let isOutskirt = false;
          updatedDays.map((trip) => {
            if (trip.tripDetails?.areaOfUse === "MAINLAND_OUTSKIRT") {
              isOutskirt = true;
              setTripOutskirt(true)
            };
            trip.tripDetails?.bookingType && bookingTypes.push(trip.tripDetails?.bookingType)
          })
    
          const bookingPrice = await http.post<BookingSummaryPricing>("/api/bookings/calculate-price",
            {
              vehicleId: vehicle?.id,
              bookingTypes,
              isExtension: false,
              isOutskirt
            }
          );
    
          bookingPrice && setBookingPriceBreakdown(bookingPrice)
        }
      }
    
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