// Fahim
"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, LockKeyhole, Eye, EyeOff } from 'lucide-react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";
import { useView } from "./(super-admin)/ListGridContext";
import Image from "next/image";
import { toast } from "sonner";
import api from "@/lib/axiosInterceptor";

// Type inference from schema
// type SignInFormData = z.infer<typeof SignInSchema>;

type SignInFormData = {
  emailAddress: string;
  password: string;
};

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { auth, setAuth } = useView();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({ // Add type parameter here
    // resolver: zodResolver(SignInSchema),
    mode: "onChange", // Add this for immediate validation
    defaultValues: {
      emailAddress: "",
      password: "",
    }
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await api.post("/api/auth/login/",
        {
          email: data.emailAddress,
          password: data.password
        },
      );
      // console.log(response?.data);

      const accessToken = response?.data?.tokens?.access;
      const refreshToken = response?.data?.tokens?.refresh;

      // console.log("ff",user,email);
      if (!accessToken) {
        // Add toast for no token
        toast.error("Authentication Failed", {
          description: "No authentication token received.",
        });
        throw new Error("No authentication token received");
      }

      // Store the token
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('n1X_ang@xinl23446', response?.data?.user?.id);

      localStorage.setItem('user_name', response?.data?.user?.full_name);
      localStorage.setItem('user_email', response?.data?.user?.email);
      localStorage.setItem('user_phone', response?.data?.user?.phone_number);
      localStorage.setItem('user_photo', response?.data?.user?.profile_image);

      // Add success toast
      toast.success("Login Successful", {
        description: `Welcome back, ${response?.data?.user?.full_name || 'User'}!`,
      });

      // setAuth({ accessToken: token });

      // Now redirect based on role
      if (response?.data?.user?.is_superuser === true) {
        router.push("/super-admin/dashboard");
      } else {
        router.push("/admin/withSidebar/dashboard");
      }
    }
    catch (err: any) {
      // Add toast notifications for errors
      console.log("Error:", err?.response);
      if (!err?.response) {
        toast.error("Network Error", {
          description: "Unable to connect to server. Please check your connection.",
        });
      } else if (err?.response?.status === 400) {
        console.log('Missing Username or Password');
        toast.error("Invalid Input", {
          description: "Please enter correct email and password.",
        });
      } else if (err?.response?.status === 401) {
        console.log('Unauthorized');
        toast.error("Login Failed", {
          description: "Invalid email or password. Please try again.",
        });
      } else if (err?.response?.status === 404) {
        toast.error("Account Not Found", {
          description: "No account exists with this email.",
        });
      } else {
        toast.error("Login Failed", {
          description: "Something went wrong. Please try again.",
        });
      }
    }
  };

  return (
    <div className="relative w-full h-screen bg-[url(/log-in-images/login-image.jpg)] 
    bg-cover bg-center flex items-center justify-center">
      <div className="absolute w-full h-full z-10 bg-[#15356999]" /> {/*Overlay*/}
      <div className="hidden sm:block absolute top-7 left-12 w-28 h-28 z-40">
        <Image src="/logos/Login_Logo.png" alt="login-logo" fill />
      </div>
      <div className="max-w-[450px] flex flex-col items-center justify-center gap-9 m-3 z-40">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-[370px] p-5 bg-[#F6F6F6] 
        border rounded-lg">
          <div className="w-full flex flex-col gap-2">
            <h1 className="font-bold font-poppins text-[#0E0E0E] text-2xl">Welcome Back!</h1>
            <p className="font-poppins text-[#7A7A7A] text-sm">Sign in to access the business directory</p>
          </div>

          {/* shadcn */}
          <div className="w-full grid gap-3 items-center mt-4">
            <label htmlFor="emailAddress" className="font-poppins text-[#252525] text-sm">
              Email Address</label>
            <div className="relative w-full">
              <Input type="text" id="emailAddress" placeholder="admin@business.com"
                className="font-poppins bg-[#F2F2F2] text-[#3F3F3F] text-base pl-10"
                {...register("emailAddress")} />
              <Mail className="absolute top-3 left-2.5 w-6 h-5" />
            </div>
            {errors.emailAddress && (
              <p className="text-red-500 text-sm font-poppins">{errors.emailAddress.message}</p>
            )}
          </div>

          <div className="w-full grid gap-3 items-center mt-4">
            <label htmlFor="password" className="font-poppins text-[#252525] text-sm">Password</label>
            <div className="relative w-full">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="********"
                className="pr-10 pl-9 font-poppins bg-[#F2F2F2] text-black" // leave space for the eye button
                {...register("password")}
              />
              <LockKeyhole className="absolute top-2.5 left-2.5 w-5 h-5" />
              <button type="button" className="absolute right-3 top-3.5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm font-poppins">{errors.password.message}</p>
            )}
          </div>

          {/* <div className="flex justify-end mt-6">
          <Link href="/forget-password" className="font-poppins text-[#2459B1] text-sm">Forgot password?</Link>
        </div> */}

          <div className="w-full mt-8">
            <Button type="submit" className="w-full font-poppins cursor-pointer bg-[#327EF9] text-base 
            text-[#E8E8E8] hover:scale-105 hover:shadow-lg" disabled={isSubmitting}>
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </form>

        <div className="w-full inset-0 flex flex-col gap-1">
          {/* <h1 className="text-[#1C4589] text-5xl font-bold font-poppins">TradeConnect</h1> */}
          <h1 className="font-medium font-poppins text-[#FEF3EB] text-2xl">Business Directory
            Network</h1>
          <p className="font-poppins text-[#EBF2FE] text-sm">Connect with trusted business worldwide.
            Access exclusive partnerships and grow your network.</p>
          <div className="flex gap-2 items-center">
            <FaArrowRight className="text-[#EBF2FE]" />
            <p className="font-poppins text-[#EBF2FE] text-sm">Secure Access Management.</p>
          </div>
          <div className="flex gap-2 items-center">
            <FaArrowRight className="text-[#EBF2FE]" />
            <p className="font-poppins text-[#EBF2FE] text-sm">Verified Business Profiles</p>
          </div>
          <div className="flex gap-2 items-center">
            <FaArrowRight className="text-[#EBF2FE]" />
            <p className="font-poppins text-[#EBF2FE] text-sm">Global network Access</p>
          </div>
        </div>
      </div>
    </div>
  );
}
