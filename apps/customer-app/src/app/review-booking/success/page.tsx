import Image from "next/image"

const Success = () => {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="flex flex-col items-center text-center">
                <Image
                    src="/icons/success_confetti.png"
                    alt="Success creating payment"
                    height={100}
                    width={100}
                    className="ms-5"
                />
                <h1 className={`text-[20px] mt-3 font-lg font-bold`}>Congratulations!</h1>
                <p className="text-sm mt-1">Ride booked
                    {/* for <span className="text-[#1b86e8]">
                    {params.get("customerName")?.split(",")[0]} {params.get("customerName")?.split(",")[1]} */}
                    {/* </span> */}
                </p>


            </div>
        </div>
    )
}

export default Success