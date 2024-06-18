import React, { useEffect } from 'react'

const useDebounceValue = (value: string, delay = 1000) => {
  const [debounceValue, setDebounceValue] = React.useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      console.log('debounce', value)
      setDebounceValue(value)
    }, delay)

    return () => {
      console.log('clear', value)
      clearTimeout(handler)
    }
  }, [value, delay])
  return debounceValue
}

export default useDebounceValue
