'use client';

import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [iniciou, setIniciou] = useState(false);
  const [fotoAtual, setFotoAtual] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [animando, setAnimando] = useState(false);
  const audioRef = useRef(null);

  const fotos = [
    { url: '/fotos/foto01.jpg.JPG', legenda: 'Esse carrossel é só uma partícula minúscula de todos nossos momentos, mas foi o jeito que encontrei de presenteá-la.' },
    { url: '/fotos/foto02.jpg.JPG', legenda: 'A senhora está presente em minha vida desde antes de eu vir ao mundo.' },
    { url: '/fotos/foto03.jpg.JPG', legenda: 'Tenho a certeza que não conseguirei ser nem um terço do que és...' },
    { url: '/fotos/foto04.jpg.JPG', legenda: 'Mas vale a tentativa.' },
    { url: '/fotos/foto05.jpg.JPG', legenda: 'Poder celebrar seus 60 anos é uma benção...' },
    { url: '/fotos/foto06.jpg.JPG', legenda: 'Ter a senhora em minha vida é um privilégio.' },
    { url: '/fotos/foto07.jpg.JPG', legenda: 'Sei que a gente "Não precisa tá colado pra tá junto", mas pra gente não se aplica essa regra.' },
    { url: '/fotos/foto08.jpg.JPG', legenda: 'Não há ninguém  em minha vida que não saiba da sua existência, pois eu falo de maneira orgulhosa sobre a melhor pessoa que Deus poderia ter posto em minha vida, agradeço a Ele sua presença nela.' },
    { url: '/fotos/foto09.jpg.JPG', legenda: 'Eu te amo, Dinha, ou melhor, como canta o Luan: "Te Vivo".' },
  ];

  // Ativa o app e inicia o áudio
  const ligarAplicativo = () => {
    setIniciou(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Erro ao tocar áudio:", err));
    }
  };

  // Alterna Play/Pause manual da música
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log(err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Atualiza a barra de progresso do player
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e) => {
    const novoTempo = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = novoTempo;
      setCurrentTime(novoTempo);
    }
  };

  // Formata os segundos do player em formato MM:SS
  const formatarTempo = (tempo) => {
    if (isNaN(tempo)) return '0:00';
    const minutos = Math.floor(tempo / 60);
    const segundos = Math.floor(tempo % 60);
    return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
  };

  // Carrossel automático controlado por efeito
  useEffect(() => {
    if (iniciou && isPlaying) {
      const temporizador = setInterval(() => {
        setAnimando(true);
        setTimeout(() => {
          setFotoAtual((prev) => (prev + 1) % fotos.length);
          setAnimando(false);
        }, 500);
      }, 6000); // 6 segundos em cada foto para uma transição suave de cinema
      return () => clearInterval(temporizador);
    }
  }, [iniciou, isPlaying, fotos.length]);

  const irParaFoto = (index) => {
    if (animando || index === fotoAtual) return;
    setAnimando(true);
    setTimeout(() => {
      setFotoAtual(index);
      setAnimando(false);
    }, 400);
  };

  return (
    <div style={{
      backgroundImage: 'radial-gradient(circle at center, #FFFEEA 0%, #FAED9C 70%, #E6C645 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      padding: '20px',
      color: '#3A3212',
      overflowX: 'hidden'
    }}>
      
      {/* Elemento Oculto do Áudio com Eventos Avançados */}
      <audio 
        ref={audioRef} 
        src="/audio/musica1.mp3" 
        loop 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* ELEMENTO AMBIENTAL DE FUNDO (Esferas Douradas Desfocadas que dão o tom Premium) */}
      <div className="esfera-decorativa" style={{ top: '10%', left: '15%', width: '300px', height: '300px', backgroundColor: '#F9D74C' }}></div>
      <div className="esfera-decorativa" style={{ bottom: '10%', right: '10%', width: '400px', height: '400px', backgroundColor: '#F3C11B' }}></div>

      {!iniciou ? (
        /* TELA DE ENTRADA GLASSMORPHISM */
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '50px 30px',
          borderRadius: '32px',
          boxShadow: '0 20px 50px rgba(181, 147, 23, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          maxWidth: '440px',
          width: '100%',
          zIndex: 10,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🌟</div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: '800', letterSpacing: '-1px', color: '#4B3E0E', marginBottom: '15px' }}>
            Maria Zenilda
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#685614', lineHeight: '1.6', marginBottom: '35px', fontWeight: '500' }}>
            Minha tentativa de criar um algo para expressar o quanto tua presença é importante em minha vida.
          </p>
          <button 
            onClick={ligarAplicativo}
            className="botao-premium"
            style={{
              backgroundColor: '#4B3E0E',
              color: '#FFF',
              border: 'none',
              padding: '16px 45px',
              fontSize: '1.1rem',
              fontWeight: '700',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(75, 62, 14, 0.3)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            Iniciar Experiência
          </button>
        </div>
      ) : (
        /* PLAYER PREMIUM + CARROSSEL INTEGRADO */
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          borderRadius: '32px',
          padding: '24px',
          boxShadow: '0 30px 60px rgba(117, 94, 9, 0.18)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          maxWidth: '520px',
          width: '100%',
          zIndex: 10
        }}>
          
          {/* HEADER DO APP */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '0 8px' }}>
            <div>
              <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: '700', color: '#88742A', letterSpacing: '2px' }}>MEMÓRIAS DE OURO</p>
              <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: '800', color: '#3A3212' }}>Especial 60 Anos</h2>
            </div>
            <div style={{ backgroundColor: 'rgba(75, 62, 14, 0.1)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700', color: '#4B3E0E' }}>
              {fotoAtual + 1} / {fotos.length}
            </div>
          </div>

          {/* EXIBIÇÃO DA IMAGEM PRINCIPAL */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '380px',
            backgroundColor: 'rgba(0,0,0,0.03)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 15px 35px rgba(0,0,0,0.06)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid rgba(255,255,255,0.4)'
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={fotos[fotoAtual].url} 
              alt="Momento Inesquecível"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: animando ? 0 : 1,
                transform: animando ? 'scale(0.95) rotate(-1deg)' : 'scale(1) rotate(0deg)',
                filter: animando ? 'blur(5px)' : 'blur(0px)'
              }}
            />
          </div>

          {/* ÁREA DA LEGENDA EM CARD REBAIXADO */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            borderRadius: '18px',
            padding: '16px 20px',
            marginTop: '16px',
            minHeight: '70px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            transition: 'opacity 0.3s',
            opacity: animando ? 0 : 1
          }}>
            <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', textAlign: 'center', lineHeight: '1.5', color: '#4A3F16' }}>
              {fotos[fotoAtual].legenda}
            </p>
          </div>

          {/* SELETOR DE FAIXAS / FOTOS EM MINI DOTS NA TELA (Navegação direta por bolinhas) */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', margin: '20px 0 10px 0' }}>
            {fotos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => irParaFoto(idx)}
                style={{
                  width: idx === fotoAtual ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '8px',
                  backgroundColor: idx === fotoAtual ? '#4B3E0E' : 'rgba(75, 62, 14, 0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  padding: 0
                }}
              />
            ))}
          </div>

          {/* CONTROLLER DO PLAYER PREMIUM (Estilo Painel de Áudio Avançado) */}
          <div style={{
            backgroundColor: 'rgba(75, 62, 14, 0.06)',
            borderRadius: '20px',
            padding: '16px',
            marginTop: '15px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            {/* Barra de Progresso Real da Música */}
            <input 
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleProgressChange}
              style={{
                width: '100%',
                accentColor: '#4B3E0E',
                cursor: 'pointer',
                margin: '0 0 8px 0',
                display: 'block'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '700', color: '#685614', marginBottom: '12px' }}>
              <span>{formatarTempo(currentTime)}</span>
              <span>{formatarTempo(duration)}</span>
            </div>

            {/* Botões de Mídia do Player */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '25px' }}>
              <button 
                onClick={() => irParaFoto((fotoAtual - 1 + fotos.length) % fotos.length)}
                className="btn-media"
                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#4B3E0E' }}
              >
                ⏮️
              </button>
              
              <button 
                onClick={togglePlay}
                style={{
                  backgroundColor: '#4B3E0E',
                  color: '#FFF',
                  border: 'none',
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  fontSize: '1.3rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 6px 15px rgba(75, 62, 14, 0.3)',
                  transition: 'transform 0.2s'
                }}
                className="btn-play-pause"
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>

              <button 
                onClick={() => irParaFoto((fotoAtual + 1) % fotos.length)}
                className="btn-media"
                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#4B3E0E' }}
              >
                ⏭️
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Injeção de Estilos Avançados Globais */}
      <style jsx global>{`
        .esfera-decorativa {
          position: absolute;
          borderRadius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          zIndex: 1;
          pointerEvents: none;
          animation: flutuarSuave 8s ease-in-out infinite alternate;
        }
        @keyframes flutuarSuave {
          0% { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-30px) scale(1.05); }
        }
        .botao-premium:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(75, 62, 14, 0.45) !important;
          background-color: #5F4F14 !important;
        }
        .btn-play-pause:hover {
          transform: scale(1.08);
        }
        .btn-media:hover {
          opacity: 0.7;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}