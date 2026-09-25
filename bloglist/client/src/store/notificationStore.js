import { create } from 'zustand'

const useNotificationStore = create((set) => ({
  message: '',
  setMessage: (message) => set({ message }),
  clearMessage: () => set({ message: '' }),
}))

export default useNotificationStore
