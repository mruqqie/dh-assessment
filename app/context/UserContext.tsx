"use client";
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { useRouter } from "next/navigation";
import { User, UserContextValue } from "../constants";
import axios from "axios";
import { useCookies } from "react-cookie";

interface UserContextProps {
	children: ReactNode;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
	const [cookies, setCookie, removeCookie] = useCookies(["user", "username"]);
	const [user, setUser] = useState<User | null>(null);
	const [username, setUsername] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userData = cookies["user"];
				const username = cookies["username"];
				if (userData) {
					setUser(userData);
					setUsername(username);
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};
		fetchData();
	}, [cookies]);

	const hashPassword = async (password: string) => {
		const encoder = new TextEncoder();
		const data = encoder.encode(password);

		const hashedBuffer = await crypto.subtle.digest("SHA-256", data);
		const hashedPassword = Array.from(new Uint8Array(hashedBuffer))
			.map((byte) => byte.toString(16).padStart(2, "0"))
			.join("");

		return hashedPassword;
	};

	const signup = async (userData: User) => {
		try {
			const checkEmailResponse = await fetch(
				`http://localhost:3001/users?email=${userData.email}`
			);
			const existingUsers: User[] = await checkEmailResponse.json();

			if (existingUsers.length > 0) {
				alert(
					"Email already in use. Please use a different email."
				);
				;
			} else {
				const hashedPassword = await hashPassword(userData.password);
				const response = await fetch("http://localhost:3001/users", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...userData,
						password: hashedPassword,
					}),
				});
				if (response.ok) {
					alert(
						"User signed up successfully. Proceeding to login page."
					);
					router.push("/login");
				} else {
					console.error("Failed to sign up user.");
				}
			}
		} catch (error) {
			console.error("Error during signup:", error);
			alert("Error signing up, please try again.");
		}
	};

	const login = async (email: string, password: string) => {
		try {
			const response = await fetch(
				`http://localhost:3001/users?email=${email}`
			);
			const users: User[] = await response.json();
			if (users.length > 0) {
				const storedPasswordHash = users[0].password;
				const enteredPasswordHash = await hashPassword(password);

				if (storedPasswordHash === enteredPasswordHash) {
					const userData = users[0];
					const username = users[0].name;
					setUser(userData);
					setUsername(username);
					setCookie("user", JSON.stringify(userData), { path: "/" });
					setCookie("username", username, { path: "/" });
					setUser(userData);
					router.push("/");
				} else {
					alert("Invalid credentials");
					router.push("/login");
				}
			} else {
				alert("User not found");
				router.push("/login");
			}
		} catch (error) {
			console.error("Error during login:", error);
			alert("Error logging in, please try again.");
		}
	};

	const logout = () => {
		removeCookie("user");
		removeCookie("username");
		setUser(null);
		setUsername(null);
		router.push("/login");
	};

	const contextValue: UserContextValue = {
		user,
		username,
		signup,
		login,
		logout,
	};

	return (
		<UserContext.Provider value={contextValue}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUserContext must be used within a UserProvider");
	}
	return context;
};
