import { useAppSelector } from "@/app/redux/hooks";

const useCurrentUser = () => {
  const userInfo = useAppSelector((state) => state.app.userInfo);
  return { user: userInfo, isLoggedIn: Boolean(userInfo) };
};

export default useCurrentUser;
