import { Link } from "react-router-dom";
const Header = () => {
  return(
    <div>
    <h1>This is a header</h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </div>
  );
}
export default Header;
