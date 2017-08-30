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

  </div>
</template>

<script>
export default {
  name: 'InvoiceSummaryHeader',
  props: [],
  computed: {
  },
}
</script>

<style scoped lang="scss">
  .header {
    border-radius: 3px 3px 0 0;
    background-color: #258C42;
    color: #ffffff;
    padding: 5px;

    .top {
      display: flex;
      justify-content: space-between;
    }

    .commerce-block-green {
      margin-top: -5px;
    }
  }

</style>
