import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/schema/SingupSchema";
import { SignupPayload } from "@/types";
import { signUp } from "@/store/slices/auth/authActions";
import { useAppDispatch } from "@/store/store";

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupPayload>({
    resolver: zodResolver(SignupSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<SignupPayload> = (data) => {
    dispatch(signUp(data))
    .unwrap()
    .then(() => {
      navigate("/");
    })
    .catch((e) => {
      console.log(e, "error");
    });
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
                {...register("username", { required: true })}
              />
              {errors.username && (
                <p className="text-rose--500">{errors.username.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                {...register("fullName", { required: true })}
              />
              {errors.fullName && (
                <p className="text-rose--500">{errors.fullName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-rose--500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">phoneNumber</Label>
              <Input
                id="phoneNumber"
                placeholder="Enter your phoneNumber"
                {...register("phoneNumber", { required: true })}
              />
              {errors.phoneNumber && (
                <p className="text-rose--500">{errors.phoneNumber.message}</p>
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
              Sign Up
            </Button>
          </form>
          <div className="flex items-center justify-between">
            <Link
              className="text-sm font-medium underline underline-offset-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              to={"/login"}
            >
              Already have an account?
            </Link>
          </div>
          <Separator className="my-6" />
        </div>
      </div>
    </div>
  );
}
