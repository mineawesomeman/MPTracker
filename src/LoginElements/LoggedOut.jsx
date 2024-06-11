export default function LoggedOut({login}) {
    return (
        <div>
            <h1>Welcome to the Mario Party Tracker Beta</h1>
            <br/>
            <br/>
            <p>This is currently a closed beta. Sign in with your google account.</p>
            <button onClick={login}>Sign in with Google</button>
        </div>
    )
}