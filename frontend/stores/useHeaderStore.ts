import { defineStore } from 'pinia'
export interface headerData {
	datos: string
}


const useHeaderStore = defineStore('header', {
	state: () => ({
    title: null as headerData | null,
	}),
	getters: {
		
		getTitle(state): headerData | null {
			return state.title
		},
	},
	actions: {

    setTitle(header: headerData){
      this.title = header
    },
		
	},
})

export default useHeaderStore
