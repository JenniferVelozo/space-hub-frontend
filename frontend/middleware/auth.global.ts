export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) return

  const authStore = useAuthStore()
  const authFlagStore = useAuthFlagStore()
  let isAuth = authStore.isAuth

  if (!isAuth) {
    try {
      const session = await $fetch('/api/session')
      if (session?.token) {
        authStore.setAuth({
          token: session.token,
          expire: session.expire,
          user: {
            _id: session.user._id,
            created_at: session.user.created_at,
            name: session.user.name,
            role: session.user.role,
            email: session.user.email,
          },
        })
        isAuth = true
      } else {
        isAuth = false
      }
    } catch (error) {
      console.error('Error fetching session:', error)
      isAuth = false
    }
  }
	const auth = to.meta?.auth ?? true
  // Para redirección al login
	/*if (auth && !isAuth){
    useAuthFlagStore().setFlag(false)
    if (to.path !== '/login') { // Evita redirigir si ya estamos en la página de login
      return window.location.href = "/login";
    }
  }*/
})
