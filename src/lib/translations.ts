import type { Language } from "@/types";

export const translations = {
  nav_focus: { en: "Focus", hi: "ध्यान", ja: "集中", es: "Enfoque", ko: "집중", zh: "专注" },
  nav_timeline: { en: "Timeline", hi: "टाइमलाइन", ja: "タイムライン", es: "Cronología", ko: "타임라인", zh: "时间线" },
  nav_profile: { en: "Profile", hi: "प्रोफ़ाइल", ja: "プロフィール", es: "Perfil", ko: "프로필", zh: "个人资料" },

  timer_start: { en: "Start Session", hi: "सत्र शुरू करें", ja: "セッション開始", es: "Iniciar sesión", ko: "세션 시작", zh: "开始专注" },
  timer_pause: { en: "Pause", hi: "रोकें", ja: "一時停止", es: "Pausar", ko: "일시정지", zh: "暂停" },
  timer_resume: { en: "Resume", hi: "फिर शुरू करें", ja: "再開", es: "Reanudar", ko: "재개", zh: "继续" },
  timer_give_up: { en: "Give Up", hi: "छोड़ दें", ja: "あきらめる", es: "Rendirse", ko: "포기", zh: "放弃" },
  timer_new_session: { en: "New Session", hi: "नया सत्र", ja: "新しいセッション", es: "Nueva sesión", ko: "새 세션", zh: "新会话" },
  timer_tree_grew: { en: "Your tree grew! 🌿", hi: "आपका पेड़ बड़ा हो गया! 🌿", ja: "木が成長しました！ 🌿", es: "¡Tu árbol creció! 🌿", ko: "나무가 자랐어요! 🌿", zh: "你的树长大了！ 🌿" },
  timer_wonderful_session: { en: "Wonderful session. Your forest is growing.", hi: "शानदार सत्र। आपका जंगल बढ़ रहा है।", ja: "素晴らしいセッションでした。あなたの森が育っています。", es: "Sesión maravillosa. Tu bosque está creciendo.", ko: "멋진 세션이었습니다. 당신의 숲이 자라고 있습니다.", zh: "美妙的专注。你的森林正在生长。" },
  timer_rain_on: { en: "Rain sounds on", hi: "बारिश की आवाज़ चालू", ja: "雨の音オン", es: "Sonidos de lluvia activados", ko: "빗소리 켜짐", zh: "雨声开启" },
  timer_rain_off: { en: "Rain sounds off", hi: "बारिश की आवाज़ बंद", ja: "雨の音オフ", es: "Sonidos de lluvia desactivados", ko: "빗소리 꺼짐", zh: "雨声关闭" },

  status_ready: { en: "Ready", hi: "तैयार", ja: "準備完了", es: "Listo", ko: "준비됨", zh: "准备就绪" },
  status_focusing: { en: "Focusing", hi: "ध्यान केंद्रित कर रहे हैं", ja: "集中しています", es: "Enfocando", ko: "집중하는 중", zh: "专注中" },
  status_paused: { en: "Paused", hi: "रुका हुआ", ja: "一時停止中", es: "Pausado", ko: "일시정지됨", zh: "已暂停" },
  status_complete: { en: "Complete ✦", hi: "पूरा हुआ ✦", ja: "完了 ✦", es: "Completado ✦", ko: "완료 ✦", zh: "完成 ✦" },
  status_abandoned: { en: "Abandoned", hi: "छोड़ दिया गया", ja: "放棄されました", es: "Abandonado", ko: "포기됨", zh: "已放弃" },

  tree_waiting: { en: "Waiting to grow…", hi: "बढ़ने का इंतज़ार…", ja: "成長を待っています…", es: "Esperando para crecer…", ko: "자라기를 기다리는 중…", zh: "等待生长…" },
  tree_sprouting: { en: "Just sprouting…", hi: "अभी अंकुरित हो रहा है…", ja: "発芽したばかり…", es: "Brotando…", ko: "막 싹트기 시작함…", zh: "刚刚发芽…" },
  tree_growing: { en: "Growing steadily…", hi: "लगातार बढ़ रहा है…", ja: "着実に成長しています…", es: "Creciendo constantemente…", ko: "꾸준히 자라는 중…", zh: "稳步生长…" },
  tree_almost: { en: "Almost there…", hi: "लगभग पूरा हो गया…", ja: "もう少し…", es: "Casi allí…", ko: "거의 다 옴…", zh: "马上就好…" },
  tree_fully_grown: { en: "Fully grown! 🌿", hi: "पूरी तरह से बढ़ गया! 🌿", ja: "完全に成長しました！ 🌿", es: "¡Completamente crecido! 🌿", ko: "완전히 자랐어요! 🌿", zh: "完全长大！ 🌿" },

  timeline_title: { en: "Your Timeline", hi: "आपकी टाइमलाइन", ja: "タイムライン", es: "Tu cronología", ko: "당신의 타임라인", zh: "你的时间线" },
  timeline_subtitle: { en: "Every session — completed and abandoned.", hi: "हर सत्र — पूरा हुआ और छोड़ा गया।", ja: "すべてのセッション — 完了と放棄。", es: "Cada sesión — completada y abandonada.", ko: "모든 세션 — 완료 및 포기됨.", zh: "每个会话 — 完成和放弃。" },
  stat_total_focus: { en: "Total Focus", hi: "कुल ध्यान", ja: "合計集中時間", es: "Enfoque total", ko: "총 집중 시간", zh: "总专注时间" },
  stat_trees_grown: { en: "Trees Grown", hi: "उगाए गए पेड़", ja: "育てた木", es: "Árboles crecidos", ko: "자란 나무", zh: "种植的树木" },
  stat_sessions: { en: "Sessions", hi: "सत्र", ja: "セッション", es: "Sesiones", ko: "세션", zh: "会话" },
  timeline_loading: { en: "Loading sessions…", hi: "सत्र लोड हो रहे हैं…", ja: "セッションを読み込んでいます…", es: "Cargando sesiones…", ko: "세션 로드 중…", zh: "正在加载会话…" },
  timeline_empty: { en: "No sessions yet. Start your first focus timer!", hi: "अभी तक कोई सत्र नहीं। अपना पहला फोकस टाइमर शुरू करें!", ja: "まだセッションがありません。最初のフォーカスタイマーを開始しましょう！", es: "Aún no hay sesiones. ¡Inicia tu primer temporizador de enfoque!", ko: "아직 세션이 없습니다. 첫 집중 타이머를 시작하세요!", zh: "暂无会话。开始你的第一个专注计时器吧！" },
  timeline_done: { en: "✦ Done", hi: "✦ पूरा हुआ", ja: "✦ 完了", es: "✦ Hecho", ko: "✦ 완료", zh: "✦ 完成" },

  profile_preferences: { en: "Preferences", hi: "प्राथमिकताएं", ja: "設定", es: "Preferencias", ko: "환경설정", zh: "偏好设置" },
  profile_country: { en: "Country", hi: "देश", ja: "国", es: "País", ko: "국가", zh: "国家" },
  profile_language: { en: "Language", hi: "भाषा", ja: "言語", es: "Idioma", ko: "언어", zh: "语言" },
  profile_save: { en: "Save Changes", hi: "बदलाव सहेजें", ja: "変更を保存", es: "Guardar cambios", ko: "변경 사항 저장", zh: "保存更改" },
  profile_saving: { en: "Saving…", hi: "सहेज रहा है…", ja: "保存中…", es: "Guardando…", ko: "저장 중…", zh: "保存中…" },
  profile_saved: { en: "✓ Saved successfully", hi: "✓ सफलतापूर्वक सहेजा गया", ja: "✓ 正常に保存されました", es: "✓ Guardado exitosamente", ko: "✓ 성공적으로 저장됨", zh: "✓ 保存成功" },
  profile_signout: { en: "Sign out", hi: "साइन आउट करें", ja: "サインアウト", es: "Cerrar sesión", ko: "로그아웃", zh: "退出登录" },
  
  preset_best: { en: "✦ Best", hi: "✦ बेहतरीन", ja: "✦ ベスト", es: "✦ Mejor", ko: "✦ 최고", zh: "✦ 最佳" },
  preset_group_aria: { en: "Preset durations", hi: "पूर्व निर्धारित अवधियां", ja: "プリセット期間", es: "Duraciones preestablecidas", ko: "사전 설정된 기간", zh: "预设时长" }
};

export type TranslationKey = keyof typeof translations;
