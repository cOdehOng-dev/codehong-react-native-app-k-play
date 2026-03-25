import axios from 'axios';
import { BASE_URL } from '../../domain/consts';

export const kopisApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10초 타임아웃
});
