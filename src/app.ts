import getIngressPorts from "./modules/k8";
import TcpProxy from "./modules/proxy";


const httpProxy = new TcpProxy(80);
const httpsProxy = new TcpProxy(443);

async function updatePorts () {
  const ports = await getIngressPorts();
  if (ports.http)  httpProxy.servicePort  = ports.http;
  if (ports.https) httpsProxy.servicePort = ports.https;
  console.log('ports updated');
}

setInterval(updatePorts, 30000);
updatePorts();
