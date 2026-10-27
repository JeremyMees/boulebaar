# Keep useGlobalConfig and useConfigAttribute separate

`useConfigAttribute` calls `useGlobalConfig` internally, which looks like a
double fetch, but `useAsyncData('global-config', …, { dedupe: 'defer' })` shares
one request across every caller. Merging the two would only save one line per
component, while forcing `attr` onto an awaitable `useAsyncData` result
(components `await` it, `useSeo` does not), so we keep them as two composables.
