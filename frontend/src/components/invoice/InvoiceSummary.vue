<template>
  <div class="content">
      {{ invoiceId }}
  </div>
</template>


<script>
import gql from 'graphql-tag'
import { isEmpty } from 'lodash'

export default {
  props: ['invoiceId'],
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
  position: relative;
  min-height: 300px;
}
</style>
