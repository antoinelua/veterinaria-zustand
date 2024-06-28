
type PatientDetailItemProps = {
    label: string
    data: string
}

export default function PatientDetailItem({ label, data }: PatientDetailItemProps) {
    return (
        <div className="mx-5 my-10 px-5 bg-white shadow-md rounded-lg">
            <p className="font-bold mb-3 text-gray-700 uppercase">{label}: {''}
                <span className="font-normal normal-case">{data}</span>
            </p>
        </div>
    )
}
