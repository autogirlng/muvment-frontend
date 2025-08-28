
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
      const [trips, setTrips] = useState<Trips[]>([])
      const outskirtTrips = useRef<string[]>([])
      const extremeTrips = useRef<string[]>([])

const [openTripIds, setOpenTripIds] = useState<Set<string>>(new Set());
      const [isTripFormsComplete, setIsTripFormComplete] = useState<boolean>(false)

  const toggleOpen = (id: string) => {
    setOpenTripIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    })
  }

    
      const http = useHttp()
      const addTrip = (id: string) => {
        setTrips(prev => [...prev, { id }])
        setIsTripFormComplete(false)
         setOpenTripIds(new Set([id]));
    
      }
    
      const deleteTrip = async (idToDelete: string) => {
        const trips: TripDetails[] = JSON.parse(sessionStorage.getItem("trips") || '[]');
        const updatedTrips = trips.filter((trip) => trip.id !== idToDelete);

        sessionStorage.setItem("trips", JSON.stringify(updatedTrips));
        
        setTrips(prev => prev.filter((trip) => trip.id !== idToDelete));
        setOpenTripIds(prev => {
          const updated = new Set(prev);
          updated.delete(idToDelete)
          return updated
        })
        const bookingTypes: string[] = [];
        let outskirtsAreaOfUse:string[] = [];
        let extremeAreas:string[] = [];

        updatedTrips.forEach((trip) => {
          trip.bookingType && bookingTypes.push(trip.bookingType)
          const area = trip.areaOfUse?.split("_")

          if(area && area[area?.length - 1] === "OUTSKIRT"){
              outskirtsAreaOfUse.push(area.join("_"))
          }
          if(area && area[area?.length - 1] === "AREA" && area && area[area?.length - 2] === "EXTREME"){
           extremeAreas.push(area.join("_"))
          }
        })
        const bookingPrice = await http.post<BookingSummaryPricing>("/api/bookings/calculate-price",
          {
            vehicleId: vehicle?.id,
            bookingTypes,
            isExtension: false,
            isOutskirt: outskirtsAreaOfUse.length > 0, 
            numberOfOutskirts: outskirtsAreaOfUse.length, 
            isExtremeArea: extremeAreas.length > 0,
            numberOfExtremeAreas: extremeAreas.length

          }
        );
        bookingPrice && setBookingPriceBreakdown(bookingPrice)
    
      }
    
   const onChangeTrip = async (id: string, details: TripDetails) => {
  //  Create a new updated trips array
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

  //  Update the trips state
  setTrips(updatedTrips);

  const areaOfUseBreakdown = details.areaOfUse?.split("_");
  const isOutskirt = areaOfUseBreakdown && areaOfUseBreakdown[areaOfUseBreakdown.length - 1] === "OUTSKIRT";
  const isExtreme = areaOfUseBreakdown && 
  areaOfUseBreakdown[areaOfUseBreakdown.length - 2] === "EXTREME" 
  && areaOfUseBreakdown[areaOfUseBreakdown.length - 1] === "AREA";


  //  Update the outskirtTrips ref based on the specific trip change
  if (isOutskirt) {
    if (!outskirtTrips.current.includes(id)) {
      outskirtTrips.current = [...outskirtTrips.current, id];
    }
  } else {
    outskirtTrips.current = outskirtTrips.current.filter((tripID) => tripID !== id);
  }
  if(isExtreme){
    if (!extremeTrips.current.includes(id)) {
    extremeTrips.current = [...extremeTrips.current, id];
    }
  } else {
    extremeTrips.current = extremeTrips.current.filter((tripID) => tripID !== id);

  }


  //  Check conditions to proceed with price calculation
  if (
    (details.bookingType && details.bookingType.length > 0) ||
    (areaOfUseBreakdown && areaOfUseBreakdown.length >= 1)
  ) {
    //  Recalculate booking types from the new state
    const bookingTypes: string[] = [];
    updatedTrips.forEach((trip) => {
      if (trip.tripDetails?.bookingType) {
        bookingTypes.push(trip.tripDetails.bookingType);
      }
    });

    //  Make API call
    try {
      const bookingPrice = await http.post<BookingSummaryPricing>("/api/bookings/calculate-price", {
        vehicleId: vehicle?.id,
        bookingTypes,
        isExtension: false,
        isOutskirt: outskirtTrips.current.length > 0,
        numberOfOutskirts: outskirtTrips.current.length,
        isExtremeArea: extremeTrips.current.length > 0,
        numberOfExtremeAreas: extremeTrips.current.length
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

      return {setTrips, trips, deleteTrip, openTripIds, toggleOpen, onChangeTrip, addTrip, bookingPriceBreakdown, isTripFormsComplete}
} 