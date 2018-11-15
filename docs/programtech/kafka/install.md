# kafka集群安装
---
### 1 安装包来源
kafka官网(https://kafka.apache.org/downloads)： 
<div id="page">
    <img src="/kafkalogo.png"  alt="kafka" />
</div>

### 2 集群服务器说明

<hr></hr>

```flow  \\                   // 
服务器10.153.78.36，10.153.78.37，10.153.78.38三台机器
每台机器安装一个zookeeper 节点,一个kafka server 节点
```

### 3 单台（10.153.78.36）服务器配置（其他服务器类似)

#### 创建kafka用户
<hr></hr>

```  \\              //
groupadd kafka
useradd kafka
passwd kafka 
```

###  使用kafka用户登陆
<hr></hr>

```  \\              //
mkdir  /usr/local/src  /** 创建目录 **/
cd  /usr/local/src  /** 打开目录 **/
rz -y  /** 上传kafka程序包 **/
tar -zxvf  kafka_2.11-2.0.0.tgz /** 解压包 **/
mv kafka_2.11-2.0.0  /usr/local/kafka   /** 重命名目录 **/
cd /usr/local/kafka/config    /** 打开配置目录 **/
 

```
##### vi zookeeper.properties  /** 修改zookeeper配置 **/

####  修改zookeeper.properties以下内容
<hr></hr>

```  \\                //
dataDir=/usr/local/kafka/zookeeper     /** 修改zookeepr数据路径,kafka用户必须有权限 **/
dataLogDir=/usr/local/kafka/log/zookeeper  /** 修改zookeepr日志路径,kafka用户必须有权限 **/
# the port at which the clients will connect
clientPort=2181      /** 修改zookeepr监听端口,默认是2821  **/

 /** 修改zookeepr 集群通讯端口  **/
server.1=10.153.78.36:2888:3888    
server.2=10.153.78.37:2888:3888
server.3=10.153.78.38:2888:3888

 /** 保存退出 **/
:x
```

#### 启动zookeeper
<hr></hr>

```  \\                //
 cd /usr/local/kafka/bin   /** 打开目录  **/
./zookeeper-server-start.sh ../config/zookeeper.properties /** 启动zookeeper **/

```

####  修改server.properties以下内容
<hr></hr>

```  \\                // 

cd /usr/local/kafka/config      /** 打开目录  **/
vi server.properties    /** 编辑配置文件  **/
------------修改以下内容
broker.id=1

# A comma separated list of directories under which to store log files
log.dirs=/usr/local/kafka/kafka-logs

# The default number of log partitions per topic. More partitions allow greater
# parallelism for consumption, but this will also result in more files across
# the brokers.
num.partitions=1

#listeners=PLAINTEXT://:9092
port=9092
host.name=10.153.78.38

zookeeper.connect=10.153.78.36:2181,10.153.78.37:2181,10.153.78.38:2181




```


<Common-Footer title="Kafka">
</Common-Footer>