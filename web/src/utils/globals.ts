import Entry from "../../../server/src/entity/dictionary/Entry"

export const SEARCH_URL =
  "https://i9ic4m487l.execute-api.us-east-1.amazonaws.com/search?search="
export const searchLexico = async (search: string, args: any) => {
  return await fetch(SEARCH_URL + search, args).then((r) => r.json())
}

export function getId(entry: Entry) {
  return entry.id
}
