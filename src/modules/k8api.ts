import k8s = require('@kubernetes/client-node');

// export interface Cluster {
//   readonly name: string;
//   readonly caData?: string;
//   caFile?: string;
//   readonly server: string;
//   readonly skipTLSVerify: boolean;
// };

const kc = new k8s.KubeConfig();
// if (process.env.PENG === 'PUFF') 
kc.loadFromDefault();
// else
// kc.loadFromString (`apiVersion: v1
// clusters:
// - cluster:
//     server: https://kubernetes
//     # certificate-authority: /home/joran/.minikube/ca.crt
//   name: kube
// contexts:
// - context:
//     cluster: kube
//     namespace: default
//     user: balancer-robot
//   name: kube
// current-context: kube
// kind: Config
// preferences: {}
// users:
// - name: balancer-robot
//   user:
//     token: ${process.env.K8S_API_TOKEN}`);


const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

export { k8s, kc, k8sApi };
