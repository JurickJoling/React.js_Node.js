import compact from 'lodash/compact';
import axios from 'axios';

import { API_URI } from '../config';

function headers() {
  return {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }};
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