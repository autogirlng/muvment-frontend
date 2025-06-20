import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

interface ReportPayload {
  message: string;
  hostId: string;
}

interface UseReportHostProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

const useReportHost = ({ onSuccess, onError }: UseReportHostProps = {}) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const isUserLoggedIn = () => {
    const token = localStorage.getItem("user_token");
    return !!token;
  };

  const getAuthToken = () => {
    return localStorage.getItem("user_token");
  };

  const submitReport = useMutation({
    mutationFn: async (payload: ReportPayload) => {
      const token = getAuthToken();

      if (!token) {
        throw new Error("Authentication required");
      }

      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

      const response = await fetch(`${baseUrl}/report-trip/host`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return response.json();
    },
    onSuccess: (data) => {
      setIsReportModalOpen(false);
      onSuccess?.();
      console.log("Report submitted successfully:", data);
    },
    onError: (error) => {
      onError?.(error);
      console.error("Error submitting report:", error);
    },
  });

  const handleReportClick = () => {
    if (!isUserLoggedIn()) {
      setIsLoginModalOpen(true);
      return;
    }
    setIsReportModalOpen(true);
  };

  const handleSubmitReport = (message: string, hostId: string) => {
    if (!message.trim()) {
      return;
    }

    submitReport.mutate({
      message: message.trim(),
      hostId,
    });
  };

  const closeReportModal = () => setIsReportModalOpen(false);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return {
    isReportModalOpen,
    isLoginModalOpen,
    isUserLoggedIn: isUserLoggedIn(),

    isSubmittingReport: submitReport.isPending,

    reportError: submitReport.error,

    handleReportClick,
    handleSubmitReport,
    closeReportModal,
    closeLoginModal,

    setIsReportModalOpen,
    setIsLoginModalOpen,
  };
};

export default useReportHost;
