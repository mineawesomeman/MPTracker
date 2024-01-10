import "./CircleButton.css"

export function CircleButton({symbol, color, hoverColor, pressColor, onClick}) {
    let leftVal = "5px";

    if (String(symbol).length == 2) {
        leftVal = "0px";
    }

    return (
        <div className="circle-button" onClick={onClick}
            style={{
                "--circle-button-color": color,
                "--circle-button-hover-color": hoverColor,
                "--circle-button-press-color": pressColor
            }}>
                <p style={{fontSize: "18px", left: leftVal}}>{symbol}</p>
        </div>
    )
}

export function TurnIndicator({turn}) {
    const adjust = String(turn).length > 1 ? "0px" : "25%"

    return (
        <div className="turn-indicator">
            <div className="inner">
                <p style={{left: adjust}}>{turn}</p>
            </div>
        </div>
    )
}