# Let’s Encrypt申请免费SSL证书

::: tip 为什么要用HTTPS 

网站没有使用HTTPS的时候，浏览器一般会报不安全，而且在别人访问这个网站的时候，很有可能会被运营商劫持，然后在网站里显示一些莫名其妙的广告。

有HTTPS的时候，通俗地讲所有的数据传输都会被加密，你和网站之间的数据交流也就更加安全。

:::

::: tip 相关简介

Let’s Encrypt

如果要启用HTTPS，我们就需要从证书授权机构处获取一个证书，Let’s Encrypt 就是一个证书授权机构。我们可以从 Let’s Encrypt 获得网站域名的免费的证书。

:::




获取Let's Encrypt免费SSL证书

首先，我们需要从 https://github.com/letsencrypt/letsencrypt 上下载 letsencrypt-auto 脚本，使用它能够很方便地完成域名验证和SSL证书的获取。



# 使用git下载脚本

$ git clone https://github.com/letsencrypt/letsencrypt

# 进入到脚本所在目录

$ cd letsencrypt

# 查看 letsencrypt-auto 工具的用法

$ ./letsencrypt-auto --help

脚本下载好了，来看看怎么使用吧。letsencrypt-auto工具的用法如下：

```flow  \\                   // 


root@localhost:~/letsencrypt# ./letsencrypt-auto --help

-------------------------------------------------------------------------------

 letsencrypt-auto [SUBCOMMAND] [options] [-d DOMAIN] [-d DOMAIN] ...

Certbot can obtain and install HTTPS/TLS/SSL certificates. By default,

it will attempt to use a webserver both for obtaining and installing the

certificate. The most common SUBCOMMANDS and flags are:

obtain, install, and renew certificates:

  (default) run  Obtain & install a certificate in your current webserver

  certonly    Obtain or renew a certificate, but do not install it

  renew      Renew all previously obtained certificates that are near expiry

  -d DOMAINS    Comma-separated list of domains to obtain a certificate for

 --apache     Use the Apache plugin for authentication & installation

 --standalone   Run a standalone webserver for authentication

 --nginx      Use the Nginx plugin for authentication & installation

 --webroot     Place files in a server's webroot folder for authentication

 --manual     Obtain certificates interactively, or using shell script hooks

  -n        Run non-interactively

 --test-cert    Obtain a test certificate from a staging server

 --dry-run     Test "renew" or "certonly" without saving any certificates to disk

manage certificates:

  certificates  Display information about certificates you have from Certbot

  revoke     Revoke a certificate (supply --cert-path)

  delete     Delete a certificate

manage your account with Let's Encrypt:

  register    Create a Let's Encrypt ACME account

 --agree-tos    Agree to the ACME server's Subscriber Agreement

  -m EMAIL     Email address for important account notifications

More detailed help:

 -h, --help [TOPIC]  print this message, or detailed help on a topic;

            the available TOPICS are:

  all, automation, commands, paths, security, testing, or any of the

  subcommands or plugins (certonly, renew, install, register, nginx,

  apache, standalone, webroot, etc.)

``` 

-------------------------------------------------------------------------------

这里只对几个重要的命令参数进行说明：

run：获取并安装证书到当前的Web服务器

certonly：获取或续期证书，但是不安装

renew：在证书快过期时，续期之前获取的所有证书

-d DOMAINS：一个证书支持多个域名，用逗号分隔

--apache：使用 Apache 插件来认证和安装证书

--standalone：运行独立的 web server 来验证

--nginx：使用 Nginx 插件来认证和安装证书

--webroot：如果目标服务器已经有 web server 运行且不能关闭，可以通过往服务器的网站根目录放置文件的方式来验证

--manual：通过交互式方式，或 Shell 脚本手动获取证书

关于域名验证和证书的获取安装，上面提到了5种方式：--apache, --standalone, --nginx, --webroot 和 --manual，请根据实际情况选择其一。再次重申，笔者使用的是公司的其中一台测试机，上面没有跑 Apache 和 Nginx，单独运行的 Tomcat，然后通过 iptables 进行端口转发（将 80 端口的请求转发到 8080，将 443 端口的请求转发到 8443），并且已完成域名解析。因此，笔者选择采用 --standalone 方式进行域名验证和证书获取。

# 获取证书

```flow  \\                   // 

$ ./letsencrypt-auto certonly --standalone  -d musicfind.fun

```

注意将上面的邮箱和域名替换成自己的。上面命令中的 certonly 表示只获取证书，不安装；-d ，表示将要获取的SSL证书绑定一个域名,可以多个-d 绑定。

上面的命令在执行过程中，会有两次确认。命令执行完成后，如果看到提示信息"Congratulations! Your certificate and chain..."就说明证书创建成功了.




Let's Encrypt 证书续期

出于安全原因，Let's Encrypt 颁发的 SSL 证书有效期为90天，我们可以通过自动续期来解决。如果到期没有更新证书，Let's Encrypt 会向申请证书时提交的email发送提醒邮件。

进入到 letsencrypt-auto 脚本所在目录，执行下面的命令即可完成 SSL 证书的续期。

```flow  \\                   // 
./letsencrypt-auto renew
```
默认情况下，在证书即将到期之前才能执行续期操作，否则会提示“Cert not yet due for renewal”，即证书尚未到期。如果需要强制执行续期操作，可以加上参数 --force-renew ，命令如下：

```flow  \\                   // 
./letsencrypt-auto renew --force-renew

```
以下是笔者强制执行证书续期的操作结果：

```flow  \\                   // 
root@localhost:~/letsencrypt# ./letsencrypt-auto renew --force-renew
Saving debug log to /var/log/letsencrypt/letsencrypt.log

```
```flow  \\                   // 
-------------------------------------------------------------------------------
Processing /etc/letsencrypt/renewal/musicfind.fun.conf
-------------------------------------------------------------------------------
Plugins selected: Authenticator standalone, Installer None
Renewing an existing certificate
Performing the following challenges:
tls-sni-01 challenge for musicfind.fun
Waiting for verification...
Cleaning up challenges

-------------------------------------------------------------------------------
new certificate deployed without reload, fullchain is
/etc/letsencrypt/live/musicfind.fun/fullchain.pem
-------------------------------------------------------------------------------

-------------------------------------------------------------------------------

Congratulations, all renewals succeeded. The following certs have been renewed:
  /etc/letsencrypt/live/musicfind.fun/fullchain.pem (success)

```