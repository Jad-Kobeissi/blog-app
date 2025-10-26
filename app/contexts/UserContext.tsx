"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { TUser } from "../types";

export interface TUserContext {
  user: TUser | null;
  setUser: (user: TUser) => void;
  logout: () => void;
}
export const userContext = createContext<TUserContext | null>(null);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<TUser | null>(null);

  const setUser = (user: TUser) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUserState(user);
  };
  const logout = () => {
    setUserState(null);
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUserState(JSON.parse(localStorage.getItem("user") as string));
    }
  }, []);
  return (
    <userContext.Provider value={{ user, setUser, logout }}>
      {children}
    </userContext.Provider>
  );
}

export function UseUser() {
  const context = useContext(userContext);

  if (!context) throw new Error("Context not found");
  return context;
}
