export interface CurrencyData {
  success: boolean
  validationMessage: any[]
  result: Result
}

export interface Result {
  from: string
  to: string
  amountToConvert: number
  convertedAmount: number
}
