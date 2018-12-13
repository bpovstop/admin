<template>
  <div class="main">
    <section>
      <span>500</span>
      <p>The service is not available now</p>
    </section>
  </div>
</template>
<style lang="scss" scoped>
.main {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  section {
    display: flex;
    flex-direction: row;
    span {
      font-size: 24px;
      font-weight: 500;
      display: block;
      text-align: center;
      border-right: 1px solid #eaeaea;
      padding: 0 20px 0 0;
      width: auto;
      line-height: 40px;
    }
    p {
      margin: 0;
      line-height: 40px;
      padding-left: 20px;
      font-size: 14px;
      font-weight: 400;
    }
  }
}
</style>
