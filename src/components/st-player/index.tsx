import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
  props: {
    message: {
      type: String,
      required: true,
    }
  }
})
export default class StPlayer extends Vue {
  readonly message!: string

  render() {
    return (
      <div class='st-player'>
        <el-button onClick={() => {this.callData()}}>hahahahah</el-button>
      </div>
    )
  }

  callData() {
    console.log('callData',this.message)
    this.$emit('setData');
  }


}
