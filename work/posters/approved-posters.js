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
    "en": "GUKA · Crunch",
    "type": "谷咔 GUKA · 海苔米脆",
    "cover": "/assets/poster-collection/thumbs/D01-2.webp?v=1a73c943cc5d",
    "alt": "谷咔 GUKA《脆响》海苔米脆海报"
  },
  {
    "slug": "poster-mist-index",
    "name": "闻序 · 雾书",
    "en": "WENXU · Mist Index",
    "type": "闻序 WENXU · 白茶香氛",
    "cover": "/assets/poster-collection/thumbs/D02-C.webp?v=943702839d1e",
    "alt": "闻序 WENXU品牌版完整海报"
  },
  {
    "slug": "poster-tea-terrace",
    "name": "青岚 · 一山一泡",
    "en": "QINGLAN · Tea Terrace",
    "type": "青岚 QINGLAN · 冷泡茶",
    "cover": "/assets/poster-collection/thumbs/D04-C.webp?v=b794d839fc6d",
    "alt": "青岚 QINGLAN品牌版完整海报"
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
    "type": "青隙茶铺 · 茶饮海报",
    "cover": "/assets/poster-collection/food-seven-v1/01-jasmine/thumb.webp?v=489703ffdf10",
    "alt": "青隙茶铺 · 茶饮海报完整海报"
  },
  {
    "slug": "poster-red-bean",
    "name": "陈皮红豆沙",
    "en": "Red Bean & Tangerine Peel",
    "type": "巷口糖房 · 糖水海报",
    "cover": "/assets/poster-collection/food-seven-v1/04-red-bean/thumb.webp?v=4ee19826b143",
    "alt": "巷口糖房 · 糖水海报完整海报"
  },
  {
    "slug": "poster-orange-drip",
    "name": "冰滴咖啡加橙",
    "en": "Orange Ice Drip",
    "type": "刻度咖啡 · 咖啡馆海报",
    "cover": "/assets/poster-collection/food-seven-v1/05-orange-drip/thumb.webp?v=7b672729dd42",
    "alt": "刻度咖啡 · 咖啡馆海报完整海报"
  },
  {
    "slug": "poster-green-pepper-fish",
    "name": "藤椒酸菜鱼",
    "en": "Green Peppercorn Fish",
    "type": "青麻里 · 单人锅海报",
    "cover": "/assets/poster-collection/food-seven-v1/09-pepper-fish/thumb.webp?v=9135ab04f87a",
    "alt": "青麻里 · 单人锅海报完整海报"
  },
  {
    "slug": "poster-shrimp-buns",
    "name": "虾仁生煎",
    "en": "Pan-Fried Shrimp Buns",
    "type": "圆底生煎社 · 小吃海报",
    "cover": "/assets/poster-collection/food-seven-v1/10-shrimp-buns/thumb.webp?v=9f730770c346",
    "alt": "圆底生煎社 · 小吃海报完整海报"
  },
  {
    "slug": "poster-mushroom-noodles",
    "name": "云南菌菇米线",
    "en": "Yunnan Mushroom Noodles",
    "type": "山箩米线 · 面馆海报",
    "cover": "/assets/poster-collection/food-seven-v1/12-mushroom-noodles/thumb.webp?v=fe0efbf5ac35",
    "alt": "山箩米线 · 面馆海报完整海报"
  },
  {
    "slug": "poster-pineapple-pork",
    "name": "菠萝咕咾肉",
    "en": "Pineapple Sweet & Sour Pork",
    "type": "满镬饭铺 · 菠萝咕咾肉",
    "cover": "/assets/poster-collection/pineapple-brand-v1/thumb.webp?v=f64bc1386e50",
    "alt": "满镬饭铺酸甜来电海报，暖米白与深叶绿配色"
  },
  {
    "slug": "poster-lotus-crisps",
    "name": "椒盐藕片",
    "en": "Salt & Pepper Lotus Crisps",
    "type": "响摊 · 炸物海报",
    "cover": "/assets/poster-collection/food-seven-v1/15-lotus-crisps/thumb.webp?v=174bd76922e0",
    "alt": "响摊 · 炸物海报完整海报"
  }
];
  const projects = cases.posters.projects;
  const existing = new Set(projects.map(project => project.slug));
  projects.push(...additions.filter(project => !existing.has(project.slug)));
})();
