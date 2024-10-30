
interface ModalConfirmationProps {
  isOpen: boolean; 
  closeBtn: () => void; 
}
export const ModalConfirmation: React.FC<ModalConfirmationProps>  = ({isOpen, closeBtn}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-container">

      <div className="body-confirmation">
        <h3>¡Thank you!</h3>
        <p>Your order is now processing</p>
        <button className="btn-modal" onClick={closeBtn} >X</button>
      </div>
    </div>
  )
}
