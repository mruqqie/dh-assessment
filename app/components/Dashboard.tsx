import Image from "next/image";
import React from "react";
import ProfileBg from "../assets/profilebg.jpg";
import UserAvatar from "../assets/userAvatar.jpg";
import { useUserContext } from "../context/UserContext";

const Dashboard = () => {
	const { logout, username } = useUserContext();
	const handleLogout = () => {
		logout();
	};
	return (
		<div className="flex flex-row w-[100%] h-[100vh]">
			<Image
				src={ProfileBg}
				width={1000}
				height={1000}
				alt="bg image"
				className="w-[100%] h-[40%]"
			/>
			<div>
				<div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-black text-center bg-gray-100 w-[90%] xs:w-[80%] h-[50%] pb-4 xs:pb-8 xs:h-[60%] rounded-3xl">
					<Image
						src={UserAvatar}
						width={1000}
						height={1000}
						alt="User Avatar"
						className="w-[100px] h-[100px] xs:w-[150px] xs:h-[150px] z-10 mx-[auto] -mt-12 xs:-mt-16 rounded-[50%]"
					/>
					<div className="flex flex-col justify-between h-[80%]">
						<div>
							<h2 className="text-xl xs:text-4xl font-bold text-gray-900">
								{username} Dunphy
							</h2>
							<p className="text-gray-600 text-xs">
								Lagos, Nigeria
							</p>
						</div>
						<div className="text-sm xs:text-base text-gray-700">
							<p>Web Developer - Technical Writer</p>
							<p>University of Lagos - Lagos</p>
						</div>
						<div className="flex w-[100%] justify-center gap-8">
							<div>
								<p className="text-xl xs:text-3xl font-bold text-gray-700">30</p>
								<p className="text-xs xs:text-sm text-gray-700">Friends</p>
							</div>
							<div>
								<p className="text-xl xs:text-3xl font-bold text-gray-700">12</p>
								<p className="text-xs xs:text-sm text-gray-700">Photos</p>
							</div>
							<div>
								<p className="text-xl xs:text-3xl font-bold text-gray-700">40</p>
								<p className="text-xs xs:text-sm text-gray-700">Requests</p>
							</div>
						</div>
						<button className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-lg mx-auto w-[100px] h-[40px]" onClick={handleLogout}>Logout</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
