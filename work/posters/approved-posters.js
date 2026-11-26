(() => {
  const additions = [
    {
      "slug": "poster-suishi",
      "name": "风物手记",
      "en": "Field Notes Through the Year",
      "type": "二十四节气系列 · 物候版画",
      "cover": "/assets/poster-collection/thumbs/A01-2.webp?v=e92e331b8a3b",
      "alt": "《风物手记》立春海报"
    },
    {
      "slug": "poster-jianshi",
      "name": "一剪成岁",
      "en": "A Year in Paper Cuts",
      "type": "二十四节气系列 · 剪纸插画",
      "cover": "/assets/poster-collection/thumbs/C01-1.webp?v=5acbb96449ec",
      "alt": "《一剪成岁》立春海报"
    },
    {
      "slug": "poster-crunch",
      "name": "脆响",
      "en": "Crunch",
      "type": "海苔米脆 · 零食品牌",
      "cover": "/assets/poster-collection/thumbs/D01-2.webp",
      "alt": "《脆响》完整海报"
    },
    {
      "slug": "poster-mist-index",
      "name": "雾书",
      "en": "Mist Index",
      "type": "香氛品牌形象海报",
      "cover": "/assets/poster-collection/thumbs/D02-C.webp",
      "alt": "《雾书》完整海报"
    },
    {
      "slug": "poster-tea-terrace",
      "name": "一山一泡",
      "en": "Tea Terrace",
      "type": "冷泡茶品牌海报",
      "cover": "/assets/poster-collection/thumbs/D04-C.webp",
      "alt": "《一山一泡》完整海报"
    },
    {
      "slug": "poster-folded-blocks",
      "name": "折叠街区",
      "en": "Folded Blocks",
      "type": "城市纸建筑展海报",
      "cover": "/assets/poster-collection/thumbs/D15-2.webp",
      "alt": "《折叠街区》完整海报"
    },
    {
      "slug": "poster-jasmine-soda",
      "name": "茉莉青提气泡茶",
      "en": "Jasmine Grape Soda",
      "type": "餐饮门店插画海报",
      "cover": "/assets/poster-collection/thumbs/F01-T1.webp",
      "alt": "《茉莉青提气泡茶》完整海报"
    },
    {
      "slug": "poster-red-bean",
      "name": "陈皮红豆沙",
      "en": "Red Bean & Tangerine Peel",
      "type": "餐饮门店插画海报",
      "cover": "/assets/poster-collection/thumbs/F04-1.webp",
      "alt": "《陈皮红豆沙》完整海报"
    },
    {
      "slug": "poster-orange-drip",
      "name": "冰滴咖啡加橙",
      "en": "Orange Ice Drip",
      "type": "餐饮门店插画海报",
      "cover": "/assets/poster-collection/thumbs/F05-1.webp",
      "alt": "《冰滴咖啡加橙》完整海报"
    },
    {
      "slug": "poster-green-pepper-fish",
      "name": "藤椒酸菜鱼",
      "en": "Green Peppercorn Fish",
      "type": "餐饮门店插画海报",
      "cover": "/assets/poster-collection/thumbs/F09-1.webp",
      "alt": "《藤椒酸菜鱼》完整海报"
    },
    {
      "slug": "poster-shrimp-buns",
      "name": "虾仁生煎",
      "en": "Pan-Fried Shrimp Buns",
      "type": "餐饮门店插画海报",
      "cover": "/assets/poster-collection/thumbs/F10-1.webp",
      "alt": "《虾仁生煎》完整海报"
    },
    {
      "slug": "poster-mushroom-noodles",
      "name": "云南菌菇米线",
      "en": "Yunnan Mushroom Noodles",
      "type": "餐饮门店插画海报",
      "cover": "/assets/poster-collection/thumbs/F12-1.webp",
      "alt": "《云南菌菇米线》完整海报"
    },
    {
      "slug": "poster-pineapple-pork",
      "name": "菠萝咕咾肉",
      "en": "Pineapple Sweet & Sour Pork",
      "type": "餐饮门店插画海报",
      "cover": "/assets/poster-collection/thumbs/F14-1.webp",
      "alt": "《菠萝咕咾肉》完整海报"
    },
    {
      "slug": "poster-lotus-crisps",
      "name": "椒盐藕片",
      "en": "Salt & Pepper Lotus Crisps",
      "type": "餐饮门店插画海报",
      "cover": "/assets/poster-collection/thumbs/F15-1.webp",
      "alt": "《椒盐藕片》完整海报"
    }
  ];
  const projects = cases.posters.projects;
  const existing = new Set(projects.map(project => project.slug));
  projects.push(...additions.filter(project => !existing.has(project.slug)));
})();
