import { useAuth } from "../context/AuthContext";

function ProfilePage() {
    const { user } = useAuth();

    return (
        <div className="flex flex-col p-8 bg-base-200">
            <div className="flex gap-4">
                <div className="avatar">
                    <div className="w-24 rounded">
                        <img src={user?.profilePhoto} />
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold">
                        <span className="text-primary">@</span>
                        {user?.username}
                    </h1>
                    <p>{user?.profileDescription}</p>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
