// GA4 이벤트 전송 — GA_ID 가 비어 있으면(gtag 미로드) 아무 일도 하지 않음

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** 노션 링크 클릭 → GA4 "notion_click" 이벤트. location 으로 어디서 눌렀는지 구분 */
export function trackNotionClick(location: string) {
  window.gtag?.("event", "notion_click", { link_location: location });
}
