import { atom } from "recoil";

export const profileState = atom({
    key: 'profile',
    default: {
        username: '',
        photoURL: '',
        email: ''
    }
})
