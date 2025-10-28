"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UseUser } from "../contexts/UserContext";
import { setCookie } from "cookies-next";
import Error from "../Error";
import Link from "next/link";
import Loading from "../Loading";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = UseUser();
  return loading ? (
    <Loading className="w-screen h-screen flex items-center justify-center" />
  ) : (
    <div>
      <form
        className="flex flex-col items-center justify-center h-screen gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setError("");
          setLoading(true);
          axios
            .post("/api/signup", {
              username,
              password,
            })
            .then((res) => {
              setUser(res.data.user);
              setCookie("token", res.data.token);
              router.push("/articles");
            })
            .catch((err) => {
              setError(err.response.data);
              setLoading(false);
            });
        }}
      >
        <h1 className="text-[3rem] font-bold text-center">SignUp</h1>
        <p className="text-(--secondary-text)">
          Your gateway to the tech blog universe starts here
        </p>
        {error && <Error error={error} />}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="bg-(--secondary-background) px-16 rounded-md py-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-(--secondary-background) px-16 rounded-md py-2"
              id="password"
            />
          </div>
          <button className="bg-[#3471eb] w-full py-1 font-bold rounded-md text-[1.2rem]">
            SignUp
          </button>
          <div className="relative group w-fit">
            <Link href={"/login"}>Already have An Account? LogIn Here</Link>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full bg-[#d9d9d9] transition-all duration-200"></span>
          </div>
        </div>
      </form>
    </div>
  );
}
