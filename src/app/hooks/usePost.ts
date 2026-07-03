import { useState } from "react";
import { toast } from "sonner";

const usePost = (mutation: any) => {
  const [triggerMutation, { isLoading, isError }] = mutation();

  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePost = async (
    data: any,
    options: { showSuccessToast?: boolean } = {}
  ) => {
    const { showSuccessToast = true } = options;

    try {
      const response = await triggerMutation(data).unwrap();

      if (showSuccessToast) {
        setIsSuccess(true);
        toast.success(response?.message || "Successful");
      }

      return { success: true, data: response };
    } catch (err: any) {
      const validationErrs = err?.data?.data?.map(
        (err: any) => err?.message
      );

      const message =
        validationErrs?.join(", ") || err?.data?.message ||
        "Something went wrong, check your internet and try again.";

      setIsSuccess(false);
      setError(message);
      toast.error(message);

      return { success: false, data: null, error: message };
    }
  };

  return {
    handlePost,
    isLoading,
    isError,
    isSuccess,
    error
  };
};

export default usePost;
