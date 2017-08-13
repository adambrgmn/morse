import { Component } from 'react';
import { connect } from 'react-redux';
import { pipe, cond, always, T, propEq, prop, test } from 'ramda';

import {
  newLong,
  newShort,
  newChar,
  newCharBreak,
  back,
} from '../../reducer';

class Listen extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.dispatch);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.dispatch);
  }

  dispatch = (e: KeyboardEvent) => {
    const keyEq = propEq('key');
    const keyMatch = regExp => pipe(prop('key'), test(regExp));

    const getAction = cond([
      [keyEq('-'), always(newLong)],
      [keyEq('.'), always(newShort)],
      [keyEq(' '), always(newCharBreak)],
      [keyEq('Backspace'), always(back)],
      [keyMatch(/^[a-z]$/), always(newChar)],
      [T, always(null)],
    ]);

    const action = getAction(e);

    if (action != null) {
      this.props.dispatch(action(e.key));
    }
  };

  render() {
    return null;
  }
}

export default connect()(Listen);
