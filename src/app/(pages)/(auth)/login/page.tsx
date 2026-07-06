"use client";

import SignIn from "@/app/components/auth/SignIn";
import AuthShell from "@/app/components/layout/AuthShell";

const LoginPage = () => {
  return (
    <AuthShell>
      <div className="w-full flex flex-col justify-between relative select-none">
        <SignIn />
      </div>
    </AuthShell>
  );
};

export default LoginPage;
