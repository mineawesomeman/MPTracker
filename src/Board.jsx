import "./Board.css";
import React, {useRef, useEffect, useState} from 'react';
import {INITIAL_VALUE, ReactSVGPanZoom, TOOL_PAN, TOOL_NONE} from 'react-svg-pan-zoom';
import { useWindowSize } from "@react-hook/window-size";
import { MapModeToggle, MapToggle } from "./Toggle";
import { BowserIcon, ChanceIcon, DKIcon, DuelIcon, HappeningIcon } from "./Icons";
import { CircleButton, TurnIndicator } from "./CircleButton.jsx"
import { Player, OrbDisplay } from "./Player.jsx";
import { BonusStarTracker } from "./BonusStarTracker.jsx";
import CharacterData from "./CharacterData.json"
import OrbData from "./OrbData.json"
import {TTSneeze, TTSneezeIcon} from "./TTSneeze.jsx";
import {TTFluff, TTFluffIcon} from "./TTFluff.jsx";

export default function Board(props) {
    const board_data = props.board_data;
    const Viewer = useRef(null);
    const playerModel1 = useRef(() => {});
    const playerModel2 = useRef(() => {});
    const playerModel3 = useRef(() => {});
    const playerModel4 = useRef(() => {});
    const shiftPressed = useRef(false);
    const [tool, setTool] = useState(TOOL_PAN)
    const [value, setValue] = useState(INITIAL_VALUE)
    const [width, height] = useWindowSize({initialWidth: 400, initialHeight: 400})
    const [toggleState, setToggleState] = useState(true);
    const [boardState, setBoardState] = useState({
        turn: 1,
        time: "day",
        player1: {
            character: "toadette",
            location: -1,
            stars: 0,
            coins: 0,
            orbs: ["","",""]
        },
        player2: {
            character: "koopa_kid",
            location: -1,
            stars: 0,
            coins: 0,
            orbs: ["","",""]
        },
        player3: {
            character: "boo",
            location: -1,
            stars: 0,
            coins: 0,
            orbs: ["","",""]
        },
        player4: {
            character: "daisy",
            location: -1,
            stars: 0,
            coins: 0,
            orbs: ["","",""]
        },
        placed_capsuls: [], //{space: space id, owner: player num, capsule: capsule key, type: 1 - land 2 - pass}
        stars: {
            unused: board_data.stars,
            current: -1,
            used: []
        },
        star_order: [],
        star_in_order: 0
    });
    const [spaceDisplayOpen, setSpaceDisplayOpen] = useState(false);
    const [spaceDisplayLoc, setSpaceDisplayLoc] = useState(null);
    const [playerMoveMode, setPlayerMoveMode] = useState(-1);
    const [overlayDisplay, setOverlayDisplay] = useState(0);


    const players = [boardState.player1, boardState.player2, boardState.player3, boardState.player4]
    const characters = [CharacterData[players[0].character],CharacterData[players[1].character],CharacterData[players[2].character],CharacterData[players[3].character]]

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

    const handleClick = () => {
        setToggleState(!toggleState)
        if (!toggleState) {
            setTool(TOOL_PAN);
        } else {
            setTool(TOOL_NONE);
        }
    }

    const updateSpace = (sp, hasOrb, newOrb) => {
        const newOrbs = structuredClone(boardState.placed_capsuls);

        let orbLoc = -1;
        for (let i = 0; i < newOrbs.length; i++) {
            if (newOrbs[i].space == sp.id) {
                orbLoc = i;
                break;
            }
        }

        if (orbLoc != -1) {
            newOrbs.splice(orbLoc, 1);
        }
        
        if (hasOrb) {
            newOrbs.push(newOrb);
        }

        setBoardState({...boardState, placed_capsuls: newOrbs})
    }

    const updateStar = (spaceID) => {
        let newStars = structuredClone(boardState.stars);
        let star_order = structuredClone(boardState.star_order);
        let star_in_order = 0;
        

        if (boardState.star_order.length >= board_data.stars.length) {
            const nextStarID = (boardState.star_in_order + 1) % boardState.star_order.length;
            const currentStar = boardState.star_order[boardState.star_in_order];

            console.log(`spaceid: ${spaceID}, nextStar: ${currentStar}`)
            if (spaceID != currentStar) {
                return;
            }

            newStars.current = currentStar;
            
            newStars.used = star_order.filter((a) => a != boardState.star_order[boardState.star_in_order] && a != boardState.star_order[nextStarID]);
            star_in_order = nextStarID
            newStars.unused = [star_order[nextStarID]]
        } else {

            if (boardState.stars.unused.includes(spaceID)) {
                if (boardState.stars.current != -1) {
                    newStars.used.push(boardState.stars.current);
                }
                newStars.current = spaceID;
                newStars.unused = newStars.unused.filter((a) => a != spaceID);
                star_order.push(spaceID);

            } else if (boardState.stars.current == spaceID) {
                newStars.used.push(spaceID);
                newStars.current = -1;
            } 

            if (newStars.unused.length == 0) {
                console.log("switching to mode 2")
                newStars.unused = [boardState.star_order[0]]
            }
        }

        console.log(`star order: ${star_order}`);
        console.log(`star in order: ${star_in_order}`)
        console.log(`new star unused: ${newStars.unused}`)
        console.log(`new stars current: ${newStars.current}`)
        console.log(`new stars used: ${newStars.used}`)
        console.log("---------------")
        setBoardState({...boardState, stars: newStars, star_in_order: star_in_order, star_order: star_order});
    }

    const openSpaceDisplay = (sp) => {
        setSpaceDisplayLoc(sp); 
        setSpaceDisplayOpen(true);
    }

    const openSpaceDisplayFromNum = (spid) => {
        if (spid == -1) {
            return;
        }

        const sp = board_data.spaces[spid];
        openSpaceDisplay(sp);
    }

    const moveSelectedPlayer = (sp) => {
        if (playerMoveMode != -1) {
            let newBState = structuredClone(boardState);
            newBState["player"+playerMoveMode].location = sp.id;
            setBoardState(newBState);
        }
        setPlayerMoveMode(-1);
    }

    const updatePlayerMoveMode = (player) => {
        if (player != playerMoveMode) {
            setPlayerMoveMode(player);
        } else {
            setPlayerMoveMode(-1);
        }
    }

    const handleKeyDown = (e) => {
        // console.log(e.code);
        if (e.code == "Digit1" || e.code == "Numpad1") {
            updatePlayerMoveMode(1);
        }
        if (e.code == "Digit2" || e.code == "Numpad2") {
            updatePlayerMoveMode(2);
        }
        if (e.code == "Digit3" || e.code == "Numpad3") {
            updatePlayerMoveMode(3);
        }
        if (e.code == "Digit4" || e.code == "Numpad4") {
            updatePlayerMoveMode(4);
        }
        if (e.code == "Digit0" || e.code == "Numpad0") {
            updatePlayerMoveMode(-1);
        }
        if (e.code == "Equal") {
            nextTurn();
        }
        if (e.code == "Minus") {
            prevTurn();
        }
        if (e.code == "KeyT") {
            handleClick();
        }
        if (e.code == "Escape") {
            setSpaceDisplayOpen(false);
            setPlayerMoveMode(-1);
            playerModel1.current();
            playerModel2.current();
            playerModel3.current();
            playerModel4.current();
        }
        if (e.code == "ShiftLeft" || e.code == "ShiftRight") {
            shiftPressed.current = true;
        }
    }

    const handleKeyUp = (e) => {
        if (e.code == "ShiftLeft" || e.code == "ShiftRight") {
            shiftPressed.current = false;
        }
    }

    const toggleTTSneeze = () => {
        if (overlayDisplay == 1) {
            setOverlayDisplay(0);
        } else {
            setOverlayDisplay(1);
        }
    }

    const toggleFluff = () => {
        if (overlayDisplay == 2) {
            setOverlayDisplay(0);
        } else {
            setOverlayDisplay(2);
        }
    }

    return (
        <div className="flex-container" tabIndex={0} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
            <div className="sidebar players">
                <Player num={1} bState={boardState} setBState={setBoardState} viewer={Viewer} boardData={board_data} myref={playerModel1}/>
                <Player num={2} bState={boardState} setBState={setBoardState} viewer={Viewer} boardData={board_data} myref={playerModel2}/>
                <Player num={3} bState={boardState} setBState={setBoardState} viewer={Viewer} boardData={board_data} myref={playerModel3}/>
                <Player num={4} bState={boardState} setBState={setBoardState} viewer={Viewer} boardData={board_data} myref={playerModel4}/>
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
                            let dispStar = false;
                            let starColor = "black";

                            if (boardState.stars.unused.includes(sp.id)) {
                                dispStar = true;
                                starColor = "yellow";
                            } else if (boardState.stars.current == sp.id) {
                                dispStar = true;
                                starColor = "green";
                            } else if (boardState.stars.used.includes(sp.id)) {
                                dispStar = true;
                                starColor = "red";
                            }
                            
                            const onClickFunc = playerMoveMode == -1 ? () => {openSpaceDisplay(sp)} : () => {moveSelectedPlayer(sp)}

                            return (
                                <g key={sp.id}>
                                    <Space space={sp} boardState={boardState} onClick={onClickFunc}/>
                                    {dispStar && <polygon   className="space-star-icon" transform={`scale(0.0625) translate(${(sp.x-10)*16}, ${(sp.y-40)*16})`} 
                                                            stroke='black' strokeWidth='20px' fill={starColor} points="154.18 4.52 200.5 98.37 304.06 113.41 229.12 186.46 246.81 289.61 154.18 240.91 61.55 289.61 79.24 186.46 4.3 113.41 107.86 98.37 154.18 4.52" 
                                                            onClick={() => {updateStar(sp.id)}}/>}
                                </g>
                            );
                        })}
                        {overlayDisplay == 1 && <TTSneeze />}
                        {overlayDisplay == 2 && <TTFluff />}
                        <PlayerBoardDisp player={1} boardState={boardState} boardData={board_data} playerMoveMode={playerMoveMode} setPlayerMoveMode={setPlayerMoveMode} openSpaceDisplay={openSpaceDisplayFromNum} keyRef={shiftPressed} />
                        <PlayerBoardDisp player={2} boardState={boardState} boardData={board_data} playerMoveMode={playerMoveMode} setPlayerMoveMode={setPlayerMoveMode} openSpaceDisplay={openSpaceDisplayFromNum} keyRef={shiftPressed} />
                        <PlayerBoardDisp player={3} boardState={boardState} boardData={board_data} playerMoveMode={playerMoveMode} setPlayerMoveMode={setPlayerMoveMode} openSpaceDisplay={openSpaceDisplayFromNum} keyRef={shiftPressed} />
                        <PlayerBoardDisp player={4} boardState={boardState} boardData={board_data} playerMoveMode={playerMoveMode} setPlayerMoveMode={setPlayerMoveMode} openSpaceDisplay={openSpaceDisplayFromNum} keyRef={shiftPressed} />
                    </svg>
                </ReactSVGPanZoom>
                <div className="toggleholder">
                    <MapToggle size={75} toggled={toggleState} onClick={handleClick}/>
                </div>
                <SpaceDisplay space={spaceDisplayLoc} boardState={boardState} open={spaceDisplayOpen} setOpen={setSpaceDisplayOpen} updateSpace={updateSpace}/>
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
                <div className="move-select">
                        <p>Select to Move</p>
                        <div className="move-select-options">
                            <img className={playerMoveMode == 1 ? "move-select-slection selected" : "move-select-slection"} src={characters[0].image} onClick={() => updatePlayerMoveMode(1)}/>
                            <img className={playerMoveMode == 2 ? "move-select-slection selected" : "move-select-slection"} src={characters[1].image} onClick={() => updatePlayerMoveMode(2)}/>
                            <img className={playerMoveMode == 3 ? "move-select-slection selected" : "move-select-slection"} src={characters[2].image} onClick={() => updatePlayerMoveMode(3)}/>
                            <img className={playerMoveMode == 4 ? "move-select-slection selected" : "move-select-slection"} src={characters[3].image} onClick={() => updatePlayerMoveMode(4)}/>
                        </div>
                </div>
                <div className="map-modes">
                    <p>Happening Views</p>
                    <div className="map-sliders">
                        <MapModeToggle size={50} toggled={overlayDisplay == 1} onClick={toggleTTSneeze}>
                            <TTSneezeIcon triggered={overlayDisplay == 1} />
                        </MapModeToggle>
                        <MapModeToggle size={50} toggled={overlayDisplay == 2} onClick={toggleFluff}>
                            <TTFluffIcon triggered={overlayDisplay == 2} />
                        </MapModeToggle>
                    </div>
                </div>
                <div>
                    <p>Width: {window.innerWidth}</p>
                    <p>Height: {window.innerHeight}</p>
                </div>
            </div>
        </div>
    )
}

function spaceTypeToName(string, boardState) {
    if (string == "dk" && boardState.time == "night") {
        return "Bowser";
    } else if (string == "dk") {
        return "DK";
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
}

function checkPassOrb(orb) {
    const red_orbs = OrbData.red;

    return red_orbs.includes(orb) ? 2 : 1;
}


function SpaceDisplay({space, boardState, open, setOpen, updateSpace}) {
    if (!open) {
        return (<></>)
    }

    const [orbChooser, setOrbChooser] = useState(false);

    const closeIfBGClick = (e) => {
        if (e.target == document.getElementById("sp-bg")) {
            setOpen(false);
        }
    }

    let myOrb = {capsule: "", owner: 1, type: 1};
    for (let i = 0; i < boardState.placed_capsuls.length; i++) {
        if (boardState.placed_capsuls[i].space == space.id) {
            myOrb = boardState.placed_capsuls[i];
            break;
        }
    }

    let space_dis = "id: " + space.id;
    if (space.type == "blue") {
        space_dis = "When players land on this space, they receive three coins. On the last five turn event, the coins players receive MAY get multiplied by three."
    } else if (space.type == "red") {
        space_dis = "When players land on this space, they lose three coins. On the last five turns event, the coins players lose MAY get multiplied by three."
    } else if (space.type == "dk" && boardState.time == "day") {
        space_dis = "When players land on this space, DK will appear and will cause either a DK minigame or a DK Bonus. When the board switches to night, this space will become a Bowser Space."
    } else if (space.type == "dk" && boardState.time == "night") {
        space_dis = "When players land on this space, Bowser will appear and will cause either a Bowser minigame or a Bowser \"Bonus\". When the board switches to day, this space will become a DK Space."
    } else if (space.type == "chance") {
        space_dis = "When a player lands on this space, chance time happens. Results may vary from giving coins to another player to swapping stars."
    } else if (space.type == "happening") {
        if (space.description) {
            space_dis = space.description;
        }
    } else if (space.type == "duel") {
        space_dis = "When a player lands on this space, they choose who to duel with. After the opponent has been chosen, the player who lands on this space gets to choose what to put at stake: stars, coins, or a star and 40 coins."
    }

    let orbTitle = "";

    if (myOrb.capsule != "" && (space.type == "blue" || space.type == "red")) {
        orbTitle = " - " + OrbData.all_orbs[myOrb.capsule].name;
    }

    return (
        <div className="space-background" id="sp-bg" onClick={closeIfBGClick}>
            <div className="space-display">
                <div className="space-display-title"><p>Space Display - {spaceTypeToName(space.type, boardState)} Space {orbTitle}</p></div>
                <div className="space-display-close" onClick={() => {setOpen(false)}}></div>
                <div className="space-display-space-info">
                    <svg viewBox="0 0 32 32" style={{height: "100%"}}>
                        <Space space={{ id: -1, type: space.type, x: 16, y: 16 }} boardState={boardState} onClick={() => {}}/>
                        {/* <circle r={15} cx={16} cy={16} fill="blue" stroke="yellow" strokeWidth={2} /> */}
                    </svg>
                    <div>
                        <p style={{fontSize: "36px"}}>{spaceTypeToName(space.type, boardState)} Space</p>
                        <p>{space_dis}</p>
                        {boardState.stars.current == space.id && <p>There is currently a star here! The next player to pass this space will have a chance to purchase a star for 20 coins!</p>}
                    </div>
                </div>
                <div className="space-display-orb-info" style={{display: (space.type == "blue" || space.type == "red" ? "flex" : "none")}}>
                    <div className="space-display-orb-select">
                        <OrbDisplay orb={myOrb.capsule} setOrb={(orb) => {updateSpace(space, orb != "", {space: space.id, owner: 1, capsule: orb, type: checkPassOrb(orb)})}} open={orbChooser} onOpen={() =>{setOrbChooser(!orbChooser)}} position={-1} defaultPG="home2"/>
                        <OrbOwnerSelect player={myOrb.owner} setPlayer={(player) => updateSpace(space, true, {space: space.id, owner: player, capsule: myOrb.capsule, type: myOrb.type})} boardState={boardState} display={myOrb.capsule != ""}/>
                    </div>
                    <div className="space-display-orb-description">
                        <p style={{fontSize: "36px"}}>{OrbData.all_orbs[myOrb.capsule].name}</p>
                        <p>{OrbData.all_orbs[myOrb.capsule].description ? OrbData.all_orbs[myOrb.capsule].description : ""}</p>
                    </div>
                </div>
                <div className="space-display-debug">
                    <p>space id: {space.id}</p>
                </div>
            </div>
        </div>
    )
}

function OrbOwnerSelect({player, setPlayer, boardState, display}) {
    const players = [boardState.player1, boardState.player2, boardState.player3, boardState.player4]
    const characters = [CharacterData[players[0].character],CharacterData[players[1].character],CharacterData[players[2].character],CharacterData[players[3].character]]

    const charData = characters[player-1];
    const [menuOpen, setMenuOpen] = useState(false);

    const setAndClose = (player) => {
        setPlayer(player);
        setMenuOpen(false);
    }

    return (
        <div className="orb-owner-select" style={{display: (display ? "inline-grid" : "none")}}>
            <img src={charData.image} className="orb-owner" onClick={() => setMenuOpen(!menuOpen)}/>
            <img src={characters[0].image} className={"orb-owner-option" + (menuOpen ? " oo1" : "")} onClick={() => {setAndClose(1)}}/>
            <img src={characters[1].image} className={"orb-owner-option" + (menuOpen ? " oo2" : "")} onClick={() => {setAndClose(2)}}/>
            <img src={characters[2].image} className={"orb-owner-option" + (menuOpen ? " oo3" : "")} onClick={() => {setAndClose(3)}}/>
            <img src={characters[3].image} className={"orb-owner-option" + (menuOpen ? " oo4" : "")} onClick={() => {setAndClose(4)}}/>
        </div>
    )
}

function Space({space, boardState, onClick}) {
    let capsule = null;
    for (let i = 0; i < boardState.placed_capsuls.length; i++) {
        if (boardState.placed_capsuls[i].space == space.id) {
            capsule = boardState.placed_capsuls[i];
        }
    }

    let capsuleState = capsule ? capsule.type : 0; //0 if no capsule, 1 if land capsule, 2 if pass capsule, 3 if a star is there
    const yDiff = capsuleState == 2 ? -20 : 0;

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

    if (space.id != -1 && boardState.stars.current == space.id) {
        capsuleState = 3;
    }

    return (
        <g onClick={() => {onClick();}}>
            {capsuleState != 1 && capsuleState != 3 &&
            <circle cx={space.x} cy={space.y} 
                    r={15} fill={fill} stroke="yellow" 
                    strokeWidth={2} z={1} className="space-icon"/>}
            {capsuleState != 0 && capsuleState != 3 && <image href={capsule ? CharacterData[boardState["player"+capsule.owner].character].emblem : ""} transform={`translate(${space.x-21}, ${space.y-25+yDiff}) scale(0.7)`} className="icon"/>}
            {capsuleState == 3 && <polygon  className="space-star-icon" transform={`scale(0.1) translate(${(space.x-15)*10}, ${(space.y-15)*10})`} 
                                            stroke='black' strokeWidth='20px' fill='yellow' points="154.18 4.52 200.5 98.37 304.06 113.41 229.12 186.46 246.81 289.61 154.18 240.91 61.55 289.61 79.24 186.46 4.3 113.41 107.86 98.37 154.18 4.52" />}
            {space.type == "happening" && <HappeningIcon x={space.x} y={space.y} z={2}/>}
            {space.type == "chance" && <ChanceIcon x={space.x} y={space.y} z={2}/>}
            {space.type == "duel" && <DuelIcon x={space.x} y={space.y} z={2}/>}
            {(space.type == "dk" && boardState.time == "day") && <DKIcon x={space.x} y={space.y} z={2}/>}
            {(space.type == "dk" && boardState.time == "night") && <BowserIcon x={space.x} y={space.y} z={2}/>}
        </g>
    )
}

function PlayerBoardDisp({player, boardState, boardData, playerMoveMode, setPlayerMoveMode, openSpaceDisplay, keyRef}) {
    const pdata = boardState["player"+player];
    const charData = CharacterData[pdata.character];

    let otherPlayers = [];
    for (let i = 1; i <= 4; i++) {
        if (i == player) continue;

        otherPlayers.push(boardState["player"+i]);
    }

    const onClick = () => {
        if (keyRef.current) {
            openSpaceDisplay(pdata.location);
        } else {
            if (playerMoveMode != player) {
                setPlayerMoveMode(player);
            } else {
                setPlayerMoveMode(-1);
            }
        }
    }

    let xLoc = 0;
    let yLoc = 0;
    let scale = 0.4;

    if (pdata.location == -1) {
        xLoc = boardData.start.x;
        yLoc = boardData.start.y;
    } else {
        xLoc = boardData.spaces[pdata.location].x - 11;
        yLoc = boardData.spaces[pdata.location].y - 12;
    }

    for (let i = 0; i < otherPlayers.length; i++) {
        if (otherPlayers[i].location == pdata.location) {
            scale = 0.3;
            xLoc -= 7;
            yLoc -= 7;
            if (player == 4) {
                xLoc += 20;
                yLoc += 20;
            } else if (player == 3) {
                yLoc += 20;
            } else if (player == 2) {
                xLoc += 20;
            }
            break;
        }
    }

    return (
        <image className="player-board-icon" href={charData.image} transform={`scale(${scale}) translate(${xLoc/scale}, ${yLoc/scale})`} onClick={onClick}/>
    )
}