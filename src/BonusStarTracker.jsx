import { useState } from 'react';
import './BonusStarTracker.css'
import CharacterData from './CharacterData.json'
import { CircleButton } from './CircleButton';

export function BonusStarTracker({star, bData}) {
    const [scores, setScores] = useState([0,0,0,0]);

    const updateScore = (pnum, diff) => {
        let newNum = scores[pnum] + diff;
        if (newNum < 0) {
            newNum = 0;
        }

        let newScores = structuredClone(scores);
        newScores[pnum] = newNum;
        setScores(newScores);
    }

    const isWinning = (pnum) => {
        let winNum = -1;
        let topNum = 0;
        for (let i = 0; i < 4; i++) {
            if (scores[i] > winNum) {
                winNum = scores[i];
                topNum = 1;
            } else if (scores[i] == winNum) {
                topNum ++;
            }
        }
        
        if (topNum == 4) return false;

        return scores[pnum] >= winNum;
    }
    
    let img_link = "";
    let name = "";
    let color = "#aaaaaa";

    if (star == "happening") {
        img_link = "/ui/happening_bonus.png"
        name = "Happening Star"
        color = "#7add7a"
    } else if (star == "orb") {
        img_link = "/ui/orb_bonus.png"
        name = "Orb Star"
        color = "#ffd364"
    } else if (star == "minigame") {
        img_link = "/ui/minigame_bonus.png"
        name = "Minigame Star"
        color = "#d67575"
    }

    return (
        <div className={'bonus-star ' + star}>
            <StarDisp color={color} img={img_link}/>
            <div className='bonus-star-name'>
                <p>{name}</p>
            </div>
            <div className={'bonus-star-tracker p1' + (isWinning(0) ? " bonus-star-winner" : "")}>
                <img src={CharacterData[bData.player1.character].image}/>
                <SubButton pnum={0} star={star} updateScore={updateScore} />
                <p style={{width: (5 + (10*(String(scores[0]).length))) + "px"}}>{scores[0]}</p>
                <PlusButton pnum={0} star={star} updateScore={updateScore} />
            </div>
            <div className={'bonus-star-tracker p2' + (isWinning(1) ? " bonus-star-winner" : "")}>
                <img src={CharacterData[bData.player2.character].image}/>
                <SubButton pnum={1} star={star} updateScore={updateScore} />
                <p style={{width: (5 + (10*(String(scores[1]).length))) + "px"}}>{scores[1]}</p>
                <PlusButton pnum={1} star={star} updateScore={updateScore} />
            </div>
            <div className={'bonus-star-tracker p3' + (isWinning(2) ? " bonus-star-winner" : "")}>
                <img src={CharacterData[bData.player3.character].image}/>
                <SubButton pnum={2} star={star} updateScore={updateScore} />
                <p style={{width: (5 + (10*(String(scores[2]).length))) + "px"}}>{scores[2]}</p>
                <PlusButton pnum={2} star={star} updateScore={updateScore} />
            </div>
            <div className={'bonus-star-tracker p4' + (isWinning(3) ? " bonus-star-winner" : "")}>
                <img src={CharacterData[bData.player4.character].image}/>
                <SubButton pnum={3} star={star} updateScore={updateScore} />
                <p style={{width: (5 + (10*(String(scores[3]).length))) + "px"}}>{scores[3]}</p>
                <PlusButton pnum={3} star={star} updateScore={updateScore} />
            </div>
        </div>
    )
}

function SubButton({pnum, updateScore, star}) {
    if (star == "minigame") {
        return (
            <div className='stacked-num-buttons'>
                <CircleButton symbol="1" color="#a00" hoverColor="#900" pressColor="#600" onClick={() => {updateScore(pnum, -1)}}/>
                <CircleButton symbol="10" color="#a00" hoverColor="#900" pressColor="#600" onClick={() => {updateScore(pnum, -10)}}/>
            </div>
        )
    }
    return (<CircleButton symbol="-" color="#a00" hoverColor="#900" pressColor="#600" onClick={() => {updateScore(pnum, -1)}}/>)
}

function PlusButton({pnum, updateScore, star}) {
    if (star == "minigame") {
        return (
            <div className='stacked-num-buttons'>
                <CircleButton symbol="1" color="#0a0" hoverColor="#090" pressColor="#060" onClick={() => {updateScore(pnum, 1)}}/>
                <CircleButton symbol="10" color="#0a0" hoverColor="#090" pressColor="#060" onClick={() => {updateScore(pnum, 10)}}/>
            </div>
        )
    }
    return (<CircleButton symbol="+" color="#0a0" hoverColor="#090" pressColor="#060" onClick={() => {updateScore(pnum, 1)}}/>)
}

function StarDisp({img, color}) {
    return (
        <div className='bonus-icon'>
            <svg viewBox='0 0 325 325'>
                <polygon stroke='black' strokeWidth='4px' fill={color} points="154.18 4.52 200.5 98.37 304.06 113.41 229.12 186.46 246.81 289.61 154.18 240.91 61.55 289.61 79.24 186.46 4.3 113.41 107.86 98.37 154.18 4.52"/>
                <image transform="translate(90, 100)" href={img} clipPath="inset(0% 0% round 50%)"/>
            </svg>
        </div>
    )
}