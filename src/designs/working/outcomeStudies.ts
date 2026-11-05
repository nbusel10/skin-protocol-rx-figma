/**
 * Production study records for the homepage Outcomes section.
 * Illustrative preview copy lives in outcomeSampleStudies.ts and is not mixed in here.
 * Add a study only when its concern, products, duration, focus, and observations
 * come from an approved source. Draft records stay in this file and are not shown.
 */

export type OutcomeStudyStatus = 'draft' | 'approved' | 'sample'

export type OutcomePhotograph = {
  src: string
  alt: string
  caption?: string
}

export type OutcomeStudyProduct = {
  /** Catalog id from src/data.ts, when the product is in the site catalog. */
  catalogId?: string
  name: string
  /** Live Shopify product page. Omit until the real URL is known. */
  url?: string
  /** Shopify product id, when recorded. */
  shopifyId?: string
  /** Optional product thumbnail. Omit rather than showing an empty frame. */
  image?: string
}

export type OutcomeAssessment = {
  id: string
  /** Recorded label, such as "Day 1" or "Week 8". */
  timePoint: string
  /** Recorded assessment date, when the source includes one. */
  date?: string
  heading: string
  findings: string
  /** A verified figure from the source. Omit when the study does not report one. */
  metric?: string
  photograph?: OutcomePhotograph
}

export type OutcomeStudy = {
  id: string
  status: OutcomeStudyStatus
  concern: string
  title: string
  products: OutcomeStudyProduct[]
  duration: string
  /** What the study was watching. */
  focus: string
  assessments: OutcomeAssessment[]
  /** Approved study document. The full-study link is omitted when this is empty. */
  documentUrl?: string
  /** Verified figure from the source. Omit when the study does not report one. */
  statistic?: string
  /** Optional photographs for a later before-and-after. The timeline stays either way. */
  photographs?: OutcomePhotograph[]
}

export const OUTCOME_STUDIES: OutcomeStudy[] = []

function hasText(value: string | undefined) {
  return Boolean(value && value.trim())
}

/** A public study needs an approved record, named products, a duration, a focus, and written observations. */
export function isPublishedOutcomeStudy(study: OutcomeStudy) {
  if (study.status !== 'approved') return false
  if (!hasText(study.concern) || !hasText(study.duration) || !hasText(study.focus)) return false
  const products = study.products.some(product => hasText(product.name))
  const observations = study.assessments.some(
    assessment => hasText(assessment.timePoint) && hasText(assessment.heading) && hasText(assessment.findings),
  )
  return products && observations
}

export function publishedOutcomeStudies(studies: OutcomeStudy[] = OUTCOME_STUDIES) {
  return studies.filter(isPublishedOutcomeStudy)
}

export function outcomeConcerns(studies: OutcomeStudy[]) {
  const concerns: string[] = []
  for (const study of studies) {
    if (!concerns.includes(study.concern)) concerns.push(study.concern)
  }
  return concerns
}

export function studiesForConcern(studies: OutcomeStudy[], concern: string) {
  return studies.filter(study => study.concern === concern)
}
