import { useState } from "react";
import useCurrentUser from "@/app/hooks/useCurrentUser";

const useAuthGuard = (message?: string) => {
  const { isLoggedIn } = useCurrentUser();
  const [promptOpen, setPromptOpen] = useState(false);

  const guard = (action: () => void) => {
    if (!isLoggedIn) {
      setPromptOpen(true);
      return;
    }
    action();
  };

  return {
    isLoggedIn,
    guard,
    promptOpen,
    closePrompt: () => setPromptOpen(false),
    promptMessage: message,
  };
};

export default useAuthGuard;
