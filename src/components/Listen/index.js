import { Component } from 'react';
import { connect } from 'react-redux';
import { cond, equals, always, T } from 'ramda';

import { newLong, newShort, newChar, newWord, back } from '../../reducer';

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
      [equals(' '), always(newChar)],
      [equals('  '), always(newWord)],
      [equals('Backspace'), always(back)],
      [T, always(null)],
    ]);

    const action = getAction(key);
    if (action != null) this.props.dispatch(action());
  };

  render() {
    return null;
  }
}

export default connect()(Listen);
