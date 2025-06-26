"use client";
import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { UserLogin, UserSignUp } from "../../utils/Auth";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../lib/store";
import { login, signup } from "../../lib/features/auth/authSlice";
import LoadingScreen from "../../components/LoadingFullScreen";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "../../hooks/use-toast";
import { getAndClearRedirectUrl } from "../../utils/redirectUtils";

function LoginPage() {
  const [showSignup, setShowSignup] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const toggleSignup = useCallback(() => setShowSignup((prev) => !prev), []);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const user = useAppSelector((state) => state.auth.user);
  const [registerErrors, setRegisterErrors] = useState<{
    [key: string]: string;
  }>({});
  const [loginErrors, setLoginErrors] = useState<{ [key: string]: string }>({});
  useEffect(() => {
    if (user) {
      // Check for saved redirect URL
      const redirectUrl = getAndClearRedirectUrl();

      if (redirectUrl) {
        // Redirect to the saved URL
        router.push(redirectUrl);
      } else {
        // Default redirect behavior
        if (user.role === "ADMIN" || user.role === "REVIEWER") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      }
    }
  }, [user, router]);

  const pageVariants: Variants = {
    loginInitial: { x: "100%", opacity: 0, scale: 0.9 },
    signupInitial: { x: "-100%", opacity: 0, scale: 0.9 },
    active: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 1,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    loginExit: {
      x: "-100%",
      opacity: 0,
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 1,
      },
    },
    signupExit: {
      x: "100%",
      opacity: 0,
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 1,
      },
    },
  };

  // Animation for child elements
  const childVariants: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.2 },
    },
    exit: {
      y: 20,
      opacity: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  // Coin animation
  const coinVariants: Variants = {
    initial: { scale: 0.5, opacity: 0, rotate: -10 },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.4, // sedikit lebih lama agar terlihat smooth
      },
    },
    exit: {
      scale: 0.5,
      opacity: 0,
      rotate: 10,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const [formLogin, setFormLogin] = useState<UserLogin>({
    loginIdentifier: "",
    password: "",
  });

  const validateLogin = () => {
    const errors: { [key: string]: string } = {};
    if (!formLogin.loginIdentifier.trim())
      errors.loginIdentifier = "Email or Username is required";
    if (!formLogin.password) errors.password = "Password is required";
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;
    try {
      await dispatch(login(formLogin)).unwrap();
      toast({
        title: "Success",
        description: "Login successful! Redirecting...",
        variant: "default",
      });

      // The redirect will happen automatically via useEffect when user state changes
    } catch (err: any) {
      toast({
        title: "Authentication Failed",
        description:
          typeof err === "string"
            ? err
            : "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  const [formRegister, setFormRegister] = useState<UserSignUp>({
    username: "",
    email: "",
    password: "",
  });

  const validateRegister = () => {
    const errors: { [key: string]: string } = {};
    if (!formRegister.username.trim()) errors.username = "Username is required";
    if (!formRegister.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formRegister.email))
      errors.email = "Email is invalid";
    if (!formRegister.password) errors.password = "Password is required";
    else if (formRegister.password.length < 8)
      errors.password = "Password must be at least 8 characters";
    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegister()) return;

    try {
      await dispatch(signup(formRegister)).unwrap();

      toast({
        title: "Registration Successful",
        description: "Your account has been created! Please log in.",
        variant: "default",
      });

      // Reset form and switch to login view
      setFormRegister({
        username: "",
        email: "",
        password: "",
      });
      setShowSignup(false);
    } catch (err: any) {
      const errorMessage =
        typeof err === "string"
          ? err
          : "Registration failed. Please try again with different credentials.";

      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-[url('/assets/pattern/bg.png')] bg-cover">
      {isLoading && <LoadingScreen message="Authenticating..." />}

      <AnimatePresence initial={false} mode="wait">
        {!showSignup ? (
          <motion.div
            key="login-container"
            className="w-full h-screen flex justify-center items-center"
            initial="loginInitial"
            animate="active"
            exit="loginExit"
            variants={pageVariants}
          >
            <div className="w-full flex h-screen justify-center items-center">
              {/* Left side - Cardano info with orange/gold coin */}
              <div className="hidden relative w-[45%] h-full bg-[url('/assets/pattern/loginbg.png')] bg-cover lg:flex flex-col justify-center items-center">
                <motion.div
                  variants={coinVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute top-0 -right-32 transform translate-x-1/2 "
                >
                  <Image
                    src="/assets/cardano-gold.svg"
                    width={400}
                    height={400}
                    alt="logo"
                  />
                </motion.div>
                <motion.div
                  className="mt-36 space-y-3 w-[80%] p-11 rounded-[55px] bg-white/5 shadow-[2px_4px_23.2px_0px_rgba(0,0,0,0.25)] backdrop-blur-[10px]"
                  variants={childVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <h1 className="text-white font-rubik text-[40px] font-medium mb-4">
                    Apa Itu Blockchain untuk Inspeksi Mobil?
                  </h1>
                  <p className="text-white text-justify font-rubik text-[16px] font-normal leading-[27px]">
                    Blockchain adalah teknologi penyimpanan data yang aman dan
                    tidak bisa diubah. Bayangkan seperti catatan permanen yang
                    tersimpan di banyak komputer sekaligus, sehingga tidak ada
                    yang bisa memalsukan atau menghapusnya. Dalam inspeksi mobil
                    bekas, blockchain digunakan untuk mencatat hasil pemeriksaan
                    secara transparan.
                  </p>
                  <p className="w-full text-right text-white font-rubik text-[16px] font-normal leading-[27px] mt-4">
                    Pelajari lebih lanjut -&gt;
                  </p>
                </motion.div>
              </div>

              {/* Right side - Login form */}
              <div className="w-full lg:w-[55%] h-full flex flex-col justify-center items-center bg-white">
                <div className="w-[85%] lg:w-[60%] flex flex-col items-start justify-center">
                  <motion.h1
                    className="bg-gradient-to-r from-[#FF7D43] to-[#A25DF9] bg-clip-text text-transparent 
    font-rubik text-[60px] font-bold leading-[70px] mb-4 pb-2"
                    variants={childVariants}
                  >
                    Login
                  </motion.h1>

                  <motion.form
                    className="flex flex-col space-y-6 w-full mb-8"
                    variants={childVariants}
                    onSubmit={handleLogin}
                  >
                    <motion.div
                      className="flex flex-col space-y-2 w-full"
                      variants={childVariants}
                    >
                      <label
                        htmlFor="email"
                        className="text-black font-rubik text-[16px] font-medium"
                      >
                        Email or Username
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your email address or username"
                        value={formLogin.loginIdentifier}
                        onChange={(e) =>
                          setFormLogin({
                            ...formLogin,
                            loginIdentifier: e.target.value,
                          })
                        }
                        className="px-4 py-3 rounded-lg border border-[#A25DF9] bg-white shadow-[0px_16px_20px_-6px_rgba(194,140,255,0.05),0px_24px_48px_-10px_rgba(76,28,130,0.16)] focus:outline-none focus:ring-2 focus:ring-[#A25DF9] focus:border-transparent transition-all duration-300"
                      />
                      {loginErrors.loginIdentifier && (
                        <span className="text-red-500 text-sm">
                          {loginErrors.loginIdentifier}
                        </span>
                      )}
                    </motion.div>
                    <motion.div
                      className="flex flex-col space-y-2 w-full"
                      variants={childVariants}
                    >
                      <label
                        htmlFor="password"
                        className="text-black font-rubik text-[16px] font-medium"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formLogin.password}
                          onChange={(e) =>
                            setFormLogin({
                              ...formLogin,
                              password: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 pr-12 rounded-lg border border-[#A25DF9] bg-white shadow-[0px_16px_20px_-6px_rgba(194,140,255,0.05),0px_24px_48px_-10px_rgba(76,28,130,0.16)] focus:outline-none focus:ring-2 focus:ring-[#A25DF9] focus:border-transparent transition-all duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#A25DF9]"
                        >
                          {showPassword ? (
                            <FiEyeOff size={20} />
                          ) : (
                            <FiEye size={20} />
                          )}
                        </button>
                      </div>
                      {loginErrors.password && (
                        <span className="text-red-500 text-sm">
                          {loginErrors.password}
                        </span>
                      )}
                    </motion.div>
                    <button
                      type="submit"
                      className="gradient-button-2 w-full py-3 rounded-lg text-white font-rubik text-[18px] font-medium "
                    >
                      Log in
                    </button>
                  </motion.form>

                  <motion.p
                    className="text-black font-rubik text-[16px] font-normal"
                    variants={childVariants}
                  >
                    Don&apos;t have an account?{" "}
                    <a
                      className="text-[#FF6B6B] font-bold cursor-pointer hover:underline"
                      onClick={toggleSignup}
                    >
                      Sign up
                    </a>
                  </motion.p>

                  <motion.div
                    className="flex items-center justify-center w-full mt-8 gap-10"
                    variants={childVariants}
                  >
                    <div className="w-full h-[1px] bg-[#A25DF9] bg-opacity-50"></div>
                    <p className="text-black font-rubik text-[16px] font-bold leading-none">
                      OR
                    </p>
                    <div className="w-full h-[1px] bg-[#A25DF9] bg-opacity-50"></div>
                  </motion.div>

                  <motion.button
                    className="mt-6 py-3 flex items-center justify-center w-full py-2.5 rounded-lg border border-gray-300 text-black font-rubik text-[16px] font-medium bg-white hover:bg-gray-50 transition-colors duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                    variants={childVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Image
                      src="/assets/google.svg"
                      width={24}
                      height={24}
                      alt="google"
                      className="mr-2"
                    />
                    <span>Login with Google</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="signup-container"
            className="w-full h-screen flex justify-center items-center"
            initial="signupInitial"
            animate="active"
            exit="signupExit"
            variants={pageVariants}
          >
            <div className="w-full flex h-screen justify-center items-center">
              {/* Left side - Signup form */}
              <div className="w-full lg:w-[55%] h-full flex flex-col justify-center items-center bg-white">
                <div className="w-[85%] lg:w-[60%] flex flex-col items-start justify-center">
                  <motion.h1
                    className="bg-gradient-to-r from-[#FF7D43] to-[#A25DF9] bg-clip-text text-transparent  font-rubik text-[60px] font-bold mb-4 leading-none"
                    variants={childVariants}
                  >
                    Create a free account
                  </motion.h1>

                  <motion.form
                    className="flex flex-col space-y-6 w-full mb-8"
                    variants={childVariants}
                    onSubmit={handleSignup}
                  >
                    <motion.div
                      className="flex flex-col space-y-2 w-full"
                      variants={childVariants}
                    >
                      <label
                        htmlFor="username"
                        className="text-black font-rubik text-[16px] font-medium"
                      >
                        Username*
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your username"
                        value={formRegister.username}
                        onChange={(e) =>
                          setFormRegister({
                            ...formRegister,
                            username: e.target.value,
                          })
                        }
                        className="px-4 py-3 rounded-lg border border-[#A25DF9] bg-white shadow-[0px_16px_20px_-6px_rgba(194,140,255,0.05),0px_24px_48px_-10px_rgba(76,28,130,0.16)] focus:outline-none focus:ring-2 focus:ring-[#A25DF9] focus:border-transparent transition-all duration-300"
                      />
                      {registerErrors.username && (
                        <span className="text-red-500 text-sm">
                          {registerErrors.username}
                        </span>
                      )}
                    </motion.div>
                    <motion.div
                      className="flex flex-col space-y-2 w-full"
                      variants={childVariants}
                    >
                      <label
                        htmlFor="email"
                        className="text-black font-rubik text-[16px] font-medium"
                      >
                        Email*
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={formRegister.email}
                        onChange={(e) =>
                          setFormRegister({
                            ...formRegister,
                            email: e.target.value,
                          })
                        }
                        className="px-4 py-3 rounded-lg border border-[#A25DF9] bg-white shadow-[0px_16px_20px_-6px_rgba(194,140,255,0.05),0px_24px_48px_-10px_rgba(76,28,130,0.16)] focus:outline-none focus:ring-2 focus:ring-[#A25DF9] focus:border-transparent transition-all duration-300"
                      />
                      {registerErrors.email && (
                        <span className="text-red-500 text-sm">
                          {registerErrors.email}
                        </span>
                      )}
                    </motion.div>
                    <motion.div
                      className="flex flex-col space-y-2 w-full"
                      variants={childVariants}
                    >
                      <label
                        htmlFor="password"
                        className="text-black font-rubik text-[16px] font-medium"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showRegisterPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formRegister.password}
                          onChange={(e) =>
                            setFormRegister({
                              ...formRegister,
                              password: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 pr-12 rounded-lg border border-[#A25DF9] bg-white shadow-[0px_16px_20px_-6px_rgba(194,140,255,0.05),0px_24px_48px_-10px_rgba(76,28,130,0.16)] focus:outline-none focus:ring-2 focus:ring-[#A25DF9] focus:border-transparent transition-all duration-300"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowRegisterPassword(!showRegisterPassword)
                          }
                          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#A25DF9]"
                        >
                          {showRegisterPassword ? (
                            <FiEyeOff size={20} />
                          ) : (
                            <FiEye size={20} />
                          )}
                        </button>
                      </div>
                      {registerErrors.password && (
                        <span className="text-red-500 text-sm">
                          {registerErrors.password}
                        </span>
                      )}
                    </motion.div>
                    <button
                      type="submit"
                      className="gradient-button-2 w-full py-3 rounded-lg text-white font-rubik text-[18px] font-medium "
                    >
                      Sign Up
                    </button>
                  </motion.form>

                  <motion.p
                    className="text-black font-rubik text-[16px] font-normal"
                    variants={childVariants}
                  >
                    Already have an account?{" "}
                    <a
                      className="text-[#FF6B6B] font-bold cursor-pointer hover:underline"
                      onClick={toggleSignup}
                    >
                      Log in
                    </a>
                  </motion.p>

                  <motion.p
                    className="text-gray-500 text-sm mt-6"
                    variants={childVariants}
                  >
                    By creating an account, you agree to our{" "}
                    <a href="#" className="text-[#FF6B6B] underline">
                      terms of use
                    </a>
                    .
                  </motion.p>
                </div>
              </div>

              {/* Right side - Cardano info with blue coin */}
              <div className="hidden l relative w-[45%] h-full bg-[url('/assets/pattern/loginbg.png')] bg-cover  lg:flex flex-col justify-center items-center ">
                <motion.div
                  variants={coinVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute top-0 -left-32"
                >
                  <Image
                    src="/assets/cardano-blue.svg"
                    width={400}
                    height={400}
                    alt="logo"
                  />
                </motion.div>
                <motion.div
                  className="mt-36 space-y-3 w-[80%] p-11 rounded-[55px] bg-white/5 shadow-[2px_4px_23.2px_0px_rgba(0,0,0,0.25)] backdrop-blur-[10px]"
                  variants={childVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <h1 className="text-white font-rubik text-[40px] font-medium mb-4">
                    Apa Itu Blockchain untuk Inspeksi Mobil?
                  </h1>
                  <p className="text-white text-justify font-rubik text-[16px] font-normal leading-[27px]">
                    Blockchain adalah teknologi penyimpanan data yang aman dan
                    tidak bisa diubah. Bayangkan seperti catatan permanen yang
                    tersimpan di banyak komputer sekaligus, sehingga tidak ada
                    yang bisa memalsukan atau menghapusnya. Dalam inspeksi mobil
                    bekas, blockchain digunakan untuk mencatat hasil pemeriksaan
                    secara transparan.
                  </p>
                  <p className="w-full text-right text-white font-rubik text-[16px] font-normal leading-[27px] mt-4">
                    Pelajari lebih lanjut -&gt;
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LoginPage;
