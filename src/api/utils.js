import axios from "axios";

const saveUser = async (user) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/users/${user.email}`,
    {
      email: user?.email,
      name: user?.displayName,
      role: user?.role || "student",
      photo: user?.photoURL,
    },
  );
  return data;
};
export { saveUser };
