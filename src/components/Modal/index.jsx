import './modal.css'

const Modal = ({children, tittle, show, toggle}) => {

    return <>
        <section className={show ? "modal" : "modal hidden"}>
            <header>
                <h3>{tittle}</h3>
                <button className="btn-close" onClick={toggle} >⨉</button>
            </header>

            <div className='content'>
                {children}
            </div>
        </section>

        <div className={show ? "overlay" : "overlay hidden"} onClick={toggle}></div>
    </>
}

export default Modal;