import { toast } from 'react-toastify'
import { Patient } from "../types"
import PatientDetailItem from "./PatientDetailItem"
import { usePatientStore } from "../store"

type PatientDetailsProps = {
    patient: Patient
}

export default function PatientDetails({ patient }: PatientDetailsProps) {

    const deletePatient = usePatientStore((state) => state.deletePatient)
    const getPatientById = usePatientStore((state) => state.getPatientById)

    const handleClick = () => {
        deletePatient(patient.id)
        toast.error('Paciente Eliminado')
    }

    return (
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            <PatientDetailItem label="ID" data={patient.id} />
            <PatientDetailItem label="Nombre" data={patient.name} />
            <PatientDetailItem label="Propietario" data={patient.caretaker} />
            <PatientDetailItem label="Email" data={patient.email} />
            <PatientDetailItem label="Fecha" data={patient.date.toString()} />
            <PatientDetailItem label="Sintomas" data={patient.symptoms} />

            <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
                <button
                    type="button"
                    onClick={() => getPatientById(patient.id)}
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-bold uppercase">
                    Editar
                </button>

                <button
                    type="button"
                    onClick={handleClick}
                    className="p-2 px-10 bg-red-600 rounded-lg hover:bg-red-700 text-white font-bold uppercase">
                    Eliminar
                </button>
            </div>
        </div>
    )
}