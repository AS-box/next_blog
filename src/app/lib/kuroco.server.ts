// lib/kuroco.server.ts (サーバー専用)
import axios from 'axios';

const baseURL = process.env.NEXT_API_URL;

if (!baseURL) throw new Error('NEXT_API_URL is not defined');
if (!process.env.STATIC_TOKEN) {
  // getStaticProps / API routes の実行環境で必ず用意する
  console.warn('Warning: STATIC_TOKEN is not set');
}

export const kurocoServerClient = axios.create({
  baseURL: process.env.NEXT_API_URL,
  headers: {
    'x-rcms-api-access-token': process.env.STATIC_TOKEN
  }
});

export async function fetchPostsFromKuroco() {
  const res = await kurocoServerClient.get('/rcms-api/3/article/list'); // 実パスに合わせて変更
  return res.data;
}

export async function fetchPostFromKuroco(id:number) {
  const res = await kurocoServerClient.get(`/rcms-api/3/article/${id}`); // 実パスに合わせて変更
  return res.data;
}

export async function fetchCategoryFromKuroco() {
  const res = await kurocoServerClient.get('/rcms-api/3/category');
  return res.data;
}
