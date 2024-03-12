"use client";
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import { useUserContext } from "./context/UserContext";
import { useRouter } from "next/navigation";
import PulseLoader from "react-spinners/PulseLoader";

const override = {
	display: "block",
	margin: "0 auto",
	borderColor: "#F89878",
};

export default function Home() {
	const { user } = useUserContext();
	const router = useRouter();
	const [timeoutReached, setTimeoutReached] = useState(false);
	const [redirecting, setRedirecting] = useState(false);

	useEffect(() => {
		if (!user) {
			const timer = setTimeout(() => {
				setTimeoutReached(true);
			}, 500);
			setRedirecting(true)
			return () => clearTimeout(timer);
		}
	}, [user]);

	useEffect(() => {
		if (timeoutReached && !user) {
			setRedirecting(true);
			router.push("/login");
		}
	}, [timeoutReached, user, router, redirecting]);

	if (!user && !timeoutReached) {
		return (
			<div className="flex bg-[#f3f3f3] h-[100vh] items-center">
				<PulseLoader
					color={"#0F88D9"}
					cssOverride={override}
					size={20}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			</div>
		);
	}

	return <div>{user && <Dashboard />}</div>;
}
