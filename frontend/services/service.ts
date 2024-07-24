import type { ConfigFetch, Fetch } from '~/common/fetchModule'
import type { Toast } from '~/models/toast/toast.model'

export abstract class Service {
	private readonly fetchModule: Fetch
	protected readonly authStore = useAuthStore()
	private readonly toastsStore = useToast()

	constructor(fetch: Fetch) {
		this.fetchModule = fetch
	}

	protected fetch<T = any>(
		config: Omit<ConfigFetch, 'token'>,
		omitToken = false,
	) {
		return this.fetchModule.fetchData<T>({
			...config,
			token: omitToken ? undefined : this.authStore.getToken,
		})
	}

	private handleError(error: unknown) {
		return this.fetchModule.handleError(error)
	}

	protected addToast(toast: Toast) {
		let message: string
		if (toast.type === 'error') message = 'Error'
		else if (toast.type === 'success') message = 'Éxito'
		else if (toast.type === 'warn') message = 'Advertencia'
		else if (toast.type === 'info') message = 'Información'

		this.toastsStore.add({
			severity: toast.type,
			closable: toast.dismissible ?? true,
			detail: toast.message,
			//summary: message,
			life: toast.timeout ?? 3000,
		})
	}

	protected addErrorToast(error: unknown) {
		this.toastsStore.add({
			detail: this.handleError(error).message,
			severity: 'error',
			life: 3000,
			closable: true,
			summary: 'Error',
		})
	}
}