module.exports = {
  title: 'Tom', // 设置网站标题
  base: '/blog/',
  description: 'Hello, World', //描述
  dest: './dist',   // 设置输出目录
  port: 2333, //端口
  head:[
    // ['script',{async:"",src:"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"}],
    // ['script',{},'(adsbygoogle=window.adsbygoogle||[]).push({google_ad_client:"ca-pub-5768745965496632",enable_page_level_ads:!0})']
  ],
  themeConfig: { //主题配置
    // 添加导航栏
    nav: [
      { text: '主页', link: '/' }, // 导航条
      { text: '组件文档', link: '/baseComponents/' },
      { text: '知识库', link: '/knowledge/' },
      {
        text: 'github',
        // 这里是下拉列表展现形式。
        items: [
          { text: 'focus-outside', link: 'https://www.musicfind.fun' },
          { text: 'stylus-converter', link: 'http://www.musicfind.fun' },
        ]
      }
    ],
    // 为以下路由添加侧边栏
    sidebar:{
      '/baseComponents/': [
        {
          title: '布局类组件',
          collapsable: true,
          children: [
            'base/test1',
            'base/test2',
            'base/test3',
            'base/test4',
          ]
        },
        {
          title: '可视化组件',
          collapsable: true,
          children: [
          ]
        },
        {
          title: '工具类组件',
          collapsable: true,
          children: [
          ]
        },
        {
          title: '方法类函数',
          collapsable: true,
          children: [
          ]
        }
      ],
      '/knowledge/': [
        {
          title: 'CSS知识库',
          collapsable: false,
          children: [
          ]
        },
        {
          title: 'JS知识库',
          collapsable: false,
          children: [
          ]
        },
        {
          title: 'node知识库',
          collapsable: false,
          children: [
          ]
        },
        {
          title: 'vue知识库',
          collapsable: false,
          children: [
          ]
        }
      ]
    }
  }
}