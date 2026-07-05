import { useRouter } from "next/navigation";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";
import LockIcon from "@/app/assets/svgs/home/LockIcon";

interface LoginRequiredModalProps {
  onClose: () => void;
  message?: string;
}

const LoginRequiredModal = ({ onClose, message }: LoginRequiredModalProps) => {
  const router = useRouter();

  return (
    <Modal onClose={onClose} className="text-center">
      <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
        <LockIcon />
      </div>

      <h2 className="text-text-primary text-lg font-semibold mb-1.5">
        Sign in to continue
      </h2>
      <p className="text-text-secondary text-sm mb-6">
        {message || "You need an account to do that. Log in or sign up to continue."}
      </p>

      <div className="flex flex-col gap-2.5">
        <Button fullWidth onClick={() => router.push("/login")}>
          Log In
        </Button>
        <Button fullWidth variant="secondary" onClick={() => router.push("/onboarding")}>
          Create an account
        </Button>
      </div>
    </Modal>
  );
};

export default LoginRequiredModal;
