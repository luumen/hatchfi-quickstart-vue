<script setup>
import ConnectHatchfi from './components/ConnectHatchfi.vue';
import HatchfiData from './components/HatchfiData.vue';
import axios from 'axios';
import { ref } from 'vue';

let accountData = ref(null);
let accountTransactions = ref([]);
let userId = "hatchfi-quickstart-user-1";
let showConnect = ref(true);

const fetchAccountData = async (id) => {
  console.log(id)

  let data = await axios.post("http://localhost:3003/account/all", { userId: userId, accountId: id });

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