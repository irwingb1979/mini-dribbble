import { client } from "@/sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"

const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

const AUTHOR_QUERY = `*[_type == "author" && slug.current == $slug][0]{
  _id,
  name,
  avatar,
  website,
  minibio,
  "shots": *[_type == "shot" && references(^._id)]{
    _id,
    title,
    slug,
    image,
    likes,
    views
  }
}`

export default async function AuthorPage({ params }: { params: { slug: string } }) {
  const author = await client.fetch(AUTHOR_QUERY, { slug: params.slug })

  if (!author) return <div>Author not found</div>

  return (
    <main className="container mx-auto px-6 py-10">
      {/* Profile header */}
      <div className="mb-10 flex items-center gap-4 text-center flex-col">
        {author.avatar && (
          <img
            src={urlFor(author.avatar).width(120).url()}
            alt={author.name}
            className="h-24 w-24 rounded-full object-cover"
          />
        )}
        <h1 className="text-3xl font-bold">{author.name}</h1>
        <p className="text-sm text-gray-500">{author.website}</p>
        {author.minibio && <p className="max-w-md">{author.minibio}</p>}
      </div>

      {/* Shots grid */}
      <h2 className="mb-4 text-xl font-semibold">Shots</h2>
      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {author.shots.map((shot: any) => (
          <li key={shot._id} className="rounded-lg shadow-md overflow-hidden">
            <a href={`/${shot.slug.current}`}>
              <img
                src={urlFor(shot.image).width(600).url()}
                alt={shot.title}
                className="w-full"
              />
              <div className="p-3">
                <h3 className="font-semibold">{shot.title}</h3>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
