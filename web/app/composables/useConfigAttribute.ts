type PathSegment = string | number | { _key: string }

export function useConfigAttribute() {
  const { data: config } = useGlobalConfig()

  return (...path: PathSegment[]) => {
    const id = config.value?._id
    const type = config.value?._type
    if (!id || !type) return undefined

    return createSanityDataAttribute({ id, type, path })
  }
}
