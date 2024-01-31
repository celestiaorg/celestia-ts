import {Client as WebSocket} from 'rpc-websockets'

export class Client {
  private readonly ws: WebSocket

  // TODO: Auth token
  constructor(rpcUrl: string) {
    this.ws = new WebSocket(rpcUrl)
  }

  async callMethod(method: string, params: any[]) {
    return await this.ws.call(method, params)
  }
}
