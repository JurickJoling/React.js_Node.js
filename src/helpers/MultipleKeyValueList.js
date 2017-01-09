import isArray from 'lodash/isArray';
import size from 'lodash/size';
import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import DropdownList from 'react-widgets/lib/DropdownList'
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import cl from 'classnames';

import { Button } from '../helpers';
import { weekDays, capitalize } from '../utils';

momentLocalizer(moment);

class MultipleKeyValueList extends Component {

  state = {
    value: {},
    values: []
  };

  componentWillReceiveProps(nextProps) {
    if (isArray(nextProps.input.value) && size(nextProps.input.value) > 0) {
      this.setState({ values: nextProps.input.value })
    }
  }

  render() {
    const { input, label, meta: { touched, error, warning } } = this.props;
    const { value, values } = this.state;

    return (
      <fieldset className={cl('form-group', {'has-error': (touched && error)})}>
        {label ? <label>{label}</label> : null}
        <table className="table table-hover table-striped table-bordered">
          <tbody>
          <tr>
            <td>
              <DropdownList
                valueField="value"
                textField="name"
                data={weekDays.map(day => ({ name: capitalize(day), value: day }))}
                filter="contains"
                value={value.day}
                onChange={day => this.setState({ value: { ...value, day: day.value } })}
              />
            </td>
            <td>
              <DateTimePicker
                format={'MM/DD/YYYY hh:mm:ss'}
                value={value.start ? moment(value.start, 'MM/DD/YYYY hh:mm:ss').toDate() : null}
                onChange={(_, start) => this.setState({ value: { ...value, start } })}
              />
            </td>
            <td>
              <DateTimePicker
                format={'MM/DD/YYYY hh:mm:ss'}
                value={value.end ? moment(value.end, 'MM/DD/YYYY hh:mm:ss').toDate() : null}
                onChange={(_, end) => this.setState({ value: { ...value, end } })}
              />
            </td>
            <td>
              <Button
                color="primary"
                disabled={!value.day || !value.start || !value.end}
                onClick={() => this.setState({ value: {}, values: [...values, value] }, () => input.onChange(this.state.values))}
              >
                Add
              </Button>
            </td>
          </tr>
          {values.map((val, index) => (
            <tr key={index}>
              <td>{capitalize(val.day)}</td>
              <td>{val.start}</td>
              <td>{val.end}</td>
              <td>
                <Button
                  color="danger"
                  onClick={() =>
                    this.setState({
                      values: values.filter(({ day, start, end }) => (val.day !== day && val.start !== start && val.end !== end))
                    }, () => input.onChange(this.state.values))
                  }
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        {touched && ((error && <div className="error help-block">{error}</div>) || (warning && <div className="error">{warning}</div>))}
      </fieldset>
    );
  }
}

MultipleKeyValueList.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string
};

export default MultipleKeyValueList;