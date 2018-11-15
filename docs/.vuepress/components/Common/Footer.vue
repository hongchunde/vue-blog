<template>
<div id="page">
	<div class="theme-container no-sidebar">
		<div class="home">
			<div class="hero">
				<p class="description">
                      Welcome to {{title}} 
				</p>
			</div>
			<div class="footer">
				MIT Licensed | Copyright © 2018-present 
 				<a href="http://http://www.miitbeian.gov.cn/"> 粤ICP备18108971号-3</a>			
			</div>
        </div>
	</div>
</div>

</template>


<script>
export default {
  name: 'FooterPage',
  props: ['title', 'description']
  
}
</script>