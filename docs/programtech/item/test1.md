# ITEM1
---
<template>
<div id="page">
	<div class="theme-container no-sidebar">
		<div class="home">
			<div class="hero">
				<!---->
				<h1>Tom</h1>
				<p class="description">
                      Welcome to Linux 
				</p>
				<p class="action">
					<a href="/baseComponents/" class="nav-link action-button">前往 →</a>
				</p>
			</div>
			<div class="footer">
          MIT Licensed | Copyright © 2018-present 
          <a href="http://http://www.miitbeian.gov.cn/"> 粤ICP备18108971号-3</a>
			</div>
            <div id="vcomments">
			</div>
        </div>
	</div>
</div>

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
</template>