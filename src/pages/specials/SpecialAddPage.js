import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createSpecial } from '../../actions/SpecialActions';

import { SpecialForm } from '../../components';

class SpecialAddPage extends Component {

  static propTypes = {
    createSpecial: PropTypes.func.isRequired
  };

  render() {
    const { errorMessage, createSpecial } = this.props;
    return (
      <div className="container">
        <SpecialForm errorMessage={errorMessage} onSave={special => createSpecial(special)} />
      </div>
    );
  }
}

export default connect(({ specials: { errorMessage } }) => ({ errorMessage }), { createSpecial })(SpecialAddPage);