"use client";
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type emailType= {
    email:string
}
const page = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<emailType>();
    const onError = (formErrors: typeof errors) => {
        Object.values(formErrors).forEach((err) => {
            if (err?.message) toast.warning(err.message);
        });
    };
    const onSubmit = async (formdata:emailType) => {
        const {data,error} = await authClient.requestPasswordReset({
            email: formdata.email,
            redirectTo:`/reset-password`
        })
        if(error){
           return toast.warning(error.message || "Something went wrong")
        }
         toast.success(data.message)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} >
            <div className='w-full h-screen flex items-center justify-center'>
                <div className='bg-[#fcfcfc] border shadow-xl  px-8 py-6 rounded-xl w-[500px] '>
                    <h1 className='font-semibold text-xl  '>Reset Your Password</h1>
                    <p className='text-[16px]'>Enter your email and we’ll send you a link to reset your password</p>
                    <Field className="mt-2">
                        <FieldLabel htmlFor="email" className="-mb-2.5 mt-3">Email:</FieldLabel>
                        <Input id="email" type="email" placeholder="m@example.com" className="email_link_reset" {...register("email", { required: "Enter your email" })} />
                    </Field>
                    <Field className="mt-7">
                        <Button className="h-12" type="submit">Send Reset Link</Button>
                    </Field>
                </div>
            </div>
        </form>
    )
}

export default page