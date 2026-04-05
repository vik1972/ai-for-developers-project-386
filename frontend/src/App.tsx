import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EventTypesPage from './pages/EventTypesPage'
import BookingPage from './pages/BookingPage'
import DashboardPage from './pages/DashboardPage'
import GuestPage from './pages/GuestPage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
          <Routes>
            <Route path="/" element={<GuestPage />} />
            <Route path="/events" element={<EventTypesPage />} />
            <Route path="/booking/:eventId" element={<BookingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App