
  <template>
    <div class="vtx-vueComponent">
      this is vue template component
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import './style.scss'
  @Component
  export default class VueComponent extends Vue {
    
  }
  </script>
  
  <!-- Add "scoped" attribute to limit scss to this component only -->
  <style lang="sass" scoped>
  
  </style>
