import { useSwiper } from "swiper/react";

const NextQuestionButton = () => {
    const swiper = useSwiper();

    return (
        <button className="absolute md:bottom-16 bottom-0 left-0 right-0 mx-auto" onClick={() => swiper.slideNext()}>
            <div className="absolute bottom-12 left-0 right-0 flex items-center justify-center">
                <div className="animate-bounce flex items-center justify-center space-x-3 bg-[#087685] rounded-full font-bold px-5 py-2 font-xl text-white">
                    <div>
                        Next
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1" />
                        </svg>
                    </div>
                </div>
            </div>
        </button>
    )
}

export default NextQuestionButton