import { Service } from './service'

export class ResourceService extends Service {
    async createResource(name: string, description: string, price: number) {

        console.log("ENTRA?", price)
		return this.fetch({
		URL: '/resources/',
		method: 'post',
		body: {
            owner: '6699f7cd6af7b42c2ba59ce8',
			name: name,
			description: description,
			price: price,
			state: 'Disponible',
		},
		})
	}
}