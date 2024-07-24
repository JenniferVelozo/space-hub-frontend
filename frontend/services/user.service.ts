import { Service } from './service'

export class UserService extends Service {
	async getUsers() {
        return this.fetch({
        URL: '/user/',
        method: 'get'
        })
    }
	async checkEmailRepeated(email: string) {
		return this.fetch({
		URL: `/user/checkEmailRepeated/${email}`,
		method: 'get',
		})
	}
	async createUser(name: string, email: string, password: string, role: string) {
		return this.fetch({
		URL: '/user/',
		method: 'post',
		body: {
			name: name,
			email: email,
			role: role,
			password: password,
		},
		})
	}
	async updateUser(username: string, rut: string, emailAnterior: string, email: string, role: string, id_cc: number) {
		return this.fetch({
		URL: `/users/${emailAnterior}`,
		method: 'put',
		body: {
			username: username,
			email: email,
			rut: rut,
			role: role,
			id_cc: id_cc,
		},
		})
	}
	async deleteUser(email: string) {
		return this.fetch({
		URL: `/users/${email}`,
		method: 'delete',
		})
	}
}