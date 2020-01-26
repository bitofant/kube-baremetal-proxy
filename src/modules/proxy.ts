import net from 'net';

class TcpProxy {
  public servicePort: number = 0;
  private readonly server : net.Server;

  constructor (public readonly localPort: number) {
    this.server = net.createServer(socket => this.onConnection(socket)).listen(localPort);
  }

  private onConnection (socket : net.Socket) {
    const client = net.connect({
      host: '127.0.0.1',
      port: this.servicePort
    }, () => {
      client.pipe(socket);
      socket.pipe(client);
    });
  }

}

export default TcpProxy;
