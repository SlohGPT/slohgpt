import React from 'react';

export default function OchranaSukromia() {
  return (
    <section className="legal-page-section">
      <div className="container">
        <div className="legal-content">
          <h1 className="legal-title">Zásady ochrany súkromia služby SlohGPT</h1>
          
          <div className="legal-text">
            <p className="last-updated">Posledná aktualizácia: 6. októbra 2025</p>
            
            <div className="important-notice">
              <h3>⚠️ DÔLEŽITÉ UPOZORNENIE</h3>
              <p>
                <strong>SlohGPT je výhradne vzdelávací nástroj určený na zlepšenie písacích schopností študentov.</strong><br/>
                Služba nie je určená na podvádzanie, plagiátorstvo ani obchádzanie školských pravidiel.<br/>
                Vaše súkromie je pre nás mimoriadne dôležité. Tieto zásady vysvetľujú, ako zhromažďujeme, používame, uchovávame a chránime osobné údaje používateľov v súlade s nariadením GDPR (EÚ) 2016/679 a platnými zákonmi Slovenskej republiky.
              </p>
            </div>
            
            <h2>1. Kto spracúva vaše údaje</h2>
            <p>
              <strong>Prevádzkovateľ (správca údajov):</strong><br/>
              <strong>SlohGPT – tvorca projektu</strong><br/>
              📧 <a href="mailto:slohgpt@gmail.com">slohgpt@gmail.com</a><br/><br/>
              Prevádzkovateľom je fyzická osoba – tvorca projektu SlohGPT.<br/><br/>
              Ak máte otázky o spracúvaní údajov, kontaktujte nás e-mailom.
            </p>
            
            <h2>2. Aké údaje zhromažďujeme</h2>
            
            <h3>🔹 2.1 Údaje, ktoré nám poskytujete priamo</h3>
            <ul>
              <li>meno, priezvisko (ak ich uvediete pri registrácii),</li>
              <li>e-mailová adresa (povinná pre vytvorenie účtu),</li>
              <li>prihlasovacie údaje (heslo – bezpečne šifrované),</li>
              <li>údaje o zakúpených kreditoch/predplatnom (história platieb bez citlivých údajov o karte),</li>
              <li>komunikácia s podporou (e-maily, spätná väzba, dotazy).</li>
            </ul>
            
            <h3>🔹 2.2 Údaje, ktoré sa zhromažďujú automaticky</h3>
            <ul>
              <li>IP adresa a približná lokalita (na ochranu účtu a detekciu podvodov),</li>
              <li>typ zariadenia, verzia prehliadača, operačný systém,</li>
              <li>technické logy (dátum a čas prihlásenia, chybové hlásenia),</li>
              <li>anonymné analytické dáta o používaní (napr. počet napísaných slohov, návštevy stránky).</li>
            </ul>
            
            <h3>🔹 2.3 Údaje z cookies a podobných technológií</h3>
            <p>
              Používame cookies na udržanie prihlásenia, nastavenie jazyka a meranie návštevnosti.<br/>
              Podrobnosti nájdete v dokumente <a href="/cookies">Zásady používania cookies</a>.
            </p>
            
            <h2>3. Účely a právny základ spracovania</h2>
            <div className="privacy-table">
              <table>
                <thead>
                  <tr>
                    <th>Účel spracovania</th>
                    <th>Právny základ podľa GDPR</th>
                    <th>Príklady údajov</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Poskytovanie a správa účtu</td>
                    <td>plnenie zmluvy (čl. 6 ods. 1 písm. b)</td>
                    <td>e-mail, heslo, meno</td>
                  </tr>
                  <tr>
                    <td>Fakturácia, platby, účtovníctvo</td>
                    <td>zákonná povinnosť (čl. 6 ods. 1 písm. c)</td>
                    <td>transakčné údaje</td>
                  </tr>
                  <tr>
                    <td>Zlepšovanie a optimalizácia služby</td>
                    <td>oprávnený záujem (čl. 6 ods. 1 písm. f)</td>
                    <td>analytické a technické údaje</td>
                  </tr>
                  <tr>
                    <td>Komunikácia so zákazníkom</td>
                    <td>oprávnený záujem / plnenie zmluvy</td>
                    <td>e-mail, správy</td>
                  </tr>
                  <tr>
                    <td>Marketing a novinky (len so súhlasom)</td>
                    <td>súhlas (čl. 6 ods. 1 písm. a)</td>
                    <td>e-mail, preferencie</td>
                  </tr>
                  <tr>
                    <td>Bezpečnosť, prevencia podvodov</td>
                    <td>oprávnený záujem</td>
                    <td>IP, logy</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h2>4. Ako údaje používame</h2>
            <ul>
              <li>na overenie a správu účtu,</li>
              <li>na spracovanie platieb a predplatného,</li>
              <li>na zasielanie dôležitých oznámení (napr. zmeny v podmienkach),</li>
              <li>na anonymné analytické hodnotenia a zlepšovanie funkcií,</li>
              <li>na zabezpečenie a ochranu pred zneužitím účtu.</li>
            </ul>
            <p>
              <strong>Údaje nepredávame žiadnym tretím stranám.</strong>
            </p>
            
            <h2>5. Zdieľanie údajov s tretími stranami</h2>
            <p>
              Údaje zdieľame len s dôveryhodnými partnermi, ktorí pomáhajú prevádzkovať SlohGPT, pričom všetci spĺňajú GDPR a uzavreli zmluvy o spracúvaní údajov (DPA):
            </p>
            <div className="privacy-table">
              <table>
                <thead>
                  <tr>
                    <th>Partner / Služba</th>
                    <th>Účel</th>
                    <th>Sídlo / GDPR zabezpečenie</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Supabase (PostgreSQL DB)</strong></td>
                    <td>uchovávanie používateľských účtov, dát, XP, esejí</td>
                    <td>EÚ / štandardné zmluvné doložky</td>
                  </tr>
                  <tr>
                    <td><strong>Vercel</strong></td>
                    <td>hosting a technická infraštruktúra</td>
                    <td>EÚ / USA (SCC)</td>
                  </tr>
                  <tr>
                    <td><strong>Google Analytics 4</strong></td>
                    <td>anonymná analytika a výkon webu</td>
                    <td>EÚ / USA (SCC, IP anonymizácia)</td>
                  </tr>
                  <tr>
                    <td><strong>Ecomail</strong></td>
                    <td>e-mailové kampane a notifikácie</td>
                    <td>EÚ</td>
                  </tr>
                  <tr>
                    <td><strong>Platobná brána (napr. Stripe / Global Payments)</strong></td>
                    <td>spracovanie platieb</td>
                    <td>EÚ / USA (SCC)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Tieto subjekty spracúvajú údaje <strong>len podľa našich pokynov</strong> a v nevyhnutnom rozsahu.
            </p>
            
            <h2>6. Ako dlho údaje uchovávame</h2>
            <div className="privacy-table">
              <table>
                <thead>
                  <tr>
                    <th>Typ údajov</th>
                    <th>Doba uchovávania</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Údaje účtu (meno, e-mail)</td>
                    <td>počas aktívneho účtu + 6 mesiacov po zrušení</td>
                  </tr>
                  <tr>
                    <td>Fakturačné údaje</td>
                    <td>10 rokov (účtovná povinnosť)</td>
                  </tr>
                  <tr>
                    <td>Analytické a logovacie dáta</td>
                    <td>do 26 mesiacov</td>
                  </tr>
                  <tr>
                    <td>Komunikácia a podpora</td>
                    <td>do 24 mesiacov od vyriešenia prípadu</td>
                  </tr>
                  <tr>
                    <td>Cookies</td>
                    <td>podľa typu – pozri <a href="/cookies">Zásady cookies</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Po uplynutí lehoty sú údaje <strong>bezpečne anonymizované alebo vymazané</strong>.
            </p>
            
            <h2>7. Bezpečnosť údajov</h2>
            <p>
              Vaše údaje chránime pomocou:
            </p>
            <ul>
              <li>šifrovania (HTTPS, TLS 1.3),</li>
              <li>hashovania hesiel (bcrypt/argon2),</li>
              <li>obmedzeného prístupu len pre oprávnené osoby,</li>
              <li>pravidelnej kontroly bezpečnosti.</li>
            </ul>
            <p>
              V prípade porušenia ochrany údajov budeme postupovať podľa GDPR (oznámenie do 72 hodín dozornému orgánu a dotknutým osobám, ak je to potrebné).
            </p>
            
            <h2>8. Vaše práva ako používateľa (dotknutej osoby)</h2>
            <p>
              Máte právo:
            </p>
            <ol>
              <li><strong>získať prístup</strong> k svojim osobným údajom (čl. 15 GDPR),</li>
              <li>požadovať ich <strong>opravu alebo doplnenie</strong> (čl. 16),</li>
              <li>požadovať <strong>vymazanie</strong> („právo byť zabudnutý") (čl. 17),</li>
              <li>požadovať <strong>obmedzenie spracovania</strong> (čl. 18),</li>
              <li>získať <strong>prenesenie údajov</strong> k inému prevádzkovateľovi (čl. 20),</li>
              <li><strong>namietať</strong> proti spracovaniu založenému na oprávnenom záujme (čl. 21),</li>
              <li><strong>odvolať svoj súhlas</strong> kedykoľvek, ak je spracovanie založené na súhlase,</li>
              <li>podať sťažnosť na dozorný orgán (<a href="https://www.dataprotection.gov.sk" target="_blank" rel="noopener noreferrer">Úrad na ochranu osobných údajov SR</a>).</li>
            </ol>
            <p>
              Svoje práva môžete uplatniť písomne alebo e-mailom na <a href="mailto:slohgpt@gmail.com">slohgpt@gmail.com</a>.
            </p>
            
            <h2>9. Prenos údajov mimo EÚ</h2>
            <p>
              V prípade, že partner (napr. Google, Vercel, Stripe) sídli mimo EÚ, zabezpečujeme prenos údajov pomocou <strong>štandardných zmluvných doložiek (Standard Contractual Clauses – SCC)</strong> schválených Európskou komisiou, čím je zabezpečená primeraná úroveň ochrany.
            </p>
            
            <h2>10. Automatizované rozhodovanie a profilovanie</h2>
            <p>
              SlohGPT <strong>nevykonáva profilovanie ani automatizované rozhodovanie</strong> s právnymi účinkami pre používateľa.<br/>
              Analytika sa používa výlučne anonymne pre zlepšenie UX a výkonu platformy.
            </p>
            
            <h2>11. Maloletí používatelia</h2>
            <p>
              Používanie SlohGPT je určené pre osoby <strong>staršie ako 16 rokov</strong>.<br/>
              Mladšie osoby môžu službu používať <strong>len so súhlasom rodiča alebo zákonného zástupcu</strong>.
            </p>
            
            <h2>12. Zmeny zásad ochrany súkromia</h2>
            <p>
              Tieto zásady môžu byť občas aktualizované (napr. pri nových funkciách alebo partneroch).<br/>
              Aktuálna verzia je vždy zverejnená na stránke <a href="/ochrana-sukromia">www.slohgpt.sk/ochrana-sukromia</a>.<br/>
              Ak ide o podstatnú zmenu, upozorníme vás e-mailom alebo priamo na Platforme.
            </p>
            
            <h2>13. Kontakt</h2>
            <p>
              📧 <a href="mailto:slohgpt@gmail.com">slohgpt@gmail.com</a><br/>
              Podpora je dostupná v pracovných dňoch od <strong>9:00 do 17:00 (CET)</strong>.<br/><br/>
              Ak si želáte odstrániť svoj účet alebo údaje, napíšte e-mail s predmetom <strong>„Vymazanie údajov – SlohGPT"</strong>.
            </p>
            
            <div className="legal-footer">
              <p>
                Tieto Zásady ochrany súkromia nadobúdajú účinnosť dňa 6. októbra 2025.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}