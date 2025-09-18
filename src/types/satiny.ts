export interface Author {
  name: string
  avatar?: any // you can make this stricter later, e.g. SanityImageAsset
}

export interface Shot {
  _id: string
  title: string
  slug: { current: string }
  author?: Author
  likes?: number
  views?: number
  image?: any
  description?: string
}
