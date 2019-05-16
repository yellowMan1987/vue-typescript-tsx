<template>
  <div class="heart_wrap">
    <h1>heart</h1>
    <div class="heart">
      <div class="left"></div>
      <div class="right"></div>
    </div>

    <div class="shadow">
      <div class="glow_1"></div>
      <div class="glow_2"></div>
      <div class="glow_3"></div>
      <div class="glow_4"></div>
    </div>
  </div>
</template>
<script>
export default {
	
}
</script>

<style lang="css" scoped>
@charset "utf8";

/*                                               Animated Heart Started Here ...
=======================================================================================================================*/
.heart_wrap{
	position:relative;
	margin:0;
	padding:0;
	font-family:Tahoma,Geneva,sans-serif;
	font-size:16px;
	font-style:normal;
	font-weight:400;
	text-align:center;
  height: 40vh;
}

.heart{
	width:200px;
	height:200px;
	top:50%;
	left:50%;
	/* z-index:1; */
	display:block;
	position:absolute;
	transform:translate(-50%,-50%);
	animation:heart 4s ease infinite
	}

@keyframes heart{
	0%{transform:translate(-50%,-50%) scale(.2,.2)}
	8%{transform:translate(-50%,-50%) scale(.4,.4)}
	16%{transform:translate(-50%,-50%) scale(.3,.3)}
	24%{transform:translate(-50%,-50%) scale(.5,.5)}
	32%{transform:translate(-50%,-50%) scale(.4,.4)}
	40%{transform:translate(-50%,-50%) scale(.6,.6)}
	48%{transform:translate(-50%,-50%) scale(.5,.5)}
	56%{transform:translate(-50%,-50%) scale(.7,.7)}
	64%{transform:translate(-50%,-50%) scale(.6,.6)}
	72%{transform:translate(-50%,-50%) scale(.8,.8)}
	80%{transform:translate(-50%,-50%) scale(.7,.7)}
	88%{transform:translate(-50%,-50%) scale(.9,.9)}
	96%{transform:translate(-50%,-50%) scale(.8,.8)}
	100%{transform:translate(-50%,-50%) scale(1,1)}
	}

.heart:before{
	background:#fff;
	content:"";
	width:170px;
	height:170px;
	top:15px;
	left:15px;
	display:block;
	position:absolute;
	border-radius:50%
	}

.heart div{
	background:#ff0000;
	width:80px;
	height:120px;
	top:40px;
	display:block;
	position:absolute;
	border-radius:50%
	}

.left
	{left:45px;transform:rotate(330deg)}

.right
	{right:45px;transform:rotate(30deg)}

.shadow{
	width:200px;
	height:200px;
	top:50%;
	left:50%;
	display:block;
	position:absolute;
	transform:translate(-50%,-50%);
	animation:shadow 4s ease infinite
	}

@keyframes shadow{
	0%,96%{transform:translate(-50%,-50%) scale(0,0)}
	100%{transform:translate(-50%,-50%) scale(1,1)}
	}

[class*="glow_"]{
	background:#ff0000;
	width:10px;
	height:100%;
	top:0;
	left:95px;
	display:block;
	position:absolute;
	border-radius:10px
	}

.glow_2
	{transform:rotate(45deg)}

.glow_3
	{transform:rotate(90deg)}

.glow_4
	{transform:rotate(135deg)}

</style>




