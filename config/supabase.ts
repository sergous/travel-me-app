import { AppState, Platform } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

if (!process.env.EXPO_PUBLIC_SUPABASE_URL || !process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY) {
	console.warn("⚠️ Supabase environment variables are missing. Using placeholder values. Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in your environment.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});

// Helper function for Google OAuth with Supabase
export const signInWithGoogle = async () => {
	try {
		// Only complete auth session on native platforms to avoid cross-origin issues
		if (Platform.OS !== 'web') {
			WebBrowser.maybeCompleteAuthSession();
		}

		const redirectUrl = AuthSession.makeRedirectUri({
			useProxy: true,
		});

		const response = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: redirectUrl,
			},
		});

		if (response.error) {
			console.error("Error initiating Google sign-in:", response.error);
			throw response.error;
		}

		if (response.data?.url) {
			// Open the OAuth URL in the browser
			const result = await WebBrowser.openAuthSessionAsync(
				response.data.url,
				redirectUrl
			);

			if (result.type === 'success' && result.url) {
				// Extract the session from the URL
				const url = new URL(result.url);
				const access_token = url.searchParams.get('access_token');
				const refresh_token = url.searchParams.get('refresh_token');

				if (access_token && refresh_token) {
					const { data, error } = await supabase.auth.setSession({
						access_token,
						refresh_token,
					});

					if (error) {
						console.error("Error setting session:", error);
						throw error;
					}

					return data;
				}
			}
		}

		throw new Error("Google sign-in was cancelled or failed");
	} catch (error) {
		console.error("Google sign-in error:", error);
		throw error;
	}
};

// Initialize auth refresh handling
export const initializeAuthListener = () => {
	const handleAppStateChange = (state: string) => {
		if (state === "active") {
			supabase.auth.startAutoRefresh();
		} else {
			supabase.auth.stopAutoRefresh();
		}
	};

	AppState.addEventListener("change", handleAppStateChange);

	return () => {
		AppState.removeEventListener("change", handleAppStateChange);
	};
};
