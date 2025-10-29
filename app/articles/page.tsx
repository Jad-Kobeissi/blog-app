"use client";
import { useEffect, useState } from "react";
import { UseUser } from "../contexts/UserContext";
import { useRouter } from "next/navigation";
import { TArticle } from "../types";
import axios from "axios";
import { getCookie } from "cookies-next";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../Loading";
import Article from "../Article";
export default function News() {
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<TArticle[]>([]);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { user } = UseUser();
  const router = useRouter();
  const fetchArticles = () => {
    axios
      .get(`/api/articles?page=${page}`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setArticles((prev) => {
          const combined = [...prev, ...res.data];
          const unique = Array.from(
            new Map(combined.map((a) => [a.id, a])).values()
          );

          return unique;
        });
        setPage((prev) => prev + 1);
      })
      .catch((err) => {
        setError(err.response.data);
        setHasMore(false);
      });
  };
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/articles/guest");
      return;
    }

    fetchArticles();
  }, []);
  return (
    <div>
      <h1 className="text-[1.3rem] font-bold text-center my-[10vh]">
        Welcome {user?.username}
      </h1>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchArticles}
        loader={<Loading />}
        hasMore={hasMore}
        className="flex flex-col gap-4 items-center mt-[10vh]"
      >
        {articles.map((article) => (
          <>
            <Article article={article as TArticle} key={article.id} />
          </>
        ))}
      </InfiniteScroll>
    </div>
  );
}
