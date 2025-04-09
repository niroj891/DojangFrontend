import axios from "axios";
import { atom, selector } from "recoil";

const userInformationAtom = atom({
    key: "userInfo",
    default: {
        firstName: null,
        lastName: null,
        mobile: null,
        email: null,
        image: null,
        gender: null,
        role: null
    }
})





const userInformationSelector = selector({
    key: "userProfileS",
    get: async ({ get }) => {
        try {
            const token = localStorage.getItem("jwt");

            if (!token) {
                console.error("No token found");
                return get(userInformationAtom); // Return default state if no token
            }

            const response = await axios.get("http://localhost:9696/api/users/profile", {



                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            return response.data;
        } catch (error) {
            console.error("Error fetching user profile:", error.response?.data || error.message);
            return get(userInformationAtom); // Return default state if request fails
        }
    },
});



const isLogin = atom({
    key: 'isLoginAtom',
    default: localStorage.getItem('jwt') ? true : false
}
)


export { userInformationSelector, userInformationAtom, isLogin }