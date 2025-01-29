import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Trophy } from "lucide-react"

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black text-purple-500 font-karmatic">
        <nav className="bg-black p-4 flex justify-between items-center border-b border-purple-700">
          <h1 className="text-4xl font-bold neon-text">XARCADE</h1>
          <Link to="/leaderboard" className="hover:text-purple-400 transition-colors">
            <Trophy size={24} className="neon-text" />
          </Link>
        </nav>

        <main className="container mx-auto p-8">
          <Routes>
            <Route path="/" element={<GameGrid />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/game/:gameId" element={<GamePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

const GameGrid = () => {
  const games = [
    { id: "game1", title: "Game 1", gif: "/game1.gif" },
    { id: "game2", title: "Game 2", gif: "/game2.gif" },
  ]

  return (
    <div>
      <h2 className="text-2xl mb-8 text-center neon-text">Click on a game to start!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {games.map((game) => (
          <Link
            key={game.id}
            to={`/game/${game.id}`}
            className="block bg-gray-900 rounded-lg overflow-hidden game-card"
          >
            <div className="p-4 border-b border-purple-700">
              <h3 className="text-xl neon-text">{game.title}</h3>
            </div>
            <div className="aspect-video bg-purple-900">
              <img src={game.gif || "/placeholder.svg"} alt={game.title} className="w-full h-full object-cover" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const Leaderboard = () => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg neon-border">
      <h2 className="text-2xl mb-6 neon-text">Leaderboard</h2>
      <div className="space-y-4">
        {/* Leaderboard content will go here */}
        <p className="text-purple-400">Leaderboard coming soon...</p>
      </div>
    </div>
  )
}

const GamePage = () => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg neon-border">
      <h2 className="text-2xl mb-6 neon-text">Game</h2>
      <div className="aspect-video bg-purple-900">{/* Game canvas will be mounted here */}</div>
    </div>
  )
}

export default App

