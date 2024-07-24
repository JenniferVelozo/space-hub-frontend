import { defineStore } from 'pinia'
import { UserTypes } from '@/models/user/user.model'

type KeysUserTypes = keyof typeof UserTypes

export interface administracionData {
	datos: []
}


const useAdminStore = defineStore('administracion', {
	state: () => ({
    editUser: null as administracionData | null,
		createSuccessFlag: null as administracionData | null,
    editSuccessFlag: null as administracionData | null,
    deleteSuccessFlag: null as administracionData | null,
	}),
	getters: {
		
		getEditUser(state): administracionData | null {
			return state.editUser
		},
    getCreateSuccessFlag(state): administracionData | null {
      return state.createSuccessFlag
    },
    getEditSuccessFlag(state): administracionData | null {
      return state.editSuccessFlag
    },
    getDeleteSuccessFlag(state): administracionData | null {
      return state.deleteSuccessFlag
    },
	},
	actions: {

    setEditUser(administracion: administracionData){
      this.editUser = administracion
    },
    setCreateSuccessFlag(administracion: administracionData){
      this.createSuccessFlag = administracion
    },
    setEditSuccessFlag(administracion: administracionData){
      this.editSuccessFlag = administracion
    },
    setDeleteSuccessFlag(administracion: administracionData){
      this.deleteSuccessFlag = administracion
    },
		
	},
})

export default useAdminStore
