export const download = (url: string) => {
  const link = document.createElement('a')
  link.target = '_blank'
  link.href = url
  link.download = url
  link.click()
}
