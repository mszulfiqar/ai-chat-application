"use client";
import React, { useEffect, useRef, useState } from 'react'
import ResetPasswordTokenValidtion from './_components/ResetPasswordTokenValidtion';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { CgPassword } from 'react-icons/cg';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import LoadingComponet from '@/components/LoadingComponet';
import { authClient } from '@/lib/auth-client';
import ErrorInavlidToken from './_components/UI/ErrorInavlidToken';

type Reset_Types = {
  password: string;
  c_password: string
};

const page = () => {
  const router = useRouter()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Reset_Types>();
  const [token, setToken] = useState<string | null | undefined>()
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    setToken(token)
  }, [])
  if (token === undefined) {
    return null; // or <div>Loading...</div>
  }
  if (!token) {
    return <ErrorInavlidToken />
  }

  const onSubmit = async (formdata: Reset_Types) => {
    if (formdata.c_password != formdata.password) {
      return toast.warning("Comfirm Password does not match!")
    }
    const { data, error } = await authClient.resetPassword({
      newPassword: formdata.password,
      token,
    });
    if(error?.message == "Invalid token") {
      router.replace("/reseting-email")
      return toast.warning("Link expired! Please request the link again")
    }
    if(error){
      return toast.warning(error.message || "Something went wrong!")
    }
    if(data.status) {
        toast.success("Successfully changed the password!")
        router.push("/sign-in")
    }
    // router.replace("/sign-in")
  }
  const onError = (formErrors: typeof errors) => {
    Object.values(formErrors).forEach((err) => {
      if (err?.message) toast.error(err.message);
    });
  };
  return (
    // <ResetPasswordTokenValidtion>
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='bg-[#fcfcfc] border shadow-2xl  px-6 py-6 rounded-xl w-[500px] '>
          <div className='flex justify-center w-full text-[40px]'><CgPassword /></div>
          <h1 className='font-semibold text-xl my-2.5 mb-[7px]  text-center'>Set new password</h1>
          <p className='text-center text-[#807b7b] text-[15px] font-medium'>Must be at least 8 characters long</p>
          <Field className='my-[18px]'>
            <FieldLabel htmlFor="password" className='-mb-2'>Password</FieldLabel>
            <Input id="password" type="password" className="auth_form_input" {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })} />
            {/* <Input id="password" type="password" className="auth_form_input" /> */}
          </Field>
          <Field>
            <FieldLabel htmlFor="c_password" className='-mb-2'>Comfirm Password</FieldLabel>
            <Input id="c_password" type="password" className="auth_form_input" {...register("c_password", {
              required: "Comfirm Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })} />
            {/* <Input id="password" type="password" className="auth_form_input" /> */}
          </Field>
          <Field className='mt-[25px]!'>
            <Button className="h-12" type="submit">Reset Password</Button>
          </Field>
        </div>
      </div>
    </form>
    // </ResetPasswordTokenValidtion >
  )
}

export default page