import { useEffect, useLayoutEffect, useState } from 'react'
import LocalStorage from '@/hooks/secure-store/secure-store'

const useSecureStore = () => {
  const [token, setToken] = useState<string>()
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const getStore = async (key: string) => {
    let result = await LocalStorage.get(key)
    return result
  }

  const store = async (key: string, value: any) => {
    await LocalStorage.save(key, value)
  }

  const removeStore = async (key: string) => {
    await LocalStorage.removeItem(key)
  }

  useLayoutEffect(() => {
    const getToken = async () => {
      const token = await getStore('token')

      if (token) {
        setToken(token)
        setIsLoaded(true)
      }
    }
    if (!token) {
      getToken()
    }
  }, [token])
  return {
    token,
    isLoaded,
    getStore,
    store,
    removeStore,
  }
}

export default useSecureStore
