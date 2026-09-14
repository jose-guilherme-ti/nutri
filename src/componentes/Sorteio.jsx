import React , { useState } from 'react'
import './Sorteio.css'

export default function Sorteio() {
  const [url, setUrl] = useState('')
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [winner, setWinner] = useState(null)
  const [spinning, setSpinning] = useState(false)

  const handleScrape = async (e) => {
    e.preventDefault()
    
    if (!url.trim()) {
      setError('Cole a URL do post do Instagram')
      return
    }

    setLoading(true)
    setError('')
    setParticipants([])
    setWinner(null)

    try {
        const API_URL = window.location.hostname === 'localhost' 
        ? 'http://localhost:3001' 
        : `http://nutri-back-two.vercel.app`;
      const response = await fetch(`${API_URL}/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Erro ao buscar comentários')
      }

      setParticipants(data.participants || [])
    } catch (err) {
      setError(err.message || 'Erro de conexão com o servidor')
    } finally {
      setLoading(false)
    }
  }

  const handleRaffle = () => {
    if (participants.length === 0) return

    setSpinning(true)
    setWinner(null)

    // Animação de sorteio
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * participants.length)
      setWinner(participants[randomIndex])
      setSpinning(false)
    }, 2200)
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Sorteio Instagram</h1>
        <p>Cole o link do post e sorteie entre os comentários</p>
      </div>

      {/* Formulário */}
      <div className="card">
        <form onSubmit={handleScrape}>
          <div className="form-group">
            <input
              type="text"
              placeholder="https://www.instagram.com/p/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
            />
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </form>

        {error && <p className="error">{error}</p>}
        {loading && <p className="loading">Carregando comentários... isso pode levar alguns segundos</p>}
      </div>

      {/* Lista de participantes */}
      {participants.length > 0 && (
        <div className="card">
          <div className="stats">
            <h2>Participantes</h2>
            <span>{participants.length} únicos</span>
          </div>

          <div className="participants-grid">
            {participants.map((p) => (
              <div key={p.username} className="participant-card">
                {p.profilePic ? (
                  <img 
                    src={p.profilePic} 
                    alt={p.username} 
                    className="avatar"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                ) : null}
                
                <div 
                  className="avatar-placeholder" 
                  style={{ display: p.profilePic ? 'none' : 'flex' }}
                >
                  {p.username.charAt(0).toUpperCase()}
                </div>

                <span className="username">@{p.username}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Área do sorteio */}
      {participants.length > 0 && (
        <div className="card">
          <button 
            className="btn btn-success"
            onClick={handleRaffle}
            disabled={spinning}
          >
            {spinning ? 'Sorteando...' : 'Sortear Vencedor'}
          </button>

          {spinning && (
            <div className="winner-box spinning">
              <p>Escolhendo o vencedor...</p>
            </div>
          )}

          {winner && !spinning && (
            <div className="winner-box">
              <h2>🎉 Temos um vencedor!</h2>
              
              {winner.profilePic ? (
                <img 
                  src={winner.profilePic} 
                  alt={winner.username} 
                  className="winner-avatar"
                />
              ) : (
                <div className="avatar-placeholder" style={{ width: 100, height: 100, fontSize: 40, margin: '0 auto 16px' }}>
                  {winner.username.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="winner-username">@{winner.username}</div>
              {winner.fullName && (
                <div className="winner-fullname">{winner.fullName}</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Estado vazio */}
      {!loading && participants.length === 0 && !error && (
        <div className="card empty">
          <p>Cole a URL de um post do Instagram para começar</p>
        </div>
      )}
    </div>
  )
}