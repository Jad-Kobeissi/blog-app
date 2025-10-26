import { TArticle } from "@/app/types";
import axios from "axios";

export async function GET(req: Request) {
  try {
    let articles: TArticle[] = [];

    await axios
      .get(`https://dev.to/api/articles?tag=tech&per_page=5&lang=en`)
      .then((res) => (articles = res.data))
      .catch((err) => {
        return new Response(err.response.data, { status: 500 });
      });

    if (articles.length == 0)
      return new Response("No articles found", { status: 404 });

    return Response.json(articles);
  } catch (error: any) {
    console.log(error);

    return new Response(error, { status: 500 });
  }
}
