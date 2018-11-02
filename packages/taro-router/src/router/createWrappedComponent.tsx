import * as Types from '../utils/types'
import { tryToCall } from '../utils';

const createWrappedComponent = (component: Types.PageComponent) => {
  class WrappedComponent extends component {
    $router: Types.Location

    constructor(props, context) {
      super(props, context)
      this.$router = props.router.location
    }

    componentDidMount () {
      const componentDidShow = super.componentDidShow
      const componentDidMount = super.componentDidMount

      tryToCall(componentDidMount, this)
      tryToCall(componentDidShow, this)
    }

    componentWillReceiveProps (nProps, nContext) {
      const componentWillReceiveProps = super.componentWillReceiveProps
      const componentDidShow = super.componentDidShow
      const componentDidHide = super.componentDidHide
      const nextMatched = nProps.router.matched
      const lastMatched = this.props.router.matched

      this.$router = this.props.router.location

      if (nextMatched || lastMatched) {
        tryToCall(componentWillReceiveProps, this, nProps, nContext)
      }

      if (nextMatched === lastMatched) return

      if (nextMatched === true) {
        tryToCall(componentDidShow, this)
      } else {
        tryToCall(componentDidHide, this)
      }
    }

    // TODO 支持页面title

    componentWillUnmount() {
      const componentDidHide = super.componentDidHide
      const componentWillUnmount = super.componentWillUnmount
      tryToCall(componentDidHide, this)
      tryToCall(componentWillUnmount, this)
    }

    render() {
      const { router } = this.props
      if (router.matched) {
        return super.render()
      } else {
        return null
      }
    }
  }
  return WrappedComponent;
}

export default createWrappedComponent
