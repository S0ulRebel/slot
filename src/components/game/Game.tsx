import Reel from "./components/Reel";
import {useDispatch, useSelector} from "react-redux";
import {RootState, saveSymbol, updateAmount, updateBet, updateLastWin} from "../../store";
import {SymbolsBuilder} from "../../helpers/SymbolsBuilder";
import {useEffect} from "react";

interface GameProps {
    numReels: number,
    startingAmount: number,
    startingBet: number
}

const symbolsData = new SymbolsBuilder()
                        .withSymbol(1, [10, 20, 30])
                        .withSymbol(2, [10, 20, 30])
                        .withSymbol(3, [10, 20, 30])
                        .withSymbol(4, [30, 40, 50])
                        .withSymbol(5, [30, 40, 50])
                        .withSymbol(6, [30, 40, 50])
                        .withSymbol(7, [40, 50, 60])
                        .withSymbol(8, [40, 50, 60])
                        .withSymbol(9, [40, 50, 60])
                        .withSymbol(10, [100, 120, 130])
                        .withSymbol(11, [100, 120, 130])
                        .withSymbol(12, [100, 120, 130])
                        .data;

const Game = ({ numReels, startingAmount, startingBet }: GameProps) => {
    const dispatch = useDispatch();
    const reels: number[] = Array(numReels).fill(1);
    const symbols = useSelector((state: RootState) => state.symbols);
    const { amount, bet, lastWin } = useSelector((state: RootState) => state.credits)

    useEffect(() => {
        init();
    }, [])

    useEffect(() => {
        if(amount <= 0) loose();
    }, [amount])

    const init = () => {
        dispatch(updateAmount(startingAmount));
        dispatch(updateBet(startingBet));
        dispatch(updateLastWin(0));
    };

    const handleSpinClick = () => {
        spinReels();
        collect();
    }

    const spinReels = () => {
        dispatch(updateAmount(amount - bet));
        for(let i = 0; i< numReels; i++) {
            const value = Math.floor(Math.random() * 12 + 1);
            reels[i] = value;
            dispatch(saveSymbol(i, value));
        }
    };

    const collect = () => {
        const count: any = {};
        reels.forEach((reel) => {
            if(!count[reel]) count[reel] = reels.filter(value => value === reel).length;
        });
        const symbolIndex = Object.keys(count).sort((keyA: string, keyB: string) => {
            const countDiff = count[keyB] - count[keyA];
            const valueDiff = parseInt(keyB) - parseInt(keyA);
            return countDiff !== 0 ? countDiff : valueDiff;
        })[0];
        if(count[symbolIndex] >= 3) {
            const valueIndex = count[symbolIndex] - 3;
            const prize = symbolsData[symbolIndex][valueIndex];
            win(prize);
        }
    }

    const win = (prize: number) => {
        alert (`You won ${prize}$!`);
        dispatch(updateLastWin(prize));
        dispatch(updateAmount(amount + prize));
    };

    const loose = () => {
        alert (`You lost!`);
    }

    return (
        <div className="gameArea">
            <div className="gameArea__reels">
                {symbols.map((symbol: number, index: number) => <Reel symbol={symbol} key={`reel${index}`}/>)}
            </div>
            <div>Amount: {amount}</div>
            <div>Bet: {bet}</div>
            <div>Won: {lastWin}</div>
            <button disabled={amount <= 0 && amount < bet} onClick={() => handleSpinClick()}>Spin</button>
        </div>
    )
}

export default Game;