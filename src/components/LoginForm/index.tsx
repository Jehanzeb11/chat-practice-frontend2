"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { baseURl } from "@/config/api";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getUser, loginUser } from "@/redux/userSlice";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import Image from "next/image";
import sideImg from "../../assets/login-side-img.png"
const LoginForm = () => {
    const router = useRouter();
    
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { user, loading, error, token } = useSelector(
    (state: any) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password,router }));
  };

  return (
    <>



    <div className="loginBg h-screen flex justify-between gap-4 items-center md:p-4 p-2 ">
      <div className="h-full md:w-1/2 w-full p-4 blurLoginbg rounded-md">
        <Image
          src={
            "https://www.famebusinesssolutions.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffbs-white.c89facc6.png&w=384&q=75"
          }
          width={120}
          height={120}
          alt="logo"
          className="mb-16"
        />
        <div className="xl:conatainer  xl:mx-10 mx-4">
          <div className="xl:container">
            <h1 className="xl:text-8xl lg:text-6xl text-5xl text-center text-gray-300 my-5">
              Hi There!
            </h1>
            <p className="xl:text-base text-xs text-center text-gray-300 my-5">
              Welcome to Fame Business Solutions Chat
            </p>
            <div className=" w-full flex justify-center items-center">
              <form
                className="flex justify-center items-center flex-col gap-6 w-full p-6"
                onSubmit={handleSubmit}
              >
                <input
                  type="email"
                  className="lg:w-[75%] w-full p-2 border-[0.5px] font-light outline-none rounded-lg text-base text-white bg-transparent"
                  placeholder="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="lg:w-[75%] w-full p-2 border-[0.5px] font-light outline-none rounded-lg text-base text-white bg-transparent"
                  placeholder="passsword"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="lg:w-[75%] w-full flex justify-end p-0 m-0">
                  <Button variant={"link"} className="text-indigo-300">
                    Forgot Password
                  </Button>
                </div>

                <Button className="lg:w-[75%] w-full text-center bg-indigo-900 hover:bg-indigo-950 text-slate-100 rounded-full text-lg py-6">
                  Login
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

<div className="h-full w-1/2 max-md:hidden p-4 ">

<div className="h-full flex justify-center items-center">


<Image
          src={
              sideImg
            }
            
            width={600}
            height={600}
            alt="logo"
            />
            </div>

</div>

    </div>

    </>

  );
};

export default LoginForm;
