import React from "react";
import { View } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";

export default function BookingsScreen() {
	return (
		<SafeAreaView className="flex-1 bg-background">
			<View className="flex-1 items-center justify-center p-4">
				<H1 className="text-center mb-4">My Bookings</H1>
				<Text className="text-center text-muted-foreground">
					Your booked tours will appear here
				</Text>
			</View>
		</SafeAreaView>
	);
}
