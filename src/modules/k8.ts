import { k8sApi } from "./k8api";

interface PortNumbers {
  http?: number;
  https?: number;
}

function getIngressPorts () {
  return new Promise<PortNumbers> ((resolve, reject) => {
    k8sApi.listNamespacedService('ingress-nginx')
    // k8sApi.connectGetNamespacedServiceProxy('ingress-nginx', 'ingress-nginx')
    .then (response => {
      const list = response.body.items;
      const ingress = list.find(service => service.metadata?.name === 'ingress-nginx');
      if (!ingress) {
        reject (new Error('no ingress running!'));
        return;
      }
      const ports : PortNumbers = {};
      ingress.spec?.ports?.forEach(port => {
        if (!port.nodePort) return;
        if (port.name !== 'http' && port.name !== 'https') return;
        ports[port.name] = port.nodePort;
      });
      resolve(ports);
    })
    .catch (reject);
  });
}

export default getIngressPorts;
