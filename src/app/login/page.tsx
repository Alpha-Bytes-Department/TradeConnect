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

// const SignInSchema = z.object({
//     emailAddress: z
//         .string()
//         .email("Invalid email address")
//         .toLowerCase()
//         .trim(),

//     password: z
//         .string()
//         .min(8, "Password must be at least 8 characters")
//         .regex(
//             /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
//             "Password must contain at least one uppercase letter, one lowercase letter and one number"
//         ),
// });

// // Type inference from schema
// type SignInFormData = z.infer<typeof SignInSchema>;

// export default function SignIn() {
//     const [showPassword, setShowPassword1] = useState(false);

//     const router = useRouter();

//     const {
//         register,
//         handleSubmit,
//         formState: { errors, isSubmitting },
//         setValue,
//     } = useForm<SignInFormData>({ // Add type parameter here
//         resolver: zodResolver(SignInSchema),
//         mode: "onChange", // Add this for immediate validation
//         defaultValues: {
//             emailAddress: "",
//             password: "",
//         }
//     });

//     const onSubmit = async (data: SignInFormData) => {
//         try {
//             // Simulate API call
//             await new Promise(resolve => setTimeout(resolve, 1000));
//             console.log("Form submitted:", data);
//             //router.push("/sign-in");
//             // Handle successful submission here
//         } catch (error) {
//             console.error("Submission error:", error);
//         }
//     };

//     return (
//         <div className="w-full h-screen flex">
//             {/* <div className="hidden lg:block lg:w-[50%] xl:w-[60%] 2xl:w-[70%] h-full bg-[url(/sign-up-images/stage.png)] bg-cover 
//             bg-center" /> */}
//             {/* The above will cause hydration error. The below is OK. */}

//             <div className="hidden lg:block lg:w-[50%] xl:w-[60%] 2xl:w-[70%] h-full relative">
//                 <Image src="/sign-up-images/stage.png" alt="background" fill className="object-cover object-center" />
//             </div>

//             {/* Form */}
//             <div className="w-full lg:w-[50%] xl:w-[40%] 2xl:w-[30%] h-full flex items-center justify-center bg-white">
//                 <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
//                     <div className="w-full flex flex-col gap-6">
//                         <Image src="/sign-up-images/logo.svg" alt="logo" width={50} height={50} />
//                         <div className="flex flex-col gap-3">
//                             <h1 className="font-inter font-semibold text-[#1E1E1E] text-xl">Welcome Back!</h1>
//                             <p className="font-inter text-[#6B7280] text-sm">Log in to connect, book, and manage with ease.</p>
//                         </div>
//                     </div>

//                     {/* shadcn */}
//                     <div className="w-full grid gap-3 items-center mt-12">
//                         <label htmlFor="emailAddress" className="font-inter text-sm">Email Address</label>
//                         <Input type="text" id="emailAddress" placeholder="Enter Your email "
//                             className="font-inter bg-[#F2F2F2] text-black" {...register("emailAddress")} />
//                         {errors.emailAddress && (
//                             <p className="text-red-500 text-sm font-poppins">{errors.emailAddress.message}</p>
//                         )}
//                     </div>

//                     <div className="w-full grid gap-3 items-center mt-6">
//                         <label htmlFor="password" className="text-[#333333] font-inter text-sm">Password</label>
//                         <div className="relative w-full">
//                             <Input
//                                 type={showPassword ? "text" : "password"}
//                                 id="password"
//                                 placeholder="Enter your password"
//                                 className="pr-10 font-inter bg-[#F2F2F2] text-black" // leave space for the eye button
//                                 {...register("password")}
//                             />
//                             <Button type="button" variant="ghost" className="absolute right-1 top-1/2 
//                             -translate-y-1/2 cursor-pointer"
//                                 onClick={() => setShowPassword1(!showPassword)}>
//                                 {showPassword ? (
//                                     <EyeOff className="h-4 w-4" />
//                                 ) : (
//                                     <Eye className="h-4 w-4" />
//                                 )}
//                             </Button>
//                         </div>
//                         {errors.password && (
//                             <p className="text-red-500 text-sm font-inter">{errors.password.message}</p>
//                         )}
//                     </div>

//                     <div className="flex justify-between mt-6">
//                         {/* shadcn switch */}
//                         <div className="flex items-center space-x-2">
//                             <Switch id="remember-me" />
//                             <label htmlFor="remember-me" className="font-inter text-sm">Remember me</label>
//                         </div>
//                         <Link href="/forget-password" className="font-inter text-[#235789] text-sm">Forgot password?</Link>
//                     </div>

//                     <div className="w-full mt-8">
//                         <Button type="submit" className="w-full font-inter cursor-pointer bg-[#235789] text-[#FFFFFF] 
//                         hover:scale-105 hover:shadow-lg" disabled={isSubmitting}>
//                             {isSubmitting ? "Logging In..." : "Log In"}
//                         </Button>
//                     </div>

//                     <div className="w-full flex gap-2 mt-8">
//                         <div className="w-1/2 h-[1px] bg-gray-300" />
//                         <p className="text-[#000000] font-inter -translate-y-1/2 text-sm">OR</p>
//                         <div className="w-1/2 h-[1px] bg-gray-300" />
//                     </div>

//                     <div className="w-full mt-4">
//                         <Button className="w-full flex gap-3 cursor-pointer bg-[#1E1E1E] hover:scale-105">
//                             <FcGoogle className="w-12 h-12" />
//                             <label className="text-[#FFFFFF] font-inter font-sm cursor-pointer">Log in with Google</label>
//                         </Button>
//                     </div>

//                     <div className="flex items-center justify-center gap-2 text-sm mt-6">
//                         <p className="text-[#000000] font-inter">Don’t have an account?</p>
//                         <Link href="/" className="text-blue-700 font-inter font-sm">
//                             Sign up now</Link>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }