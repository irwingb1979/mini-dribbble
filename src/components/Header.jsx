import { client } from "@/sanity/client";
import HeaderClient from "./HeaderClient";

const POSTS_QUERY = `*[_type == "shot" && defined(slug.current)]{ author->{name, slug, avatar} }[0]`;
const options = { next: { revalidate: 30 } };

export default async function Header() {
  const post = await client.fetch(POSTS_QUERY, {}, options);

  return <HeaderClient author={post.author} slug={post.slug} />;
}
