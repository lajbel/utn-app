import * as fs from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren } from "react";
import { useCallback, useState } from "react";
import { Button, Drawer, Menu, Navbar } from "react-daisyui";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProfileDrop from "./ProfileDrop";

export default function Navigator({ children }: PropsWithChildren<{}>) {
    const [visible, setVisible] = useState(false);
    const { isAuthenticated } = useAuth();

    const toggleVisible = useCallback(() => {
        setVisible((visible) => !visible);
    }, []);

    const noAuthItems = () => {
        return (
            <>
                <Menu horizontal={true}>
                    <Menu.Item>
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/register">Register</Link>
                    </Menu.Item>
                </Menu>
            </>
        );
    };

    const authItems = () => {
        return (
            <>
                <div className="join">
                    <Link
                        to="/recipes"
                        className="join-item btn btn-ghost gap-2"
                    >
                        <FontAwesomeIcon icon={fs.faScroll} size="xl" />
                        My Recipes
                    </Link>

                    <Link to="/create" className="join-item btn btn-ghost">
                        <FontAwesomeIcon icon={fs.faCirclePlus} size="xl" />

                        <span className="sr-only">
                            Create new recipe
                        </span>
                    </Link>
                </div>

                <ProfileDrop />
            </>
        );
    };

    return (
        <Drawer
            open={visible}
            onClickOverlay={toggleVisible}
            side={
                <Menu className="p-4 w-60 md:w-80 h-full bg-base-200">
                    <Menu.Item>
                        <a>Sidebar Item 1</a>
                    </Menu.Item>
                    <Menu.Item>
                        <a>Sidebar Item 2</a>
                    </Menu.Item>
                </Menu>
            }
            contentClassName="flex flex-col h-full min-h-screen"
        >
            <Navbar className="w-full bg-base-300">
                <div className="flex-none lg:hidden">
                    <Button
                        shape="square"
                        color="ghost"
                        onClick={toggleVisible}
                        aria-label="Toggle Sidebar"
                    >
                        <FontAwesomeIcon icon={fs.faBars} />
                    </Button>
                </div>
                <div className="flex-1 px-2 mx-2">
                    <Link to="/" className="btn btn-ghost text-lg">
                        PancakeSnap 🥞
                    </Link>
                </div>
                <div className="flex-none px-2 mx-2 hidden lg:flex gap-2">
                    {isAuthenticated ? authItems() : noAuthItems()}
                </div>
            </Navbar>
            <div className="flex flex-grow items-center justify-center">
                {children}
            </div>
        </Drawer>
    );
}
