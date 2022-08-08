<script setup>
import ConnectHatchfi from './components/ConnectHatchfi.vue';
import HatchfiData from './components/HatchfiData.vue';
import axios from 'axios';
import { ref } from 'vue';

let accountData = ref(null);
let accountTransactions = ref([]);
let userId = "<INPUT USERNAME HERE>"; // In this case, we'll just declare our users ID here. You'll want to generate a UUID for each user.
let showConnect = ref(true);
const YOUR_SERVER_BASE_URL = "<YOUR SERVER BASE URL>"

const fetchAccountData = async (id) => {
  console.log(id)

  let data = await axios.post(`${YOUR_SERVER_BASE_URL}/account/all`, { userId: userId, accountId: id });

  console.log(data.data)
  accountData.value = data.data.account;
  accountTransactions.value = data.data.transactions;
  showConnect.value = false;
}

</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex justify-center items-center">
    <ConnectHatchfi v-if="showConnect" @passid="fetchAccountData" />
    <HatchfiData v-else :balances="accountData" :transactions="accountTransactions" />
  </div>
</template>