import { Hospital } from "./Hospital";

const hospital = new Hospital();

Bun.serve({
  fetch(req, server) {
    const isWsUpgradeSuccess = server.upgrade(req, { data: {} }); // pass data to ws
    if (isWsUpgradeSuccess) {
      return;
    }

    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    data: {}, // received from fetch
    message(ws, message) {
      switch (message) {
        case "getAvailablePatients":
          ws.send(hospital.getAvailablePatients());
          return;
        default:
          console.log(`[Server] Received unhandled message: ${message}`);
      }
    }, // a message is received
    open(ws) {}, // a socket is opened
    close(ws, code, message) {}, // a socket is closed
    drain(ws) {}, // the socket is ready to receive more data
  },
});
