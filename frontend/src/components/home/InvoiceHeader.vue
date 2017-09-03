<template>
  <div class="header">
    <div class="top">
      <div>
        <img class="commerce-block-white-bg" src="/static/assets/white-logo.png" />
        <span class="commerce-block-green">
          <img src="/static/assets/company-name.svg" />
        </span>
      </div>
      <img class="icon-lock-green" src="/static/assets/icon-lock-green.svg" />
    </div>
    <div class="invoice-title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'InvoiceHeader',
  props: ['title'],
  computed: {
  },
}
</script>

<style scoped>
.header {
  border-radius: 3px 3px 0 0;
  background-color: #258C42;
  color: #ffffff;
  padding: 5px;
  padding-bottom: 25px;
}

.top {
  display: flex;
  justify-content: space-between;
}

.invoice-title {
  color: #FFFFFF;
  font-family: "Open Sans";
  text-align: center;
  margin: 10px;
  font-size: 28px;
  font-weight: bold;
}

.icon-lock-green {
  /* height: 2.15%; */
  /* width: 1.6%; */
  /* opacity: 0.25; */
}

.commerce-block-green {
  margin-top: -5px;
}

.commerce-block-white-bg {
   height: 24px;
  /* width: 32px; */
  /* opacity: 0.25; */
}
</style>
