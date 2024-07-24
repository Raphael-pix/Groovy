
import { MdClose } from "react-icons/md";
import './popup.css'


export default function Popup({message,onClose}){

    return <div className="popup-container">
        <p className="messsage">{message}</p>
        <MdClose size={14} onClick={onClose} style={{cursor:'pointer'}}/>
    </div>
}