import React from 'react';

export default function Cookies() {
  return (
    <section className="legal-page-section">
      <div className="container">
        <div className="legal-content">
          <h1 className="legal-title">Zásady používania cookies služby SlohGPT</h1>
          
          <div className="legal-text">
            <p className="last-updated">Posledná aktualizácia: 6. októbra 2025</p>
            
            <div className="important-notice">
              <h3>⚠️ DÔLEŽITÉ UPOZORNENIE</h3>
              <p>
                <strong>SlohGPT je výhradne vzdelávací nástroj určený na zlepšenie písacích schopností študentov.</strong><br/>
                Cookies používame iba v rozsahu nevyhnutnom na správne fungovanie platformy, zlepšenie používateľskej skúsenosti a základnú analytiku.<br/>
                Nepoužívame žiadne cookies na sledovanie aktivít mimo našej domény ani na predaj údajov tretím stranám.
              </p>
            </div>
            
            <h2>1. Čo sú cookies</h2>
            <p>
              Cookies sú malé textové súbory, ktoré sa ukladajú do vášho prehliadača alebo zariadenia pri návšteve webovej stránky.<br/>
              Pomáhajú nám rozpoznať vaše zariadenie, zapamätať si nastavenia, udržať vás prihlásených a analyzovať používanie platformy, aby sme ju mohli zlepšovať.<br/>
              Cookies neobsahujú osobné údaje, pokiaľ ich sami neposkytnete (napr. pri registrácii).
            </p>
            
            <h2>2. Aké cookies používame</h2>
            
            <h3>🔹 Nevyhnutné cookies (session cookies)</h3>
            <ul>
              <li>zabezpečujú základné fungovanie webu a bezpečné prihlásenie,</li>
              <li>udržiavajú užívateľa prihláseného (max. 7 dní),</li>
              <li>obsahujú ochranné tokeny (CSRF, auth id),</li>
              <li><strong>nie je možné ich vypnúť</strong>, pretože sú nevyhnutné na funkčnosť.</li>
            </ul>
            <p>Príklad: <code>session_token</code>, <code>auth_user</code>, <code>csrf_sloh</code>.</p>
            
            <h3>🔹 Funkčné cookies</h3>
            <ul>
              <li>zapamätávajú si preferencie (jazyk, tému, posledný žáner slohu),</li>
              <li>platnosť maximálne 30 dní.</li>
            </ul>
            
            <h3>🔹 Analytické cookies</h3>
            <ul>
              <li>anonymne merajú používanie platformy (Google Analytics 4, Vercel Analytics),</li>
              <li>IP adresy sú anonymizované,</li>
              <li>používame ich na optimalizáciu UX a výkonu.</li>
            </ul>
            <p>Príklad: <code>_ga</code>, <code>_ga_SLOHGPTID</code>, <code>_vercel_analytics_session</code>.</p>
            
            <h3>🔹 Marketingové cookies (ak budú použité)</h3>
            <ul>
              <li>aktivujú sa len po udelení súhlasu, napr. Meta Pixel alebo Google Ads Remarketing,</li>
              <li>možno ich kedykoľvek vypnúť v nastaveniach cookies.</li>
            </ul>
            
            <h2>3. Ako spravovať alebo vypnúť cookies</h2>
            <p>
              Používateľ môže:
            </p>
            <ul>
              <li>odmietnuť nepovinné cookies v cookie lište,</li>
              <li>zmeniť súhlas v sekcii „Nastavenia cookies" v pätičke stránky,</li>
              <li>alebo ich vymazať v prehliadači.</li>
            </ul>
            <p>
              Zablokovanie nevyhnutných cookies môže spôsobiť nesprávne fungovanie funkcií (prihlásenie, uložené práce, XP systém).
            </p>
            
            <h2>4. Cookies tretích strán</h2>
            <p>
              Na našej stránke sa môžu nachádzať cookies z týchto služieb:
            </p>
            <ul>
              <li><strong>Google Analytics / Google Tag Manager</strong> – štatistika návštevnosti</li>
              <li><strong>Vercel / Supabase</strong> – technické cookies pre hosting a databázu</li>
              <li><strong>Ecomail, Meta, Google Ads</strong> – len po súhlase používateľa</li>
            </ul>
            <p>
              Tieto služby majú vlastné zásady ochrany súkromia dostupné na ich webových stránkach.
            </p>
            
            <h2>5. Ako dlho cookies uchovávame</h2>
            <div className="cookies-table">
              <table>
                <thead>
                  <tr>
                    <th>Typ cookie</th>
                    <th>Príklad</th>
                    <th>Doba uchovávania</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Nevyhnutné (session)</td>
                    <td><code>session_token</code></td>
                    <td>do 7 dní alebo do odhlásenia</td>
                  </tr>
                  <tr>
                    <td>Funkčné</td>
                    <td><code>theme_mode</code>, <code>essay_genre</code></td>
                    <td>do 30 dní</td>
                  </tr>
                  <tr>
                    <td>Analytické</td>
                    <td><code>_ga</code>, <code>_vercel_analytics_session</code></td>
                    <td>do 26 mesiacov</td>
                  </tr>
                  <tr>
                    <td>Marketingové</td>
                    <td><code>fbp</code>, <code>gclid</code></td>
                    <td>do 90 dní (iba so súhlasom)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Po uplynutí týchto období sú cookies automaticky vymazané alebo obnovené pri ďalšej návšteve.
            </p>
            
            <h2>6. Právny základ</h2>
            <ul>
              <li><strong>Nevyhnutné cookies</strong> → oprávnený záujem (čl. 6 ods. 1 písm. f GDPR)</li>
              <li><strong>Funkčné, analytické, marketingové cookies</strong> → súhlas (čl. 6 ods. 1 písm. a GDPR) – možno kedykoľvek odvolať.</li>
            </ul>
            
            <h2>7. Zmeny zásad cookies</h2>
            <p>
              Zásady môžeme aktualizovať pri zavádzaní nových nástrojov alebo funkcií.<br/>
              Aktuálna verzia je vždy zverejnená na <a href="/cookies">www.slohgpt.sk/cookies</a>.
            </p>
            
            <h2>8. Kontakt</h2>
            <p>
              Pre otázky, sťažnosti alebo žiadosť o vymazanie cookies nás kontaktujte na:<br/>
              📧 <a href="mailto:slohgpt@gmail.com">slohgpt@gmail.com</a><br/>
              Podpora je dostupná v pracovných dňoch od <strong>9:00 do 17:00</strong>.
            </p>
            
            <div className="legal-footer">
              <p>
                Tieto Zásady cookies sú účinné od 6. októbra 2025.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}