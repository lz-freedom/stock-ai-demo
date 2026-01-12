import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
    id: string;
    username: string;
    email?: string;
    avatar?: string;
    // 根据实际情况补充其他字段
}

interface AuthState {
    token: string | null;
    userInfo: UserInfo | null;
    setToken: (token: string) => void;
    setUserInfo: (userInfo: UserInfo) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            userInfo: null,
            setToken: (token) => set({ token }),
            setUserInfo: (userInfo) => set({ userInfo }),
            logout: () => set({ token: null, userInfo: null }),
        }),
        {
            name: 'auth-storage', // name of the item in the storage (must be unique)
        }
    )
);
