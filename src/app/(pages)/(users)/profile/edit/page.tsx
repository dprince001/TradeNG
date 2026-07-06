"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";

export default function EditProfilePage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("Olamilekan Daniel");
  const [phoneNumber, setPhoneNumber] = useState("+234 812 345 6789");
  const [address, setAddress] = useState("12 Broad Street, Lagos");
  const [bio, setBio] = useState("Trusted seller of quality electronics and gadgets.");

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
    router.push("/profile");
  };

  return (
    <div className="flex-1 flex flex-col px-5 pt-6 pb-24">
      {/* Edit Avatar */}
      <div className="flex flex-col items-center text-center mt-2 mb-6">
        <div className="relative cursor-pointer group">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#FF4304] to-[#FF8C39] flex items-center justify-center text-white text-2xl font-extrabold shadow-md border-4 border-white group-hover:brightness-95 transition-all">
            OD
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary border-2 border-white shadow-sm flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform">
            <Pencil className="w-3.5 h-3.5" strokeWidth={2.5} />
          </div>
        </div>
        <span className="text-xs text-[#8F959E] font-semibold mt-2.5">
          Tap to change profile picture
        </span>
      </div>

      {/* Edit Form */}
      <div className="flex flex-col gap-4">
        <Input
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter full name"
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

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-sm font-medium text-text-primary">Short Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell buyers about yourself..."
            rows={4}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-text-primary placeholder-gray-400 bg-white transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
          />
        </div>
      </div>

      <div className="mt-auto pt-8">
        <Button onClick={handleSaveProfile} fullWidth variant="primary">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
