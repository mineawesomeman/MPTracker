import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home({profile, logout, hasAccess, refresh}) {
    
    return (
        <div>
            <h1>MPTracker Home Page</h1>
            <br/>
            <br/>
            <p>You are signed into the MPTracker</p>
            <p>Name: {profile.name}</p>
            <p>Your account {hasAccess == 1 ? <b>DOES</b> : <b>DOES NOT</b>} have access to the beta</p>
            {hasAccess == 0 && <p>There seems to be an error fetching your account's access. Open up developer console by right clicking, then clicking inspect element, then click console and take a screenshot! Then use the link below to report a bug.</p>}
            {hasAccess == 2 && <p>If you would like to gain access to the beta, fill out the form <a href="https://forms.gle/mqk1pBLeh1AzsgAa9">here</a></p>}
            <button onClick={()=>console.log(profile)}>Click to print profile</button> <br/>
            <button onClick={logout}>Logout</button> <br/>
            <button onClick={refresh}>Check Access</button> <br/>
            {hasAccess == 1 && <Link to="/TT">Go to Treetop Land</Link>}
            <br/>
            <br/>
            <p>Report any bugs <a href="https://github.com/mineawesomeman/MPTracker/issues">here</a>!</p>
            
        </div>
    );
}