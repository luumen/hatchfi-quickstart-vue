# hatchfi-quickstart-vue

This is a white label crypto portfolio tracker built in Vue3 and Vite.  This portfolio tracker uses the Hatchfi API and Hatchfi Link to connect a user to their crypto account and pull that data into table.

![Example](/src/assets/qwik.gif "Portfolio Tracker")


Before you can use Hatchfi link and connect a users crypto account to the portfolio tracker, you'll need to make sure you head over to https://app.hatchfi.co, sign up for an account, and create a new project.  When you create a new project, make sure to write down your API key, your client ID, and your secret key.

## Things to replace within the code
In the `ConnectHatchfi.vue` file, you'll like the following: `let linkUrl = ref("http://localhost:3000/?clientId=<INSERT_CLIENT_ID_HERE>&token=");`.  Make sure you replace the <INSERT_CLIENT_ID_HERE> with your `clientid` from the Hatchfi Dashboard (https://app.hatchfi.co) -> go to projects -> copy `clientid`.


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
