import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";

import { IoHeart } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";

import Modal from "@/components/Modal";

const POSTS_QUERY = `*[
  _type == "shot"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, author->{name, avatar, slug}, likes, views, image}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <>
      <main className="container mx-auto min-h-screen px-4 py-8">
        <div className="menu mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Recent Shots</h1>
          <nav className="space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-800">Recent</Link>
            <Link href="/popular" className="text-gray-600 hover:text-gray-800">Popular</Link>
            <Link href="/authors" className="text-gray-600 hover:text-gray-800">Authors</Link>
          </nav>
        </div>
        <ul className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li className="hover:underline" key={post._id}>
              <Link href={`/${post.slug.current}`} className="relative group w-full overflow-hidden rounded-xl shadow-lg">
                {/* Shot image */}
                <img
                  className="mb-4 h-auto w-full rounded-lg"
                  src={imageUrlBuilder(client)
                    .image(post.image as SanityImageSource)
                    .width(800)
                    .url()}
                  alt={post.title ?? "Post image"}
                />

                {/* Title overlay (hidden until hover) */}
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-lg 
             bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-4"
                >
                  <div className="flex items-center gap-4">
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white drop-shadow">
                      {post.title}
                    </h3>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <button
                        className="rounded-full bg-white/20 p-2 text-white transition hover:bg-pink-500 hover:text-white"
                        aria-label="Like"
                      >
                        <IoHeart size={18} />
                      </button>
                      <button
                        className="rounded-full bg-white/20 p-2 text-white transition hover:bg-blue-500 hover:text-white"
                        aria-label="View">
                        <IoMdEye size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Shot details */}
              <div className="shot-details mt-2 text-sm text-gray-600 flex gap-2 justify-between">
                <div className="user-information flex-1">
                  <Link href={`/author/${post.author.slug.current}`}>
                    <img src={imageUrlBuilder(client).image(post.author.avatar).url()} alt={post.author.name}
                      className="inline-block h-6 w-6 rounded-full" /> {post.author.name}
                  </Link>
                </div>
                <div className="shot-statistics-container flex gap-2">
                  <div className="shot-statistic likes-container flex gap-1 items-center">
                    <div><IoHeart /></div>
                    <div>{post.likes ?? 0}</div>
                  </div>
                  <div className="shot-statistic views-container flex gap-1 items-center">
                    <div><IoMdEye /></div>
                    <div>{post.views ?? 0}</div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>

    </>
  );
}
