import './drawing.css'

const Drawing = ({name, img}) => {
    return <div className='drawing'>
        <img src={img} alt={name} />
        <h3>{name}</h3>
    </div>
}

export default Drawing;