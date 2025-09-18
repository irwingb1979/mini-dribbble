"use client";

import Link from "next/link";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Modal from "./Modal";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface Author {
  name: string;
  avatar: SanityImageSource; // Updated type for avatar
  slug: { current: string };
}

export default function HeaderClient({ author }: { author: Author }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 gap-3">
      <Link href="/" className="text-2xl font-bold flex-1 text-pink-600">
        MiniDribbble
      </Link>

      <div>
        <input
          type="text"
          id="search"
          placeholder="Search..."
          className="border border-gray-300 rounded-full px-4 py-2"
        />
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center border-gray-500 border-1 px-4 py-2 rounded-full transition hover:border-gray-300"
      >
        <IoMdAdd className="mr-2" />
        New Shot
      </button>

      <div className="avatar-author w-10 h-10 items-center justify-center text-gray-600 font-bold">
        <Link href={`/author/${author.slug.current}`}>
        <img
          src={imageUrlBuilder(client).image(author.avatar).url()}
          alt={author.name} className="w-10 h-10 rounded-full"
        />
        </Link>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
         <h1 className="text-2xl font-bold mb-4">Create New Shot</h1>
         <form className="flex flex-col">
            <input type="text" placeholder="Title" className="border p-2 border-gray-200 w-full mb-4 rounded-full" />
            <input type="text" placeholder="Image URL" className="border p-2 border-gray-200 w-full mb-4 rounded-full" />
            <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded-full">
              Submit
            </button>
         </form>
        </Modal>
      )}
    </header>
  );
}
