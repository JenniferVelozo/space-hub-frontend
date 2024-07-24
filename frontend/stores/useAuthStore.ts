import { defineStore } from 'pinia'
import type { DefaultResponse } from '~~/common/fetchModule'
import { UserTypes } from '~/models/user/user.model'

type KeysUserTypes = keyof typeof UserTypes

export interface AuthData {
	token: string
	expire: string
	user: {
		name: string
		_id: string
		role: string
		created_at: string
		email: string
	}
}

async function logIn(userForm: { user: string; password: string }) {
	const { $fetchModule } = useNuxtApp()
	try {
		const dataFetch = await $fetchModule.fetchData<
			AuthData & DefaultResponse
		>({
			method: 'post',
			URL: '/auth/login',
			body: userForm,
			nuxt: false,
		})
		return dataFetch
	} catch {
		throw new Error('Credenciales inválidas')
	}
}

async function logOut() {
	const { remove } = await useSession()
	await remove()
}

const useAuthStore = defineStore('auth', {
	state: () => ({
		token: null as AuthData | null,
		expire: null as AuthData | null,
		isAuth: false,
		user: null as AuthData | null,
	}),
	getters: {
		getIsAuth(state) {
			return state.isAuth
		},
		getUser(state): AuthData | null {
			return state.user
		},
		getToken(state): string | null {
			return state.user?.token ?? null
		},
		getRole(state): string | null {
			return state.user?.user.role ?? null
		},
		getUsername(state): string | null {
			return state.user?.user.name ?? null
		},
		getID(state): string | null {
			return state.user?.user._id ?? null
		},
	},
	actions: {
		async unsetAuth() {
			this.isAuth = false
			this.user = null
			this.token = null
			this.expire = null

			const { remove } = await useSession()
			await remove()
		},
		async logIn(userForm: { user: string; password: string }) {
			const dataFetch = await logIn(userForm)
			await this.setAuth({
				user: {
					_id: dataFetch.user._id,
					created_at: dataFetch.user.created_at,
					name: dataFetch.user.name,
					role: dataFetch.user.role,
					email: dataFetch.user.email,

				},
				expire: dataFetch.expire,
				token: dataFetch.token,
			})
			return dataFetch
		},
		async logOut() {
			await logOut()
			this.unsetAuth()
		},
		async setAuth(user: AuthData) {
			this.isAuth = true
			this.user = user

			const { overwrite } = await useSession()
			await overwrite(user)
		},
	},
})

export default useAuthStore