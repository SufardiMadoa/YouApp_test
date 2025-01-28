'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { loginSchema } from "@/app/api/schema/LoginSchema";
import { loginApi } from "../api/auth/login";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: ""
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
      console.log("Data yang dikirimkan:", formData);  // Debugging log
      setIsLoading(true);
      const response = await loginApi.postLogin({
        email: formData.email,
        username: formData.username,
        password: formData.password
      });
      if(response.access_token === undefined){
        toast.error("Invalid username or password");
      }
      else{
        // Menyimpan token di localStorage
        localStorage.setItem('token', response.access_token);
        router.push('/profile');
      toast.success("Login successful!");
      }
      // Redirect setelah login berhasil
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
      } else {
        // Menangani error API lainnya
        toast.error(error.response?.data?.message || "Login failed");
      }
    } finally {
      setIsLoading(false);
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
            className="input-gradient w-full h-[51px] border-none bg-white bg-opacity-[6%] placeholder:font-medium placeholder:text-white/40 placeholder:text-medium placeholder:text-[13px]"
            placeholder="Enter Username"
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
            placeholder="Enter Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
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
            <span className="text-white">No account?</span>{" "}
            <Link
              href="/register"
              className="relative bg-gradient-to-r from-[#94783E] via-[#F3EDA6] to-[#D5BE88] bg-clip-text text-transparent font-medium"
            >
              Register Here
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
