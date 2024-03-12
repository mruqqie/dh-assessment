"use client";
import React, { ChangeEvent, useState } from "react";
import { SignupFormData } from "../constants";
import { useUserContext } from "../context/UserContext";
import { useRouter } from "next/navigation";
import PulseLoader from "react-spinners/PulseLoader";

const override = {
	display: "block",
	margin: "0 auto",
	borderColor: "#F89878",
};

const Signup = () => {
	const { signup } = useUserContext();
	const [formData, setFormData] = useState<SignupFormData>({
		name: "",
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (formData.password.length < 8) {
				setLoading(false);
				alert("Password must be at least 8 characters");
				return;
			}

			if (!/[A-Z]/.test(formData.password)) {
				setLoading(false);
				alert("Passwords must have at least one uppercase ('A'-'Z').");
				return;
			}

			if (!/\W/.test(formData.password)) {
				setLoading(false);
				alert(
					"Passwords must have at least one non-alphanumeric character."
				);
				return;
			}
			if (!/\d/.test(formData.password)) {
				setLoading(false);
				alert("Passwords must have at least one digit ('0'-'9').");
				return;
			}
			const userData = {
				name: formData.name,
				email: formData.email,
				password: formData.password,
			};
			await signup(userData);
			setTimeout(() => setLoading(false), 500);
		} catch (error) {
			setLoading(false);
			console.error("Error creating user:", error);
		}
	};

	if (loading) {
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

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<div className="sm:max-w-md w-[90%] flex items-center justify-center p-2 xs:p-6 bg-white rounded-2xl border border-gray-300 shadow-xl">
				<div className="flex flex-col gap-3 items-center h-[475px] xs:h-[450px] border-black w-[80%] sm:w-[85%]">
					<div>
						<h1 className="font-[600] text-2xl xs:text-3xl leading-[38px] text-[#101828]">
							Sign up
						</h1>
					</div>
					<div className="w-[100%]">
						<form
							onSubmit={handleSubmit}
							className="flex flex-col gap-5 w-[100%]"
						>
							<div className="flex flex-col gap-[6px]">
								<label
									htmlFor="name"
									className="font-medium text-sm"
								>
									Name*
								</label>
								<input
									type="text"
									id="name"
									name="name"
									onChange={handleChange}
									value={formData.name}
									placeholder="Enter your name"
									className="border border-[#D0D5DD] focus:outline-none focus:ring-4 focus:ring-purple-100 rounded-lg w-[100%] h-[44px] px-[10px] py-[14px]"
									required
								/>
							</div>
							<div className="flex flex-col gap-[6px]">
								<label
									htmlFor="email"
									className="font-medium text-sm"
								>
									Email*
								</label>
								<input
									type="email"
									id="email"
									name="email"
									onChange={handleChange}
									value={formData.email}
									placeholder="Enter your email"
									className="border border-[#D0D5DD] focus:outline-none focus:ring-4 focus:ring-purple-100 rounded-lg w-[100%] h-[44px] px-[10px] py-[14px]"
									required
								/>
							</div>
							<div className="flex flex-col gap-[6px]">
								<label
									htmlFor="password"
									className="font-medium text-sm"
								>
									Password*
								</label>
								<input
									type="password"
									id="password"
									name="password"
									onChange={handleChange}
									value={formData.password}
									placeholder="**********"
									className="border border-[#D0D5DD] focus:outline-none focus:ring-4 focus:ring-purple-100 rounded-lg w-[100%] h-[44px] px-[10px] py-[14px]"
									required
								/>
								<p className="font-[400] text-sm text-[#475467]">
									Must be at least 8 characters.
								</p>
							</div>
							<button
								type="submit"
								className="text-base font-[600] mt-3 xs:mt-6 w-[100%] h-11 rounded-lg bg-[#27779B] border border-[#7F56D9] hover:bg-[#7F56D9] text-white"
							>
								Get started
							</button>
						</form>
					</div>
					<div>
						<p className="font-[400] text-sm text-center">
							Already have an account?{" "}
							<span
								onClick={() => {
									setLoading(true);
									router.push("/login");
								}}
								className="font-[600] text-[#27779B] hover:text-purple-800 hover:cursor-pointer"
							>
								Log in
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
