export default defineNuxtRouteMiddleware(async (_to, from) => {
  if ((process.server || useError().value ) && process.dev) return
  //Si no tiene sesion iniciada ignorar
  // Token
  const authStore = useAuthStore()
  if (!authStore.isAuth) return
  // Fetch
  const runtimeConfig = useRuntimeConfig()
  
  return
})