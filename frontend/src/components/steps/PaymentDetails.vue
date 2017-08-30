<template>
  <div class="content">
    <div class="row">
      <div class="text-center cbt-title">
        <h2 v-if="cbtAmount">{{ cbtAmount }} CBT</h2>
        <h2 v-else>0.0 CBT</h2>
      </div>
    </div>
    <div class="row">
      <div class="text-center">
        <strong>1 CommerceBlock Token = 10 USD</strong>
      </div>
    </div>
    <div class="row">
      <div class="text-center">
        <small>25% Preorder Bouns</small>
      </div>
    </div>
    <div class="row">
      <div class="input-group form-group">
        <label class="pull-left title-usd-amount">Enter amount in USD</label>
        <div class="col-xs-12">
          <input class="form-control input-usd-amount" type="text" v-model="usdAmount" placeholder="Amount">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="input-group form-group">
        <label class="pull-left title-usd-amount">How you would like to pay?</label>
        <div class="col-xs-12">
          <input class="form-control input-usd-amount" type="text" v-model="usdAmount" placeholder="Amount">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-3">
        <label class="radio-inline"><input type="radio" name="currencyType">BTC</label>
      </div>
      <div class="col-xs-3">
        <label class="radio-inline"><input type="radio" name="currencyType">ETH</label>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'PaymentDetails',
  props: [],
  data() {
    return {
      cbtAmount: null,
      usdAmount: null
    }
  },
  components: {
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.content {
  color: #141414;
  font-family: "Open Sans";
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  padding: 20px 10px;

  .cbt-title {
    color: #258C42;
  }

  .title-usd-amount {
    margin-top: 25px;
    padding-left: 20px;
    margin-left: 30px;
  }

  .title-usd-input {
    padding-left: 20px;
    margin-left: 30px;
  }

  .input-usd-amount {
    padding-left: 20px;
    margin-left: 35px;
  }
}
</style>
