import './Modal.styles.scss'
import { ModalContext } from '../../context/modal.context'
import { ReactNode, useContext } from 'react'

const Modal = ({children} : {children: ReactNode}) => {
  const {modal , setModal} = useContext(ModalContext)
  const toggleModal = () => {
    setModal(!modal)
  }
  return (
    <div className='modal'>
      <div>
        <div className="close-btn">
          <button onClick={toggleModal}>close</button>
        </div>
        
        {children}
      </div>
    </div>
  )
}

export default Modal