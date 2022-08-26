import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RenderFunction',
  props: {
    renderFunc: {
      type: Function,
      required: true
    },
    record: {}
  },
  render() {
    return this.renderFunc(this.record)
  }
})
