import { useSwiper } from "swiper/react";

const CardBack = ({ fact, indexQuestion, setIndexQuestion, setResponseClicked }) => {
    const swiper = useSwiper();

    return (
        <div className="relative z-10 mx-4 rounded-2xl bg-white drop-shadow-lg px-4 py-7 my-auto w-96 h-[600px]">
            {
                fact.true ?
                    <div className="w-full mt-6 mb-10">
                        <svg className="mx-auto" width="50" height="50" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M33.6292 1.59717C35.3249 2.86498 35.6714 5.26721 34.4033 6.96256L17.2024 29.9626C16.4822 30.9257 15.3519 31.4949 14.1493 31.5002C12.9466 31.5053 11.8114 30.9459 11.0829 29.9891L1.45046 17.3391C0.167823 15.6548 0.493657 13.2497 2.17802 11.9671C3.86213 10.6845 6.26742 11.0103 7.55006 12.6947L14.1051 21.3031L28.2636 2.371C29.5317 0.67564 31.9339 0.329106 33.6292 1.59717Z" fill="url(#paint0_linear_5_39)" />
                            <defs>
                                <linearGradient id="paint0_linear_5_39" x1="17.9169" y1="0.833313" x2="17.9169" y2="31.5003" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#05FF00" />
                                    <stop offset="1" stopColor="#03AE00" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    :
                    <div className="w-full mt-6 mb-10">
                        <svg className="mx-auto" width="50" height="50" viewBox="0 0 27 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.0017 1.3329C24.7517 0.0162313 22.8767 0.0162313 21.6267 1.3329L13.5017 9.89123L5.37666 1.3329C4.12666 0.0162313 2.25166 0.0162313 1.00166 1.3329C-0.248337 2.64956 -0.248337 4.62457 1.00166 5.94123L9.12666 14.4996L1.00166 23.0579C-0.248337 24.3746 -0.248337 26.3496 1.00166 27.6662C1.62666 28.3246 2.56416 28.6537 3.18916 28.6537C3.81416 28.6537 4.75166 28.3246 5.37666 27.6662L13.5017 19.1079L21.6267 27.6662C22.2517 28.3246 23.1892 28.6537 23.8142 28.6537C24.4392 28.6537 25.3767 28.3246 26.0017 27.6662C27.2517 26.3496 27.2517 24.3746 26.0017 23.0579L17.8767 14.4996L26.0017 5.94123C27.2517 4.62457 27.2517 2.64956 26.0017 1.3329Z" fill="url(#paint0_linear_5_35)" />
                            <defs>
                                <linearGradient id="paint0_linear_5_35" x1="13.5017" y1="0.345398" x2="13.5017" y2="28.6537" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#FF3FA7" />
                                    <stop offset="0.0001" stopColor="#FF3EA5" />
                                    <stop offset="1" stopColor="#FF0000" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
            }
            <div className="font-bold text-2xl mb-8 text-neutral-700">
                {fact.explanation}
            </div>
            <div>
                <div>
                    sources: <a href="#" className="italic">{fact.source}</a>
                </div>
            </div>

        </div>
    )
}

export default CardBack