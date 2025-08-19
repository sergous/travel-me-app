import React, { useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";

import { Image } from "@/components/image";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { useColorScheme } from "@/lib/useColorScheme";
import { useAuth } from "@/context/supabase-provider";

export default function WelcomeScreen() {
	const router = useRouter();
	const { colorScheme } = useColorScheme();
	const { signInWithGoogle } = useAuth();
	const [isGoogleLoading, setIsGoogleLoading] = useState(false);

	const appIcon =
		colorScheme === "dark"
			? require("@/assets/icon.png")
			: require("@/assets/icon-dark.png");

	const handleGoogleSignIn = async () => {
		try {
			setIsGoogleLoading(true);
			await signInWithGoogle();
			// Navigation will be handled automatically by the auth state change
		} catch (error: any) {
			Alert.alert(
				"Sign In Error",
				error.message || "Failed to sign in with Google. Please try again."
			);
		} finally {
			setIsGoogleLoading(false);
		}
	};

	return (
		<SafeAreaView className="flex flex-1 bg-background p-4">
			<View className="flex flex-1 items-center justify-center gap-y-4 web:m-4">
				<Image source={appIcon} className="w-16 h-16 rounded-xl" />
				<H1 className="text-center">Welcome to Expo Supabase Starter</H1>
				<Muted className="text-center">
					A comprehensive starter project for developing React Native and Expo
					applications with Supabase as the backend.
				</Muted>
			</View>
			<View className="flex flex-col gap-y-4 web:m-4">
				<Button
					size="default"
					variant="default"
					onPress={handleGoogleSignIn}
					disabled={isGoogleLoading}
				>
					{isGoogleLoading ? (
						<ActivityIndicator size="small" color="white" />
					) : (
						<Text>Continue with Google</Text>
					)}
				</Button>
				<View className="flex flex-row items-center gap-x-4">
					<View className="flex-1 h-px bg-border" />
					<Text className="text-muted-foreground text-sm">or</Text>
					<View className="flex-1 h-px bg-border" />
				</View>
				<Button
					size="default"
					variant="secondary"
					onPress={() => {
						router.push("/sign-up");
					}}
				>
					<Text>Sign Up</Text>
				</Button>
				<Button
					size="default"
					variant="outline"
					onPress={() => {
						router.push("/sign-in");
					}}
				>
					<Text>Sign In</Text>
				</Button>
			</View>
		</SafeAreaView>
	);
}
