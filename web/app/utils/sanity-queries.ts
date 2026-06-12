const imageFragment = `
  ...,
  hotspot,
  crop,
  "url": asset->url,
  "altText": coalesce(asset->altText, ""),
  "title": coalesce(asset->title, ""),
  "description": coalesce(asset->description, ""),
`

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
      _type == "imageHero" => {
        ...,
        "image": image { ${imageFragment} },
      },
      _type == "infoColumns" => {
        ...,
        "columns": columns[]{
          ...,
          "image": image { ${imageFragment} },
        }
      },
       _type == "imageGrid" => {
        ...,
        "images": images[]{ ${imageFragment} },
      },
       _type == "weServe" => {
        ...,
        "logo": logo { ${imageFragment} },
      },
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
