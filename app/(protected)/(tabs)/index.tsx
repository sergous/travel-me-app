import React, { useState } from "react";
import { View, ScrollView, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { Search, ArrowUpRight, Heart } from "lucide-react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { Text } from "@/components/ui/text";
import { useColorScheme } from "@/lib/useColorScheme";

interface TourCard {
	id: string;
	title: string;
	location: string;
	rating: string;
	dates: string;
	image: string;
	liked: boolean;
}

const mockTours: TourCard[] = [
	{
		id: "1",
		title: "Co-op hiking in Honolulu",
		location: "Hawaii, USA",
		rating: "4.8",
		dates: "23 aug. - 25 aug.",
		image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
		liked: false,
	},
	{
		id: "2", 
		title: "Mountain Adventure Trek",
		location: "Alps, Switzerland",
		rating: "4.9",
		dates: "15 sep. - 18 sep.",
		image: "https://images.unsplash.com/photo-1464822759844-d150baec3374?w=800&q=80",
		liked: true,
	},
];

export default function ToursScreen() {
	const { colorScheme } = useColorScheme();
	const [activeCategory, setActiveCategory] = useState("Hiking");
	const [tours, setTours] = useState(mockTours);

	const categories = ["Hiking", "Tours", "Impressions"];

	const toggleLike = (tourId: string) => {
		setTours(tours.map(tour => 
			tour.id === tourId ? { ...tour, liked: !tour.liked } : tour
		));
	};

	const renderStars = (rating: string) => {
		return (
			<View className="flex-row items-center gap-1">
				<View className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
					<Text className="text-white text-xs font-bold">★</Text>
				</View>
				<Text className="text-sm text-gray-500">{rating}</Text>
			</View>
		);
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			{/* Header with category tabs */}
			<View className="px-4 pt-6 pb-4">
				<View className="flex-row items-center justify-between mb-6">
					{categories.map((category) => (
						<TouchableOpacity
							key={category}
							onPress={() => setActiveCategory(category)}
							className="flex-1"
						>
							<Text 
								className={`text-xl font-bold text-center ${
									activeCategory === category 
										? "text-black" 
										: "text-gray-400"
								}`}
							>
								{category}
							</Text>
						</TouchableOpacity>
					))}
				</View>

				{/* Search bar */}
				<View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3 shadow-sm">
					<Search size={20} color="#666" className="mr-3" />
					<TextInput
						placeholder="Where are you going?"
						className="flex-1 text-base text-black"
						placeholderTextColor="#666"
					/>
				</View>
			</View>

			{/* Tours list */}
			<ScrollView 
				className="flex-1"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 100 }}
			>
				{tours.map((tour, index) => (
					<View key={tour.id} className="mx-4 mb-6">
						{/* Tour image */}
						<View className="relative rounded-2xl overflow-hidden h-56 mb-4">
							<ImageBackground
								source={{ uri: tour.image }}
								className="flex-1 justify-between"
								resizeMode="cover"
							>
								{/* Gradient overlay */}
								<View className="absolute inset-0 bg-black/20" />
								
								{/* Like button */}
								<TouchableOpacity 
									className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full items-center justify-center"
									onPress={() => toggleLike(tour.id)}
								>
									<Heart 
										size={20} 
										color={tour.liked ? "#FF6B6B" : "white"}
										fill={tour.liked ? "#FF6B6B" : "transparent"}
									/>
								</TouchableOpacity>

								{/* Pagination dots */}
								<View className="flex-row justify-center items-center pb-4">
									{[...Array(9)].map((_, i) => (
										<View
											key={i}
											className={`w-2 h-2 rounded-full mx-1 ${
												i === 3 ? "bg-blue-400 w-4" : "bg-white/60"
											}`}
										/>
									))}
								</View>
							</ImageBackground>
						</View>

						{/* Tour details */}
						<View className="flex-row justify-between items-start mb-2">
							<Text className="text-lg font-medium text-gray-900 flex-1">
								{tour.title}
							</Text>
							<View className="flex-row items-center ml-2">
								<Text className="text-sm text-gray-500 mr-2">7/15</Text>
								<View className="flex-row items-center">
									<View className="w-3 h-3 border border-gray-400 rounded-full mr-1" />
									<View className="w-2 h-2 bg-gray-400 rounded-full mr-1" />
									<View className="w-2 h-2 bg-gray-400 rounded-full mr-1" />
									<View className="w-3 h-3 border border-gray-400 rounded-full" />
								</View>
							</View>
						</View>

						<Text className="text-sm text-gray-500 mb-4">{tour.location}</Text>

						{/* Action buttons */}
						<View className="flex-row gap-3">
							{/* Date range button */}
							<View className="flex-1 border border-gray-300 rounded-2xl py-3 px-6">
								<Text className="text-center text-gray-500 font-medium">
									{tour.dates}
								</Text>
							</View>

							{/* Action button */}
							<TouchableOpacity className="w-16 h-12 border border-blue-300 rounded-2xl items-center justify-center">
								<ArrowUpRight size={20} color="#41C6FF" />
							</TouchableOpacity>
						</View>
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	);
}
