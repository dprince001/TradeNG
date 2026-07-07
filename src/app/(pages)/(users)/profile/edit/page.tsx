"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Pencil, User } from "lucide-react";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { ProfileSkeleton } from "@/app/components/Loader";
import { PageTransition } from "@/app/components/Motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useGet from "@/app/hooks/useGet";
import usePost from "@/app/hooks/usePost";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { setUserInfo } from "@/app/redux/api/appSlice";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/app/redux/api/profileApiSlice";
import { useUploadImagesMutation } from "@/app/redux/api/uploadsApiSlice";

export default function EditProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user: currentUser } = useCurrentUser();
  const { data: profileData, isFetching } = useGet(useGetMyProfileQuery, "");
  const { handlePost, isLoading } = usePost(useUpdateMyProfileMutation);
  const { handlePost: uploadPhoto, isLoading: isUploadingPhoto } = usePost(
    useUploadImagesMutation,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [about, setAbout] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    const user = profileData?.user;
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setPhoneNumber(user.phone_number || "");
      setAddress(user.address || "");
      setAbout(user.about || "");
      setProfilePhoto(user.profile_photo || "");
    }
  }, [profileData]);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const formData = new FormData();
    formData.append("images", file);

    const uploadRes = await uploadPhoto(formData, { showSuccessToast: false });
    if (!uploadRes?.success) return;

    const uploadedUrl =
      uploadRes.data?.data?.images?.[0] ?? uploadRes.data?.images?.[0] ?? "";
    if (!uploadedUrl) return;

    setProfilePhoto(uploadedUrl);
    const response = await handlePost(
      { profile_photo: uploadedUrl },
      { showSuccessToast: false },
    );
    if (response?.success !== false) {
      dispatch(setUserInfo({ user: { ...currentUser?.user, profile_photo: uploadedUrl } }));
    }
  };

  const handleSaveProfile = async () => {
    const response = await handlePost({
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      address,
      about,
      profile_photo: profilePhoto,
    });
    if (response?.success !== false) {
      dispatch(
        setUserInfo({
          user: {
            ...currentUser?.user,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            address,
            about,
            profile_photo: profilePhoto,
          },
        })
      );
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

  const userId = profileData?.user?.id || "";

  return (
    <PageTransition className="flex-1 flex flex-col px-5 pt-6 pb-24 md:px-8 md:py-8 md:max-w-2xl md:mx-auto w-full">
      <div className="flex flex-col items-center text-center mt-2 mb-6">
        <div
          className="relative cursor-pointer group"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          <Avatar className="w-24 h-24 border-4 border-white shadow-md group-hover:brightness-95 transition-all">
            <AvatarImage
              src={profilePhoto}
              alt="Profile photo"
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-tr from-[#FF4304] to-[#FF8C39] text-white text-2xl font-extrabold">
              {firstName?.[0]}
              {lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary border-2 border-white shadow-sm flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform">
            <Pencil className="w-3.5 h-3.5" strokeWidth={2.5} />
          </div>
        </div>
        <span className="text-xs text-[#8F959E] font-semibold mt-2.5">
          {isUploadingPhoto ? "Uploading..." : "Tap to change profile picture"}
        </span>
        <Link
          href={`/profile/${userId}`}
          className="inline-flex items-center gap-1 text-primary text-xs font-semibold mt-2 hover:underline"
        >
          <User className="w-3.5 h-3.5" strokeWidth={2.5} />
          View Profile Details
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-x-5">
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
        <div className="md:col-span-2">
          <Input
            label="Short Bio"
            type="textarea"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell buyers about yourself..."
          />
        </div>
      </div>

      <div className="mt-auto pt-8">
        <Button
          onClick={handleSaveProfile}
          fullWidth
          variant="primary"
          loading={isLoading}
        >
          Save Changes
        </Button>
      </div>
    </PageTransition>
  );
}
