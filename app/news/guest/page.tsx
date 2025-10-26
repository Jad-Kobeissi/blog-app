"use client";
import { UseUser } from "@/app/contexts/UserContext";
import { Article } from "@/app/types";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GuestNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const { user } = UseUser();
  const fetchArticles = () => {
    axios.get("/api/articles/guest").then((res) => {
      setArticles(res.data);
    });
  };
  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <>
      {user == null ? (
        <h1>
          <Link href={"/login"} className="underline font-bold">
            LogIn
          </Link>{" "}
          to view more articles
        </h1>
      ) : (
        <h1>Welcome {user.username}</h1>
      )}
      {articles.map((article) => (
        <div className="border border-red-500">
          <h1>{article.title}</h1>
        </div>
      ))}
    </>
  );
}
