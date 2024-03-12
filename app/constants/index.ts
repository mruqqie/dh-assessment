export interface LoginFormData {
	email: string;
	password: string;
}

export interface SignupFormData {
	name: string;
	email: string;
	password: string;
}

export interface User {
	name: string;
	email: string;
	password: string;
}

export interface UserContextValue {
	user: User | null;
	username: string | null;
	signup: (userData: User) => void;
	login: (username: string, password: string) => void;
	logout: () => void;
}
