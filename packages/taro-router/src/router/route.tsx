import { Component } from '@tarojs/taro-h5';
import Nerv, { PropTypes } from 'nervjs';

import createWrappedComponent from './createWrappedComponent';
import * as Types from '../utils/types';

interface RouteProps {
  path: string;
  component: Types.PageComponent;
  isIndex: boolean;
  key: string;
}

interface RouteState {
  match: boolean;
}

class Route extends Component<RouteProps, RouteState> {
  wrappedComponent;

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  state = {
    match: this.computeMatch(this.context.router)
  };

  computeMatch (router) {
    const pathname = router.location.pathname;
    const key = router.location.state.key;
    const isIndex = this.props.isIndex;
    if (isIndex && pathname === '/') return true
    return key === this.props.key
  }

  componentWillMount () {
    this.wrappedComponent = createWrappedComponent(this.props.component)
  }

  componentWillReceiveProps (nProps, nContext) {
    this.setState({
      match: this.computeMatch(nContext.router)
    });
  }

  render () {
    if (!this.wrappedComponent) return null

    const { match } = this.state;
    const { router } = this.context;

    // TODO dynamic imported component
    return Nerv.createElement(this.wrappedComponent, {
      router: {
        matched: match,
        location: router.location
      }
    })
  }
}

export default Route
