import GeneratorCard from '@/components/GeneratorCard'

export const metadata = {
  title: 'Rýchly sloh - SlohGPT | Napíš sloh za 5 minút pomocou AI',
  description: 'Rýchly sloh pomocou AI. Zadaj typ slohu a tému, získaj štruktúru a celý sloh za pár minút. Ideálne pre stredoškolských študentov.',
  keywords: 'rýchly sloh, AI sloh, písanie slohov, stredná škola, slovenský jazyk, domáce úlohy',
}

export default function SlohyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">
            <span className="highlight">Rýchly sloh</span> pomocou AI
          </h1>
          <p className="hero-subtitle">
            Zadajte typ slohu a tému, získajte štruktúru a celý sloh za pár minút. 
            Ideálne pre stredoškolských študentov.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="main-container">
        <div className="quick-essay-container">
          <GeneratorCard />
        </div>
      </div>

    </>
  )
}
