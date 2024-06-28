import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { v4 as uuidv4 } from 'uuid'
import { DrafPatient, Patient } from "./types"

type PatientState = {
    patients: Patient[]
    activeId: Patient['id']
    addPatient: (data: DrafPatient) => void
    deletePatient: (id: Patient['id']) => void
    getPatientById: (id: Patient['id']) => void
    updatePatient: (data: DrafPatient) => void
}

const createPatient = (patient: DrafPatient): Patient => {
    return { ...patient, id: uuidv4() }
}

export const usePatientStore = create<PatientState>()(
    devtools(
        persist((set) => ({
            patients: [],
            activeId: '',
            addPatient: (data) => {
                const newPatient = createPatient(data)
                set((state) => ({
                    patients: [...state.patients, newPatient]
                }))
            },
            deletePatient: (id) => {
                set((state) => ({
                    patients: state.patients.filter(patient => patient.id !== id)
                }))
            },
            getPatientById: (id) => {
                set(() => ({
                    activeId: id
                }))
            },
            updatePatient: (data) => {
                set((state) => ({
                    patients: state.patients.map(patient => patient.id === state.activeId ? {
                        id: state.activeId, ...data
                    } : patient),
                    activeId: ''
                }))
            }
        }), {
            // Default: localStorage
            name: 'patient-storage'
            // storage: createJSONStorage(() => sessionStorage) <--- De esta manera la informacion se guarda hasta que se cierra la sesion
        })
    ))