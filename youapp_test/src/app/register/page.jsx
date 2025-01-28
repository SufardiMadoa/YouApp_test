'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { loginSchema } from "@/app/api/schema/LoginSchema";
import { registerApi  } from "../api/auth/register";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function Page() {
    const router = useRouter();
    const [formData, setFormData] = useState({
      email: "",
      username: "",
      password: "",
      confirmPassword: ""  // Tambah state untuk confirm password
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
      // Clear error when user types
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: ""
        }));
      }
  
      // Validasi konfirmasi password saat mengetik
      if (name === 'confirmPassword' || name === 'password') {
        if (name === 'password' && formData.confirmPassword && value !== formData.confirmPassword) {
          setErrors(prev => ({
            ...prev,
            confirmPassword: "Passwords do not match"
          }));
        } else if (name === 'confirmPassword' && value !== formData.password) {
          setErrors(prev => ({
            ...prev,
            confirmPassword: "Passwords do not match"
          }));
        } else {
          setErrors(prev => ({
            ...prev,
            confirmPassword: ""
          }));
        }
      }
    };
  
    const isFormComplete = () => {
        return Object.values(formData).every((value) => value.trim() !== "");
      };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});
      try {
        // Validasi form data
        loginSchema.parse(formData);
        console.log("Data yang dikirimkan:", formData);
        setIsLoading(true);
        const response = await registerApi.postRegister({
          email: formData.email,
          username: formData.username,
          password: formData.password
        });
  
        localStorage.setItem('token', response.token);
        toast.success("Registration successful!");
        router.push('/login');
      } catch (error) {
        if (error.name === "ZodError") {
          // Menangani error validasi
          const newErrors = {};
          error.errors.forEach((err) => {
            newErrors[err.path[0]] = err.message;
          });
          setErrors(newErrors);
        } else if (error.response?.status === 401) {
          toast.error("Invalid credentials. Please try again.");
      }toast.error(error.response?.data?.message || "Login failed");
      console.log(error)
      
    } finally {
        setIsLoading(false);
      }
      // Validasi password match
      if (formData.password !== formData.confirmPassword) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: "Passwords do not match"
        }));
        return;
      }
  
      
    };

  return (
    <div className="min-h-screen flex flex-col p-[18px] bg-gradient-to-bl from-[#1F4247] via-[#0D1D23] to-[#09141A]">
      <div className="mt-[37px]">
        <Button className="bg-transparent p-0" onClick={() => router.back()}>
          <ChevronLeft /> Back
        </Button>
      </div>

      <div className="mt-[23px] ml-[23px] text-[24px]">
        <p className="font-bold text-white">Login</p>
      </div>

      <form onSubmit={handleSubmit} className="form-input gap-4 flex flex-col items-center m-0">
        <div className="mt-[25px] ml-[0px] w-full max-w-[327px]">
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-[51px] border-none bg-white bg-opacity-[6%] placeholder:font-medium placeholder:text-white/40 placeholder:text-medium placeholder:text-[13px]"
            placeholder="Enter Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className=" w-full max-w-[327px]">
          <Input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="w-full h-[51px] border-none bg-white bg-opacity-[6%] placeholder:font-medium placeholder:text-white/40 placeholder:text-medium placeholder:text-[13px]"
            placeholder="Create Username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        <div className="w-full max-w-[327px]">
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full h-[51px] border-none bg-white bg-opacity-[6%] placeholder:font-medium placeholder:text-white/40 placeholder:text-medium placeholder:text-[13px]"
            placeholder="Create Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <div className="w-full max-w-[327px]">
        <Input
          name="confirmPassword"  // Ubah name
          type="password"
          value={formData.confirmPassword}  // Ubah value
          onChange={handleChange}
          className="w-full h-[51px] border-none bg-white bg-opacity-[6%] placeholder:font-medium placeholder:text-white/40 placeholder:text-medium placeholder:text-[13px]"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>

        <div className="w-full max-w-[327px]">
          <Button
            type="submit"
            disabled={isLoading || !isFormComplete()}
            className={`w-full h-[48px] rounded-lg font-bold text-[16px] bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ${
                isFormComplete()
                ? 'opacity-100 shadow-lg shadow-blue-500/50 hover:shadow-xl'
                : 'opacity-[30%]'
            }`}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
        </div>

        <div className="text-center">
          <p>
            <span className="text-white">Have am account?</span>{" "}
            <Link
              href="/login"
              className="relative bg-gradient-to-r from-[#94783E] via-[#F3EDA6] to-[#D5BE88] bg-clip-text text-transparent font-medium"
            >
              Login Here
              <span
                className="absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-[#94783E] via-[#F3EDA6] to-[#D5BE88]"
                style={{ transform: "translateY(4px)" }}
              />
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Page;
