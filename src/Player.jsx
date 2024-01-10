import "./Player.css"
import CharacterData from "./CharacterData.json"
import OrbData from "./OrbData.json"
import { useState } from "react";

export function Player({num, bState, setBState}) {
    const pdata = bState["player"+num];

    const charData = CharacterData[pdata.character];
    const [o1, setO1] = useState(false);
    const [o2, setO2] = useState(false);
    const [o3, setO3] = useState(false);
    const [pOpen, setPOpen] = useState(false);

    const o1Toggle = () => {
        if (o1) {
            setO1(false);
        } else {
            setO1(true);
            setO2(false);
            setO3(false);
        }
    }

    const o2Toggle = () => {
        if (o2) {
            setO2(false);
        } else {
            setO1(false);
            setO2(true);
            setO3(false);
        }
    }

    const o3Toggle = () => {
        if (o3) {
            setO3(false);
        } else {
            setO1(false);
            setO2(false);
            setO3(true);
        }
    }

    const setOrb = (orb, position) => {
        let newBState = structuredClone(bState);
        newBState["player"+num].orbs[position] = orb;

        setBState(newBState);
    }

    const setCharacter = (character) => {
        let newBState = structuredClone(bState);
        newBState["player"+num].character = character;

        setBState(newBState);
        setPOpen(false);
    }

    return (
        <div className={"pbox p" + num}>
            <div className="player-image">
                <img src={charData.image} onClick={() => {setPOpen(!pOpen)}} />
                <PlayerSelect open={pOpen} setPlayer={setCharacter} closeDisp={() => {setPOpen(false)}}/>
            </div>
            <div className="player-name">
                <p>{charData.name}</p>
            </div>
            <div className="player-stars">
                <img src="/ui/star.png"/><p>{pdata.stars}</p>
            </div>
            <div className="player-coins">
                <img src="/ui/coin.png"/><p>{pdata.coins}</p>
            </div>
            <div className="player-orbs">
                <span>
                    <OrbDisplay orb={pdata.orbs[0]} open={o1} onOpen={o1Toggle} position={0} setOrb={setOrb}/> 
                    <OrbDisplay orb={pdata.orbs[1]} open={o2} onOpen={o2Toggle} position={1} setOrb={setOrb}/> 
                    <OrbDisplay orb={pdata.orbs[2]} open={o3} onOpen={o3Toggle} position={2} setOrb={setOrb}/>
                </span>
            </div>
        </div>
    )
}

function PlayerSelect({open, closeDisp, setPlayer}) {

    return (
        <div className="player-select" style={{display: (open ? "inline-block" : "none")}}>
            <div className="player-select-title"><p>Character Select</p></div>
            <div className="player-select-row">
                <img src={CharacterData.mario.image} alt={CharacterData.mario.name} onClick={() => setPlayer("mario")}/>
                <img src={CharacterData.luigi.image} alt={CharacterData.luigi.name} onClick={() => setPlayer("luigi")}/>
                <img src={CharacterData.peach.image} alt={CharacterData.peach.name} onClick={() => setPlayer("peach")}/>
                <img src={CharacterData.yoshi.image} alt={CharacterData.yoshi.name} onClick={() => setPlayer("yoshi")}/>
            </div>
            <div className="player-select-row">
                <img src={CharacterData.wario.image} alt={CharacterData.wario.name} onClick={() => setPlayer("wario")}/>
                <img src={CharacterData.daisy.image} alt={CharacterData.daisy.name} onClick={() => setPlayer("daisy")}/>
                <img src={CharacterData.waluigi.image} alt={CharacterData.waluigi.name} onClick={() => setPlayer("waluigi")}/>
            </div>
            <div className="player-select-row">
                <img src={CharacterData.toad.image} alt={CharacterData.toad.name} onClick={() => setPlayer("toad")}/>
                <img src={CharacterData.boo.image} alt={CharacterData.boo.name} onClick={() => setPlayer("boo")}/>
                <img src={CharacterData.koopa_kid.image} alt={CharacterData.koopa_kid.name} onClick={() => setPlayer("koopa_kid")}/>
                <img src={CharacterData.toadette.image} alt={CharacterData.toadette.name} onClick={() => setPlayer("toadette")}/>
            </div>
            <div className="player-select-close" onClick={closeDisp}></div>
        </div>
    )
}

function OrbDisplay({orb, setOrb, open, onOpen, position}) {
    const [menu, setMenu] = useState({
        submenu: "home",
        page: 1
    });

    const mainImage = OrbData.all_orbs[orb].image_loc;

    const toggleMenu = () => {
        onOpen();
        setTimeout(() => {setMenu({
            submenu: "home",
            page: 1
        })}, 300);
    }

    const changeAndClose = (orb) => {
        setTimeout(() => {setOrb(orb, position)}, 100);
        toggleMenu();
    }

    let elem1 = {
        element: (<>{/**this is empty intentionally*/}</>),
        action: () => {changeAndClose("")}
    };
    let elem2 = {
        element: (<img src={OrbData.all_orbs.green.image_loc} alt={OrbData.all_orbs.green.name}/>),
        action: () => {setMenu({submenu: "green", page: 0})}
    };
    let elem3 = {
        element: (<img src={OrbData.all_orbs.blue.image_loc} alt={OrbData.all_orbs.blue.name}/>),
        action: () => {setMenu({submenu: "blue", page: 1})}
    };
    let elem4 = {
        element: (<p className="close-orb-menu">X</p>),
        action: () => {toggleMenu()}
    };
    let elem5 = {
        element: (<img src={OrbData.all_orbs.yellow.image_loc} alt={OrbData.all_orbs.yellow.name}/>),
        action: () => {setMenu({submenu: "yellow", page: 0})}
    };
    let elem6 = {
        element: (<img src={OrbData.all_orbs.red.image_loc} alt={OrbData.all_orbs.red.name}/>),
        action: () => {setMenu({submenu: "red", page: 0})}
    };

    if (menu.submenu == "blue") {
        elem2 = {
            element: (<p className="close-orb-menu">X</p>),
            action: () => {toggleMenu()}
        };
        elem3 = {
            element: (<img src={OrbData.all_orbs.blue.image_loc} alt={OrbData.all_orbs.blue.name}/>),
            action: () => {changeAndClose("blue")}
        };
        elem5 = {
            element: (<img src={OrbData.all_orbs.snack.image_loc} alt={OrbData.all_orbs.snack.name}/>),
            action: () => {changeAndClose("snack")}
        };
        elem6 = {
            element: (<img src={OrbData.all_orbs["boo-away"].image_loc} alt={OrbData.all_orbs["boo-away"].name}/>),
            action: () => {changeAndClose("boo-away")}
        };
    } else if (menu.submenu == "red" || menu.submenu == "yellow" || menu.submenu == "green") {
        const orb1 = OrbData[menu.submenu][(menu.page * 4) % (OrbData[menu.submenu].length)];
        const orb2 = OrbData[menu.submenu][((menu.page * 4) + 1) % (OrbData[menu.submenu].length)];
        const orb3 = OrbData[menu.submenu][((menu.page * 4) + 2) % (OrbData[menu.submenu].length)];
        const orb4 = OrbData[menu.submenu][((menu.page * 4) + 3) % (OrbData[menu.submenu].length)];

        elem1 = {
            element: (<p className="close-orb-menu">X</p>),
            action: () => {toggleMenu()}
        };
        elem2 = {
            element: (<img src={OrbData.all_orbs[orb1].image_loc} alt={OrbData.all_orbs[orb1].name}/>),
            action: () => {changeAndClose(orb1)}
        };
        elem3 = {
            element: (<img src={OrbData.all_orbs[orb2].image_loc} alt={OrbData.all_orbs[orb2].name}/>),
            action: () => {changeAndClose(orb2)}
        };
        elem4 = {
            element: (<p className="close-orb-menu">&gt;</p>),
            action: () => {setMenu({submenu: menu.submenu, page: (menu.page+1)})}
        };
        elem5 = {
            element: (<img src={OrbData.all_orbs[orb3].image_loc} alt={OrbData.all_orbs[orb3].name}/>),
            action: () => {changeAndClose(orb3)}
        };
        elem6 = {
            element: (<img src={OrbData.all_orbs[orb4].image_loc} alt={OrbData.all_orbs[orb4].name}/>),
            action: () => {changeAndClose(orb4)}
        };
    }

    return (
        <div className={"orb-container"}>
            <div className={"orb-display" + (open ? " selected": "")} onClick={toggleMenu}>
                <div>
                    {mainImage != "" && <img src={mainImage} alt={OrbData.all_orbs[orb].name}/>}
                </div>
            </div>
            <div className={"orb-selection" + ((open && menu.submenu != "blue") ? " os1" : "")} onClick={elem1.action}>
                <div>
                    {elem1.element}
                </div>
            </div>
            <div className={"orb-selection" + (open ? " os2" : "")} onClick={elem2.action}>
                <div>
                    {elem2.element}
                </div>
            </div>
            <div className={"orb-selection" + (open ? " os3" : "")} onClick={elem3.action}>
                <div>
                    {elem3.element}
                </div>
            </div>
            <div className={"orb-selection" + ((open && menu.submenu != "blue") ? " os4" : "")} onClick={elem4.action}>
                <div>
                    {elem4.element}
                </div>
            </div>
            <div className={"orb-selection" + (open ? " os5" : "")} onClick={elem5.action}>
                <div>
                    {elem5.element}
                </div>
            </div>
            <div className={"orb-selection" + (open ? " os6" : "")} onClick={elem6.action}>
                <div>
                    {elem6.element}
                </div>
            </div>
        </div>
    )
}