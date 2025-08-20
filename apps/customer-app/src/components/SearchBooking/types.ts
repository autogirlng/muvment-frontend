export interface GooglePlace {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  types: string[];
}

export interface PlacePrediction {
  id: string;
  place_id: string;
  name: string;
  description: string;
  type: "google" | "recent" | "popular";
  icon: string;
}

export interface SearchBookingsProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  fromDateValue: Date | null;
  setFromDateValue: (value: Date | null) => void;
  fromTimeValue: Date | null;
  setFromTimeValue: (value: Date) => void;
  untilDateValue: Date | null;
  setUntilDateValue: (value: Date | null) => void;
  untilTimeValue: Date | null;
  setUntilTimeValue: (value: Date) => void;
}

export interface ColumnProps {
  title: string;
  children: React.ReactNode;
}
