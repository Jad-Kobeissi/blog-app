"use client";
import { UseUser } from "@/app/contexts/UserContext";
import Error from "@/app/Error";
import { TArticle } from "@/app/types";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GuestNews() {
  const [articles, setArticles] = useState<TArticle[]>([]);
  const [error, setError] = useState("");
  const { user } = UseUser();
  const fetchArticles = () => {
    axios
      .get("/api/articles/guest")
      .then((res) => {
        setArticles((prev) => [...prev, ...res.data]);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };
  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <div className="flex flex-col items-center">
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
        <div className="border">
          <h1>{article.title}</h1>
        </div>
      ))}
      {error && <Error error={error} />}
    </div>
  );
}
