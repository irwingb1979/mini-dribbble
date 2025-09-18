import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Author {
  name: string;
  avatar?: SanityImageSource; // Use SanityImageSource for stricter typing
}

export interface Shot {
  _id: string;
  title: string;
  slug: { current: string };
  author?: Author;
  likes?: number;
  views?: number;
  image?: SanityImageSource; // Use SanityImageSource for stricter typing
  description?: string;
}
