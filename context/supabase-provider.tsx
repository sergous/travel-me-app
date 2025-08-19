import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";

import { Session } from "@supabase/supabase-js";

import { supabase, signInWithGoogle } from "@/config/supabase";

type AuthState = {
	initialized: boolean;
	session: Session | null;
	signUp: (email: string, password: string) => Promise<void>;
	signIn: (email: string, password: string) => Promise<void>;
	signInWithGoogle: () => Promise<void>;
	signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthState>({
	initialized: false,
	session: null,
	signUp: async () => {},
	signIn: async () => {},
	signInWithGoogle: async () => {},
	signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
	const [initialized, setInitialized] = useState(false);
	const [session, setSession] = useState<Session | null>(null);

	const signUp = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			console.error("Error signing up:", error);
			return;
		}

		if (data.session) {
			setSession(data.session);
			console.log("User signed up:", data.user);
		} else {
			console.log("No user returned from sign up");
		}
	};

	const signIn = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.error("Error signing in:", error);
			return;
		}

		if (data.session) {
			setSession(data.session);
			console.log("User signed in:", data.user);
		} else {
			console.log("No user returned from sign in");
		}
	};

	const handleSignInWithGoogle = async () => {
		try {
			await signInWithGoogle();
		} catch (error: any) {
			console.error("Error signing in with Google:", error);
			throw error;
		}
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error("Error signing out:", error);
			return;
		} else {
			console.log("User signed out");
		}
	};

	useEffect(() => {
		let isMounted = true;

		supabase.auth.getSession().then(({ data: { session } }) => {
			if (isMounted) {
				setSession(session);
			}
		});

		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			if (isMounted) {
				setSession(session);
			}
		});

		if (isMounted) {
			setInitialized(true);
		}

		return () => {
			isMounted = false;
			subscription.unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider
			value={{
				initialized,
				session,
				signUp,
				signIn,
				signInWithGoogle: handleSignInWithGoogle,
				signOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
