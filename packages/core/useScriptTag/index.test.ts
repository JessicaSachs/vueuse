import { useSetup } from '../../.test'
import { useScriptTag } from '.'

describe('useScriptTag', () => {
  const src = 'https://code.jquery.com/jquery-3.5.1.min.js'

  const scriptTagElement = (): HTMLScriptElement | null =>
    document.head.querySelector(`script[src="${src}"]`)

  // Reset JSDOM after each test
  afterEach(() => {
    document.getElementsByTagName('html')[0].innerHTML
      = '<html><head></head><body>Empty DOM</body></html>'
  })

  it('should add script tag', async() => {
    expect(scriptTagElement()).toBeNull()

    useSetup(() => {
      const { scriptTag } = useScriptTag(src, () => {}, { immediate: true })

      return {
        scriptTag,
      }
    })

    expect(scriptTagElement()).toBeInstanceOf(HTMLScriptElement)
  })

  /**
   * @jest-environment jsdom
   */
  it('should remove script tag on unmount', async() => {
    expect(scriptTagElement()).toBeNull()

    const vm = useSetup(() => {
      const { scriptTag, load, unload } = useScriptTag(src, () => {}, { immediate: false })

      return {
        scriptTag,
        load,
        unload,
      }
    })

    await vm.load(false)

    expect(scriptTagElement()).toBeInstanceOf(HTMLScriptElement)

    vm.unmount()

    expect(scriptTagElement()).toBeNull()

    expect(vm.scriptTag).toBeNull()
  })

  it('should remove script tag on unload call', async() => {
    expect(scriptTagElement()).toBeNull()

    const vm = useSetup(() => {
      const {
        scriptTag,
        load,
        unload,
      } = useScriptTag(src, () => {}, { immediate: false })

      return {
        scriptTag,
        load,
        unload,
      }
    })

    await vm.load(false)

    expect(scriptTagElement()).toBeInstanceOf(HTMLScriptElement)

    await vm.unload()

    expect(scriptTagElement()).toBeNull()

    expect(vm.scriptTag).toBeNull()
  })
})
