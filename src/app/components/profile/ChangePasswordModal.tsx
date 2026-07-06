"use client";

import { useState } from "react";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import usePost from "@/app/hooks/usePost";
import { useUpdateMyPasswordMutation } from "@/app/redux/api/profileApiSlice";

const ChangePasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { handlePost, isLoading } = usePost(useUpdateMyPasswordMutation);

  const handleSubmit = async () => {
    const response = await handlePost({
      current_password: currentPassword,
      new_password: newPassword,
    });
    if (response?.success !== false) {
      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-text-primary font-semibold text-lg mb-4">Change Password</h2>
      <div className="flex flex-col gap-4">
        <Input
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter current password"
        />
        <Input
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="At least 8 characters"
          helperText="Must include one uppercase letter and one number"
        />
      </div>
      <div className="flex gap-3 mt-6">
        <Button variant="outline" fullWidth onClick={onClose}>
          Cancel
        </Button>
        <Button fullWidth loading={isLoading} onClick={handleSubmit}>
          Update
        </Button>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
