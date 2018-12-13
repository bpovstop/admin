<template>
  <div
    class="o-avatar"
    :style="{width:`${size}px`,height:`${size}px`,borderColor,borderWidth,backgroundImage:`url(${src})`}"
  />
</template>

<script>
export default {
  name: "o-avatar",
  props: {
    size: {
      type: Number,
      default: 24
    },
    src: String,
    borderWidth: {
      type: Number,
      default: 2
    },
    borderColor: {
      type: String,
      default: "hsla(0,0%,100%,.3)"
    }
  }
};
</script>
<style lang="scss" scoped>
.o-avatar {
  overflow: hidden;
  border-style: solid;
  border-radius: 50%;
  background-size: contain;
  box-sizing: border-box;
  background-clip: content-box;
}
</style>
