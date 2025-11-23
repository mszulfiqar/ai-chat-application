import GuestRoutes from '@/components/GuestRoutes'
import ProtectedRoutes from '@/components/ProtectedRoutes'
import { SignInForm } from '@/components/signin-form'

const page = () => {
  return (
    <GuestRoutes>
      <div className='px-5 py-7 xl:mt-5  mx-auto md:max-w-[500px] '>
        <SignInForm />
      </div>
    </GuestRoutes>
  )
}

export default page