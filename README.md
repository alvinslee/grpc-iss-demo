# gRPC Server Demo

This is a simple gRPC server built with Node.js. It demonstrates unary, client streaming, and server streaming service methods.  It makes use of the [Open Notify API](http://open-notify.org/) to retrieve real-time information about the International Space Station.

## Usage

```
~/$ git clone git@github.com:alvinslee/grpc-iss-demo.git
~/$ cd grpc-iss-demo
~/grpc-iss-demo$ yarn install
~/grpc-iss-demo$ node server.js
```

This project assumes the use of a gRPC client like [Insomnia](https://insomnia.rest/). Load the `space_station.proto` file, which yields the following 3 service methods:

* `getAstronautCount`: unary; returns the number of astronauts currently aboard the International Space Station.
* `getAstronautNames`: client streaming; after receiving a stream of client messages with astronaut index in each one, returns a single string with the names of all the astronauts corresponding to the indices given.
* `getLocation`: server streaming; the client sends `seconds`, indicating how frequent it wants the server to stream response message; at that frequency, the server sends back a timestamp along with the current latitude/longitude geo-coordinates of the International Space Station.