<script setup>
import ConnectHatchfi from './components/ConnectHatchfi.vue';
import HatchfiData from './components/HatchfiData.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';

let accountData = ref([]);
let accountTransactions = ref([]);
let userId = "hatchfi-test-portfolio"; // In this case, we'll just declare our users ID here. You'll want to generate a UUID for each user. for this example, we hardcode a uuid
let showConnect = ref(true);
const YOUR_SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const fetchAccountData = async (id) => {
  let data = await axios.post(`${YOUR_SERVER_BASE_URL}/account/all`, { userId: userId, accountId: id });

  console.log(data.data)

  accountData.value = data.data.account;
  accountTransactions.value = data.data.transactions;
  showConnect.value = false;

  console.log(accountData.value)
}

const reset = () => {
  localStorage.removeItem("hatchfi-demo-account-id");
  showConnect.value = true;
}

onMounted(async () => {
  if (localStorage.getItem("hatchfi-demo-account-id")) {
    showConnect.value = false; // If we have an account ID present, we want to query and show that data.

    // Now we want to query the data
    await fetchAccountData(localStorage.getItem("hatchfi-demo-account-id"));
  }
})

</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex justify-center items-center">
    <ConnectHatchfi v-if="showConnect" @passid="fetchAccountData" />
    <HatchfiData v-else :balances="accountData" :transactions="accountTransactions" @reset="reset" />
  </div>
</template>