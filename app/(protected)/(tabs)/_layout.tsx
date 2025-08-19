import React from "react";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { Home, Calendar, MessageCircle, User } from "lucide-react-native";

import { useColorScheme } from "@/lib/useColorScheme";
import { colors } from "@/constants/colors";
import { Text } from "@/components/ui/text";

export default function TabsLayout() {
	const { colorScheme } = useColorScheme();

	const TabIcon = ({ icon: Icon, color, focused, label }: {
		icon: any;
		color: string;
		focused: boolean;
		label: string;
	}) => (
		<View className="items-center justify-center min-h-[50px] py-1">
			<Icon 
				size={24} 
				color={focused ? "#6FBAFF" : color}
				strokeWidth={1.5}
			/>
			<Text 
				className={`text-xs mt-1 ${
					focused ? "text-blue-400" : "text-gray-600"
				}`}
			>
				{label}
			</Text>
		</View>
	);

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: "white",
					borderTopWidth: 0,
					elevation: 10,
					shadowColor: "#000",
					shadowOffset: { width: 0, height: -2 },
					shadowOpacity: 0.1,
					shadowRadius: 8,
					height: 84,
					paddingBottom: 34, // For home indicator space
					paddingTop: 4,
				},
				tabBarActiveTintColor: "#6FBAFF",
				tabBarInactiveTintColor: "#666",
				tabBarShowLabel: false,
			}}
		>
			<Tabs.Screen 
				name="index" 
				options={{ 
					title: "Main",
					tabBarIcon: ({ color, focused }) => (
						<TabIcon 
							icon={Home} 
							color={color} 
							focused={focused} 
							label="Main"
						/>
					),
				}} 
			/>
			<Tabs.Screen 
				name="bookings"
				options={{ 
					title: "My bookings",
					tabBarIcon: ({ color, focused }) => (
						<TabIcon 
							icon={Calendar} 
							color={color} 
							focused={focused} 
							label="My bookings"
						/>
					),
				}} 
			/>
			<Tabs.Screen 
				name="messages"
				options={{ 
					title: "Messages",
					tabBarIcon: ({ color, focused }) => (
						<TabIcon 
							icon={MessageCircle} 
							color={color} 
							focused={focused} 
							label="Messages"
						/>
					),
				}} 
			/>
			<Tabs.Screen 
				name="profile"
				options={{ 
					title: "Profile",
					tabBarIcon: ({ color, focused }) => (
						<TabIcon 
							icon={User} 
							color={color} 
							focused={focused} 
							label="Profile"
						/>
					),
				}} 
			/>
		</Tabs>
	);
}
