import { KeywordMetric, SavedKeywordList } from '../types/seo';

const SAVED_LISTS_KEY = 'keynumbers_saved_lists';
const SEARCH_HISTORY_KEY = 'keynumbers_search_history';

export function getSavedLists(): SavedKeywordList[] {
  try {
    const raw = localStorage.getItem(SAVED_LISTS_KEY);
    if (!raw) {
      // Default initial list with high value sample terms
      const defaultList: SavedKeywordList[] = [
        {
          id: 'list-default',
          name: 'My Target Keywords',
          createdAt: new Date().toLocaleDateString(),
          keywords: [
            {
              id: 'kw-seo-tools',
              keyword: 'seo tools',
              volume: 74000,
              cpc: 9.40,
              difficulty: 78,
              intent: 'Commercial',
              competition: 0.74,
              trend: [],
              trendDirection: 'up',
              trendPercentage: 12,
            },
            {
              id: 'kw-keyword-research',
              keyword: 'keyword research',
              volume: 110000,
              cpc: 8.20,
              difficulty: 82,
              intent: 'Informational',
              competition: 0.78,
              trend: [],
              trendDirection: 'stable',
              trendPercentage: 3,
            },
            {
              id: 'kw-best-crm',
              keyword: 'best crm software',
              volume: 33100,
              cpc: 24.50,
              difficulty: 85,
              intent: 'Commercial',
              competition: 0.81,
              trend: [],
              trendDirection: 'up',
              trendPercentage: 8,
            },
          ],
        },
      ];
      localStorage.setItem(SAVED_LISTS_KEY, JSON.stringify(defaultList));
      return defaultList;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse saved lists', e);
    return [];
  }
}

export function saveList(list: SavedKeywordList): void {
  const lists = getSavedLists();
  const existingIdx = lists.findIndex(l => l.id === list.id);
  if (existingIdx >= 0) {
    lists[existingIdx] = list;
  } else {
    lists.push(list);
  }
  localStorage.setItem(SAVED_LISTS_KEY, JSON.stringify(lists));
}

export function addKeywordToList(listId: string, keyword: KeywordMetric): boolean {
  const lists = getSavedLists();
  const list = lists.find(l => l.id === listId);
  if (!list) return false;

  const exists = list.keywords.some(k => k.keyword.toLowerCase() === keyword.keyword.toLowerCase());
  if (!exists) {
    list.keywords.push(keyword);
    localStorage.setItem(SAVED_LISTS_KEY, JSON.stringify(lists));
    return true;
  }
  return false;
}

export function removeKeywordFromList(listId: string, keywordStr: string): void {
  const lists = getSavedLists();
  const list = lists.find(l => l.id === listId);
  if (!list) return;

  list.keywords = list.keywords.filter(k => k.keyword.toLowerCase() !== keywordStr.toLowerCase());
  localStorage.setItem(SAVED_LISTS_KEY, JSON.stringify(lists));
}

export function createNewList(name: string): SavedKeywordList {
  const lists = getSavedLists();
  const newList: SavedKeywordList = {
    id: `list-${Date.now()}`,
    name: name.trim() || 'Untitled List',
    createdAt: new Date().toLocaleDateString(),
    keywords: [],
  };
  lists.push(newList);
  localStorage.setItem(SAVED_LISTS_KEY, JSON.stringify(lists));
  return newList;
}

export function deleteList(listId: string): void {
  const lists = getSavedLists().filter(l => l.id !== listId);
  localStorage.setItem(SAVED_LISTS_KEY, JSON.stringify(lists));
}

export function getSearchHistory(): string[] {
  try {
    const raw = localStorage.getItem(SEARCH_HISTORY_KEY);
    return raw ? JSON.parse(raw) : ['seo tools', 'keyword research', 'running shoes', 'email marketing'];
  } catch {
    return [];
  }
}

export function addSearchHistory(keyword: string): void {
  try {
    const history = getSearchHistory().filter(k => k.toLowerCase() !== keyword.toLowerCase());
    history.unshift(keyword);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history.slice(0, 10)));
  } catch {}
}

/**
 * Universal export to CSV function
 */
export function exportKeywordsToCSV(keywords: KeywordMetric[], filename = 'keywords_export.csv'): void {
  const headers = ['Keyword', 'Search Volume', 'CPC (USD)', 'Difficulty (0-100)', 'Search Intent', 'Competition'];
  const rows = keywords.map(k => [
    `"${k.keyword.replace(/"/g, '""')}"`,
    k.volume,
    `$${k.cpc.toFixed(2)}`,
    k.difficulty,
    `"${k.intent}"`,
    k.competition,
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Universal export to JSON
 */
export function exportToJSON(data: unknown, filename = 'seo_data_export.json'): void {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Copy to clipboard with user feedback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
