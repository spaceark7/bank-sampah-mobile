import { ResponseEntity } from "@/utils/types"

export interface LoginDTO
  extends ResponseEntity<{
    token: string
  }> {
  token: string
}
