// Services
// import { DateService } from '~/services/date.service'
import { UserService } from '~/services/user.service'
import { ResourceService } from '~/services/resource.service'
import { SpaceService } from '~/services/spcace.service'
import { Fetch } from '~~/common/fetchModule'


export default defineNuxtPlugin(() => {
	const fetchModule = new Fetch()
	return {
		provide: {
			fetchModule,
			userService: new UserService(fetchModule),
			resourceService: new ResourceService(fetchModule),
			spaceService: new SpaceService(fetchModule),
		},
	}
})