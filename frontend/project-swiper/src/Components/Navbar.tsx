import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../Assets/logo.png";
import { NavbarLinks } from "../Helpers/NavbarLinks";
import AccountMenu from "./AccountMenu";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-center">
      {/* Title */}
      <a className="navbar-brand" href="/">
        <img src={logo} height="30" width="30" style={{ marginRight: "20px", marginTop: "-5px" }} alt="logo" />
        Project Noogler
      </a>

      {/* Mobile collaps */}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Nav links */}
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {Object.keys(NavbarLinks).map((key, index) => {
            const link = NavbarLinks[key];
            return (
              <li key={index} className="nav-item">
                <a className={"nav-link " + (window.location.pathname === link.redirect ? "active underline" : "")} href={link.redirect}>
                  {link.title}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Search bar */}
        <Search style={{ color: "white", textAlign: "left" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
        </Search>

        {/* Account */}
        <div className="nav-item" >
          <AccountMenu />
        </div>
      </div>
    </nav>
  );
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
