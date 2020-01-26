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
    client.on('error', err => {
      console.log(err);
      this.tryEnd(client, socket);
    });
    socket.on('error', err => {
      console.log(err);
      this.tryEnd(client, socket);
    });
  }

  private tryEnd (...sockets : net.Socket[]) {
    sockets.forEach(socket => {
      try {
        socket.end();
      } catch (err) {}
    });
  }

}

export default TcpProxy;
