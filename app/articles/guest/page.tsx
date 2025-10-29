"use client";
import Article from "@/app/Article";
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
        setArticles((prev) => {
          const combined = [...prev, ...res.data];

          const unique = Array.from(
            new Map(combined.map((a) => [a.id, a])).values()
          );

          return unique as any;
        });
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };
  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <div className="flex flex-col items-center mt-50">
      {user == null ? (
        <h1 className="text-[1.3rem] mb-8">
          <Link href={"/login"} className="underline font-bold">
            LogIn
          </Link>{" "}
          to view more articles
        </h1>
      ) : (
        <h1>Welcome {user.username}</h1>
      )}
      <div className="flex flex-col gap-8">
        {articles.map((article) => (
          <Article article={article} key={article.id} />
        ))}
      </div>
      {error && <Error error={error} />}
    </div>
  );
}
