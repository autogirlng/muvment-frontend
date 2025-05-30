import { useState, useRef, useEffect } from "react";
import Icons from "@repo/ui/icons";

type Props = {
  name: string;
  value: Date | null;
  onChange: (date: Date) => void;
  className?: string;
  width?: string;
  showArrow?: boolean;
};

// Generate time options in 30-minute intervals
const generateTimeOptions = () => {
  const times = [];

  // Add midnight first
  times.push({ label: "Midnight", value: "00:00" });

  // Generate times from 12:30 AM to 11:30 PM
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 30; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      let displayHour = hour;
      const ampm = hour >= 12 ? "PM" : "AM";

      if (displayHour === 0) {
        displayHour = 12;
      } else if (displayHour > 12) {
        displayHour = displayHour - 12;
      }

      const displayMinute = minute.toString().padStart(2, "0");
      const label = `${displayHour.toString().padStart(2, "0")}:${displayMinute}${ampm}`;

      times.push({ label, value: timeString });
    }

    // Add the next hour (on the hour)
    if (hour < 23) {
      const nextHour = hour + 1;
      const timeString = `${nextHour.toString().padStart(2, "0")}:00`;
      let displayHour = nextHour;
      const ampm = nextHour >= 12 ? "PM" : "AM";

      if (displayHour === 0) {
        displayHour = 12;
      } else if (displayHour > 12) {
        displayHour = displayHour - 12;
      }

      const label = `${displayHour.toString().padStart(2, "0")}:00${ampm}`;

      times.push({ label, value: timeString });
    }
  }

  return times;
};

const timeOptions = generateTimeOptions();

function TimePicker({
  name,
  value,
  onChange,
  className = "",
  width = "",
  showArrow = true,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Set initial selected time from value prop
  useEffect(() => {
    if (value) {
      const hours = value.getHours().toString().padStart(2, "0");
      const minutes = value.getMinutes().toString().padStart(2, "0");
      setSelectedTime(`${hours}:${minutes}`);
    }
  }, [value]);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTimeSelect = (timeValue: string) => {
    const [hours, minutes] = timeValue.split(":").map(Number);
    const newDate = new Date();
    newDate.setHours(hours, minutes, 0, 0);

    setSelectedTime(timeValue);
    onChange(newDate);
    setIsOpen(false);
  };

  const getDisplayTime = () => {
    if (!selectedTime) {
      // Default to current time
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";

      if (hours === 0) {
        hours = 12;
      } else if (hours > 12) {
        hours = hours - 12;
      }

      return `${hours}:${minutes.toString().padStart(2, "0")}${ampm}`;
    }

    const [hour, minute] = selectedTime.split(":").map(Number);
    if (hour === 0 && minute === 0) {
      return "Midnight";
    }

    let displayHour = hour;
    const ampm = hour >= 12 ? "PM" : "AM";

    if (displayHour === 0) {
      displayHour = 12;
    } else if (displayHour > 12) {
      displayHour = displayHour - 12;
    }

    return `${displayHour}:${minute.toString().padStart(2, "0")}${ampm}`;
  };

  return (
    <div className={`relative ${width} ${className}`}>
      {/* Time Picker Trigger */}
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 cursor-pointer hover:text-grey-700 transition-colors"
      >
        <span
          className={`text-xs xl:text-sm transition-colors ${
            selectedTime ? "text-grey-800" : "text-grey-400"
          }`}
        >
          {getDisplayTime()}
        </span>
        {showArrow && (
          <div
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          >
            {Icons.ic_chevron_down}
          </div>
        )}
      </div>

      {/* Time Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 mt-2 w-[120px] bg-white border border-grey-200 rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] z-50 max-h-[300px] overflow-hidden"
        >
          <div className="py-2 overflow-y-auto max-h-[280px] custom-scrollbar">
            {timeOptions.map((time, index) => (
              <div
                key={index}
                onClick={() => handleTimeSelect(time.value)}
                className={`px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 ease-in-out hover:bg-grey-50 ${
                  selectedTime === time.value
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-grey-700"
                }`}
              >
                {time.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
}

export default TimePicker;
