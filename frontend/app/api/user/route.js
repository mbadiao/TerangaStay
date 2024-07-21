import { connectDataBase } from "../../../lib/mongodb";
export async function POST(req) {
  const { name, email } = await req.json();
  await connectDataBase();
}
