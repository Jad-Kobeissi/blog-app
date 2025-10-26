import { compare } from "bcrypt";
import { prisma } from "../init";
import { isEmpty } from "../isEmpty";
import { sign } from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password || isEmpty([username, password]))
      return new Response("Please fill all fields", { status: 400 });

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) return new Response("Username Taken", { status: 409 });

    const passMatches = await compare(password, user.password);

    if (!passMatches)
      return new Response("Incorrect Password", { status: 400 });

    const token = await sign(
      { id: user.id, username },
      process.env.JWT_SECRET as string
    );

    return Response.json({ token, user });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
