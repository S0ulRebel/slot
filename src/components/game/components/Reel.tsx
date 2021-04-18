import symbols from './../../../assets/symbols.jpg'

interface reelProps {
    symbol: number
}

const Reel = ({symbol}: reelProps) => {
    const style = {
        top: `-${(symbol - 1) * 98}px`
    }
    return(
        <div className="reel">
            <img alt="reel image" src={symbols} style={style}/>
            {style.top}
        </div>
    );
}

export default Reel;