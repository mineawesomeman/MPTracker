import "./Board.css";
import React, {useRef, useEffect, useState} from 'react';
import {INITIAL_VALUE, ReactSVGPanZoom, TOOL_PAN, TOOL_NONE} from 'react-svg-pan-zoom';
import { useWindowSize } from "@react-hook/window-size";
import { Toggle } from "./Toggle";
import { BowserIcon, ChanceIcon, DKIcon, DuelIcon, HappeningIcon } from "./Icons";
import { CircleButton, TurnIndicator } from "./CircleButton.jsx"
import { Player } from "./Player.jsx";
import { BonusStarTracker } from "./BonusStarTracker.jsx";

export default function Board(props) {
    const Viewer = useRef(null);
    const [tool, setTool] = useState(TOOL_PAN)
    const [value, setValue] = useState(INITIAL_VALUE)
    const [width, height] = useWindowSize({initialWidth: 400, initialHeight: 400})
    const [toggleState, setToggleState] = useState(true);
    const [boardState, setBoardState] = useState({
        turn: 1,
        time: "day",
        player1: {
            character: "toadette",
            location: 0,
            stars: 0,
            coins: 0,
            orbs: ["","",""]
        },
        player2: {
            character: "koopa_kid",
            location: 0,
            stars: 0,
            coins: 0,
            orbs: ["","",""]
        },
        player3: {
            character: "boo",
            location: 0,
            stars: 0,
            coins: 0,
            orbs: ["","",""]
        },
        player4: {
            character: "daisy",
            location: 0,
            stars: 0,
            coins: 0,
            orbs: ["","",""]
        }
    });

    const nextTurn = () => {
        const nTurn = boardState.turn + 1;
        const tod = (Math.floor((nTurn-1) / 3) % 2 == 0) ? "day" : "night";

        setBoardState({...boardState, turn: nTurn, time: tod});
    }

    const prevTurn = () => {
        const nTurn = boardState.turn - 1;
        if (nTurn < 1) {
            return;
        }
        const tod = (Math.floor((nTurn-1) / 3) % 2 == 0) ? "day" : "night";

        setBoardState({...boardState, turn: nTurn, time: tod});
    }

    useEffect(() => {
        const updateViewer = async () => {
            await Viewer.current.closeMiniature();
            await Viewer.current.fitSelection(800, 1100, 400, 400);
        }
        updateViewer();
    }, []);

    const board_data = props.board_data;
    const handleClick = () => {
        setToggleState(!toggleState)
        if (!toggleState) {
            setTool(TOOL_PAN);
        } else {
            setTool(TOOL_NONE);
        }
    }

    return (
        <div className="flex-container">
            <div className="sidebar players">
                <Player num={1} bState={boardState} setBState={setBoardState}/>
                <Player num={2} bState={boardState} setBState={setBoardState}/>
                <Player num={3} bState={boardState} setBState={setBoardState}/>
                <Player num={4} bState={boardState} setBState={setBoardState}/>
            </div>
            <div className="board">
                <ReactSVGPanZoom
                    ref={Viewer}
                    width={width*0.6} height={height*0.9}
                    tool={tool} onChangeTool={setTool}
                    value={value} onChangeValue={setValue}
                    detectAutoPan={false}
                    toolbarProps={{position: "none"}}
                    // customToolbar={<Toggle size={50} toggled={toggleState} onClick={handleClick}/>}
                    // onZoom={e => console.log('zoom')}
                    // onPan={e => console.log('pan')}
                    // onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 1575">
                        <image href={boardState.time == "day" ? board_data.day_image_loc : board_data.night_image_loc} z={0} width={"2000px"} height={"1575px"}></image>
                        {/* <rect x={10} y={10} width={100} height={100} fill="black" /> */}
                        {board_data.spaces.map((sp) => {
                            return (
                                <Space key={sp.id} space={sp} boardState={boardState}/>
                            );
                        })}
                    </svg>
                </ReactSVGPanZoom>
                <div className="toggleholder">
                    <Toggle size={75} toggled={toggleState} onClick={handleClick}/>
                </div>
            </div>
            <div className="sidebar state">
                {/* <button onClick={() => {let newState = "night"; if (boardState.time == "night") newState = "day"; setBoardState({...boardState, time: newState})}}>Change TOD</button> */}
                <div className="turn-select"> 
                    <p>Turn: </p>
                    <CircleButton symbol="-" color="#a00" hoverColor="#900" pressColor="#600" onClick={prevTurn}/> 
                    <TurnIndicator turn={boardState.turn} />
                    <CircleButton symbol="+" color="#0a0" hoverColor="#090" pressColor="#060" onClick={nextTurn}/>
                </div>
                <div>
                    <BonusStarTracker bData={boardState} star={"happening"}/>
                    <br/>
                    <BonusStarTracker bData={boardState} star={"orb"}/>
                    <br/>
                    <BonusStarTracker bData={boardState} star={"minigame"}/>
                </div>
            </div>
        </div>
    )
}

function Space({space, boardState}) {

    let fill = "blue";

    if (space.type == "red") {
        fill = "red";
    } else if (space.type == "happening" || space.type == "chance" || space.type == "duel") {
        fill = "#18c412";
    } else if (space.type == "dk") {
        if (boardState.time == "day") {
            fill = "orange";
        } else {
            fill = "#231f20";
        }
    }

    return (
        <g onClick={() => {console.log(space.id)}}>
            <circle cx={space.x} cy={space.y} 
                    r={15} fill={fill} stroke="yellow" 
                    strokeWidth={2} z={1} />
            
            {space.type == "happening" && <HappeningIcon x={space.x} y={space.y} z={2}/>}
            {space.type == "chance" && <ChanceIcon x={space.x} y={space.y} z={2}/>}
            {space.type == "duel" && <DuelIcon x={space.x} y={space.y} z={2}/>}
            {(space.type == "dk" && boardState.time == "day") && <DKIcon x={space.x} y={space.y} z={2}/>}
            {(space.type == "dk" && boardState.time == "night") && <BowserIcon x={space.x} y={space.y} z={2}/>}
        </g>
    )
}
