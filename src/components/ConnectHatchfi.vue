<script setup>
import axios from "axios";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/outline';

const emit = defineEmits(['passid']);

// let userId = "<INPUT USERNAME HERE>"; // In this case, we'll just declare our users ID here. You'll want to generate a UUID for each user.
// const SERVER_BASE_URL = "<YOUR SERVER BASE URL>"
let userId = "hatchfi-test-portfolio";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
const HATCHFI_CLIENT_ID = import.meta.env.VITE_HATCHFI_CLIENT_ID;

// These are some pre-defined addresses that will show up in the demo, feel free to add your own here.
const predefinedAddresses = [
  { title: 'Celo', description: '0x1E0F3Bfc926c4C4B98D428De9bbf0e5FA5909063', current: true },
  { title: 'Ethereum', description: '0xd853f83605f7199CE2b9B61807b4084a3909F783', current: false },
  { title: 'Polygon', description: '0xA4FcE871c814a193Fb855330510B4C493a5F30cB', current: false },
  { title: 'Bitcoin', description: '1Lj6T9wt3nCVo1cuzn94rU5uH3M319FP5', current: false },
]

let copied = ref(predefinedAddresses[0])

// Simple copy to clipboard method
const copyText = (text) => {
  navigator.clipboard.writeText(text);
}

let showFrame = ref(false);
// let linkUrl = ref(`https://link.hatchfi.co/?clientId=${HATCHFI_CLIENT_ID}&token=`);
let linkUrl = ref(`https://devlink.hatchfi.co/?clientId=${HATCHFI_CLIENT_ID}&token=`);
let sessionToken = ref(null);

// We set up a listener here to let us know when the user wants to close Hatchfi Link.
onBeforeUnmount(() => {
  window.removeEventListener("message", (event) => {
    console.log("Closing", event)
  });
})

const generateLink = async () => {

  let userData = await axios.post(`${SERVER_BASE_URL}/auth-user`, { userId: userId })

  sessionToken.value = userData.data.token;
  showFrame.value = true;

  console.log(linkUrl.value + sessionToken.value)

  window.addEventListener("message", (event) => {
    if (event.data.hatchfi) {
      console.log(event.data)
      if (event.data.result.status == "success") {
        console.log("Pass id to app", event.data.result.data.accountId)
        emit('passid', event.data.result.data.accountId);
      } else if (event.data.result.status == "close") {
        showFrame.value = false;
      }
    }
  });
}

</script>

<template>
  <div class="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      <span class="block">Hatchfi Portfolio Tracker Template</span>
    </h2>
    <p class="text-lg font-semibold mt-3 tracking-tight text-gray-900">
      <span class="block">This template is a great starting place to build your own product with Hatchfi's API.</span>
    </p>
    <Listbox as="div" v-model="copied" class="mt-8">
      <ListboxLabel class="sr-only"> Connect a crypto account </ListboxLabel>
      <div class="relative">
        <div class="inline-flex shadow-sm rounded-md divide-x divide-emerald-600">
          <div class="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-emerald-700">
            <button @click="generateLink"
              class="relative inline-flex items-center bg-emerald-600 py-3 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white outline-none hover:bg-emerald-700">
              <p class="ml-2.5 text-sm font-medium">Connect a crypto account</p>
            </button>
            <ListboxButton
              class="relative inline-flex items-center bg-emerald-600 px-3 p-2 rounded-l-none rounded-r-md font-medium text-white outline-none hover:bg-emerald-700">
              <ChevronDownIcon class="h-5 w-5 text-white" aria-hidden="true" />
            </ListboxButton>
          </div>
        </div>

        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <ListboxOptions
            class="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <ListboxOption as="template" v-for="option in predefinedAddresses" :key="option.title" :value="option" v-slot="{ active, selected }">
              <li @click="copyText(option.description)"
                :class="[active ? 'text-white bg-emerald-600' : 'text-gray-900', 'cursor-pointer select-none relative p-3 text-sm']">
                <div class="flex flex-col">
                  <div class="flex justify-between">
                    <p :class="selected ? 'font-semibold' : 'font-normal'">
                      {{ option.title }}
                    </p>
                  </div>
                  <p :class="[active ? 'text-emerald-200' : 'text-gray-500', 'mt-1 text-left']">
                    {{ option.description.substring(0, 14) }}...{{ option.description.substring(option.description.length - 14) }}
                  </p>
                </div>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>

  <TransitionRoot as="template" :show="showFrame">
    <Dialog as="div" class="relative z-10" @close="showFrame = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200"
        leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto" v-if="showFrame">
        <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">

            <iframe class="rounded-2xl" :src="linkUrl + sessionToken" name="hatchfi_link" height="608px" width="360px" allow="solana; ethereum;"
              title="Hatchfi Link"></iframe>

          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>


</template>