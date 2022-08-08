<script setup>
import axios from "axios";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/outline'

const emit = defineEmits(['passid']);

let userId = "<INPUT USERNAME HERE>"; // In this case, we'll just declare our users ID here.
let showFrame = ref(false);
// let linkUrl = ref("https://link.hatchfi.co/?clientId=<INPUT_CLIENTID_HERE>&token=");
let linkUrl = ref("http://localhost:3000/?clientId=<INSERT_CLIENT_ID_HERE>&token=");
let sessionToken = ref(null);

onBeforeUnmount(() => {
  window.removeEventListener("message", (event) => {
    console.log("Closing", event)
  });
})

const generateLink = async () => {

  // In this case, we'll look for a sessionToken in our localStorage
  // to see if we need to "login" our user.
  if (!localStorage.getItem("hatchfiSessionToken")) {
    // Lets authenticate our user
    // let userData = await axios.post("http://localhost:3003/auth-user", { userId: userId })
    let userData = await axios.post("http://localhost:3003/auth-user", { userId: userId })


    console.log(userData.data)
    sessionToken.value = userData.data.token;
    showFrame.value = true;

    window.addEventListener("message", (event) => {
      if (event.data.hatchfi) {
        console.log(event.data.result.data)
        if (event.data.result.data.status == "success") {
          console.log("Pass id to app", event.data.result.data.accountId)
          emit('passid', event.data.result.data.accountId);
        }
      }
    });

    // localStorage.setItem("hatchfiSessionToken", userData.data.token);
  }

}

</script>

<template>
  <div class="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      <span class="block">Ready to dive in?</span>
      <span class="block">Let's connect an account</span>
    </h2>
    <div class="mt-8 flex justify-center">
      <div class="inline-flex rounded-md shadow">
        <button @click="generateLink"
          class="inline-flex duration-200 items-center justify-center px-10 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700">
          Connect a crypto account</button>
      </div>
    </div>
  </div>

  <TransitionRoot as="template" :show="showFrame">
    <Dialog as="div" class="relative z-10" @close="showFrame = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200"
        leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">

            <iframe class="rounded-2xl" v-if="showFrame" :src="linkUrl + sessionToken" name="hatchfi_link" height="608px" width="360px"
              allow="solana; ethereum;" title="Hatchfi Link"></iframe>

          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>


</template>