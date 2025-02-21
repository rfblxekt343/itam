"use client";

import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-8" dir="rtl">
      <h1 className="text-3xl font-bold text-center mb-6 text-lime-600">אודות האתר</h1>
      <p className="text-lg text-center mb-8 text-black">
        האתר נוצר מתוך שליחות אישית להנציח את סיפור חייהם של הנופלים, לכבד את זכרם ולהבטיח שזכרם לא יישכח.  
        המטרה שלנו היא להנציח אותם בדרך חיובית, לספר מי הם היו באמת, מה הם אהבו בחיים, ואיזה רגעים ייחודיים אפיינו אותם.
      </p>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-lime-500">החזון שלי</h2>
        <p className="text-black text-lg">
          כל אדם שהקריב את חייו למען המדינה והשירות חייב להישאר חקוק בלבנו.  
          המטרה שלי היא לספק פלטפורמה מכובדת ואמינה להנצחה, שבה כל משפחה וחבר יוכלו לשתף את סיפור יקירם בצורה מכובדת וראויה.  
          אני מאמינה שהנצחה אינה רק זיכרון, אלא גם דרך להמשיך את דרכם ולהראות את האור והחיים שהם הפיצו סביבם.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-lime-500">מי אני?</h2>
        <p className="text-lg text-black">
          שמי עלמה לוי, בת 19 ומשרתת בחיל האוויר.  
          הקמתי את האתר מתוך תחושת שליחות עמוקה, מתוך רצון לשמר את זכרם של הנופלים בדרך שתשקף את האישיות שלהם ואת הדברים שאהבו.  
          ההנצחה היא הדרך שלנו לומר תודה, לזכור ולספר את סיפורם של אלו שכבר לא איתנו. אני כאן כדי לוודא שכל סיפור יסופר בדיוק, בכבוד ובאהבה.
        </p>
      </div>

      <div className="text-center mt-8">
        <p className="mb-4 text-black">לשאלות נוספות או יצירת קשר:</p>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=itamforever@gmail.com"
          className="text-blue-600 hover:text-blue-700"
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
