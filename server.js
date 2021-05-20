const grpc = require('grpc');
const requests = require('./axios_requests.js');
const spaceStation = require('./space_station.js');

const SECONDS_TO_MILLISECONDS = 1000;
const STREAM_SERVER_DEFAULT_SECONDS = 10;
const PORT = 4500;

const getAstronautCount = async (call, callback) => {
  const { count } = await requests.getAstronauts();
  callback(null, { count });
};

const getAstronautNamesAsArray = async (indices) => {
  const { names } = await requests.getAstronauts();
  const result = []
  for (index of indices) {
    if (index < names.length && !result.includes(names[index])) {
      result.push(names[index]);
    }
  }
  return result;
}

const getAstronautNames = (call, callback) => {
  const indices = []
  call.on('data', (data) => {
    indices.push(data.index);
  });
  call.on('end', async () => {
    const namesAsArray = await getAstronautNamesAsArray(indices)
    callback(null, { names: namesAsArray.join(', ') });
  });
}

const getLocation = async (call) => {
  const data = await requests.getLocation();
  call.write(data);
  const seconds = call.request.seconds || STREAM_SERVER_DEFAULT_SECONDS;
  let timeout = setTimeout(
    async () => getLocation(call),
    seconds * SECONDS_TO_MILLISECONDS
  );
  call.on('cancelled', () => {
    clearTimeout(timeout);
    call.end();
  })
}

const server = new grpc.Server();
server.addService(spaceStation.service, {
  getAstronautCount,
  getAstronautNames,
  getLocation
});
server.bind(`localhost:${PORT}`, grpc.ServerCredentials.createInsecure());
server.start();