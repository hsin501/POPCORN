# POPCORN - 電影搜索與評分應用

## 描述

POPCORN 是一個基於 React 的單頁應用程序，允許用戶搜索電影、查看電影詳情，並為觀看過的電影進行評分。該應用程序提供了一個直觀的界面，用於探索電影資訊和管理個人觀影列表。

## 功能特點

- 電影搜索：用戶可以輸入關鍵字搜索電影
- 實時搜索結果：搜索結果會隨著用戶輸入即時更新
- 電影詳情展示：顯示電影的標題、海報、發行年份等信息
- 星級評分：用戶可以為電影評分（1-5 星）
- 觀影列表：用戶可以將電影添加到已觀看列表
- 觀影統計：顯示已觀看電影的數量和評分信息

## 安裝指南

1. 克隆倉庫：

   ```
   git clone https://github.com/your-username/use-popcorn.git
   ```

2. 進入項目目錄：

   ```
   cd use-popcorn
   ```

3. 安裝依賴：

   ```
   npm install
   ```

4. 啟動開發服務器：

   ```
   npm start
   ```

5. 在瀏覽器中打開 `http://localhost:3000` 查看應用

## 使用說明

1. 在搜索欄輸入電影名稱開始搜索
2. 瀏覽搜索結果，查看電影詳情
3. 點擊星級圖標為電影評分
4. 評分後，電影會自動添加到已觀看列表
5. 在右側面板查看已觀看電影列表和統計信息

## 檔案結構

## 組件

- `App`: 主應用組件，管理整體狀態和佈局
- `NavBar`: 導航欄組件，包含 Logo 和搜索功能
- `Main`: 主內容區域組件
- `Box`: 可折疊的容器組件
- `MovieList`: 電影列表組件
- `Movie`: 單個電影項組件
- `WatchedMoviesList`: 已觀看電影列表組件
- `WatchedMovie`: 已觀看的單個電影項組件
- `WatchedSummary`: 觀影統計摘要組件
- `StarRating`: 星級評分組件（在 StarRating.js 中定義）

## API

應用使用以下 API 端點進行電影搜索：

- `https://imdb.iamidiotareyoutoo.com/`

  ## 應用技術

- React
- CSS
- HTML
- JavaScript

## 未來拓展計劃

1. 用戶認證：實現用戶註冊和登錄功能，允許用戶在不同設備間同步他們的觀影列表和評分。
2. 社交功能：添加好友系統，允許用戶分享他們的觀影列表和評分，並查看朋友的評分。
3. 評論功能：允許用戶在觀看電影後添加自己的評論，並與其他用戶分享。
