# Hatchfi White Label Portfolio Tracker App

This is a white label crypto portfolio tracker built in Vue3 and Vite.  This portfolio tracker uses the Hatchfi API and Hatchfi Link to connect a user to their crypto account and pull that data into table.

![Example](/src/assets/qwik.gif "Portfolio Tracker")

If you need assistance setting this up, please join our developer Discord community at https://discord.gg/hatchfi and reach out to any of the Hatchfi staff for assistance.


# Getting Started

Follow the onboarding steps in order to create a new project and make sure to write down your API key, your client ID, and your secret key. Before you can use Hatchfi link and connect a users crypto account to the portfolio tracker, you'll need to make sure you head over to https://app.hatchfi.co and sign up for an account. 

## Items to replace within the code

In the `ConnectHatchfi.vue` file, you'll like the following: 
`let linkUrl = ref("https://link.hatchfi.co/?clientId=<INSERT_CLIENT_ID_HERE>&token=<USER_GENERATED_TOKEN>");`

Make sure you replace the <INSERT_CLIENT_ID_HERE> with your `clientid` from the Hatchfi Dashboard (https://app.hatchfi.co) -> go to projects -> copy `clientid`. 

In `ConnectHatchfi.vue` you can use whatever you want to pass in as a `user` for Link.  

Make sure you replace the `userID` var on line 9 with a username of your choice.

`let userId = "<INPUT USERNAME HERE>";`

We recommend using UUIDs for completel anonimity in production environments, but for this tracker, you can use whatever you'd like.

In the `index.js` file, we have a `clientid, secret key, and API key` that will need to be replaced on lines 12 to 14.  Again, you can access this data from the hatchfi dashboard in the projects section.

```
const HATCHFI_CLIENT_ID = "<ADD CLIENTID HERE>";
const HATCHFI_API_KEY = "<ADD API KEY HERE";
const HATCHFI_SECRET_KEY = "<ADD SECRET KEY HERE>";
```



## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
