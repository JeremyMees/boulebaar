import { createDataAttribute } from '@sanity/visual-editing'
import type { BlockProps } from '~/types/blocks'

type PathSegment = string | number | { _key: string }

export function useBlockAttribute(meta: BlockProps) {
  const base = createDataAttribute({
    id: meta.documentId,
    type: meta.documentType,
    path: ['content', { _key: meta.blockKey }],
  })

  return (...path: PathSegment[]) => (path.length ? base.scope(path) : base)
}
