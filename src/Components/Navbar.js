import {Link, Outlet} from "react-router-dom";

const NavBar = () =>{
    return(
        <>
            <nav class="navbar navbar-light bg-light">
                <div class="navbar-nav">
                    <h3>Joplin</h3>
                </div>
                <ul className="nav navbar-nav flex-row-reverse ms-auto gap-5">
                    <li><Link to="games" style={{textDecoration: "none", color:"black"}}>Games</Link></li>
                    <li><Link to="transfer" style={{textDecoration: "none", color:"black"}}>Transfer</Link></li>
                    <li><Link to="topup" style={{textDecoration: "none", color:"black"}}>Top Up</Link></li>
                    <li><Link to="/" style={{textDecoration: "none", color:"black"}}>Home</Link></li>
                </ul>
            </nav>
            <Outlet/>

        </>
    )
}

export default NavBar;
