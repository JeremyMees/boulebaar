import { describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { mockConfig } from '~~/test/mock'

const mockFetch = vi.fn().mockResolvedValue(mockConfig)
mockNuxtImport('useSanity', () => () => ({ fetch: mockFetch }))

const TestComponent = defineComponent({
  async setup() {
    const { data } = await useGlobalConfig()
    return { data }
  },
  template: '<div data-test-name>{{ data?.name }}</div>',
})

describe('useGlobalConfig', () => {
  it('fetches config from Sanity and returns data', async () => {
    const wrapper = await mountSuspended(TestComponent)

    expect(mockFetch).toHaveBeenCalled()
    expect(wrapper.find('[data-test-name]').text()).toBe(mockConfig.name)
  })
})
