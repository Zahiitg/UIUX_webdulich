import { create } from 'zustand';

const useTravelStore = create((set, get) => ({
  // ===== Theme =====
  theme: localStorage.getItem('theme') || 'light',
  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set({ theme });
  },
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    get().setTheme(newTheme);
  },

  // ===== Wishlist (Tours) =====
  wishlist: JSON.parse(localStorage.getItem('travel_wishlist')) || [],
  toggleWishlist: (tourId) => set((state) => {
    const exists = state.wishlist.includes(tourId);
    const newWishlist = exists
      ? state.wishlist.filter(id => id !== tourId)
      : [...state.wishlist, tourId];
    
    // Lưu vào local storage để không bị mất khi F5
    localStorage.setItem('travel_wishlist', JSON.stringify(newWishlist));
    
    return { wishlist: newWishlist };
  }),

  // ===== User Preferences (Màn 2) =====
  selectedPreferences: [],
  togglePreference: (prefId) => set((state) => {
    const exists = state.selectedPreferences.includes(prefId);
    return {
      selectedPreferences: exists
        ? state.selectedPreferences.filter(id => id !== prefId)
        : [...state.selectedPreferences, prefId]
    };
  }),

  // ===== Trip Info (Màn 3) =====
  tripInfo: {
    destination: 'Gia Lai',
    startDate: '',
    endDate: '',
    numPeople: 2,
    budget: 5000000,
    budgetLabel: '5 triệu',
  },
  setTripInfo: (info) => set((state) => ({
    tripInfo: { ...state.tripInfo, ...info }
  })),

  // ===== AI Generated Itinerary (Màn 4) =====
  itinerary: null,
  itineraryLoading: false,
  matchPercentage: 0,
  totalCost: 0,
  setItinerary: (itinerary) => set({ itinerary }),
  setItineraryLoading: (loading) => set({ itineraryLoading: loading }),
  setMatchPercentage: (pct) => set({ matchPercentage: pct }),
  setTotalCost: (cost) => set({ totalCost: cost }),

  // ===== Chat Messages (Màn 5) =====
  chatMessages: [],
  chatLoading: false,
  addChatMessage: (message) => set((state) => ({
    chatMessages: [...state.chatMessages, message]
  })),
  setChatMessages: (messages) => set({ chatMessages: messages }),
  setChatLoading: (loading) => set({ chatLoading: loading }),

  // ===== Navigation & UI =====
  currentStep: 0,
  setCurrentStep: (step) => set({ currentStep: step }),

  // ===== Reset =====
  resetAll: () => set({
    selectedPreferences: [],
    tripInfo: {
      destination: 'Gia Lai',
      startDate: '',
      endDate: '',
      numPeople: 2,
      budget: 5000000,
      budgetLabel: '5 triệu',
    },
    itinerary: null,
    itineraryLoading: false,
    matchPercentage: 0,
    totalCost: 0,
    chatMessages: [],
    chatLoading: false,
    currentStep: 0,
  }),
}));

export default useTravelStore;
