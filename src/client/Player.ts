import type { BunMessageEvent } from "bun";

export class Player {
  #socket: WebSocket;
  #status: "unopened" | "opened" | "closed" | "error" = "unopened";
  ready: Promise<void>;

  constructor(link: string) {
    this.#socket = new WebSocket(link, {});
    this.handleResponse = this.handleResponse.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleError = this.handleError.bind(this);

    this.#socket.addEventListener("message", this.handleResponse);
    this.#socket.addEventListener("open", this.handleOpen);
    this.#socket.addEventListener("close", this.handleClose);
    this.#socket.addEventListener("error", this.handleError);

    this.ready = new Promise((resolve, reject) => {
      this.#socket.addEventListener("open", () => resolve());
      this.#socket.addEventListener("error", () =>
        reject(new Error("Socket error"))
      );
    });
  }

  handleResponse(event: BunMessageEvent) {
    console.log("MSG:", JSON.parse(event.data));
  }

  handleOpen() {
    this.#status = "opened";
  }
  handleClose() {
    this.#status = "closed";
  }
  handleError() {
    this.#status = "error";
  }

  async getAvailablePatients() {
    await this.ready;

    this.#socket.send("getAvailablePatients");
  }
}
