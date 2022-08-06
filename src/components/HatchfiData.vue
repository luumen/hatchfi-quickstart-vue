<template>
  <div class="h-screen px-4 py-10 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Account Data</h1>
        <p class="mt-2 text-sm text-gray-700">Your accounts balances and data.</p>
      </div>
    </div>
    <ul role="list" class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Ticker</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fiat Value</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Other Address</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="(transaction, index) in transactions" :key="index">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ transaction.parts[0].ticker }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ transaction.parts[0].amount }} {{ transaction.parts[0].ticker }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${{ transaction.parts[0].fiatValue }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ transaction.parts[0].otherParties[0] }}</td>
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

const props = defineProps({
  balances: Object,
  transactions: Array
})

</script>