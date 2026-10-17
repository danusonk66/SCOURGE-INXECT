function ph(bg,label){const s=`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400"><rect width="300" height="400" fill="#${bg}"/><circle cx="150" cy="130" r="55" fill="#0d0a08" opacity=".7"/><path d="M50 400c0-90 45-150 100-150s100 60 100 150z" fill="#0d0a08" opacity=".7"/><text x="150" y="380" font-family="monospace" font-size="22" text-anchor="middle" fill="#c9b98f">${label}</text></svg>`;return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(s);}

/* ---------------------- 1. ข้อมูลตัวละคร (NPC DATABASE) ---------------------- */
const npcDatabase = [
  // 1. Chloe Davenport (Sector D - เข้าได้)
  {
    id: 1, name: "Chloe Davenport", minDay: 1,
    idPhotoUrl: "Picture/Character FM/Character1/IMG_6915.JPG",
    idCardData: { name: "Chloe Davenport", dob: "27 JUN 2001", sector: "D", expiry: "09/2027" },
    variants: [
      { 
        isInfected: false, 
        imageUrl: "Picture/Character FM/Character1/IMG_6909.JPG", 
        healthReport: { temp: "36.6°C", symptoms: "None", date: "10 DEC 2026", notes: "Normal" },
        dialogue: ["Hello.let me get inside.there's something strange outside", "I'm Fine!!!. just let me in."]
      },
      { 
        isInfected: true, 
        imageUrl: "Picture/Character FM/Character1/IMG_6908.JPG", 
        healthReport: { temp: "38.8°C", symptoms: "Visible dark veins on neck/chest, Severe bloodshot eyes, Hyperhidrosis", date: "10 DEC 2026", notes: "A colleague reported that she had been sweating heavily, even in the cold." },
        dialogue: ["Im so scared.can you let me in please?", "im feel a bit sick but i think it just normal disease"]
      },
      { 
        isInfected: true, 
        imageUrl: "Picture/Character FM/Character1/IMG_6910.JPG", 
        healthReport: { temp: "42.7°C", symptoms: "Non-human appearance, Green skin", date: "10 DEC 2026", notes: "The person in this photograph no longer matches the individual in the medical records." },
        dialogue: ["Let...me...in"]
      }
    ]
  },
  // 2. Mia Gallagher (Sector B - เข้าได้)
  {
    id: 2, name: "Mia Gallagher", minDay: 1,
    idPhotoUrl: "Picture/Character FM/Character2/IMG_6916.JPG",
    idCardData: { name: "Mia Gallagher", dob: "11 JUNE 2008", sector: "B", expiry: "04/2029" },
    variants: [
      { 
        isInfected: false, 
        imageUrl: "Picture/Character FM/Character2/IMG_6933.JPG", 
        healthReport: { temp: "36.5°C", symptoms: "No symptoms declared", date: "10 DEC 2026", notes: "No amendments or visible damage" },
        dialogue: ["Heya! Heya! As you can see, I look fine. Please hurry up!", "Hello, I just want to find my family inside... Can I go in?"]
      },
      { 
        isInfected: true, 
        imageUrl: "Picture/Character FM/Character2/IMG_6934.JPG", 
        healthReport: { temp: "38.6°C", symptoms: "Persistent cough, Headache, High Fever", date: "10 DEC 2026", notes: "She have a history of chronic coughing since May." },
        dialogue: ["i feel a bit headache. Can you treat me?", "Why are you Looking at me like that?...completely human...right?"]
      },
      { 
        isInfected: true, 
        imageUrl: "Picture/Character FM/Character2/IMG_6935.JPG", 
        healthReport: { temp: "41.5°C", symptoms: "Non-human appearance, Plant/fungal outgrowth, Drooling, Unresponsive", date: "10 DEC 2026", notes: "No longer appears human." },
        dialogue: ["Help...so cold", "i'm good...."]
      }
    ]
  },
  // 3. Claire Kensington (Sector B - เข้าได้)
  {
    id: 3, name: "Claire Kensington", minDay: 1,
    idPhotoUrl: "Picture/Character FM/Character3/IMG_6917.JPG",
    idCardData: { name: "Claire Kensington", dob: "18 FEB 1995", sector: "B", expiry: "07/2027" },
    variants: [
      { 
        isInfected: false, 
        imageUrl: "Picture/Character FM/Character3/IMG_6931.JPG", 
        healthReport: { temp: "36.7°C", symptoms: "No symptoms declared", date: "10 DEC 2026", notes: "No amendments or visible damage" },
        dialogue: ["Excuse me, may I come in", "I have an errand. Can you let me in please?"]
      },
      { 
        isInfected: true, 
        imageUrl: "Picture/Character FM/Character3/IMG_6930.JPG", 
        healthReport: { temp: "38.7°C", symptoms: "High fever, excessive nasal discharge, and generalized body aches.", date: "10 DEC 2026", notes: "She claims that it is just a common fever caused by overworking." },
        dialogue: ["I'm feel not very well.. is there a doctor?", "Just a fever. Trust me"]
      },
      { 
        isInfected: true, 
        imageUrl: "Picture/Character FM/Character3/IMG_6932.JPG", 
        healthReport: { temp: "42.3°C", symptoms: "Wide eyes, abnormal eye redness, and inhuman skin discoloration.", date: "10 DEC 2026", notes: "Patient denies any unusual symptoms." },
        dialogue: ["Is there any food?", "I'm starving..."]
      }
    ]
  },
  // 4. Evelyn Bennett (Sector C - ห้ามเข้าทุกกรณี)
  {
    id: 4, name: "Evelyn Bennett", minDay: 1,
    idPhotoUrl: "Picture/Character FM/Character4/IMG_6918.JPG",
    idCardData: { name: "Evelyn Bennett", dob: "09 MAY 1998", sector: "C", expiry: "03/2028" },
    variants: [
      { 
        isInfected: true, 
        imageUrl: "Picture/Character FM/Character4/IMG_6936.JPG", 
        healthReport: { temp: "36.6°C", symptoms: "No symptoms declared", date: "10 DEC 2026", notes: "No amendments or visible damage" },
        dialogue: ["Sir, Can you let me in?", "I'm okay."]
      },
      { 
        isInfected: true, 
        imageUrl: "Picture/Character FM/Character4/IMG_6937.JPG", 
        healthReport: { temp: "38.2°C", symptoms: "High fever, frequent tearing, and persistent coughing.", date: "10 DEC 2026", notes: "Patient firmly refuses to undergo a thorough examination." },
        dialogue: ["I feel a bit dizzy..", "i hope somebody can save me in there."]
      },
      { 
        isInfected: true, 
        imageUrl: "Picture/Character FM/Character4/IMG_6938.JPG", 
        healthReport: { temp: "44.6°C", symptoms: "bodily mutation, withered skin, and insects swarming around the patient.", date: "10 DEC 2026", notes: "Patient's condition has deteriorated beyond recognition." },
        dialogue: ["hello....", "you look tasty..."]
      }
    ]
  },
  // 5. Martha Higgins (Sector D - เข้าได้)
  {
    id: 5, name: "Martha Higgins", minDay: 1,
    idPhotoUrl: "Picture/Character FM/Character5/IMG_6919.JPG",
    idCardData: { name: "Martha Higgins", dob: "03 DEC 1952", sector: "D", expiry: "04/2028" },
    variants: [
      { 
        isInfected: false, 
        imageUrl: "Picture/Character FM/Character5/IMG_6976.JPG", 
        healthReport: { temp: "36.5°C", symptoms: "No symptoms declared", date: "10 DEC 2026", notes: "No amendments or visible damage" },
        dialogue: ["Charles is that you?!!", "I'm glad you alright Charles."]
      },
      { 
        isInfected: true, 
        imageUrl: "Picture/Character FM/Character5/IMG_6977.JPG", 
        healthReport: { temp: "38.5°C", symptoms: "High fever, headache, pain behind the eyes, and abdominal pain.", date: "10 DEC 2026", notes: "Patient insists that her symptoms are merely signs of old age." },
        dialogue: ["I'm barely see anything", "Have you seen my son?"]
      },
      { 
        isInfected: true, 
        imageUrl: "Picture/Character FM/Character5/IMG_6978.JPG", 
        healthReport: { temp: "43.5°C", symptoms: "Lifeless eyes, severely withered skin, widespread scars, and abnormal sweating.", date: "10 DEC 2026", notes: "Patient's physical condition is no longer consistent with normal human physiology." },
        dialogue: ["Where is my son?", "I miss my son..."]
      }
    ]
  },
  // 6. Jayden Miller (Sector B - เข้าได้)
  {
    id: 6, name: "Jayden Miller", minDay: 1,
    idPhotoUrl: "Picture/Character M/Character6/IMG_6948.JPG",
    idCardData: { name: "Jayden Miller", dob: "15/07/2004", sector: "B", expiry: "09/2027" },
    variants: [
      { 
        isInfected: false, 
        imageUrl: "Picture/Character M/Character6/IMG_7006.JPG", 
        healthReport: { temp: "36.6°C", symptoms: "None", date: "10/10/2026", notes: "Excellent physical condition, normal pulse." },
        dialogue: ["I'm strong so no worry.", "Im feel nice so let me in."]
      },
      { 
        isInfected: true, 
        imageUrl: "Picture/Character M/Character6/IMG_7007.JPG", 
        healthReport: { temp: "38.4°C", symptoms: "Persistent cough, Exhaustion, High fever", date: "10/10/2026", notes: "High fever, excessive sweating." },
        dialogue: ["im feel tired.", "Guess i just have a fever."]
      },
      { 
        isInfected: true, 
        imageUrl: "Picture/Character M/Character6/IMG_7008.JPG", 
        healthReport: { temp: "40.1°C", symptoms: "Visible dark veins on neck", date: "10/10/2026", notes: "Prominent dark, bulging veins on the neck, arms, and chest." },
        dialogue: ["I'm so sleepy...", "nothing can stop me..."]
      }
    ]
  },
  // 7. Oliver Sterling (Sector E - เข้าได้)
  {
    id: 7, name: "Oliver Sterling", minDay: 1,
    idPhotoUrl: "Picture/Character M/Character7/IMG_6947.JPG",
    idCardData: { name: "Oliver Sterling", dob: "19/09/1993", sector: "E", expiry: "11/2027" },
    variants: [
      { 
        isInfected: false, 
        imageUrl: "Picture/Character M/Character7/IMG_6988.JPG", 
        healthReport: { temp: "36.7°C", symptoms: "None", date: "10/10/2026", notes: "Healthy, no cough or fever." },
        dialogue: ["Hello, I'm Journalist can i get in?", "I'm good.Just try doing the journal."]
      },
      { 
        isInfected: true, 
        imageUrl: "Picture/Character M/Character7/IMG_7004.JPG", 
        healthReport: { temp: "38.5°C", symptoms: "Persistent cough, Exhaustion", date: "10/10/2026", notes: "Persistent cough since late May, profuse facial sweatin" },
        dialogue: ["Hello.*cough*", "I'm sick but all good."]
      },
      { 
        isInfected: true, 
        imageUrl: "Picture/Character M/Character7/IMG_7005.JPG", 
        healthReport: { temp: "40.4°C", symptoms: "Extensive dark veins, Bloody stains", date: "10/10/2026", notes: "Prominent dark veins across the neck, chest, and arms." },
        dialogue: ["I'm hurt."]
      }
    ]
  },
  // 8. Arthur Pendelton (Sector A - ห้ามเข้าทุกกรณี)
  {
    id: 8, name: "Arthur Pendelton", minDay: 1,
    idPhotoUrl: "Picture/Character M/Character8/IMG_6946.JPG",
    idCardData: { name: "Arthur Pendelton", dob: "22/04/1997", sector: "A", expiry: "08/2028" },
    variants: [
      { 
        isInfected: true, 
        imageUrl: "Picture/Character M/Character8/IMG_6985.JPG", 
        healthReport: { temp: "36.5°C", symptoms: "None", date: "10/10/2026", notes: "Normal body condition, stable vital signs, alert and cheerful." },
        dialogue: ["Stop asking nonsense Im fine!", "I'm fine just do your duty!"]
      },
      { 
        isInfected: true, 
        imageUrl: "Picture/Character M/Character8/IMG_6986.JPG", 
        healthReport: { temp: "38.3°C", symptoms: "Heavy sweating, Dizziness, Fatigue", date: "10/10/2026", notes: "Excessive sweating, dark eye circles, high fever." },
        dialogue: ["I'm just a bit sick. Nothing unusual.", "What's wrong with me?"]
      },
      { 
        isInfected: true, 
        imageUrl: "Picture/Character M/Character8/IMG_6987.JPG", 
        healthReport: { temp: "39.7°C", symptoms: "Visible dark veins on neck", date: "10/10/2026", notes: "Prominent dark veins on the neck." },
        dialogue: ["This is police...", "let me in or I'm arrest you..."]
      }
    ]
  },
  // 9. Marcus Brody (Sector D - เข้าได้)
  {
    id: 9, name: "Marcus Brody", minDay: 1,
    idPhotoUrl: "Picture/Character M/Character9/IMG_6945.JPG",
    idCardData: { name: "Marcus Brody", dob: "03/11/1989", sector: "D", expiry: "05/2028" },
    variants: [
      { 
        isInfected: false, 
        imageUrl: "Picture/Character M/Character9/IMG_6982.JPG", 
        healthReport: { temp: "36.8°C", symptoms: "Mild exhaustion", date: "10/10/2026", notes: "Vital signs are normal. Fit for duty. No infected wounds." },
        dialogue: ["I'm fine. Let me through.", "I'm so good.Who gonna stop the fire if don't have me?"]
      },
      { 
        isInfected: true, 
        imageUrl: "Picture/Character M/Character9/IMG_6983.JPG", 
        healthReport: { temp: "38.6°C", symptoms: "Fever, Chills, Dehydration", date: "10/10/2026", notes: "Pale face, profuse sweating, sudden high fever." },
        dialogue: ["Hello.Is there a fire in there?", "Does my face look weird? I guess I didn't get enough sleep last night."]
      },
      { 
        isInfected: true, 
        imageUrl: "Picture/Character M/Character9/IMG_6984.JPG", 
        healthReport: { temp: "40.2°C", symptoms: "Visible dark veins on neck", date: "10/10/2026", notes: "Prominent dark veins spreading up the neck." },
        dialogue: ["Fire..."]
      }
    ]
  },
  // 10. Lucas Vance (Sector B - เข้าได้)
  {
    id: 10, name: "Lucas Vance", minDay: 1,
    idPhotoUrl: "Picture/Character M/Character10/IMG_6944.JPG",
    idCardData: { name: "Lucas Vance", dob: "14/08/1994", sector: "B", expiry: "12/2027" },
    variants: [
      { 
        isInfected: false, 
        imageUrl: "Picture/Character M/Character10/IMG_6979.JPG", 
        healthReport: { temp: "36.6°C", symptoms: "None", date: "10/10/2026", notes: "The body is in good physical health, with full awareness and consciousness." },
        dialogue: ["Son is that you?", "I'm good let's catch a bug."]
      },
      { 
        isInfected: true, 
        imageUrl: "Picture/Character M/Character10/IMG_6980.JPG", 
        healthReport: { temp: "38.4°C", symptoms: "Persistent cough (since May), Fatigue", date: "10/10/2026", notes: "Excessive sweating, dark circles around the eyes, fatigue, and a high fever." },
        dialogue: ["Something move in my tummy.", "I'm feel something strange in stomach.."]
      },
      { 
        isInfected: true, 
        imageUrl: "Picture/Character M/Character10/IMG_6981.JPG", 
        healthReport: { temp: "39.8°C", symptoms: "Severe tissue mutation", date: "10/10/2026", notes: "Enlarged and deformed arms, with prominent, darkened, bulging veins." },
        dialogue: ["I will kill you!", "Keep yourself safe.Son."]
      }
    ]
  }
];

/* ---------------------- 2. ข้อมูลกฎของเกมในแต่ละวัน (RULES) ---------------------- */
const dailyRules = {
  1: { title: "",
       html: `<h3>Infection Symptoms</h3>
              <ul>
                <li><span class="rule-banned">Non-human appearance (CRITICAL)</span></li>
                <li>Body temperature: <span class="rule-banned">Above 38°C</span></li>
                <li><span class="rule-banned">Visible dark veins</span></li>
                <li><span class="rule-banned">Persistent cough</span></li>
              </ul>
              <h3>Entry Restrictions</h3>
              <ul>
                <li><span class="rule-banned">Symptom Screening:</span> Anyone displaying symptoms matching official infection criteria must be turned away immediately.</li>
                <li><span class="rule-banned">Banned Origins:</span> Anyone from <span class="rule-banned">City A</span> or <span class="rule-banned">City C</span> is strictly denied entry.</li>
              </ul>` 
            }
        };