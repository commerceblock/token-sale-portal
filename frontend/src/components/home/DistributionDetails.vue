<template>
  <div class="content">
    <div class="row">
      <div class="form-group">
        <label class="pull-left title">Enter Ethereum CBT token receiving address. <br> You need to control private and public key of this address.</label>
        <input class="form-control" type="text" v-model="ethereumReturnAddressInput" placeholder="Etherum address"  :disabled="isEthereumReturnAddressNotEmpty" ref="ethereumReturnAddress"/>
        <div class="col-xs-12">
        </div>
      </div>
    </div>
    <!-- <div class="row">
      <div class="form-group">
        <label class="pull-left title">Which wallet are you using?</label>
        <select class="form-control" v-model="ethereumWalletProviderInput" :disabled="isEthereumWalletProviderNotEmpty">
          <option value="" selected disabled>Please select wallet provider</option>
          <option value="my_ether_wallet">My Ether Wallet</option>
        </select>
        <div class="col-xs-12">

        </div>
      </div>
    </div> -->
  </div>
</template>


<script>
import { isEmpty } from 'lodash'

export default {
  name: 'DistributionDetails',
  props: ['ethereumReturnAddress', 'ethereumWalletProvider'],
  data () {
    return {
      ethereumReturnAddressInput: null,
      ethereumWalletProviderInput: null
    };
  },
  computed: {
    isEthereumReturnAddressNotEmpty () {
      return !isEmpty(this.ethereumReturnAddress);
    },
    isEthereumWalletProviderNotEmpty () {
      return !isEmpty(this.ethereumWalletProvider);
    },
  },
  updated () {
    if (this.ethereumReturnAddress) {
      this.ethereumReturnAddressInput = this.ethereumReturnAddress;
    }
    if (this.ethereumWalletProvider) {
      this.ethereumWalletProviderInput = this.ethereumWalletProvider;
    }
  },
}
</script>

<style scoped>
.content {
  color: #141414;
  font-family: "Open Sans";
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  padding: 0 50px;
  position: relative;
  min-height: 300px;
}
</style>
