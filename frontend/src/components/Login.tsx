import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema/LoginSchema";
import { LoginPayload } from "@/types";
import { login } from "@/store/slices/auth/authActions";
import { useAppDispatch } from "@/store/store";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: zodResolver(LoginSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<LoginPayload> = (data) => {
    dispatch(login(data));
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your credentials to access your account
          </p>
        </div>

        <div className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-rose--500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-rose--500">{errors.password.message}</p>
              )}
            </div>
            <Button className="w-full mt-3" type="submit">
              Sign In
            </Button>
          </form>
          <div className="flex items-center justify-between">
            <Link
              className="text-sm font-medium underline underline-offset-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              to={"/"}
            >
              Forgot Password?
            </Link>
            <Link
              className="text-sm font-medium underline underline-offset-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              to={"/signup"}
            >
              Create Account
            </Link>
          </div>
          <Separator className="my-6" />
          <div className="grid grid-cols-2 gap-2">
            <Button className="w-full" variant="outline">
              <GithubIcon className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button className="w-full" variant="outline">
              <ChromeIcon className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChromeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

function GithubIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
