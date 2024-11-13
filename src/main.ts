import { createApp, h, provide } from "vue"
import { DefaultApolloClient } from "@vue/apollo-composable"
import apolloClient from "./apolloClient"
import App from "./App.vue"
import "./style.css"

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.mount("#app")
