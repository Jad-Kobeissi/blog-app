"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UseUser } from "../contexts/UserContext";
import { setCookie } from "cookies-next";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = UseUser();
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          axios
            .post("/api/signup", {
              username,
              password,
            })
            .then((res) => {
              router.push("/articles");
              setUser(res.data.user);
              setCookie("token", res.data.token);
            })
            .catch((err) => {
              setError(err.response.data);
            });
        }}
      >
        {error && <h1>{error}</h1>}
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>SignUp</button>
      </form>
    </div>
  );
}
