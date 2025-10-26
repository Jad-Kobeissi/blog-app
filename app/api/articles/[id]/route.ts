import axios from "axios";
import { verify } from "jsonwebtoken";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = req.headers.get("Authorization")?.split(" ")[1];

    if (!authHeader || !verify(authHeader, process.env.JWT_SECRET as string))
      return new Response("Unauthorized", { status: 401 });

    const { id } = await params;
    let post;
    await axios
      .get(`https://dev.to/api/articles/${id}`)
      .then((res) => (post = res.data))
      .catch((err) => {
        if (err.response.status == 404)
          return new Response("Article Not Found", { status: 404 });

        return new Response(err, { status: 500 });
      });

    return Response.json(post);
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
