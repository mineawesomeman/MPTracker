import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Board from "./Board";
import ToweringTreetop from "./toweringtreetop.json"
import {useState, useEffect} from 'react';
import Home from "./LoginElements/Home";
import LoggedOut from "./LoginElements/LoggedOut";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const UNKNOWN_ACCESS = 0;
const HAS_ACCESS = 1;
const NO_ACCESS = 2;

function App() {

    const [user, setUser] = useState(null);
    const [ profile, setProfile ] = useState(null);
    const [hasAccess, setAccess] = useState(UNKNOWN_ACCESS);

    const checkAccess = async function() {
        try {
            const resp = await fetch("http://localhost:3000/user-validation", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    id: profile.id
                })
            })

            const info = await resp.json();
            if (info?.beta && info.beta == true) {
                setAccess(HAS_ACCESS);
            } else {
                setAccess(NO_ACCESS)
            }
        } catch (e) {
            setAccess(UNKNOWN_ACCESS);
            console.error(e)
        }

    }

    useEffect(() => {
        if (profile)
            checkAccess()
    }, [profile])

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.error('Login Failed:', error),
        redirect_uri: "https://localhost:3000/home"
    });
    const logOut = () => {
        googleLogout();
        setProfile(null);
        setAccess(UNKNOWN_ACCESS);
    };

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.error(err));
            }
        },
        [ user ]
    );

    return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={profile ? <Navigate to="/home"/> : <LoggedOut login={login} />} />
                <Route path="/home" element={profile ? <Home profile={profile} logout={logOut} hasAccess={hasAccess} refresh={checkAccess}/> : <Navigate to="/" />} />
                <Route path="/TT" element={profile && hasAccess == HAS_ACCESS ? <Board board_data={ToweringTreetop} /> : <Navigate to="/"/>} />
            </Routes>
        </Router>
    </>
    );
}

export default App;
