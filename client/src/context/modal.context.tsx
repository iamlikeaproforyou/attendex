import { ReactNode, createContext, useState } from "react"

interface ModalContextType {
    modal: Boolean;
    setModal: (value: Boolean) => void;
}

export const ModalContext = createContext<ModalContextType>({
    modal: false,
    setModal: () => {}
})

export const ModalProvider = ({ children } : {children: ReactNode}) => {

    const [modal , setModal] = useState<Boolean>(false)

    const value: ModalContextType = {
        modal,
        setModal: (value) => setModal(value)
    }

    return (
        <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    )
}