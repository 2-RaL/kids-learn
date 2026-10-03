# 🌟 Kids Move & Learn (Uşaqlar üçün İnteraktiv Nitq, Hərəkət və İnkişaf Platforması)

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.3-FF0055?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Web Speech API](https://img.shields.io/badge/Web_Speech_API-Native-00C7B7)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
[![Web Audio API](https://img.shields.io/badge/Web_Audio_API-Synthesizer-F59E0B)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Node.js & Express](https://img.shields.io/badge/Backend-Node.js_&_Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MySQL 8](https://img.shields.io/badge/Database-MySQL_8.0-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Languages](https://img.shields.io/badge/Languages-AZ_%7C_EN_%7C_RU-success)](#-trilingual-voice-recognition-matrix)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Kids Move & Learn**, məktəbəqədər və erkən məktəb yaşlı uşaqlar, loqopedlər (nitq terapevtləri) və valideynlər üçün hazırlanmış hərtərəfli, klinik səviyyəli interaktiv inkişaf və oyun ekosistemidir. 

Platforma uşaqlarda **iri və incə motorika bacarıqlarının inkişafını**, **artikulyasiya və fonematik qavrayışı**, **təqlid qabiliyyətini (motor mimicry)** və **özünəqulluq vərdişlərini** müasir veb texnologiyaları, səs tanıma (Speech-to-Text), real-vaxt audio sintezi və qabaqcıl qamifikasiya ilə birləşdirir.

---

## 📑 Mündəricat (Table of Contents)

1. [Layihənin Fəlsəfəsi və Klinik Əsasları](#-layihənin-fəlsəfəsi-və-klinik-əsasları)
2. [Sistem Arxitekturası və 4 Əsas Portal](#-sistem-arxitekturası-və-4-əsas-portal)
   - [1. Uşaq İnteraktiv Meydançası (Kids Portal)](#1-uşaq-i̇nteraktiv-meydançası-kids-game-portal)
   - [2. Loqoped və Terapevt Portalı (Therapist Workspace)](#2-loqoped-və-terapevt-portalı-therapist-workspace)
   - [3. Valideyn İnkişaf Portalı (Parent Portal)](#3-valideyn-i̇nkişaf-portalı-parent-portal)
   - [4. İnzibati və Redaktor İdarəetmə Paneli (Admin & Editor Panel)](#4-i̇nzibati-və-redaktor-i̇darəetmə-paneli-admin-panel)
3. [58 Əmrin Tam Trilinqual Matrisi (AZ / EN / RU)](#-58-əmrin-tam-trilinqual-matrisi)
4. [Klinik Qiymətləndirmə və Sertifikatlaşdırma](#-klinik-qiymətləndirmə-və-sertifikatlaşdırma)
5. [Texnoloji Stack](#-texnoloji-stack)
6. [Məlumat Bazası Sxemi (MySQL Database Schema)](#-məlumat-bazası-sxemi)
7. [REST API Spesifikasiyası](#-rest-api-spesifikasiyası)
8. [Quraşdırma və İşə Salma (Quick Start)](#-quraşdırma-və-i̇şə-salma)
9. [Təhlükəsizlik, Məxfilik və Uşaq Qoruması](#-təhlükəsizlik-məxfilik-və-uşaq-qoruması)
10. [Lisenziya](#-lisenziya)

---

## 🧠 Layihənin Fəlsəfəsi və Klinik Əsasları

Pediatrik neyroinkişaf araşdırmaları göstərir ki, uşaqlarda nitq aparatı birbaşa motor korteksi ilə əlaqəlidir. İri motorika (tullanmaq, qaçmaq, tarazlıq saxlamaq) və incə motorika (əl çalmaq, barmaqla göstərmək, rəsm çəkmək) məşqləri beyində nitq mərkəzlərini (Broka və Vernike sahələri) stimullaşdırır.

**Kids Move & Learn platformasının hədəfləri:**
- **Kinestetik və Vizual Təqlid:** Personajın hərəkətini izləyərək təkrarlamaq (Mirror Neuron Activation).
- **Fonematik və Auditiv Qavrayış:** Trilinqual səslənməni eşidib anlama və düzgün tələffüz etmə.
- **Sensor Qavrama və Reaksiya:** Real-vaxt səs və vizual geridönüş sayəsində diqqəti cəmləmə (Attention Span).
- **Rutin və Sosial Adaptasiya:** Gündəlik gigiyena (əl yumaq, saç daramaq, çimmək) və sosial əlaqə (qucaqlamaq, kömək etmək) vərdişlərini möhkəmləndirmək.

---

## 🏛️ Sistem Arxitekturası və 4 Əsas Portal

Platforma bir-biri ilə tam inteqrasiya olunmuş **4 iyerarxik portaldan** ibarətdir:

```
                            ┌────────────────────────────────────────┐
                            │        MySQL 8 & Express Server        │
                            └────────────────────┬───────────────────┘
                                                 │ REST API & JWT
                 ┌───────────────────────────────┼───────────────────────────────┐
                 │                               │                               │
                 ▼                               ▼                               ▼
    ┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
    │  👑 Admin & Editor      │     │  🩺 Logoped & Terapevt  │     │  👨‍👩‍👧 Valideyn Portalı   │
    │  - İstifadəçi İdarəsi   │     │  - MySQL Valideyn Siyahı│     │  - Ev Tapşırıqları      │
    │  - Məzmun İdarəsi       │     │  - 10-Sahəli Diaqnostika│     │  - Nağıllar, Məntiq     │
    │  - Audit Log & Rollback │     │  - Klinik Protokol PDF  │     │  - Uğur Sertifikatı PDF │
    └─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
                                                 │
                                                 ▼
                                    ┌─────────────────────────┐
                                    │  🎮 Kids Move & Learn   │
                                    │  - 58 İnteraktiv Əmr    │
                                    │  - Trilinqual Səs Tanıma│
                                    │  - Web Audio Sintezator │
                                    │  - Öyrənmə Rejimi       │
                                    └─────────────────────────┘
```

---

### 1. Uşaq İnteraktiv Meydançası (Kids Game Portal)

- **🎭 12 Fərqli Uşaq Personajı:**
  - Xüsusi studiya qrafikası və şəffaf kəsimlərlə zənginləşdirilmiş əsas personajlar: **Leyla** və **Tom**.
  - Çoxqatlı SVG sümüklü rigging sistemi ilə təchiz olunmuş qız və oğlan avatarları: **Amara**, **Ali**, **Leo**, **Murad** və s.
  - Hər personaj müstəqil bədən, baş, əl, ayaq və kölgə hərəkət fizikasını dəstəkləyir.
- **🎙️ Trilinqual Səs Tanıma (Web Speech API):**
  - **Azərbaycan (AZ)**, **İngilis (EN)** və **Rus (RU)** dillərində sərbəst şifahi əmrləri qəbul edir.
  - Uşaqların qeyri-səlis tələffüzünü (lisping, heca atlama) anlayan **Fuzzy Phonetic Parser**.
  - Mikrofon vəziyyətini (dinləyir, anladı, xəta) göstərən vizual səs dalğası (Waveform).
- **🎹 Sıfır-Gecikməli Web Audio Sintezatoru:**
  - Heç bir xarici MP3 yükləmədən brauzerin `AudioContext` oscillatatorları ilə canlı yaradılan uşaq dostu səs effektləri:
    - `playPopSound()`: Düymə sıxıldıqda şən akkord.
    - `playJumpSound()`: Tullanma üçün rezonanslı "boing" tezlik sürüşməsi.
    - `playStarSound()`: Ulduz toplama arpejiosu.
    - `playAchievementSound()`: Qələbə fanfarları.
- **🎯 Öyrənmə və Çağırış Rejimi (Challenge Mode):**
  - Asan, Orta və Çətin səviyyələrdə ardıcıl hərəkət zəncirləri (məs: *Otur ➔ Əl çal ➔ Tullan*).
  - Addım-addım vizual indikatorlar və tamamlanma təqibi.
- **⭐ Qamifikasiya və Mükafatlar:**
  - Hər düzgün hərəkətə ulduz balı, hər 50 ulduzda səviyyə artımı (Level Up).
  - 10 kilidi açılan nailiyyət medalı və qələbə anında rəngarəng konfetti partlayışları (`canvas-confetti`).

---

### 2. Loqoped və Terapevt Portalı (Therapist Workspace)

- **👥 Real MySQL Valideyn İnteqrasiyası:**
  - Bütün qeydiyyatdan keçmiş real valideyn və uşaq profilləri birbaşa bazadan çəkilir.
  - Hər uşaq üzrə yaş, cins, qeydiyyat tarixi və təyin olunmuş məqsədlər dinamik əks olunur.
- **📊 10-Sahəli Klinik Qiymətləndirmə Rubrikası:**
  1. *Artikulyasiya və Düzgün Tələffüz* (Articulation & Pronunciation)
  2. *Auditiv Qavrayış və Təlimat Anlama* (Auditory Comprehension & Receptive Language)
  3. *Ekspressiv Nitq və Lüğət Ehtiyatı* (Expressive Vocabulary & Syntax)
  4. *İri Motorika və Ümumi Tarazlıq* (Gross Motor Coordination & Balance)
  5. *İncə Motorika və Əl Bacarıqları* (Fine Motor & Finger Dexterity)
  6. *Hərəkət Təqlidi və Bilateral Əlaqə* (Motor Imitation & Bilateral Movement)
  7. *Sensor Tənzimləmə və Diqqət* (Sensory Regulation & Focus)
  8. *Fonematik Eşitmə və Heca Bölməsi* (Phonemic Awareness)
  9. *Sosial Kommunikasiya və Göz Təması* (Social Communication & Eye Contact)
  10. *Tapşırıqda Qərarlılıq və Reaksiya Sürəti* (Task Persistence & Response Latency)
- **📄 Rəsmi Klinik Diaqnostika Protokolu və PDF Çıxarışı:**
  - `ClinicalDiagnosticReportModal.tsx` vasitəsilə rəsmi tibbi-pedaqoji standartlara uyğun protokol (`KML-2026-XXXX`).
  - Uşaq profili, 10 sahə üzrə vizual faiz dərəcələri, müşahidə qeydləri, aktiv hədəflər, ev təlimatları və terapevt imza/möhür bloku.
  - Tək kliklə A4 formatında çapa və PDF saxlanmaya hazır (`window.print()` optimizasiyası).
- **📝 Ev Tapşırıqları və Seans Tarixçəsi:**
  - Kateqoriyalar üzrə hərəkət tapşırıqlarının təyini (hədəf sayı, qeydlər).
  - Seans gündəliyi və valideynlə avtomatlaşdırılmış əks-əlaqə.

---

### 3. Valideyn İnkişaf Portalı (Parent Portal)

- **📋 Ev Tapşırıqlarının Monitorinqi:**
  - Terapevtin verdiyi tapşırıqlar uşağın profilində real-vaxt görünür.
  - Səsli təlimat köməkçisi (`parentSpeech.ts`) vasitəsilə valideyn tapşırığın məqsədini və icra qaydasını dinləyə bilir.
- **🏆 Uşaq Uğur və Nailiyyət Sertifikatı (Achievement Certificate Generator):**
  - `ParentCertificateModal.tsx` vasitəsilə uşağın qazandığı ulduzlar, səviyyə və inkişaf göstəriciləri üçün xüsusi dizayn edilmiş, qızılı çərçivəli rəsmi sertifikat.
  - Açılışda xüsusi ulduz yağışı (`triggerStarShower()`) və qələbə akkordları (`playAchievementSound()`).
  - A4 formatında birbaşa PDF kimi yükləmə və ya çap etmə imkanı.
- **📚 Tədris Modulları:**
  - İnteraktiv audio nağıllar, məntiq və riyaziyyat testləri, şahmat dərsləri və maarifləndirici videolar.
  - Gündəlik oflayn inkişaf fəaliyyətləri və uşaqla ünsiyyət dialoqları.

---

### 4. İnzibati və Redaktor İdarəetmə Paneli (Admin Panel)

- **👤 Rol Əsaslı Giriş İdarəsi (RBAC):**
  - `admin`, `therapist`, `parent`, `editor`, `user` rolları üzrə səlahiyyətləndirmə.
- **🛡️ Audit Tarixçəsi və Geri Qaytarma (Rollback Engine):**
  - `editor_audit_logs` cədvəlində redaktorların yaratdığı, dəyişdirdiyi və sildiyi hər məlumatın əvvəlki və yeni vəziyyəti (`previous_state`, `new_state`) saxlanılır.
  - Admin tək kliklə istənilən səhv dəyişikliyi ilkin vəziyyətinə qaytara (rollback) bilər.
- **📑 Məzmun İdarəsi (CMS):**
  - Nağıl, video, test və kateqoriyaların dinamik redaktəsi.

---

## 🗣️ 58 Əmrin Tam Trilinqual Matrisi

Bütün 58 əmr 5 inkişaf sahəsi üzrə qruplaşdırılmışdır və həm qrafik interfeyslə, həm də səs əmri ilə işləyir:

### 1. Hərəkətlər və İri Motorika (Movement & Gross Motor - 13 Əmr)
| Kod | İkon | 🇦🇿 Azərbaycan | 🇬🇧 English | 🇷🇺 Русский | Pedaqoji Hədəf |
|---|:---:|---|---|---|---|
| `sit` | 🪑 | Otur, Əyləş | Sit, Sit down | Сядь, Садись | Əzələ tonusu, statik tarazlıq |
| `stand` | 🧍 | Dur, Qalx, Ayağa qalx | Stand, Stand up, Get up | Встань, Вставай | Postural nəzarət |
| `run` | 🏃 | Qaç, Yüyür | Run, Jog, Sprint | Беги, Побежали | Kardio, ayaq dinamikası |
| `jump` | 🦘 | Tullan, Oppan, Sıçra | Jump, Hop, Leap | Прыгай, Подпрыгни | Vestibulyar aparat, impuls |
| `stop` | 🛑 | Dayan, Dur | Stop, Halt, Freeze | Стой, Остановись | İnhibitor nəzarət (özünü saxlama) |
| `walk` | 🚶 | Yol ilə get, Addımla | Walk, Step | Иди, Шагай | Ritmik yeriş koordinasiyası |
| `walkForward` | ⬆️ | Önə, İrəli get, Qabağa | Forward, Move forward | Вперёд, Иди вперёд | Məkan oriyentasiyası |
| `walkBackward` | ⬇️ | Geriyə, Arxaya get | Backward, Step back | Назад, Иди назад | Qeyri-vizual koordinasiya |
| `moveLeft` | ⬅️ | Sola, Sola get | Left, Go left | Налево, Влево | Sağ-sol differensiasiyası |
| `moveRight` | ➡️ | Sağa, Sağa get | Right, Go right | Направо, Вправо | Sağ-sol differensiasiyası |
| `spin` | 🔄 | Dön, Fırlan | Spin, Rotate, Turn | Повернись, Крутись | Vestibulyar tolerantlıq |
| `slide` | 🛝 | Sürüş | Slide, Glide | Катись, Скользи | Hərəkət təhlükəsizliyi |
| `rideBike` | 🚲 | Sür (Velosiped) | Ride bike, Cycle | Езжай на велосипеде | Çarpaz ətraflar koordinasiyası |

### 2. Əyləncə və Emosiyalar (Fun & Emotions - 12 Əmr)
| Kod | İkon | 🇦🇿 Azərbaycan | 🇬🇧 English | 🇷🇺 Русский | Pedaqoji Hədəf |
|---|:---:|---|---|---|---|
| `laugh` | 😂 | Gül, Qəhqəhə çək | Laugh, Giggle | Смейся, Посмейся | Məmnunluq, mimika əzələləri |
| `cry` | 😢 | Ağla, Kədərlən | Cry, Weep | Плачь, Поплачь | Emosiyaları tanıma və ifadə |
| `surprised` | 😲 | Təəccüblən | Surprised, Wow | Удивись, Ого | Emosional şkalalama |
| `think` | 🤔 | Düşün, Fikirləş | Think, Wonder | Подумай, Поразмысли | Koqnitiv pauza |
| `wave` | 🖐️ | Əl salla, Salam ver | Wave, Say hi | Помаши, Привет рукой | Sosial salamlama jesti |
| `clap` | 👏 | Əl çal, Alqışla | Clap, Applause | Хлопай, В ладоши | Əl-əlaqə, ritm hissi |
| `dance` | 💃 | Oyna, Rəqs et | Dance, Groove | Танцуй, Пляши | İfadəli bədən dili |
| `sing` | 🎤 | Oxu (Musiqi) | Sing, Melody | Пой, Напевай | Nəfəs nəzarəti, səs gücü |
| `playInstrument` | 🎸 | Çal (Musiqi) | Play music, Strum | Играй на гитаре | Auditiv ritm |
| `playToy` | 🧸 | Oyna (Oyuncaq) | Play with toy | Играй с игрушкой | Sərbəst oyun təxəyyülü |
| `nod` | 👍 | Bəli (baş), Razılaş | Nod, Nod yes | Кивни, Кивни да | Təsdiq jesti (qeyri-verbal) |
| `shakeHead` | 🙅 | Xeyr (baş), İmtina et | Shake head, Say no | Покачай головой, Нет | İmtina jesti (qeyri-verbal) |

### 3. Gündəlik Qulluq və Rejim (Daily Routines - 8 Əmr)
| Kod | İkon | 🇦🇿 Azərbaycan | 🇬🇧 English | 🇷🇺 Русский | Pedaqoji Hədəf |
|---|:---:|---|---|---|---|
| `wakeUp` | ⏰ | Dur, Oyan | Wake up, Get up | Проснись, Вставай | Səhər rejimi adaptasiyası |
| `sleep` | 😴 | Yat, Yuxuya get | Sleep, Go to bed | Спи, Засыпай | Sakitləşmə, yuxu gigiyenası |
| `eat` | 🍎 | Yemək ye | Eat, Have a snack | Кушай, Ешь | Qidalanma müstəqilliyi |
| `drink` | 🥤 | Su iç | Drink, Sip water | Пей воду, Пей | Hidratasiya vərdişi |
| `bathe` | 🚿 | Çim, Duş al, Vanna | Take bath, Shower | Прими ванну, Купайся | Bədən təmizliyi vərdişi |
| `wash` | 🧼 | Əlini yu, Yuyun | Wash hands, Clean up | Мой руки, Умойся | Sanitariya və gigiyena |
| `comb` | 🪮 | Dara (Saçını) | Comb hair, Brush hair | Расчеши волосы | Özünəqulluq, sensor dözümlülük |
| `dress` | 👕 | Geyin, Paltar gey | Get dressed, Put on | Одевайся, Надень | İncə motorika, geyinmə ardıcıllığı |

### 4. Öyrənmə və Yaradıcılıq (Learning & Arts - 10 Əmr)
| Kod | İkon | 🇦🇿 Azərbaycan | 🇬🇧 English | 🇷🇺 Русский | Pedaqoji Hədəf |
|---|:---:|---|---|---|---|
| `read` | 📖 | Oxu (Kitab) | Read, Read a book | Читай, Почитай | Vizual diqqət, lüğət |
| `write` | ✏️ | Yaz, Hərf yaz | Write, Scribe | Пиши, Напиши | Qrafomotorika hazırlığı |
| `draw` | 🎨 | Çək (Rəsm) | Draw, Sketch | Рисуй, Нарисуй | Təsviri təxəyyül |
| `paint` | 🖌️ | Rənglə, Boya | Paint, Color | Раскрашивай | Rəng qavrayışı, fırça tutuşu |
| `cut` | ✂️ | Kəs (Qayçı) | Cut, Snip | Режь, Вырезай | Bilateral koordinasiya (qayçı) |
| `count` | 🔢 | Say, Rəqəm say | Count, Numbers | Считай, Посчитай | Erkən riyazi təfəkkür |
| `talk` | 💬 | Danış, Söhbət et | Talk, Speak | Говори, Разговаривай | Fikrini ifadə etmə cəsarəti |
| `build` | 🧱 | Düzəlt, Quraşdır | Build, Construct | Строй, Собери | Fəza təfəkkürü (bloklar) |
| `point` | 👆 | Göstər, İşarə et | Point, Indicate | Покажи пальцем | Göstərici jest (deiktik jest) |
| `stretch` | 🙆 | Gəril, Əzələni dart | Stretch, Reach high | Потянись, Растяжка | Bədən sxemini anlama |

### 5. Sosial və Birgə Fəaliyyətlər (Social & Actions - 15 Əmr)
| Kod | İkon | 🇦🇿 Azərbaycan | 🇬🇧 English | 🇷🇺 Русский | Pedaqoji Hədəf |
|---|:---:|---|---|---|---|
| `hug` | 🤗 | Qucaqla, Bağrına bas | Hug, Cuddle | Обними, Приобними | Empatiya, taktil rahatlıq |
| `holdHands` | 🤝 | Əl-ələ tut | Hold hands | Держись за руки | Sosial tərəfdaşlıq |
| `help` | ❤️ | Kömək et | Help, Assist | Помоги, Выручи | Prososial davranış |
| `openDoor` | 🚪 | Aç (Qapı) | Open door | Открой дверь | Səbəb-nəticə əlaqəsi |
| `closeDoor` | 🔒 | Bağla (Qapı) | Close door | Закрой дверь | Tapşırığın tamamlanması |
| `putAway` | 📦 | Yerinə qoy | Put away, Stash | Положи на место | Mütəşəkkillik, nizam |
| `collect` | 🧺 | Topla (Əşya) | Collect, Gather | Собери вещи | Qruplaşdırma və çeşidləmə |
| `clean` | 🧹 | Təmizlə, Süpür | Clean, Sweep | Уберись, Подмети | Məsuliyyət hissi |
| `bring` | 🎁 | Gətir | Bring, Carry here | Принеси | İki-mərhələli komanda icrası |
| `takeAway` | 🚶‍♂️ | Apar | Take away, Move | Унеси | Məkan dəyişimi anlayışı |
| `carry` | 🎒 | Daşı, Yük götür | Carry, Transport | Неси, Тащи | Proprioseptiv güc hissi |
| `pull` | 🪢 | Dart, Çək | Pull, Tug | Тяни, Потяни | İzometrik güc tətbiqi |
| `scatter` | 💥 | Dağıt | Scatter, Disperse | Рассыпь, Разбросай | Fərqləndirmə və kontrast |
| `waterPlant` | 🪴 | Sula (Bitki) | Water plant | Полей цветок | Qayğıkeşlik və təbiət sevgisi |
| `lightMatch` | 🕯️ | Yandır (Kibrit/Şam) | Light candle | Зажги свечу | Təhlükəsizlik və ehtiyatlılıq |

---

## 📋 Klinik Qiymətləndirmə və Sertifikatlaşdırma

### 1. Loqopedik Protokol (Clinical Diagnostic Protocol)
- **Komponent:** `src/components/therapist/ClinicalDiagnosticReportModal.tsx`
- **Təyinat:** Hər bir pasiyent uşaq üçün peşəkar, A4 çap formatında klinik protokol generasiya edir.
- **Parametrlər:** Uşağın yaşı, qeydiyyat nömrəsi, 10 klinik inkişaf sahəsinin hər biri üzrə faiz göstəricisi (0-100%), loqopedin xüsusi klinik şərhləri, fərdi korreksiya hədəfləri, valideyn üçün ev məşğələsi təlimatları və terapevtin imza-möhür yeri.

### 2. Valideyn Uğur Sertifikatı (Certificate of Achievement)
- **Komponent:** `src/components/parent/ParentCertificateModal.tsx`
- **Təyinat:** Uşağın qazandığı ulduzlara və tamamladığı səviyyələrə görə motivasiyaedici, estetik cəhətdən zəngin fərdi diplom/sertifikat yaradır.
- **Effektlər:** Açılan anda qələbə musiqisi (`playAchievementSound()`), ulduz yağışı animasiyası (`triggerStarShower()`) və brauzer üzərindən 1-kliklə rəsmi PDF çıxarışı.

---

## 💻 Texnoloji Stack

### Frontend
- **React 18.3 & TypeScript 5.5:** Tip-təhlükəsiz, komponent əsaslı reaktiv arxitektura.
- **Vite 8.3:** Ultra-sürətli HMR və optimallaşdırılmış Rollup build mühərriki.
- **Tailwind CSS 3.4:** Uşaq psixologiyasına uyğun pastel rənglər, 3D basılabilən düymələr və şüşə morfizmi (Glassmorphism).
- **Framer Motion 11.3:** Hamar animasiyalar, fizika əsaslı keçidlər və personaj rigging-i.
- **Web Speech API (`webkitSpeechRecognition`):** Bulud xidmətlərindən asılı olmayan, birbaşa brauzerdə işləyən səs tanıma.
- **Web Audio API:** Dinamik oscillatorlar vasitəsilə 0 gecikməli səs generasiyası.
- **Zustand:** `localStorage` ilə sinxronlaşan yüngül və güclü vəziyyət (state) idarəetməsi.
- **i18next:** Azərbaycan, İngilis və Rus dillərində dərhal dil dəyişməsi.

### Backend
- **Node.js 18+ & Express 4:** Yüksək məhsuldarlıqlı REST API arxitekturası.
- **MySQL 8.0 & `mysql2/promise`:** Əlaqəli məlumat bazası, əlaqə hovuzu (Connection Pool).
- **JWT (JSON Web Tokens) & bcryptjs:** Kriptoqrafik təhlükəsizlik və rol əsaslı icazələr (RBAC).

---

## 🗄️ Məlumat Bazası Sxemi

Baza strukturu uşağın inkişafının bütün aspektlərini əhatə edən 20 əlaqəli cədvəldən ibarətdir:

```sql
-- 1. Əsas İstifadəçilər
users (id, username, password_hash, display_name, email, role, portal_access, is_active, created_at, last_login_at)

-- 2. Audit Tarixçəsi və Dəyişikliyi Geri Qaytarma
editor_audit_logs (id, user_id, user_name, user_display_name, user_role, action_type, entity_type, entity_id, entity_title, previous_state, new_state, is_reverted, reverted_at, reverted_by_name, created_at)

-- 3. Uşaq və Valideyn Profilləri
parent_profiles (id, user_id, child_name, child_age, child_gender, avatar_emoji, notes, created_at)

-- 4. Klinik Müalicə Hədəfləri (Therapy Goals)
therapy_goals (id, user_id, therapist_id, title, description, category, target_date, status, progress_percent, created_at)

-- 5. Ev Tapşırıqları (Homework Assignments)
homework_assignments (id, user_id, therapist_id, title, description, category, due_date, status, feedback_note, created_at)

-- 6. Terapevt Seans Qeydləri (Session Notes)
therapist_session_notes (id, user_id, therapist_id, session_date, summary, recommendations, next_steps, created_at)

-- 7. Uşaq Fəaliyyət İnkişafı (Activity Progress)
child_activity_progress (id, user_id, activity_type, activity_id, score, stars_earned, completed_at)

-- 8. Tədris və Məzmun Cədvəlləri
age_groups, story_categories, stories, video_categories, videos, parent_characters, movements, logic_questions, logic_answers, math_questions, math_answers, chess_lessons, learning_categories, parent_offline_activities, conversation_prompts
```

---

## 🔌 REST API Spesifikasiyası

### Autentifikasiya (`/api/auth`)
- `POST /api/auth/login`: İstifadəçi adı və şifrə ilə JWT token əldə etmə.
- `GET /api/auth/me`: Cari autentifikasiya olunmuş istifadəçi və rol məlumatı.

### Loqoped və Terapevt Xidmətləri (`/api/therapist`)
- `GET /api/therapist/parent-users`: Qeydiyyatdan keçmiş bütün real valideynlərin və uşaqların siyahısı.
- `GET /api/therapist/homework/:userId`: Seçilmiş uşağa aid ev tapşırıqları.
- `POST /api/therapist/homework`: Yeni ev tapşırığı təyin etmə.
- `PUT /api/therapist/homework/:id`: Tapşırığın statusunu və ya məzmununu yeniləmə.
- `DELETE /api/therapist/homework/:id`: Tapşırığı silmə.
- `GET /api/therapist/session-notes/:userId`: Uşağın seans qeydləri arxivi.
- `POST /api/therapist/session-notes`: Yeni seans qeydi əlavə etmə.
- `GET /api/therapist/goals/:userId`: Terapiya hədəfləri və cari faiz göstəriciləri.
- `POST /api/therapist/goals`: Yeni hədəf təyin etmə.
- `PUT /api/therapist/goals/:id`: Hədəfin faizini və ya statusunu yeniləmə.

### Valideyn Xidmətləri (`/api/parent`)
- `GET /api/parent/overview`: Valideynin əsas inkişaf xülasəsi və aktiv tapşırıqları.
- `POST /api/parent/progress`: Uşağın tamamladığı fəaliyyət və ulduz balını qeyd etmə.

### Admin və Audit Xidmətləri (`/api/admin`)
- `GET /api/admin/users`: Bütün istifadəçilərin idarəsi.
- `POST /api/admin/users`: Yeni istifadəçi yaratma və rol təyini.
- `GET /api/admin/audit-logs`: Bütün redaktor dəyişikliklərinin qeydiyyatı.
- `POST /api/admin/audit-logs/:id/revert`: Səhv dəyişikliyi bazada ilkin vəziyyətinə qaytarma (Rollback).

---

## 🚀 Quraşdırma və İşə Salma

### Tələblər
- [Node.js](https://nodejs.org/) v18.0 və ya daha yuxarı
- [MySQL Server](https://dev.mysql.com/downloads/) v8.0 və ya MariaDB 10.5+
- Müasir veb brauzer (Google Chrome, Microsoft Edge və ya Safari)

### 1. Layihənin Yüklənməsi
```bash
git clone https://github.com/your-repo/kids-move-learn.git
cd kids-move-learn
```

### 2. Asılılıqların Quraşdırılması
```bash
# Frontend asılılıqları
npm install

# Backend asılılıqları
cd server
npm install
cd ..
```

### 3. Məlumat Bazasının Tənzimlənməsi
`server/` qovluğunda `.env` faylı yaradın və MySQL parametrlərini qeyd edin:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=kids_move_learn
JWT_SECRET=your_super_secret_jwt_key_2026
```

Server ilk dəfə işə düşdükdə `server/db.js` avtomatik olaraq bütün cədvəlləri (`CREATE TABLE IF NOT EXISTS`) yaradacaq və standart tədris məlumatlarını bazaya əlavə edəcəkdir.

### 4. İşə Salma
```bash
# Backend serverini işə salmaq üçün (Port 5000)
cd server
node index.js

# Frontend tətbiqini işə salmaq üçün (Port 3000)
npm run dev
```

Brauzerinizdə `http://localhost:3000` ünvanını açın.

### 5. Production Build
```bash
npm run build
```
Optimallaşdırılmış statik fayllar `dist/` qovluğunda formalaşacaqdır.

---

## 🔒 Təhlükəsizlik, Məxfilik və Uşaq Qoruması

- **On-Device Səs Emalı:** Bütün səs əmrləri istifadəçinin öz cihazında (`Web Speech API`) emal edilir. Uşaqların səsi heç bir kənar bulud serverinə göndərilmir və saxlanılmır.
- **Təhlükəsiz Autentifikasiya:** Bütün şifrələr güclü `bcryptjs` heşləməsi ilə qorunur, sessiyalar təhlükəsiz JWT ilə idarə olunur.
- **SQL İnyeksiya Mühafizəsi:** Bütün sorğular `mysql2/promise` parametrli sorğuları (Prepared Statements) vasitəsilə icra edilir.
- **Uşaq Məxfiliyi:** COPPA və GDPR-K təlimatlarına uyğun olaraq, platformada heç bir kommersiya reklamı, gizli izləmə və ya kənar analitika skriptləri mövcud deyil.

---

## 📄 Lisenziya

Bu layihə [MIT License](LICENSE) altında yayımlanır. Uşaqların sağlam, əyləncəli və elmi əsaslarla inkişaf etməsi üçün sevgi ilə hazırlanmışdır!
