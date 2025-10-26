"use client";
import Error from "@/app/Error";
import { TArticleSpecific } from "@/app/types";
import axios from "axios";
import { getCookie } from "cookies-next";
import "highlight.js/styles/atom-one-dark.css";
import hljs from "highlight.js";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

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
    <div className="flex flex-col items-center justify-center mt-[10vh] gap-4">
      {article?.cover_image && (
        <img
          src={article?.cover_image as string}
          alt="Cover Image"
          className="w-160"
        />
      )}
      <div className="flex items-center gap-2">
        <img
          src={article?.user.profile_image_90}
          alt="Profile Picture"
          className="rounded-full "
        />
        <h1 className="text-[1.3rem]">{article?.user.name}</h1>
      </div>
      <h1 className="font-bold text-[2.3rem] text-center">{article?.title}</h1>
      <div className="flex justify-center items-center w-fit">
        <div
          dangerouslySetInnerHTML={{
            __html: article?.body_html as string,
          }}
          ref={articleRef}
          className="flex text-left flex-col w-1/2 article"
        />
      </div>

      {error && <Error error={error} />}
    </div>
  );
}
