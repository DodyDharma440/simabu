import React, { useCallback } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Center,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { ILoginInput } from "../../interfaces";
import { useLogin } from "../../actions";

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>();

  const { mutate: login, isPending } = useLogin({
    onSuccess: ({ data }) => {
      const roleName = data.data.role.name;
      const urls: Record<string, string> = {
        Admin: "/admin/dashboard",
        Petugas: "/admin/dashboard",
        Mahasiswa: "/student/dashboard",
      };
      localStorage.setItem("isLoggedIn", "true");

      router.replace(urls[roleName] || "/");
    },
  });

  const submitHandler = useCallback(
    (values: ILoginInput) => {
      login({ formValues: values });
    },
    [login]
  );

  return (
    <Center p="xl" h="100%">
      <form
        style={{ maxWidth: "350px", width: "100%" }}
        onSubmit={handleSubmit(submitHandler)}
      >
        <Title mb="lg" align="center">
          SIMABU LOGIN
        </Title>
        <Stack w="100%">
          <TextInput
            {...register("username", {
              required: "Username harus diisi",
            })}
            label="Username/NIM"
            placeholder="Username/NIM"
            error={errors.username?.message}
          />
          <PasswordInput
            {...register("password", {
              required: "Password harus diisi",
            })}
            label="Password"
            placeholder="Password"
            error={errors.password?.message}
          />
          <Button type="submit" loading={isPending}>
            Login
          </Button>
        </Stack>
      </form>
    </Center>
  );
};

export default LoginForm;
