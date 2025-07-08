import { useState } from "react";
import Button from "@repo/ui/button";
import Link from "next/link";

// Report reasons options
const REPORT_REASONS = [
  "Misleading Information",
  "Fraudulent Listing",
  "Unauthorized Use of Photos",
  "Safety Concerns",
  "Duplicate Listings",
  "Outdated Information",
  "Suspicious Pricing",
  "Violation of Terms",
  "Harassment or Abuse",
  "Intellectual Property Infringement",
  "Poor Quality Photos",
  "Inaccurate Location",
];

interface ReportModalProps {
  hostId: string;
  onSubmit: (message: string, hostId: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ReportModal = ({
  hostId,
  onSubmit,
  onCancel,
  isLoading = false,
}: ReportModalProps) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [description, setDescription] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleReasonSelect = (reason: string) => {
    if (reason === "Other") {
      setShowCustomInput(true);
      setSelectedReason("");
    } else {
      setSelectedReason(reason);
      setShowCustomInput(false);
      setCustomReason("");
    }
  };

  const handleSubmit = () => {
    const finalReason = showCustomInput ? customReason : selectedReason;
    const finalMessage = description.trim()
      ? `${finalReason}: ${description.trim()}`
      : finalReason;

    onSubmit(finalMessage, hostId);
  };

  const isFormValid = () => {
    if (showCustomInput) {
      return customReason.trim().length > 0;
    }
    return selectedReason.length > 0;
  };

  return (
    <div className="space-y-6 py-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-orange-500"
          >
            <path
              d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Report Listing
          </h2>
          <p className="text-sm text-gray-600">
            What is your reason for reporting this vehicle?
          </p>
        </div>
      </div>

      {/* Reason Selection */}
      <div className="space-y-3">
        {!showCustomInput ? (
          <div className="space-y-2">
            {REPORT_REASONS.map((reason) => (
              <button
                key={reason}
                onClick={() => handleReasonSelect(reason)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedReason === reason
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-700"
                }`}
              >
                {reason}
              </button>
            ))}
            <button
              onClick={() => handleReasonSelect("Other")}
              className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 text-gray-700"
            >
              Other (please specify)
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Please specify your reason
              </label>
              <input
                type="text"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Enter your reason"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                autoFocus
              />
            </div>
            <button
              onClick={() => {
                setShowCustomInput(false);
                setCustomReason("");
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              ← Back to predefined reasons
            </button>
          </div>
        )}
      </div>

      {/* Description (Optional) */}
      {(selectedReason || customReason) && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description (optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please give us more details, it'll help us take proper action."
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          variant="outlined"
          onClick={onCancel}
          fullWidth
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={handleSubmit}
          fullWidth
          disabled={!isFormValid() || isLoading}
          loading={isLoading}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

interface LoginRequiredModalProps {
  onClose: () => void;
}

export const LoginRequiredModal = ({ onClose }: LoginRequiredModalProps) => {
  return (
    <div className="space-y-6 py-4 max-w-sm mx-auto text-center">
      {/* Header */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-600"
          >
            <path
              d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5C14.8 6.2 13.9 5.2 12.7 4.8C12.5 4.7 12.3 4.6 12 4.6C11.7 4.6 11.5 4.7 11.3 4.8C10.1 5.2 9.2 6.2 9 7.5L3 7V9L9 8.5V10.5C9 11.3 9.7 12 10.5 12H13.5C14.3 12 15 11.3 15 10.5V8.5L21 9ZM6 20H18V18H6V20Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Login Required
          </h2>
          <p className="text-gray-600">
            You need to be logged in to report a listing. Please sign in to
            continue.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Link href="/login" className="block">
          <Button color="primary" fullWidth>
            Sign In
          </Button>
        </Link>
        <Button variant="outlined" onClick={onClose} fullWidth>
          Cancel
        </Button>
      </div>
    </div>
  );
};
