import '@material/web/list/list'
import '@material/web/list/list-item'
import '@material/web/icon/icon'

export default function() { // or export default async function()
  // package initialization code
}

export interface Appointments{
  id: string
  date: Date
  pacient: string
  duration: number
  dayShortcut: string
 
}

export interface FormUpdate{
  id: number|string
  date: Date
  pacient: String
  duration: number
  dayShortcut: string
 
}
