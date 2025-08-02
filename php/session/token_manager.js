/**
 * JWT 토큰 관리자
 *
 * 이 스크립트는 클라이언트 사이드에서 JWT 토큰을 관리합니다.
 * 토큰 만료 시 자동으로 갱신하고, API 요청 시 토큰을 포함시킵니다.
 */

class TokenManager {
  constructor() {
    this.accessToken = null;
    this.refreshToken = null;
    this.isRefreshing = false;
    this.refreshPromise = null;

    this.init();
  }

  /**
   * 초기화
   */
  init() {
    // 쿠키에서 토큰 읽기
    this.accessToken = this.getCookie("access_token");
    this.refreshToken = this.getCookie("refresh_token");

    // 토큰 만료 체크 및 갱신
    this.checkTokenExpiration();

    // 주기적으로 토큰 상태 확인 (5분마다)
    setInterval(() => {
      this.checkTokenExpiration();
    }, 5 * 60 * 1000);
  }

  /**
   * 쿠키에서 값 읽기
   */
  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  /**
   * 토큰 만료 확인
   */
  checkTokenExpiration() {
    if (!this.accessToken) {
      this.redirectToLogin();
      return;
    }

    try {
      const payload = this.decodeToken(this.accessToken);
      const now = Math.floor(Date.now() / 1000);

      // 토큰이 5분 이내에 만료되면 갱신
      if (payload.exp && payload.exp - now < 300) {
        this.refreshAccessToken();
      }
    } catch (error) {
      console.error("Token validation error:", error);
      this.redirectToLogin();
    }
  }

  /**
   * JWT 토큰 디코딩 (검증 없이)
   */
  decodeToken(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error("Invalid token format");
    }
  }

  /**
   * 액세스 토큰 갱신
   */
  async refreshAccessToken() {
    if (this.isRefreshing) {
      return this.refreshPromise;
    }

    if (!this.refreshToken) {
      this.redirectToLogin();
      return;
    }

    this.isRefreshing = true;
    this.refreshPromise = this.performRefresh();

    try {
      await this.refreshPromise;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  /**
   * 실제 토큰 갱신 요청 수행
   */
  async performRefresh() {
    try {
      const response = await fetch("JWT_Manager.php?action=refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh_token: this.refreshToken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        this.accessToken = data.access_token;
        console.log("Token refreshed successfully");
      } else {
        console.error("Token refresh failed:", data.error);
        this.redirectToLogin();
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      this.redirectToLogin();
    }
  }

  /**
   * API 요청에 토큰 포함
   */
  async fetchWithToken(url, options = {}) {
    // 토큰 만료 확인
    await this.checkTokenExpiration();

    // 헤더에 토큰 추가
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.accessToken) {
      headers["Authorization"] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // 401 에러 시 토큰 갱신 시도
    if (response.status === 401) {
      await this.refreshAccessToken();

      if (this.accessToken) {
        headers["Authorization"] = `Bearer ${this.accessToken}`;
        return fetch(url, {
          ...options,
          headers,
        });
      }
    }

    return response;
  }

  /**
   * 로그인 페이지로 리다이렉트
   */
  redirectToLogin() {
    // 모든 토큰 쿠키 삭제
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // 로그인 페이지로 이동
    window.location.href = "auth_manager.php?error=token_expired";
  }

  /**
   * 현재 액세스 토큰 반환
   */
  getAccessToken() {
    return this.accessToken;
  }

  /**
   * 로그아웃
   */
  logout() {
    this.accessToken = null;
    this.refreshToken = null;
    this.redirectToLogin();
  }
}

// 전역 인스턴스 생성
const tokenManager = new TokenManager();

// 전역 함수로 노출
window.tokenManager = tokenManager;
