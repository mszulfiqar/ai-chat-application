"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { authClient, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import LoadingComponet from "./LoadingComponet";

type LoginForm = {
  name: string;
  email: string;
  password: string;
};

export function SignupForm({ className, ...props }: React.ComponentProps<"form">) {
  const router = useRouter();
   const { data: session, isPending, error } = authClient.useSession();

  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginForm>();
  const onSubmit = async (data: LoginForm) => {
    const { data: res, error } = await signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
      callbackURL:"/"
    }, {
      onRequest: (ctx) => {
        //show loading
        <LoadingComponet />
      },
      onSuccess: (ctx) => {
        //redirect to the dashboard or sign in page
        router.push("/");
      },
      onError: (ctx) => {
        toast.error(ctx.error.message || "Please try agin later");
      },
    })
    console.log("Form data:", data);
  }
  const onError = (formErrors: typeof errors) => {
    Object.values(formErrors).forEach((err) => {
      if (err?.message) toast.error(err.message);
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className={cn("flex flex-col mt-[-15px] gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className='text-center text-[#807b7b] text-[13px] mb-[-15px] font-semibold'>Chat freely. We handle the translation.</p>
        </div>
        <Field className="pb-0.5">
          <Button className="h-9" variant="outline" type="button">
            <Image src="./google.svg" alt="google icon" width={20} height={20} />
            Sign in with Google
          </Button>
        </Field>
        <FieldSeparator className="">Or continue with</FieldSeparator>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" type="text" placeholder="John Doe" className="auth_form_input" {...register("name", { required: "Name is required" })} />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" className="auth_form_input" {...register("email", { required: "Email is required" })} />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" className="auth_form_input" {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters"
            }
          })} />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
        <Field>
          <Button className="h-12" type="submit">Create Account</Button>
        </Field>
        <FieldDescription className="px-6 text-[black] -mt-3! text-center">
          Already have an account? <Link href="/sign-in">Sign in</Link>
        </FieldDescription>
        <FieldDescription className="px-6  text-center">
          By clicking continue, you agree to our <Link href="#">Terms of Service</Link>{" "}
          and <Link href="#">Privacy Policy</Link>.
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}
