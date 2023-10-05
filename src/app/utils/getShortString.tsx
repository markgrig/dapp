export default function getShortString(str:string, leftSlice:number, rightSlice:number) {
    if (!str) return ""
    const len = str.length

    if (len > leftSlice + rightSlice) {
      const left = str.slice(0, leftSlice)
      const right = str.slice(len - rightSlice, len)
      return `${left}...${right}`
    }
    return str
  }