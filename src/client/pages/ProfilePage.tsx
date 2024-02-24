import { User } from "@/types/user";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserRequest } from "../api/user";
import {
    EditProfileModal,
    ModalHandles,
} from "../components/forms/EditProfileForm";
import { cn } from "../lib/util";

function ProfilePage() {
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const modalRef = useRef<ModalHandles>(null);

    const handleEditClick = () => {
        modalRef.current?.handleShow();
    };

    useEffect(() => {
        getUserRequest(id!).then((res) => {
            if (res.data) {
                setUser(res.data.user);
                setLoading(false);
            }
        });
    }, [id]);

    return (
        <div className="flex flex-col p-8 bg-base-200 w-full max-w-3xl gap-4">
            {user && (
                <EditProfileModal
                    ref={modalRef}
                    user={user}
                />
            )}

            <div className="flex gap-4">
                <div className="avatar">
                    <div
                        className={cn("w-40 rounded", {
                            "skeleton": loading,
                        })}
                    >
                        <img
                            className={cn({
                                "opacity-0": loading,
                            })}
                            src={user?.profilePhoto}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <h1
                        className={cn("text-3xl font-bold", {
                            "skeleton text-transparent": loading,
                        })}
                    >
                        <span
                            className={cn("text-primary", {
                                "text-transparent": loading,
                            })}
                        >
                            @
                        </span>
                        {user?.username ?? "Loading..."}
                    </h1>
                    <p
                        className={cn("text-lg", {
                            "skeleton text-transparent": loading,
                        })}
                    >
                        {user?.profileDescription ?? "Loading..."}
                    </p>
                </div>
            </div>

            <div>
                <button
                    onClick={handleEditClick}
                    className="btn btn-primary"
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
}

export default ProfilePage;
