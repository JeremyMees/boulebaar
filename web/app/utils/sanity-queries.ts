// const imageFragment = `
//   hotspot,
//   crop,
//   "assetRef": asset._ref,
//   "url": asset->url,
//   "altText": coalesce(asset->altText[$language], ""),
//   "title": coalesce(asset->title[$language], ""),
//   "description": coalesce(asset->description[$language], ""),
// `

const linkFragment = `
  "type": link.type,
  "url": select(
    link.type == "email" => "mailto:" + link.email,
    link.type == "phone" => "tel:" + link.phone,
    coalesce(link.url, link.internalLink->slug.current)
  ),
  "blank": link.blank,
  "parameters": link.parameters,
  "anchor": link.anchor
`

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
      "description": coalesce(seo.description, ""),
      "image": seo.image,
      "keywords": coalesce(seo.keywords, []),
    },
  }
`

export const configQuery = groq`
  *[_type == "config"]{
    ...,
    address {
      ...,
      "link": { ${linkFragment} }
    },
    navigationLinks[]{
      ...,
      "link": { ${linkFragment} }
    }
  }[0]
`
