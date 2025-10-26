"use client";
import Error from "@/app/Error";
import { TArticleSpecific } from "@/app/types";
import axios from "axios";
import { getCookie } from "cookies-next";
import "highlight.js/styles/atom-one-dark.css";
import hljs from "highlight.js";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Article from "@/app/Article";

export default function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [article, setArticle] = useState<TArticleSpecific | null>(null);
  const [error, setError] = useState("");
  const articleRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const fetchArticle = () => {
    axios
      .get(`/api/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setArticle(res.data);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      alert("Please LogIn to View Specific Posts");
      router.push("/articles");
    }

    fetchArticle();
  }, []);
  useEffect(() => {
    hljs.highlightAll();
  }, [article]);

  return (
    <>
      <Article article={article as TArticleSpecific} className="mt-[10vh]" />
      {error && <Error error={error} />}
    </>
  );
}
