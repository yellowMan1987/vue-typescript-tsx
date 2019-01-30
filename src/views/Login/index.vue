
<template>
  <el-dialog 
    title="登录"
    :visible="dialogVisible" 
    class="vtx-login">
    <div class="vtx-login__input">
      <span class="vtx-login__input-lable">用户名</span>
      <el-input lable="用户名"></el-input>
    </div>
    <div class="vtx-login__input">
      <span class="vtx-login__input-lable">密码</span>
      <el-input lable="密码"></el-input>
    </div>
    <div class="vtx-login__btn">
      <el-button type="primary" >确定</el-button>
      <el-button type="primary" >取消</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as user from "@/apiService/apis/user";
import "./style.scss";

@Component<Login>({
  components: {},
  props: {},
  computed: {},
  methods: {},
  watch: {}
})
export default class Login extends Vue {
  dialogVisible = true;
  created() {}
  mounted() {
    const pramas = {
      username: 'admin',
      password: 'admin'
    }
    user.addUser(pramas).then((res) => {
      console.log('请求====>',res)
    }) 
    
  }

  beforeDestroy() {}
}
</script>

<!-- Add "scoped" attribute to limit scss to this component only -->
<style lang="sass" scoped>

</style>
