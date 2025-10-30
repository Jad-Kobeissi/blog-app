import { useRouter } from "next/navigation";
import { TArticle } from "./types";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
export default function Article({ article }: { article: TArticle }) {
  const router = useRouter();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.2 }}
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
    </motion.div>
  );
}
