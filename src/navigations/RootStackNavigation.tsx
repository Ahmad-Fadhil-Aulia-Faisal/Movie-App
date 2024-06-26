// RootStackNavigation.tsx
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Contoh definisi tipe untuk rute-rute Anda
export type RootStackParamList = {
  Home: undefined;
  MovieDetail: { movieId: string }; // Contoh dengan parameter movieId
  Search: undefined;
  // Tambahkan rute-rute lain sesuai kebutuhan aplikasi Anda
};

export type RootStackNavigationProp<T extends keyof RootStackParamList> = NativeStackNavigationProp<RootStackParamList, T>;
