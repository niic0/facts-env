"use client"
import { useRef, useEffect } from "react"


const Modal = ({ children, openModal, setOpenModal }) => {
    const modalRef = useRef()


    // Fonction pour gérer les clics en dehors de la sidebar
    const handleClickOutsideSidebar = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            // Clique en dehors de la sidebar, donc on ferme la sidebar
            setOpenModal(false)
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideSidebar);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideSidebar);
        };
    }, []);

    return (
        openModal ?
            <div className="bg-black/30 backdrop-blur fixed w-screen h-screen left-0 z-50 top-0">
                < div className="flex items-center justify-center h-full" >
                    <div ref={modalRef} className={`bg-white p-5 rounded-lg w-96 relative`}>
                        <button onClick={() => setOpenModal(false)} className="absolute top-3 right-3">
                            <svg className="fill-neutral-500" width="25" height="25" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path d="M18 3C9.75 3 3 9.75 3 18C3 26.25 9.75 33 18 33C26.25 33 33 26.25 33 18C33 9.75 26.25 3 18 3ZM18 30C11.4 30 6 24.6 6 18C6 11.4 11.4 6 18 6C24.6 6 30 11.4 30 18C30 24.6 24.6 30 18 30Z" /><path d="M24.0008 11.9998C23.4008 11.3998 22.5008 11.3998 21.9008 11.9998L18.0008 15.8998L14.1008 11.9998C13.5008 11.3998 12.6008 11.3998 12.0008 11.9998C11.4008 12.5998 11.4008 13.4998 12.0008 14.0998L15.9008 17.9998L12.0008 21.8998C11.4008 22.4998 11.4008 23.3998 12.0008 23.9998C12.3008 24.2998 12.7508 24.4498 13.0508 24.4498C13.3508 24.4498 13.8008 24.2998 14.1008 23.9998L18.0008 20.0998L21.9008 23.9998C22.2008 24.2998 22.6508 24.4498 22.9508 24.4498C23.2508 24.4498 23.7008 24.2998 24.0008 23.9998C24.6008 23.3998 24.6008 22.4998 24.0008 21.8998L20.1008 17.9998L24.0008 14.0998C24.6008 13.4998 24.6008 12.5998 24.0008 11.9998Z" /></svg>
                        </button>
                        {children}
                    </div>
                </div >
            </div >
            : ""
    )
}

export default Modal