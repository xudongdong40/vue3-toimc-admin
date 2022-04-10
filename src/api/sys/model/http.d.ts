interface HttpResponse {
  code?: number
  result?: any
  message?: string
  type?: 'success' | 'error'
}
