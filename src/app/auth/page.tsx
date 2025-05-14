"use client";
import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { UserLogin, UserSignUp } from "@/utils/Auth";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/store";
import { login, signup } from "@/lib/features/auth/authSlice";
import LoadingScreen from "@/components/LoadingFullScreen";

function LoginPage() {
  const [showSignup, setShowSignup] = useState(false);
  const toggleSignup = useCallback(() => setShowSignup((prev) => !prev), []);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated]);

  const pageVariants = {
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
  const childVariants = {
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
  const coinVariants = {
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(login(formLogin));
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const [formRegister, setFormRegister] = useState<UserSignUp>({
    username: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(signup(formRegister));
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-[url('/assets/pattern/bg.png')] bg-cover">
      {isLoading && <LoadingScreen />}

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
                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={formLogin.password}
                        onChange={(e) =>
                          setFormLogin({
                            ...formLogin,
                            password: e.target.value,
                          })
                        }
                        className="px-4 py-3 rounded-lg border border-[#A25DF9] bg-white shadow-[0px_16px_20px_-6px_rgba(194,140,255,0.05),0px_24px_48px_-10px_rgba(76,28,130,0.16)] focus:outline-none focus:ring-2 focus:ring-[#A25DF9] focus:border-transparent transition-all duration-300"
                      />
                    </motion.div>
                    <button
                      onClick={handleLogin}
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
                    </motion.div>
                    <motion.div
                      className="flex flex-col space-y-2 w-full"
                      variants={childVariants}
                    >
                      <label
                        htmlFor="password"
                        className="text-black font-rubik text-[16px] font-medium"
                      >
                        Password*
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={formRegister.password}
                        onChange={(e) =>
                          setFormRegister({
                            ...formRegister,
                            password: e.target.value,
                          })
                        }
                        className="px-4 py-3 rounded-lg border border-[#A25DF9] bg-white shadow-[0px_16px_20px_-6px_rgba(194,140,255,0.05),0px_24px_48px_-10px_rgba(76,28,130,0.16)] focus:outline-none focus:ring-2 focus:ring-[#A25DF9] focus:border-transparent transition-all duration-300"
                      />
                    </motion.div>
                    <button
                      onClick={handleSignup}
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
