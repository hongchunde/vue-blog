---
title: SASL认证的kafka集群安装
lang: zh
meta:
  - name: description
    content: SASL认证 的kafka 集群安装
  - name: keywords
    content: SASL 认证 的kafka 集群安装
---

# SASL认证的kafka集群安装
---

原文地址:https://blog.csdn.net/z11220857/article/details/77049613

### 带安全认证的Kafka 集群安装配置(SASL+ACL)
使用SASL机制的KAFKA集群的安装

背景介绍

本文档是以北京联通最近布置的kafka集群为样本，结合一些教程和资料编写。之前北京联通使用的一直是0.8.2的版本，由于局方要求给实时数据交换平台添加安全认证分权分域的来发送和接收消息，故升级到0.10.2的最新版本。由于是内网传输，所以我们采用了主机之间SASL安全认证而未采用ssl传输过程加密，且kafka的broker同zookeeper之间也未采用SASL安全认证。

名词解释

SASL

全称Simple Authentication and Security Layer，是一种用来扩充C/S模式验证能力的机制。

Topic

Kafka将消息种子(Feed)分门别类，每一类的消息称之为一个主题(Topic).

Producer

发布消息的对象称之为主题生产者(Kafka topic producer)

Consumer

订阅消息并处理发布的消息的种子的对象称之为主题消费者(consumers)

Broker

已发布的消息保存在一组服务器中，称之为Kafka集群。集群中的每一个服务器都是一个代理(Broker). 消费者可以订阅一个或多个主题（topic），并从Broker拉数据，从而消费这些已发布的消息。

环境配置

3台已经安装zookeeper的CentOS 6.5虚拟机

Hostname

IP地址

节点一 node01 192.168.40.11

节点二 node02 192.168.40.12

节点三 node03 192.168.40.13

本次安装主机防火墙均关闭，三台机器之间做过RSA免密钥

(zookeeper安装和免密钥后续会再出一个文档)

下面我们进入安装过程

下载最新版本

目前kafka的最新版本为0.10.2.1，我们上官网下载一个压缩包，由于本机使用的sacala版本为2.10，故我们下载了scala 2.10 - kafka_2.10-0.10.2.1.tgz (asc, md5) ，地址：

https://www.apache.org/dyn/closer.cgi?path=/kafka/0.10.2.1/kafka_2.10-0.10.2.1.tgz
· 上传节点，解压到自定义目录／home／，修改集群目录名字为/home/kafka_0.10

修改broker配置文件

· 进入/home/kafaka_0.10/config目录，编辑server.properties

· 具体的性能参数要根据业务来修改，我们主要修改影响集群搭建的几项。

broker.id=0
此项配置因为有三台主机，所以每个主机分别配置了从0到2的主机id。

delete.topic.enable=true
是否能够删除消息主题topic

listeners=SASL_PLAINTEXT://node01:6667
监听的主机地址端口，填写本机地址即可，例如node01填写listeners=SASL_PLAINTEXT://node01:6667(必须在三台机器都配置主机名列表)，也可以直接写IP地址，即外部服务器连接kafka主机的地址和端口，SASL_PLAINTEXT为使用的安全机制名称。

log.dirs=/home/kafka/logs
此处填写kafka的log存放地址，＝后面的地址文件夹必须启动集群前使用前创建。

num.partitions=3
partition个数设置，如果在创建topic的时候没有指定partition的数量，则使用这个值来设置。

zookeeper.connect=node01:2181,node02:2181,node03:2181
zookeeper集群的地址和端口
security.inter.broker.protocol=SASL_PLAINTEXT
sasl.mechanism.inter.broker.protocol=PLAIN
sasl.enabled.mechanisms=PLAIN
authorizer.class.name = kafka.security.auth.SimpleAclAuthorizer
super.users=User:admin
这几项对应的就是SASL的设置，最后一行是设定超级用户admin，这个用户一会会在jaas配置文件里设置用户名和密码.

· node02和node03除了id、监听的主机和端口配置不一样，别的配置都一样。

· 下面创建kafka_server_jaas.conf

vikafka_server_jaas.conf

文件内容如下：

KafkaServer {
org.apache.kafka.common.security.plain.PlainLoginModule required
username="admin"
password="admin"
user_admin="admin"
user_alice="alice";
};
此处配置了两个用户，一个admin，一个是alice。＝后面为用户的密码，这里我们设置成和用户名一样的了。每个主机都要配置，这个是broker通信必须的配置。admin用户必须设置，即user_admin=”admin”

· 最后需要为 Kafka 添加 java.security.auth.login.config 环境变量。在 bin/kafka-run-class.sh 中添加以下内容：

KAFKA_SASL_OPTS='-Djava.security.auth.login.config=/home/kafka_0.10/config/kafka_server_jaas.conf'
# Launch mode
if [ "x$DAEMON_MODE" = "xtrue" ]; then
nohup $JAVA $KAFKA_HEAP_OPTS $KAFKA_JVM_PERFORMANCE_OPTS $KAFKA_GC_LOG_OPTS $KAFKA_SASL_OPTS $KAFKA_JMX_OPTS $KAFKA_LOG4J_OPTS -cp $CLASSPATH $KAFKA_OPTS "$@" > "$CONSOLE_OUTPUT_FILE" 2>&1 < /dev/null &
else
exec $JAVA $KAFKA_HEAP_OPTS $KAFKA_JVM_PERFORMANCE_OPTS $KAFKA_GC_LOG_OPTS $KAFKA_SASL_OPTS $KAFKA_JMX_OPTS $KAFKA_LOG4J_OPTS -cp $CLASSPATH $KAFKA_OPTS "$@"
fi
· 红色标记部分为添加内容，该段内容位于kafka-run-class.sh脚本的最后。

客户端的配置

1. 配置客户端安全认证文件kafka_client_jaas.conf

· kafka_client_jaas.conf此文件主要供jar包客户端使用。

· 我们创建/home/conf文件夹,然后在文件夹下创建kafka_client_jaas.conf 文件

[root@node02 ~]# cd /home
[root@node02 home]# mkdir conf
[root@node02 home]# vi kafka_client_jaas.conf
文件内容如下：

KafkaClient {
org.apache.kafka.common.security.plain.PlainLoginModule required
username="alice"
password="alice";
};
此处alice即为kafka_server_jaas.conf文件中设置的用户，作为登录用户名和密码供客户端登陆使用。

2. 修改console-producer和console-consumer的配置

· 然后在producer.porperties添加环境变量和配置

[root@node01 home]# cd kafka_0.10/config
[root@node01 home]#vi producer.properties
文件内容修改如下：

bootstrap.servers=node01:6667,node02:6667,node03:6667
bootstrap.servers=后的内容即为kafka集群主机地址和端口。
最后在文件末尾加上：
sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required 
username="alice" 
password="alice";
security.protocol=SASL_PLAINTEXT
sasl.mechanism=PLAIN
· 修改consumer.porperties添加环境变量和配置

zookeeper.connect=node01:2181,node02:2181,node03:2181
zookeeper.connnect=后面填写zookeeper集群的主机地址和端口。
group.id=test1
这里是消费者组群填写，这里我设置的是test1，这个主要是为了console口的consumer来使用的。

sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required 
username="alice" 
password="alice";
security.protocol=SASL_PLAINTEXT
sasl.mechanism=PLAIN
以上配置加在文件的末尾。

· 到此我们就完成了全部需要配置的文件的修改，下面我们准备启动kafka集群。

集群启动

· 在启动kafka集群前，首先确保zookeeper集群的启动

· 启动zookeeper后，进入/home/kafka_0.10/bin目录

[root@node02 ~]# cd /home/kafka_0.10/bin
[root@node02 ~]#./kafka-server-start.sh config/server.properties &
· 接着我们要创建主题topic

[root@node02 ~]#./kafka-topics.sh --create --zookeeper node01:2181,node02:2181,node03:2181 --replication-factor 1 --partitions 1 --topic test1
我们通过此命令创建了一个叫做test1的主题topic，备份因子一个，partition一个。

· 然后我们通过list命令来查看相关topic的列表

[root@node02 ~]./kafka-topics.sh --list --zookeeper node01:2181,node02:2181,node03:2181 test
· 我创建了kafka_ss和test1两个topic可见以下内容：

[root@node01 bin]# ./kafka-topics.sh --list --zookeeper node01:2181,node02:2181,node03:2181 test
[2017-06-12 13:25:52,280] WARN SASL configuration failed: javax.security.auth.login.LoginException: No JAAS confi
guration section named 'Client' was found in specified JAAS configuration file: '/home/kafka_0.10/config/kafka_server_jaas.conf'. Will continue connection to Zookeeper server without SASL authentication, if Zookeeper server allows it. (org.apache.zookeeper.ClientCnxn) __consumer_offsets
kafka_ss
test1
可以看到一共有三个topic：__consumer_offsets、kafka_ss、test1。__consumer_offsets为默认的topic。上面出现的报警信息是正常的，因为kafka brokers与zookeeper的主机之间未使用sasl认证，可以忽略。

设置acl权限

· 在/home/kafka_0.10/bin目录下：

添加alice作为主题kafka_ss的消费者，用消费者组为test1，我们只用 --consumer 选项，zookeeper.connnect后面写zookeeper的主机和地址。

./kafka-acls.sh --authorizer-properties zookeeper.connect=node01:2181,node02:2181,node03:2181 --add --allow-principal User:alice --consumer --topic kafka_ss --group test1
这个设置可以让alice用户在console-cosumer上面用test1消费组消费kafka_ss的消息。

· 为了可以远程用程序来实现生产和消费消息，我们继续设置alice用户的权限。

./kafka-acls.sh --authorizer-properties zookeeper.connect=node01:2181,node02:2181,node03:2181 --add --allow-principal User:alice --allow-host * --operation Read --operation Write --topic kafka_ss
此命令可以设置允许alice用户从所有IP地址读写topic kafka_ss，zookeeper.connnect后面写zookeeper的主机和地址。

· 如果要限制IP地址，可以采用下面的命令：

./kafka-acls.sh --authorizer-properties zookeeper.connect= node01:2181,node02:2181,node03:2181 --add --allow-principal User:alice --allow-host 192.168.40.11 --allow-host 192.168.40.12 --operation Read --operation Write --topic kafka_ss
以上命令可以让alice用户从192.168.40.11和192.168.40.12读写topickafka_ss。

· 查看对应能操作topic的用户列表

./kafka-acls.sh --authorizer-properties zookeeper.connect=node01:2181,node02:2181,node03:2181 --list --topic kafka_ss
可以得到以下内容

[2017-06-12 15:20:10,891] WARN SASL configuration failed: javax.security.auth.login.LoginException: No JAAS configuration section named 'Client' was found in specified JAAS configuration file: '/home/kafka_0.10/config/kafka_server_jaas.conf'. Will continue connection to Zookeeper server without SASL authentication, if Zookeeper server allows it. (org.apache.zookeeper.ClientCnxn)Current ACLs for resource `Topic:kafka_ss`:
User:alice has Allow permission for operations: Describe from hosts: *
User:alice has Allow permission for operations: Read from hosts: *
User:alice has Allow permission for operations: Write from hosts: *
可以看到用户alice可以从任何IP上读写和描述kafak_ss的消息。

· 那我们接下来描述一下topic kafka_ss

./kafka-topics.sh --describe --topic kafka_ss --zookeeper node01:2181,node02:2181,node03:2181
得到以下内容：

Topic:kafka_ss PartitionCount:1 ReplicationFactor:1
Configs:Topic: kafka_ss Partition: 0 Leader: -1 Replicas: 0 Isr:
第一行是所有分区的摘要，每一个线提供一个分区信息，因为我们只有一个分区，所有只有一条线。

· 到这里我们的生产和消费消息之前的准备已经全部完成，生下来我们就要开始使用console和程序来开始生产和消费消息了。

使用客户端生产和消费消息

使用console客户端

· 在node01的/home/kafka_0.10/bin目录下，运行console-consumer

./kafka-console-consumer.sh --bootstrap-server node01:6667,node02:6667,node03:6667 --topic kafka_ss --from-beginning --consumer.config=../config/consumer.properties
此命令可以开启console口开始读取kafka_ss topic 下的消息

显示以下内容：

[2017-06-12 17:21:20,234] WARN The configuration 'zookeeper.connect' was supplied but isn't a known config.
(org.apache.kafka.clients.consumer.ConsumerConfig)
[2017-06-12 17:21:20,234] WARN The configuration 'zookeeper.connection.timeout.ms' was supplied but isn't a known config.(org.apache.kafka.clients.consumer.ConsumerConfig)
由于目前还没有producer往topic里发送消息所以，告警下方还没有数据，告警可以忽略。

· 在node02的/home/kafka_0.10/bin目录下，运行console-producer

./kafka-console-producer.sh --broker-list node01:6667,node02:6667,node03:6667 --topic kafka_ss --producer.config=../config/producer.properties
此命令可以开启console口开始往kafka_ss topic 里发送消息

启动完成之后不会有任何信息，直接输入消息然后回车就发送出去了。

使用java api来使用客户端

· 使用java api的consumer程序
```  \\              //
package kafkademo;
import java.util.Arrays;
import java.util.Properties;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
public class consumerdemo2 {
public static void main(String[] args) {
Properties props = new Properties();
props.put("bootstrap.servers", "node01:6667,node02:6667,node03:6667");
props.put("group.id", "test1");
props.put("enable.auto.commit", "true");
props.put("auto.commit.interval.ms", "1000");
props.put("key.deserializer","org.apache.kafka.common.serialization.StringDeserializer");
props.put("value.deserializer","org.apache.kafka.common.serialization.StringDeserializer");
// acl Authorizer
props.put("security.protocol", "SASL_PLAINTEXT");
props.put("sasl.mechanism", "PLAIN");
System.setProperty("java.security.auth.login.config","/Users/book/conf/kafka_client_jaas.conf");
KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
consumer.subscribe(Arrays.asList("kafka_ss"));
while (true) {
ConsumerRecords<String, String> records = consumer.poll(100);
for (ConsumerRecord<String, String> record : records)
System.out.printf("offset = %d, key = %s, value = %s%n",
record.offset(), record.key(), record.value());
}
}
}
```
上面方框内的内容，红色标注的是acl认证增加部分，其余的部分跟一般消费者程序一致。

· bootstrap.servers对应的value值应该是集群的地址和端口

· group.id对应的值则是分配的消费者组

· 其他配置无需改动

· 使用java api的producer程序

```  \\              //
package kafkademo;
import java.util.Properties;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;
public class producerdemo2 {
public static void main(String[] args) {
// TODO Auto-generated method stub
Properties props = new Properties();
props.put("bootstrap.servers", "node01:6667,node02:6667,node03:6667");
props.put("acks", "0");
props.put("retries", 0);
props.put("batch.size", 16384);
props.put("linger.ms", 1);
props.put("buffer.memory", 33554432);
props.put("key.serializer","org.apache.kafka.common.serialization.StringSerializer");
props.put("value.serializer","org.apache.kafka.common.serialization.StringSerializer");
//acl Authorizer
System.setProperty("java.security.auth.login.config", "/Users/book/conf/kafka_client_jaas.conf");
props.put("security.protocol", "SASL_PLAINTEXT");
props.put("sasl.mechanism", "PLAIN");
Producer<String, String> producer = new KafkaProducer<>(props);
for (int i = 0; i < 10; i++)
producer.send(new ProducerRecord<String, String>(
"kafka_ss",Integer.toString(i), Integer.toString(i)));
System.out.println("11
");
producer.close();
}
}
```
上面方框内的内容，红色标注的是acl认证增加部分，其余的部分跟一般生产者程序一致。

· bootstrap.servers对应的value值应该是集群的地址和端口

· 其他配置无需改动

· 先启动消费者，再启动生产者，console口会打印出如下内容

到此demo程序运行成功，安装完成。

<Common-Footer title="Kafka">
</Common-Footer>