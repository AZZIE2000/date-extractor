
interface DateTime {
  year: number
  quarter: number
  month: number
  week: number
  day: number
  hour: number

  prev_year: number
  prev_month: number
  prev_month_year: number
  prev_quarter: number
  prev_quarter_year: number
  curr_day: number
  curr_quarter: number
  days_of_year: number

  last_year_date: string
  last_date: string

  day_date: string
  month_name_en: string
  month_name_ar: string
}

interface DateTimeBool {
  year: boolean
  quarter: boolean
  month: boolean
  week: boolean
  day: boolean
}

type TokenizedQT = Array<string>

enum LangId {
  en = 2,
  ar = 1,
}

type LangToken = {
  id: LangId
  value: string
}

type TokenizedNumber = {
  match: boolean
  value: number
  index: number
}

type DateTimeSearchResult = {
  dateTime: DateTime
  dateTimeBool: DateTimeBool
  question: TokenizedQT
}

type RuleSearchResult = {
  success: boolean
  matched_entities_number: number
  mismatched_entities_number: number
  rule_score_pct: number
  rule_score_literal: number
  rule_score_factor: number
  rule_score: number

  parameters: {
    number_entity: number | null

    tag_id1: number | null
    tag_id2: number | null
    tag_id3: number | null

    search_tag_1: string | null
    query_tag_1: string | null

    search_tag_2: string | null
    query_tag_2: string | null

    search_tag_3: string | null
    query_tag_3: string | null

    search_tags: string | null

    fixed_search_tag_1: string | null
    fixed_query_tag_1: string | null

    fixed_search_tag_2: string | null
    fixed_query_tag_2: string | null

    fixed_search_tag_3: string | null
    fixed_query_tag_3: string | null
  }
}



type SimilarityResult = {
  matched: Array<number>
  matchScore: Array<number>
  score: number
  literal: number
  score_pct: number
  order: number
  size: number
}





export {
  DateTime,
  TokenizedQT,
  DateTimeSearchResult,
  SimilarityResult,
  TokenizedNumber,
  RuleSearchResult,
  LangToken,
  DateTimeBool,
}
