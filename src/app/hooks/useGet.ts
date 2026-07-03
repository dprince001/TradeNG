import { useEffect } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

const useGet = (
  useQueryHook: (arg: any) => any,
  arg: any,
  condition = true
) => {
  const queryResult = useQueryHook(condition ? arg : skipToken); // RTK Query handles skipToken

  const { data, error, isLoading, isFetching, isError, isSuccess, refetch } = queryResult;

  useEffect(() => {
    if (isError && error) {
      const message =
        error?.data?.message || `An error occurred while fetching data`;
      toast.error(message)
    }
  }, [isError, error]);

  return {
    data: data?.data,
    paginationData: data?.pagination,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
    refetch
  };
};

export default useGet;
