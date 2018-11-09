<template>
    <o-view hor ver id="logo">
        <span>LOGO</span>
    </o-view>
</template>
<style lang="stylus" scoped>
#logo {
    height: 48px;
    z-index: 2;
    position: relative;

    span {
        color: var(--color-primary);
    }
}
</style>

<script>
export default {
  name: "logo"
};
</script>

