const cases = {
  packaging: {
    number: '01', name: '包装设计', en: 'Packaging Design', next: 'branding', nextName: '品牌设计',
    intro: '灵感开盒，好戏登场。',
    projectNote: '设计图与已有品牌资料已收录；项目职责和更多过程资料待补。',
    evidence: ['包装原稿与准确文字', '成品照片或渲染图', '设计过程与版本取舍'],
    application: '包装正面、侧面、系列与实际展示场景',
    projects: [
      { slug: 'lumirose-atoll', name: 'LUMIROSE ATOLL 肤屿玫瑰', en: 'Skincare Packaging', type: '护肤系列包装设计', cover: '/assets/projects/lumirose-atoll/001.jpg', alt: 'LUMIROSE ATOLL 肤屿玫瑰粉色护肤系列包装' },
      { slug: 'hanging-coffee', name: 'Emotional Hanging Coffee', en: '挂耳咖啡', type: '包装设计效果图', cover: '/assets/projects/coffee-cover.lossless.webp', alt: '挂耳咖啡系列包装与杯装产品效果图' },
      { slug: 'craft-beer', name: '巨喜 JU XI｜绵酿奇遇', en: 'JU XI · Craft Beer Series', type: '系列包装设计', cover: '/assets/projects/juxi/001.lossless.webp', alt: '巨喜 JU XI 绵酿奇遇系列封面，小羊的果味精酿之旅' },
      { slug: 'cloud-chanson', name: '云端香颂', en: 'Celestial Chantelle', type: '系列香氛包装设计', cover: '/assets/projects/cloud-chanson/preview/001.webp', alt: '云端香颂梅兰竹菊系列香氛包装全景' }
    ]
  },
  branding: {
    number: '02', name: '品牌设计', en: 'Brand Identity', next: 'event-materials', nextName: '活动物料设计',
    intro: '从一个想法，到品牌登场。',
    evidence: ['品牌背景与设计目标', 'Logo 与视觉系统原稿', '品牌应用与过程资料'],
    application: '标志、色彩、字体、图形与真实应用触点',
    projects: [
      { slug: 'probiotic-lozenges', name: 'Probiotic Lozenges', en: 'Brand Identity', type: '品牌设计', cover: '/assets/projects/probiotic-lozenges/001.webp', alt: 'Probiotic Lozenges 品牌设计封面' },
      { slug: 'miaoxing-tea', name: '喵星茶事', en: 'Tea Brand Identity', type: '茶饮品牌形象设计', cover: '/assets/projects/miaoxing-tea/001.webp', alt: '喵星茶事猫咪吉祥物与茶饮品牌封面' },
      { slug: 'luminaere', name: 'LUMINAERE 雾光星眸', en: 'Brand Identity', type: '品牌视觉与包装设计', cover: '/assets/projects/luminaere/001.lossless.webp', alt: 'LUMINAERE 雾光星眸星辰系列美瞳礼盒品牌封面' },
      { slug: 'prismora', name: 'PRISMORA', en: 'Brand Identity', type: '品牌视觉与系列应用', cover: '/assets/projects/prismora-cover.webp', alt: 'PRISMORA 系列包装并列展示的效果图' },
      { slug: 'voyager-coffee', name: 'VOYAGER COFFEE ROASTERS', en: 'Brand Identity', type: '咖啡品牌与包装设计', cover: '/assets/projects/voyager-coffee/001.webp', alt: 'VOYAGER COFFEE ROASTERS 黑白咖啡品牌包装' }
    ]
  },
  'event-materials': {
    number: '03', name: '活动物料设计', en: 'Event Materials', next: 'illustration', nextName: '插画设计',
    intro: '让每个现场，都有高光。',
    evidence: ['活动背景与传播目标', '主视觉与各物料原稿', '现场照片与本人职责'],
    application: '海报、邀请物、指引、空间与数字传播物料',
    projects: [
      { slug: 'songshanhu-qingma', name: '松山湖青马班', en: 'Event Visual Design', type: '活动视觉与物料设计', cover: '/assets/projects/songshanhu-qingma/001.webp', alt: '松山湖青马班活动视觉设计方案' }
    ]
  },
  illustration: {
    number: '04', name: '插画设计', en: 'Illustration', next: 'posters', nextName: '海报设计',
    intro: '把想象，画成一场展。',
    evidence: ['创作主题与用途', '草图与完整原稿', '系列及应用场景'],
    application: '完整插画、局部细节、不同媒介的应用',
    projectNote: '城市记忆与四季诗意，在插画中展开。',
    projects: [{ slug: 'guanyi-blossoms', name: '莞邑花开｜东莞城市符号插画展', en: 'Illustration Exhibition', type: '插画与展览视觉设计', cover: '/assets/projects/guanyi-blossoms/001.webp', alt: '莞邑花开 东莞城市符号插画展展览设计方案封面' }, { slug: 'tianjingsha', name: '天净沙文创', en: 'Seasonal Illustration', type: '四季插画与诗词文创', cover: '/assets/projects/tianjingsha/001.webp', alt: '白朴天净沙系列诗词文创礼盒封面' }, { slug: 'wanjiang-bookmarks', name: '万江党校文创书签', en: 'Cultural Bookmarks', type: '插画与文创设计', cover: '/assets/projects/wanjiang-bookmarks/cover.webp', alt: '万江印象书签礼盒设计方案封面' }]
  },
  posters: {
    number: '05', name: '海报设计', en: 'Poster Design', next: 'packaging', nextName: '包装设计',
    intro: '一张画面，亮出灵感。',
    evidence: ['设计主题与传播目标', '高清海报原稿', '系列关系与应用照片'],
    application: '单张海报、系列编排、印刷与场景呈现',
    projects: [
      { slug: 'bike8-asian-championship', name: '2024 年 bike8 亚洲锦标赛', en: 'bike8 Asian Championship', type: '赛事海报设计', cover: '/assets/projects/bike8-asian-championship/preview/001.webp', alt: 'bike8 亚洲锦标赛横版海报，骑手沿彩色赛道入弯' },
      { slug: 'graduation-exhibition-posters', name: '文化产业管理毕业设计展', en: 'Graduation Design Exhibition', type: '展览海报与开幕式展板', cover: '/assets/projects/graduation-exhibition-posters/preview/003.webp', alt: '「美美与共　虚实相生」横版展览海报，深蓝底色上的书法展题与龙舟' },
      { slug: 'lotus-in-bloom-posters', name: "菡萏吐秀", en: "Poster Variations", type: "同题海报方案", cover: '/assets/projects/lotus-in-bloom-posters/preview/001.webp', alt: "菡萏吐秀青绿版海报，黑色书法题字置于留白中央，琴与荷、书案和竹叶环绕四角。" },
      { slug: 'art-market-yiqu', name: "艺趣", en: "Market Poster", type: "文创市集海报", cover: '/assets/projects/art-market-yiqu/preview/001.webp', alt: "蓝色星空中，白色「艺趣」二字上下错落，右侧沿曲线竖排市集名称，左下列出活动时间和地点。" },
      { slug: 'womens-day-food-festival', name: "三八美食节", en: "Festival Posters", type: "美食节系列海报", cover: '/assets/projects/womens-day-food-festival/preview/001.webp', alt: "三八美食节活动海报，浅杏色底上排列粉色标题和糖果连饰，两侧的饮品、草莓与甜甜圈围住展讯。" },
      { slug: 'youth-graduation-season', name: "青春毕业季", en: "Graduation Poster", type: "毕业季海报", cover: '/assets/projects/youth-graduation-season/preview/001.webp', alt: "蓝天白云间写有「青春毕业季」，学士帽、沙漏和眼镜嵌进笔画，下方是人群抛起学士帽的剪影。" },
      { slug: 'arts-in-the-clouds', name: "艺从云集", en: "Market Poster", type: "文创市集海报", cover: '/assets/projects/arts-in-the-clouds/preview/001.webp', alt: "艺从云集市集海报，蓝色标题横跨粉色画面，飞机、热气球和左下方的悬浮街区围绕标题。" },
      { slug: 'centenary-art-poster', name: "奋斗百年添华彩　续写时代新征程", en: "Commemorative Poster", type: "纪念主题海报", cover: '/assets/projects/centenary-art-poster/preview/001.webp', alt: "两列红色题字沿左边展开，右侧的日轮、青山和长城向下延伸至华表与殿宇，右上标注1921与2021。" }
    ]
  }
};
