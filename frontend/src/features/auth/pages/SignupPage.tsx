import type { FC } from "react"
import { Link } from "react-router-dom"
import RegisterForm from "../components/RegisterForm"
import AuthBranding from "../components/AuthBranding"
import { useRegister } from "../hooks/useSignup"

const RegisterPage: FC = () => {
  const { mutate, isPending } = useRegister()

  return (
    <div className="min-h-screen flex">
      <AuthBranding />

      <div className="flex flex-1 justify-center items-center bg-gray-50 px-6 py-3">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 mb-8">
            Sign up to get started
          </p>

          <RegisterForm
            onSubmit={mutate}
            isLoading={isPending}
          />

          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#25492D] font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage