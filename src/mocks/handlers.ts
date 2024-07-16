import { HttpResponse, http } from 'msw';
import { BASEURL } from '../constants/constants';
import image1 from '../assets/testImg/images.jpg';
import image2 from '../assets/testImg/images (1).jpg';
import image3 from '../assets/testImg/images (2).jpg';
import image4 from '../assets/testImg/images (3).jpg';
import image5 from '../assets/testImg/images (4).jpg';
import image6 from '../assets/testImg/images (5).jpg';
import image7 from '../assets/testImg/images (6).jpg';
import image8 from '../assets/testImg/images (7).jpg';
import image9 from '../assets/testImg/images (8).jpg';
import image10 from '../assets/testImg/images (9).jpg';
import image11 from '../assets/testImg/다운로드 (1).jpg';
import image12 from '../assets/testImg/다운로드.jpg';

type EmailFindRequestBody = {
  name: string;
  nickname: string;
};

type PasswordFindRequestBody = {
  name: string;
  nickname: string;
  email: string;
};

type LoginRequestBody = {
  email: string;
  password: string;
};

type EmailVerifyRequestBody = {
  email: string;
  code: string;
};

const postList = [
  {
    postId: 1,
    thumbnail: image1,
    SeasonTag: '봄',
    WeatherTag: ['흐림', '눈'],
    TempTag: ['쌀쌀해요', '추워'],
    likeByUser: true,
  },
  {
    postId: 2,
    thumbnail: image2,
    SeasonTag: '여름',
    WeatherTag: ['맑음', '비'],
    TempTag: ['더워요', '후덥지근해요'],
    likeByUser: false,
  },
  {
    postId: 3,
    thumbnail: image3,
    SeasonTag: '겨울',
    WeatherTag: ['눈', '바람'],
    TempTag: ['매우 추워요', '한파'],
    likeByUser: false,
  },
  {
    postId: 4,
    thumbnail: image4,
    SeasonTag: '봄',
    WeatherTag: ['맑음', '바람'],
    TempTag: ['포근해요', '따뜻해요'],
    likeByUser: true,
  },
  {
    postId: 5,
    thumbnail: image5,
    SeasonTag: '봄',
    WeatherTag: ['맑음', '바람'],
    TempTag: ['포근해요', '따뜻해요'],
    likeByUser: true,
  },
  {
    postId: 6,
    thumbnail: image6,
    SeasonTag: '봄',
    WeatherTag: ['맑음', '바람'],
    TempTag: ['포근해요', '따뜻해요'],
    likeByUser: true,
  },
  {
    postId: 7,
    thumbnail: image7,
    SeasonTag: '봄',
    WeatherTag: ['맑음', '바람'],
    TempTag: ['포근해요', '따뜻해요'],
    likeByUser: true,
  },
  {
    postId: 8,
    thumbnail: image8,
    SeasonTag: '봄',
    WeatherTag: ['맑음', '바람'],
    TempTag: ['포근해요', '따뜻해요'],
    likeByUser: true,
  },
  {
    postId: 9,
    thumbnail: image9,
    SeasonTag: '봄',
    WeatherTag: ['맑음', '바람'],
    TempTag: ['포근해요', '따뜻해요'],
    likeByUser: true,
  },
  {
    postId: 10,
    thumbnail: image10,
    SeasonTag: '봄',
    WeatherTag: ['맑음', '바람'],
    TempTag: ['포근해요', '따뜻해요'],
    likeByUser: true,
  },
  {
    postId: 11,
    thumbnail: image11,
    SeasonTag: '봄',
    WeatherTag: ['맑음', '바람'],
    TempTag: ['포근해요', '따뜻해요'],
    likeByUser: true,
  },
  {
    postId: 12,
    thumbnail: image12,
    SeasonTag: '봄',
    WeatherTag: ['맑음', '바람'],
    TempTag: ['포근해요', '따뜻해요'],
    likeByUser: true,
  },
];

export const handlers = [
  // 회원가입
  http.post(`${BASEURL}/api/v1/users/register`, async () => {
    return HttpResponse.json({
      success: true,
      message: '회원가입 완료',
    });
  }),
  // 이메일 인증
  http.post(`${BASEURL}/api/v1/email/send-verification`, async () => {
    return HttpResponse.json({
      success: true,
      message: '이메일로 코드를 발송하였습니다.',
    });
  }),
  // 이메일 발송성공
  http.post(`${BASEURL}/api/v1/email/verify-code`, async ({ request }) => {
    const result = (await request.json()) as EmailVerifyRequestBody;
    const email = result?.email;
    const code = result?.code;
    if (email === 'test123@naver.com' && code === '123456') {
      return HttpResponse.json(
        {
          success: true,
          message: '이메일 검증이 완료되었습니다',
        },
        { status: 200 },
      );
    } else {
      return HttpResponse.json(
        {
          errorCode: 'FAIL_EMAIL_VERIFICATION',
          errorMessage: '이메일 검증이 실패하였습니다.',
        },
        { status: 400 },
      );
    }
  }),
  //닉네임 중복확인
  http.get(`${BASEURL}/api/v1/users/nickname-check/:nickname`, async ({ request }) => {
    const url = new URL(request.url);
    const nickname = url.pathname.split('/').pop() as string;
    const existingNicknames = ['우승찬', '김양선', '박서연', ''];
    const isAvailable = !existingNicknames.includes(nickname);

    if (isAvailable) {
      return HttpResponse.json({
        isAvailable: true,
        message: '사용가능한 닉네임입니다.',
      });
    } else {
      return HttpResponse.json({
        isAvailable: false,
        message: '이미 사용 중인 닉네임입니다.',
      });
    }
  }),
  //이메일 찾기
  http.post(`${BASEURL}/api/v1/users/email`, async ({ request }) => {
    const result = (await request.json()) as EmailFindRequestBody;

    const name = result?.name;
    const nickname = result?.nickname;

    if (name === '우승찬' && nickname === '아이스베어') {
      return HttpResponse.json({
        email: 'test123@naver.com',
      });
    } else {
      return new HttpResponse(null, {
        status: 500,
        statusText: '일치하는 사용자가 없습니다.',
      });
    }
  }),
  //비밀번호 찾기
  http.post(`${BASEURL}/api/v1/users/password`, async ({ request }) => {
    const result = (await request.json()) as PasswordFindRequestBody;

    const email = result?.email;
    const name = result?.name;
    const nickname = result?.nickname;

    if (email === 'test123@naver.com' && name === '우승찬' && nickname === '아이스베어') {
      return new HttpResponse(
        JSON.stringify({
          success: true,
          message: '일치하는 계정이 있습니다.',
        }),
        {
          status: 200,
        },
      );
    } else {
      return new HttpResponse(null, {
        status: 400,
        statusText: '일치하는 계정이 없습니다.',
      });
    }
  }),
  // 로그인
  http.post(`${BASEURL}/api/v1/auth/login`, async ({ request }) => {
    const data = {
      accessToken: '12345',
      refreshToken: '1234',
    };

    const result = (await request.json()) as LoginRequestBody;

    const email = result?.email;
    const password = result?.password;

    if (email === 'test123@naver.com' && password === '123123123') {
      return new HttpResponse(JSON.stringify(data), {
        status: 200,
      });
    } else {
      return new HttpResponse(null, {
        status: 400,
        statusText: `login_faild`,
      });
    }
  }),
  // post
  http.get(`${BASEURL}/api/v1/posts`, async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const size = parseInt(url.searchParams.get('size') || '10', 10);
    const start = (page - 1) * size;
    const end = start + size;
    const paginatedPosts = postList.slice(start, end);

    return HttpResponse.json(paginatedPosts);
  }),
];
