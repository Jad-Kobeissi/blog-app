import { Article } from "@/app/types";
import axios from "axios";

export async function GET(req: Request) {
  try {
    let articles: Article[] = [];

    await axios
      .get(`https://dev.to/api/articles?tag=tech&per_page=5`)
      .then((res) => (articles = res.data.articles));

    if (articles.length == 0)
      return new Response("No articles found", { status: 404 });

    return Response.json(articles);
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
