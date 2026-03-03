import { useState, type FC } from "react"
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import Button from "../../../shared/components/ui/Button"
import Input from "../../../shared/components/ui/Input"

interface RegisterFormProps {
  onSubmit: (data: {
    name: string
    email: string
    password: string
  }) => void
  isLoading?: boolean
}

const RegisterForm: FC<RegisterFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    if (!form.agree) {
      alert("You must accept terms")
      return
    }

    onSubmit({
      name: form.name,
      email: form.email,
      password: form.password,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="pl-10"
          required
        />
      </div>

      {/* Email */}
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="pl-10"
          required
        />
      </div>

      {/* Password */}
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

        <Input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="pl-10 pr-10"
          required
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

        <Input
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="pl-10 pr-10"
          required
        />

        <button
          type="button"
          onClick={() =>
            setShowConfirmPassword((prev) => !prev)
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showConfirmPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Terms */}
      <div className="flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          name="agree"
          checked={form.agree}
          onChange={handleChange}
          className="accent-[#25492D] w-4 h-4"
          required
        />
        <span className="text-gray-600">
          I agree to the{" "}
          <span className="text-[#25492D] font-medium cursor-pointer hover:underline">
            Terms & Conditions
          </span>
        </span>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full bg-[#25492D] hover:bg-[#1b3421]"
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create Account"}
      </Button>
    </form>
  )
}

export default RegisterForm