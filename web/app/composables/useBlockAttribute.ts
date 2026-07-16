import type { BlockProps } from '~/types/blocks'

type PathSegment = string | number | { _key: string }

export function useBlockAttribute(meta: BlockProps) {
  const base = createSanityDataAttribute({
    id: meta.documentId,
    type: meta.documentType,
    path: ['content', { _key: meta.blockKey }],
  })

  return (...path: PathSegment[]) => (path.length ? base.scope(path) : base)
}
