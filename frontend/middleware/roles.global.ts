import { UserTypes } from "~/models/user/user.model"

type UserTypesKeys = keyof typeof UserTypes;

export default defineNuxtRouteMiddleware(async (_to, from) => {
    if ((process.server || useError().value) && process.dev) return

    const auth = useAuthStore()
    const roles = (_to.meta.userType ?? []) as UserTypesKeys[]
    
})
