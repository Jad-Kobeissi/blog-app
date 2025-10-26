"use client";
import { useEffect, useState } from "react";
import { UseUser } from "../contexts/UserContext";
import { useRouter } from "next/navigation";
import { TArticle } from "../types";
import axios from "axios";
import { getCookie } from "cookies-next";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../Loading";
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
        setArticles((prev) => [...prev, ...res.data]);
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
      <h1>Welcome {user?.username}</h1>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchArticles}
        loader={<Loading />}
        hasMore={hasMore}
        className="flex flex-col gap-4 items-center mt-[20vh]"
      >
        {articles.map((article) => (
          <div
            className="max-[490px]:w-screen w-[30rem] h-fit"
            key={article.id}
            onClick={() => router.push(`/articles/${article.id}`)}
          >
            <h1>{article.id}</h1>
            <div className="flex items-center gap-2">
              <img
                src={article.user.profile_image_90}
                alt="Profile picture"
                className="rounded-full w-[4rem]"
              />
              <h1 className="text-[1.2rem] font-bold">
                {article.user.username}
              </h1>
            </div>
            {article.cover_image && (
              <img
                src={article.cover_image as string}
                alt="Article cover image"
              />
            )}
            <h1>{article.title}</h1>
            <p>{article.description}</p>
          </div>
        ))}
      </InfiniteScroll>
      {error && <h1>{error}</h1>}
    </div>
  );
}
