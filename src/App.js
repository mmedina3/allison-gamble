import { useState } from 'react';
import './App.css';

export default function AllisonGambleWebsite() {
  const [reels, setReels] = useState(['', '', '']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isJackpot, setIsJackpot] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '⭐', '💎'];

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setIsJackpot(false);
    setShowCelebration(false);

    let spinCount = 0;
    const spinInterval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
      spinCount++;

      if (spinCount > 15) {
        clearInterval(spinInterval);

        // Determine final result with better jackpot odds
        let finalReels;
        const jackpotChance = Math.random();

        if (jackpotChance < 0.25) { // 25% chance of jackpot!
          // Force a jackpot - all same symbol
          const jackpotSymbol = symbols[Math.floor(Math.random() * symbols.length)];
          finalReels = [jackpotSymbol, jackpotSymbol, jackpotSymbol];
          setIsJackpot(true);
          setShowCelebration(true);

          // Hide celebration after 4 seconds
          setTimeout(() => setShowCelebration(false), 4000);
        } else {
          // Regular spin result
          finalReels = [
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)]
          ];
        }

        setReels(finalReels);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="flex flex-col" style={{
      backgroundColor: '#F1EDDC',
      margin: '0 auto',
      position: 'relative',
      width: '100%',
      minHeight: '150vh' // Make page taller to enable scrolling
    }}>
      {/* Header */}
      <div className="w-full flex items-center px-8 py-4 mobile-header" style={{
        backgroundColor: '#DD8CF1',
        position: 'relative',
        zIndex: 10 // Lower z-index so slot machine can overlap
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontFamily: 'Arial Black, Arial, sans-serif',
          fontWeight: '900',
          color: '#F1EDDC',
          textShadow: `
            0.125rem 0.125rem 0 rgba(0, 0, 0, 0.3)
          `,
          letterSpacing: '0.0625rem',
          margin: '1rem',
          flex: 1
        }}>
          allison gamble
        </h1>

        {/* Simple Jackpot Button matching original design */}
        <div className="mobile-jackpot" style={{
          marginRight: '1rem',
          backgroundColor: 'transparent',
          border: '0.5rem solid #F69C40',
          borderRadius: '1.5rem',
          width: '7.7rem',
          height: '3.8rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          {/* Marquee lights following the exact rounded rectangle outline */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="marquee-light"
              style={{
                position: 'absolute',
                width: '0.5rem',
                height: '0.5rem',
                backgroundColor: '#FFE066',
                borderRadius: '50%',
                boxShadow: '0 0 0.75rem #FFE066, inset 0 0 0.25rem rgba(255, 255, 255, 0.8)',
                animation: `marqueePulse 1.5s ease-in-out infinite ${i * 0.075}s`,
                ...(() => {
                  const totalLights = 20;
                  const progress = i / totalLights;

                  // Fixed button dimensions to match the actual button size
                  const buttonWidth = 6.7; // 7.7rem - 1rem border
                  const buttonHeight = 2.8; // 3.8rem - 1rem border  
                  const cornerRadius = 1.2; // Adjusted for better curve matching


                  // Calculate perimeter segments
                  const straightWidth = buttonWidth - 2 * cornerRadius;
                  const straightHeight = buttonHeight - 2 * cornerRadius;
                  const cornerArc = (Math.PI / 2) * cornerRadius; // Quarter circle arc length

                  const totalPerimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;

                  // Calculate segment thresholds
                  const topStraight = straightWidth / totalPerimeter;
                  const topRightCorner = topStraight + (cornerArc / totalPerimeter);
                  const rightStraight = topRightCorner + (straightHeight / totalPerimeter);
                  const bottomRightCorner = rightStraight + (cornerArc / totalPerimeter);
                  const bottomStraight = bottomRightCorner + (straightWidth / totalPerimeter);
                  const bottomLeftCorner = bottomStraight + (cornerArc / totalPerimeter);
                  const leftStraight = bottomLeftCorner + (straightHeight / totalPerimeter);

                  let x, y;

                  if (progress < topStraight) {
                    // Top straight edge
                    const t = progress / topStraight;
                    x = (straightWidth / 2) * (t * 2 - 1);
                    y = -buttonHeight / 2;
                  } else if (progress < topRightCorner) {
                    // Top-right corner
                    const t = (progress - topStraight) / (topRightCorner - topStraight);
                    const angle = -Math.PI / 2 + (Math.PI / 2) * t;
                    x = (buttonWidth / 2 - cornerRadius) + cornerRadius * Math.cos(angle);
                    y = (-buttonHeight / 2 + cornerRadius) + cornerRadius * Math.sin(angle);
                  } else if (progress < rightStraight) {
                    // Right straight edge
                    const t = (progress - topRightCorner) / (rightStraight - topRightCorner);
                    x = buttonWidth / 2;
                    y = (-buttonHeight / 2 + cornerRadius) + (straightHeight * t);
                  } else if (progress < bottomRightCorner) {
                    // Bottom-right corner
                    const t = (progress - rightStraight) / (bottomRightCorner - rightStraight);
                    const angle = 0 + (Math.PI / 2) * t;
                    x = (buttonWidth / 2 - cornerRadius) + cornerRadius * Math.cos(angle);
                    y = (buttonHeight / 2 - cornerRadius) + cornerRadius * Math.sin(angle);
                  } else if (progress < bottomStraight) {
                    // Bottom straight edge
                    const t = (progress - bottomRightCorner) / (bottomStraight - bottomRightCorner);
                    x = (buttonWidth / 2 - cornerRadius) - (straightWidth * t);
                    y = buttonHeight / 2;
                  } else if (progress < bottomLeftCorner) {
                    // Bottom-left corner
                    const t = (progress - bottomStraight) / (bottomLeftCorner - bottomStraight);
                    const angle = Math.PI / 2 + (Math.PI / 2) * t;
                    x = (-buttonWidth / 2 + cornerRadius) + cornerRadius * Math.cos(angle);
                    y = (buttonHeight / 2 - cornerRadius) + cornerRadius * Math.sin(angle);
                  } else if (progress < leftStraight) {
                    // Left straight edge
                    const t = (progress - bottomLeftCorner) / (leftStraight - bottomLeftCorner);
                    x = -buttonWidth / 2;
                    y = (buttonHeight / 2 - cornerRadius) - (straightHeight * t);
                  } else {
                    // Top-left corner
                    const t = (progress - leftStraight) / (1 - leftStraight);
                    const angle = Math.PI + (Math.PI / 2) * t;
                    x = (-buttonWidth / 2 + cornerRadius) + cornerRadius * Math.cos(angle);
                    y = (-buttonHeight / 2 + cornerRadius) + cornerRadius * Math.sin(angle);
                  }

                  return {
                    left: `calc(50% + ${x}rem)`,
                    top: `calc(50% + ${y}rem)`,
                    transform: 'translate(-50%, -50%)'
                  };
                })()
              }}
            />
          ))}

          <div style={{
            backgroundColor: 'rgba(221, 140, 241, 0.1)',
            borderRadius: '1rem',
            padding: '0.75rem 1.5rem',
            position: 'relative',
            zIndex: 1
          }}>
            <span style={{
              color: '#F1EDDC',
              fontSize: '1.375rem',
              fontWeight: 'bold',
              fontFamily: 'Arial, sans-serif'
            }}>
              jackpot
            </span>
          </div>
        </div>
      </div>

      {/* Jackpot Celebration Overlay */}
      {showCelebration && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.5s ease-in'
        }}>
          <div style={{
            textAlign: 'center',
            color: '#FFE066',
            fontSize: '5rem',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif',
            textShadow: '0 0 1.25rem #FFE066, 0 0 2.5rem #FFE066, 0 0 3.75rem #FFE066',
            animation: 'jackpotPulse 1s ease-in-out infinite'
          }}>
            🎉 JACKPOT! 🎉
          </div>

          {/* Confetti effect */}
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '0.625rem',
                height: '0.625rem',
                backgroundColor: ['#FFE066', '#F69C40', '#EF453F', '#DD8CF1'][i % 4],
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `confetti 3s ease-out infinite ${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content - Slot machine overlapping header */}
      <div className="flex-1 flex items-center justify-center" style={{
        marginTop: '-8rem', // Much more overlap with header like original
        minHeight: '100vh',
        paddingBottom: '10vh',
        position: 'relative',
        zIndex: 20
      }}>
        <div className="slot-machine-container" style={{
          width: 'clamp(35rem, 80vw, 70rem)',
          height: 'clamp(40rem, 85vh, 60rem)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'scale(1.1)' // Reduce scale to match original proportions
        }}>
          {/* Slot Machine */}
          <div className="relative flex flex-col items-center" style={{ position: 'relative' }}>
            {/* Top Dome - Red semicircle overlapping header significantly */}
            <div style={{
              width: '17.5rem',
              height: '10rem',
              backgroundColor: '#EF453F',
              borderRadius: '8.75rem 8.75rem 0 0',
              marginBottom: '-0.5rem',
              zIndex: 25, // Higher z-index to ensure it overlaps header
              boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.15)',
              position: 'relative'
            }}></div>

            {/* Left outer red column - curved top, straight bottom */}
            <div style={{
              position: 'absolute',
              left: '0',
              top: '10.625rem',
              width: '1.875rem',
              height: '14.6875rem',
              backgroundColor: '#EF453F',
              borderRadius: '0.9375rem 0 0 0',
              zIndex: 5,
              boxShadow: '0 0.1875rem 0.375rem rgba(0, 0, 0, 0.15)'
            }}></div>

            {/* Right outer red column - curved top, straight bottom */}
            <div style={{
              position: 'absolute',
              right: '0',
              top: '10.625rem',
              width: '1.875rem',
              height: '14.6875rem',
              backgroundColor: '#EF453F',
              borderRadius: '0 0.9375rem 0 0',
              zIndex: 5,
              boxShadow: '0 0.1875rem 0.375rem rgba(0, 0, 0, 0.15)'
            }}></div>

            {/* Main Machine Structure - Orange frame with no bottom - compact */}
            <div style={{
              backgroundColor: '#F69C40',
              padding: '1rem 1.25rem 0 1.25rem',
              borderRadius: '0.5rem 0.5rem 0 0',
              position: 'relative',
              zIndex: 15,
              boxShadow: '0 0.375rem 0.75rem rgba(0, 0, 0, 0.2), inset 0 0.125rem 0.25rem rgba(255, 255, 255, 0.1)'
            }}>
              {/* Left orange pillar extending down */}
              <div style={{
                position: 'absolute',
                left: '0',
                top: '0',
                width: '1.25rem',
                height: '19.375rem',
                backgroundColor: '#F69C40',
                borderRadius: '0.5rem 0 0 0',
                zIndex: 16
              }}></div>

              {/* Right orange pillar extending down */}
              <div style={{
                position: 'absolute',
                right: '0',
                top: '0',
                width: '1.25rem',
                height: '19.375rem',
                backgroundColor: '#F69C40',
                borderRadius: '0 0.5rem 0 0',
                zIndex: 16
              }}></div>

              {/* Inner Red Machine Body - taller proportions */}
              <div style={{
                backgroundColor: '#EF453F',
                width: '18.75rem',
                height: '15rem',
                borderRadius: '0.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.25rem'
              }}>
                {/* Top row of orange dots */}
                <div className="flex justify-around" style={{ width: '100%' }}>
                  {[...Array(8)].map((_, i) => (
                    <div key={i} style={{
                      width: '0.875rem',
                      height: '0.875rem',
                      backgroundColor: '#F69C40',
                      borderRadius: '50%',
                      boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.2), inset 0 0.0625rem 0.125rem rgba(255, 255, 255, 0.2)'
                    }}></div>
                  ))}
                </div>

                {/* Three white reels - compact spacing */}
                <div className="flex" style={{ gap: '1.125rem' }}>
                  {reels.map((symbol, i) => (
                    <div key={i} style={{
                      width: '4.375rem',
                      height: '7.5rem',
                      backgroundColor: isJackpot ? '#FFE066' : '#F1EDDC',
                      border: `0.1875rem solid ${isJackpot ? '#F69C40' : '#EF453F'}`,
                      borderRadius: '0.1875rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.875rem',
                      boxShadow: isJackpot ? '0 0 1.25rem #FFE066, inset 0 0 1.25rem rgba(255, 224, 102, 0.3)' : 'none',
                      animation: isJackpot ? 'jackpotGlow 1s ease-in-out infinite' : 'none',
                      transform: isJackpot ? 'scale(1.05)' : 'scale(1)',
                      transition: 'all 0.3s ease'
                    }}>
                      {symbol}
                    </div>
                  ))}
                </div>

                {/* Bottom row of orange dots */}
                <div className="flex justify-around" style={{ width: '100%' }}>
                  {[...Array(8)].map((_, i) => (
                    <div key={i} style={{
                      width: '0.875rem',
                      height: '0.875rem',
                      backgroundColor: '#F69C40',
                      borderRadius: '50%',
                      boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.2), inset 0 0.0625rem 0.125rem rgba(255, 255, 255, 0.2)'
                    }}></div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4 Red rectangular steps with gaps - compact proportions */}
            <div className="flex flex-col items-center" style={{ marginTop: '0.5rem', gap: '0.375rem' }}>
              <div style={{
                width: '23.75rem',
                height: '1.25rem',
                backgroundColor: '#EF453F',
                borderRadius: '0.125rem',
                boxShadow: '0 0.1875rem 0.375rem rgba(0, 0, 0, 0.15)'
              }}></div>
              <div style={{
                width: '23.75rem',
                height: '1.25rem',
                backgroundColor: '#EF453F',
                borderRadius: '0.125rem',
                boxShadow: '0 0.1875rem 0.375rem rgba(0, 0, 0, 0.15)'
              }}></div>
              <div style={{
                width: '21.25rem',
                height: '1.75rem',
                backgroundColor: '#EF453F',
                borderRadius: '0.125rem',
                boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.2)'
              }}></div>
              <div style={{
                width: '22.5rem',
                height: '1.25rem',
                backgroundColor: '#EF453F',
                borderRadius: '0.125rem',
                boxShadow: '0 0.1875rem 0.375rem rgba(0, 0, 0, 0.15)'
              }}></div>
            </div>

            {/* Handle positioned close to the machine like in the reference image */}
            <div style={{
              position: 'absolute',
              right: '-4.9rem',
              top: '5rem',
              zIndex: 20
            }}>
              {/* Handle that tilts - positioned very close to machine */}
              <button
                onClick={spin}
                disabled={isSpinning}
                className="cursor-pointer hover:opacity-90 disabled:opacity-50"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  transform: isSpinning ? 'rotate(20deg)' : 'rotate(0deg)',
                  transformOrigin: 'center bottom',
                  transition: 'transform 0.3s ease-in-out',
                  background: 'none',
                  border: 'none',
                  padding: 0
                }}
              >
                {/* Orange Top (Teardrop Shape) */}
                <div style={{
                  width: '3.125rem',
                  height: '6.25rem',
                  backgroundColor: '#F39C33',
                  borderTopLeftRadius: '50% 80%',
                  borderTopRightRadius: '50% 80%',
                  borderBottomLeftRadius: '20% 40%',
                  borderBottomRightRadius: '20% 40%',
                  boxShadow: '0.25rem 0.25rem 0.5rem rgba(0,0,0,0.1)',
                  zIndex: 2
                }} />

                {/* Green handle cylinder */}
                <div style={{
                  width: '1.875rem',
                  height: '11.25rem',
                  backgroundColor: '#2f6d50',
                  boxShadow: '0.25rem 0.25rem 0.5rem rgba(0,0,0,0.1)',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    color: '#F1EDDC',
                    fontSize: '0.5625rem',
                    fontWeight: '600',
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                    letterSpacing: '0.075rem'
                  }}>
                    click to play
                  </span>
                </div>

                {/* Small vertical rectangle connector between machine and handle base */}
                <div style={{
                  position: 'absolute',
                  bottom: '-4rem',
                  left: '-1rem',
                  width: '0.75rem',
                  height: '4rem',
                  backgroundColor: '#EF453F',
                  borderRadius: '0.125rem',
                  zIndex: 1
                }}></div>

                {/* Angled red connector base matching reference image */}
                <div style={{
                  position: 'absolute',
                  bottom: '-4rem',
                  left: '.15rem',
                  width: '3rem',
                  height: '4rem',
                  backgroundColor: '#EF453F',
                  clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0% 100%)',
                  zIndex: 0
                }}></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Eggshell Footer Section - shows when scrolling down */}
      <div style={{
        backgroundColor: '#F1EDDC',
        minHeight: '50vh',
        width: '100%',
        position: 'relative',
        zIndex: 5
      }}>
      </div>
    </div>
  );
}