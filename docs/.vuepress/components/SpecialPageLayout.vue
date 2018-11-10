<template>
<div class="page">
	<h2 id="item1"><a href="#item1" aria-hidden="true" class="header-anchor">#</a>sdfsadf</h2>
	
	<div class="content">
		<h1 id="item1"><a href="#item1" aria-hidden="true" class="header-anchor">#</a>/i1.html</h1>
		<p>
			图片
		</p>
	</div>
	<div class="page-edit">
		<!----><!---->
	</div>
	<div class="page-nav">
		<p class="inner">
			<!----><span class="next"><a href="/programtech/item/teddst2.html" class="">
          ITEM2
			</a>
        →
			</span>
		</p>
	</div>
</div>
</template>

<script>
export default {
  name: 'mycomments',
   mounted: function(){
    // require window 
    const Valine = require('valine');
    if (typeof window !== 'undefined') {
      this.window = window
      window.AV = require('leancloud-storage')

    }

    new Valine({
      el: '#vcomments' ,
      appId: 'vEoWxri0RFAY1sbxQ2qNHuDY-gzGzoHsz',// your appId
      appKey: '0qOKnDAKF1Ip4DaPoLdK3ibI', // your appKey
      notify:false, 
      verify:false, 
      avatar:'mm', 
      placeholder: 'just go go' 
    });
  }
}
</script>