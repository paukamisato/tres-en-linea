import './Square.css'

const Square = ({ value, onclick,turn }) => {

    const handleClick = () => {
        turn !== null && value === null && onclick();
        
    }

    return(
        <div className="square" onclick={handleClick}>

        </div>
    )
}
export default Square;