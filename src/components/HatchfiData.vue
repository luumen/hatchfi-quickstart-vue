<template>
  <div class="h-screen px-4 py-10 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Account Data <span
            class="inline-flex items-center rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-800 capitalize">
            <svg class="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="3" />
            </svg>
            {{ balances.status }}
          </span></h1>
        <p v-if="balances.status == 'synced'" class="mt-2 text-sm text-gray-700">Your accounts balances and data.</p>
        <p v-else class="mt-2 text-sm text-gray-700">Your account is syncing, please refresh to see your transactions.</p>
      </div>
      <button @click="resetAccount" class="bg-rose-600 text-white py-2 px-5 rounded-lg">Reset</button>
    </div>
    <ul role="list" class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <!-- For loop that iterates through the accounts balances, if any. -->
      <li v-for="balance in balances.balances" :key="balance.amount" class="col-span-1 flex shadow-sm rounded-md">
        <div class="flex-shrink-0 bg-emerald-100 flex items-center justify-center w-16 text-emerald-700 text-sm font-semibold rounded-l-md">
          {{ balance.ticker }}
        </div>
        <div class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
          <div class="flex-1 px-4 py-2 text-sm truncate">
            <a class="text-gray-900 font-medium hover:text-gray-600">{{ balance.name }}</a>
            <p class="text-gray-500">{{ Number(balance.amount).toLocaleString() }}</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="mt-8 flex flex-col pb-10">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300 py-20">
              <thead class="bg-gray-50">
                <!-- These are the table head titles -->
                <!-- If you want to add or remove a row, be sure to do it here and in the table rows -->
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Ticker</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fiat Value</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Other Address</th>
                  <!-- Add a date column to practice -->
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <!-- For loop that iterates through our transactions -->
                <tr v-for="(transaction, index) in transactions.sort((a, b) => b.confirmedAt - a.confirmedAt)" :key="index">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ transaction.parts[0].ticker }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ transaction.parts[0].amount }} {{ transaction.parts[0].ticker }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ transaction.parts[0].fiatValue ?
    `$${transaction.parts[0].fiatValue}` : "Unknown"
}}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ transaction.parts[0].otherParties[0] }}</td>
                  <!-- Add a date column to practice -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue';
const emit = defineEmits(['reset']);

const props = defineProps({
  balances: Object,
  transactions: Array
})

const resetAccount = () => {
  emit('reset');
}

</script>