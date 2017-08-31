<template>
  <div class="content">
    <div class="row">
      <div class="input-group form-group">
        <label class="pull-left title">Enter Ethereum return address</label>
        <div class="col-xs-12">
          <input class="form-control" type="text" v-model="etherumAddress" placeholder="Etherum address" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="input-group form-group">
        <label class="pull-left title">Which wallet are you using?</label>
        <div class="col-xs-12">
          <select class="form-control">
            <option value="" selected disabled>Please select wallet provider</option>
            <option value="my_ether_wallet">My Ether Wallet</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'DistributionDetails',
  props: [],
  data () {
    return {
      etherumAddress: null,
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
  padding: 50px;

  .title {
    padding-left: 20px;
  }
}
</style>
