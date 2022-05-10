<template>
  <a-tooltip :placement="placement" :overlayStyle="{ maxWidth: '800px' }">
    <template slot="title">
      <span><slot /></span>
    </template>
    <a-icon style="color: #aaafb6" type="question-circle" />
  </a-tooltip>
</template>

<script>
export default {
  name: 'IconTooltip',
  props: {
    placement: {
      type: String,
      default: 'top'
    }
  }
}
</script>

<style lang="less" scoped>
i.anticon {
  vertical-align: -0.125em;
  color: #3c404b;
  margin: 0 5px;
  cursor: pointer;
}
</style>
