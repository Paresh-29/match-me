"use client";

import { registerUser } from "@/app/actions/authActions";
import { registerSchema, RegisterSchema } from "@/lib/schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { s } from "framer-motion/client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isValid, errors, isSubmitting },
  } = useForm<RegisterSchema>({
    // resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data);

    if (result.status === "success") {
      console.log("User registered successfully");
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach((e: any) => {
          console.log("e::: ", e);
          const fieldName = e.path.join(".") as "name" | "email" | "password";
          setError(fieldName, {
            message: e.message,
          });
        });
      } else {
        setError("root.serverError", {
          message: result.error,
        });
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-2/5">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2 items-center text-default">
            <div className="flex flex-row items-center gap-3">
              <GiPadlock size={30} />
              <h1 className="text-3xl font-semibold">Register</h1>
            </div>
            <p className="text-neutral-500">Welcome NextMatch!</p>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Input
                defaultValue=""
                label="Name"
                variant="bordered"
                {...register("name")}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message as string}
              />
              <Input
                defaultValue=""
                label="Email"
                variant="bordered"
                {...register("email")}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message as string}
              />
              <Input
                defaultValue=""
                label="password"
                variant="bordered"
                type="password"
                {...register("password")}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message as string}
              />
              <Button
                isDisabled={!isValid}
                isLoading={isSubmitting}
                fullWidth
                type="submit"
                color="default"
              >
                Register
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
