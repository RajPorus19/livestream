import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return(
<div class="mt-xl header">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-auto">
                <Link to="/">
                    <h1 class="name">LiveStream</h1>
                </Link>
            </div>
        </div>

        <div class="row justify-content-center">
            <ul class="nav nav-primary">
                <li class="nav-item">
                    <Link class="nav-link"  to="/">
                      Home
                    </Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link"  to="/login">
                      Login
                    </Link>
                </li>
            </ul>
        </div>
    </div>
</div>);
}
export default Header;
