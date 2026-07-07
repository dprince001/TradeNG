"use client";

import { useFormContext } from "react-hook-form";
import Input, { InputProps } from "./Input";

interface FormInputProps extends InputProps {
  name: string;
}

const FormInput = ({ name, ...props }: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMsg = errors[name]?.message as string | undefined;

  return (
    <Input
      error={errorMsg}
      {...register(name)}
      {...props}
    />
  );
};

export default FormInput;
