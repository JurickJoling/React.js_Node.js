import isObject from 'lodash/isObject';
import size from 'lodash/size';
import React, { Component, PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';
import cl from 'classnames';
import axios from 'axios';

import { EVENTBRITE_API_HOST, EVENTBRITE_TOKEN } from '../config';

export default class EventbriteFinder extends Component {

  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    label: PropTypes.string,
    type: PropTypes.string
  };

  state = {
    modalOpened: false,
    q: '',
    events: [],
    errorMessage: null
  };

  toggleModal(cb = null) {
    this.setState({ showModal: !this.state.showModal }, () => {
      if (cb) {
        cb();
      }
    });
  }

  changeValue(name, value) {
    this.setState({ [name]: value });
  }

  search() {
    const { q } = this.state;
    axios.get(`${EVENTBRITE_API_HOST}?q=${q}&token=${EVENTBRITE_TOKEN}`)
      .then(({ data: { events } }) => this.setState({ events }))
      .catch(({ errorMessage }) => this.setState({ errorMessage }));
  }

  onSelect(event) {
    const { input } = this.props;

    console.log('event', event);

    this.toggleModal(() => input.onChange({
      id: event.id,
      name: event.name,
      description: event.description,
      organizer_id: event.organizer_id,
      url: event.url
    }));
  }

  render() {
    const { input, label, placeholder, meta: { touched, error, warning } } = this.props;
    const { q, events, showModal } = this.state;

    return (
      <fieldset className={cl('form-group', { 'has-error': (touched && error) })}>
        <a
          href="#"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            this.toggleModal();
          }}
        >
          {label}
        </a>
        {touched && ((error && <div className="error help-block">{error}</div>) || (warning && <div className="error">{warning}</div>))}


        {isObject(input.value) ? (
          <table className="table table-bordered table-striped table-hover m-t">
            <tbody>
            <tr>
              <td>{input.value.name ? input.value.name.text : null}</td>
              <td>{input.value.description ? input.value.description.text : null}</td>
              <td>{input.value.organizer_id ? input.value.organizer_id : null}</td>
              <td>
                {input.value.url ? <a className="btn btn-primary" target="_blank" href={input.value.url}>More Info</a> : null}
              </td>
            </tr>
            </tbody>
          </table>
          ) : null}

        <Modal bsSize="lg" show={showModal} onHide={() => this.toggleModal()}>
          <Modal.Header closeButton>
            <Modal.Title>{placeholder}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-10">
                <fieldset className="form-group">
                  <input
                    name="q"
                    className="form-control"
                    placeholder="Find an event..."
                    value={q}
                    onChange={({ target: { value } }) => this.changeValue('q', value)}
                    onKeyPress={({ key }) => {
                      if (key === 'Enter') {
                        this.search()
                      }
                    }}
                  />
                  <Button
                    bsSize="xs"
                    bsStyle="default"
                    onClick={() => this.setState({ q: '', events: [] })}
                  >
                    Clear
                  </Button>
                </fieldset>
              </div>
              <div className="col-md-2">
                <Button bsStyle="primary" disabled={q === ''} onClick={() => this.search()}>
                  Search
                </Button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                {size(events) > 0 ? (
                    <table className="table table-striped table-bordered table-hover">
                      <tbody>
                      {events.map(event => (
                        <tr key={event.id}>
                          <td>{event.name ? event.name.text : null}</td>
                          <td>{event.description ? event.description.text : null}</td>
                          <td>{event.organizer_id}</td>
                          <td>
                            <a className="btn btn-primary" target="_blank" href={event.url}>More Info</a>
                          </td>
                          <td>
                            <Button bsStyle="success" onClick={() => this.onSelect(event)}>Select</Button>
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  ) : null}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.toggleModal()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </fieldset>
    );
  }
}
