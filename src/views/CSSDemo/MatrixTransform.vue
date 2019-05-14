<template>
  <div class="css-demo">
    <div class="container" @mousemove="move" @mouseout="mouseout" ref="container">
      <div class="image1" ref="image1"></div>
      <div class="image2" ref="image2"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    move(event) {
      let mousex = 0;
      let mousey = 0;
      let changex = 0;
      let changey = 0;
      let mv = 500;

      // 中心点
      mousex = event.clientX - this.$refs.container.offsetLeft - this.$refs.container.clientWidth / 2;
      mousey = event.clientY - this.$refs.container.offsetTop - this.$refs.container.clientHeight / 2;
      changex = mousey / mv;
      changey = mousex / mv;

      // 背景和内部元素transform
      this.setCss(this.$refs.container,'transform',`perspective(400px) rotatex(${changex}deg) rotateY(${changey}deg)`);
      this.setCss(this.$refs.image1,'transform',`matrix(1,0,0,1,${mousex / -30},${mousey / -30 })`);
      this.setCss(this.$refs.image2,'transform',`matrix(1,0,0,1,${mousex / 20},${mousey / 20 })`);
    },
    mouseout() {
      this.setCss(this.$refs.container,'transform',`perspective(400px) rotatex(0deg) rotateY(0deg)`);
      this.setCss(this.$refs.image1,'transform',`matrix(1,0,0,1,0,0)`);
      this.setCss(this.$refs.image2,'transform',`matrix(1,0,0,1,0,0)`);
    },
    setCss(curEle,attr,value){
      //在JS中设置float样式值的话也需要处理兼容
      if(attr==="float"){
          curEle["style"]["cssFloat"]=value;
          curEle["style"]["styleFloat"]=value;
          return;
      }

      //如果打算设置的是元素透明度，需要设置两套样式来兼容所有浏览器
      if(attr==="opacity"){
          curEle["style"]["opacity"]=value;
          curEle["style"]["filter"]="alpha(opacity="+value*100+")";
          return;
      }  

      const reg=/^(width|height|top|bottom|left|right|((margin|padding)(Top|Bottom|Left|Right)?))$/;
      if(reg.test(attr)){
          if(!isNan(value)){//--->判断传递进来的value值是否是一个有效数字，如果是有效数字，证明当前传递进来的值没有加单位，给补充单位
              value+="px";
          }
      }

      //对于某些样式属性，如果传递进来的值没有加单位，需要把单位默认的补充上     
      curEle["style"][attr]=value;
    }

  },
}
</script>

<style lang="scss" scoped>
.css-demo {
  height: 6rem;
  width: 100%;
  .container {
    position: relative;
    width: 1000px;
    height: 100%;
    background: palevioletred;
    margin: 0 auto;
    div {
      height: 200px;
      width: 200px;
      position: absolute;
      bottom: calc(50% - 150px);
    }
    .image1 {
      right: 200px;
      background: rgb(62, 209, 99);
    }
    .image2 {
      left: 200px;
      background: rgb(41, 69, 158);
    }
  }
}
</style>




