import { Service } from './service'

export class SpaceService extends Service {
    async getSpaces(estado: string) {
		return this.fetch({
        URL: `/spaces?state=${estado}`,
		method: 'get',
		})
	}
}