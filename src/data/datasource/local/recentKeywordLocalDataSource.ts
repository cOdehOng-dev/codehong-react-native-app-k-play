import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  RECENT_KEYWORD_MAX_COUNT,
  RECENT_KEYWORD_STORAGE_KEY,
} from '../../../domain/consts';

export class RecentKeywordLocalDataSource {
  async getAll(): Promise<string[]> {
    const json = await AsyncStorage.getItem(RECENT_KEYWORD_STORAGE_KEY);
    return json ? (JSON.parse(json) as string[]) : [];
  }

  async save(keyword: string): Promise<string[]> {
    const prev = await this.getAll();

    const next = [keyword, ...prev.filter(k => k !== keyword)].slice(
      0,
      RECENT_KEYWORD_MAX_COUNT,
    );

    await AsyncStorage.setItem(
      RECENT_KEYWORD_STORAGE_KEY,
      JSON.stringify(next),
    );

    return next;
  }

  async remove(keyword: string): Promise<string[]> {
    const prev = await this.getAll();
    const next = prev.filter(k => k !== keyword);
    await AsyncStorage.setItem(
      RECENT_KEYWORD_STORAGE_KEY,
      JSON.stringify(next),
    );
    return next;
  }

  async clearAll(): Promise<void> {
    await AsyncStorage.removeItem(RECENT_KEYWORD_STORAGE_KEY);
  }
}
