export const getParams = (url: string) => {
  const params = new URL(url).searchParams
  const paramsObj: Record<string, unknown> = {}
  if (params.size > 0) {
    const paramsKeys = Array.from(params.keys())
    for (const key of paramsKeys) {
      paramsObj[key] = params.get(key)
    }
  }
  return { params, data: paramsObj }
}
