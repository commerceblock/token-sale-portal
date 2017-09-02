<template>
  <div class="header">
    <div class="top">
      <div class="row">
        <img class="commerce-block-white-bg" src="/static/assets/white-logo.png" />
        <span class="commerce-block-green">
          <img src="/static/assets/company-name.svg" />
        </span>
        <img class="icon-lock-green" src="/static/assets/icon-lock-green.svg" />
      </div>
    </div>
    <div class="row">
      <div class="col-xs-6 text-center">
        <div class="row">{{ cbtAmount }} CBT</div>
        <div class="row">Tokens Purchased</div>
      </div>
      <div class="col-xs-6 text-center">
        <div class="row">{{ numberOfConfirmations }} of 3</div>
        <div class="row">No. of Confirmations</div>
      </div>
      <div class="col-xs-6 col-xs-offset-6 text-center external-link">
        <a href="#">View on Blockchain</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvoiceSummaryHeader',
  props: [],
  data() {
    return {
      cbtAmount: null,
      numberOfConfirmations: null
    }
  },
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
}

.top {
  display: flex;
  justify-content: space-between;
}

.commerce-block-green {
  margin-top: -5px;
}

a:link {
  color: #ffffff;
}

a:visited {
  color: #ffffff;
}

.external-link {
  font-size: 12px;
  text-decoration: underline;
}
</style>
