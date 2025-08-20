import React from "react";
import { Tabs } from "expo-router";
import { View } from "react-native";

import { useColorScheme } from "@/lib/useColorScheme";
import { colors } from "@/constants/colors";
import { Text } from "@/components/ui/text";

export default function TabsLayout() {
	const { colorScheme } = useColorScheme();

	const TabIcon = ({
		emoji,
		focused,
		label,
	}: {
		emoji: string;
		focused: boolean;
		label: string;
	}) => (
		<View className="items-center justify-center min-h-[50px] py-1">
			<Text className="text-2xl mb-1">{emoji}</Text>
			<Text
				className={`text-xs ${focused ? "text-blue-400" : "text-gray-600"}`}
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
					tabBarIcon: ({ focused }) => (
						<TabIcon emoji="🏠" focused={focused} label="Main" />
					),
				}}
			/>
			<Tabs.Screen
				name="bookings"
				options={{
					title: "My bookings",
					tabBarIcon: ({ focused }) => (
						<TabIcon emoji="📅" focused={focused} label="My bookings" />
					),
				}}
			/>
			<Tabs.Screen
				name="messages"
				options={{
					title: "Messages",
					tabBarIcon: ({ focused }) => (
						<TabIcon emoji="💬" focused={focused} label="Messages" />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ focused }) => (
						<TabIcon emoji="👤" focused={focused} label="Profile" />
					),
				}}
			/>
		</Tabs>
	);
}
