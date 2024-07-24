import './main.css'
import { useContext} from 'react';
import { GlobalContext } from '../../context/Context';

export default function Main({children}){
    const {isVisible}=useContext(GlobalContext)
    return <div className={isVisible ? ' main-container main-container-visible' :'main-container'} >
        {children}
    </div>
}