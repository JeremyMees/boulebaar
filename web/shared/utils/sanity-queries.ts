export const pageQuery = groq`
  *[
    _type in ["page"] &&
    slug.current == $slug
  ][0]{
    ...,
    content[]{
      ...,
    },
    "seo": {
      "_type": "seo",
      "title": coalesce(seo.title, ""),
      "description": coalesce(seo.description,  ""),
      "image": seo.image,
      "keywords": coalesce(seo.keywords, []),
    },
  }
`
