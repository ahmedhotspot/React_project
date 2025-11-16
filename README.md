# React Native Project

تطبيق React Native للجوال (Android و iOS)

## المتطلبات

- Node.js >= 18
- npm أو yarn
- Android Studio (للتطوير على Android)
- Xcode (للتطوير على iOS - macOS فقط)
- Java Development Kit (JDK) 17

## التثبيت

1. تثبيت التبعيات:
```bash
npm install
```

2. تثبيت Pods للـ iOS (macOS فقط):
```bash
cd ios && pod install && cd ..
```

## تشغيل التطبيق

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

### تشغيل Metro Bundler فقط
```bash
npm start
```

## البنية

```
src/
├── assets/          # الأصول (صور، أيقونات، خطوط)
│   ├── fonts/       # ملفات الخطوط
│   ├── icons/       # الأيقونات
│   ├── images/      # الصور
│   └── webfonts/    # خطوط الويب
├── components/      # مكونات React Native
├── config/          # ملفات الإعدادات
├── i18n/            # ملفات الترجمة
├── styles/          # ملفات الأنماط (StyleSheet)
├── types/           # أنواع TypeScript
├── utils/           # دوال مساعدة
└── App.tsx          # المكون الرئيسي

android/             # ملفات Android Native
ios/                 # ملفات iOS Native
```

## ملاحظات مهمة

- React Native لا يدعم CSS/SCSS مباشرة، استخدم `StyleSheet` API
- الصور يجب أن تكون في مجلد `src/assets`
- SVG يحتاج مكتبة إضافية مثل `react-native-svg`
- الخطوط المخصصة تحتاج إعداد إضافي في `react-native.config.js`

## الخطوات التالية

1. تثبيت التبعيات: `npm install`
2. للتطوير على Android: تأكد من تشغيل Android Emulator أو توصيل جهاز
3. للتطوير على iOS: تأكد من تثبيت CocoaPods وتشغيل `pod install` في مجلد ios

## إضافة مكتبات مفيدة

```bash
# للتعامل مع SVG
npm install react-native-svg

# للتنقل
npm install @react-navigation/native @react-navigation/stack

# للصور
npm install react-native-image-picker

# للخطوط المخصصة
npm install react-native-asset
```

