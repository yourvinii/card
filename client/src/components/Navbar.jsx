import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="   flex justify-between p-6 bg-black text-white">
      <div>
        <Link to={"/"}>logo</Link>
      </div>
      <div className="flex gap-10">
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
      </div>
      <div className="flex gap-12">
        <Link to={"/"}>Login</Link>
        <Link to={"/register"}>Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
