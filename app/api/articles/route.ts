import { TArticle } from "@/app/types";
import axios from "axios";
import { decode, verify } from "jsonwebtoken";
import { prisma } from "../init";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization")?.split(" ")[1];

    if (!authHeader || !verify(authHeader, process.env.JWT_SECRET as string))
      return new Response("Unauthorized", { status: 401 });

    const decoded: any = await decode(authHeader);
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") as string) || 1;
    let articles: TArticle[] = [];

    await axios
      .get(
        `https://dev.to/api/articles?tag=tech&per_page=10&page=${page}&lang=en`
      )
      .then(async (res) => {
        articles = res.data;
        await prisma.user.update({
          where: { id: decoded.id },
          data: {
            viewedBlogs: {
              increment: articles.length,
            },
          },
        });
      })
      .catch((err) => {
        return new Response(err.response.data, { status: err.response.status });
      });

    if (articles.length == 0)
      return new Response("No Articles Found", { status: 404 });

    return Response.json(articles);
  } catch (error: any) {
    console.log(error);

    return new Response(error, { status: 500 });
  }
}
