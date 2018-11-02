import createHistory from '../src/history/createBrowserHistory';
import { navigateBack, navigateTo, redirectTo } from '../src/apis'

describe('Hash History', () => {
  let history
  beforeEach(() => {
    history = createHistory()
  })
  it('should has a right action when calling push/replace/goback', () => {

  })
})