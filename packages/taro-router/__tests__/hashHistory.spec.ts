import createHistory from '../src/history/createHashHistory';
import { createNavigateBack, createNavigateTo, createRedirectTo } from '../src/apis'

describe('Hash History', () => {
  let history

  beforeEach(() => {
    history = createHistory()
  })

  it('should has a right action when calling push/replace/goback', () => {
    const navigateBack = createNavigateBack(history)
    const navigateTo = createNavigateTo(history)
    const redirectTo = createRedirectTo(history)

    navigateTo({
      url: '/pages/index/index'
    })
    expect(history.action).toBe('PUSH')

    navigateBack({ delta: 1 })
    expect(history.action).toBe('POP')

    redirectTo({ url: '' })
    expect(history.action).toBe
  })
})
