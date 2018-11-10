module.exports = {
  title: 'Tom', // 设置网站标题
  // base: '/blog/',
  description: 'Hello, World', //描述
  dest: './dist',   // 设置输出目录
  port: 3002, //端口
  head:[
      ['link',{rel:'icon', type:"image/x-icon", href:'/favicon.ico'}]
    // ['script',{async:"",src:"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"}],
    // ['script',{},'(adsbygoogle=window.adsbygoogle||[]).push({google_ad_client:"ca-pub-5768745965496632",enable_page_level_ads:!0})']
  ],
  themeConfig: { //主题配置
    // 添加导航栏
    nav: [
      { text: '主页', link: '/' }, // 导航条
      { text: '编程技术', link: '/programtech/' },
      { text: '开发工具', link: '/programtool/' },
      { text: '服务器部署', link: '/serverdeploy/' }, // 导航条
      { text: '在线工具箱', link: '/onlinetool/' },
      { text: '工作简历', link: '/resume/' },
      { text: '生活专题', link: '/life/' },
      {
        text: 'github',
        // 这里是下拉列表展现形式。
        items: [
          { text: '找音乐', link: 'https://www.musicfind.fun' },
          { text: '小游戏', link: 'http://www.musicfind.fun' },
        ]
      }
    ],
    // 为以下路由添加侧边栏
    sidebar:{
      '/programtech/': [
        {
          title: 'Linux',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'Kafka',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'Zookeeper',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'Docker',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'K8S',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'Redis',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'Mysql',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'Oracle',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'SpringBoot',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'SpringCloud',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'JAVA',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'HTML5',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'Javascript',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'NodeJS',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'VueJs',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'CSS',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'Nginx',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'Mybatis',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'SSH',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'Maven',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        }
      ],  

      '/programtool/': [
        {
          title: 'Eclipse',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'Ideal',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'Git',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'SVN',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'VS Code',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'Notepad++',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'Jad',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        }
      ],
      '/serverdeploy/': [
        {
          title: '阿里云ECS',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: '域名注册与备案',
          collapsable: true,
          children: [
            'dns/register',
            'dns/cname',
            'dns/beian'
          ]
        }
      ],
      '/serverdeploy/': [
        {
          title: '阿里云ECS',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: '域名注册与备案',
          collapsable: true,
          children: [
            'dns/register',
            'dns/cname',
            'dns/beian'
          ]
        }
      ],
      '/onlinetool/': [
        {
          title: '格式化工具',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: '印象笔记',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: '禅道',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'confluence',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'Wiki',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        },
        {
          title: 'Github',
          collapsable: true,
          children: [
            'item/test1',
            'item/test2'
          ]
        }
      ],
      '/life/': [
        {
          title: '音乐学习',
          collapsable: true,
          children: [
            'music/test1',
            'music/test2'
          ]
        },
        {
          title: '小说阅读',
          collapsable: true,
          children: [
            'novel/test1',
            'novel/test2'
          ]
        },
        {
          title: '影视欣赏',
          collapsable: true,
          children: [
            'movietv/test1',
            'movietv/test2'
          ]
        },
        {
          title: '旅游分享',
          collapsable: true,
          children: [
            'travel/test1',
            'travel/test2'
          ]
        },
      ]
    }
  }
}