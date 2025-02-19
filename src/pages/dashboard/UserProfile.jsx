import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

function UserProfile() {
  const { user } = useAuth();
  const { role } = useRole();
  console.log(user);
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <figure>
          <img
            className="rounded-full"
            referrerPolicy="no-referrer"
            src={user && user.photoURL ? user.photoURL : avatarImg}
            alt="profile"
            height="100"
            width="100"
          />
        </figure>
        <div className="space-y-3 text-xl">
          <h3>Name: {user?.displayName}</h3>
          <p>Email: {user?.email}</p>
          <p>Role: {role}</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
