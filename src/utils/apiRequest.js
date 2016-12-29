import compact from 'lodash/compact';
import axios from 'axios';

import { API_URI } from '../config';

function headers() {
  return {
    headers: {
      'X-Parse-Application-Id': 'leaflets',
      'X-Parse-Master-Key': 'a74bc3b9ca53d143da3617f138ec8158',
      'Content-Type': 'application/json',
    }
  };
}

export default class apiRequest {

  static get(path, id = null) {
    return axios.get(`${API_URI}/${compact([path, id]).join('/')}`, headers());
  }

  static post(path, data) {
    return axios.post(`${API_URI}/${path}`, data, headers());
  }

  static delete(path, id = null) {
    return axios.delete(`${API_URI}/${compact([path, id]).join('/')}`, headers());
  }
}