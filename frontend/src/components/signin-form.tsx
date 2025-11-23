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
import { signIn, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingComponet from "./LoadingComponet";

type LoginForm = {
    name: string;
    email: string;
    password: string;
};

export function SignInForm({ className, ...props }: React.ComponentProps<"form">) {
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginForm>();
    const onSubmit = async (data: LoginForm) => {
        const { data: res, error } = await signIn.email({
            email: data.email,
            password: data.password,
        }, {
            onRequest: (ctx) => {
                //show loading
                <LoadingComponet />
            },
            onSuccess: (ctx) => {
                router.push("/");
            },
            onError: (ctx) => {
                toast.error(ctx.error.message || "Please try agin later");
            },
        })
    }
    const onError = (formErrors: typeof errors) => {
        Object.values(formErrors).forEach((err) => {
            if (err?.message) toast.error(err.message);
        });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className={cn("flex flex-col gap-6 mt-10", className)} {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Welcome Back!</h1>
                    <p className='text-center text-[#807b7b] text-[13px] mb-[-15px]  font-semibold'>Connect without limits.</p>
                </div>
                <Field className="pb-0.5">
                    <Button className="h-9" variant="outline" type="button">
                        <Image src="./google.svg" alt="google icon" width={20} height={20} />
                        Sign in with Google
                    </Button>
                </Field>
                <FieldSeparator className="">Or continue with</FieldSeparator>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" type="email" placeholder="m@example.com" className="auth_form_input" {...register("email", { required: "Email is required" })} />
                </Field>
                <Field>
                    <div className="flex justify-between">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Link href="/reseting-email" className="ml-auto  text-sm underline-offset-4 hover:underline">Forgot your Password?</Link>
                    </div>
                    <Input id="password" type="password" className="auth_form_input" {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    })} />
                </Field>
                <Field>
                    <Button className="h-12" type="submit">Sign in</Button>
                </Field>
                <FieldDescription className="px-6 text-[black] -mt-3! text-center">
                    Don&apos;t have an account? <Link href="/register">Sign up</Link>
                </FieldDescription>
                <FieldDescription className="px-6 mt-12! text-center">
                    By clicking continue, you agree to our <Link href="#">Terms of Service</Link>{" "}
                    and <Link href="#">Privacy Policy</Link>.
                </FieldDescription>
            </FieldGroup>
        </form>
    )
}
