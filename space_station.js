const grpc = require('grpc');
const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const PROTO_FILE_PATH = path.join(__dirname, '/space_station.proto');

const packageDefinition = protoLoader.loadSync(PROTO_FILE_PATH);

module.exports = grpc.loadPackageDefinition(packageDefinition).SpaceStation;
