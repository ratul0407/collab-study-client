import axios from "axios";

const saveUser = async (user) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/users/${user.email}`,
    {
      email: user?.email,
      name: user?.username,
      role: user?.role || "student",
      photo: user?.photoUrl,
    },
  );
  return data;
};
export { saveUser };

const currentTheme = () => {
  return localStorage.getItem("theme");
};

export { currentTheme };
