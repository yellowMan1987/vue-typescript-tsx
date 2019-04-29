import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'vt-com',
  props: {
    message: {
      type: String,
      required: true,
    }
  }
})
export default class VtCom extends Vue {
  readonly message!: string

  render() {
    return (
      <div>
        <el-button onClick={() => {this.callData()}}>hahahahah</el-button>
      </div>
    )
  }

  callData() {
    console.log('callData',this.message)
    this.$emit('setData');
  }


}
