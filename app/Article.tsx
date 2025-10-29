import { useRouter } from "next/navigation";
import { TArticle } from "./types";

export default function Article({ article }: { article: TArticle }) {
  const router = useRouter();
  return (
    <div
      className="max-[490px]:w-screen w-[30rem] h-fit bg-[#0c0c0c] rounded-md px-4 py-3"
      key={article.id}
      onClick={() => router.push(`/articles/${article.id}`)}
    >
      <div className="flex items-center gap-2">
        <img
          src={article.user.profile_image_90}
          alt="Profile picture"
          className="rounded-full w-[4rem]"
        />
        <h1 className="text-[1.2rem] font-bold">{article.user.username}</h1>
      </div>
      {article.cover_image && (
        <img src={article.cover_image as string} alt="Article cover image" />
      )}
      <h1>{article.title}</h1>
      <p>{article.description}</p>
    </div>
  );
}
