# 定时任务Crontab命令详解
---
## crond简介

#### crond 是linux下用来周期性的执行某种任务或等待处理某些事件的一个守护进程，与windows下的计划任务类似，当安装完成操作系统后，默认会安装此服务 工具，并且会自动启动crond进程，crond进程每分钟会定期检查是否有要执行的任务，如果有要执行的任务，则自动执行该任务。

#### Linux下的任务调度分为两类，系统任务调度和用户任务调度。

#### 系统任务调度：系统周期性所要执行的工作，比如写缓存数据到硬盘、日志清理等。在/etc目录下有一个crontab文件，这个就是系统任务调度的配置文件。

#### /etc/crontab文件包括下面几行：

#### cat /etc/crontab

#### SHELL=/bin/bash

#### ATH=/sbin:/bin:/usr/sbin:/usr/bin

#### MAILTO=HOME=/

## run-parts

##### 51 * * * * root run-parts /etc/cron.hourly

##### 24 7 * * * root run-parts /etc/cron.daily

##### 22 4 * * 0 root run-parts /etc/cron.weekly

##### 42 4 1 * * root run-parts /etc/cron.monthly


<Common-Footer title="Linux">
</Common-Footer>