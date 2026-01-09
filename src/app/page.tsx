// Fahim
"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, LockKeyhole, Eye, EyeOff } from 'lucide-react';
import { useState } from "react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";
import axios from "axios";
import { useView } from "./(super-admin)/ListGridContext";

// const SignInSchema = z.object({
//   emailAddress: z
//     .string()
//     .email("Incorrect Email")
//     .toLowerCase()
//     .trim(),

//   password: z
//     .string()
//     .min(8, "Wrong Password")
//     .regex(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
//       "Password must contain at least one uppercase letter, one lowercase letter and one number"
//     ),
// });

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
    setValue,
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
      const response = await axios.post("https://rihanna-preacquisitive-eleanore.ngrok-free.dev/api/auth/login/",
        {
          email: data.emailAddress,
          password: data.password
        },
        {
          headers: { 'Content-Type': 'application/json' },
          // withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      //const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;
      // setAuth({ user, pwd, roles, accessToken });
      // setSuccess(true);

      // if (response?.data?.is_superuser === true) {
      //   router.push("/super-admin/dashboard");
      // }

      // Check if we received a valid token
      const token = response?.data?.tokens?.access;

      if (!token) {
        throw new Error("No authentication token received");
      }

      // Store the token
      localStorage.setItem('accessToken', token);
      setAuth({ accessToken: token });

      // // Store user data if needed
      // if (response.data.is_superuser !== undefined) {
      //   localStorage.setItem('isSuperUser', response.data.is_superuser.toString());
      // }

      // Now redirect based on role
      if (response.data.user.is_superuser === true) {
        router.push("/super-admin/dashboard");
      } else {
        router.push("/admin/dashboard");
      }
    }
    catch (err: any) {
      // if (!err?.response) {
      //   setErrMsg('No Server Response');
      // } 
      if (err?.response?.status === 400) {
        console.log('Missing Username or Password');
        //setErrMsg('Missing Username or Password');
      } else if (err?.response?.status === 401) {
        console.log('Unauthorized');
        // setErrMsg('Unauthorized');
      }
      // else {
      //   setErrMsg('Login Failed');
      // }
      // errRef.current.focus();
    }

    // if (data.emailAddress === "admin@gmail.com" && data.password === "HelloFahim19")
    //   router.push("/super-admin/dashboard");
    // const payload = {
    //   "email": "tusharimranme0@gmail.com",
    //   "password": "12345678"
    // }
    // try {
    //   const response = await axios.post('http://127.0.0.1:8000/api/accounts/login/', payload, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     }
    //   });
    //   return response.data;
    // } catch (error) {
    //   console.error("Submission error:", error);
    // }
  };

  return (
    <div className="w-full h-screen bg-[url(/log-in-images/login-image.jpg)] 
    bg-cover bg-center flex items-center justify-center">
      <div className="max-w-[480px] flex flex-col items-center justify-center gap-12">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full p-3 bg-[#F6F6F6] 
        border rounded-lg">
          <div className="w-full flex flex-col gap-2">
            <h1 className="font-bold font-poppins text-[#0E0E0E] text-3xl">Welcome Back!</h1>
            <p className="font-poppins text-[#7A7A7A]">Sign in to access the business directory</p>
          </div>

          {/* shadcn */}
          <div className="w-full grid gap-3 items-center mt-5">
            <label htmlFor="emailAddress" className="font-poppins text-[#252525]">Email Address</label>
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

          <div className="w-full grid gap-3 items-center mt-5">
            <label htmlFor="password" className="text-[#252525] font-poppins">Password</label>
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

          <div className="w-full mt-5">
            <Button type="submit" className="w-full font-poppins cursor-pointer bg-[#327EF9] text-base 
            text-[#E8E8E8] hover:scale-105 hover:shadow-lg" disabled={isSubmitting}>
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </form>

        <div className="w-full inset-0 flex flex-col gap-1">
          {/* <h1 className="text-[#1C4589] text-5xl font-bold font-poppins">TradeConnect</h1> */}
          <h1 className="font-medium font-poppins text-[#FEF3EB] text-3xl">Business Directory
            Network</h1>
          <p className="font-poppins text-[#EBF2FE]">Connect with trusted business worldwide. Access
            exclusive partnerships and grow your network.</p>
          <div className="flex gap-2 items-center">
            <FaArrowRight className="text-[#EBF2FE]" />
            <p className="font-poppins text-[#EBF2FE]">Secure Access Management.</p>
          </div>
          <div className="flex gap-2 items-center">
            <FaArrowRight className="text-[#EBF2FE]" />
            <p className="font-poppins text-[#EBF2FE]">Verified Business Profiles</p>
          </div>
          <div className="flex gap-2 items-center">
            <FaArrowRight className="text-[#EBF2FE]" />
            <p className="font-poppins text-[#EBF2FE]">Global network Access</p>
          </div>
        </div>
      </div>
    </div>
  );
}












// "use client"
// import Image from "next/image";
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Eye, EyeOff } from 'lucide-react';
// import { useState } from "react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { CiLock, CiMail } from "react-icons/ci";
// import { FaArrowRight } from "react-icons/fa6";
// import axios from "axios";

// const SignInSchema = z.object({
//   emailAddress: z
//     .string()
//     .email("Incorrect Email")
//     .toLowerCase()
//     .trim(),

//   password: z
//     .string()
//     .min(8, "Wrong Password")
//     .regex(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
//       "Password must contain at least one uppercase letter, one lowercase letter and one number"
//     ),
// });

// // Type inference from schema
// type SignInFormData = z.infer<typeof SignInSchema>;

// export default function SignIn() {
//   const [showPassword, setShowPassword] = useState(false);

//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     setValue,
//   } = useForm<SignInFormData>({ // Add type parameter here
//     resolver: zodResolver(SignInSchema),
//     mode: "onChange", // Add this for immediate validation
//     defaultValues: {
//       emailAddress: "",
//       password: "",
//     }
//   });

//   const onSubmit = async (data: SignInFormData) => {
//     const payload = {
//       "email": "tusharimranme0@gmail.com",
//       "password": "12345678"
//     }
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/accounts/login/', payload, {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Submission error:", error);
//     }
//   };

//   return (
//     <div className="w-full h-screen flex">
//       {/* <div className="hidden lg:block lg:w-[50%] xl:w-[60%] 2xl:w-[70%] h-full bg-[url(/sign-up-images/stage.png)] bg-cover
//             bg-center" /> */}
//       {/* The above code will cause hydration error. The below is OK. */}

//       <div className="hidden lg:block lg:w-[50%] h-full relative">
//         <Image src="/log-in-images/login-image.jpg" alt="background" fill className="object-cover object-center" />
//         <div className="absolute w-full h-full z-10 bg-[#15356970]/44" /> {/*Overlay*/}
//         <div className="absolute w-full inset-0 p-14 flex flex-col justify-between z-20">
//           <h1 className="text-[#1C4589] text-5xl font-bold font-poppins">TradeConnect</h1>
//           <div className="flex flex-col gap-4">
//             <h1 className="font-medium font-poppins text-[#FEF3EB] text-4xl">Business Directory Network</h1>
//             <p className="font-poppins text-[#EBF2FE]">Connect with trusted business worldwide. Access exclusive
//               partnerships and grow your network.</p>
//             <div className="flex gap-2 items-center">
//               <FaArrowRight className="text-[#EBF2FE]" />
//               <p className="font-poppins text-[#EBF2FE]">Secure Access Management.</p>
//             </div>
//             <div className="flex gap-2 items-center">
//               <FaArrowRight className="text-[#EBF2FE]" />
//               <p className="font-poppins text-[#EBF2FE]">Verified Business Profiles</p>
//             </div>
//             <div className="flex gap-2 items-center">
//               <FaArrowRight className="text-[#EBF2FE]" />
//               <p className="font-poppins text-[#EBF2FE]">Global network Access</p>
//             </div>
//           </div>
//         </div>
//       </div>


//       {/* Form */}
//       <div className="w-full lg:w-[50%] h-full flex items-center justify-center bg-white">
//         <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[400px] px-5 md:px-0">
//           <div className="w-full flex flex-col gap-3">
//             <h1 className="font-poppins font-bold text-[#0E0E0E] text-3xl">Welcome Back!</h1>
//             <p className="font-poppins text-[#7A7A7A]">Sign in to access the business directory</p>
//           </div>

//           {/* shadcn */}
//           <div className="w-full grid gap-3 items-center mt-12">
//             <label htmlFor="emailAddress" className="font-poppins text-[#252525]">Email Address</label>
//             <div className="relative w-full">
//               <Input type="text" id="emailAddress" placeholder="admin@business.com"
//                 className="font-poppins bg-[#F2F2F2] text-[#3F3F3F] text-base pl-10"
//                 {...register("emailAddress")} />
//               <CiMail className="absolute top-3 left-2.5 w-6 h-5" />
//             </div>
//             {errors.emailAddress && (
//               <p className="text-red-500 text-sm font-poppins">{errors.emailAddress.message}</p>
//             )}
//           </div>

//           <div className="w-full grid gap-3 items-center mt-6">
//             <label htmlFor="password" className="text-[#252525] font-poppins">Password</label>
//             <div className="relative w-full">
//               <Input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 placeholder="********"
//                 className="pr-10 pl-9 font-poppins bg-[#F2F2F2] text-black" // leave space for the eye button
//                 {...register("password")}
//               />
//               <CiLock className="absolute top-2.5 left-2.5 w-5 h-5" />
//               <button type="button" className="absolute right-3 top-3.5 cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}>
//                 {showPassword ? (
//                   <EyeOff className="h-4 w-4" />
//                 ) : (
//                   <Eye className="h-4 w-4" />
//                 )}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-sm font-poppins">{errors.password.message}</p>
//             )}
//           </div>

//           <div className="flex justify-end mt-6">
//             <Link href="/forget-password" className="font-poppins text-[#2459B1] text-sm">Forgot password?</Link>
//           </div>

//           <div className="w-full mt-8">
//             <Button type="submit" className="w-full font-poppins cursor-pointer bg-[#327EF9] text-base
//             text-[#E8E8E8] hover:scale-105 hover:shadow-lg" disabled={isSubmitting}>
//               {isSubmitting ? "Signing In..." : "Sign In"}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
