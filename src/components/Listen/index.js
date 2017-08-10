import { Component } from 'react';
import { connect } from 'react-redux';
import { pipe, cond, equals, and, length, match, always, T } from 'ramda';

import {
  newLong,
  newShort,
  newChar,
  newCharBreak,
  newWordBreak,
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
    const key = e.shiftKey && e.key === ' ' ? '  ' : e.key;

    const getAction = cond([
      [equals('-'), always(newLong)],
      [equals('.'), always(newShort)],
      [equals(' '), always(newCharBreak)],
      [equals('  '), always(newWordBreak)],
      [equals('Backspace'), always(back)],
      [and(match(/^[a-z]{1}$/), pipe(length, equals(1))), always(newChar)],
      [T, always(null)],
    ]);

    const action = getAction(key);
    if (action != null) this.props.dispatch(action(key));
  };

  render() {
    return null;
  }
}

export default connect()(Listen);
