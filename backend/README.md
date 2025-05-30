# 초기 세팅 하는 방법

backend 폴더 들어가서 npm i

.env 파일 만들고 설정하기
-> 노션에 올려두겠음. 공유 유출 절대 금지!!

컴퓨터에 mysql 설치하기
(구글링하면 방법 나옴)

npm run db:create
-> database 생성됨

npm run start:dev
-> 지금까지 짠 코드가 localhost:3095에서 돌아감

## Google OAuth Configuration

To enable "Sign in with Google", you need to configure the following environment variables in your `.env` file:

-   `GOOGLE_CLIENT_ID`: Your Google Cloud Project OAuth 2.0 Client ID. This identifies your application to Google.
-   `GOOGLE_CLIENT_SECRET`: Your Google Cloud Project OAuth 2.0 Client Secret. This is a confidential secret used to authenticate your application.
-   `GOOGLE_CALLBACK_URL`: The URL where users are redirected after authenticating with Google. This URL must be registered in your Google Cloud Project's OAuth 2.0 client configuration.
    -   Example for local development: `http://localhost:3001/api/auth/google/callback`
    -   Example for production: `https://your-production-domain.com/api/auth/google/callback`

These credentials can be obtained by creating an OAuth 2.0 Client ID in the [Google Cloud Console](https://console.cloud.google.com/). Ensure that the "Google People API" (or similar, depending on the scopes requested by your application) is enabled for your project if you intend to retrieve detailed user profile information. The current implementation uses the `email` and `profile` scopes.
