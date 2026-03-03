import type { FC } from "react"
import SignupImg from "../../../assets/Signup/Signup.jpg"

const AuthBranding: FC = () => {
  return (
    <div className="hidden lg:flex w-[55%] relative text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${SignupImg})` }}
      />
      <div className="absolute inset-0 bg-[#25492D]/20" />

      <div className="relative z-10 max-w-md px-16 py-20 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-6 leading-tight">
          Join NutriCore
        </h1>

        <p className="text-green-100 text-lg leading-relaxed">
          Start your journey toward a healthier lifestyle with premium supplements.
        </p>
      </div>
    </div>
  )
}

export default AuthBranding