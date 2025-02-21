// scripts/createSampleHero.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateSampleHero() {
  try {
    const hero = await prisma.fallen.upsert({
      where: {
        slug: "אריאל-אדרי",  // Use slug as unique identifier
      },
      update: {}, // No updates needed if it exists
      create: {
        name: "אריאל אדרי",
        slug: "אריאל-אדרי",
        rank: "סמ״ר",
        unit: "גדוד 13 גולני",
        age: 21,
        gender: "male",
        dateOfFalling: new Date("2023-10-07"),
        placeOfFalling: "עוטף עזה",
        hometown: "באר שבע",
        biography: `אריאל היה לוחם מצטיין בגדוד 13 של גולני. 
        הוא היה ידוע בחיוך התמידי שלו ובנכונות לעזור לכל חבר.
        תמיד התנדב למשימות מאתגרות והוביל את הצוות שלו בגאווה.`,
        values: [
          "אהבת הארץ",
          "רעות",
          "מסירות",
          "מקצועיות"
        ],
        quotes: [
          "תמיד תהיה חזק יותר ממה שאתה חושב",
          "בשביל החברים - הכל"
        ],
        hobbies: [
          "גיטרה",
          "טיולים",
          "ספורט",
          "בישול"
        ],
        photos: {
          create: [
            {
              url: "/api/placeholder/400/320",
              caption: "אריאל במהלך אימון",
              type: "military"
            },
            {
              url: "/api/placeholder/400/320",
              caption: "עם החברים בבסיס",
              type: "military"
            }
          ]
        },
        stories: {
          create: [
            {
              content: "אריאל היה תמיד הראשון להתנדב לכל משימה. זוכר איך באימון האחרון התעקש לסחוב את המאג למרות שהיה פצוע.",
              authorName: "עומר כהן",
              relation: "מפקד",
              type: "military"
            },
            {
              content: "הלב הענק שלו היה תמיד פתוח לכולם. בכל שבת היה מארגן ארוחות לכל הפלוגה.",
              authorName: "רועי לוי",
              relation: "חבר ליחידה",
              type: "personal"
            }
          ]
        },
        militaryService: {
          create: {
            role: "לוחם",
            specialTraining: [
              "קורס לוחמה בשטח בנוי",
              "קורס צלפים",
              "קורס מ״כים"
            ],
            operations: [
              "מבצע חרבות ברזל",
              "מבצע שומר החומות"
            ],
            commendations: [
              "צל״ש מפקד הגדוד על פעילות מבצעית",
              "תעודת הצטיינות בקורס מ״כים"
            ]
          }
        },
        achievements: {
          create: [
            {
              title: "חייל מצטיין גדודי",
              description: "הוענק על מצוינות מבצעית ומנהיגות",
              type: "military"
            },
            {
              title: "אות מתנדב מצטיין",
              description: "על התנדבות בארגון 'אחים לחיים'",
              type: "civilian"
            }
          ]
        }
      }
    });

    console.log('עודכן גיבור:', hero);
  } catch (error) {
    console.error('שגיאה בעדכון הגיבור:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateSampleHero();