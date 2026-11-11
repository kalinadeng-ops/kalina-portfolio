const projects = {
  'voyager-coffee': {
    title: 'VOYAGER COFFEE ROASTERS', english: 'Brand Identity', category: '品牌设计', categoryKey: 'branding',
    type: '咖啡品牌与包装设计', cover: '/assets/projects/voyager-coffee/001.webp',
    coverAlt: 'VOYAGER COFFEE ROASTERS 黑白咖啡品牌包装展示',
    next: 'probiotic-lozenges', nextName: 'Probiotic Lozenges'
  },
  'hanging-coffee': {
    title: 'Emotional Hanging Coffee', english: '挂耳咖啡', category: '包装设计', categoryKey: 'packaging',
    type: '包装设计效果图', cover: '/assets/projects/coffee-cover.lossless.webp',
    coverAlt: '挂耳咖啡系列纸盒与杯装包装效果图',
    next: 'craft-beer', nextName: '巨喜 JU XI'
  },
  'craft-beer': {
    title: '巨喜 JU XI｜绵酿奇遇系列精酿啤酒', english: 'JU XI · Craft Beer Series', category: '包装设计', categoryKey: 'packaging',
    type: '系列包装效果图', cover: '/assets/projects/juxi/001.lossless.webp',
    coverAlt: '巨喜 JU XI 绵酿奇遇系列，小羊角色与五款风味主题封面',
    next: 'prismora', nextName: 'PRISMORA'
  },
  'probiotic-lozenges': {
    title: 'Probiotic Lozenges', english: 'Brand Identity', category: '品牌设计', categoryKey: 'branding',
    type: '品牌设计', cover: '/assets/projects/probiotic-lozenges/001.webp', coverAlt: 'Probiotic Lozenges 品牌设计封面',
    next: 'miaoxing-tea', nextName: '喵星茶事'
  },
  'miaoxing-tea': {
    title: '喵星茶事', english: 'Tea Brand Identity', category: '品牌设计', categoryKey: 'branding',
    type: '茶饮品牌形象设计', cover: '/assets/projects/miaoxing-tea/001.webp', coverAlt: '喵星茶事茶饮品牌设计封面，猫咪吉祥物与茶饮杯',
    next: 'luminaere', nextName: 'LUMINAERE 雾光星眸'
  },
  'guanyi-blossoms': {
    title: '莞邑花开｜东莞城市符号插画展', english: 'Illustration Exhibition', category: '插画设计', categoryKey: 'illustration',
    type: '插画与展览视觉设计', cover: '/assets/projects/guanyi-blossoms/001.webp', coverAlt: '莞邑花开 东莞城市符号插画展展览设计方案封面',
    next: 'tianjingsha', nextName: '天净沙文创'
  },
  tianjingsha: {
    title: '天净沙文创', english: 'Seasonal Illustration', category: '插画设计', categoryKey: 'illustration',
    type: '四季插画与诗词文创', cover: '/assets/projects/tianjingsha/001.webp', coverAlt: '白朴天净沙系列诗词文创礼盒设计封面，国潮纹样与花鸟插画',
    next: 'wanjiang-bookmarks', nextName: '万江党校文创书签'
  },
  'lumirose-atoll': {
    title: 'LUMIROSE ATOLL 肤屿玫瑰', english: 'Skincare Packaging', category: '包装设计', categoryKey: 'packaging',
    type: '护肤系列包装设计', cover: '/assets/projects/lumirose-atoll/001.jpg', coverAlt: 'LUMIROSE ATOLL 肤屿玫瑰粉色护肤系列包装与玫瑰场景',
    next: 'hanging-coffee', nextName: 'Emotional Hanging Coffee'
  },
  luminaere: {
    title: 'LUMINAERE 雾光星眸', english: 'Brand Identity', category: '品牌设计', categoryKey: 'branding',
    type: '品牌视觉与包装设计', cover: '/assets/projects/luminaere/001.lossless.webp', coverAlt: 'LUMINAERE 雾光星眸，星辰系列美瞳礼盒品牌封面',
    next: 'prismora', nextName: 'PRISMORA'
  },
  prismora: {
    title: 'PRISMORA', english: 'Brand Identity', category: '品牌设计', categoryKey: 'branding',
    type: '品牌视觉与系列应用', cover: '/assets/projects/prismora-cover.webp',
    coverAlt: 'PRISMORA 系列包装并列展示的效果图',
    next: 'voyager-coffee', nextName: 'VOYAGER COFFEE ROASTERS'
  }
};

const key = document.body.dataset.project;
const project = projects[key];
const root = document.getElementById('project-root');
if (root && project) {
  const groups = window.KALINA_PROJECT_GALLERY?.[key] ?? [];
  const imageCount = groups.reduce((count, group) => count + group.items.length, 1);
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  document.title = `${project.title}｜KALINA 作品集`;
  if (key === 'prismora' || key === 'hanging-coffee' || key === 'craft-beer' || key === 'luminaere' || key === 'lumirose-atoll' || key === 'tianjingsha' || key === 'miaoxing-tea' || key === 'probiotic-lozenges' || key === 'guanyi-blossoms' || key === 'voyager-coffee') {
    const exhibit = {"coffee":{"heading":"Emotional Hanging Coffee","kicker":"挂耳咖啡 · 包装设计","subtitle":"情绪可以被看见","note":"跟我一起，打开这包情绪。","number":"01","coverCaption":"系列包装总览","info":["挂耳咖啡（Emotional Hanging Coffee）以“情绪可以被看见”为创意核心，将不同心情化作鲜明的色彩、表情角色和带有语气的文字。大胆跳跃的包装画面，让每一包咖啡都像在表达一种当下的心声，也让冲泡咖啡成为一次轻松、坦率的自我对话。","有时候，心情比我们先开口。它可能是一句不服气的话、一个大大的问号，也可能是藏不住的惊叹。挂耳咖啡把这些情绪画成鲜亮的色块、会说话的眼睛和跳出来的标点，让包装上的每个角色都有自己的脾气。撕开一包，挂上杯沿，等咖啡慢慢滴落，也给此刻的自己一点时间：开心、烦躁、犹豫或倔强，都可以如实存在。一杯咖啡，一口情绪。","本项目以“情绪的视觉转译”为核心，将抽象的心理感受提炼为角色表情、标点符号和具有语气感的短句。设计采用高对比色彩与错位编排，强化情绪的即时感和画面张力；同时保持品牌标识与产品信息的清晰层级。通过统一的视觉规则延展至外盒、独立包装、罐身和手提袋，形成具有辨识度的系列包装体系。"],"film":{"duration":24,"poster":"/assets/emotional-hanging-coffee-film-poster.jpg","src":"/assets/emotional-hanging-coffee-film-1080p.mp4"},"labels":[["品牌介绍","BRAND INTRODUCTION"],["品牌故事","BRAND STORY"],["设计理念","DESIGN CONCEPT"]]},"beer":{"heading":"巨喜 JU XI","kicker":"小羊的果味精酿之旅 · 包装设计","subtitle":"绵酿奇遇系列精酿啤酒","note":"跟我一起，走进绵酿奇遇。","number":"02","coverCaption":"绵酿奇遇 · 系列封面","info":["巨喜「绵酿奇遇」系列精酿啤酒，以五种特色风味为灵感，推出石榴茉莉、冰冻酸奶、甜心芭乐、黄油凤梨及冰镇可乐五款产品。采用1L罐装与配套礼盒设计，满足日常饮用、社交分享及礼赠需求。","以可爱治愈的羊咪IP为核心，将不同风味与角色形象相结合，通过专属服饰、道具及水果元素展现产品特色。采用清新马卡龙配色与立体3D插画，营造年轻、活泼且富有趣味性的视觉氛围。","以「统一风格、差异化表达」为原则，统一字体、版式结构与IP形象风格，通过五种主题色彩及不同角色造型区分产品口味，并延展至罐身与礼盒包装，形成协调且具有品牌辨识度的系列视觉体系。"],"film":null,"labels":[["产品介绍","PRODUCT INTRODUCTION"],["设计理念","DESIGN CONCEPT"],["系列视觉统一性","SERIES VISUAL CONSISTENCY"]]},"luminaere":{"heading":"LUMINAERE","kicker":"雾光星眸 · 品牌设计","subtitle":"眼中之光，恰如银河","note":"跟我一起，走进雾光星眸。","number":"01","discipline":"BRAND IDENTITY","coverCaption":"雾光星眸 · 星辰系列美瞳礼盒","noFilm":true,"film":null,"labels":[["品牌介绍","BRAND INTRODUCTION"],["品牌故事","BRAND STORY"],["设计理念","DESIGN CONCEPT"]],"info":["LUMINAERE 雾光星眸为软性亲水接触镜品牌。本项目展示星辰系列美瞳礼盒的品牌标识、视觉系统及包装应用。","以银河为灵感，Luminaere将宇宙中的晨雾、星云、极光化为可佩戴的「眼中之光」，用科技复刻自然光晕的诗意流动。每一片美瞳都是精密计算与感性美学的结合，在虹膜上演绎星际浪漫，让佩戴者成为自我宇宙的发光体。","【LUMINAERE雾光星眸】以“眼中之光，恰如银河”为概念，将镜片的柔润通透转化为雾化光晕、星点与粉紫渐变。包装以品牌、系列和产品参数建立清晰的信息层级，并用统一的视觉语言串联四个系列、单盒与礼盒，呈现从产品识别到赠礼场景的完整品牌体验。"]},"lumirose-atoll":{"heading":"LUMIROSE ATOLL","kicker":"肤屿玫瑰 · 包装设计","subtitle":"敏感肌的自愈群岛","note":"跟我一起，走进肤屿玫瑰。","number":"03","coverCaption":"肤屿玫瑰 · 系列包装组合","noFilm":true,"film":null,"labels":[["品牌介绍","BRAND INTRODUCTION"],["品牌理念","BRAND CONCEPT"],["视觉呈现","VISUAL DESIGN"]],"info":["LUMIROSE ATOLL 肤屿玫瑰，以玫瑰与环礁岛屿为品牌意象的护肤系列包装。本项目展示安瓶、面霜、滴管瓶及配套外盒的包装视觉与系列场景。","以“敏感不是缺陷，而是肌肤觉醒的潮汐信号”为品牌理念，用环礁、玫瑰与潮汐构建“肌肤生态岛”的叙事意象，传达温和呵护与自我修护的品牌愿景。","粉色渐变与玫瑰图形贯穿瓶身及外盒，植物、光影与水面共同构成包装展示场景。一致的品牌标识与配色连接安瓶、面霜、滴管瓶及系列组合，保持不同包装形式之间的视觉连续性。"]},"tianjingsha":{"heading":"天净沙文创","kicker":"白朴《天净沙》四季诗词 · 插画设计","subtitle":"寓情于景，绘景抒情","note":"跟我一起，走进诗中的四季。","number":"01","discipline":"ILLUSTRATION","coverCaption":"白朴《天净沙》系列 · 诗词文创礼盒","noFilm":true,"film":null,"labels":[["项目介绍","PROJECT INTRODUCTION"],["设计理念","DESIGN CONCEPT"],["文创延展","CULTURAL APPLICATIONS"]],"info":["本套文创礼盒设计以白朴《天净沙》四首小令为灵感，围绕诗中描绘的春、夏、秋、冬四季之景展开插画创作，并延伸至系列文创产品，将诗词意境融入日常使用场景。","提取诗中具有代表性的景物元素，以国潮风格再现四季之景。通过花鸟、植物、建筑、人物与山水的组合，连接传统诗词之美与现代插画表达，寓情于景，绘景抒情。","四季主视觉延伸至杯垫、徽章、帆布袋、便利贴、鼠标垫、信封、信纸、U盘、书签及邮票等文创设计，以统一的系列插画连接不同载体，让诗中的四季进入生活。"]},"miaoxing-tea":{"heading":"喵星茶事","kicker":"猫咪与茶饮的相遇 · 品牌设计","subtitle":"一家可爱的奶茶店","note":"跟我一起，走进喵星茶事。","number":"02","discipline":"BRAND IDENTITY","coverCaption":"喵星茶事 · 茶饮品牌设计","noFilm":true,"film":null,"labels":[["品牌介绍","BRAND INTRODUCTION"],["设计理念","DESIGN CONCEPT"],["品牌应用","BRAND APPLICATIONS"]],"info":["喵星茶事将猫咪文化与茶饮文化相结合，构建可爱、轻松的“吸猫茶室”品牌形象。以“一家可爱的奶茶店，一群可爱的猫咪，一群可爱的人，在喝可爱的饮品”为品牌表达，营造亲切而有趣的茶饮氛围。","整体采用高饱和度、高明度的MBE设计风格，在描边图形中加入间断线条处理，增强画面的呼吸感。通过明亮的配色、圆润的猫咪形象与活泼的装饰图形，呈现生动可爱的品牌视觉。","设计围绕猫咪吉祥物展开，延伸至周边产品、不同类型茶饮的包装，以及店内活动和产品宣传海报。以统一的角色形象、配色与图形元素连接各类品牌触点，形成系列化的品牌应用。"]},"probiotic-lozenges":{"heading":"Probiotic Lozenges","kicker":"品牌设计","subtitle":"Brand Identity","note":"跟我一起，看看这组设计。","number":"03","discipline":"BRAND IDENTITY","coverCaption":"Probiotic Lozenges · 品牌设计封面","noFilm":true,"film":null,"labels":[["项目概述","PROJECT OVERVIEW"],["设计策略","DESIGN STRATEGY"],["视觉体系与应用","VISUAL SYSTEM & APPLICATIONS"]],"info":["本项目围绕益生菌含片糖果，构建兼具品类识别与口味区分的系列包装。以鲜明配色和模块化图形呈现轻松、活泼的产品气质，将统一视觉语言延展至盒装与圆罐等不同包装形态，形成协调的系列包装体系。","设计以活力、趣味与易识别为表达方向，将几何图形与拟人化双眼组合成可延展的视觉模块。通过高对比配色和疏密交替的图形节奏强化记忆点，同时保留清晰的白色信息区，在视觉吸引力与产品阅读效率之间建立平衡。","系列采用“图形主视觉＋产品信息”的上下分区，以中英文品名、口味标签和规格信息建立稳定层级。不同口味沿用同一网格规则，通过主色与核心图形变化形成区分，并适配包装正面、盒体侧面及罐身环绕的不同阅读方式。"]},"guanyi-blossoms":{"heading":"莞邑花开","kicker":"城市文化的插画表达 · 插画设计","subtitle":"东莞城市符号插画展 · 展览设计方案","note":"跟我一起，发现城市里的灵感。","number":"02","discipline":"ILLUSTRATION","coverCaption":"莞邑花开 · 展览设计方案封面","noFilm":true,"film":null,"labels":[["项目介绍","PROJECT INTRODUCTION"],["设计理念","DESIGN CONCEPT"],["展览视觉体系","EXHIBITION VISUAL SYSTEM"]],"info":["「莞邑花开」东莞城市符号插画展以东莞的城市文化为创作主题，将城市记忆转化为插画语言。本项目为展览设计方案，围绕城市符号展开主视觉、宣传物料、导视、空间效果图与文创应用的整体设计。","以插画艺术对东莞城市符号进行「有形转有形」的视觉语言转化，将艺术、文化与空间相结合。画面采用扁平风格与分镜插画组合，选取纽带雕塑、玉兰花、虎门大桥、龙舟、金鳌洲塔等城市元素，以明艳活泼的色彩呈现轻松有趣的视觉效果。","以统一的主视觉、标准色彩和城市插画贯穿展览各类触点，延展至海报、门票、证件、导视、展区地图及互动打卡装置，并通过空间效果图呈现应用方式。明信片、台历与徽章等文创设计进一步连接展览主题与日常生活。"]},"prismora":{"heading":"PRISMORA","kicker":"品牌视觉与系列应用","subtitle":"Brand Identity","note":"跟我一起，看看这组品牌设计。","number":"04","discipline":"BRAND IDENTITY","coverCaption":"PRISMORA · 品牌视觉与系列应用","noFilm":true,"film":null,"labels":[["项目概述","PROJECT OVERVIEW"],["设计策略","DESIGN STRATEGY"],["视觉体系与应用","VISUAL SYSTEM & APPLICATIONS"]],"info":["本项目围绕 PRISMORA 香氛系列展开品牌视觉与包装设计，以“分一束光，藏万卷香”为表达线索，将月夜睡莲、星林白鹿、晨光樱花与金色麦田转化为四组视觉主题，并延展至扩香与香薰蜡烛的包装呈现。","以香气的可视化表达为切入点，通过风景叙事建立不同款式的情绪联想，再以分区色彩强化系列识别。在统一的标识与版式框架内保留插画差异，兼顾产品区分、信息阅读与跨包装形式的延展。","以斜体字标、油画感笔触、星芒符号与细线分隔构成共同语言，利用大幅插画、系列名称和说明文字建立阅读层级。长盒、方盒与蜡烛罐共享配色及图形规则，随包装比例调整布局，形成连贯的系列应用。"]},"voyager-coffee":{"heading":"VOYAGER COFFEE ROASTERS","kicker":"咖啡品牌与包装设计","subtitle":"Brand Identity","note":"跟我一起，看看这组咖啡品牌设计。","number":"05","discipline":"BRAND IDENTITY","coverCaption":"VOYAGER COFFEE ROASTERS · 品牌设计封面","noFilm":true,"film":null,"labels":[["项目概述","PROJECT OVERVIEW"],["设计策略","DESIGN STRATEGY"],["视觉体系与应用","VISUAL SYSTEM & APPLICATIONS"]],"info":["VOYAGER COFFEE ROASTERS 围绕咖啡品牌识别与系列包装展开设计，以“风土本源、百年拼配、发酵实验室”构建三条产品线索，并延展至外盒、袋装与手提袋，形成以文字识别为核心的品牌呈现。","以“探索不同风味”串联产地、拼配与处理方式，将产品差异转化为系列架构。通过统一的品牌字标与可复用的信息分区，让品牌识别先于细节阅读，同时为不同系列保留清晰的表达位置。","采用克制的黑白关系，以粗体衬线字标、留白和细线分隔建立视觉秩序。将系列、产区、风味与规格按层级编排，并随包装比例调整模块位置与字号，保持品牌和产品信息的主次关系，兼顾辨识度与系列延展。"]}}[{'hanging-coffee':'coffee','craft-beer':'beer'}[key] || key];
    const slides = [
      { src: project.cover, alt: project.coverAlt, caption: exhibit.coverCaption },
      ...groups.flatMap(group => group.items)
    ];
    root.innerHTML = window.kalinaSiteHTML(`
      <div class="coffee-top-band">
        <div class="coffee-top-scenery" aria-hidden="true"><i class="coffee-orbit"></i><i class="coffee-bubble coffee-bubble-one"></i><i class="coffee-bubble coffee-bubble-two"></i><i class="coffee-spark coffee-spark-one"></i><i class="coffee-spark coffee-spark-two"></i></div>
        <section class="project-top coffee-top">
        <div class="project-topline"><a href="/work/${project.categoryKey}/">← 返回${project.category}</a><span>${exhibit.discipline || 'PACKAGING DESIGN'} / ${exhibit.number}</span></div>
        <p class="project-kicker">${exhibit.kicker}</p>
        <h1>${exhibit.heading}</h1>
        <p class="project-subtitle">${exhibit.subtitle}</p>
        <figure class="coffee-guide" data-ip-motion>
          <img class="ip-motion-poster" src="/assets/kalina-opening-poster-v4.png" alt="KALINA 画家 IP 举起画笔，为设计项目作介绍" width="480" height="480">
          <canvas class="ip-motion-canvas" width="480" height="480" role="img" aria-label="KALINA 画家 IP 挥动画笔、小跳并洒落星星的动画"></canvas>
          <video class="ip-motion-source" autoplay loop muted playsinline preload="metadata" aria-hidden="true" tabindex="-1"><source src="/assets/kalina-opening-rgb-alpha-v4.mp4" type="video/mp4"></video>
          <figcaption>${exhibit.note}<span aria-hidden="true">✦</span></figcaption>
          <span class="motion-sr-only" role="status" aria-live="polite">画家 IP 动画自动播放。</span>
        </figure>
        </section>
      </div>
      <section class="coffee-information" aria-labelledby="coffee-information-title">
        <div class="coffee-information-inner">
          <div class="coffee-information-heading"><span>ABOUT THE PROJECT / 01</span><div class="coffee-title-stack"><h2 id="coffee-information-title">项目资料</h2><small>Project Information</small></div></div>
          ${exhibit.info.map((text, index) => `<article class="coffee-information-row"><div class="coffee-information-label"><span>${String(index + 1).padStart(2, '0')} / ${String(exhibit.info.length).padStart(2, '0')}</span><h3>${exhibit.labels[index][0]}</h3><small>${exhibit.labels[index][1]}</small></div><p>${text}</p></article>`).join('')}
        </div>
      </section>
      <section class="coffee-design-gallery" aria-labelledby="coffee-gallery-title">
        <div class="coffee-design-inner">
          <div class="coffee-design-heading"><span>DESIGN GALLERY / ${slides.length} IMAGES</span><div class="coffee-title-stack"><h2 id="coffee-gallery-title">设计图</h2><small>Design Gallery</small></div><p>使用左右箭头切换图片，点击图片查看大图。</p></div>
          <div class="coffee-carousel" aria-roledescription="轮播图" aria-label="${project.title} 设计图">
            <div class="coffee-carousel-window"><div class="coffee-carousel-track">${slides.map((slide, index) => `<figure class="coffee-slide" aria-hidden="${index !== 0}"><a href="${slide.src}" target="_blank" rel="noopener" aria-label="查看第 ${index + 1} 张设计图大图" tabindex="${index === 0 ? 0 : -1}"><img src="${slide.src}" alt="${escapeHTML(index === 0 ? slide.alt : `${project.title}设计图：${slide.caption}`)}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async"></a></figure>`).join('')}</div></div>
            <button class="coffee-carousel-arrow coffee-carousel-prev" type="button" aria-label="上一张设计图"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4.5 4.1 21 12 4.5 19.9 10.2 12Z"/></svg></button>
            <button class="coffee-carousel-arrow coffee-carousel-next" type="button" aria-label="下一张设计图"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4.5 4.1 21 12 4.5 19.9 10.2 12Z"/></svg></button>
          </div>
          <div class="coffee-carousel-meta" aria-live="polite"><span class="coffee-carousel-count">01 / ${String(slides.length).padStart(2,'0')}</span></div>
          ${exhibit.noFilm ? '' : `<section class="coffee-motion" aria-labelledby="coffee-motion-title">
            <div class="coffee-motion-heading"><span>MOTION FILM / ${exhibit.film ? exhibit.film.duration+' SEC' : 'COMING SOON'}</span><div class="coffee-title-stack"><h2 id="coffee-motion-title">品牌包装展示短片</h2><small>Brand Packaging Showcase Film</small></div><p>${exhibit.film ? '点击播放 · 含配乐' : '展示短片待补充'}</p></div>
            ${exhibit.film ? `<video class="coffee-motion-player" controls playsinline preload="metadata" poster="${exhibit.film.poster}" aria-label="${project.title} 品牌包装展示短片"><source src="${exhibit.film.src}" type="video/mp4">浏览器无法播放时，<a href="${exhibit.film.src}">打开短片文件</a>。</video>` : '<div class="project-film-pending"><span aria-hidden="true">▷</span><p>绵酿奇遇，下一幕待续。</p><small>Packaging film coming soon</small></div>'}
          </section>`}
          <nav class="project-next" aria-label="项目导航"><a href="/work/${project.categoryKey}/">← ${project.category}目录</a><a href="/projects/${project.next}/">下一项目：${project.nextName} ↗</a></nav>
        </div>
      </section>
    `);

  } else {
    root.innerHTML = window.kalinaSiteHTML(`
    <section class="project-top">
      <div class="project-topline"><a href="/work/${project.categoryKey}/">← 返回${project.category}</a><span>${project.english.toUpperCase()}</span></div>
      <p class="project-kicker">${project.type}</p>
      <h1>${project.title}</h1>
      <p class="project-subtitle">${project.english}</p>
    </section>
    <figure class="project-cover"><a href="${project.cover}" target="_blank" rel="noopener" aria-label="查看${project.title}封面原图"><img src="${project.cover}" alt="${project.coverAlt}" fetchpriority="high"></a><figcaption>01 / ${project.type} · 点击图片查看原始尺寸</figcaption></figure>
    <section class="project-gallery-section" aria-labelledby="gallery-title">
      <div class="project-gallery-inner"><div class="project-gallery-heading"><span>VISUAL GALLERY / ${imageCount} IMAGES</span><h2 id="gallery-title">视觉呈现</h2><p>收录 ${imageCount} 张作品图。点击图片查看大图；保留原有画面与包装文字。</p></div>
      ${groups.map((group, groupIndex) => `<section class="project-gallery-group" aria-labelledby="gallery-group-${groupIndex}"><div class="project-gallery-group-heading"><h3 id="gallery-group-${groupIndex}">${escapeHTML(group.title)}</h3><span>${group.items.length} 张</span></div><div class="project-gallery-grid">${group.items.map((item, index) => `<figure class="project-visual"><a href="${item.src}" target="_blank" rel="noopener" aria-label="查看${escapeHTML(item.caption)}大图"><img src="${item.src}" alt="${escapeHTML(item.alt)}" loading="lazy" decoding="async"></a><figcaption>${String(index + 1).padStart(2, '0')} / ${escapeHTML(item.caption)}</figcaption></figure>`).join('')}</div></section>`).join('')}
      <div class="project-information"><h2>项目资料</h2><p>项目背景、本人职责、设计过程及成果信息待补充与核对。</p></div>
      <nav class="project-next" aria-label="项目导航"><a href="/work/${project.categoryKey}/">← ${project.category}目录</a><a href="/projects/${project.next}/">下一项目：${project.nextName} ↗</a></nav>
      </div>
    </section>
  `);
  }
}
