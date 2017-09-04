<template>
  <div class="content">
    <div class="row">
      <div class="form-group">
        <label class="pull-left title">Enter Ethereum return address</label>
        <input class="form-control" type="text" v-model="ethereumReturnAddress" placeholder="Etherum address" />
        <div class="col-xs-12">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="form-group">
        <label class="pull-left title">Which wallet are you using?</label>
        <select class="form-control" v-model="ethereumWalletProvider">
          <option value="" selected disabled>Please select wallet provider</option>
          <option value="my_ether_wallet">My Ether Wallet</option>
        </select>
        <div class="col-xs-12">

        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'DistributionDetails',
  props: ['ethereumReturnAddress', 'ethereumWalletProvider'],
}
</script>

<style scoped>
.content {
  color: #141414;
  font-family: "Open Sans";
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  padding: 50px;
  padding-bottom: 100px;
}

/*.title {
  padding-left: 20px;
}*/
</style>
