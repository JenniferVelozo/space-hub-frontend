import { Service } from './service'

export class ReserveService extends Service {
    async getReservesByUser(idUser: string) {
		return this.fetch({
        URL: `/reserves/byuser?user=${idUser}`,
		method: 'get',
		})
	}
    async createReserve(idUser: string, idSpace: string, startDate: string, endDate: string) {
		return this.fetch({
        URL: `/reserve`,
		method: 'post',
		})
	}
}