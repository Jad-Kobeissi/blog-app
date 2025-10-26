"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UseUser } from "../contexts/UserContext";
import { setCookie } from "cookies-next";
import Error from "../Error";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = UseUser();
  return (
    <div>
      <form
        className="flex flex-col items-center justify-center h-screen gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setError("");
          axios
            .post("/api/login", {
              username,
              password,
            })
            .then((res) => {
              setUser(res.data.user);
              setCookie("token", res.data.token);
              router.push("/news");
            })
            .catch((err) => {
              setError(err.response.data);
            });
        }}
      >
        <h1 className="text-[2rem] font-bold text-center">LogIn</h1>
        {error && <Error error={error} />}
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="bg-(--secondary-background) px-6 rounded-md py-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-(--secondary-background) px-6 rounded-md py-2"
            id="password"
          />
        </div>
        <div className="relative group">
          <Link href={"/signup"}>Dont have An Account? SignUp Here</Link>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full bg-[#d9d9d9] transition-all duration-200"></span>
        </div>
        <button className="bg-[#3471eb] px-4 py-1 font-bold rounded-md text-[1.2rem]">
          LogIn
        </button>
      </form>
    </div>
  );
}
