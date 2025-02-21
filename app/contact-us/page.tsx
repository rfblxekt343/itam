"use client";

import React from "react";
import { ArrowLeft, Mail, Shield, CheckCircle } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-8" dir="rtl">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">הנצחת הגיבור שלי</h1>
      <p className="text-lg text-center mb-8 text-black">
        אני מתחייבת להנציח את זכרם של הנופלים בכבוד, באופן מדויק ומכובד
      </p>

      {/* תהליך ההנצחה */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-black">תהליך ההנצחה</h2>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2 text-black">1. שליחת המידע</h3>
              <p className="text-black">
                מלאו את טופס Google Forms המאובטח שלי עם כל המידע הרלוונטי על יקירכם
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2 text-black">2. אימות המידע</h3>
              <p className="text-black">
                אני בודקת ומאמתת את המידע שנשלח כדי להבטיח דיוק ואמינות
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2 text-black">3. פרסום באתר</h3>
              <p className="text-black">
                לאחר האימות, המידע יפורסם באתר באופן מכובד ומכבד
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* המידע הנדרש */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-black">המידע הנדרש להנצחה</h2>
        <p className="text-lg mb-4 text-black">
          כדי להנציח את יקירכם בצורה המכבדת ביותר, נשמח לקבל את הפרטים הבאים:
        </p>

        <ul className="list-disc mr-6 mb-6 text-lg space-y-2 text-black">
          <li>שם מלא</li>
          <li>תאריך לידה וגיל</li>
          <li>עיר מגורים</li>
          <li>ביוגרפיה</li>
          <li>דרגה, יחידה ותפקיד</li>
          <li>מקום/אירוע הנפילה ותאריך נפילה (אם ידוע)</li>
          <li>הכשרות מיוחדות ומבצעים שבהם השתתף/ה</li>
          <li>&#x5E6;&#x5D0;&#x5E9;&#x5D9;&#x5DD; &#x5D4;&#x5D5;&#x5D7;&#x5D9;&#x5D8;</li>

          <li>סיפורי חיים אישיים (כולל שם המספר והקשר לחלל)</li>
          <li>תמונות (פורמטים: JPG, PNG, GIF)</li>
          <li>שירים, ספרים, סרטים ומקומות משמעותיים</li>
          <li>ציטוטים וערכים מובילים</li>
          <li>תחביבים וכישרונות</li>
          <li>סיפורי השפעה (כולל שם המספר והקשר לחלל)</li>
        </ul>
      </div>

      {/* כפתור הפניה לטופס */}
      <div className="text-center">
        <a
          href="https://forms.gle/VaU3aF487avyy3Xz7"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-row-reverse items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          מלא/י טופס להנצחת יקירך
        </a>
      </div>

      {/* מידע נוסף */}
      <div className="mt-8 text-center">
        <p className="mb-4 text-black">
          לשאלות נוספות או תמיכה, ניתן ליצור איתי קשר במייל:
        </p>
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

export default ContactUs;
