import { Button, Dropdown } from "react-daisyui";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProfileDrop() {
    const { user, logOut } = useAuth();

    return (
        <Dropdown end>
            <Button
                tag="label"
                tabIndex={0}
                color="ghost"
                className="avatar"
                shape="circle"
            >
                <div className="w-10 rounded-full">
                    <img src={user?.profilePhoto} alt="avatar" />
                </div>
            </Button>
            <Dropdown.Menu className="w-52 menu-sm mt-3 z-[1] p-2">
                <li>
                    <Link to="/profile">@{user?.username}</Link>
                </li>
                <Dropdown.Item onClick={logOut}>
                    Logout
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default ProfileDrop;
