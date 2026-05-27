export function useGlobalConfig() {
  const sanity = useSanity()

  return useAsyncData('global-config', () =>
    sanity.fetch<ConfigQueryResult>(configQuery),
  )
}
