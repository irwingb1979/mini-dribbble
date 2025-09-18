import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";

import Link from "next/link";
import { IoHeart } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5"

const POST_QUERY = `*[_type == "shot" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,
  author->{name, avatar},
  likes,
  views,
  image
}`;


const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(source)
        : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);
    const postImageUrl = post.image
        ? urlFor(post.image)?.width(550).height(310).url()
        : null;

    return (
        <main className="container mx-auto min-h-screen p-8 flex flex-col gap-4">
            <div className="shot-content-container container mx-auto max-w-4xl">
                <Link href="/" className="hover:underline">
                    ← Back to posts
                </Link>
                <div className="shot-header">
                    <h1 className="text-4xl font-bold mb-3">{post.title}</h1>
                </div>
                <div className="sticky-header__container flex justify-around items-center pb-8">
                    <div className="sticky-header__user-container flex-1 font-bold">
                        <div className="pr-1 inline-block align-middle">
                            {post.author.avatar && (
                                <img
                                    src={urlFor(post.author.avatar)?.url() || ""}
                                    alt={post.author.name}
                                    className="inline-block h-8 w-8 rounded-full"
                                />
                            )}
                        </div>
                        <div className="inline-block ml-1 align-middle">
                            {post.author.name}
                        </div>
                    </div>
                    <div className="sticky-header__actions flex gap-4">
                        {/* Like button */}
                        <button className="flex items-center gap-1 rounded-full border border-gray-200 
                        w-[40px] h-[40px] justify-center text-gray-700 hover:bg-gray-100">
                            <IoHeart className="text-gray-400 hover:text-pink-500" />
                        </button>

                        {/* Save/Collection icon */}
                        <button className="flex items-center gap-1 rounded-full border border-gray-200 w-[40px] h-[40px] justify-center text-gray-700 hover:bg-gray-100">
                            <IoBookmark className="text-gray-400 hover:text-blue-500" />
                        </button>

                        {/* Get in touch button */}
                        <button className="rounded-full bg-black px-6 py-2 text-sm font-medium text-white hover:bg-gray-800">
                            Get in touch
                        </button>
                    </div>
                </div>
                <div className="block-media-image">
                    {postImageUrl && (
                        <img
                            src={postImageUrl}
                            alt={post.title}
                            className="aspect-video rounded-lg w-full"
                            width="550"
                            height="310"
                        />
                    )}
                </div>

            </div>
        </main>
    );
}