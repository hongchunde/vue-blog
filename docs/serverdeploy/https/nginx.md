# 给nginx开启https服务
## Nginx安装http_ssl_module模块

#### Nginx如果未开启SSL模块，配置Https时提示错误。
```flow  \\                   // 
nginx: [emerg] the "ssl" parameter requires ngx_http_ssl_module in /usr/local/nginx/conf/nginx.conf:xxx
```

##### nginx缺少http_ssl_module模块，编译安装的时候带上--with-http_ssl_module配置就行了。

##### 本场景是服务器已经安装过nginx，但是未安装http_ssl_module。

1.进入到源码包，如：
```flow  \\                   // 
cd /usr/local/src/nginx-1.13.2
```
2.configure：
```flow  \\                   // 
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
```
3.make：
```flow  \\                   // 
make
```
4.不需要执行make install，否则就覆盖安装了。

5.备份原有的nginx，如：
```flow  \\                   // 
cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx_bak
```
6.然后将刚刚编译好的nginx覆盖掉原有的nginx（nginx需要停止）
```flow  \\                   // 
cp ./objs/nginx /usr/local/nginx/sbin/
```
7.查看安装情况：
```flow  \\                   // 
/usr/local/nginx/sbin/nginx -V
nginx version: nginx/1.13.2
built by gcc 4.8.5 20150623 (Red Hat 4.8.5-16) (GCC)
built with OpenSSL 1.0.2k-fips  26 Jan 2018
TLS SNI support enabled
configure arguments: --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
```

### 四、nginx配置https
贴部分配置信息：
```flow  \\                   //
    server {
 
        listen	80;
		server_name www.yourdomain.com;
	    rewrite ^(.*) https://$server_name$1 permanent; #http 跳转 https
    }
```
```flow  \\                   //
server {
	listen 443;
    server_name www.musicfind.fun;
    ssl on;
    root html;
    index index.html index.htm;
    ## 这里放从lets encrypt中申请好的证书pem文件和key文件,注意文件实际路径
    ssl_certificate   cert/214981350170042.pem; 
    ssl_certificate_key  cert/214981350170042.key;
	ssl_session_cache    shared:SSL:1m;
	ssl_session_timeout  5m;
	#禁止在header中出现服务器版本，防止黑客利用版本漏洞攻击
	server_tokens off;
	#如果是全站 HTTPS 并且不考虑 HTTP 的话，可以加入 HSTS 告诉你的浏览器本网站全站加密，并且强制用 HTTPS 访问
	fastcgi_param   HTTPS               on;
	fastcgi_param   HTTP_SCHEME         https;
	access_log /usr/local/nginx/logs/httpsaccess.log;
}
```
先检验配置的对不对：
```flow  \\                   //
/usr/local/nginx/sbin/nginx -t
nginx: the configuration file /usr/local/nginx/conf/nginx.conf syntax is ok
nginx: configuration file /usr/local/nginx/conf/nginx.conf test is successful
```
重启nginx：
```flow  \\                   //
/usr/local/nginx/sbin/nginx -s reload
```
