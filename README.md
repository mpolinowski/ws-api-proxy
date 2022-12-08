# Using the NGINX as a Proxy for Websocket APIs

Taking a peek at proxy'ing websocket services. This repo heavily borrows from:


_See also:_

* [NGINX as a WebSocket Proxy](https://www.nginx.com/blog/websocket-nginx/)
* [nginx WebSocket Proxy](https://github.com/nicokaiser/nginx-websocket-proxy)
* [NGINX Docker Ingress](https://github.com/mpolinowski/nginx_docker_ingress)


## Backend

Start the backend Node.js service by running:


```bash
npm install
node server1.js
```

For the load-balancing example add the additional servers:


```bash
node server2.js
node server3.js
```


## Proxy

As proxy I am using an NGINX container that can be started with the configuration files provided in `docker_ws_proxy`:


```bash
docker run --rm --network host -v /path/to/docker_ws_proxy:/etc/nginx --name proxy nginx:alpine
```

As server address I always used `localhost` instead of an IP or domain - you might want to change that:


* [Websocket Proxy configuration](https://github.com/mpolinowski/ws-api-proxy/blob/master/docker_ws_proxy/conf.d/ws-proxy.conf)
* [Secure Websocket Proxy configuration](https://github.com/mpolinowski/ws-api-proxy/blob/master/docker_ws_proxy/conf.d/wss-proxy.conf)
* [Secure Websocket Proxy configuration with Path Re-Writing](https://github.com/mpolinowski/ws-api-proxy/blob/master/docker_ws_proxy/conf.d/wss-proxy-path-rewriting.conf)
* [Secure Websocket Proxy configuration with Path Re-Writing and Load-balancing](https://github.com/mpolinowski/ws-api-proxy/blob/master/docker_ws_proxy/conf.d/wss-proxy-load-balancing.conf)


Which configuration file is used by NGINX can be set in the following place:

* [NGINX Server Config](https://github.com/mpolinowski/ws-api-proxy/blob/master/docker_ws_proxy/nginx.conf)


```bash
http {
    # make sure to cut http connection after ws upgrade
    map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    }
 
    # Simple websocket proxy
    include /etc/nginx/conf.d/ws-proxy.conf;
    # Simple secure websocket proxy
    # include /etc/nginx/conf.d/wss-proxy.conf;
    # Secure websocket proxy with path-rewriting
    # include /etc/nginx/conf.d/wss-proxy-path-rewriting.conf;
    # Secure websocket proxy with load-balancing
    # include /etc/nginx/conf.d/wss-proxy-load-balancing.conf;
}
```


* For more details see [NGINX Websocket Proxy](https://mpolinowski.github.io/docs/DevOps/NGINX/2022-12-08-nginx-websocket-proxy/2022-12-08)
