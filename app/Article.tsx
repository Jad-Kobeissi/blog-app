import { TArticleSpecific } from "./types";

export default function Article({
  article,
  className,
}: {
  article: TArticleSpecific;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-start gap-4 ${className}`}
    >
      <div className="relative flex flex-col items-center justify-center w-full">
        {article?.cover_image && (
          <img
            src={article?.cover_image as string}
            alt="Cover Image"
            className="w-[50rem] h-[30rem] rounded-lg"
          />
        )}
      </div>
      <div className="flex flex-col gap-5 justify-center items-center bg-[#] w-fit h-fit">
        <div className="flex gap-2 items-center">
          <img
            src={article?.user.profile_image_90}
            alt="Profile Picture"
            className="rounded-full w-16"
          />
          <h1 className="text-[1.1rem] ">{article?.user.name}</h1>
        </div>
        <h1 className="font-bold text-[2.3rem] text-center">
          {article?.title}
        </h1>
        <div className="flex justify-center">
          <div
            dangerouslySetInnerHTML={{
              __html: article?.body_html as string,
            }}
            className="flex text-left flex-col max-[550px]:w-screen w-1/2 article px-4"
          />
        </div>
      </div>
    </div>
  );
}
