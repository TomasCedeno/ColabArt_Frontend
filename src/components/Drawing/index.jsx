import './drawing.css'

const Drawing = ({name, img, onClick}) => {
    return <div className='drawing' onClick={onClick}>
        <img src={img} alt={name} />
        <h3>{name}</h3>
    </div>
}

export default Drawing;