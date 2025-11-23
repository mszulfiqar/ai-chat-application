import GuestRoutes from '@/components/GuestRoutes'
import { SignupForm } from '@/components/signup-form'

const page = () => {
  return (
    <GuestRoutes>
      <div className='px-5 py-7 xl:mt-5  mx-auto md:max-w-[500px] '>
        <SignupForm />
      </div>
    </GuestRoutes>
  )
}

export default page