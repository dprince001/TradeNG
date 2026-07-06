"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { ProfileSkeleton } from "@/app/components/Loader";
import { PageTransition } from "@/app/components/Motion";
import useGet from "@/app/hooks/useGet";
import usePost from "@/app/hooks/usePost";
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from "@/app/redux/api/profileApiSlice";

export default function EditProfilePage() {
  const router = useRouter();
  const { data: profileData, isFetching } = useGet(useGetMyProfileQuery, "");
  const { handlePost, isLoading } = usePost(useUpdateMyProfileMutation);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    const user = profileData?.user;
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setPhoneNumber(user.phone_number || "");
      setAddress(user.address || "");
      setAbout(user.about || "");
    }
  }, [profileData]);

  const handleSaveProfile = async () => {
    const response = await handlePost({
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      address,
      about,
    });
    if (response?.success !== false) {
      router.push("/profile");
    }
  };

  if (isFetching) {
    return (
      <div className="flex-1 px-5 pt-6 pb-24">
        <ProfileSkeleton />
      </div>
    );
  }

  return (
    <PageTransition className="flex-1 flex flex-col px-5 pt-6 pb-24">
      <div className="flex flex-col items-center text-center mt-2 mb-6">
        <div className="relative cursor-pointer group">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#FF4304] to-[#FF8C39] flex items-center justify-center text-white text-2xl font-extrabold shadow-md border-4 border-white group-hover:brightness-95 transition-all">
            {firstName?.[0]}
            {lastName?.[0]}
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary border-2 border-white shadow-sm flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform">
            <Pencil className="w-3.5 h-3.5" strokeWidth={2.5} />
          </div>
        </div>
        <span className="text-xs text-[#8F959E] font-semibold mt-2.5">
          Tap to change profile picture
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <Input
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
        />
        <Input
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter last name"
        />
        <Input
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
        />
        <Input
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
        />
        <Input
          label="Short Bio"
          type="textarea"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Tell buyers about yourself..."
        />
      </div>

      <div className="mt-auto pt-8">
        <Button onClick={handleSaveProfile} fullWidth variant="primary" loading={isLoading}>
          Save Changes
        </Button>
      </div>
    </PageTransition>
  );
}
