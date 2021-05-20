const axios = require('axios');
const URL_ROOT = 'http://api.open-notify.org';

module.exports = {
  getAstronauts: async () => {
    const { data } = await axios.get(`${URL_ROOT}/astros.json`);
    return {
      count: data.number,
      names: data.people.map(a => a.name)
    }
  },
  getLocation: async () => {
    const { data } = await axios.get(`${URL_ROOT}/iss-now.json`);
    return {
      datetime: (new Date(data.timestamp * 1000)).toUTCString(),
      latitude: data.iss_position.latitude,
      longitude: data.iss_position.longitude
    }
  }
}