"use client";
import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12" dir="rtl">
      <h1 className="text-4xl font-bold text-center mb-8 text-lime-600">אודות האתר</h1>

      <p className="text-lg text-center text-gray-800 leading-relaxed mb-10">
        אתר זה מהווה בית חדש לזכרם של חללי מלחמת חרבות ברזל, מקום בו הם מונצחים באור חיובי וייחודי.
        כאן, כל גיבור מקבל במה לסיפור חייו האמיתי, המאפשר לנו להכיר ולהתחבר אל האדם שמאחורי השם.
      </p>
      <div className="bg-gray-50 p-6 rounded-lg shadow-lg mb-8 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-lime-500">החזון שלי</h2>
        <p className="text-gray-800 text-lg leading-relaxed">
          זכרם של הנופלים ראוי שיישאר חקוק בלבנו לעד. אני מאמינה שחובתנו היא לא רק לזכור את שמותיהם, אלא להכיר באמת מי הם היו וכיצד נגעו בחיי הסובבים אותם.
        </p>
        <p className="text-gray-800 text-lg leading-relaxed mt-3">
          יצרתי פלטפורמה מכובדת ואמינה, המאפשרת לכל משפחה וחברים להנציח את יקיריהם בדרך המשקפת את אישיותם הייחודית ואת סיפור חייהם המלא.
        </p>
        <p className="text-gray-800 text-lg leading-relaxed mt-3">
          אני רואה בהנצחה יותר מאשר זיכרון - זוהי דרך להמשיך את מורשתם, להאיר את החיים שחיו ולהראות את האור שהפיצו סביבם. האתר מציע גישה נגישה וחיובית יותר לשימור הזיכרון הקולקטיבי שלנו.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-10 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-lime-500">מי אני?</h2>
        <p className="text-lg text-gray-800 leading-relaxed">
          שמי עלמה לוי, בת 20, משרתת בחיל האוויר וחולמת לתרום לזיכרון הלאומי שלנו בדרך משמעותית.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-3">
          הקמתי את הפרויקט הזה מתוך תחושת שליחות ורצון להציג פן אחר של תהליך ההנצחה - פן שחוגג את החיים, את האישיות הייחודית ואת התשוקות של כל אחד מהנופלים.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-3">
          עבורי, הנצחה היא לא רק חובה - היא זכות. זוהי הדרך שלנו להודות, לזכור, ולהבטיח שסיפוריהם ימשיכו לחיות. אני מחויבת לוודא שכל סיפור יסופר בדיוק, ברגישות ובאהבה אין-סופית.
        </p>
      </div>

      <div className="text-center mt-8 bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        <p className="mb-3 text-gray-700 text-lg font-medium">לשאלות נוספות או יצירת קשר מוזמנים לפנות אליי במייל:</p>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=itamforever@gmail.com"
          className="text-blue-600 text-lg font-semibold hover:text-blue-700 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          itamforever@gmail.com
        </a>
      </div>
    </div>
  );
};

export default AboutUs;