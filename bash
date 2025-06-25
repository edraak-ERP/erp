# هيكل الملفات
edrak/
├── .vscode/                  # إعدادات VS Code
│   ├── settings.json
│   └── extensions.json
├── public/                   # الأصول الثابتة
│   ├── logo.png
│   └── favicon.ico
├── src/
│   ├── components/           # مكونات الواجهة
│   │   ├── editor/
│   │   │   ├── Editor.tsx
│   │   │   └── Toolbar.tsx
│   │   ├── sidebar/
│   │   │   ├── FileExplorer.tsx
│   │   │   └── DatabaseView.tsx
│   │   └── ai/
│   │       └── AIPanel.tsx
│   ├── core/                 # الوظائف الأساسية
│   │   ├── encryption/
│   │   │   ├── CryptoService.ts
│   │   │   └── KeyManager.ts
│   │   ├── storage/
│   │   │   ├── LocalStorage.ts
│   │   │   └── CloudSync.ts
│   │   └── database/
│   │       ├── DatabaseEngine.ts
│   │       └── SchemaManager.ts
│   ├── providers/            # مقدمي السياق
│   │   ├── AuthProvider.tsx
│   │   ├── EncryptionProvider.tsx
│   │   └── AppProvider.tsx
│   ├── hooks/                # خطافات مخصصة
│   │   ├── useEncryption.ts
│   │   ├── useLocalStorage.ts
│   │   └── useAI.ts
│   ├── locales/              # الترجمة العربية
│   │   ├── ar.json
│   │   └── i18n.ts
│   ├── utils/                # أدوات مساعدة
│   │   ├── rtlUtils.ts
│   │   └── privacyUtils.ts
│   ├── types/                # تعريفات TypeScript
│   │   ├── AppTypes.ts
│   │   └── EncryptionTypes.ts
│   ├── App.tsx               # المكون الرئيسي
│   ├── main.tsx              # نقطة الدخول
│   └── index.css             # الأنماط العامة
├── src-tauri/                # إعدادات Tauri
│   ├── Cargo.toml
│   ├── tauri.conf.json
│   └── ... 
├── tests/                    # الاختبارات
│   ├── unit/
│   └── e2e/
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── LICENSE                   # رخصة AGPLv3
├── SECURITY.md               # سياسة الأمان
├── CONTRIBUTING.md           # دليل المساهمة
└── README.md                 # وثيقة المشروع