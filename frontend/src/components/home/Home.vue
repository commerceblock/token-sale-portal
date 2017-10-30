<template>
  <div class="wrapper">
    <next-steps-modal v-if="showNextSteps" @close="showNextSteps = false" />
    <form-wizard title="" subtitle="" class="invoice" color="#538C46" @on-complete="onComplete">
      <tab-content title="Distribution Details" icon="fa fa-cloud-download" :before-change="submitReturnAddress">
        <div class="invoice-box">
          <invoice-header :title="'Contribution Details'" />
          <payment-details :usdAmount="usdAmount" :coin="coin" :tokenUnitPrice="tokenUnitPrice" :changeRates="changeRates" ref="paymentDetails" />
          <distribution-details :ethereumReturnAddress="ethereumReturnAddress" :ethereumWalletProvider="ethereumWalletProvider" ref="distributionDetails" />
        </div>
      </tab-content>
      <!-- <tab-content title="Payment Details" icon="fa fa-file-text-o" :before-change="submitOrder">
        <div class="invoice-box">
          <invoice-header :title="'Payment Details'" />
          <payment-details :usdAmount="usdAmount" :coin="coin" :tokenUnitPrice="tokenUnitPrice" :changeRates="changeRates" ref="paymentDetails" />
        </div>
      </tab-content> -->
      <tab-content title="Invoice Summary" icon="fa fa-qrcode">
        <div class="invoice-box">
          <invoice-summary-header :cbtTokenAmount="cbtTokenAmount" :coin="coin" :paymentAddress="paymentAddress" ref="invoiceSummaryHeader" />
          <invoice-summary :cryptoAmount="cryptoAmount" :coin="coin" :paymentAddress="paymentAddress" :usdAmount="usdAmount" />
        </div>
      </tab-content>
    </form-wizard>
    <div>
      <div class="footer"><a href="https://www.commerceblock.com/">https://www.commerceblock.com/</a></div>
      <!-- <div class="footer-link">
        <a href="https://www.commerceblock.com/">https://www.commerceblock.com/</a>
      </div> -->
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import InvoiceHeader from './InvoiceHeader.vue'
import DistributionDetails from './DistributionDetails.vue'
import PaymentDetails from './PaymentDetails.vue'
import InvoiceSummary from './InvoiceSummary.vue'
import InvoiceSummaryHeader from './InvoiceSummaryHeader.vue'
import NextStepsModal from './NextStepsModal.vue'
import {
  FormWizard,
  TabContent
} from 'vue-form-wizard'
import {
  computeTokenAmount,
  computeCryptoAmount
 } from '../../lib/util'

export default {
  name: 'Home',
  components: {
    InvoiceHeader,
    DistributionDetails,
    PaymentDetails,
    InvoiceSummary,
    InvoiceSummaryHeader,
    NextStepsModal,
    FormWizard,
    TabContent
  },
  data() {
    return {
      showNextSteps: false
    }
  },
  computed: {
    apolloClient() {
      return this.$apollo.provider.defaultClient;
    },
    ethereumReturnAddress() {
      return this.returnAddress && this.returnAddress.ethereumReturnAddress;
    },
    ethereumWalletProvider() {
      return this.returnAddress && this.returnAddress.ethereumWalletProvider;
    },
    usdAmount() {
      return this.order && this.order.usdAmount;
    },
    coin() {
      return this.order && this.order.coin;
    },
    tokenUnitPrice() {
      return this.tokenInformation && this.tokenInformation.unitPrice;
    },
    changeRates() {
      return this.tickers
    },
    cbtTokenAmount() {
      if (this.order
        && this.order.usdAmount
        && this.tokenInformation
        && this.tokenInformation.unitPrice) {
        return computeTokenAmount(this.order.usdAmount, this.tokenInformation.unitPrice);
      }
    },
    cryptoAmount() {
      if (this.order
        && this.order.usdAmount
        && this.order.spotPrice) {
        return computeCryptoAmount(this.order.usdAmount, this.order.spotPrice);
      }
    },
    coin() {
      if (this.order && this.order.coin) {
        return this.order.coin;
      }
    },
    paymentAddress() {
      if (this.order
        && this.order.paymentAddress) {
        return this.order.paymentAddress;
      }
    },
    usdAmount() {
      if (this.order
        && this.order.usdAmount) {
        return this.order.usdAmount;
      }
    }
  },
  methods: {
    onComplete() {
      this.showNextSteps = true;
    },
    submitReturnAddress() {
      if (this.ethereumReturnAddress) {
        // already submitted
        return true;
      }
      const distributionDetails = this.$refs.distributionDetails;
      const that = this;
      return this.apolloClient
        .mutate({
          mutation: gql`mutation {
                  createReturnAddress(returnAddress: {
                    ethereumReturnAddress: "${distributionDetails.ethereumReturnAddressInput}"
                    ethereumWalletProvider: "${distributionDetails.ethereumWalletProviderInput}"
                  }) {
                    ethereumReturnAddress
                    ethereumWalletProvider
                  }
                }`})
        .then(result => {
          that.$apollo.queries.returnAddress.refetch();
          return Promise.resolve(true);
        }).catch(err => {
          // TODO: show error
          console.log(err)
          return Promise.reject(err);
        });
    },
    submitOrder() {
      if (this.usdAmount) {
        // already submitted
        return true;
      }
      const paymentDetails = this.$refs.paymentDetails;
      const that = this;
      return this.apolloClient
        .mutate({
          mutation: gql`mutation {
                  createOrder(order: {
                    usdAmount: "${paymentDetails.usdAmountInput}"
                  }) {
                    usdAmount
                    coin
                    paymentAddress
                  }
                }`})
        .then(result => {
          that.$apollo.queries.order.refetch();
          return Promise.resolve(true);
        }).catch(err => {
          // TODO: show error
          console.log(err)
          return Promise.reject(err);
        });
    }
  },
  apollo: {
    returnAddress: {
      query: function() {
        return gql`query {
            returnAddress {
              ethereumReturnAddress
              ethereumWalletProvider
            }
          }`;
      },
    },
    order: {
      query: function() {
        return gql`query {
            order {
              usdAmount
              coin
              spotPrice
              paymentAddress
            }
          }`;
      }
    },
    tokenInformation: {
      query: function() {
        return gql`query {
            tokenInformation {
              unitPrice
            }
          }`;
      }
    },
    tickers: {
      query: function() {
        return gql`query {
            tickers {
              BTC
              ETH
            }
          }`;
      }
    }
  },
  mounted () {
    this.$refs.invoiceSummaryHeader.refreshTxStatus();
  },
}

</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.invoice {
  /*width: 600px;*/
  margin: 5px;
}

.invoice-box {
  border-radius: 3px;
  background-color: #FFFFFF;
  min-height: 535px;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.25);
}

.footer {
  color: #141414;
  font-family: "Open Sans";
  font-size: 16px;
  line-height: 22px;
  text-align: center;
}

.footer-link {
  font-family: "Open Sans";
  font-size: 14px;
  line-height: 19px;
  text-align: center;
}

a:link,
a:visited,
a:hover,
a:active {
  color: rgba(20, 20, 20, 0.5);
}
</style>
